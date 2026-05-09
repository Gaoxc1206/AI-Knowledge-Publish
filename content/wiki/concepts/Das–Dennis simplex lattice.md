---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化"
background: "included"
---
# Das–Dennis simplex lattice

## 标准定义

Das–Dennis simplex lattice 是一种在 [[simplex]] 上构造离散点集的方法，常用于 [[多目标优化]] 中生成近似均匀分布的[[Preference Vector|权重向量]]或 [[reference direction]]。其基本思想是把 simplex 按给定分辨率离散化，从而得到一组覆盖不同偏好的方向，用于分解、排序或引导搜索。

## 在本知识库中的用法

在这篇论文中，Das–Dennis simplex lattice 用来在多目标 simplex 上生成一组 trade-off 权重向量 ω。作者从这些离散方向中随机选取 ω，以覆盖不同的 Pareto 区域，并作为 [[MOG-DFM]] 中 rank-directional scoring 和 hypercone 过滤的偏好输入。

## 关键点

- 它的核心作用是把连续的 simplex 偏好空间离散化，便于系统性枚举多目标权重方向。
- 在标准[[多目标优化]]里，它常被用来构造参考方向，支持对 [[Pareto front]] 的分布式覆盖。
- 在本库论文中，它不直接参与模型训练，而是为 MOG-[[Discrete Flow Matching|DFM]] 提供多组 trade-off 向量 ω。
- 论文通过随机采样不同 ω，来让生成过程覆盖多个目标折中区域，而不是只偏向单一偏好。
- 这种离散方向集适合与基于[[Directional alignment|方向一致性]]的引导机制配合使用，但本身不保证找到 [[Pareto 最优]]解。

## 别名

- Das-Dennis lattice
- simplex-lattice
- simplex lattice design
- Das and Dennis method
- 参考方向生成法

## 外部背景

- Das–Dennis 方法通常与整数划分有关：在给定分割数 H 下，枚举满足坐标和为 1 的离散点，形成 simplex lattice。
- 该构造在很多[[多目标进化算法]]中用于生成均匀参考方向，尤其常见于 [[NSGA-III]]。
- 其优点是覆盖性强、实现简单；局限是高维时可用方向数增长很快，且均匀性会受分割参数影响。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
