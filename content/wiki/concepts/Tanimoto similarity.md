---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Tanimoto Similarity

## 标准定义

Tanimoto Similarity 是一种常用于化学信息学的相似度指标，用来衡量两个分子在[[分子指纹]]空间中的重叠程度。对二值指纹而言，它通常定义为交集与并集之比；数值越高，表示两个分子在结构特征上越相似。在分子设计中，它经常被用作与先导分子的结构保持度指标，也可作为优化目标或约束。

## 在本知识库中的用法

在本知识库给定论文中，Tanimoto Similarity 主要被用作先导分子与优化后分子之间的结构相似性度量，服务于多目标[[分子优化]]任务。[[MOMO]] 将其与 [[QED]]、[[PlogP]]、DRD2 等性质一起作为独立目标，在不同任务中要求相似性达到阈值或尽量保持较高；论文中的相似性计算基于 [[Morgan fingerprints]]。另一篇比较 EHVI 与固定标量化的论文中，Tanimoto distance threshold 被用于 #Circles 多样性指标的阈值设定，说明该相似度/距离还常用于刻画候选分子的结构覆盖与去重。

## 关键点

- Tanimoto Similarity 本质上是分子结构特征重叠度的度量，常基于[[分子指纹]]计算。
- 在分子优化中，它既可以作为目标，也可以作为约束，用于控制优化分子与先导分子的结构保真度。
- 本库论文中，MOMO 直接把相似性与 QED、PlogP、DRD2 等性质共同纳入[[多目标优化]]，强调 trade-off 而不是单一加权分数。
- 论文上下文明确提到相似性计算采用基于 [[Morgan fingerprints]] 的 Tanimoto similarity。
- Tanimoto threshold 还被用于评估结构多样性或筛选不同程度的化学相异候选分子。
- 在多目标场景中，较高的 Tanimoto Similarity 往往意味着更强的先导保留，但也可能与性质提升形成冲突。

## 别名

- Tanimoto coefficient
- Tanimoto coefficient similarity
- Jaccard similarity（化学指纹语境下）
- Tanimoto index

## 外部背景

- 待核对经典来源：Tanimoto Similarity 在信息检索与化学指纹比较中都很常见，化学领域通常将其视为 Jaccard 系数在[[Molecular Fingerprints|分子指纹]]上的对应形式。
- 待核对经典来源：对二值 bit vector，Tanimoto Similarity 可写为 A∩B / A∪B；对 count-based 特征，常有相应的推广形式。
- 待核对经典来源：在[[药物发现]]中，它常用于 scaffold similarity、lead hopping、nearest-neighbor retrieval 和多样性筛选。
- 待核对经典来源：与 Tanimoto 相近的还有 Tversky similarity，后者可通过偏置参数强调“保留母体”或“探索新结构”的不同偏好。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
