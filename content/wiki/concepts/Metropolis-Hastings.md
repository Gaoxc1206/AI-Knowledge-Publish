---
type: "concept"
status: "enriched"
category: "采样方法"
domain: "离散序列多目标生成"
background: "included"
---
# Metropolis-Hastings

## 标准定义

Metropolis-Hastings（MH）是一类[[马尔可夫链蒙特卡洛]]方法，用于从难以直接采样的目标分布中生成样本。它通过构造 proposal 分布提出候选状态，再按接受-拒绝规则校正，使得马尔可夫链的平稳分布保持为目标分布。MH 的核心优势是适用范围广：只要能计算目标密度的比值和 proposal 的转移概率比值，就可以在高维或复杂状态空间中进行近似采样。

## 在本知识库中的用法

在 [[AReUReDi]] 中，Metropolis-Hastings 用来对离散序列的局部替换 proposal 做接受-拒绝校正，把预训练 [[Rectified Discrete Flows]] 提供的 token 级转移先验与多目标 reward 结合起来。论文先用 [[Tchebycheff标量化]] 将多个性质压成一个 scalarized reward，再通过 [[annealed guidance]] 和 [[局部平衡提案]] 构造 proposal，最后用 MH 更新维持目标分布不变，并把采样逐步推向近似 [[Pareto前沿]] 的高质量区域。

## 关键点

- MH 不是直接定义生成分布，而是通过 proposal + 接受率来校正采样偏差，适合复杂离散空间。
- 在本论文中，MH 主要服务于离散生物序列的多目标生成，而不是传统统计推断。
- proposal 来自 [[Rectified Discrete Flows]] 的 token 级转移概率，并被多目标 reward ratio 调整。
- 论文把[[多目标优化]]转成随时间退火的标量 reward，使采样先探索、后收敛到更优的候选区域。
- MH 与 [[局部平衡提案]] 配合后，可在理论上保持目标分布不变，并提升采样稳定性。
- 作者强调该机制有助于在冲突目标之间做 trade-off，而不是只优化单一性质。

## 别名

- MH
- Metropolis-Hastings algorithm
- Metropolis-Hastings采样
- MH采样

## 外部背景

- MH 是 [[马尔可夫链蒙特卡洛]] 家族中的经典算法，常用于贝叶斯后验采样与复杂分布近似采样。
- 其经典思想是：先提议一个候选点，再根据目标分布与 proposal 的比值决定是否接受；待核对经典来源。
- 当 proposal 设计得足够好时，MH 可以在保持正确平稳分布的同时提高混合效率。
- 与 Gibbs sampling 相比，MH 对条件分布的可解析性要求更低，更通用。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
