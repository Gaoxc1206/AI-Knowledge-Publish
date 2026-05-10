---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# ParEGO

## 标准定义

ParEGO（Pareto Efficient Global Optimization）是一种用于[[多目标贝叶斯优化]]的经典[[标量化]]方法：它通常通过在每轮迭代中随机采样权重或偏好，把多个目标压缩为单个标量目标，再用单目标采集函数（常见是[[Expected Improvement]]）选择下一候选点，从而近似覆盖[[Pareto Front|Pareto前沿]]。

## 在本知识库中的用法

待从更多论文中补充。当前上下文只说明：这篇论文比较的是固定权重的 scalarized EI 与 [[Expected Hypervolume Improvement]]（[[Expected Hypervolume Improvement|EHVI]]），并明确提到标量化还包括 random scalarization、adaptive scalarization 等更灵活变体，但这些都不是本文主要比较对象；因此本知识库里 ParEGO 只能先作为相关的标量化路线来记录，尚无直接实验结论。

## 关键点

- ParEGO 的核心思想是把多目标问题转成单目标问题来做优化，常用于[[多目标贝叶斯优化]]场景。
- 它通常通过随机化权重或偏好来避免固定权重只覆盖 [[Pareto Front|Pareto 前沿]]局部区域的问题。
- 与[[Expected Hypervolume Improvement]]这类 Pareto-aware acquisition 不同，ParEGO 仍然依赖[[标量化]]后的单目标代理与采集函数。
- 在[[分子生成|分子设计]]语境中，它可被视为一类基于标量化的基线方法，但当前上下文没有给出它的直接实验结果。
- 本文上下文中的重点对比对象是固定权重 scalarized EI，因此 ParEGO 更适合作为相关背景术语而非本节点的结论性方法。

## 别名

- Pareto Efficient Global Optimization
- ParEGO

## 外部背景

- 常见做法是每一轮重新采样权重或参考偏好，以便在不同 trade-off 区域之间切换。
- 经典 ParEGO 往往与加权 Tchebycheff 或其增强形式的标量化函数相关，具体版本可待核对经典来源。
- 它适合目标数较少的[[多目标优化]]任务；当目标很多时，标量化设计和权重覆盖会更敏感。
- ParEGO 主要解决的是“如何把多目标交给单目标优化器处理”的问题，而不是直接显式建模整个 Pareto 集。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
