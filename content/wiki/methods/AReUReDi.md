---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标离散生物序列优化"
background: "included"
---
# AReUReDi

## 标准定义

AReU[[ReDi]]（Annealed Rectified Updates）可以看作一种面向离散序列的退火式多目标引导采样方法：它以 [[Rectified Discrete Flows]] 之类的[[离散生成模型]]提供 token 级转移先验，再用 [[Tchebycheff scalarization]] 将多个目标压成单个偏好分数，并借助 [[locally balanced proposals]] 与 [[Metropolis-Hastings]] 更新把采样逐步推向高质量解集。其一般目标是从离散空间中更稳定地逼近 [[Pareto front]]。

## 在本知识库中的用法

在本知识库中，AReUReDi 指该论文提出的多目标离散序列生成框架：用于肽序列和 peptide [[SMILES]] 的生成/优化，支持 [[binding affinity|affinity]]、[[solubility]]、[[hemolysis]]、[[half-life]]、[[non-fouling]] 等目标的联合引导；实现上依赖预训练 ReDi 作为先验，在采样过程中对单个 token 做局部替换，并通过退火式 guidance、局部平衡 proposal 和 MH 校正来增强多目标搜索能力。

## 关键点

- 它不是单纯的分类器式打分，而是把多目标评分转成可采样的能量/权重，用于引导离散生成。
- 论文核心是“先验生成 + 退火引导 + MH 校正”的三段式框架；先验来自 [[Rectified Discrete Flows]]，引导来自多目标[[标量化]]。
- [[Tchebycheff scalarization]] 让样本更偏向“各目标都不差”的区域，因此更适合寻找近似 [[Pareto front]] 的候选序列。
- locally balanced proposal 通过满足平衡条件的函数调节 token 替换概率，减少与目标分布之间的不一致。
- 在库内用法上，它主要用于多目标肽设计与 peptide SMILES 设计，而不是通用连续空间优化。

## 别名

- AReUReDi
- Annealed Rectified Updates
- Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance
- 多目标引导离散流退火校正更新

## 外部背景

- Tchebycheff 标量化是多目标优化中的经典做法，常用来把多个目标压缩为一个偏好函数；具体在离散生成中的变体细节可再核对经典来源。
- Metropolis-Hastings 是经典 MCMC 方法，用接受-拒绝机制保证目标分布不变性；locally balanced proposal 是其常见改进思路，待核对经典来源。
- Rectified Discrete Flows 属于离散生成模型/离散流匹配方向的一种，通常用于缓解离散 token 生成中的 factorization error。
- 退火式 guidance 一般指随迭代逐步增强引导强度，以平衡早期探索与后期收敛。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
