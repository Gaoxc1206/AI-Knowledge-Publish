---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化"
background: "included"
---
# Morgan fingerprint

## 标准定义

Morgan fingerprint 是一种基于原子局部邻域迭代构建的[[ECFP|分子指纹]]表示，常被视为 [[ECFP]] 的通用实现形式。它将分子中每个原子的局部环境按半径逐层编码，并映射到固定长度或全维度的特征向量中，用于[[药物相似性|分子相似性]]计算、检索、分类和[[性质预测]]。实际工程中常通过 [[RDKit]] 生成，并可采用二值型或计数型两种变体；相似性通常用 [[Tanimoto similarity]] 一类度量来比较。

## 在本知识库中的用法

在当前知识库上下文中，Morgan fingerprint 主要作为[[多目标贝叶斯优化]]中的分子表示输入，用于把分子转成可供 [[Gaussian Process]] surrogate 建模的特征向量。论文采用的是 radius = 3 的 count-based Morgan fingerprint，并使用全维度、不截断的表示；同时配合适合计数特征的 [[MinMax kernel]] 来刻画分子之间的[[药物相似性|结构相似性]]。这里它不是生成模型的[[隐式化学空间|隐空间]]，而是一个固定、可解释、便于核方法处理的手工特征表示。

## 关键点

- Morgan fingerprint 本质上是局部子结构哈希表示，适合把分子结构转成机器学习可用的向量特征。
- 标准用法中，它既可做二值指纹，也可做计数指纹；后者能保留子结构出现次数信息。
- 在本知识库里，它被用于固定表示分子，并喂给 [[Gaussian Process]] 做多目标[[Bayesian Optimization|贝叶斯优化]]。
- 论文中采用 radius = 3 的 count-based 版本，并将其与 [[MinMax kernel]] 结合，适合处理计数特征。
- 它更偏向于相似性检索和传统机器学习场景，而不是端到端生成式分子建模。
- 若需要更细粒度的化学子结构语义，通常还会与其他表示或图模型方法结合。

## 别名

- ECFP
- Morgan 指纹
- Extended-Connectivity Fingerprint
- Circular fingerprint

## 外部背景

- Morgan 指纹来源于原子环境逐层扩展的思想，是[[化学信息学]]中最常用的分子指纹之一。
- [[ECFP]]（[[ECFP|Extended-Connectivity Fingerprint]]）是 Morgan fingerprint 最常见的现代叫法之一，二者在很多语境下近似等同。
- 常见变体包括 bit fingerprint 和 count fingerprint；前者强调是否出现，后者强调出现次数与频率。
- 它广泛用于相似性搜索、虚拟筛选、QSAR 和分子性质建模；具体实现细节以 [[RDKit]] 为代表的工具链最常见。
- 与 Morgan fingerprint 配套的相似性指标通常是 Tanimoto 类度量；涉及 count feature 时常会使用其变体，待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
