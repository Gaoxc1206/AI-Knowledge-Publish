---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标蛋白质序列优化"
---
# linear scalarization

## 定义

[[线性标量化]]是一种[[多目标优化]]的基础方法，把多个[[黑盒 oracle|目标函数]]按权重线性加和，转化为单目标优化问题。给定[[Preference Vector|偏好向量]]后，方法通过优化加权和来寻找候选解。上下文中指出，它更适用于凸 [[Pareto front]]；对于[[非凸 Pareto front]]，可能无法覆盖全部 [[Pareto 最优]]区域。

## 关键点

- 将多目标问题写成加权和形式：f_λ(x) = Σ_i λ_i f_i(x)。
- [[Preference Vector|权重向量]] λ 位于概率单纯形上，即各权重非负且和为 1。
- 作为多目标优化的简单 baseline，可用于生成或优化中引入偏好。
- 论文明确指出，线性[[标量化]]更适合凸 Pareto front。
- 在非凸 Pareto front 情况下，它可能遗漏部分 Pareto 最优解。

## 别名

- weighted sum
- weighted-sum scalarization
- 加权和法
- 加权标量化

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
