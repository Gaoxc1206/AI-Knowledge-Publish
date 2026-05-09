---
type: "method"
status: "enriched"
category: "优化方法"
domain: "蛋白质序列设计、多目标优化"
---
# Function-guided protein design

## 定义

一种面向蛋白质/抗体序列的功能引导设计方法，核心是把多个性质对应的[[Energy-Based Model|能量模型]]组合起来，并在采样时沿着 Pareto 改进方向更新序列。该思路不依赖固定权重求和，而是用 [[Multiple Gradient Descent]] 动态寻找能同时推动多个目标下降的方向，再结合 [[Langevin Dynamics]] 进行探索。当前上下文中的具体实现主要对应 [[Pareto-compositional energy-based model]]（[[pcEBM]]），用于[[抗体设计]]中的多性质权衡采样。

## 关键点

- 为每个目标性质训练一个 [[Energy-Based Model]]，例如 Ab-like、[[binding affinity]]（Aff）、[[nonspecificity]]（[[BV score]]）等。
- 不是简单把多个目标加权求和，而是利用 Pareto / [[多目标优化]]思想寻找能兼顾多个目标的更新方向。
- 更新方向由 Multiple Gradient Descent 给出，目标是让所有属性尽可能同时下降，而不是偏向某一个固定权重。
- 采样过程结合 Langevin Dynamics 的噪声项，以便在接近 [[Pareto front]] 时继续探索更广的候选序列空间。
- 相比[[线性标量化]]或普通 [[compositional EBM]]，p[[cEBM]] 更强调对[[非凸 Pareto front]] 的覆盖与多目标权衡质量。
- 论文实验主要在抗体设计任务中验证了该方法在 [[Hypervolume]] 和[[edit distance|编辑距离]]等指标上的表现。

## 别名

- pcEBM
- Pareto-compositional energy-based model
- Pareto compositional EBM
- Pareto-compositional EBM

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
