---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散肽序列生成"
background: "included"
---
# PepReDi

## 标准定义

Pep[[Rectified Flow|ReDi]] 可理解为一种面向肽序列的 [[Rectified Discrete Flow]] 生成模型：在离散 token 空间中学习逐步转移/替换过程，用少步采样从先验分布生成符合数据分布的序列。更一般地，这类方法属于 [[discrete flow matching]] 在离散生物序列上的应用，强调用流式转移而非连续潜变量来建模 token 级结构。

## 在本知识库中的用法

在本知识库对应论文中，PepReDi 作为 [[AReUReDi]] 的基础无[[可控生成|条件生成]]先验，用于肽氨基酸序列（以及相关的 peptide [[SMILES]] 版本）生成。它经过多轮 rectification 后，作为候选序列分布与单点突变 proposal 的概率来源，并为后续的多目标引导采样提供 token-level transition probabilities。论文报告 PepReDi 的 rectification 可降低 NLL、PPL，并改善生成质量；它本身不负责[[多目标优化]]，而是被 AReUReDi 在 [[Metropolis-Hastings]] 更新和退火引导中进一步偏置到更接近 [[Pareto front]] 的区域。

## 关键点

- PepReDi 是面向肽序列的离散生成先验，核心作用是提供稳定的基础采样分布，而不是直接做多目标优化。
- 它属于 [[Rectified Discrete Flow]] 路线，强调在离散 token 空间中进行少步生成，保留序列结构信息。
- 在该论文中，PepReDi 的输出被 AReUReDi 用作 proposal 相关概率与初始样本来源，再叠加多目标属性引导。
- 多轮 rectification 后，PepReDi 的基础生成指标在论文中明显改善，例如验证集 NLL 和 PPL 下降。
- PepReDi 可用于肽序列和 peptide SMILES 的离散生成场景，为后续的属性约束采样提供可用的候选分布。

## 别名

- Peptide ReDi
- Pep-ReDi
- Peptide Rectified Discrete Flow

## 外部背景

- 待核对经典来源：[[Discrete Flow Matching|离散流]]模型通常学习有限状态空间中的逐步转移，比起连续[[潜在空间|潜空间]]更适合直接处理 token 序列。
- 待核对经典来源：rectification 的常见目标是减少多步采样误差、提升少步生成的稳定性与质量。
- 待核对经典来源：在蛋白/肽设计中，离散表示可以更直接地保留氨基酸级别的组合约束。
- 待核对经典来源：若与 [[Metropolis-Hastings]] 结合，离散生成模型可被用作 proposal 分布，再通过接受率修正目标分布。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
