---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散序列生成"
---
# ReDi

## 定义

ReDi 指 [[Rectified Discrete Flows]]，是一种面向离散 token 序列的生成模型。根据给定上下文，它通过 rectification 反复修正 source-target coupling，以降低 discrete flow matching 中因坐标独立近似带来的 [[factorization error]]。[[AReUReDi]] 将其作为预训练生成先验，并使用其 token-level transition probabilities 作为离散更新的基础。更具体的原始方法细节待从更多论文中补充。

## 关键点

- 用于离散序列空间中的生成，而不是依赖[[连续隐空间|连续潜空间]]。
- 通过 rectification 修正 source-target coupling，缓解 factorization error。
- 可为每个位置提供 marginal transition probabilities，供后续 token [[mutation]] 使用。
- 在 AReUReDi 中，ReDi 作为基础生成先验，再叠加多目标 guidance 和 [[Metropolis-Hastings|MH 更新]]。
- 与单纯的离散生成相比，ReDi 本身不提供多目标 Pareto 引导。

## 别名

- Rectified Discrete Flows
- 离散流校正模型

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
