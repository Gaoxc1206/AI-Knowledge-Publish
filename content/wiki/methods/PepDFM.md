---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标肽序列设计"
---
# PepDFM

## 定义

Pep[[Discrete Flow Matching|DFM]] 是一个面向肽序列生成的[[Discrete Flow Matching|离散流匹配]]方法，在预训练 [[Discrete Flow Matching]] 生成器上加入多目标引导，使采样过程朝用户指定的 trade-off 方向移动。它通过对每一步 token 转移速率进行重加权，并结合自适应 hypercone 过滤候选转移，推动生成序列接近多目标 [[Pareto front]]。该方法主要用于肽段 binder 设计，覆盖亲和力、[[hemolysis|溶血性]]、[[solubility|溶解性]]、[[half-life]] 和 [[non-fouling]] 等性质。

## 关键点

- 基于离散空间中的 [[CTMC]] / Discrete [[Flow Matching]]，不依赖先映射到[[连续隐空间|连续潜空间]]再优化。
- 在生成过程中引入多个预训练标量打分函数，对候选 token 替换的局部性质改进进行评估。
- 使用 trade-off [[Preference Vector|权重向量]] ω 和 hybrid rank-directional score，对原始转移速率进行重加权。
- 用 [[Adaptive hypercone|adaptive hypercone filter]] 约束候选转移方向，使其与目标 trade-off 方向一致。
- 通过 [[Euler sampling]] 在引导后的 CTMC 上逐步生成序列。
- 论文报告其在[[肽段设计]]中能生成较多样且生物合理的序列。

## 别名

- PepDFM
- MOG-DFM（肽段任务）

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
