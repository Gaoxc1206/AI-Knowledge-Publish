---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "分子设计与多目标贝叶斯优化"
background: "included"
---
# structure-property relationship

## 标准定义

structure-property relationship 指分子或材料的结构特征与其可观测性质之间的对应关系：给定结构表示（如拓扑、官能团、指纹、三维构型），可以预测或解释其性质表现（如活性、[[logP]]、[[QED]]、稳定性、毒性等）。在 [[分子设计]] 中，这一关系通常被视为“从结构到性质”的映射，也是 [[分子性质预测]]、优化与生成模型的基础。对于复杂体系，这种关系往往是非线性、多对一且带有噪声的，因此只能通过统计学习或物理建模近似。

## 在本知识库中的用法

在这篇分子设计论文中，structure-property relationship 主要体现在：用 Morgan/[[ECFP]] 指纹和 [[MinMax kernel]] 表征分子[[药物相似性|结构相似性]]，再通过独立的 [[Gaussian Process]] 近似多个性质目标，比较 EHVI 与[[固定权重标量化]] EI 在不同结构-性质权衡区域上的搜索效果。论文的实际关注点不是显式学习结构-性质机理，而是检验哪种 [[acquisition function|acquisition]] strategy 更能利用这种映射，提升 [[Pareto front]] 覆盖、化学[[chemical diversity|结构多样性]]与收敛速度。

## 关键点

- 它描述的是 [[分子结构]] 与 [[分子性质]] 之间的映射关系，是分子优化问题的核心背景概念。
- 在标准意义上，这种关系通常是非线性、噪声较大且可能多对一，因此需要 surrogate model 进行近似。
- 该论文将其具体化为：结构由 Morgan/ECFP 指纹与 MinMax kernel 表达，性质由 Gaussian Process 分别建模。
- 论文比较的是两种优化策略如何沿着不同的 structure-property trade-off 区域搜索，而不是直接学习新的结构-性质机理。
- 从结果看，EHVI 更有利于探索多个性质目标之间的不同权衡点，并提升结构多样性。

## 别名

- 结构-性质关系
- structure-property correlation
- SPR
- structure-property mapping

## 外部背景

- 在化学信息学中，structure-property relationship 常被简写为 SPR，经典任务包括性质预测、QSAR/QSPR 与分子优化。
- 常见结构表示包括分子指纹、图表示、SMILES 和 3D 构型；不同表示会影响关系建模的精度与可解释性。
- 对于单调或近似凸的目标，简单标量化有时足够；但当 structure-property relationship 对应的 Pareto front 非凸时，Pareto-aware 方法通常更合适。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
