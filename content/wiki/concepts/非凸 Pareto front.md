---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标蛋白质序列优化"
background: "included"
---
# 非凸 Pareto front

## 标准定义

在[[多目标优化]]中，[[Pareto front]] 是所有[[Non-dominated Solutions|非支配解]]在[[目标空间]]中的集合；其中如果前沿对应的目标空间形状是非凸的，则称为非凸 Pareto front。其重要含义是：基于[[线性标量化]]（加权求和）的方法通常只能覆盖“可支持”的 Pareto 点，可能无法遍历非凸部分的 [[Pareto 最优]]解。

## 在本知识库中的用法

在这篇 [[pcEBM]] 论文中，非凸 Pareto front 被用来说明简单的线性[[标量化]]在多目标蛋白质/抗体序列优化里存在覆盖盲区：当 Ab-like、[[binding affinity|Aff]]、[[BV score]] 等性质彼此冲突时，只把多个能量或目标加权求和，可能只能得到一部分 Pareto 最优解。论文因此引入 [[Multiple Gradient Descent]] 与 [[compositional Energy-Based Model]] 的组合采样思路，希望在采样过程中更好地逼近并覆盖这类非凸 Pareto front。

## 关键点

- 非凸 Pareto front 描述的是多目标问题中“不可由单一权重线性标量化完全覆盖”的 Pareto 最优区域。
- 它常出现在目标之间强冲突、权衡关系复杂的任务中，尤其适合解释为什么只用 [[linear scalarization]] 不够。
- 论文将其作为多目标抗体序列生成的关键难点：既要优化 [[Ab-like]]，也要兼顾 [[binding affinity]] 与 [[BV score]] 等性质。
- pcEBM 通过动态寻找 Pareto 改进方向，而不是固定权重求和，目标之一就是更好地探索这类非凸前沿。
- 在这个知识库中，它更偏向一个多目标优化层面的理论概念，而不是具体模型结构。

## 别名

- 非凸帕累托前沿
- non-convex Pareto front
- nonconvex Pareto front
- 非凸帕累托边界

## 外部背景

- 常见背景：若 Pareto front 是凸的，线性标量化通常可以通过改变权重遍历较多 Pareto 点；若是非凸的，则会遗漏一部分最优权衡点。
- 常见变体：文献中也会把“supported Pareto points / unsupported Pareto points”与非凸 Pareto front 联系起来，待核对经典来源。
- 在经典多目标优化教材中，处理非凸 Pareto front 的方法还包括 ε-constraint、进化算法和基于梯度的多方向下降方法，待核对经典来源。
- 在生成式设计任务里，非凸 Pareto front 常用于解释为什么需要面向多目标的采样而不是单一打分。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
