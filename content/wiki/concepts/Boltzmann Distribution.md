---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "生成模型与多目标优化"
background: "included"
---
# Boltzmann Distribution

## 标准定义

Boltzmann Distribution（也常称 Gibbs 分布）是将“能量”映射为概率的基本分布形式，通常写作 p(x) ∝ exp(-E(x)/T)，其中 E(x) 是能量函数，T 是温度参数。能量越低的状态概率越高；温度越低，分布越集中。该形式在统计物理中用于描述热平衡分布，在机器学习中常被用于 [[Energy-Based Model]] 的概率建模与采样，也常通过 [[Langevin Dynamics]] 等方法近似采样。

## 在本知识库中的用法

在这两篇论文的上下文中，Boltzmann 形式被用作“把能量或目标值转成可采样分布”的核心桥梁。[[pcEBM]] 中，多个性质各自对应能量函数，组合后仍以 Boltzmann 形式表达联合偏好，再结合 Pareto 方向进行采样；而分布式[[多目标黑盒优化|多目标黑箱优化]]论文中，则把[[黑盒 oracle|目标函数]]通过指数倾斜写成多目标目标分布 q*(x) ∝ p_base(x) exp(-f(x)/λ)，再在[[扩散模型]]推理阶段通过[[Weighted Resampling|重采样]]逼近该分布。

## 关键点

- 标准上，Boltzmann Distribution 用“负能量的指数”给样本赋权：低能量样本更可能被采到。
- 它在 [[Energy-Based Model|EBM]] 中是从能量函数到概率分布的标准接口，也是构造采样算法的基础。
- 在 p[[cEBM]] 中，Boltzmann 相关分布承载单性质/多性质的能量建模，并与[[多目标优化]]方向结合，用于更接近 [[Pareto front]] 的序列采样。
- 在扩散模型推理时的多目标生成中，Boltzmann 形式被推广为以目标函数为“能量”的指数倾斜分布，用于定义重采样权重。
- 温度或偏好参数控制分布尖锐程度：参数越小，越偏向高质量但多样性更弱；参数越大，则保留更多探索性。
- 在这份知识库里，它主要不是单独的物理概念，而是连接 [[Energy-Based Model]]、多目标优化和推理时重采样的统一表达。

## 别名

- Boltzmann distribution
- Gibbs distribution
- Boltzmann-Gibbs distribution
- 玻尔兹曼分布
- 吉布斯分布

## 外部背景

- 在统计物理中，Boltzmann Distribution 描述热平衡系统在给定温度下各微观状态出现的概率，经典形式与 Boltzmann/Gibbs 统计有关，待核对经典来源。
- 在机器学习里，常见的[[Energy-Based Model|能量模型]]写法是 p(x)=exp(-E(x))/Z，其中 Z 为配分函数；这是 Boltzmann 形式的归一化版本。
- 当温度 T→0 时，分布会集中到低能量区域；当 T 增大时，分布更平坦、探索性更强，待核对经典来源。
- 在优化与采样文献中，指数倾斜分布也常被视为“带熵正则的最优分布”或“KL 正则化后的目标分布”，待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
