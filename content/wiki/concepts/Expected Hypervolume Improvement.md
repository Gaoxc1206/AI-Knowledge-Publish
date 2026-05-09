---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化"
background: "included"
---
# Expected Hypervolume Improvement

## 标准定义

Expected [[Hypervolume]] Improvement（[[Pareto-aware acquisition|EHVI]]）是一类面向[[Bayesian optimization|贝叶斯优化]]的多目标[[acquisition function|采集函数]]，用于衡量候选点加入当前[[Non-dominated Solutions|非支配解]]集后，对[[Hypervolume indicator|超体积指标]]带来的期望增量。它不把多个目标先压缩成单一标量，而是直接利用[[Pareto front|Pareto 前沿]]与参考点来评估候选解对前沿覆盖的贡献，因此常用于需要同时兼顾多个冲突目标的优化问题。EHVI 通常与[[Gaussian Process|高斯过程]]代理模型配合使用，并可视为[[Expected Improvement|EI]]在多目标场景下的扩展。

## 在本知识库中的用法

在本知识库的这篇[[分子设计]]论文中，EHVI 被用作与[[固定权重标量化]] EI 对照的多目标采集函数。实验在相同的分子表示、相同的 GP 代理模型、相同候选池和相同 BO 预算下，只改变采集函数，以隔离 EHVI 的效果。结果显示，EHVI 在三个 GUACAMOL [[多目标分子优化]]任务上通常获得更高的 hypervolume、更低的 [[R2 indicator]]，以及更高或相当的化学[[chemical diversity|结构多样性]]；论文还使用 [[Monte Carlo estimation|Monte Carlo]] 估计 EHVI，并在每轮从固定候选池中选择分子。

## 关键点

- EHVI 的核心目标是最大化当前非支配解集相对参考点的[[Hypervolume indicator|超体积]]期望增量，而不是优化单一标量分数。
- 它适合多目标优化，尤其适合希望同时追求 Pareto front 覆盖与解集多样性的场景。
- 在本库论文中，EHVI 与固定权重标量化 EI 做了受控比较：同一 [[Gaussian Process|GP]]、同一分子指纹、同一候选池、同一预算。
- 该论文中 EHVI 在三个分子多目标任务上总体表现更好：hypervolume 更高、R2 更低、结构多样性更优或相当。
- EHVI 在实现上常需要数值近似；该论文使用 Monte Carlo 估计，并以固定候选池进行逐轮选择。

## 别名

- EHVI
- Expected Hypervolume Gain
- 超体积期望提升
- 期望超体积改进

## 外部背景

- EHVI 是多目标贝叶斯优化中的经典采集函数之一，通常需要给定参考点来定义超体积增量。
- 在二维或低维目标下，EHVI 可能存在解析或半解析计算形式；高维时常使用 Monte Carlo 或其他近似方法。
- EHVI 与标量化方法的差别在于：前者直接处理向量目标与 Pareto 结构，后者先把多目标压成单目标。
- 待核对经典来源

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
