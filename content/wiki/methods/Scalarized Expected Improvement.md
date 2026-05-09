---
type: "method"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化 / 多目标分子优化"
---
# Scalarized Expected Improvement

## 定义

Scalarized [[Expected Improvement]]（[[标量化]][[Expected Improvement|期望改进]]，EI）是一种将多个目标通过固定权重合成为单一标量目标后，再在该标量目标上计算 Expected Improvement 的方法。它常用于[[多目标贝叶斯优化]]中的简化基线，便于直接接入单目标 BO 流水线。在论文对比中，这种固定权重做法会把搜索集中到 [[Pareto front]] 的某个偏好区域，而不是显式覆盖整个 Pareto front。

## 关键点

- 先用固定权重将多个目标压缩为单个标量，再计算 EI。
- 方法简单，容易接入已有的单目标 [[Bayesian Optimization]] 流程。
- 需要预先指定权重，因此会隐含具体的目标偏好。
- 固定权重通常只对应 Pareto front 上的某一部分区域，覆盖范围可能有限。
- 对于[[非凸 Pareto front]]，简单加权和可能无法恢复所有 Pareto-optimal 区域。

## 别名

- 固定标量化EI
- Scalarized EI
- 固定权重标量化 Expected Improvement
- Weighted-sum Expected Improvement

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
