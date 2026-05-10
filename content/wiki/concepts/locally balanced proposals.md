---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散采样与多目标引导生成"
background: "included"
---
# Locally Balanced Proposals

## 标准定义

Locally Balanced Proposals（局部平衡提议）是一类用于[[Metropolis-Hastings]]或其他[[Markov chain Monte Carlo]]方法的提议机制，常见于[[离散空间]]中的采样问题。其核心思想是：在当前状态附近的候选点之间，依据目标分布密度比构造提议概率，使“更符合目标分布”的邻域状态被更容易提出，从而提高接受率并改善混合效率。常见实现会利用目标分布比值或其单调变换来定义局部邻域上的提议核。

## 在本知识库中的用法

在 [[AReUReDi]] 中，locally balanced proposals 用来为离散序列的单点突变构造候选提议：先结合 ReDi 的 token 生成概率与多目标奖励比值，再在局部邻域内选择更有利于 Pareto 改进的候选 token，并交给 annealed [[Metropolis-Hastings]] update 接受或拒绝。它在这里是把离散流先验与多目标指导信号衔接起来的关键步骤，服务于将肽序列和 peptide [[SMILES]] 采样推向 Pareto front。

## 关键点

- 它面向的是[[离散空间]]中的采样，而不是连续变量优化。
- 局部平衡的目标是让提议分布与目标分布的局部结构相协调，从而提升 MH 接受率和采样效率。
- 在本知识库的上下文里，它与 ReDi 的 token-level transition probabilities 结合，用于单位置编辑式的序列更新。
- AReUReDi 中的用法强调多目标 reward ratio：提议不仅看生成先验，还看多属性 scalarized reward。
- 它不是最终优化目标本身，而是实现[[多目标引导]]采样的提议机制。

## 别名

- 局部平衡提议
- locally balanced proposal
- balanced proposal
- local balance proposal

## 外部背景

- 常见于离散 MCMC、组合优化和图结构采样等场景，特别适合邻域结构明确的问题。
- 与传统随机游走式提议相比，locally balanced proposals 往往能更好地利用目标分布信息，减少无效移动。
- 在一些文献中，它也被视为一种“用目标分布比值来设计提议核”的通用思路，待核对经典来源。
- 相关变体可能与 locally informed proposals、balanced proposals 等术语相近，但具体定义需区分实现细节，待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
