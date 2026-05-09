---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
---
# Rectified Flow

## 定义

在该笔记中，Rectified Flow 主要对应 [[Rectified Discrete Flows]]（[[ReDi]]）这一离散生成框架。它通过反复修正 source-target coupling 来降低 [[conditional total correlation]]，从而缓解离散 flow matching 中由坐标独立近似带来的 [[factorization error]]。[[AReUReDi]] 将其作为预训练生成先验，再结合多目标引导与 [[Metropolis-Hastings]] 更新进行采样。Rectified Flow 的更一般定义与连续形式细节待从更多论文中补充。

## 关键点

- 作为离散生成先验，可提供每个位置的 marginal transition probabilities，用于 token [[mutation]]。
- 核心作用是通过 rectification 降低 conditional total correlation，缓解 factorization error。
- AReUReDi 在 ReDi 基础上加入 annealed [[Tchebycheff scalarization]]，实现多目标引导采样。
- 方法在离散 token 空间中工作，适用于肽序列和 peptide [[SMILES generation|SMILES 生成]]。
- 上下文中未给出 Rectified Flow 的完整通用定义，待从更多论文中补充。

## 别名

- Rectified Discrete Flow
- Rectified Discrete Flows
- ReDi

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
