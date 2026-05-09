---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标离散序列生成"
background: "included"
---
# Adaptive hypercone

## 标准定义

Adaptive hypercone（自适应超锥）可理解为一种“围绕参考方向的锥形接受区域”，常用于[[多目标优化]]或引导式搜索中，用来筛选与目标偏好方向一致的候选改进。与固定角度的 cone 不同，它会根据搜索过程中的接受率、拒绝率或探索效果动态调整锥角，从而在探索与利用之间取得平衡。这里的“hypercone”强调其是在多维[[目标空间]]中的锥形约束，而“adaptive”强调该约束边界会随运行状态变化。

## 在本知识库中的用法

在这篇论文里，adaptive hypercone 是 [[MOG-DFM]] 的一个候选转移过滤器：对每个离散 token 替换，先计算其多目标改进向量与 trade-off [[Preference Vector|权重向量]] ω 的夹角 α_i，只保留满足 α_i ≤ Φ 的候选，其中 Φ 是当前 hypercone 角度。若满足条件的候选不为空，则从中选择综合分数最高的转移；若没有候选落入 cone，则按论文描述进入退化处理。Φ 还会根据 rejection rate 的 EMA 自适应更新：拒绝过多就放宽，拒绝过少就收窄，以维持合适的过滤强度。

## 关键点

- 它是一个面向 [[多目标优化]] 的方向筛选机制，不是单独的生成模型，而是嵌入在 [[Discrete Flow Matching]] 的采样过程中使用。
- 核心判据是候选改进向量与 trade-off 权重向量 ω 的夹角；角度小于阈值 Φ 的候选才被视为“方向一致”。
- 在本知识库中，它与 [[Pareto front]] 的关系是：通过过滤和重加权，让采样更倾向于靠近[[Pareto front|帕累托前沿]]的区域，但论文不保证得到严格 Pareto optimal 解。
- 自适应更新的目的，是根据 rejection rate 动态调节 cone 的开口大小，避免过滤过严导致无候选可选，也避免过滤过松削弱多目标引导。
- 它解决的是离散序列空间中的局部转移筛选问题，适合在 [[CTMC]] 采样步骤中按 token 级别实施。

## 别名

- adaptive cone
- adaptive hyper-cone
- hypercone filtering
- 自适应锥
- 自适应超锥过滤

## 外部背景

- 在几何与优化中，cone/锥通常表示由某个方向张成的可行区域；待核对经典来源。
- 多目标优化里常见“锥约束”“偏好方向”“角度筛选”等思路，用于表达对改进方向的偏好；待核对经典来源。
- 自适应阈值或自适应角度控制常用于保持搜索过程中的接受率稳定，是一种经验性控制策略；待核对经典来源。
- hypercone 这个术语在不同论文里可能指高维锥、广义锥或 cone-based region，具体定义需结合上下文；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
