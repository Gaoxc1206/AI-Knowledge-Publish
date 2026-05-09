---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Multi-objective evolutionary molecule optimization

## 定义

一种在[[分子优化]]中同时考虑多个目标性质的进化式搜索方法。该方法通常把分子映射到[[连续分子表示|连续隐式化学空间]]，在 [[latent chemical space|latent space]] 中进行选择、[[crossover|交叉]]和变异，再解码回分子并计算性质。与将多个目标简单加权成单目标不同，它使用 [[Pareto dominance]] 等多目标评价策略，搜索一组具有不同权衡关系的候选分子。

## 关键点

- 核心思想是把分子优化显式建模为[[多目标优化]]问题，而不是单目标加权求和。
- 通常结合预训练 [[encoder-decoder]] 构建连续[[隐式化学空间]]，在 latent vector 上执行进化搜索。
- 候选分子在解码后的分子层面计算性质，再依据 non-domination rank、[[Reference point mechanism|reference point]] mechanism 等策略进行选择。
- 可同时优化多个分子性质及与先导分子的相似性，如 [[QED]]、[[PlogP]]、[[DRD2]] 和 [[Tanimoto similarity]]。
- 目标是返回一组位于 [[Pareto front]] 的分子，以体现不同目标之间的 trade-off。
- 该类方法可缓解离散空间直接操作带来的无效分子问题，但依赖预训练 [[encoder-decoder|codec]] 的质量。

## 别名

- MOMO
- multi-objective molecule optimization framework
- 多目标分子优化框架
- Pareto-based evolutionary molecule optimization

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
