---
type: meta
status: active
tags:
  - workflow
  - maintenance
---
# AI 文献知识库维护流程

这页只回答一个问题：**现在应该做哪一步**。它不是研究地图，不放在 `wiki/maps/`。

## 总原则

Zotero 是文献源，Obsidian 是中文知识库。每次只处理一个 Zotero collection，先小批量检查质量，再扩大。

```text
Zotero -> sync_zotero_library.py -> 资源修复/审计 -> 节点创建/补全 -> Obsidian 阅读 -> 可选发布
```

## 判断树

### 1. 还没有导入这批论文

先从 Zotero 同步：

```powershell
python scripts\sync_zotero_library.py --collection 多目标分子优化 --limit 10 --ai --overwrite-notes --mineru-api
```

如果只重跑一篇：

```powershell
python scripts\sync_zotero_library.py --collection 多目标分子优化 --citekey deyLargeLanguageModels2025 --translate-filenames --overwrite-pdfs --mineru-api
```

然后进入第 2 步。

### 2. 刚同步完论文

先做确定性维护，不调用 LLM：

```powershell
python scripts\repair_paper_assets.py --overwrite-resources
python scripts\organize_entity_nodes.py
python scripts\normalize_nodes.py
python scripts\clean_mineru_cache.py
python scripts\fix_obsidian_math.py
python scripts\audit_knowledge_base.py
python scripts\update_index.py
```

然后打开：

```text
raw/zotero/knowledge_audit.json
```

根据审计结果继续判断。

### 3. 如果 `broken_images` 不是 0

先不要发布，也不要继续美化图谱。图片断链优先级最高。

通常做法：

```powershell
python scripts\repair_paper_assets.py --overwrite-resources
python scripts\audit_knowledge_base.py
```

如果仍然有断链，查看 `knowledge_audit.json` 中具体是哪篇论文、哪张图。通常原因是早期笔记引用了 `raw/zotero/mineru/**/images` 临时目录，需要重新跑该论文的 MinerU 提取：

```powershell
python scripts\sync_zotero_library.py --collection 多目标分子优化 --citekey 论文citekey --translate-filenames --overwrite-pdfs --mineru-api
python scripts\repair_paper_assets.py --overwrite-resources
python scripts\audit_knowledge_base.py
```

只有 `broken_images = 0` 后，才进入下一步。

### 4. 如果有论文缺少“代码与数据”或图片链接异常

运行：

```powershell
python scripts\repair_paper_assets.py --overwrite-resources
python scripts\audit_knowledge_base.py
```

这一脚本负责：

- 从论文笔记和 MinerU `full.md` 提取代码、数据集、benchmark、项目链接。
- 修复图片路径。
- 删除旧的 `## 关键图表` 和 `## 全部图表清单` 索引章节。

### 5. 如果 `duplicate_page_names` 很多

不要让 LLM 直接批量删除。先人工看 `knowledge_audit.json` 里的候选。

确定是同一概念、同一方法或明显错分后，把规则写进：

```text
scripts/normalize_nodes.py
```

然后运行：

```powershell
python scripts\normalize_nodes.py
python scripts\audit_knowledge_base.py
```

例子：

- `PlogP`、`pLogP`、`Penalized logP` 统一到 `Penalized-logP`。
- `datasets/QED.md` 不合理，应并入 `concepts/QED.md`。
- `models/GFlowNets.md` 不合理，应并入 `methods/GFlowNets.md`。

### 6. 如果 `unresolved_links` 很多

先实体化论文关系章节里的概念、方法、数据集和模型节点：

```powershell
python scripts\materialize_link_nodes.py
python scripts\organize_entity_nodes.py
python scripts\audit_knowledge_base.py
```

如果仍有很多未解析链接，通常有三类原因：

- 该术语确实应该建成新节点。
- 中文名/英文名/缩写还没合并到 canonical 文件。
- 早期 AI 生成了过度链接，应该降噪。

需要降噪时运行：

```powershell
python scripts\clean_paper_links.py
python scripts\audit_knowledge_base.py
```

### 6.1 如果论文的相关概念/方法/数据集/模型不全

先让 LLM 根据论文正文和已有节点别名，重新校准论文关系章节。建议先 dry-run：

```powershell
python scripts\refine_paper_relationships.py "wiki\papers\多目标分子优化\某篇论文.md" --dry-run
```

确认结果合理后，再处理一批：

```powershell
python scripts\refine_paper_relationships.py --root "wiki\papers\多目标分子优化" --limit 5
python scripts\materialize_link_nodes.py --root "wiki\papers\多目标分子优化"
python scripts\organize_entity_nodes.py --root "wiki\papers\多目标分子优化"
python scripts\audit_knowledge_base.py
```

这个步骤应该在 `enrich_nodes.py` 之前或之后都可以运行；区别是：节点页已经 enrich 过时，别名更多，脚本更容易复用已有 canonical 节点。

### 7. 如果知识节点页还是 stub

这一步才调用 LLM 补节点：

```powershell
python scripts\enrich_nodes.py --type concept --limit 20 --with-background
python scripts\enrich_nodes.py --type method --limit 20 --with-background
python scripts\enrich_nodes.py --type dataset --limit 20 --with-background
python scripts\enrich_nodes.py --type model --limit 20 --with-background
```

只补一个节点：

```powershell
python scripts\enrich_nodes.py --name 多目标优化 --with-background --all
```

补完后，如果想让知识节点页内部也有适度双链：

```powershell
python scripts\link_nodes.py --type concept --limit 50 --max-links 10
python scripts\link_nodes.py --type method --limit 50 --max-links 10
python scripts\link_nodes.py --type dataset --limit 50 --max-links 10
python scripts\link_nodes.py --type model --limit 50 --max-links 10
```

### 8. 如果需要检查节点内容、别名和错分目录

这一步只让 LLM 出审查报告，不直接改文件。它适合在 `enrich_nodes.py` 之后运行，用来发现：
- 中文名/英文名/缩写是否应该合并。
- 别名是否会误导合并，例如把上位概念当成同义词。
- 节点是否放错了 `concepts/methods/datasets/models` 目录。
- 定义、关键点、相关论文是否过空或不准确。

先小批量检查：

```powershell
python scripts\review_node_quality.py --type all --limit 50 --only-issues
```

确认报告风格可靠后再全量：

```powershell
python scripts\review_node_quality.py --type all --limit -1 --only-issues
```

报告位置：

```text
raw/zotero/node_quality_review.json
```

如果报告里只是内容空或别名缺失，优先用 `enrich_nodes.py` 修补；如果报告里明确指出“同一个实体应合并”，再进入下一步 `dedupe_nodes.py`。

### 9. 如果出现同义重复节点

先只生成候选表：

```powershell
python scripts\dedupe_nodes.py --suggest --llm-review --auto-approve-llm
```

人工检查 `raw/zotero/node_dedupe_suggestions.json`。通过 LLM 复审的候选会自动写成 `"approved": true`；不想合并的候选手动改回 `"approved": false`。确认后再执行：

```powershell
python scripts\dedupe_nodes.py --apply
python scripts\dedupe_nodes.py --cleanup-aliases
python scripts\audit_knowledge_base.py
python scripts\update_index.py
```

`--apply` 会合并内容并回写链接；`--cleanup-aliases` 会删除已经安全回写后的 alias 跳转页，避免文件树里继续显示重复节点。

### 10. 如果论文正文太干净，想给重点论文加少量链接

不要全库激进加链。只对重点论文运行：

```powershell
python scripts\link_paper_terms.py "wiki\papers\多目标分子优化\某篇论文.md" --max-links 20
```

如果图谱变乱，再运行：

```powershell
python scripts\clean_paper_links.py
```

### 11. 如果准备发布到 Quartz/GitHub Pages

先确保本地审计没有图片断链：

```powershell
python scripts\audit_knowledge_base.py
```

然后进入发布仓库：

```powershell
cd C:\Users\Chuan\OneDrive\AI-Knowledge-Publish
.\sync-content.ps1
npx quartz build
git add .
git commit -m "Update knowledge base"
git push
```

## 脚本分工

### 必用主流程

- `sync_zotero_library.py`：从 Zotero 导入论文、PDF、MinerU 图表、中文论文笔记。
- `repair_paper_assets.py`：修复图片、代码/数据链接，并删除图表索引章节。
- `audit_knowledge_base.py`：审计断链、缺章节、重复节点、未解析链接。
- `update_index.py`：更新 Obsidian 首页。

### 节点维护

- `materialize_link_nodes.py`：把论文里的概念、方法、数据集、模型双链变成真实文件。
- `refine_paper_relationships.py`：用 LLM 反向校准论文的相关概念、方法、数据集、模型章节。
- `enrich_nodes.py`：用 LLM 补概念、方法、数据集、模型定义、关键点、别名、分类。
- `review_node_quality.py`：用 LLM 直接审查概念、方法、数据集、模型节点内容，生成潜在合并、错误别名、错分目录和内容质量报告；只出报告，不改文件。
- `link_nodes.py`：给概念、方法、数据集、模型页内部添加适度双链。
- `normalize_nodes.py`：合并确定的重复节点、错分节点、别名节点。
- `dedupe_nodes.py`：生成重复节点候选表，并按人工确认结果合并节点、回写论文链接。
- `organize_entity_nodes.py`：把明确的数据集和模型写入 `datasets/`、`models/`。

### 清理和修复

- `clean_mineru_cache.py`：清掉 MinerU 中间文件，保留 `full.md` 和配套 `images/`，避免原始解析 Markdown 断图。
- `fix_obsidian_math.py`：统一 Obsidian 可渲染的公式格式。
- `clean_paper_links.py`：清理论文正文中过量双链。
- `link_paper_terms.py`：给重点论文正文加少量受控双链。

### 发布专用

- `prepare_public_content.py`：发布到 Quartz 前清理公开内容；由 `AI-Knowledge-Publish\sync-content.ps1` 调用，平时不用手动跑。

## 已删除旧脚本

- `enrich_paper.py`：早期单篇论文补全脚本，已被 `sync_zotero_library.py` 和 `repair_paper_assets.py` 覆盖。
