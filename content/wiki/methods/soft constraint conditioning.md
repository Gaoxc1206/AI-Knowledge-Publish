---
type: "method"
status: "enriched"
category: "其他"
domain: "待分类"
---
# soft constraint conditioning

## 定义

{
  "name": "soft constraint conditioning",
  "type": "method",
  "category": "优化方法",
  "domain": "[[多目标分子设计]]",
  "definition": "Soft constraint conditioning 指的是将[[多目标优化]]通过[[Preference Vector|偏好向量]]或权重进行条件化，让模型根据用户给定的偏好去优化[[奖励标量化|加权和奖励]]，而不是直接指定必须落入某个[[focus region|目标区域]]。上下文中，它对应于 [[preference-conditioning]] / [[scalarization]] 这类方法：例如用 \(R_w(x)=\\sum_k w_k r_k\) 将多个目标合成为一个标量奖励。该方法便于与生成模型结合，但在 [[Pareto front]] 形状复杂、尤其是凹形时，容易偏向极端点，难以均匀覆盖整个前沿。",
  "key_points": [
    "通过 [[Preference Vector|preference vector]] / 权重 \(w\) 对多目标进行条件化，而非显式指定目标区域。",
    "通常采用[[标量化]]：把多个目标奖励加权求和，形成单一优化信号。",
    "在多目标[[分子设计]]中易与生成模型结合，属于一种软约束形式。",
    "当 Pareto front 为非凸或凹形时，容易偏向极端解，覆盖不均匀。",
    "在该论文中，它被 [[fragment-based molecule generation|goal-conditioned GFlowNets]] 作为对照方法，并被认为不如显式 [[goal-conditioned reinforcement learning|goal conditioning]] 可控。"
  ],
  "aliases": [
    "[[scalarization|preference conditioning]]",
    "[[preference-conditioning|preference-conditioned GFlowNet]]",
    "scalarization",
    "weighted-sum conditioning

## 关键点

- 待从更多论文中补充。

## 别名

- 无

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
