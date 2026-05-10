---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
background: "included"
---
# NSGA-II

## 标准定义

NSGA-II（[[非支配排序|Non-dominated Sorting]] [[遗传算法|Genetic Algorithm]] II）是一类经典的[[Multi-objective Evolutionary Algorithm|多目标进化算法]]，通过[[非支配排序]]对种群进行分层，并结合[[拥挤距离]]进行精英保留与多样性维护，从而在迭代过程中逼近[[Pareto Front|Pareto前沿]]。它的核心目标不是把多个目标压成一个标量，而是在不同目标之间保留一组可比较的权衡解。

## 在本知识库中的用法

待从更多论文中补充。当前给定上下文中只出现了与 NSGA-II 思想相关的成分，例如 Pareto dominance-based evaluation、non-domination rank、reference point mechanism、crowding/多样性维护，但没有明确说明 [[MOMO]] 或 ACEA-NFCD 直接采用了 NSGA-II。

## 关键点

- NSGA-II 的典型流程是：[[非支配排序]] + [[拥挤距离]]选择，用于在一个种群内同时兼顾收敛性与多样性。
- 它属于[[Evolutionary Algorithm|进化算法]]体系中的经典[[多目标优化]]方法，常被用作基线或概念参照来理解 Pareto-based 搜索。
- 与单目标加权和不同，NSGA-II 不需要预先指定目标权重，更适合保留多个目标之间的 trade-off 结构。
- 在本知识库相关论文中，MOMO 和 ACEA-NFCD 都使用了与 NSGA-II 相近的思想，例如 non-domination rank、Pareto 选择和拥挤/稀疏性维护。
- 对于分子多目标优化，这类方法常用于在保持相似性的同时优化 [[QED]]、[[PlogP]]、DRD2 等多个性质。

## 别名

- Non-dominated Sorting Genetic Algorithm II
- Non-dominated Sorting GA II
- NSGA2
- 非支配排序遗传算法II

## 外部背景

- NSGA-II 通常被视为 Deb 等人提出的经典多目标[[遗传算法]]改进版本，待核对经典来源。
- 其常见实现包含 fast [[非支配排序|non-dominated sorting]]、elitist selection 和 crowding distance 三个关键组件。
- 与 NSGA 相比，NSGA-II 主要改进了排序效率和精英保留机制，待核对经典来源。
- 在目标维度很多时，NSGA-II 可能面临排序与拥挤距离区分能力下降的问题，常见替代方案包括 NSGA-III，待核对经典来源。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
