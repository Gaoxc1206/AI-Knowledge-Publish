---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Molecular evolutionary optimization

## 定义

一种在[[连续分子表示|连续隐式化学空间]]中进行进化搜索的[[分子优化]]方法。它先用预训练的 [[encoder-decoder]] 将分子映射到 [[latent chemical space|latent space]]，再在 latent vector 上执行 selection、[[crossover]] 和 [[mutation]]，并将候选向量解码回分子进行性质评估。该方法使用基于 [[Pareto dominance]] 的多属性评价策略，在多个目标之间寻找一组具有不同权衡关系的优化分子，而不是单一最优解。

## 关键点

- 核心思想是把分子优化显式建模为[[多目标优化]]问题，而不是用加权求和压成单目标。
- 在连续[[隐式化学空间]]中进行进化操作，可避免直接在离散 [[SMILES]] 或[[分子图]]上操作带来的无效分子问题。
- 候选分子的性质在解码后的分子序列层面计算，便于使用现有分子属性评估器。
- 使用 non-domination rank、[[Reference point mechanism|reference point]] mechanism 和 dynamic acceptance probability 进行 Pareto-based 种群更新。
- 实验中验证了 [[QED]] + [[Tanimoto similarity|Similarity]]、[[PlogP]] + Similarity、QED + [[DRD2]] + Similarity 等任务。
- 依赖预训练 [[encoder-decoder|codec]] 的质量，且编码/解码开销是已知局限。

## 别名

- MOMO
- multi-objective molecule optimization framework
- evolutionary multi-objective molecule optimization

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
