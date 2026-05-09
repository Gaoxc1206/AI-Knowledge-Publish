---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标黑箱优化"
background: "included"
---
# Multi-target Boltzmann Distribution

## 标准定义

Multi-target [[Boltzmann Distribution]] 可理解为一种把多个[[黑盒 oracle|目标函数]]通过指数权重映射为概率密度的目标分布：在给定 [[base distribution]] 的前提下，低“能量”或更优的样本会获得更高概率，常见形式与 [[Boltzmann distribution]] 的指数倾斜有关。在多目标情形下，它通常不是单一标量目标的分布，而是多个目标项的加权和、混合或其他组合，用来表达对不同权衡解的偏好，并间接覆盖 [[Pareto front]] 的不同区域。它往往可以从带 [[KL散度]] 正则的[[Distributional Optimization|分布优化]]视角导出。

## 在本知识库中的用法

在这篇论文中，Multi-target Boltzmann Distribution 被具体写成[[多目标黑盒优化|多目标黑箱优化]]的目标分布：先为每个目标构造指数倾斜分布，再将其混合，得到形如 p_base(x) 乘以多目标权重和的分布。该分布不是通过重新训练模型得到，而是在[[扩散模型]]推理阶段通过候选评估与 [[重采样]] 逐步逼近，用于 [[扩散模型]] 的反向生成过程。它是 [[IMG]] 的核心目标分布，用来在单次推理中生成覆盖不同目标权衡的分子候选。

## 关键点

- 本质上，它把“多目标更优”转化为“样本更高概率”，因此与 [[Boltzmann distribution]] 和能量视角密切相关。
- 多目标情形通常不是单个标量打分，而是多个目标项的指数组合或混合，以覆盖 [[Pareto front]] 的不同权衡区域。
- 这种分布常可由带 [[KL散度]] 正则的分布优化推导出来，核心约束是不要偏离 [[base distribution]] 太远。
- 在本文语境中，它被嵌入 [[扩散模型]] 的推理过程，通过 [[重采样]] 把生成分布推向多目标目标分布。
- 它面向黑盒目标函数，强调无需可微梯度，也不依赖重新训练 surrogate model。

## 别名

- multi-objective Boltzmann distribution
- 多目标玻尔兹曼分布
- Boltzmann mixture distribution

## 外部背景

- 经典 Boltzmann 分布在统计物理中写作 p(x) ∝ exp(-E(x)/T)，在生成建模里常被用作“低能量高概率”的一般模板。
- 带 KL 正则的分布优化可导出指数倾斜形式；待核对经典来源。
- [[多目标优化]]里常见的相关做法包括[[标量化]]、加权和、混合分布与 Pareto 采样；待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
