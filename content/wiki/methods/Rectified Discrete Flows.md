---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成与多目标分子优化"
---
# Rectified Discrete Flows

## 定义

[[Rectified Flow|Rectified Discrete Flow]]s 是一种用于离散序列生成的流式方法，核心是通过 rectification 降低离散 flow matching 中的 [[factorization error]]。它在 token 级别建模离散状态转移，适合作为离散生物序列生成的先验模型。相关论文中，[[AReUReDi]] 在此基础上进一步加入多目标引导、局部平衡 proposal 和 [[Metropolis-Hastings]] 更新，以将采样推向近似 [[Pareto front]] 的高质量区域。

## 关键点

- 在离散状态空间 V^L 上工作，直接处理 token 序列而不是连续潜变量。
- 通过 rectification 修正 source-target coupling，目的是降低 [[conditional total correlation]] 与 factorization error。
- 可提供每个位置的 marginal transition probabilities，作为后续引导采样的生成先验。
- AReU[[ReDi]] 将其与 annealed [[Tchebycheff scalarization]] 结合，实现多目标 reward 引导。
- 局部平衡 proposal 与 Metropolis-Hastings 更新用于保持目标分布不变，并提升采样到 Pareto 友好区域的能力。

## 别名

- ReDi
- Rectified Discrete Flow
- Rectified Discrete Flows
- Rectified Discrete Flow Matching

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
