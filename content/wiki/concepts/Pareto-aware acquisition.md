---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# Pareto-aware acquisition

## 标准定义

Pareto-aware [[acquisition function|acquisition]] 指在 [[Bayesian optimization]] 中显式利用 [[Pareto front]] 结构来挑选下一个评估点的[[acquisition function|采集函数]]。它通常不把多个目标先压成单一标量，而是直接根据候选点对当前[[Non-dominated Solutions|非支配解]]集、[[hypervolume]]、[[Pareto dominance|支配关系]]或前沿覆盖的潜在增益来打分。典型例子包括 [[Expected Hypervolume Improvement]] 一类方法，其目标是优先选择能扩展前沿、填补权衡空缺、提升多目标解集质量的候选点。

## 在本知识库中的用法

在本知识库的这组分子设计论文中，Pareto-aware acquisition 主要指以 EHVI 为代表的、面向多目标前沿的采集策略，并与[[固定权重标量化]]的 EI 做对照。上下文中的用法强调：在相同的 [[Gaussian Process]] 代理模型、相同的分子指纹表示、相同候选池和相同预算下，仅改变 [[acquisition function]]，以隔离采集策略本身的影响。实验结论是，EHVI 往往比[[fixed-weight scalarized EI|固定标量化 EI]] 获得更高的 [[Hypervolume Indicator|hypervolume]]、更低的 [[R2 indicator]]，并在部分任务上带来更好的[[chemical diversity|结构多样性]]与更快收敛。

## 关键点

- 核心特征是“按 Pareto 结构选点”，而不是先做 [[scalarization]] 再做单目标优化。
- 其优化目标通常是提升前沿覆盖与 [[hypervolume]]，因此更适合需要多种 trade-off 解的任务。
- 在该知识库的分子设计实验里，它被用来对比固定权重 EI：两者共享同一代理模型、表示和候选池，差异主要来自采集函数。
- 论文上下文显示，EHVI 作为一种 Pareto-aware acquisition，在 Fexofenadine、Amlodipine、Perindopril 三个任务上通常优于或不弱于固定标量化 EI。
- 它不仅关注目标值，还间接影响化学结构探索，多样性指标（如 #Circles）在部分任务上也更好。

## 别名

- Pareto-based acquisition
- Pareto-aware acquisition function
- 多目标采集函数
- 面向帕累托前沿的采集策略

## 外部背景

- 多目标贝叶斯优化中，Pareto-aware acquisition 是一类常见设计思路，常用于昂贵评估场景下的多目标寻优。
- 常见变体包括 EHVI、qEHVI、NEHVI 等，区别主要在于是否批量、是否考虑噪声及其近似实现方式。
- 相较于简单加权和，Pareto-aware 方法对非凸前沿通常更稳健；但具体优势仍依赖代理模型、候选空间和约束设置。
- 超体积及其增益是此类方法最常用的目标质量度量之一；待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
