---
type: "method"
status: "enriched"
category: "生成模型"
domain: "蛋白质序列生成与优化"
background: "included"
---
# Deep manifold sampling

## 标准定义

Deep manifold sampling 通常指：借助[[深度生成模型]]、[[Energy-Based Model]]、[[扩散模型]]或潜变量模型，在学习到的低维数据流形附近进行采样，而不是在高维原空间中无约束地随机搜索。其目标是让采样结果既保持与数据分布一致的“可行性/自然性”，又能通过梯度引导、随机扰动或条件约束探索新的高质量样本。

## 在本知识库中的用法

待从更多论文中补充。当前给定论文主要讨论的是 [[Pareto front]] 导向的 [[Energy-Based Model]] 组合采样：通过 [[Multiple Gradient Descent]] 与 [[Langevin Dynamics]] 在蛋白质/抗体序列空间中寻找多目标权衡候选，但并未直接定义“Deep manifold sampling”这一术语。

## 关键点

- 标准上，它强调在学习到的流形上采样，而不是在原始高维空间中盲采样，因此常与 [[生成模型]]、[[Energy-Based Model]] 和随机动力学方法一起使用。
- 它通常兼顾两件事：一是样本落在数据流形附近，二是沿着任务目标方向移动，因此既可用于生成，也可用于优化。
- 在本库当前上下文中，论文的相关做法更接近“在序列能量景观上做受约束采样”：用 [[Langevin Dynamics]] 结合多目标的 Pareto 改进方向来生成抗体序列。
- 该论文的重点不是“流形”本身，而是如何让采样沿 [[Pareto front]] 覆盖多个性质权衡；因此这一定义只能作为背景概念理解。
- 与简单的加权求和不同，这里采样方向由 [[Multiple Gradient Descent]] 动态决定，更适合非凸多目标场景。

## 别名

- 深度流形采样
- 流形采样
- deep manifold sampling

## 外部背景

- 常见于高维生成任务：通过学习数据流形来提升样本[[validity|有效性]]、新颖性与可控性。
- 在 [[Energy-Based Model|EBM]] 体系中，流形附近采样常通过梯度下降/上升与噪声注入实现，形式上与 [[Langevin Dynamics]] 关系密切。
- 在表示学习中，它也常与 [[流形学习]]、局部邻域结构和低维潜空间解释结合。
- 待核对经典来源

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
