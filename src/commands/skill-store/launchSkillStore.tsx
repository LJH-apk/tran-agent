import React from 'react';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  logEvent,
} from '../../services/analytics/index.js';
import type { LocalJSXCommandCall } from '../../types/command.js';
import { getClaudeConfigHomeDir } from '../../utils/envUtils.js';
import { createSkill, deleteSkill, getSkill, getSkillVersion, getSkillVersions, listSkills } from './skillsApi.js';
import { SkillStoreView } from './SkillStoreView.js';
import { parseSkillStoreArgs } from './parseArgs.js';

const USAGE =
  '用法：/skill-store list | get ID | versions ID | version ID VER | create NAME MARKDOWN | delete ID | install ID[@VERSION]';

export const callSkillStore: LocalJSXCommandCall = async (onDone, _context, args) => {
  logEvent('tengu_skill_store_started', {
    args: (args ?? '') as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  });

  const parsed = parseSkillStoreArgs(args ?? '');

  // ── invalid args ──────────────────────────────────────────────────────────
  if (parsed.action === 'invalid') {
    logEvent('tengu_skill_store_failed', {
      reason: parsed.reason as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    onDone(`${USAGE}\n${parsed.reason}`, { display: 'system' });
    return null;
  }

  // ── list skills ───────────────────────────────────────────────────────────
  if (parsed.action === 'list') {
    logEvent('tengu_skill_store_list', {});
    try {
      const skills = await listSkills();
      onDone(skills.length === 0 ? '插件市场中没有找到技能。' : `共有 ${skills.length} 个可用技能。`, {
        display: 'system',
      });
      return React.createElement(SkillStoreView, { mode: 'list', skills });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_skill_store_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`获取技能列表失败：${msg}`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'error', message: msg });
    }
  }

  // ── get skill ─────────────────────────────────────────────────────────────
  if (parsed.action === 'get') {
    const { id } = parsed;
    logEvent('tengu_skill_store_get', {
      id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      const skill = await getSkill(id);
      onDone(`已获取技能 ${id}。`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'detail', skill });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_skill_store_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`获取技能 ${id} 失败：${msg}`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'error', message: msg });
    }
  }

  // ── list versions ─────────────────────────────────────────────────────────
  if (parsed.action === 'versions') {
    const { id } = parsed;
    logEvent('tengu_skill_store_versions', {
      id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      const versions = await getSkillVersions(id);
      onDone(
        versions.length === 0 ? `技能 ${id} 没有找到任何版本。` : `技能 ${versions.length} 共有 ${id} 个版本。`,
        { display: 'system' },
      );
      return React.createElement(SkillStoreView, {
        mode: 'versions',
        id,
        versions,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_skill_store_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`获取技能 ${id} 的版本列表失败：${msg}`, {
        display: 'system',
      });
      return React.createElement(SkillStoreView, { mode: 'error', message: msg });
    }
  }

  // ── get specific version ──────────────────────────────────────────────────
  if (parsed.action === 'version') {
    const { id, version } = parsed;
    logEvent('tengu_skill_store_version', {
      id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      const ver = await getSkillVersion(id, version);
      onDone(`已获取技能 ${id}@${version}。`, { display: 'system' });
      return React.createElement(SkillStoreView, {
        mode: 'version-detail',
        version: ver,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_skill_store_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`获取技能 ${version} 的版本 ${id} 失败：${msg}`, {
        display: 'system',
      });
      return React.createElement(SkillStoreView, { mode: 'error', message: msg });
    }
  }

  // ── create skill ──────────────────────────────────────────────────────────
  if (parsed.action === 'create') {
    const { name, markdown } = parsed;
    logEvent('tengu_skill_store_create', {
      name: name as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      const skill = await createSkill(name, markdown);
      onDone(`技能已创建：${skill.skill_id}`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'created', skill });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_skill_store_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`创建技能失败：${msg}`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'error', message: msg });
    }
  }

  // ── delete skill ──────────────────────────────────────────────────────────
  if (parsed.action === 'delete') {
    const { id } = parsed;
    logEvent('tengu_skill_store_delete', {
      id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    try {
      await deleteSkill(id);
      onDone(`技能 ${id} 已删除。`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'deleted', id });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logEvent('tengu_skill_store_failed', {
        reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
      });
      onDone(`删除技能 ${id} 失败：${msg}`, { display: 'system' });
      return React.createElement(SkillStoreView, { mode: 'error', message: msg });
    }
  }

  // ── install skill ─────────────────────────────────────────────────────────
  // parsed.action === 'install'
  const { id, version } = parsed;
  logEvent('tengu_skill_store_install', {
    id: id as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
  });
  try {
    // Fetch the skill markdown body
    let skillName: string;
    let body: string;
    if (version !== undefined) {
      const ver = await getSkillVersion(id, version);
      body = ver.body;
      // Derive a safe name from the version's skill_id or id
      skillName = ver.skill_id;
    } else {
      const skill = await getSkill(id);
      // To get the body we need to fetch the latest version
      const versions = await getSkillVersions(id);
      if (versions.length === 0) {
        onDone(`技能 ${id} 没有可安装的已发布版本。`, {
          display: 'system',
        });
        return React.createElement(SkillStoreView, {
          mode: 'error',
          message: `技能 ${id} 没有可安装的已发布版本。`,
        });
      }
      // Sort by created_at descending and pick latest
      const sorted = [...versions].sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
      const latest = sorted[0];
      if (!latest) {
        onDone(`技能 ${id} 没有可安装的已发布版本。`, {
          display: 'system',
        });
        return React.createElement(SkillStoreView, {
          mode: 'error',
          message: `技能 ${id} 没有可安装的已发布版本。`,
        });
      }
      body = latest.body;
      skillName = skill.name;
    }

    // Sanitize skill name to a safe directory name
    const safeName = skillName.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/^-+|-+$/g, '') || id;

    const skillDir = join(getClaudeConfigHomeDir(), 'skills', safeName);
    const skillPath = join(skillDir, 'SKILL.md');

    await mkdir(skillDir, { recursive: true });
    await writeFile(skillPath, body, 'utf-8');

    onDone(`技能已安装到 ${skillPath}`, { display: 'system' });
    return React.createElement(SkillStoreView, {
      mode: 'installed',
      skillName: safeName,
      path: skillPath,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    logEvent('tengu_skill_store_failed', {
      reason: msg as AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS,
    });
    onDone(`安装技能 ${id} 失败：${msg}`, { display: 'system' });
    return React.createElement(SkillStoreView, { mode: 'error', message: msg });
  }
};
