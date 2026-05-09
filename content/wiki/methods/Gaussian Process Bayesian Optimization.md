---
type: "method"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化；多目标分子优化"
---
# Gaussian Process Bayesian Optimization

## 定义

[[Gaussian Process]] [[Bayesian Optimization]] 是一种以[[Gaussian Process|高斯过程]]作为代理模型的[[Bayesian Optimization|贝叶斯优化]]方法，适用于评估代价较高的优化问题。它通过代理模型给出候选点的后验均值与不确定性，再用 [[acquisition function]] 迭代选择下一批候选。本文中该框架用于分子[[多目标优化]]，并在相同表示、相同 GP 与相同预算下比较不同 [[acquisition function|acquisition strategy]] 的效果。

## 关键点

- 在本文实验中，每个分子性质都分别用一个 [[Gaussian]] Process 建模，而不是直接把多个目标合并为单一模型。
- 候选分子的选择依赖 [[acquisition function|acquisition]] function；本文主要比较了 [[Expected Hypervolume Improvement|EHVI]] 与[[固定权重标量化]]后的 [[Expected Improvement]]。
- 分子表示使用 Morgan/[[ECFP]] 指纹，并在实验中采用 [[MinMax kernel]] 来衡量[[药物相似性|结构相似性]]。
- 该方法在固定候选池与固定 BO 预算下迭代运行，候选池来自 GUACAMOL training set。
- 本文的比较显示，基于 GP 的[[多目标贝叶斯优化]]框架中，EHVI 通常比固定[[Expected Improvement|标量化 EI]] 更能提升 hypervolume 和 [[Pareto front]] 覆盖。

## 别名

- Gaussian Process BO
- GP Bayesian Optimization
- GP-BO
- 高斯过程贝叶斯优化

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
