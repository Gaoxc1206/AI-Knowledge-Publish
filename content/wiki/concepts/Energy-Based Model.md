---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "蛋白质序列设计与多目标优化"
background: "included"
---
# Energy-Based Model

## 标准定义

Energy-Based Model（EBM，能量基模型）是一类用能量函数 E(x) 对样本 x 进行打分的生成模型。通常把低能量解释为更符合数据分布或任务约束，并通过 p(x) ∝ exp(-E(x)) 定义未归一化概率分布。EBM 的学习目标通常是让真实样本能量更低、负样本能量更高；推断和采样常借助 [[Langevin Dynamics]]、[[MCMC]] 等方法。EBM 也常与 [[contrastive divergence]]、product-of-experts 等思想结合使用。

## 在本知识库中的用法

在这篇论文中，EBM 被用来表示蛋白质/抗体序列在单个性质上的“可行性”或“适配度”，例如 Ab-like、[[binding affinity]]、[[BV score]] 等。每个性质可对应一个单独的能量函数，再通过组合式采样把多个性质同时纳入生成过程。论文进一步把 EBM 与 [[Multiple Gradient Descent]] 结合，提出 [[pcEBM]]：不是简单对多个能量做固定加权求和，而是在采样时动态寻找更接近 [[Pareto front]] 的改进方向，用于生成或优化多性质兼顾的序列。

## 关键点

- EBM 的核心是用能量函数表示样本质量：能量越低，样本越符合模型或约束。
- 与显式归一化的生成模型不同，EBM 通常只定义未归一化分布，因此采样阶段很重要，常配合 [[Langevin Dynamics]] 使用。
- 在多属性任务中，EBM 可以被拆成多个属性子模型；论文中的 p[[cEBM]] 就是把多个性质能量组合起来做序列采样。
- 该论文没有把多个目标简单做固定权重求和，而是借助 [[Multiple Gradient Descent]] 计算动态的 Pareto 改进方向。
- 这种用法特别适合蛋白质/[[抗体设计]]中的冲突目标，因为单个最优解往往不存在，重点转向寻找更好的 [[Pareto front]] 覆盖。
- 从库内语境看，EBM 更像是“可控序列生成的评分器 + 采样引擎”，服务于多性质蛋白质[[inverse design|逆向设计]]。

## 别名

- EBM
- 能量基模型
- 能量模型
- Energy Based Model
- Energy-Based Modeling

## 外部背景

- EBM 是一个通用生成建模框架，标准形式是通过能量函数刻画数据密度，低能量对应高概率。
- 经典 EBM 训练常涉及最大似然近似、[[contrastive divergence]] 或其他基于采样的梯度估计。
- EBM 与 product-of-experts 有天然联系：多个约束或属性可以通过能量相加实现组合。
- 待核对经典来源：EBM 在深度学习中的系统综述、以及基于 Langevin 采样的标准推导。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
