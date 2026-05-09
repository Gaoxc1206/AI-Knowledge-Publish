---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Tanimoto similarity

## 标准定义

Tanimoto similarity（也常称 [[Tanimoto kernel|Tanimoto coefficient]]）是基于两个集合交并关系的相似性度量，常用于比较[[分子指纹]]：将分子表示为二值或计数向量后，按“交集/并集”思想计算相似度，取值通常在 0 到 1 之间，越大表示越相似。[[化学信息学]]中，它常被用来衡量分子[[药物相似性|结构相似性]]、筛选近邻分子、以及作为生成/优化任务中的相似性约束或目标。

## 在本知识库中的用法

在本知识库所对应的论文中，Tanimoto similarity 主要作为[[分子优化]]中的“保持结构相似性”指标出现：[[MOMO]] 将其与 [[QED]]、[[PlogP]]、[[DRD2]] 一起作为多目标评价的一部分，在[[隐式化学空间]]中搜索既接近先导分子又提升性质的候选分子。另一篇 [[Large Language Model|LLM]] 分子优化论文中，Tanimoto similarity 用于筛选相似分子对，构建训练语料与优化提示；其中还提到使用 [[ECFC4 fingerprint]] 重新计算相似性，并采用相似度阈值（如 ≥ 0.8）来抽取相关分子对。

## 关键点

- Tanimoto similarity 是分子结构相似性最常用的度量之一，适合与[[分子指纹]]结合使用。
- 在分子优化任务中，它常被当作约束：既要提升目标性质，也要尽量保持与先导分子的相似性。
- 在 [[MOMO]] 中，Tanimoto similarity 与性质指标共同构成[[多目标优化]]问题，而不是单独作为后处理筛选条件。
- 在 LLM 分子优化语料构建中，Tanimoto similarity 用来挑选相似分子对，帮助模型学习“结构修改—性质变化”的对应关系。
- 具体实现时可基于不同指纹计算相似度；不同 fingerprint 可能导致数值有差异，因此实验设置需要注明。

## 别名

- Tanimoto coefficient
- Tanimoto coefficient similarity
- Jaccard similarity（分子指纹语境）

## 外部背景

- Tanimoto similarity 通常可视为集合版 Jaccard 相似度在[[ECFP|分子指纹]]上的化学信息学实现。
- 对于二值指纹，Tanimoto 值越高，通常表示两个分子共享的结构片段越多，但不等同于性质完全相同。
- 它常见于虚拟筛选、近邻检索、骨架保持优化和 scaffold hop 等任务。
- 待核对经典来源
- 待核对经典来源

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
