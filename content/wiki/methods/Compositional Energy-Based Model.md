---
type: "method"
status: "enriched"
category: "生成方法"
domain: "多目标蛋白质序列生成"
background: "included"
---
# Compositional Energy-Based Model

## 标准定义

Compositional [[Energy-Based Model]]（c[[Energy-Based Model|EBM]]）是一类把多个 [[能量基模型]] 按组合方式联合起来的生成框架：通常为不同属性或约束分别建模，再通过能量相加、[[product of experts]] 或其他组合规则得到联合分布，并借助 [[Langevin Dynamics]] 等基于梯度的采样方法生成样本。其核心用途是把多个目标同时纳入生成过程，而不是只优化单一属性。Pareto-compositional 变体进一步把采样过程与 [[多目标优化]] 结合，试图在多个目标之间沿着 [[Pareto front]] 附近探索。

## 在本知识库中的用法

在这篇论文中，Compositional Energy-Based Model 指的是用于抗体/蛋白质序列多目标采样的 cEBM 框架，并进一步发展为 pcEBM。作者先为单个属性训练[[Energy-Based Model|能量模型]]，再在采样时不直接使用简单的能量求和梯度，而是把 [[multiple gradient descent]] 引入每一步更新，求一个对多个性质都尽量有利的 Pareto 改进方向。该方法用于同时考虑 Ab-like、binding affinity 和 BV score 三个目标，从而生成更接近 [[Pareto Front|Pareto front]] 的候选抗体序列；实验上在较小步长下表现出更好的 hyper-volume 覆盖和更低的平均 edit distance。

## 关键点

- 标准 cEBM 的思路是把多个条件/属性对应的能量组合起来，再用梯度采样生成样本；pcEBM 则把采样方向改成基于 [[multiple gradient descent]] 的 Pareto 方向。
- 本文中的用法面向抗体[[蛋白质序列设计|序列设计]]，重点处理 Ab-like、Aff、BV score 三个目标之间可能冲突的问题，而不是追求单点最优。
- pcEBM 的目标不是找到唯一最优解，而是沿着 [[Pareto front]] 生成一组可权衡的候选序列，便于后续人工或下游筛选。
- 与朴素 cEBM 相比，pcEBM 更能避免某一个目标主导更新，并且在接近 Pareto front 时借助随机噪声探索更广的解空间。
- 论文报告 pcEBM 在多目标 hyper-volume 和 edit distance 上通常优于或接近强基线，尤其在较小步长设置下更稳定。

## 别名

- Pareto-compositional energy-based model
- pcEBM
- compositional energy-based model
- Pareto compositional EBM

## 外部背景

- [[Energy-Based Model|能量基模型]]（EBM）通常用未归一化能量函数表示样本分布，生成时通过迭代下降能量来采样，常见实现是基于梯度的随机动力学。
- Compositional generation 是一种常见的条件组合思路，常借助 [[product of experts]] 将多个约束合并为联合分布；具体表达形式与训练方式会因任务而异，待核对经典来源。
- [[Pareto front]] 用于刻画[[多目标优化]]中的[[Pareto 最优|非支配解]]集合；当目标彼此冲突时，寻找一组 [[Pareto 最优]]样本通常比寻找单个最优样本更有意义。
- [[multiple gradient descent]] 常用于多目标优化中的方向搜索：通过同时考虑多个目标的梯度，寻找一个尽量兼顾各目标改善的下降方向，待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
