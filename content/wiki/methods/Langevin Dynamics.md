---
type: "method"
status: "enriched"
category: "采样方法"
domain: "蛋白质序列生成与多目标优化"
background: "included"
---
# Langevin Dynamics

## 标准定义

Langevin Dynamics（朗之万动力学）是一类在目标能量函数的负梯度方向上叠加高斯噪声的随机迭代采样方法，常用于从 [[EBM]] 的未归一化分布中近似采样。其离散形式通常可理解为“梯度漂移 + 噪声扩散”，也是 [[Langevin Monte Carlo]] 的基础思想之一。

## 在本知识库中的用法

在这篇论文中，Langevin Dynamics 被用作组合[[Energy-Based Model|能量模型]]的采样器：传统 c[[Energy-Based Model|EBM]] 通过多个属性 energy 的总梯度来更新样本，而 [[Compositional Energy-Based Model|pcEBM]] 则把采样时的漂移项改成由 [[multiple gradient descent]] 计算得到的 Pareto 改进方向，再叠加噪声进行探索。它被用于蛋白质/抗体序列空间中的多目标生成，目标包括 Ab-like、Aff 和 BV 等性质，并帮助样本在 [[Pareto front]] 附近覆盖更多可选解。

## 关键点

- 本质上是“沿能量下降方向走、同时加入随机噪声”的采样过程，可用于从 [[EBM]] 中生成样本。
- 在本论文的 [[compositional EBM]] 设定里，传统做法是对多个属性能量求和后再做 Langevin 采样。
- pcEBM 不直接用总梯度，而是用 [[multiple gradient descent]] 求出的多目标改进方向作为采样漂移项。
- 噪声项使采样在接近 [[Pareto front]] 时仍能继续局部探索，从而扩大前沿覆盖。
- 这里的主要应用场景是 [[蛋白质序列]] 与 [[抗体设计]] 的多目标逆向生成，而不是单纯单目标优化。

## 别名

- Langevin Dynamics
- Langevin sampler
- overdamped Langevin dynamics
- 朗之万动力学
- 朗之万采样
- Langevin diffusion
- Langevin Monte Carlo
- ULA

## 外部背景

- 常见的经典背景是把它视为连续时间随机动力学或布朗运动驱动的采样过程，待核对经典来源。
- 离散化版本在文献中常被称为 ULA（unadjusted Langevin algorithm）或 Langevin Monte Carlo，待核对经典来源。
- 在深度生成模型中，它经常作为 EBM 或 score-based 方法的基础采样组件，待核对经典来源。
- 在离散序列任务中，通常需要借助连续松弛、嵌入空间或近似梯度来使用，待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
