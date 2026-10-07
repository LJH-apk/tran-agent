# Tran Agent 自动分发

将代码推送到 `LJH-apk/tran-agent` 的 `main` 分支后，GitHub Actions 会自动安装依赖、构建启动器、生成 npm 安装包、验证打包后的启动器，并发布 GitHub Release。也可在 Actions → Release Tran Agent 中手动运行，必须选择 `main` 分支。

每次运行生成独立标签 `build-<运行 ID>`，Release 中包含 `tran-agent-<package.json 版本>.tgz` 和 `SHA256SUMS.txt`。同一次运行重试会更新自己的附件，已有正式版本（例如 `v1.0.0`）不受影响。成功发布的构建会标记为 Latest；构建或上传失败时不会发布不完整的新 Release。

流程使用 GitHub 自动提供的 `GITHUB_TOKEN`，无需配置个人令牌或 npm 令牌，也不会向 npm 注册表发布。包版本由 `package.json` 控制，流程不会自动修改源码中的版本号。

## 推送

本地保留上游 `origin`，Tran 仓库的远程名为 `tran`：

```sh
git push tran HEAD:main
```

只有推送至远程 `main` 才触发发布；本地 `git commit` 不会触发。

## 同伴安装

先安装 Bun 1.3 或更新版本，确认 `bun --version` 能正常运行。最新分发包见：

https://github.com/LJH-apk/tran-agent/releases/latest

下载附件后执行：

```sh
npm install -g ./tran-agent-1.0.0.tgz
tran
```

版本号变化时使用实际下载的文件名。配置仍取自安装者自己的电脑。

## 验证范围

发布流程检查构建、安装包结构和打包后的 `tran --version`。现有 CI 单独运行完整检查；仓库目前有已有的类型依赖缺失与测试失败，因此它不是发布流程的前置条件。后续修复完整检查后，可以将其加入发布门槛。
