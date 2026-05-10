---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# AReUReDi

## 标准定义

AReU[[Rectified Flow|ReDi]] 可视为一种面向离散生成模型的退火式多目标引导采样方法：从带有 [[Discrete Flow Matching|离散流匹配]] / [[Rectified Discrete Flow]] 先验的离散序列模型出发，在局部 token 变换上叠加多目标奖励，并随着退火系数逐步增强引导，使样本更倾向于高质量的 [[Pareto front]] 区域。它本质上结合了生成先验、标量化目标和 [[Metropolis-Hastings]] 式校正。

## 在本知识库中的用法

在本知识库中，AReUReDi 专指 2025 年这篇论文提出的 “Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance” 方法：以 [[PepReDi]] 或 [[SMILESReDi]] 作为离散生成先验，在肽序列和 peptide [[SMILES]] 的单点更新中加入多目标属性打分，使用 [[Tchebycheff scalarization|Tchebycheff 标量化]]、[[Locally Balanced Proposals|locally balanced proposal]] 与 MH 更新，将候选序列推向多属性 Pareto 解。上下文中它主要用于 therapeutic peptide / peptide binder 设计，优化 binding affinity、solubility、hemolysis、half-life、non-fouling 等目标，并与[[Evolutionary Algorithm|进化算法]]和 diffusion-based baseline 对比。

## 关键点

- 核心是把 [[Rectified Discrete Flow]] 作为离散序列生成先验，再用多目标属性函数对采样过程进行后验引导。
- 采用 [[Tchebycheff scalarization]] 将多个目标合成一个退火式 reward，偏好“各项都不太差”的平衡解，而不是单一属性极值。
- 通过 locally [[Locally Balanced Proposals|balanced proposal]] + [[Metropolis-Hastings]] 接受率校正，尽量保持目标分布不变，同时提高多目标样本质量。
- 在本论文上下文中，它用于肽序列和 peptide SMILES 的生成优化，覆盖 affinity、solubility、hemolysis、half-life、non-fouling 等属性。
- 实验表明该方法能把生成结果更稳定地推向 [[Pareto front]]，并在若干基准上优于进化算法和扩散式方法。

## 别名

- Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance
- AReUReDi
- 退火校正更新

## 外部背景

- [[多目标优化]]通常需要在多个相互冲突的目标之间做权衡，常见做法包括权重加和、Tchebycheff 标量化和 Pareto-based 搜索，待核对经典来源。
- 退火式采样一般通过逐步增强引导强度来从探索过渡到利用，常用于提升生成分布的可控性，待核对经典来源。
- [[Metropolis-Hastings]] 是经典的接受-拒绝校正框架，用于把提案分布修正为目标分布，待核对经典来源。
- 离散流/rectified flow 是近年来用于序列和图结构生成的一类方法；离散版本适合 token 级建模，待核对经典来源。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
