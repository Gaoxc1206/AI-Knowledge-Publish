---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# Pareto 最优

## 标准定义

Pareto 最优（[[Pareto optimality|帕累托最优]]/[[Pareto optimality|帕累托效率]]）是[[多目标优化]]中的标准概念：如果不存在另一个可行解能在所有目标上都不差、并且至少在一个目标上更好，那么该解就是 Pareto 最优解。所有这类不可被支配的解共同构成 [[Pareto front]]，其判定基础是 [[Pareto dominance]]。

## 在本知识库中的用法

在本文的 [[MOMO]] 框架中，Pareto 最优用于多目标分子筛选与进化更新：将解码后的分子同时按 [[QED]]、[[PlogP]]、[[DRD2]] 活性以及与先导分子的 [[Tanimoto similarity]] 进行评价，保留[[Non-dominated Solutions|非支配解]]并推进下一代种群。最终输出的不是单个“加权最优”分子，而是一组位于 [[Pareto-front]] 上、体现不同权衡偏好的候选分子。

## 关键点

- 标准含义上，Pareto 最优强调“不可被同时全面超越”，适合描述多个目标之间存在冲突的情形。
- [[Pareto front]] 表示一组 [[非支配解]]，这些解对应不同的目标权衡，而不是一个唯一最优点。
- 在本文中，Pareto 最优发生在分子解码之后的序列层面，用于比较多个性质指标，而不是直接在 [[latent chemical space|latent space]] 中做单分数排序。
- MOMO 通过 Pareto-based 选择来避免把 QED、PlogP、DRD2 和相似性简单压成一个加权目标，从而更充分探索 trade-off。
- 该用法的目标是返回一组具有不同偏好的高质量分子，便于后续按药物设计需求再筛选。

## 别名

- 帕累托最优
- 帕累托效率
- 非支配最优
- Pareto optimality
- Pareto efficiency

## 外部背景

- 在多目标优化里，Pareto 最优常被用作无偏好基准：它不预设各目标权重，而是保留所有无法被进一步改进的解。
- 与加权求和相比，Pareto 方法更适合发现非凸前沿上的解，也更能保留多样性。
- 常见相关变体包括 weak Pareto optimality、strict Pareto optimality 和 ε-Pareto optimality；待核对经典来源。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
