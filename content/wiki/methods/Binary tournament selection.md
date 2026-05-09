---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# Binary tournament selection

## 标准定义

Binary tournament selection（[[二元锦标赛选择]]）是[[进化算法]]中的一种常见[[选择算子]]：每次随机抽取两个候选个体进行比较，并按预设适应度规则选出更优者进入下一步繁殖或保留。比较准则可以是单目标适应度，也可以是多目标情形下的[[Pareto dominance]]、[[non-domination rank]]、[[拥挤距离]]等。该方法实现简单、计算开销低，常用于[[遗传算法]]和[[多目标进化算法]]中的父代选择或环境选择。

## 在本知识库中的用法

待从更多论文中补充。当前给定的 [[MOMO]] 论文只明确提到在[[隐式化学空间|隐空间]]中进行 selection、[[crossover]]、[[mutation]]，以及基于 Pareto 的多目标选择机制，但未明确说明是否使用了 binary tournament selection。

## 关键点

- Binary tournament selection 属于进化搜索中的局部比较式[[选择算子]]：先随机取两者，再按规则选优。
- 它常用于需要在搜索效率与实现简单性之间平衡的场景，尤其适合与[[遗传算法]]、[[多目标进化算法]]配合。
- 在多目标问题中，比较规则不一定是单一适应度，也可以结合[[Pareto dominance]]、[[non-domination rank]]或[[拥挤距离|拥挤度]]。
- 就当前知识库上下文而言，MOMO 论文强调的是隐空间中的进化操作和 Pareto-based 选择，但没有明确给出 binary tournament selection 细节。
- 因此，在本库中该术语更适合作为通用方法节点保留，具体实现细节仍需后续论文补充。

## 别名

- 二元锦标赛选择
- 二进制锦标赛选择
- binary tournament
- tournament selection

## 外部背景

- 常见于 [[NSGA-II]] 等多目标进化算法中，作为父代选择或排序后的抽样机制。
- 当两个个体在[[非支配排序]]中同层时，通常会进一步用拥挤距离等指标打破平局；具体规则依实现而定。
- 若用于单目标优化，锦标赛中直接比较适应度；若用于[[多目标优化]]，常将比较规则替换为排序等级和多样性指标。
- 待核对经典来源

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
