---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "生成模型与多目标优化"
background: "included"
---
# Langevin Dynamics

## 标准定义

Langevin Dynamics（朗之万动力学）是一类带噪声的连续时间/离散化随机动力学方法，常用于从目标分布中采样，尤其是在 [[Energy-Based Model]] 和其他基于能量的生成模型中。其离散形式通常表现为“沿能量梯度下降 + 高斯噪声扰动”的迭代更新：前者推动样本向高概率区域移动，后者帮助探索并避免过早陷入局部模式。背景知识上，它也可被视为随机梯度动力学或[[Markov chain Monte Carlo|马尔可夫链蒙特卡洛]]的一种常用实现。

## 在本知识库中的用法

在这篇关于 [[pcEBM]] 的论文中，Langevin Dynamics 被用作外层采样框架：在每一步更新中，一方面沿由 [[Multiple Gradient Descent]] 导出的 Pareto 改进方向移动，另一方面加入噪声以进行探索。论文强调这种“方向 + 噪声”的组合有助于在多目标冲突时更好地覆盖 [[Pareto front]]，并相比纯 [[MGD]] 或简单的 [[compositional EBM]] 更适合生成满足多个性质权衡的蛋白质/抗体序列。

## 关键点

- 标准上，Langevin Dynamics 是一种“确定性梯度项 + 随机噪声项”的采样方法，常用于从[[Energy-Based Model|能量模型]]中生成样本。
- 在 [[Energy-Based Model]] 中，它通常对应从低能量区域逐步采样，而不是一次性求出最优解。
- 在本论文中，它不是单独用于单目标优化，而是作为 p[[cEBM]] 的外层采样机制，承载多目标的 Pareto 探索。
- 论文将 MGD 产生的多目标改进方向与 Langevin 噪声结合，使样本既能朝多性质更优区域移动，又能在接近 [[Pareto front]] 时保持探索性。
- 因此，这里的 Langevin Dynamics 更像“多目标采样器”而非纯优化器。

## 别名

- Langevin dynamics
- Langevin diffusion
- 随机朗之万动力学
- Langevin sampling

## 外部背景

- 经典离散形式通常写作 x_{t+1}=x_t-\eta\nabla E(x_t)+\sqrt{2\eta}\,\epsilon_t，其中 \epsilon_t 为高斯噪声；具体系数写法在不同文献中会有变体。
- 它与 [[MCMC]] 有密切关系，常被用于近似从 Boltzmann 分布或能量模型对应分布中采样。
- 在[[深度生成模型]]中，Langevin Dynamics 常见于 score-based / energy-based 采样流程，也常被用作初始化后逐步修正样本的迭代器。
- 与确定性梯度下降相比，它更适合保留样本多样性；与纯随机游走相比，它更能利用[[黑盒 oracle|目标函数]]的结构信息。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
