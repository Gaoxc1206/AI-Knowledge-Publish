# AI Knowledge Publish

这是 `C:\Users\Chuan\OneDrive\AI-Knowledge` 的公开发布仓库，用 Quartz + GitHub Pages 生成网站。

公开站点：

https://gaoxc1206.github.io/AI-Knowledge-Publish/

## 更新流程

```powershell
cd C:\Users\Chuan\OneDrive\AI-Knowledge-Publish
.\sync-content.ps1
npx quartz build
git add .
git commit -m "Update knowledge base"
git push
```

## 发布安全规则

- 只发布 `content/wiki/` 中适合公开展示的 Markdown 和 `raw/zotero/images/` 中的论文图表。
- 不发布 PDF、Zotero 数据库、脚本、API key、MinerU 原始解析目录和 JSON 元数据。
- `sync-content.ps1` 会在发布副本中删除 `zotero_key`、`source_pdf` 等内部字段。
- 这个仓库对应 GitHub Pages 公开站点，不是私有访问控制系统。
