---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化、贝叶斯优化"
background: "included"
---
# Tchebycheff scalarization

## 标准定义

Tchebycheff [[Scalarization|scalarization]]（切比雪夫[[Scalarization|标量化]]）是一类将 [[多目标优化]] 问题转化为单目标优化的经典方法。它通常先给定一个参考点（常见为 [[理想点]]），再用加权的最大偏差来度量候选解与参考点之间的距离，例如最小化各目标偏差中的最大值。与简单加权和不同，它更强调对最差目标维度的控制，因此常被用于更好地逼近 [[Pareto front]] 的不同区域。常见变体包括 weighted Tchebycheff 和 augmented Tchebycheff。

## 在本知识库中的用法

在给定论文上下文中，Tchebycheff scalarization 没有被作为直接实验方法使用；论文实际比较的是固定权重的 [[Scalarization|scalarized EI]] 与 [[Expected Hypervolume Improvement|EHVI]]。上下文只把 scalarization 作为一个方法家族来讨论，并指出它还包括 random scalarization、adaptive scalarization 等变体，因此该节点在本知识库中的作用主要是作为标量化类基线方法的背景概念。

## 关键点

- 属于 [[标量化]] 方法家族：通过一个参考点和权重，把多目标压缩为单目标。
- 与加权和相比，Tchebycheff scalarization 更关注最差维度的偏差，因此在非凸或复杂 Pareto 结构下常被认为更稳健。
- 在多目标[[Bayesian optimization|贝叶斯优化]]语境中，它可作为构造 acquisition 的基础，但本库给定论文比较的是固定权重 scalarized EI，而不是该标量化形式本身。
- 它和 [[EHVI]] 代表两种不同思路：前者先压缩目标再优化，后者直接面向 Pareto 覆盖进行优化。
- 当目标偏好不易预先确定时，固定标量化通常只能覆盖 [[Pareto Front|Pareto 前沿]]的一部分，需要多次改变权重才能得到更全面的 trade-off 解。

## 别名

- Tchebycheff scalarization
- Tchebychev scalarization
- Tchebycheff 标量化
- 切比雪夫标量化
- Chebyshev scalarization
- weighted Tchebycheff
- Tchebycheff method
- max-min scalarization
- achievement scalarizing function

## 外部背景

- Tchebycheff 标量化也常写作 Chebyshev scalarization，核心是最小化加权的最大偏差。
- 常见扩展是 augmented Tchebycheff，在最大偏差之外加入较小的和项以改善解的分布，待核对经典来源。
- 该方法常用于生成一组不同权重下的解，从而近似恢复整个 [[Pareto Front|Pareto front]]。
- 在工程和优化教材中，它通常被归为 decomposition-based [[多目标优化|multi-objective optimization]] 的基础工具，待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
