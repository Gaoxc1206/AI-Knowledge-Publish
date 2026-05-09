---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# Expected Hypervolume Improvement

## 标准定义

Expected [[Hypervolume]] Improvement（[[Pareto-aware acquisition|EHVI]]）是一种用于[[Bayesian Optimization]]的多目标[[acquisition function|采集函数]]。它衡量在当前已观测到的[[Non-dominated Solutions|非支配解]]集基础上，加入候选点后相对参考点的[[Hypervolume indicator]]期望增量；因此它显式鼓励搜索能够扩展[[Pareto front]]覆盖范围的解，而不是先把多个目标压成单一标量。通常用于最大化问题，或在最小化问题中通过目标变换后使用。

## 在本知识库中的用法

在本知识库对应论文中，EHVI被用作[[分子设计]]里的多目标采集函数，并与固定权重的标量化 [[Expected Improvement]] 做受控比较。实验在相同 [[Gaussian Process]] 代理模型、相同 Morgan/[[ECFP]] 指纹表示、相同候选池和相同预算下，仅改变 [[acquisition function|acquisition]] strategy。论文在三个 GUACAMOL [[多目标分子优化]]任务上观察到：EHVI 通常带来更高的 hypervolume、更低的 [[R2 indicator]]，以及更高或相当的[[chemical diversity|结构多样性]]；其优势在低数据预算下尤为明显。

## 关键点

- EHVI 的核心是把“下一次评估带来的超体积增量”作为优化目标，直接面向 [[Pareto front]] 的扩展，而不是优化单个标量分数。
- 它适合多目标贝叶斯优化场景，尤其当各目标存在冲突、且希望同时得到多个 trade-off 解时。
- 在该论文中，EHVI 与固定权重标量化 EI 使用同样的 [[Gaussian Process]]、同样的分子表示和候选池，因此比较重点集中在采集函数本身。
- 论文结果显示，EHVI 在多个分子优化任务上通常比固定标量化方法获得更好的 hypervolume 和更低的 R2 indicator。
- 该论文还报告 EHVI 往往能发现更分散的高质量分子结构，说明它不仅改善目标空间覆盖，也有助于化学结构多样性。

## 别名

- EHVI
- Expected Hypervolume Improvement
- 超体积期望提升

## 外部背景

- EHVI 是 [[Hypervolume indicator]] 的经典改进思想之一，常被视为多目标贝叶斯优化中的 Pareto-aware acquisition。
- 与加权和等 [[Scalarization]] 方法相比，EHVI 不依赖预先固定的目标权重，更适合偏好不明确或希望覆盖多个权衡区域的任务。
- EHVI 的常见实现方式包括解析计算与 Monte Carlo 近似；具体推导与适用条件待核对经典来源。
- 在连续多目标优化中，EHVI 的效果通常与参考点选择、目标尺度和代理模型不确定性估计密切相关。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
