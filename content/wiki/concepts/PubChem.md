---
type: "concept"
status: "enriched"
category: "数据集"
domain: "分子生成与分子优化"
background: "included"
---
# PubChem

## 标准定义

PubChem 是由美国 NIH/NCBI 维护的开放化学信息库，收录化合物、物质与生物测定等多类记录，常用于检索分子结构、性质、同义名、[[bioassay|生物测定]]与活性信息。它支持以结构式、名称、PubChem CID 等方式检索，并提供可用于 [[SMILES]]、子结构搜索和相似性搜索的标准化化学表示。

## 在本知识库中的用法

在该论文中，PubChem 被用作构建小分子大规模训练语料的核心来源：作者从 PubChem dumps 搭建 SQL 数据库，整理了分子、相似分子对、实验性质、bioassays、PubChem CID、同义名以及计算得到的分子性质。数据截止到 2023-01-26，过滤掉无法被 [[RDKit]] 解析的 [[SMILES]]，并据此形成超过 110M 小分子的训练集合；另外还从 PubChem related molecule data 中抽取高相似度分子对，用于[[controllable generation|条件生成]]和优化提示。

## 关键点

- PubChem 在本知识库中主要承担 [[分子生成]] / [[分子优化]] 的大规模数据源角色，而不是作为评测基准。
- 论文从 PubChem 中抽取了海量小分子，并将其标准化为可供[[大语言模型|语言模型]]学习的 [[SMILES]] 文本。
- 除了结构信息，作者还把实验性质、bioassays、同义名和计算性质一起纳入语料，以增强[[性质预测]]与条件生成能力。
- 作者使用 PubChem 的 related molecule 数据构建相似分子对，并结合 [[Tanimoto similarity]] 与 [[ECFC4 fingerprint]] 重新计算相似性。
- PubChem 数据被整理成带标签的 JSONL 模板，支持模型学习从分子到性质、从性质到分子的双向映射。

## 别名

- PubChem数据库
- PubChem DB
- PubChem Compound
- PubChem Substance
- PubChem CID

## 外部背景

- PubChem 是典型的公共化学数据库，常与 ChEBI、[[ZINC]]、ChEMBL 等资源一起用于分子建模任务。
- PubChem 中的 CID（Compound ID）常被用作化合物的稳定标识符，便于跨数据库对齐。
- PubChem 的结构检索与相似性检索常依赖标准化结构、指纹和 Tanimoto 相似度；具体实现细节需待核对经典来源。
- PubChem 的 bioassay 数据常用于[[药物发现]]中的活性学习、性质预测和多任务表示学习。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
