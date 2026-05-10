---
type: "method"
status: "enriched"
category: "优化方法"
domain: "能量模型训练"
background: "included"
---
# Contrastive Divergence

## 标准定义

Contrastive Divergence（CD，对比散度）是一种用于训练[[能量模型]]的近似学习方法，常见于受限玻尔兹曼机（RBM）和其他不可直接做精确似然计算的生成模型。其核心思想是：从真实数据分布出发，经过少量步的马尔可夫链采样得到“负样本”，再用数据项与模型重构项之间的差异来近似最大似然梯度，从而更新参数。常见形式包括 CD-1、CD-k；当链持续保持而不是每次重启时，常被称为 persistent CD（PCD）。

## 在本知识库中的用法

待从更多论文中补充。当前给定论文主要讨论 [[compositional energy-based model]] 的 Langevin 采样、[[multiple gradient descent]] 与 [[Pareto front]] 覆盖，没有明确使用或展开 Contrastive Divergence；因此在本知识库中它更像是与 [[Energy-Based Model|EBM]] 训练相关的背景方法，而非本文的核心技术。

## 关键点

- CD 的作用是近似训练 [[能量模型]] 时难以精确计算的模型期望，通常通过短链采样获得负相位样本。
- 与标准最大似然相比，CD 计算更便宜、实现更简单，但它优化的是近似目标，不一定等价于真实似然最大化。
- 在当前论文语境中，作者更强调基于 [[Langevin Dynamics]] 的采样与多目标梯度方向搜索，而不是用 CD 来训练模型。
- 如果将 CD 用于组合式[[Energy-Based Model|能量模型]]，通常仍需为每个能量项构造可采样的马尔可夫链或重构过程。
- CD 常作为经典背景方法出现在生成模型教材和早期 EBM/RBM 研究中，适合与 [[Gibbs 采样]]、[[最大似然估计]] 一起理解。

## 别名

- CD
- Contrastive Divergence
- 对比散度
- CD-k
- Persistent Contrastive Divergence

## 外部背景

- 经典背景：CD 最早广泛用于 RBM 训练，常见表述为 CD-k，即从数据初始化后做 k 步 Gibbs 采样，用重构分布近似模型分布。待核对经典来源。
- 常见变体：Persistent CD（PCD）不从数据样本重新初始化链，而是保留长期运行的“幻想粒子”，通常能减轻短链偏差。待核对经典来源。
- 方法局限：CD 可能存在偏差，尤其在链混合不足、能量面复杂或 k 很小时，训练信号可能与真实梯度偏离。待核对经典来源。
- 与现代 EBM 的关系：很多现代 EBM 更常用 Langevin / MCMC 近似采样；CD 与这些方法的共同点是都依赖近似负样本，但训练动态不同。待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
