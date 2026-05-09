---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "优化理论"
background: "included"
---
# Bregman divergence

## 标准定义

Bregman divergence（Bregman 散度/距离）是由一个可微严格凸函数 \(\phi\) 诱导的非对称差异度量：\(D_\phi(p,q)=\phi(p)-\phi(q)-\langle \nabla \phi(q), p-q\rangle\)。它衡量点 \(p\) 相对于 \(q\) 在 \(\phi\) 的切平面上的偏离。该量通常非负，并在 \(p=q\) 时取 0，但一般不满足对称性和三角不等式，因此严格来说不是欧氏意义上的距离。一个常见例子是由负熵诱导的 [[KL 散度]]；更一般地，它与 [[凸函数]] 的一阶近似残差密切相关。

## 在本知识库中的用法

待从更多论文中补充；当前给定论文主要讨论[[Dirichlet Flow Matching|多目标引导离散流匹配]]（[[MOG-DFM]]）、[[CTMC]] 采样、[[Pareto front]] 方向控制与 hypercone 过滤，未直接使用 Bregman divergence。

## 关键点

- Bregman divergence 可理解为由 [[凸函数]] 的一阶泰勒展开残差定义的非对称差异。
- 它常用于 [[镜像下降]]、近端方法、聚类和信息几何等场景，是优化中常见的替代“距离”函数。
- 当潜在函数取负熵时，Bregman divergence 会对应到 [[KL 散度]]，因此在概率分布比较中很常见。
- 在当前论文上下文中未被显式提及；与文中的多目标引导[[Discrete Flow Matching|离散流匹配]]、token 级转移速率重加权没有直接对应关系。

## 别名

- Bregman distance
- Bregman 散度
- Bregman 距离
- 布雷格曼散度

## 外部背景

- 经典定义来自凸分析与信息几何；待核对经典来源。
- Bregman divergence 的几何解释是“[[黑盒 oracle|目标函数]]值”与“在参考点处线性化后的值”之间的差。
- 常见变体包括对称化 Bregman divergence，但这类变体通常不再保留原始的诱导几何结构。
- Bregman 投影与 Bregman 近端映射常用于约束优化和在线学习。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
