---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "能量模型与生成建模"
background: "included"
---
# contrastive divergence

## 标准定义

Contrastive divergence（CD，对比散度）是训练 [[Energy-Based Model]] 的经典近似方法，用来绕开最大似然训练中难以精确计算的模型期望。其核心做法是：从真实数据出发做少步[[MCMC|马尔可夫链采样]]，比较“数据分布”和“模型短链分布”的差异，并用这个差异近似参数梯度，从而更新能量函数。最常见的形式是 CD-k，其中 k 表示 Gibbs 采样或其他短程采样的步数。它通常可看作一种偏向局部、计算更便宜但有偏的梯度估计方法。

## 在本知识库中的用法

在这篇论文的上下文中，contrastive divergence 不是主方法，而是作为 [[Energy-Based Model|EBM]] 训练的标准背景技术出现：论文在说明 [[compositional EBM]] / [[pcEBM]] 时提到，多个属性对应的[[Energy-Based Model|能量模型]]可以通过 contrastive divergence 进行训练。也就是说，本库里它主要承担“学习单属性能量函数的常规训练手段”这一角色，然后这些已训练好的能量函数再被组合到 p[[cEBM]] 中，用于多目标蛋白质/抗体序列采样与优化。

## 关键点

- CD 是训练 [[Energy-Based Model]] 的近似最大似然方法，重点解决模型分布采样难的问题。
- 它通过从真实样本出发进行短链采样，近似“数据相”和“模型相”的差异，因此通常计算成本低于完整 [[MCMC]]。
- 在本知识库对应论文中，CD 主要是背景训练方法，用于学习各个性质对应的能量函数，而不是 pcEBM 的核心创新点。
- pcEBM 的核心采样/优化依赖的是 [[Langevin Dynamics]] 和 [[Multiple Gradient Descent]] 式的多目标改进方向，而不是 CD 本身。
- CD 的优势是实现简单、训练便宜；局限是梯度估计有偏，短链采样质量会影响训练效果。

## 别名

- CD
- 对比散度
- Contrastive Divergence
- CD-k

## 外部背景

- CD 通常由 Geoffrey Hinton 提出并推广，常见教材会将其描述为训练 RBM 和一般 EBM 的经典近似方法，待核对经典来源。
- 常见变体包括 CD-1、CD-k，以及更强调持续链采样的 Persistent Contrastive Divergence（PCD），待核对经典来源。
- 在很多生成建模语境下，CD 可以与 score matching、noise-contrastive estimation 等方法对照理解，待核对经典来源。
- CD 与 [[Langevin Dynamics]] 的关系在于：二者都涉及从模型分布附近采样，但 CD 更偏训练时的短链近似，而 [[Langevin Dynamics]] 更常用于显式采样。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
