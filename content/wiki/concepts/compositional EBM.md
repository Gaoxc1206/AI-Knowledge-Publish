---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标蛋白质序列生成"
background: "included"
---
# compositional EBM

## 标准定义

Compositional [[Energy-Based Model|EBM]]（[[cEBM|组合式能量模型]]）是指将多个[[Energy-Based Model]]按某种组合规则联合起来建模或采样的方法。常见做法是把多个能量函数相加，或等价地采用 [[product of experts]] 形式，使模型同时满足多个条件、属性或约束。其采样通常仍依赖 [[Langevin dynamics]] 或其他基于梯度的随机采样过程。背景知识上，它强调“组合多个局部目标/条件”来得到更可控的生成分布，而不是只训练单一全局能量。

## 在本知识库中的用法

在这篇论文中，compositional EBM 主要作为蛋白质/抗体序列多性质优化的基础框架：每个性质对应一个属性[[Energy-Based Model|能量模型]]，然后通过合取式组合把多个性质同时纳入采样。论文先用传统 [[cEBM]] 作为对照，即将多个性质能量直接相加并用 Langevin 采样；随后提出 [[pcEBM]]，把 [[Multiple Gradient Descent]] 引入组合式采样中，用动态的 Pareto 改进方向替代固定加权，从而更好地在 [[Pareto front]] 附近探索并生成满足 Ab-like、[[binding affinity]]、[[BV score]] 等多目标权衡的序列。

## 关键点

- 标准上，compositional EBM 解决的是“多个条件/属性如何在一个生成模型里联合表达”的问题，核心是把多个能量项组合起来，而不是只学一个单一目标。 
- 在该论文的用法里，组合对象是多个蛋白质性质模型，因此 compositional EBM 被用来做多属性序列采样与优化，而不是单纯无[[controllable generation|条件生成]]。
- 论文中的 cEBM 可以理解为“把多个属性能量直接求和再采样”的基线；pcEBM 则进一步用 [[Multiple Gradient Descent]] 计算 Pareto 方向，缓解固定权重导致的偏置。
- 与只追求单点最优不同，这里组合式 EBM 的目标是覆盖一组在多个性质之间不同权衡的候选序列，因此与 [[Pareto front]] 紧密相关。
- 该框架把能量驱动的[[controllable generation|可控生成]]和[[多目标优化]]结合起来，适合存在性质冲突的蛋白质/抗体设计任务。

## 别名

- compositional energy-based model
- cEBM
- 组合式能量模型
- product-of-experts EBM

## 外部背景

- 组合式生成模型常见于条件生成、属性控制和约束满足场景；在能量模型里通常体现为多个能量项的加和或专家乘积。
- [[product of experts]] 是组合多个概率专家的经典思路，常被视为 compositional EBM 的概率解释之一。
- EBM 的采样通常依赖基于梯度的随机动力学，如 Langevin dynamics；待核对经典来源。
- 在多目标设置下，组合式 EBM 也可与标量化、约束优化或 Pareto 方法结合使用；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
