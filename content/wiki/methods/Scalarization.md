---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化、贝叶斯优化"
background: "included"
---
# Scalarization

## 标准定义

Scalarization（标量化）是将[[多目标优化]]中的多个目标通过加权和、加权乘积、Tchebycheff 或其他聚合方式映射为单一标量目标的方法。这样原本需要处理向量值的优化问题，就可以转化为单目标优化来求解。标量化的核心作用是编码偏好：不同权重对应不同的 trade-off 偏向，因此常用于近似 [[Pareto front]] 上的某一部分。但固定权重通常只覆盖部分偏好区域，且对非凸 [[Pareto Front|Pareto 前沿]]可能存在覆盖不足。

## 在本知识库中的用法

在本库收录的这篇论文里，scalarization 特指一种**固定权重的标量化基线**：先把多个分子性质压缩成单一分数，再用 [[Expected Improvement]]（EI）做采样决策，作为 [[Expected Hypervolume Improvement]]（[[Expected Hypervolume Improvement|EHVI]]）的对照方法。论文明确不是在比较所有 scalarization 变体，而是聚焦这个可控且常见的 fixed-weight scalarized EI。实验中，它与 EHVI 共享相同的 [[Gaussian Process]] 代理模型、分子表示和候选池，主要差异只在 acquisition function。结果显示，这种固定标量化在三个 [[GUACAMOL]] 多目标[[分子优化]]任务上整体弱于 Pareto-aware 的 EHVI，尤其在前沿覆盖、收敛速度和结构多样性上。

## 关键点

- 标量化的本质是把多目标问题压成单目标，便于直接套用单目标优化流程。
- 它依赖权重或聚合形式来表达偏好，因此结果通常对应 [[Pareto front]] 上的某个局部区域。
- 固定权重标量化在偏好已知时很直接，但在药物[[分子生成|分子设计]]这类偏好不确定的场景里，往往需要反复试不同权重。
- 论文中的实现是 fixed-weight scalarized EI，用于与 [[Expected Hypervolume Improvement]] 做公平比较。
- 在该论文的受控实验中，标量化基线总体不如 EHVI，说明直接面向 Pareto 覆盖的策略更适合该任务。
- 标量化方法不等于单一方法家族；随机标量化、自适应标量化等属于不同变体，本文未重点比较。

## 别名

- scalarization
- 标量化
- 加权标量化
- weighted-sum scalarization
- fixed-weight scalarization
- scalarized EI

## 外部背景

- 标量化是[[多目标优化]]中的经典思路，常见形式包括加权和、加权乘积、[[Tchebycheff scalarization|Tchebycheff 标量化]]等。
- 在多目标[[Bayesian optimization|贝叶斯优化]]中，标量化后的目标可以继续使用 [[Expected Improvement]]、UCB 等单目标 acquisition。
- 加权和标量化对非凸 [[Pareto Front|Pareto front]] 可能覆盖不全，这是经典局限之一，待核对经典来源。
- 在实践中，权重也常被解释为偏好、成本或重要性的编码，但其设定通常具有问题依赖性。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
