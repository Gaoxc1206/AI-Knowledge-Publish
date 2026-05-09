---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# Pareto-front

## 标准定义

Pareto-front（[[Pareto front|帕累托前沿]]）是[[多目标优化]]中所有[[非支配解]]构成的集合：若一个解在各目标上都不劣于另一个解，且至少一个目标更优，则后者被前者通过[[Pareto dominance]]支配。前沿上的解通常代表不同目标之间的最优权衡，而不是单一标量意义上的全局最优。

## 在本知识库中的用法

在 [[MOMO]] 论文中，Pareto-front 指最后一代种群里经过基于[[Pareto dominance]]的评价后保留下来的候选分子集合。它用于同时表达 [[QED]]、[[PlogP]]、[[DRD2]] 活性与与先导[[药物相似性|分子相似性]]之间的不同权衡；作者强调把相似性也作为目标而非仅作为阈值，有助于得到更有意义的前沿解。

## 关键点

- Pareto-front 不是单个最优解，而是一组彼此不可直接用单一分数比较优劣的候选解。
- 它体现的是多个目标之间的 trade-off；不同点对应不同偏好，例如更偏性质提升、保留相似性或兼顾两者。
- 在本文 MOMO 中，Pareto-front 是通过在[[隐式化学空间]]中进行[[进化搜索]]并在解码后的分子层面做多属性评价得到的。
- 论文中的前沿分子可同时覆盖高 QED、高 P[[logP]]、高 DRD2 活性和高相似性等不同方向，而不是被加权求和压缩成一个目标。
- 把相似性纳入目标集合后，前沿能保留更丰富的候选分子，支持后续按具体药物设计偏好再筛选。

## 别名

- 帕累托前沿
- 帕累托前线
- 非支配前沿
- Pareto frontier
- Pareto front

## 外部背景

- 经典[[多目标优化]]中，Pareto-front 常用于衡量算法找到的解集质量：越接近真实前沿、覆盖越全面，通常越好。
- 常见相关概念包括 [[Pareto set]]、近似 Pareto-front，以及基于[[非支配排序]]的选择策略。
- 待核对经典来源：不同教材对 Pareto-front 与 Pareto optimal set 的区分表述略有差异。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
