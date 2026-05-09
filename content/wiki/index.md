---
type: index
status: active
---
# AI 文献知识库首页

这个 Vault 用于把 Zotero 中的论文、PDF、标注和关键图转成可维护的中文 AI 研究知识库。

## 当前规模

- 论文笔记：16 篇
- 概念节点：356 个
- 方法节点：260 个

## 主要入口

- [[AI 文献知识库工作流]]
- [[多目标优化]]
- [[多目标分子优化]]
- [[多模态多目标优化]]

## 论文库

### 多目标分子优化

路径：`wiki/papers/多目标分子优化/`

这个方向目前包含分子设计、蛋白质序列设计、Pareto-aware optimization、EHVI、GFlowNets、扩散模型、多目标 LLM 等论文。

常用入口：

- [[多目标优化]]
- [[多目标贝叶斯优化]]
- [[Expected Hypervolume Improvement]]
- [[Pareto front]]
- [[分子表示]]

### 多模态多目标

路径：`wiki/papers/多模态多目标/`

这个方向目前包含多峰/多模态多目标优化、决策空间多样性、适应度共享、收敛性指标和拥挤距离等论文。

常用入口：

- [[多模态多目标优化]]
- [[决策空间多样性]]
- [[多峰多目标优化]]
- [[适应度共享]]
- [[协同进化]]

## 知识节点

- `wiki/concepts/`：概念节点，回答“这个概念是什么、在多篇论文中如何被使用”。
- `wiki/methods/`：方法节点，回答“这个方法怎么工作、解决什么问题、有什么局限”。
- `wiki/maps/`：研究地图和主题路线。
- `wiki/questions/`：研究问题和综合回答。

## 推荐使用流程

每次处理一个 Zotero collection：

```powershell
python scripts\sync_zotero_library.py --collection 多目标分子优化 --limit 10 --ai --overwrite-notes --key-figures 3
python scripts\clean_paper_links.py
python scripts\materialize_link_nodes.py
python scripts\enrich_nodes.py --type concept --limit 20
python scripts\enrich_nodes.py --type method --limit 20
python scripts\fix_obsidian_math.py
```

## 常用维护命令

### 同步并生成论文笔记

```powershell
python scripts\sync_zotero_library.py --collection 多目标分子优化 --limit 10 --ai --overwrite-notes --key-figures 3
```

### 只更新中文文件名和关键图

```powershell
python scripts\sync_zotero_library.py --collection 多目标分子优化 --limit 20 --translate-filenames --key-figures 3
```

### 创建真实概念/方法节点

```powershell
python scripts\materialize_link_nodes.py
```

### 补全概念/方法节点

```powershell
python scripts\enrich_nodes.py --type concept --limit 20
python scripts\enrich_nodes.py --type method --limit 20
```

### 修复公式格式

```powershell
python scripts\fix_obsidian_math.py
```

### 降低图谱噪声

```powershell
python scripts\clean_paper_links.py
```

## 图谱使用

全局图谱只用于观察整体结构。真正有用的是：

- 论文页的局部图谱
- 概念页的反向链接
- 方法页连接的论文集合
- `wiki/maps/` 中人工整理的研究地图

如果图谱太乱，先运行：

```powershell
python scripts\clean_paper_links.py
python scripts\materialize_link_nodes.py
```

如果图谱几乎没了，通常是概念/方法页没有实体文件，运行：

```powershell
python scripts\materialize_link_nodes.py
```

## 维护原则

- Zotero 是 source of truth，Obsidian 是 synthesized knowledge。
- `raw/` 保存原始 PDF 和关键图，少手工改。
- `wiki/papers/` 记录单篇论文。
- `wiki/concepts/` 和 `wiki/methods/` 承担跨论文综合。
- 不要为了图谱好看而过度链接。
- AI 生成内容需要人工审阅。
