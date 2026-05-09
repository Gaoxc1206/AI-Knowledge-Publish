---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# Pareto dominance

## 标准定义

Pareto dominance（帕累托支配）是[[多目标优化]]中的基本比较关系：在最小化问题中，若解 A 在所有目标上都不劣于解 B，且至少在一个目标上严格优于 B，则称 A 支配 B；对应到最大化问题则将“不劣于/优于”的方向反过来理解。它用于区分[[Pareto front]]上的[[Non-dominated Solutions|非支配解]]与被其他解支配的解，是[[多目标优化]]、[[非支配排序]]和[[进化算法]]中的核心判据。

## 在本知识库中的用法

在这两篇 [[MOMO]] 论文的上下文中，Pareto dominance 被用作[[多目标分子优化]]的主要选择准则：先在[[隐式化学空间]]中进化生成候选分子，再根据多个目标（如 QED、[[PlogP]]、[[DRD2]]、[[Tanimoto similarity|Similarity]]）的支配关系进行筛选。论文不将多个目标简单加权成单目标，而是依赖 Pareto 支配、non-domination rank、[[Reference point mechanism|reference point]] mechanism 和动态接受概率来维护种群，并最终返回位于 [[Pareto front]] 上的一组候选分子。

## 关键点

- Pareto dominance 解决的是“多个目标同时优化”时的比较问题，而不是单一分数排序问题。
- 若一个分子在所有目标上都不差、且至少一个目标更好，则它支配另一个分子；这类非支配解通常构成 [[Pareto front]]。
- 在 MOMO 中，Pareto dominance 用于从一批候选分子里挑选下一代种群，帮助同时兼顾性质提升与与先导分子的相似性。
- 这种做法避免了把多个目标用权重硬合成一个目标，从而减少权重难设、偏好固定、难覆盖不同 trade-off 的问题。
- Pareto-based 选择通常与 [[non-domination rank]] 结合使用，以兼顾收敛性和解的多样性。

## 别名

- 帕累托支配
- Pareto domination
- 非支配关系
- 支配关系

## 外部背景

- 帕累托概念最早来自经济学中的效率分析，后被引入运筹学与多目标优化；具体经典来源待核对经典来源。
- Pareto dominance 与 Pareto optimality、Pareto efficiency、non-dominated solution 是一组紧密相关的术语，但侧重点略有不同：支配关系是判定规则，Pareto optimality 是结果性质。
- 在进化多目标算法中，Pareto dominance 常与拥挤距离、参考点或精英保留策略结合，用来维持种群分布均匀性。
- 若目标中存在最大化和最小化混合情形，通常需要先统一方向再应用支配关系；该规范属于常见实现细节，待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
