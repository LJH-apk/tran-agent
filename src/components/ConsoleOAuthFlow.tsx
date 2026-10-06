import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from 'src/services/analytics/index.js';
import { installOAuthTokens } from '../cli/handlers/auth.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';
import { setClipboard, useTerminalNotification, Box, Link, Text, KeyboardShortcutHint } from '@anthropic/ink';
import { useKeybinding } from '../keybindings/useKeybinding.js';
import { getSSLErrorHint } from '@ant/model-provider';
import { sendNotification } from '../services/notifier.js';
import {
  completeChatGPTDeviceLogin,
  removeChatGPTAuth,
  requestChatGPTDeviceCode,
  type ChatGPTDeviceCode,
} from '../services/api/openai/chatgptAuth.js';
import { clearOpenAIClientCache } from '../services/api/openai/client.js';
import { OAuthService } from '../services/oauth/index.js';
import { getOauthAccountInfo, validateForceLoginOrg } from '../utils/auth.js';
import { openBrowser } from '../utils/browser.js';
import { logError } from '../utils/log.js';
import { getSettings_DEPRECATED, updateSettingsForSource } from '../utils/settings/settings.js';
import { CHINA_LLM_PROVIDERS, type ProviderPreset, resolveChinaProviderBaseURL } from 'src/utils/chinaLlmProviders.js';
import { Select } from './CustomSelect/select.js';
import { Spinner } from './Spinner.js';
import TextInput from './TextInput.js';

type Props = {
  onDone(): void;
  startingMessage?: string;
  mode?: 'login' | 'setup-token';
  forceLoginMethod?: 'claudeai' | 'console';
};

type OAuthStatus =
  | { state: 'idle' } // Initial state, waiting to select login method
  | { state: 'platform_setup' } // Show platform setup info (Bedrock/Vertex/Foundry)
  | {
      state: 'custom_platform';
      baseUrl: string;
      apiKey: string;
      haikuModel: string;
      sonnetModel: string;
      opusModel: string;
      activeField: 'base_url' | 'api_key' | 'haiku_model' | 'sonnet_model' | 'opus_model';
    } // Custom platform: configure API endpoint and model names
  | {
      state: 'openai_chat_api';
      baseUrl: string;
      apiKey: string;
      haikuModel: string;
      sonnetModel: string;
      opusModel: string;
      activeField: 'base_url' | 'api_key' | 'haiku_model' | 'sonnet_model' | 'opus_model';
    } // OpenAI Chat Completions API platform
  | {
      state: 'chatgpt_subscription';
      phase: 'requesting' | 'waiting';
      deviceCode?: ChatGPTDeviceCode;
    } // ChatGPT account subscription via Codex OAuth device flow
  | {
      state: 'gemini_api';
      baseUrl: string;
      apiKey: string;
      haikuModel: string;
      sonnetModel: string;
      opusModel: string;
      activeField: 'base_url' | 'api_key' | 'haiku_model' | 'sonnet_model' | 'opus_model';
    } // Gemini Generate Content API platform
  | { state: 'china_provider_select'; activeIndex: number } // China LLM: pick provider
  | { state: 'china_mode_select'; provider: ProviderPreset; activeIndex: number } // China LLM: pick access mode
  | { state: 'china_model_select'; provider: ProviderPreset; mode: 'api' | 'coding-plan'; activeIndex: number } // China LLM: pick model
  | { state: 'china_apikey'; provider: ProviderPreset; mode: 'api' | 'coding-plan'; modelId: string; apiKey: string } // China LLM: enter API key
  | { state: 'ready_to_start' } // Flow started, waiting for browser to open
  | { state: 'waiting_for_login'; url: string } // Browser opened, waiting for user to login
  | { state: 'creating_api_key' } // Got access token, creating API key
  | { state: 'about_to_retry'; nextState: OAuthStatus }
  | { state: 'success'; token?: string }
  | {
      state: 'error';
      message: string;
      toRetry?: OAuthStatus;
    };

const PASTE_HERE_MSG = '若提示，请在此粘贴验证码 > ';
export function ConsoleOAuthFlow({
  onDone,
  startingMessage,
  mode = 'login',
  forceLoginMethod: forceLoginMethodProp,
}: Props): React.ReactNode {
  const settings = getSettings_DEPRECATED() || {};
  const forceLoginMethod = forceLoginMethodProp ?? settings.forceLoginMethod;
  const orgUUID = settings.forceLoginOrgUUID;
  const forcedMethodMessage =
    forceLoginMethod === 'claudeai'
      ? '已预选登录方式：订阅套餐（Claude Pro/Max）'
      : forceLoginMethod === 'console'
        ? '已预选登录方式：API 用量计费（Anthropic Console）'
        : null;

  const terminal = useTerminalNotification();

  const [oauthStatus, setOAuthStatus] = useState<OAuthStatus>(() => {
    if (mode === 'setup-token') {
      return { state: 'ready_to_start' };
    }
    if (forceLoginMethod === 'claudeai' || forceLoginMethod === 'console') {
      return { state: 'ready_to_start' };
    }
    return { state: 'idle' };
  });

  const [pastedCode, setPastedCode] = useState('');
  const [cursorOffset, setCursorOffset] = useState(0);
  const [oauthService] = useState(() => new OAuthService());
  const [loginWithClaudeAi, setLoginWithClaudeAi] = useState(() => {
    // Use Claude AI auth for setup-token mode to support user:inference scope
    return mode === 'setup-token' || forceLoginMethod === 'claudeai';
  });
  // After a few seconds we suggest the user to copy/paste url if the
  // browser did not open automatically. In this flow we expect the user to
  // copy the code from the browser and paste it in the terminal
  const [showPastePrompt, setShowPastePrompt] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  const textInputColumns = useTerminalSize().columns - PASTE_HERE_MSG.length - 1;

  // Log forced login method on mount
  useEffect(() => {
    if (forceLoginMethod === 'claudeai') {
      logEvent('tengu_oauth_claudeai_forced', {});
    } else if (forceLoginMethod === 'console') {
      logEvent('tengu_oauth_console_forced', {});
    }
  }, [forceLoginMethod]);

  // Retry logic
  useEffect(() => {
    if (oauthStatus.state === 'about_to_retry') {
      const timer = setTimeout(setOAuthStatus, 1000, oauthStatus.nextState);
      return () => clearTimeout(timer);
    }
  }, [oauthStatus]);

  // Handle Enter to continue on success state
  useKeybinding(
    'confirm:yes',
    () => {
      logEvent('tengu_oauth_success', { loginWithClaudeAi });
      onDone();
    },
    {
      context: 'Confirmation',
      isActive: oauthStatus.state === 'success' && mode !== 'setup-token',
    },
  );

  // Handle Enter to continue from platform setup
  useKeybinding(
    'confirm:yes',
    () => {
      setOAuthStatus({ state: 'idle' });
    },
    {
      context: 'Confirmation',
      isActive: oauthStatus.state === 'platform_setup',
    },
  );

  // Handle Enter to retry on error state
  useKeybinding(
    'confirm:yes',
    () => {
      if (oauthStatus.state === 'error' && oauthStatus.toRetry) {
        setPastedCode('');
        setOAuthStatus({
          state: 'about_to_retry',
          nextState: oauthStatus.toRetry,
        });
      }
    },
    {
      context: 'Confirmation',
      isActive: oauthStatus.state === 'error' && !!oauthStatus.toRetry,
    },
  );

  useEffect(() => {
    if (pastedCode === 'c' && oauthStatus.state === 'waiting_for_login' && showPastePrompt && !urlCopied) {
      void setClipboard(oauthStatus.url).then(raw => {
        if (raw) process.stdout.write(raw);
        setUrlCopied(true);
        setTimeout(setUrlCopied, 2000, false);
      });
      setPastedCode('');
    }
  }, [pastedCode, oauthStatus, showPastePrompt, urlCopied]);

  async function handleSubmitCode(value: string, url: string) {
    try {
      // Expecting format "authorizationCode#state" from the authorization callback URL
      const [authorizationCode, state] = value.split('#');

      if (!authorizationCode || !state) {
        setOAuthStatus({
          state: 'error',
          message: '验证码无效。请确认已复制完整验证码',
          toRetry: { state: 'waiting_for_login', url },
        });
        return;
      }

      // Track which path the user is taking (manual code entry)
      logEvent('tengu_oauth_manual_entry', {});
      oauthService.handleManualAuthCodeInput({
        authorizationCode,
        state,
      });
    } catch (err: unknown) {
      logError(err);
      setOAuthStatus({
        state: 'error',
        message: (err as Error).message,
        toRetry: { state: 'waiting_for_login', url },
      });
    }
  }

  const startOAuth = useCallback(async () => {
    try {
      logEvent('tengu_oauth_flow_start', { loginWithClaudeAi });

      const result = await oauthService
        .startOAuthFlow(
          async url => {
            setOAuthStatus({ state: 'waiting_for_login', url });
            setTimeout(setShowPastePrompt, 3000, true);
          },
          {
            loginWithClaudeAi,
            inferenceOnly: mode === 'setup-token',
            expiresIn: mode === 'setup-token' ? 365 * 24 * 60 * 60 : undefined, // 1 year for setup-token
            orgUUID,
          },
        )
        .catch(err => {
          const isTokenExchangeError = err.message.includes('Token exchange failed');
          // Enterprise TLS proxies (Zscaler et al.) intercept the token
          // exchange POST and cause cryptic SSL errors. Surface an
          // actionable hint so the user isn't stuck in a login loop.
          const sslHint = getSSLErrorHint(err);
          setOAuthStatus({
            state: 'error',
            message:
              sslHint ??
              (isTokenExchangeError
                ? '无法用授权码换取访问令牌，请重试。'
                : err.message),
            toRetry: mode === 'setup-token' ? { state: 'ready_to_start' } : { state: 'idle' },
          });
          logEvent('tengu_oauth_token_exchange_error', {
            error: err.message,
            ssl_error: sslHint !== null,
          });
          throw err;
        });

      if (mode === 'setup-token') {
        // For setup-token mode, return the OAuth access token directly (it can be used as an API key)
        // Don't save to keychain - the token is displayed for manual use with CLAUDE_CODE_OAUTH_TOKEN
        setOAuthStatus({ state: 'success', token: result.accessToken });
      } else {
        await installOAuthTokens(result);

        const orgResult = await validateForceLoginOrg();
        if (!orgResult.valid) {
          throw new Error((orgResult as { valid: false; message: string }).message);
        }
        // Reset modelType to anthropic when using OAuth login
        updateSettingsForSource('userSettings', { modelType: 'anthropic' } as unknown as Parameters<
          typeof updateSettingsForSource
        >[1]);

        setOAuthStatus({ state: 'success' });
        void sendNotification(
          {
            message: 'Claude Code 登录成功',
            notificationType: 'auth_success',
          },
          terminal,
        );
      }
    } catch (err) {
      const errorMessage = (err as Error).message;
      const sslHint = getSSLErrorHint(err);
      setOAuthStatus({
        state: 'error',
        message: sslHint ?? errorMessage,
        toRetry: {
          state: mode === 'setup-token' ? 'ready_to_start' : 'idle',
        },
      });
      logEvent('tengu_oauth_error', {
        error: errorMessage as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
        ssl_error: sslHint !== null,
      });
    }
  }, [oauthService, setShowPastePrompt, loginWithClaudeAi, mode, orgUUID]);

  const pendingOAuthStartRef = useRef(false);

  useEffect(() => {
    if (oauthStatus.state === 'ready_to_start' && !pendingOAuthStartRef.current) {
      pendingOAuthStartRef.current = true;
      // Start OAuth flow and reset the pending flag when complete
      void startOAuth().finally(() => {
        pendingOAuthStartRef.current = false;
      });
    }
  }, [oauthStatus.state, startOAuth]);

  // Auto-exit for setup-token mode
  useEffect(() => {
    if (mode === 'setup-token' && oauthStatus.state === 'success') {
      // Delay to ensure static content is fully rendered before exiting
      const timer = setTimeout(
        (loginWithClaudeAi, onDone) => {
          logEvent('tengu_oauth_success', { loginWithClaudeAi });
          // Don't clear terminal so the token remains visible
          onDone();
        },
        500,
        loginWithClaudeAi,
        onDone,
      );
      return () => clearTimeout(timer);
    }
  }, [mode, oauthStatus, loginWithClaudeAi, onDone]);

  // Cleanup OAuth service when component unmounts
  useEffect(() => {
    return () => {
      oauthService.cleanup();
    };
  }, [oauthService]);

  return (
    <Box flexDirection="column" gap={1}>
      {oauthStatus.state === 'waiting_for_login' && showPastePrompt && (
        <Box flexDirection="column" key="urlToCopy" gap={1} paddingBottom={1}>
          <Box paddingX={1}>
            <Text dimColor>Browser didn&apos;t open? Use the url below to sign in </Text>
            {urlCopied ? (
              <Text color="success">（已复制！）</Text>
            ) : (
              <Text dimColor>
                <KeyboardShortcutHint shortcut="c" action="copy" parens />
              </Text>
            )}
          </Box>
          <Link url={oauthStatus.url}>
            <Text dimColor>{oauthStatus.url}</Text>
          </Link>
        </Box>
      )}
      {mode === 'setup-token' && oauthStatus.state === 'success' && oauthStatus.token && (
        <Box key="tokenOutput" flexDirection="column" gap={1} paddingTop={1}>
          <Text color="success">✓ 长期有效的身份验证 token 创建成功！</Text>
          <Box flexDirection="column" gap={1}>
            <Text>你的 OAuth token（有效期 1 年）：</Text>
            <Text color="warning">{oauthStatus.token}</Text>
            <Text dimColor>Store this token securely. You won&apos;t be able to see it again.</Text>
            <Text dimColor>Use this token by setting: export CLAUDE_CODE_OAUTH_TOKEN=&lt;token&gt;</Text>
          </Box>
        </Box>
      )}
      <Box paddingLeft={1} flexDirection="column" gap={1}>
        <OAuthStatusMessage
          oauthStatus={oauthStatus}
          mode={mode}
          startingMessage={startingMessage}
          forcedMethodMessage={forcedMethodMessage}
          showPastePrompt={showPastePrompt}
          pastedCode={pastedCode}
          setPastedCode={setPastedCode}
          cursorOffset={cursorOffset}
          setCursorOffset={setCursorOffset}
          textInputColumns={textInputColumns}
          handleSubmitCode={handleSubmitCode}
          setOAuthStatus={setOAuthStatus}
          setLoginWithClaudeAi={setLoginWithClaudeAi}
          onDone={onDone}
        />
      </Box>
    </Box>
  );
}

type OAuthStatusMessageProps = {
  oauthStatus: OAuthStatus;
  mode: 'login' | 'setup-token';
  startingMessage: string | undefined;
  forcedMethodMessage: string | null;
  showPastePrompt: boolean;
  pastedCode: string;
  setPastedCode: (value: string) => void;
  cursorOffset: number;
  onDone: () => void;
  setCursorOffset: (offset: number) => void;
  textInputColumns: number;
  handleSubmitCode: (value: string, url: string) => void;
  setOAuthStatus: (status: OAuthStatus) => void;
  setLoginWithClaudeAi: (value: boolean) => void;
};

function OAuthStatusMessage({
  oauthStatus,
  mode,
  startingMessage,
  forcedMethodMessage,
  showPastePrompt,
  pastedCode,
  setPastedCode,
  cursorOffset,
  setCursorOffset,
  textInputColumns,
  handleSubmitCode,
  setOAuthStatus,
  setLoginWithClaudeAi,
  onDone,
}: OAuthStatusMessageProps): React.ReactNode {
  switch (oauthStatus.state) {
    case 'idle':
      return (
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text bold>
            {startingMessage
              ? startingMessage
              : `你可以使用 Claude 订阅来使用 Claude Code，也可以通过 Console 账号按 API 用量计费。`}
          </Text>

          <Text>选择登录方式：</Text>

          <Box>
            <Select
              options={[
                {
                  label: (
                    <Text>
                      Anthropic 兼容 · <Text dimColor>配置你自己的 API 端点</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'custom_platform',
                },
                {
                  label: (
                    <Text>
                      OpenAI 兼容 · <Text dimColor>Ollama, DeepSeek, vLLM, One API, etc.</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'openai_chat_api',
                },
                {
                  label: (
                    <Text>
                      中国大模型服务商 · <Text dimColor>DeepSeek, Zhipu GLM, Qwen, MiMo</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'china_providers',
                },
                {
                  label: (
                    <Text>
                      带订阅的 ChatGPT 账号 · <Text dimColor>Plus, Pro, Business, Edu, or Enterprise</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'chatgpt_subscription',
                },
                {
                  label: (
                    <Text>
                      Gemini API · <Text dimColor>Google Gemini 原生 REST/SSE</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'gemini_api',
                },
                {
                  label: (
                    <Text>
                      带订阅的 Claude 账号 · <Text dimColor>Pro, Max, Team, or Enterprise</Text>
                      {process.env.USER_TYPE === 'ant' && (
                        <Text>
                          {'\n'}
                          <Text color="warning">[ANT-ONLY]</Text>{' '}
                          <Text dimColor>
                            除非你需要使用 Console 选项登录到可访问敏感数据（如客户数据、HIPI 数据）的特殊组织，否则请使用此选项
                          </Text>
                        </Text>
                      )}
                      {'\n'}
                    </Text>
                  ),
                  value: 'claudeai',
                },
                {
                  label: (
                    <Text>
                      Anthropic Console 账号 · <Text dimColor>API 用量计费</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'console',
                },
                {
                  label: (
                    <Text>
                      第三方平台 · <Text dimColor>Amazon Bedrock, Microsoft Foundry, or Vertex AI</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: 'platform',
                },
              ]}
              onChange={value => {
                if (value === 'custom_platform') {
                  logEvent('tengu_custom_platform_selected', {});
                  setOAuthStatus({
                    state: 'custom_platform',
                    baseUrl: process.env.ANTHROPIC_BASE_URL ?? '',
                    apiKey: process.env.ANTHROPIC_AUTH_TOKEN ?? '',
                    haikuModel: process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL ?? '',
                    sonnetModel: process.env.ANTHROPIC_DEFAULT_SONNET_MODEL ?? '',
                    opusModel: process.env.ANTHROPIC_DEFAULT_OPUS_MODEL ?? '',
                    activeField: 'base_url',
                  });
                } else if (value === 'openai_chat_api') {
                  logEvent('tengu_openai_chat_api_selected', {});
                  setOAuthStatus({
                    state: 'openai_chat_api',
                    baseUrl: process.env.OPENAI_BASE_URL ?? '',
                    apiKey: process.env.OPENAI_API_KEY ?? '',
                    haikuModel: process.env.OPENAI_DEFAULT_HAIKU_MODEL ?? '',
                    sonnetModel: process.env.OPENAI_DEFAULT_SONNET_MODEL ?? '',
                    opusModel: process.env.OPENAI_DEFAULT_OPUS_MODEL ?? '',
                    activeField: 'base_url',
                  });
                } else if (value === 'china_providers') {
                  logEvent('tengu_china_providers_selected', {});
                  setOAuthStatus({ state: 'china_provider_select', activeIndex: 0 });
                } else if (value === 'chatgpt_subscription') {
                  logEvent('tengu_chatgpt_subscription_selected', {});
                  setOAuthStatus({
                    state: 'chatgpt_subscription',
                    phase: 'requesting',
                  });
                } else if (value === 'gemini_api') {
                  logEvent('tengu_gemini_api_selected', {});
                  setOAuthStatus({
                    state: 'gemini_api',
                    baseUrl: process.env.GEMINI_BASE_URL ?? '',
                    apiKey: process.env.GEMINI_API_KEY ?? '',
                    haikuModel: process.env.GEMINI_DEFAULT_HAIKU_MODEL ?? '',
                    sonnetModel: process.env.GEMINI_DEFAULT_SONNET_MODEL ?? '',
                    opusModel: process.env.GEMINI_DEFAULT_OPUS_MODEL ?? '',
                    activeField: 'base_url',
                  });
                } else if (value === 'platform') {
                  logEvent('tengu_oauth_platform_selected', {});
                  setOAuthStatus({ state: 'platform_setup' });
                } else {
                  setOAuthStatus({ state: 'ready_to_start' });
                  if (value === 'claudeai') {
                    logEvent('tengu_oauth_claudeai_selected', {});
                    setLoginWithClaudeAi(true);
                  } else {
                    logEvent('tengu_oauth_console_selected', {});
                    setLoginWithClaudeAi(false);
                  }
                }
              }}
            />
          </Box>
        </Box>
      );

    case 'custom_platform': {
      type Field = 'base_url' | 'api_key' | 'haiku_model' | 'sonnet_model' | 'opus_model';
      const FIELDS: Field[] = ['base_url', 'api_key', 'haiku_model', 'sonnet_model', 'opus_model'];
      const cp = oauthStatus as {
        state: 'custom_platform';
        activeField: Field;
        baseUrl: string;
        apiKey: string;
        haikuModel: string;
        sonnetModel: string;
        opusModel: string;
      };
      const { activeField, baseUrl, apiKey, haikuModel, sonnetModel, opusModel } = cp;
      const displayValues: Record<Field, string> = {
        base_url: baseUrl,
        api_key: apiKey,
        haiku_model: haikuModel,
        sonnet_model: sonnetModel,
        opus_model: opusModel,
      };

      const [inputValue, setInputValue] = useState(() => displayValues[activeField]);
      const [inputCursorOffset, setInputCursorOffset] = useState(() => displayValues[activeField].length);

      const buildState = useCallback(
        (field: Field, value: string, newActive?: Field) => {
          const s = {
            state: 'custom_platform' as const,
            activeField: newActive ?? activeField,
            baseUrl,
            apiKey,
            haikuModel,
            sonnetModel,
            opusModel,
          };
          switch (field) {
            case 'base_url':
              return { ...s, baseUrl: value };
            case 'api_key':
              return { ...s, apiKey: value };
            case 'haiku_model':
              return { ...s, haikuModel: value };
            case 'sonnet_model':
              return { ...s, sonnetModel: value };
            case 'opus_model':
              return { ...s, opusModel: value };
          }
        },
        [activeField, baseUrl, apiKey, haikuModel, sonnetModel, opusModel],
      );

      const _switchTo = useCallback(
        (target: Field) => {
          setOAuthStatus(buildState(activeField, inputValue, target));
          setInputValue(displayValues[target] ?? '');
          setInputCursorOffset((displayValues[target] ?? '').length);
        },
        [activeField, inputValue, displayValues, buildState, setOAuthStatus],
      );

      const doSave = useCallback(() => {
        const finalVals = { ...displayValues, [activeField]: inputValue };
        const env: Record<string, string> = {};

        // Validate base_url if provided
        if (finalVals.base_url) {
          try {
            new URL(finalVals.base_url);
          } catch {
            setOAuthStatus({
              state: 'error',
              message: 'Base URL 无效：请输入包含协议的完整 URL（例如 https://api.example.com）',
              toRetry: {
                state: 'custom_platform',
                baseUrl: '',
                apiKey: '',
                haikuModel: '',
                sonnetModel: '',
                opusModel: '',
                activeField: 'base_url',
              },
            });
            return;
          }
          env.ANTHROPIC_BASE_URL = finalVals.base_url;
        }

        if (finalVals.api_key) env.ANTHROPIC_AUTH_TOKEN = finalVals.api_key;
        if (finalVals.haiku_model) env.ANTHROPIC_DEFAULT_HAIKU_MODEL = finalVals.haiku_model;
        if (finalVals.sonnet_model) env.ANTHROPIC_DEFAULT_SONNET_MODEL = finalVals.sonnet_model;
        if (finalVals.opus_model) env.ANTHROPIC_DEFAULT_OPUS_MODEL = finalVals.opus_model;
        const { error } = updateSettingsForSource('userSettings', {
          modelType: 'anthropic',
          env,
        } as unknown as Parameters<typeof updateSettingsForSource>[1]);
        if (error) {
          setOAuthStatus({
            state: 'error',
            message: '保存设置失败，请重试。',
            toRetry: {
              state: 'custom_platform',
              baseUrl: finalVals.base_url ?? '',
              apiKey: finalVals.api_key ?? '',
              haikuModel: finalVals.haiku_model ?? '',
              sonnetModel: finalVals.sonnet_model ?? '',
              opusModel: finalVals.opus_model ?? '',
              activeField: 'base_url',
            },
          });
        } else {
          for (const [k, v] of Object.entries(env)) process.env[k] = v;
          setOAuthStatus({ state: 'success' });
          void onDone();
        }
      }, [activeField, inputValue, displayValues, setOAuthStatus, onDone]);

      const handleEnter = useCallback(() => {
        const idx = FIELDS.indexOf(activeField);
        if (idx === FIELDS.length - 1) {
          setOAuthStatus(buildState(activeField, inputValue));
          doSave();
        } else {
          const next = FIELDS[idx + 1]!;
          setOAuthStatus(buildState(activeField, inputValue, next));
          setInputValue(displayValues[next] ?? '');
          setInputCursorOffset((displayValues[next] ?? '').length);
        }
      }, [activeField, inputValue, buildState, doSave, displayValues, setOAuthStatus]);

      useKeybinding(
        'tabs:next',
        () => {
          const idx = FIELDS.indexOf(activeField);
          if (idx < FIELDS.length - 1) {
            setOAuthStatus(buildState(activeField, inputValue, FIELDS[idx + 1]));
            setInputValue(displayValues[FIELDS[idx + 1]!] ?? '');
            setInputCursorOffset((displayValues[FIELDS[idx + 1]!] ?? '').length);
          }
        },
        { context: 'FormField' },
      );
      useKeybinding(
        'tabs:previous',
        () => {
          const idx = FIELDS.indexOf(activeField);
          if (idx > 0) {
            setOAuthStatus(buildState(activeField, inputValue, FIELDS[idx - 1]));
            setInputValue(displayValues[FIELDS[idx - 1]!] ?? '');
            setInputCursorOffset((displayValues[FIELDS[idx - 1]!] ?? '').length);
          }
        },
        { context: 'FormField' },
      );
      useKeybinding(
        'confirm:no',
        () => {
          setOAuthStatus({ state: 'idle' });
        },
        { context: 'Confirmation' },
      );

      const columns = useTerminalSize().columns - 20;

      const renderRow = (field: Field, label: string, opts?: { mask?: boolean; placeholder?: string }) => {
        const active = activeField === field;
        const val = displayValues[field];
        return (
          <Box>
            <Text backgroundColor={active ? 'suggestion' : undefined} color={active ? 'inverseText' : undefined}>
              {` ${label} `}
            </Text>
            <Text> </Text>
            {active ? (
              <TextInput
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleEnter}
                cursorOffset={inputCursorOffset}
                onChangeCursorOffset={setInputCursorOffset}
                columns={columns}
                mask={opts?.mask ? '*' : undefined}
                focus={true}
              />
            ) : val ? (
              <Text color="success">
                {opts?.mask ? val.slice(0, 8) + '\u00b7'.repeat(Math.max(0, val.length - 8)) : val}
              </Text>
            ) : null}
          </Box>
        );
      };

      return (
        <Box flexDirection="column" gap={1}>
          <Text bold>Anthropic 兼容配置</Text>
          <Box flexDirection="column" gap={1}>
            {renderRow('base_url', '基础 URL ')}
            {renderRow('api_key', 'API 密钥  ', { mask: true })}
            {renderRow('haiku_model', 'Haiku    ')}
            {renderRow('sonnet_model', 'Sonnet   ')}
            {renderRow('opus_model', 'Opus     ')}
          </Box>
          <Text dimColor>↑↓/Tab 切换 · 在最后一个字段按 Enter 保存 · Esc 返回</Text>
        </Box>
      );
    }

    case 'openai_chat_api': {
      type OpenAIField = 'base_url' | 'api_key' | 'haiku_model' | 'sonnet_model' | 'opus_model';
      const OPENAI_FIELDS: OpenAIField[] = ['base_url', 'api_key', 'haiku_model', 'sonnet_model', 'opus_model'];
      const op = oauthStatus as {
        state: 'openai_chat_api';
        activeField: OpenAIField;
        baseUrl: string;
        apiKey: string;
        haikuModel: string;
        sonnetModel: string;
        opusModel: string;
      };
      const { activeField, baseUrl, apiKey, haikuModel, sonnetModel, opusModel } = op;
      const openaiDisplayValues: Record<OpenAIField, string> = {
        base_url: baseUrl,
        api_key: apiKey,
        haiku_model: haikuModel,
        sonnet_model: sonnetModel,
        opus_model: opusModel,
      };

      const [openaiInputValue, setOpenaiInputValue] = useState(() => openaiDisplayValues[activeField]);
      const [openaiInputCursorOffset, setOpenaiInputCursorOffset] = useState(
        () => openaiDisplayValues[activeField].length,
      );

      const buildOpenAIState = useCallback(
        (field: OpenAIField, value: string, newActive?: OpenAIField) => {
          const s = {
            state: 'openai_chat_api' as const,
            activeField: newActive ?? activeField,
            baseUrl,
            apiKey,
            haikuModel,
            sonnetModel,
            opusModel,
          };
          switch (field) {
            case 'base_url':
              return { ...s, baseUrl: value };
            case 'api_key':
              return { ...s, apiKey: value };
            case 'haiku_model':
              return { ...s, haikuModel: value };
            case 'sonnet_model':
              return { ...s, sonnetModel: value };
            case 'opus_model':
              return { ...s, opusModel: value };
          }
        },
        [activeField, baseUrl, apiKey, haikuModel, sonnetModel, opusModel],
      );

      const doOpenAISave = useCallback(() => {
        const finalVals = { ...openaiDisplayValues, [activeField]: openaiInputValue };
        const env: Record<string, string | undefined> = {
          OPENAI_AUTH_MODE: undefined,
        };

        // Validate base_url if provided
        if (finalVals.base_url) {
          try {
            new URL(finalVals.base_url);
          } catch {
            setOAuthStatus({
              state: 'error',
              message: 'Base URL 无效：请输入包含协议的完整 URL（例如 https://api.example.com）',
              toRetry: {
                state: 'openai_chat_api',
                baseUrl: '',
                apiKey: '',
                haikuModel: '',
                sonnetModel: '',
                opusModel: '',
                activeField: 'base_url',
              },
            });
            return;
          }
          env.OPENAI_BASE_URL = finalVals.base_url;
        }

        if (finalVals.api_key) env.OPENAI_API_KEY = finalVals.api_key;
        if (finalVals.haiku_model) env.OPENAI_DEFAULT_HAIKU_MODEL = finalVals.haiku_model;
        if (finalVals.sonnet_model) env.OPENAI_DEFAULT_SONNET_MODEL = finalVals.sonnet_model;
        if (finalVals.opus_model) env.OPENAI_DEFAULT_OPUS_MODEL = finalVals.opus_model;
        const settingsUpdate: Parameters<typeof updateSettingsForSource>[1] = {
          modelType: 'openai',
          env: env as unknown as Record<string, string>,
        };
        const { error } = updateSettingsForSource('userSettings', settingsUpdate);
        if (error) {
          setOAuthStatus({
            state: 'error',
            message: '保存设置失败，请重试。',
            toRetry: {
              state: 'openai_chat_api',
              baseUrl: finalVals.base_url ?? '',
              apiKey: finalVals.api_key ?? '',
              haikuModel: finalVals.haiku_model ?? '',
              sonnetModel: finalVals.sonnet_model ?? '',
              opusModel: finalVals.opus_model ?? '',
              activeField: 'base_url',
            },
          });
        } else {
          for (const [k, v] of Object.entries(env)) {
            if (v === undefined) {
              delete process.env[k];
            } else {
              process.env[k] = v;
            }
          }
          // Drop any cached OpenAI client so the next request rebuilds it
          // with the new env vars. Also clear ChatGPT auth file so a prior
          // ChatGPT Subscription login can't leak into the OpenAI Compatible path.
          clearOpenAIClientCache();
          void removeChatGPTAuth().catch(() => {});
          setOAuthStatus({ state: 'success' });
          void onDone();
        }
      }, [activeField, openaiInputValue, openaiDisplayValues, setOAuthStatus, onDone]);

      const handleOpenAIEnter = useCallback(() => {
        const idx = OPENAI_FIELDS.indexOf(activeField);
        if (idx === OPENAI_FIELDS.length - 1) {
          setOAuthStatus(buildOpenAIState(activeField, openaiInputValue));
          doOpenAISave();
        } else {
          const next = OPENAI_FIELDS[idx + 1]!;
          setOAuthStatus(buildOpenAIState(activeField, openaiInputValue, next));
          setOpenaiInputValue(openaiDisplayValues[next] ?? '');
          setOpenaiInputCursorOffset((openaiDisplayValues[next] ?? '').length);
        }
      }, [activeField, openaiInputValue, buildOpenAIState, doOpenAISave, openaiDisplayValues, setOAuthStatus]);

      useKeybinding(
        'tabs:next',
        () => {
          const idx = OPENAI_FIELDS.indexOf(activeField);
          if (idx < OPENAI_FIELDS.length - 1) {
            setOAuthStatus(buildOpenAIState(activeField, openaiInputValue, OPENAI_FIELDS[idx + 1]));
            setOpenaiInputValue(openaiDisplayValues[OPENAI_FIELDS[idx + 1]!] ?? '');
            setOpenaiInputCursorOffset((openaiDisplayValues[OPENAI_FIELDS[idx + 1]!] ?? '').length);
          }
        },
        { context: 'FormField' },
      );
      useKeybinding(
        'tabs:previous',
        () => {
          const idx = OPENAI_FIELDS.indexOf(activeField);
          if (idx > 0) {
            setOAuthStatus(buildOpenAIState(activeField, openaiInputValue, OPENAI_FIELDS[idx - 1]));
            setOpenaiInputValue(openaiDisplayValues[OPENAI_FIELDS[idx - 1]!] ?? '');
            setOpenaiInputCursorOffset((openaiDisplayValues[OPENAI_FIELDS[idx - 1]!] ?? '').length);
          }
        },
        { context: 'FormField' },
      );
      useKeybinding(
        'confirm:no',
        () => {
          setOAuthStatus({ state: 'idle' });
        },
        { context: 'Confirmation' },
      );

      const openaiColumns = useTerminalSize().columns - 20;

      const renderOpenAIRow = (field: OpenAIField, label: string, opts?: { mask?: boolean }) => {
        const active = activeField === field;
        const val = openaiDisplayValues[field];
        return (
          <Box>
            <Text backgroundColor={active ? 'suggestion' : undefined} color={active ? 'inverseText' : undefined}>
              {` ${label} `}
            </Text>
            <Text> </Text>
            {active ? (
              <TextInput
                value={openaiInputValue}
                onChange={setOpenaiInputValue}
                onSubmit={handleOpenAIEnter}
                cursorOffset={openaiInputCursorOffset}
                onChangeCursorOffset={setOpenaiInputCursorOffset}
                columns={openaiColumns}
                mask={opts?.mask ? '*' : undefined}
                focus={true}
              />
            ) : val ? (
              <Text color="success">
                {opts?.mask ? val.slice(0, 8) + '\u00b7'.repeat(Math.max(0, val.length - 8)) : val}
              </Text>
            ) : null}
          </Box>
        );
      };

      return (
        <Box flexDirection="column" gap={1}>
          <Text bold>OpenAI 兼容 API 配置</Text>
          <Text dimColor>配置兼容 OpenAI Chat Completions 的端点（例如 Ollama、DeepSeek、vLLM）。</Text>
          <Box flexDirection="column" gap={1}>
            {renderOpenAIRow('base_url', '基础 URL ')}
            {renderOpenAIRow('api_key', 'API 密钥  ', { mask: true })}
            {renderOpenAIRow('haiku_model', 'Haiku    ')}
            {renderOpenAIRow('sonnet_model', 'Sonnet   ')}
            {renderOpenAIRow('opus_model', 'Opus     ')}
          </Box>
          <Text dimColor>↑↓/Tab 切换 · 在最后一个字段按 Enter 保存 · Esc 返回</Text>
        </Box>
      );
    }

    case 'chatgpt_subscription': {
      const status = oauthStatus as {
        state: 'chatgpt_subscription';
        phase: 'requesting' | 'waiting';
        deviceCode?: ChatGPTDeviceCode;
      };
      const startedRef = useRef(false);

      useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;
        let cancelled = false;
        const controller = new AbortController();
        async function runLogin() {
          try {
            const deviceCode = await requestChatGPTDeviceCode();
            if (cancelled) return;
            setOAuthStatus({
              state: 'chatgpt_subscription',
              phase: 'waiting',
              deviceCode,
            });
            void openBrowser(deviceCode.verificationUrl);
            await completeChatGPTDeviceLogin(deviceCode, controller.signal);
            if (cancelled) return;
            const env: Record<string, string> = {
              OPENAI_AUTH_MODE: 'chatgpt',
            };
            const settingsUpdate: Parameters<typeof updateSettingsForSource>[1] = {
              modelType: 'openai',
              env,
            };
            const { error } = updateSettingsForSource('userSettings', settingsUpdate);
            if (error) {
              throw new Error('保存设置失败，请重试。');
            }
            for (const [k, v] of Object.entries(env)) process.env[k] = v;
            // Drop any cached OpenAI client built from prior OpenAI Compatible
            // env vars; the ChatGPT Subscription path bypasses the SDK client
            // entirely (uses createChatGPTResponsesStream) but a stale cached
            // client would still be picked up by sideQuery.
            clearOpenAIClientCache();
            setOAuthStatus({ state: 'success' });
            void onDone();
          } catch (err) {
            if (cancelled) return;
            setOAuthStatus({
              state: 'error',
              message: (err as Error).message,
              toRetry: {
                state: 'chatgpt_subscription',
                phase: 'requesting',
              },
            });
          }
        }
        void runLogin();
        return () => {
          cancelled = true;
          controller.abort();
        };
      }, [setOAuthStatus, onDone]);

      return (
        <Box flexDirection="column" gap={1}>
          <Text bold>ChatGPT 账号配置</Text>
          {status.phase === 'requesting' && (
            <Box>
              <Spinner />
              <Text>正在请求登录码…</Text>
            </Box>
          )}
          {status.phase === 'waiting' && status.deviceCode && (
            <Box flexDirection="column" gap={1}>
              <Text>打开此链接并使用你的 ChatGPT 账号登录：</Text>
              <Link url={status.deviceCode.verificationUrl}>
                <Text dimColor>{status.deviceCode.verificationUrl}</Text>
              </Link>
              <Text>
                输入代码： <Text bold>{status.deviceCode.userCode}</Text>
              </Text>
              <Box>
                <Spinner />
                <Text>正在等待 ChatGPT 授权…</Text>
              </Box>
            </Box>
          )}
          <Text dimColor>Esc 返回。设备码 15 分钟后失效。</Text>
        </Box>
      );
    }

    case 'gemini_api': {
      type GeminiField = 'base_url' | 'api_key' | 'haiku_model' | 'sonnet_model' | 'opus_model';
      const GEMINI_FIELDS: GeminiField[] = ['base_url', 'api_key', 'haiku_model', 'sonnet_model', 'opus_model'];
      const gp = oauthStatus as {
        state: 'gemini_api';
        activeField: GeminiField;
        baseUrl: string;
        apiKey: string;
        haikuModel: string;
        sonnetModel: string;
        opusModel: string;
      };
      const { activeField, baseUrl, apiKey, haikuModel, sonnetModel, opusModel } = gp;
      const geminiDisplayValues: Record<GeminiField, string> = {
        base_url: baseUrl,
        api_key: apiKey,
        haiku_model: haikuModel,
        sonnet_model: sonnetModel,
        opus_model: opusModel,
      };

      const [geminiInputValue, setGeminiInputValue] = useState(() => geminiDisplayValues[activeField]);
      const [geminiInputCursorOffset, setGeminiInputCursorOffset] = useState(
        () => geminiDisplayValues[activeField].length,
      );

      const buildGeminiState = useCallback(
        (field: GeminiField, value: string, newActive?: GeminiField) => {
          const s = {
            state: 'gemini_api' as const,
            activeField: newActive ?? activeField,
            baseUrl,
            apiKey,
            haikuModel,
            sonnetModel,
            opusModel,
          };
          switch (field) {
            case 'base_url':
              return { ...s, baseUrl: value };
            case 'api_key':
              return { ...s, apiKey: value };
            case 'haiku_model':
              return { ...s, haikuModel: value };
            case 'sonnet_model':
              return { ...s, sonnetModel: value };
            case 'opus_model':
              return { ...s, opusModel: value };
          }
        },
        [activeField, baseUrl, apiKey, haikuModel, sonnetModel, opusModel],
      );

      const doGeminiSave = useCallback(() => {
        const finalVals = { ...geminiDisplayValues, [activeField]: geminiInputValue };
        if (!finalVals.haiku_model || !finalVals.sonnet_model || !finalVals.opus_model) {
          setOAuthStatus({
            state: 'error',
            message: 'Gemini 配置需要填写 Haiku、Sonnet 和 Opus 模型名称。',
            toRetry: {
              state: 'gemini_api',
              baseUrl: finalVals.base_url,
              apiKey: finalVals.api_key,
              haikuModel: finalVals.haiku_model,
              sonnetModel: finalVals.sonnet_model,
              opusModel: finalVals.opus_model,
              activeField,
            },
          });
          return;
        }

        const env: Record<string, string> = {};
        if (finalVals.base_url) env.GEMINI_BASE_URL = finalVals.base_url;
        if (finalVals.api_key) env.GEMINI_API_KEY = finalVals.api_key;
        if (finalVals.haiku_model) env.GEMINI_DEFAULT_HAIKU_MODEL = finalVals.haiku_model;
        if (finalVals.sonnet_model) env.GEMINI_DEFAULT_SONNET_MODEL = finalVals.sonnet_model;
        if (finalVals.opus_model) env.GEMINI_DEFAULT_OPUS_MODEL = finalVals.opus_model;
        const { error } = updateSettingsForSource('userSettings', {
          modelType: 'gemini',
          env,
        } as unknown as Parameters<typeof updateSettingsForSource>[1]);
        if (error) {
          setOAuthStatus({
            state: 'error',
            message: `保存失败：${error.message}`,
            toRetry: {
              state: 'gemini_api',
              baseUrl: '',
              apiKey: '',
              haikuModel: '',
              sonnetModel: '',
              opusModel: '',
              activeField: 'base_url',
            },
          });
        } else {
          for (const [k, v] of Object.entries(env)) process.env[k] = v;
          setOAuthStatus({ state: 'success' });
          void onDone();
        }
      }, [activeField, geminiInputValue, geminiDisplayValues, onDone, setOAuthStatus]);

      const handleGeminiEnter = useCallback(() => {
        const idx = GEMINI_FIELDS.indexOf(activeField);
        if (idx === GEMINI_FIELDS.length - 1) {
          setOAuthStatus(buildGeminiState(activeField, geminiInputValue));
          doGeminiSave();
        } else {
          const next = GEMINI_FIELDS[idx + 1]!;
          setOAuthStatus(buildGeminiState(activeField, geminiInputValue, next));
          setGeminiInputValue(geminiDisplayValues[next] ?? '');
          setGeminiInputCursorOffset((geminiDisplayValues[next] ?? '').length);
        }
      }, [activeField, buildGeminiState, doGeminiSave, geminiDisplayValues, geminiInputValue, setOAuthStatus]);

      useKeybinding(
        'tabs:next',
        () => {
          const idx = GEMINI_FIELDS.indexOf(activeField);
          if (idx < GEMINI_FIELDS.length - 1) {
            setOAuthStatus(buildGeminiState(activeField, geminiInputValue, GEMINI_FIELDS[idx + 1]));
            setGeminiInputValue(geminiDisplayValues[GEMINI_FIELDS[idx + 1]!] ?? '');
            setGeminiInputCursorOffset((geminiDisplayValues[GEMINI_FIELDS[idx + 1]!] ?? '').length);
          }
        },
        { context: 'FormField' },
      );
      useKeybinding(
        'tabs:previous',
        () => {
          const idx = GEMINI_FIELDS.indexOf(activeField);
          if (idx > 0) {
            setOAuthStatus(buildGeminiState(activeField, geminiInputValue, GEMINI_FIELDS[idx - 1]));
            setGeminiInputValue(geminiDisplayValues[GEMINI_FIELDS[idx - 1]!] ?? '');
            setGeminiInputCursorOffset((geminiDisplayValues[GEMINI_FIELDS[idx - 1]!] ?? '').length);
          }
        },
        { context: 'FormField' },
      );
      useKeybinding(
        'confirm:no',
        () => {
          setOAuthStatus({ state: 'idle' });
        },
        { context: 'Confirmation' },
      );

      const geminiColumns = useTerminalSize().columns - 20;

      const renderGeminiRow = (field: GeminiField, label: string, opts?: { mask?: boolean }) => {
        const active = activeField === field;
        const val = geminiDisplayValues[field];
        return (
          <Box>
            <Text backgroundColor={active ? 'suggestion' : undefined} color={active ? 'inverseText' : undefined}>
              {` ${label} `}
            </Text>
            <Text> </Text>
            {active ? (
              <TextInput
                value={geminiInputValue}
                onChange={setGeminiInputValue}
                onSubmit={handleGeminiEnter}
                cursorOffset={geminiInputCursorOffset}
                onChangeCursorOffset={setGeminiInputCursorOffset}
                columns={geminiColumns}
                mask={opts?.mask ? '*' : undefined}
                focus={true}
              />
            ) : val ? (
              <Text color="success">
                {opts?.mask ? val.slice(0, 8) + '\u00b7'.repeat(Math.max(0, val.length - 8)) : val}
              </Text>
            ) : null}
          </Box>
        );
      };

      return (
        <Box flexDirection="column" gap={1}>
          <Text bold>Gemini API 配置</Text>
          <Text dimColor>
            Configure a Gemini Generate Content compatible endpoint. 基础 URL is optional and defaults to Google&apos;s
            v1beta API.
          </Text>
          <Box flexDirection="column" gap={1}>
            {renderGeminiRow('base_url', 'Base URL ')}
            {renderGeminiRow('api_key', 'API 密钥  ', { mask: true })}
            {renderGeminiRow('haiku_model', 'Haiku    ')}
            {renderGeminiRow('sonnet_model', 'Sonnet   ')}
            {renderGeminiRow('opus_model', 'Opus     ')}
          </Box>
          <Text dimColor>↑↓/Tab 切换 · 在最后一个字段按 Enter 保存 · Esc 返回</Text>
        </Box>
      );
    }

    case 'china_provider_select': {
      return (
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text bold>选择中国大模型服务商</Text>
          <Text dimColor>直连，无需代理。所有服务商均兼容 OpenAI。</Text>
          <Box>
            <Select
              options={CHINA_LLM_PROVIDERS.map(p => ({
                label: (
                  <Text>
                    {p.icon} {p.label} · <Text dimColor>{p.description}</Text>
                    {'\n'}
                  </Text>
                ),
                value: p.id,
              }))}
              onChange={value => {
                const provider = CHINA_LLM_PROVIDERS.find(p => p.id === value);
                if (!provider) return;
                logEvent('tengu_china_provider_selected', {});
                if (provider.codingPlan) {
                  setOAuthStatus({ state: 'china_mode_select', provider, activeIndex: 0 });
                } else {
                  setOAuthStatus({ state: 'china_model_select', provider, mode: 'api', activeIndex: 0 });
                }
              }}
            />
          </Box>
        </Box>
      );
    }

    case 'china_mode_select': {
      const { provider } = oauthStatus;
      const modeOptions = [
        { id: 'api' as const, label: '按量付费（API）', desc: '自由充值，按用量付费' },
        { id: 'coding-plan' as const, label: '编程套餐', desc: '固定月费，高用量' },
      ];
      return (
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text bold>
            {provider.icon} {provider.label} — 选择接入方式
          </Text>
          <Box>
            <Select
              options={modeOptions.map(m => ({
                label: (
                  <Text>
                    {m.label} · <Text dimColor>{m.desc}</Text>
                    {'\n'}
                  </Text>
                ),
                value: m.id,
              }))}
              onChange={value => {
                logEvent('tengu_china_mode_selected', {});
                setOAuthStatus({
                  state: 'china_model_select',
                  provider,
                  mode: value as 'api' | 'coding-plan',
                  activeIndex: 0,
                });
              }}
            />
          </Box>
          <Text dimColor>
            没有套餐？请选择“按量付费”
            {provider.id === 'zhipu' ? ' · GLM-4.7-Flash 永久免费' : ''}
          </Text>
        </Box>
      );
    }

    case 'china_model_select': {
      const { provider, mode: accessMode } = oauthStatus;
      const models = provider.models;
      return (
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text bold>
            {provider.icon} {provider.label} — 选择模型
          </Text>
          <Box>
            <Select
              options={[
                ...models.map(m => {
                  const priceLabel =
                    m.inputPricePerMTok === 0 && m.outputPricePerMTok === 0
                      ? '免费'
                      : `¥${m.inputPricePerMTok}/¥${m.outputPricePerMTok}`;
                  const tagLabel = m.tags?.length ? ` [${m.tags.join(', ')}]` : '';
                  return {
                    label: (
                      <Text>
                        {m.label} ·{' '}
                        <Text dimColor>
                          {priceLabel} · {m.contextWindow}
                          {tagLabel}
                        </Text>
                        {'\n'}
                      </Text>
                    ),
                    value: m.id,
                  };
                }),
                {
                  label: (
                    <Text>
                      ✏️ 自定义模型
                      <Text dimColor> · 手动输入模型名称</Text>
                      {'\n'}
                    </Text>
                  ),
                  value: '__custom__',
                },
              ]}
              onChange={value => {
                logEvent('tengu_china_model_selected', {});
                setOAuthStatus({ state: 'china_apikey', provider, mode: accessMode, modelId: value, apiKey: '' });
              }}
            />
          </Box>
        </Box>
      );
    }

    case 'china_apikey': {
      const { provider, mode: accessMode, modelId } = oauthStatus;

      const [chinaKeyValue, setChinaKeyValue] = useState('');
      const [chinaKeyCursor, setChinaKeyCursor] = useState(0);
      const [chinaKeyError, setChinaKeyError] = useState<string | null>(null);

      const doChinaSave = useCallback(() => {
        const effectiveModelId = modelId === '__custom__' ? chinaKeyValue.trim() : modelId;
        if (!effectiveModelId) {
          setChinaKeyError(modelId === '__custom__' ? '请输入模型名称' : '请输入 API 密钥');
          return;
        }
        if (modelId === '__custom__') {
          logEvent('tengu_china_custom_model_entered', {});
          setOAuthStatus({ state: 'china_apikey', provider, mode: accessMode, modelId: effectiveModelId, apiKey: '' });
          setChinaKeyValue('');
          setChinaKeyError(null);
          return;
        }
        if (!chinaKeyValue.trim()) {
          setChinaKeyError('请输入 API 密钥');
          return;
        }
        const baseUrl = resolveChinaProviderBaseURL(provider.id, accessMode);
        const env: Record<string, string | undefined> = {
          OPENAI_AUTH_MODE: undefined,
          OPENAI_BASE_URL: baseUrl,
          OPENAI_API_KEY: chinaKeyValue.trim(),
          OPENAI_DEFAULT_SONNET_MODEL: modelId,
          OPENAI_DEFAULT_HAIKU_MODEL: modelId,
          OPENAI_DEFAULT_OPUS_MODEL: modelId,
        };
        const settingsUpdate: Parameters<typeof updateSettingsForSource>[1] = {
          modelType: 'openai',
          env: env as unknown as Record<string, string>,
        };
        const { error } = updateSettingsForSource('userSettings', settingsUpdate);
        if (error) {
          setOAuthStatus({
            state: 'error',
            message: '保存设置失败，请重试。',
            toRetry: { state: 'china_apikey', provider, mode: accessMode, modelId, apiKey: chinaKeyValue },
          });
        } else {
          for (const [k, v] of Object.entries(env)) {
            if (v === undefined) {
              delete process.env[k];
            } else {
              process.env[k] = v;
            }
          }
          // Drop any cached OpenAI client and ChatGPT auth so the new
          // provider/credentials take effect on the next request.
          clearOpenAIClientCache();
          void removeChatGPTAuth().catch(() => {});
          logEvent('tengu_china_login_success', {});
          setOAuthStatus({ state: 'success' });
          void onDone();
        }
      }, [chinaKeyValue, provider, accessMode, modelId, onDone, setOAuthStatus]);

      useKeybinding(
        'confirm:no',
        () => {
          setOAuthStatus({ state: 'china_model_select', provider, mode: accessMode, activeIndex: 0 });
        },
        { context: 'Confirmation' },
      );

      const isCustomModelEntry = modelId === '__custom__';
      const allModels = CHINA_LLM_PROVIDERS.flatMap(p =>
        p.models.map(m => ({ id: m.id, label: m.label, provider: p.label })),
      );
      const modelSuggestions = isCustomModelEntry
        ? chinaKeyValue.trim()
          ? allModels.filter(m => m.id.toLowerCase().includes(chinaKeyValue.trim().toLowerCase()))
          : allModels
        : [];
      const keyPage = isCustomModelEntry
        ? provider.apiKeyPage
        : accessMode === 'coding-plan' && provider.codingPlan
          ? provider.codingPlan.purchasePage
          : provider.apiKeyPage;
      const keyFormat = isCustomModelEntry
        ? provider.keyFormat
        : accessMode === 'coding-plan' && provider.codingPlan
          ? provider.codingPlan.keyFormat
          : provider.keyFormat;

      return (
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text bold>
            {provider.icon} {provider.label} {isCustomModelEntry ? '— 自定义模型' : 'API 密钥'}
          </Text>
          <Box flexDirection="column" gap={0}>
            {isCustomModelEntry ? (
              <Text dimColor> 输入该服务商支持的任何模型 ID。浏览模型： {provider.modelsPage}</Text>
            ) : (
              <>
                <Text dimColor> 获取你的密钥： {keyPage}</Text>
                <Text dimColor>
                  {' '}
                  {accessMode === 'coding-plan' ? '在此使用你的编程套餐凭据' : provider.freeTier}
                </Text>
                <Text dimColor> 密钥格式： {keyFormat}</Text>
              </>
            )}
          </Box>
          <Box>
            <Text>{isCustomModelEntry ? '模型名称： ' : 'API 密钥： '}</Text>
            <TextInput
              value={chinaKeyValue}
              onChange={v => {
                setChinaKeyValue(v);
                setChinaKeyError(null);
              }}
              onSubmit={doChinaSave}
              cursorOffset={chinaKeyCursor}
              onChangeCursorOffset={setChinaKeyCursor}
              columns={useTerminalSize().columns - 12}
              mask={isCustomModelEntry ? undefined : '*'}
              focus={true}
            />
          </Box>
          {chinaKeyError ? <Text color="error">{chinaKeyError}</Text> : null}
          {isCustomModelEntry && modelSuggestions.length > 0 && (
            <Box flexDirection="column" gap={0}>
              <Text dimColor>{chinaKeyValue.trim() ? '匹配的模型：' : '已知模型：'}</Text>
              {modelSuggestions.map(m => (
                <Text key={m.id} dimColor>
                  {' '}
                  {m.id}{' '}
                  <Text>
                    ({m.label} — {m.provider})
                  </Text>
                </Text>
              ))}
            </Box>
          )}
          <Text dimColor>
            {isCustomModelEntry ? '按 Enter 继续 · Esc 返回' : '按 Enter 确认 · Esc 返回'}
          </Text>
        </Box>
      );
    }

    case 'platform_setup':
      return (
        <Box flexDirection="column" gap={1} marginTop={1}>
          <Text bold>使用第三方平台</Text>

          <Box flexDirection="column" gap={1}>
            <Text>
              Claude Code 支持 Amazon Bedrock、Microsoft Foundry 和 Vertex AI。请设置所需的环境变量，然后重启 Claude Code。
            </Text>

            <Text>
              如果你属于企业组织，请联系管理员获取配置说明。
            </Text>

            <Box flexDirection="column" marginTop={1}>
              <Text bold>文档：</Text>
              <Text>
                · Amazon Bedrock:{' '}
                <Link url="https://code.claude.com/docs/en/amazon-bedrock">
                  https://code.claude.com/docs/en/amazon-bedrock
                </Link>
              </Text>
              <Text>
                · Microsoft Foundry:{' '}
                <Link url="https://code.claude.com/docs/en/microsoft-foundry">
                  https://code.claude.com/docs/en/microsoft-foundry
                </Link>
              </Text>
              <Text>
                · Vertex AI:{' '}
                <Link url="https://code.claude.com/docs/en/google-vertex-ai">
                  https://code.claude.com/docs/en/google-vertex-ai
                </Link>
              </Text>
            </Box>

            <Box marginTop={1}>
              <Text dimColor>
                Press <Text bold>Enter</Text> to go back to login options.
              </Text>
            </Box>
          </Box>
        </Box>
      );

    case 'waiting_for_login':
      return (
        <Box flexDirection="column" gap={1}>
          {forcedMethodMessage && (
            <Box>
              <Text dimColor>{forcedMethodMessage}</Text>
            </Box>
          )}

          {!showPastePrompt && (
            <Box>
              <Spinner />
              <Text>正在打开浏览器登录…</Text>
            </Box>
          )}

          {showPastePrompt && (
            <Box>
              <Text>{PASTE_HERE_MSG}</Text>
              <TextInput
                value={pastedCode}
                onChange={setPastedCode}
                onSubmit={(value: string) => handleSubmitCode(value, oauthStatus.url)}
                cursorOffset={cursorOffset}
                onChangeCursorOffset={setCursorOffset}
                columns={textInputColumns}
                mask="*"
              />
            </Box>
          )}
        </Box>
      );

    case 'creating_api_key':
      return (
        <Box flexDirection="column" gap={1}>
          <Box>
            <Spinner />
            <Text>正在为 Claude Code 创建 API 密钥…</Text>
          </Box>
        </Box>
      );

    case 'about_to_retry':
      return (
        <Box flexDirection="column" gap={1}>
          <Text color="permission">正在重试…</Text>
        </Box>
      );

    case 'success':
      return (
        <Box flexDirection="column">
          {mode === 'setup-token' && oauthStatus.token ? null : (
            <>
              {getOauthAccountInfo()?.emailAddress ? (
                <Text dimColor>
                  已登录为 <Text>{getOauthAccountInfo()?.emailAddress}</Text>
                </Text>
              ) : null}
              <Text color="success">
                Login successful. Press <Text bold>Enter</Text> to continue…
              </Text>
            </>
          )}
        </Box>
      );

    case 'error':
      return (
        <Box flexDirection="column" gap={1}>
          <Text color="error">OAuth 错误： {oauthStatus.message}</Text>

          {oauthStatus.toRetry && (
            <Box marginTop={1}>
              <Text color="permission">
                Press <Text bold>Enter</Text> to retry.
              </Text>
            </Box>
          )}
        </Box>
      );

    default:
      return null;
  }
}
