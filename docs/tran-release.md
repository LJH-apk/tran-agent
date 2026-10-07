# Tran Agent 自动分发

将代码推送到 `LJH-apk/tran-agent` 的 `main` 分支后，GitHub Actions 会自动安装依赖、构建启动器、生成 npm 安装包、验证打包后的启动器，并发布 GitHub Release。也可在 Actions → Release Tran Agent 中手动运行，必须选择 `main` 分支。

每次发布使用版本标签 `v1.0.x`，Release 中包含 `tran-agent-<package.json 版本>.tgz` 和 `SHA256SUMS.txt`。同一提交重试会更新自己的附件，已有正式版本（例如 `v1.0.0`）不受影响。成功发布的构建会标记为 Latest；构建或上传失败时不会发布不完整的新 Release。

流程使用 GitHub 自动提供的 `GITHUB_TOKEN`，无需配置个人令牌或 npm 令牌，也不会向 npm 注册表发布。包版本由 `package.json` 控制，规则为 `1.0.x`，每次发布前递增 x（例如 1.0.2 → 1.0.3）。界面版本也由该文件生成。流程不会自动提交版本变更；发现同一版本已属于其他提交时会停止，避免覆盖旧版本。

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
npm install -g ./tran-agent-1.0.2.tgz
tran
```

版本号变化时使用实际下载的文件名。配置仍取自安装者自己的电脑。

## 验证范围

发布流程检查构建、安装包结构和打包后的 `tran --version`。仓库只保留此发布流程。完整类型与测试检查需在提交前本地执行；目前有已有的类型依赖缺失与测试失败，因此完整检查不是发布流程的前置条件。后续修复完整检查后，可以将其加入发布门槛。
