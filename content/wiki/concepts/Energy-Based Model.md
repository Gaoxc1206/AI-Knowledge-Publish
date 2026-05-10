---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "蛋白质序列生成与多目标优化"
background: "included"
---
# Energy-Based Model

## 标准定义

Energy-Based Model（EBM，能量基模型）是一类用标量能量函数 E(x) 表达样本“好坏”的概率模型，通常令未归一化密度 p(x) ∝ exp(-E(x))。训练目标是让真实数据样本具有更低能量、非数据样本具有更高能量；生成时常通过 [[Langevin Dynamics]] 或其他 MCMC 方法沿能量下降方向采样。它既可以建模数据分布，也常用于条件生成、约束优化和搜索问题。

## 在本知识库中的用法

在本文中，EBM 被用于蛋白质/抗体序列采样与优化，并与 [[Compositional Energy-Based Model]] 结合形成 pcEBM。论文不是只追求单一最优序列，而是希望在多个性质上同时获得较优候选，尤其关注 Ab-like、Aff 和 BV score 之间的权衡。具体做法是在多属性 EBM 的采样过程中引入 [[Multiple Gradient Descent]]，用更接近 [[Pareto front]] 的方向替代简单能量求和梯度，从而在真实抗体设计任务中获得更好的多目标覆盖与更稳定的采样表现。

## 关键点

- 标准上，EBM 用一个能量函数把样本映射到实数标量，能量越低表示越符合模型偏好；采样通常依赖 [[Langevin Dynamics]] 等随机梯度方法。
- 本文中的 EBM 主要服务于蛋白质序列生成，不是做分类或回归，而是作为可组合的属性打分器与采样器。
- 与朴素的 [[Compositional Energy-Based Model]] 不同，pcEBM 在采样时不直接把多个能量简单相加，而是用 [[Multiple Gradient Descent]] 找到更合适的多目标改进方向。
- 该方法的目标是生成位于或接近 [[Pareto front]] 的抗体候选，使 Ab-like、Aff、BV score 等性质之间可调权衡。
- 实验上，pcEBM 在多目标 [[Hypervolume Indicator|Hypervolume]] 和 edit distance 指标上总体优于或接近强基线，说明 EBM 作为[[可控生成]]框架在该任务中有效。
- 这类 EBM 更强调“沿能量地形搜索”而非一次性前向生成，因此适合逆向设计和局部优化场景。

## 别名

- EBM
- 能量基模型
- 能量模型

## 外部背景

- EBM 是生成建模中的经典框架之一，核心思想是用能量函数间接定义概率分布；待核对经典来源。
- 在生成任务中，EBM 常与 MCMC、[[Langevin Dynamics]]、score-based 方法或对比学习式训练结合；待核对经典来源。
- 多属性/条件场景下，EBM 可通过 product of experts 或 compositional 方式组合多个约束；待核对经典来源。
- EBM 的优势通常是表达灵活、便于注入约束，但代价是采样和训练可能更慢、更不稳定；待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
