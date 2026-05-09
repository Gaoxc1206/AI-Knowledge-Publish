---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子设计"
background: "included"
---
# Tchebycheff scalarization

## 标准定义

Tchebycheff [[scalarization]]（也常写作 Chebyshev scalarization）是一类把多个[[黑盒 oracle|目标函数]]压缩为单个标量的[[多目标优化]]方法。其典型思想不是简单把目标加权求和，而是通过“最弱目标”来刻画解的整体质量：若各目标先被归一化，再结合权重，标量分数通常由各目标中的最小值或最大加权偏差决定，从而鼓励解在所有目标上都保持较均衡的表现。相较于固定加权和，这类[[标量化]]更适合强调 trade-off 平衡，也常用于逼近 [[Pareto front]]。

## 在本知识库中的用法

在 [[AReUReDi]] 的离散多目标引导中，Tchebycheff scalarization 被用来把多个归一化后的性质分数合成为一个 reward：论文采用的是 $S_\omega(x)=\min_n \omega_n\tilde{s}_n(x)$ 这种“最弱目标”式的标量化，再进一步做 [[annealed guidance]]，用于引导 [[Rectified Discrete Flows]] 的采样朝近似 [[Pareto front]] 的区域移动。它在这里不是单独作为优化器使用，而是作为多目标 guidance 的核心打分函数，并与 [[locally balanced proposals|locally balanced proposal]] 和 [[Metropolis-Hastings]] 更新结合。

## 关键点

- 标准定义上，它属于把多目标问题转成单目标打分的 [[scalarization]] 方法，核心是让样本在多个目标上都不过度偏科。
- 与固定权重的加权和不同，Tchebycheff scalarization 更强调“最弱目标”或最大偏差，因此常被认为更适合平衡型解搜索。
- 本知识库中的用法来自 AReU[[ReDi]]：先对多个生物序列性质做归一化，再用 $\min_n \omega_n\tilde{s}_n(x)$ 构造多目标 reward。
- 该 reward 会随 [[simulated annealing|annealing]] 逐步增强引导强度，使离散采样先探索、后收敛到更高质量的候选区域。
- 它在这里的作用是为[[离散生成模型]]提供可采样的多目标偏好信号，而不是直接替代 [[Pareto front]] 评估。

## 别名

- Chebyshev scalarization
- weighted Tchebycheff scalarization
- Tchebycheff method
- maximin scalarization

## 外部背景

- 常见经典变体包括 weighted Tchebycheff、augmented Tchebycheff 等；其中 augmented 版本通常会在极值项之外加入一个小的和项以改善解的分布，待核对经典来源。
- 在[[多目标优化]]教材中，Tchebycheff scalarization 常被用于近似非凸 Pareto 前沿，因为它通常比简单加权和更不容易漏掉某些前沿区域，待核对经典来源。
- 该方法在工程和运筹优化中很常见，通常需要先设定理想点/乌托邦点或对目标做归一化，再结合权重定义标量目标，待核对经典来源。
- 在分子设计与序列生成任务中，它常被用作多目标 guidance 或 reward shaping 的组成部分，而不是最终评价指标，待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
