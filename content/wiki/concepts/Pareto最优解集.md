---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多模态多目标优化"
background: "included"
---
# Pareto最优解集

## 标准定义

Pareto最优解集（[[Pareto 最优|Pareto optimal]] solution set, PS）是指在给定约束下，由所有[[Pareto最优解]]组成的解集合：集合中的任一解都不被其他可行解支配。将这些解映射到[[目标空间]]后，通常对应[[Pareto Front|Pareto前沿]]（PF）。在多目标问题中，PS强调“[[决策空间]]中的最优解集合”，而PF强调“目标空间中的非支配边界”。

## 在本知识库中的用法

在这篇关于[[多模态多目标优化]]（MMOPs）的论文上下文中，Pareto最优解集不仅指单一的最优解集合，而是指可能对应同一个PF点的一组全局/局部解结构。论文关心的不只是逼近PF，还要尽量找全多个彼此分离的PS：包括全局 PS 和局部 PS。ACEA-NFCD 通过自适应收敛指标区分不同区域的PS，并借助[[邻域]]模糊[[拥挤距离]]维护这些PS的多样性。

## 关键点

- 标准上，PS是由所有互不被支配的可行解组成的集合；其目标空间对应物通常是[[Pareto Front|Pareto前沿]]。
- PS是决策空间概念，PF是目标空间概念；二者是[[多目标优化]]中最核心的一对对应对象。
- 在MMOPs里，一个PF可能对应多个彼此分离的PS，因此“找全PS”比只找一个PF更困难。
- 本知识库中，PS常与[[全局最优]]、[[局部最优]]、[[局部Pareto前沿]]一起讨论，用于描述不同模态下的可行最优结构。
- 该论文将PS作为搜索与保留的主要对象：CArc偏向收敛到PF，DArc则尽量保留不同PS，尤其是局部PS。

## 别名

- Pareto optimal solution set
- PS
- Pareto解集
- Pareto最优集
- 最优解集

## 外部背景

- 在经典多目标优化教材中，PS通常定义为所有Pareto最优决策解的集合；PF则是这些解在目标空间中的像。
- 常见变体包括 global PS / local PS 的区分：前者对应全局非支配最优结构，后者通常出现在多峰或多模态问题中。
- 在单目标优化的类比中，PS可看作“最优解集合”的多目标推广，但多目标下可能不存在唯一最优解。
- 待核对经典来源

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
