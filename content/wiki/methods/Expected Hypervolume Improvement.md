---
type: "method"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化 / 多目标分子优化"
background: "included"
---
# Expected Hypervolume Improvement

## 标准定义

Expected [[Hypervolume Indicator|Hypervolume]] Improvement（EHVI）是一种用于[[Bayesian optimization|贝叶斯优化]]的多目标采集函数。它基于当前的[[Pareto front|Pareto前沿]]或[[Pareto 最优|非支配解]]集合，以及一个参考点，计算某个候选点被评估后带来的[[hypervolume indicator|超体积]]增量的期望值。EHVI 的目标不是把多个目标压成一个固定标量，而是直接偏向于扩展当前前沿覆盖范围，因此属于典型的 Pareto-aware acquisition function。

## 在本知识库中的用法

在本知识库所对应的[[分子生成|分子设计]]比较研究中，EHVI 被作为 Pareto-aware acquisition，与固定权重标量化的 [[Expected Improvement]]（EI）做受控对比。实验保持相同的[[Gaussian Process|Gaussian Process]] 代理模型、分子表征、候选池和优化预算不变，主要只比较采集函数差异：在三个 [[GUACAMOL]] 多目标[[分子优化]]任务上，EHVI 在 hypervolume、$R^2$ indicator 和结构多样性（#Circles）上整体优于固定标量化 EI；其中 Perindopril 任务上最终 hypervolume 与 EI 接近，但 EHVI 更早收敛且更稳定。

## 关键点

- EHVI 直接以“加入候选分子后能增加多少[[hypervolume indicator|超体积]]”为目标，比固定权重标量化更适合保留多目标权衡结构。
- 它通常用于[[multi-objective optimization|多目标优化]]与[[Bayesian optimization|贝叶斯优化]]结合的场景，尤其关注 [[Pareto Front|Pareto 前沿]]覆盖而不仅是单点最优。
- 在本库的分子优化实验中，EHVI 与固定权重 scalarized EI 使用相同 surrogate、表示和候选池，差异主要来自 acquisition function 本身。
- 该研究显示 EHVI 往往带来更快的前沿扩展、更低的 $R^2$ indicator，以及更好的化学结构多样性。
- EHVI 的效果受参考点、当前非支配集以及采样近似方式影响；本库实验中采用 Monte Carlo 估计。

## 别名

- EHVI
- Expected Hypervolume Improvement

## 外部背景

- EHVI 是多目标[[Bayesian optimization|贝叶斯优化]]中的经典 Pareto-aware acquisition 之一，常与 hypervolume indicator 配套使用，待核对经典来源。
- EHVI 在低维[[目标空间]]中可能有解析或半解析形式，但在更高维或离散候选池中常采用 Monte Carlo 近似，待核对经典来源。
- 与 scalarization 相比，EHVI 不需要预先指定固定权重，因此更适合目标偏好不确定或需要覆盖多种 trade-off 的任务。
- EHVI 的数值强依赖参考点设置；参考点过近或过远都会影响[[Hypervolume Indicator|超体积]]增量的尺度，待核对经典来源。
- 常见扩展包括 batch EHVI / qEHVI 等并行版本，待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
