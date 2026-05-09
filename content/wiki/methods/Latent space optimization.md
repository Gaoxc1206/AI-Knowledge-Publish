---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Latent space optimization

## 定义

Latent space optimization 指的是先将分子编码到连续的[[隐式化学空间|隐空间]]中，再在该连续表示上进行搜索、变异或进化，从而找到满足目标约束的候选分子。根据给定论文笔记，这种做法通常依赖预训练的 [[encoder-decoder]]/[[encoder-decoder|codec]] 学习[[隐式化学空间]]，并在解码回分子后评估性质。它的主要作用是把原本离散且难以直接操作的[[分子优化]]问题，转化为更平滑的连续优化问题。用于多目标场景时，还可以与 Pareto 选择结合，以同时处理性质提升与相似性约束。

## 关键点

- 先通过 encoder-decoder 或 codec 将分子映射到连续 latent vector，再在隐空间中进行优化。
- 优化操作可以包括 selection、[[crossover]]、[[mutation]] 等进化步骤，但发生在[[连续隐空间]]而不是离散 [[SMILES]]/图上。
- 候选分子需要从 [[latent chemical space|latent space]] 解码回[[化学空间|分子空间]]后，再计算 [[QED]]、[[PlogP]]、[[DRD2]]、[[Tanimoto similarity|Similarity]] 等目标。
- 这种方式避免了在离散[[化学空间]]中手工设计复杂化学编辑规则，搜索通常更平滑。
- 在[[多目标分子优化]]中，latent space optimization 常与 [[Pareto dominance]]、non-domination rank 等策略结合，用于返回一组不同偏好的解。
- 效果依赖于预训练 codec 的质量、解码有效率以及隐式化学空间的覆盖能力。

## 别名

- latent-space optimization
- latent space search
- 隐空间优化
- 隐式化学空间优化

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
