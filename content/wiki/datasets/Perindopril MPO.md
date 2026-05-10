---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "多目标分子优化"
background: "included"
---
# Perindopril MPO

## 标准定义

Perindopril MPO 通常指一个面向药物[[分子生成|分子设计]]的多目标[[分子优化]]基准任务：在固定候选分子集合中，同时优化与 Perindopril 相关的多个性质，并用 [[Pareto front]]、[[Hypervolume Indicator]]、[[R^2 indicator]] 等指标评估优化质量。它本质上属于离散式 [[多目标分子优化]] 任务，常用于比较不同采集函数、代理模型或搜索策略的样本效率与前沿覆盖能力。

## 在本知识库中的用法

在这篇论文中，Perindopril MPO 是三个 [[GUACAMOL]] 多目标分子优化任务之一，与 [[Amlodipine MPO]] 和 [[Fexofenadine MPO]] 一起用于受控比较 [[Expected Hypervolume Improvement]] 与固定权重 [[Expected Improvement]]。实验保持 [[Gaussian Process]] 代理、[[ECFP]] 表征、MinMax kernel、固定候选池和相同预算不变，只改变 acquisition function。结果上，Perindopril MPO 的最终 hypervolume 上 [[Expected Hypervolume Improvement|EHVI]] 与 [[Scalarization|scalarized EI]] 几乎持平，EI 均值略高，但 EHVI 更早收敛且波动更小；同时 EHVI 在 [[R^2 indicator]] 和化学结构多样性上整体更好。

## 关键点

- 这是一个用于比较[[多目标优化]]算法的分子设计任务，重点不是单一性质最优，而是对 [[Pareto front]] 的整体覆盖。
- 在本知识库对应论文中，Perindopril MPO 被当作与 Amlodipine MPO、[[Fexofenadine MPO|Fexofenadine]] MPO 并列的基准任务。
- 论文采用相同的 [[Gaussian Process]] 代理与候选池，仅比较 [[Expected Hypervolume Improvement]] 和固定权重 [[Expected Improvement]] 的差异。
- 就该任务而言，EHVI 的最终 hypervolume 与 scalarized EI 非常接近，但 EHVI 更稳定、前期收敛更快。
- 除最优性外，论文还用 [[R^2 indicator]] 与结构多样性指标观察 Perindopril MPO 上的 trade-off。

## 别名

- Perindopril MPO
- Perindopril multi-objective optimization
- Perindopril task

## 外部背景

- Perindopril 是一种已知药物名，相关 MPO 任务通常借用其名称来标记一个具体的分子优化基准；待核对经典来源。
- 多目标分子优化基准常采用“固定候选池 + 逐步选点”的设置，以便公平比较不同算法；待核对经典来源。
- 经典评估通常同时关注前沿覆盖、前沿逼近误差和化学多样性，而不只看单个最优分数；待核对经典来源。

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
