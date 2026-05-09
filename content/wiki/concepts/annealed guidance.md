---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标离散序列生成"
background: "included"
---
# annealed guidance

## 标准定义

Annealed guidance（退火式引导）是指在生成或搜索过程中，按预设日程逐步增强引导强度、降低随机探索比例的一类策略。它通常通过时间相关的温度、权重或 guidance scale，将早期的宽范围探索与后期的定向收敛连接起来，以兼顾多样性与目标达成。

## 在本知识库中的用法

在 [[AReUReDi]] 中，annealed guidance 指将多目标打分先通过 [[Tchebycheff scalarization]] 压缩为单个 reward，再让引导强度 \(\eta_t\) 随采样步数线性增大：前期较弱、偏探索，后期较强、偏向高质量候选。它与 [[Rectified Discrete Flows]] 的离散 token proposal 结合，用于把肽序列和 peptide [[SMILES]] 逐步推向近似 [[Pareto front]] 的区域，并配合 [[Metropolis-Hastings]] 更新实现可接受的采样链。

## 关键点

- 核心思想是“先探索、后聚焦”：引导强度随时间/步数逐渐增强，而不是一开始就强约束生成过程。
- 在本知识库中的用法里，它不是单独的[[黑盒 oracle|目标函数]]，而是作用在多目标[[标量化]] reward 上的退火日程，用来控制采样偏好。
- AReU[[ReDi]] 将 annealed guidance 写成 \(W_{\eta_t,\omega}(x)=\exp(\eta_t S_\omega(x))\)，其中 \(\eta_t\) 线性递增。
- 这种设计服务于离散生物序列生成：前期保留 token-level 多样性，后期将样本压向同时满足多个性质的区域。
- 它与局部平衡 proposal 和 [[Metropolis-Hastings]] 更新配合，形成可解释的多目标引导采样框架。

## 别名

- annealed guidance
- annealed sampling guidance
- guidance annealing
- 退火式引导
- 退火引导

## 外部背景

- 退火（annealing）在优化中通常借鉴[[simulated annealing|模拟退火]]思想：通过逐步降低温度或增强约束，让算法先搜索更大空间，再稳定收敛。
- 在生成模型中，guidance scale 或 temperature 常被做成 schedule，以平衡样本多样性与条件一致性；待核对经典来源。
- 在连续优化与控制中，类似做法也常被称为 continuation / homotopy 思路，即逐步把难问题“推”到目标问题。
- 待核对经典来源：annealed guidance 不是一个单一标准术语，不同领域可能分别指 temperature annealing、guidance annealing 或 score annealing。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
