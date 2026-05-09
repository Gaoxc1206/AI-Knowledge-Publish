---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Pareto-based evolutionary search

## 定义

一种基于 Pareto 支配关系的多目标进化搜索方法，用于同时优化多个相互冲突的分子性质。结合[[隐式化学空间]]中的编码、[[crossover|交叉]]与变异，在解码后的[[化学空间|分子空间]]中评估性质与相似性，并通过[[非支配排序]]等策略选择下一代种群。该方法避免将多个目标简单加权为单目标，能够返回一组位于 [[Pareto front]] 上的候选分子。

## 关键点

- 在连续的隐式[[化学空间]]中执行进化操作，而不是直接在离散 [[SMILES]] 或[[分子图]]上手工变异。
- [[分子优化]]被显式建模为多目标问题，同时考虑性质提升与与先导分子的相似性保持。
- 使用 [[Pareto dominance]]、non-domination rank、[[Reference point mechanism|reference point]] mechanism 和动态接受概率来维护搜索质量。
- 搜索在[[隐式化学空间|隐空间]]进行，但目标评估在解码后的分子空间完成，依赖 [[RDKit]]、[[pyTDC]]、[[ADMETlab]] 等工具。
- 适合处理 [[QED]]、[[PlogP]]、[[DRD2]]、[[Tanimoto similarity|Similarity]] 等多个冲突目标，并输出一组不同偏好的解。

## 别名

- 基于Pareto的进化搜索
- Pareto-based multi-objective evolutionary search
- 多目标进化搜索
- Pareto进化算法
- Pareto dominance search

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
