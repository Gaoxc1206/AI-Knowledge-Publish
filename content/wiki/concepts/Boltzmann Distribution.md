---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "分布式多目标黑箱优化"
background: "included"
---
# Boltzmann Distribution

## 标准定义

Boltzmann distribution（也常写作 Gibbs distribution）是一类与[[能量函数]]对应的概率分布，通常写成 p(x) ∝ exp(-E(x)/T)。其中 E(x) 越小，样本被分配到的概率越大；[[温度参数]] T 控制分布的平坦程度。在线性化优化/采样语境里，它常被用来把“低目标值”或“高奖励”转化为可采样的[[目标分布]]。

## 在本知识库中的用法

在这篇论文中，Boltzmann distribution 不是作为统计物理背景出现，而是作为[[多目标优化]]的目标分布构造方式：先为每个目标构造指数倾斜分布，再混合得到 multi-target Boltzmann distribution，并在[[扩散模型]]的反向推理过程中用[[重采样]]逼近该分布。它服务于 IMG 的 inference-time 多目标生成，不依赖微调或可导 surrogate，属于[[黑箱优化]]场景下把生成过程推向多目标最优解集的分布化表达。

## 关键点

- 标准形式是 p(x) ∝ exp(-E(x)/T)，可视为能量越低、概率越高的采样机制。
- 在该论文里，Boltzmann distribution 被用于刻画多目标的目标分布，而不是单点最优解搜索。
- 论文将每个目标的 KL-regularized 最优分布写成指数倾斜形式，并进一步混合成 multi-target Boltzmann distribution。
- IMG 在反向扩散每一步对候选进行 weighted resampling，用 Boltzmann 型权重把 base distribution 推向目标分布。
- 与[[Pareto front]] 的关系是：它不是直接求前沿，而是通过分布偏置生成覆盖不同 trade-off 的候选集。

## 别名

- Boltzmann 分布
- Gibbs distribution
- Gibbs 分布
- Boltzmann-Gibbs distribution

## 外部背景

- 待核对经典来源：在统计物理中，Boltzmann distribution 描述热平衡下系统处于不同能量状态的概率。
- 待核对经典来源：在机器学习中，它常以 energy-based model 或 softmax 形式出现。
- 待核对经典来源：它与最大熵原理和指数族分布有紧密联系。
- 待核对经典来源：在模拟退火中，Boltzmann 分布及其温度退火是常见采样与搜索机制。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
