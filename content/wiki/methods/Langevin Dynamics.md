---
type: "method"
status: "enriched"
category: "理论概念"
domain: "蛋白质序列生成与多目标优化"
---
# Langevin Dynamics

## 定义

Langevin Dynamics 是一种带随机噪声的迭代采样方法，在论文中用于基于能量函数进行序列生成。它在每一步同时利用梯度项推动样本向更低能量或更优目标方向移动，并加入[[Gaussian|高斯噪声]]以增强探索能力。该论文将其嵌入 [[compositional EBM]] 和 [[pcEBM]] 中，用来在多性质约束下采样蛋白质/抗体序列，并更好覆盖 [[Pareto front]]。

## 关键点

- 在 [[Energy-Based Model|EBM]] 采样中，更新形式包含梯度下降项和噪声项，用于从能量分布中生成样本。
- 在该论文的 [[cEBM]] 中，Langevin Dynamics 用于对多个性质能量的组合项进行采样。
- 在 pcEBM 中，Langevin Dynamics 与 [[Multiple Gradient Descent]] 结合，梯度方向不再是简单加权和，而是动态选择 Pareto 改进方向。
- 噪声项有助于在接近 Pareto front 时进行探索，从而覆盖更宽的多目标权衡区域。
- 论文认为，纯梯度更新更像优化，而加入 Langevin 噪声后更适合采样与多解搜索。

## 别名

- 朗之万动力学
- Langevin sampling
- Langevin diffusion
- 朗之万采样

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
