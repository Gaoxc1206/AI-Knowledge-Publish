---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生物序列多目标优化"
background: "included"
---
# locally balanced proposals

## 标准定义

Locally balanced proposals（局部平衡提议）是 [[Markov chain Monte Carlo]] 中的一类局部提议机制：在离散邻域内生成候选状态时，不只依赖基础提议概率，还会乘上反映目标分布局部偏好的权重，并通过满足 g(u)=u g(1/u) 的 balancing function 维持平衡性。它通常与 [[Metropolis-Hastings]] 结合，用于在离散空间中提高接受率、改善混合效率，并更有效地探索高概率区域。

## 在本知识库中的用法

在 [[AReUReDi]] 中，locally balanced proposals 用于单个 token 的替换式更新：先用预训练的 [[Rectified Discrete Flows]] 提供位置级转移先验，再结合由 [[Tchebycheff scalarization]] 构造的 annealed reward ratio 调整候选 token 的 proposal 概率，最后通过 [[Metropolis-Hastings]] 接受/拒绝。其作用是把多目标引导直接嵌入离散序列采样，使样本逐步逼近 [[Pareto front]] 附近的高质量区域。

## 关键点

- 本质上是面向离散状态空间的局部提议机制，常见于 token 替换、单点翻转等邻域更新，而不是[[连续隐空间|连续潜空间]]扰动。
- 核心是 balancing function g(u)=u g(1/u)，用来把基础提议与局部目标偏好结合起来。
- 与 [[Metropolis-Hastings]] 配合时，可保持目标分布的不变性，并常用于提升采样接受率与 mixing。
- 在本知识库论文中，它承接 [[Rectified Discrete Flows]] 的 token 级生成先验，并把多目标 reward 注入 proposal 阶段。
- 它使采样过程从单纯生成变为“局部搜索 + 随机采样”的混合式[[多目标优化]]过程。

## 别名

- local balanced proposals
- locally balanced proposal
- 局部平衡提议
- LBP

## 外部背景

- 局部平衡提议常见于离散随机游走和可逆 [[MCMC]]；经典变体包括 Barker 型和 square-root 型 balancing function。
- 在高维离散空间中，相比直接对目标分布做全局提议，局部平衡方法通常更容易实现，也更便于控制接受率与计算开销。
- 它与 [[Metropolis-Hastings]] 的关系是：在 proposal 设计阶段就尽量满足局部对称/平衡条件，从而简化接受概率或提升采样效率。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
