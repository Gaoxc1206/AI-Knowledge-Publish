---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "小分子生成与优化"
background: "included"
---
# SMILES

## 标准定义

SMILES（Simplified Molecular Input Line Entry System）是一种用线性字符串表示化学分子结构的文本编码方式，可将原子、化学键、支链、环闭合、芳香性以及部分立体化学信息写成可机器处理的序列。它常用于[[分子表示]]、分子数据库检索、性质预测与[[条件生成]]任务中；实践中还常区分 canonical SMILES、non-canonical SMILES 和 isomeric SMILES。

## 在本知识库中的用法

在本知识库收录的两篇论文中，SMILES 主要作为小分子结构的统一文本表示：一方面用于构建大规模分子语料，把分子结构与计算/实验性质共同组织成可训练的序列；另一方面用于 LLM 的性质预测、条件生成与黑盒[[分子优化]]。具体来说，bedrosianSmallMoleculeOptimization 中用 RDKit 统一标准化 SMILES、丢弃无法解析的分子，并将 SMILES 与性质标签、相似性提示一起输入模型；deyLargeLanguageModels2025 中则将分子对与属性级指令组织成可控多属性优化样本，依赖 SMILES 作为输入/输出的结构载体。

## 关键点

- SMILES 是把分子结构转成单行文本的标准表示，适合与[[语言模型]]直接结合。
- 在化学 NLP 中，SMILES 既可作为输入表示，也可作为生成目标，用于性质预测、条件生成和[[分子优化]]。
- 同一分子可对应多个 SMILES；因此数据构建时常需要 canonicalization 以统一表示。
- 在本知识库中，SMILES 被用作大规模语料的核心结构编码，并与性质数值、相似分子提示和指令文本共同组成训练样本。
- SMILES 的可解析性和规范化质量会直接影响模型训练与优化效果，尤其在基于文本的[[分子生成]]中。

## 别名

- Simplified Molecular Input Line Entry System
- SMILES字符串
- 化学字符串表示

## 外部背景

- SMILES 最初由 Daylight 系列工具推广，是化学信息学中最常见的线性分子表示之一。
- canonical SMILES 用于为同一分子确定唯一字符串，便于去重、检索和标准化处理。
- isomeric SMILES 可显式编码手性、双键构型等立体化学信息。
- SMILES 是许多化学语言模型、分子生成模型和分子检索系统的基础输入格式。
- 待核对经典来源

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
