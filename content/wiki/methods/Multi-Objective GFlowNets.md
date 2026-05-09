---
type: "method"
status: "enriched"
category: "生成方法"
domain: "多目标分子设计"
---
# Multi-Objective GFlowNets

## 定义

Multi-Objective [[GFlowNets]] 是将 [[GFlowNet]] 用于[[多目标分子设计|多目标分子生成]]的一类方法，目标是在多个性质构成的[[目标空间]]中采样高奖励且多样化的分子。相关论文中，作者进一步提出 [[goal-conditioning|goal-conditioned]] 方式，用显式指定[[focus region|目标区域]]（[[focus region]]）来替代传统的 [[preference-conditioning]] / [[标量化]][[preference-conditioning|偏好条件化]]。该方法希望让模型更可控地覆盖 [[Pareto front]]，而不是只偏向少数极端解。

## 关键点

- 传统 preference-conditioning 通过[[scalarization|加权和标量化]]多目标奖励，但在非凸或复杂 Pareto front 上容易偏向极端点。
- [[fragment-based molecule generation|goal-conditioned GFlowNets]] 直接把目标空间中的区域作为条件输入，训练模型在指定 focus region 内采样分子。
- focus region 由目标方向和 cosine similarity 阈值定义，区域内给正奖励，区域外奖励为 0，属于硬约束。
- 为缓解硬约束带来的[[reward sparsity|稀疏奖励]]与训练不稳定，方法使用 [[replay buffer]] 和 [[hindsight experience replay]]。
- 作者还引入 [[reward shaping|reward sharpening]] / [[reward shaping|limit reward coefficient]]，使生成结果更偏向目标区域中心而不是边界。
- 为提高 3 目标和 4 目标任务中的采样效率，论文提出 [[Tabular Goal-Sampler]]（[[Tab-GS]]）来调整不同目标方向的采样概率。

## 别名

- Goal-conditioned GFlowNets
- Goal-conditioned GFN
- Multi-objective GFlowNet
- Multi-objective GFlowNets for molecular design

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
