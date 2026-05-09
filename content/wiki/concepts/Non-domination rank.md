---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# Non-domination rank

## 标准定义

Non-domination rank（非支配等级）是[[多目标优化]]中对候选解按 [[Pareto dominance]] 关系进行分层的排序指标：处于第一层的解为当前种群中的[[Non-dominated Solutions|非支配解]]，第二层为被第一层支配但彼此不支配的解，依此类推。它常与 [[Pareto front]]、[[拥挤距离|拥挤度]]或其他多样性指标一起使用，用于在多个冲突目标下平衡收敛性与多样性。

## 在本知识库中的用法

在 [[MOMO]] 里，non-domination rank 用来给解码后的候选分子按多目标性质分层，作为 [[多目标进化算法]] 的核心选择依据之一。它与 [[Reference point mechanism|reference point]] mechanism 和动态接受概率一起工作，帮助算法在保持较高目标值的同时，保留不同偏好的候选分子，而不是把多个性质简单加权成单目标。

## 关键点

- 它本质上是 [[Pareto dominance]] 的层级化表达：支配关系越优，rank 越低。
- rank 低的个体通常优先保留，有助于推动解集逼近 [[Pareto front]]。
- 在[[多目标分子优化]]中，它比加权求和更适合保留不同目标权衡的候选分子。
- MOMO 将 non-domination rank 用于筛选下一代种群，而不是只选单个最优分子。
- 该指标通常需要与多样性控制机制配合，才能兼顾收敛性与覆盖范围。

## 别名

- 非支配等级
- 非支配排序等级
- Pareto rank
- nondomination rank
- non-dominated rank

## 外部背景

- 在经典[[多目标进化算法]]中，non-domination rank 常见于[[非支配排序]]框架，例如 [[NSGA-II]]；待核对经典来源。
- rank 只是排序层级，不等同于最终质量分数；同一层内通常还需要额外准则区分个体优先级。
- 当目标之间存在冲突时，较低 rank 表示个体在当前种群中更接近理想折中解；待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
