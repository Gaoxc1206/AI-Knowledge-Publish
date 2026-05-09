---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标优化与蛋白质序列优化"
background: "included"
---
# MGDA

## 标准定义

[[MGD]]A 通常指 [[Multiple Gradient Descent|Multiple Gradient Descent Algorithm]]（[[MGD|多重梯度下降]]算法）。它用于[[多目标优化]]：在多个[[黑盒 oracle|目标函数]]同时存在时，不把它们简单加权成一个标量目标，而是寻找一个[[梯度聚合|梯度组合]]方向，使当前步尽可能同时改善各目标。常见做法是求解一个关于各目标梯度的凸组合问题，得到最小范数的共同下降方向；若不存在共同下降方向，得到的解可能对应局部 Pareto 驻点。这个概念本质上是 [[Pareto 最优]]化中的一种梯度型求解方法。

## 在本知识库中的用法

在这篇论文中，MGDA 用来为 pcEBM 提供每一步的 Pareto 改进方向：不是直接对多个性质能量做固定权重求和，而是根据当前序列在各性质上的梯度动态求一个共同下降方向，再结合 Langevin 噪声进行采样。论文将其用于蛋白质/抗体序列的多性质优化，目标是在 Ab-like、[[binding affinity]]、[[BV score]] 等冲突属性之间沿 [[Pareto front]] 探索候选序列。

## 关键点

- MGDA 是一种多目标梯度法，核心是用 [[Pareto optimality|Pareto]] 视角寻找“共同下降”方向，而不是单目标最优。
- 标准形式通常通过求解各目标梯度的凸组合，得到最小范数的组合梯度；这对应一个动态的 Pareto 改进方向。
- 与线性标量化不同，MGDA 不依赖固定权重，因此更适合处理目标冲突明显、Pareto front 非凸的情形。
- 在本库论文中，MGDA 被嵌入 [[Energy-Based Model|EBM]] 的采样过程，作为 pcEBM 的方向选择模块。
- 论文中的用法强调“每一步都重新计算方向”：当梯度冲突严重时，MGDA 可能停在局部 Pareto 点；当接近 Pareto front 时，再由噪声维持探索。
- 如果证据不足，可继续从更多多目标优化或生成式优化论文中补充 MGDA 的变体与适用条件。

## 别名

- Multiple Gradient Descent Algorithm
- Multiple Gradient Descent
- MGD
- Pareto descent direction

## 外部背景

- MGDA 常与 [[Multiple Gradient Descent]] 互指，核心思想是对多个目标梯度做最优组合，寻找公共下降方向。
- 经典多目标优化中，MGDA 常被视为一种 Pareto-descending 方法；待核对经典来源。
- 当目标数较多时，MGDA 的子问题通常是一个小规模凸优化，可用高效数值方法求解；待核对经典来源。
- MGDA 与梯度投影、最小范数梯度组合、冲突梯度处理等方法在思想上相近，但并不完全等同；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
