---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# Pareto Dominance

## 标准定义

Pareto Dominance（帕累托支配）是[[多目标优化]]中的基本比较关系：如果解 A 在所有目标上都不差于解 B，并且至少在一个目标上严格优于 B，则称 A 支配 B。由此定义的非支配解集合构成 [[Pareto front]]，用于表示不同目标之间的权衡最优解。它强调“相对支配关系”，而不是把多个目标通过简单加权压成单一分数。

## 在本知识库中的用法

在论文 [[MOMO]] 中，Pareto dominance 被用作多属性[[分子优化]]的核心选择准则：[[QED]]、[[PlogP]]、DRD2、Similarity 等目标被保持为独立维度，而不是做 [[权重和]]。模型通过 non-domination rank、reference point mechanism 和 dynamic acceptance probability 进行种群更新，最终保留位于 Pareto-front 的候选分子。这里的用法重点是：在[[隐式化学空间]]中进化，但在分子层面依据 Pareto 支配关系筛选下一代。

## 关键点

- 标准含义上，A 支配 B 需要满足“所有目标不劣，至少一个目标更优”；这是一种偏序关系，不是总排序。
- 在 [[多目标优化]] 中，Pareto Dominance 常用于识别非支配解，并据此构建 [[Pareto front]] 作为候选解集合。
- 论文 MOMO 将它用于多属性分子优化，避免把 QED、PlogP、DRD2、Similarity 这类目标粗暴合并。
- 该方法通过 non-domination rank 和参考点机制筛选个体，兼顾质量与多样性。
- 与单目标加权相比，Pareto-based 选择更能保留不同偏好方向上的分子解，适合先导分子优化场景。

## 别名

- Pareto支配
- 帕累托支配
- non-dominance
- 支配关系

## 外部背景

- Pareto dominance 是经济学和优化理论中的经典概念，常用于描述“帕累托最优/帕累托改进”。
- 在[[Multi-objective Evolutionary Algorithm|多目标进化算法]]中，常配合 [[非支配排序]]、[[拥挤距离]]或参考点策略使用，以维持种群多样性。
- Pareto front 上的解彼此通常不可直接比较优劣，只能说它们代表不同的目标权衡。
- 在药物分子设计中，Pareto dominance 常用于同时考虑活性、相似性、可合成性、毒性等多个性质。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
