---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
---
# Multiple Gradient Descent

## 定义

Multiple Gradient Descent（[[MGD]]）是一种[[多目标优化]]方法，用于在多个[[黑盒 oracle|目标函数]]之间寻找一个共同的下降方向。它不是对目标做固定权重求和，而是在当前点动态求解一个方向，使所有目标中下降最慢的那个也尽可能下降。根据论文中的描述，当多个目标梯度冲突严重时，MGD 可能返回零方向，表示已经到达局部 Pareto 点或无法继续同时改进。该方法可用于多目标采样与优化，并被论文用于蛋白质/抗体序列的 Pareto 改进方向搜索。

## 关键点

- 核心思想是选择一个更新方向，让多个目标尽可能同时下降，而不是用固定权重做[[标量化]]。
- 方向由一个优化问题确定：最大化所有目标中最小的梯度下降率，并约束方向范数不超过 1。
- 根据论文中的推导，该方向可等价为多个目标梯度的加权组合，权重由一个[[凸优化|凸优化问题]]求得。
- 当目标之间冲突很强时，MGD 可能得到零方向，这通常对应局部 [[Pareto 最优]]或 Pareto 平稳点。
- 论文将 MGD 用作 [[pcEBM]] 的核心方向选择机制，在每一步采样时动态引导样本向多目标更优区域移动。

## 别名

- MGD
- 多重梯度下降
- Multiple Gradient Descent Algorithm
- Pareto gradient descent

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
