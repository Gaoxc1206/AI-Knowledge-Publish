---
type: "method"
status: "enriched"
category: "其他"
domain: "待分类"
---
# preference-conditioned GFN

## 定义

{"name":"[[preference-conditioning|preference-conditioned]] [[Generative Flow Network|GFN]]","type":"method","category":"生成模型","domain":"[[多目标分子设计]]","definition":"preference-conditioned GFN 是一种在多目标[[分子设计]]中使用[[Preference Vector|偏好向量]] \(w\) 作为条件输入的 [[GFlowNet]] 方法。它通过[[标量化]]奖励 \(R_w(x)=\sum_k w_k r_k\) 来训练模型，使生成结果对应不同的目标权衡。该方法实现简单，但在 [[Pareto front]] 呈现凹形或非凸结构时，容易偏向极端解，而难以均匀覆盖整个前沿。","key_points":["将用户偏好表示为 [[Preference Vector|preference vector]] \(w\)，并作为条件信息输入模型。","用[[scalarization|加权和标量化]]多目标奖励，把多目标问题转成条件式单目标学习。","属于软约束式条件化：模型学习在偏好对应的高奖励区域中采样。","在复杂 Pareto front（尤其是凹形结构）上，可能更容易生成极端点而非均匀覆盖。","在相关论文中，它被 [[fragment-based molecule generation|goal-conditioned GFN]] 作为对照方法，用于说明显式[[goal-conditioning|目标区域条件化]]的优势。"],"aliases":["[[preference-conditioning|preference-conditioned GFlowNet]]","[[preference-conditioning|PC-GFN]]","[[preference-conditioning|偏好条件化]] GFN"]}

## 关键点

- 待从更多论文中补充。

## 别名

- 无

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
