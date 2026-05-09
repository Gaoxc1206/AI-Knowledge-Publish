---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Gaussian mutation

## 定义

[[Gaussian]] [[mutation]] 是一种在[[连续隐空间]]中对分子表示进行[[Gaussian|高斯]]扰动的变异方式。结合上下文，它被用于 [[MOMO]] 的进化搜索流程中，与 selection 和 [[crossover]] 一起在[[隐式化学空间]]里生成后代个体。具体扰动公式、参数设置和实现细节在给定材料中没有展开，待从更多论文中补充。

## 关键点

- 在给定上下文中，它对应的是对 latent vector 的变异/扰动，而不是直接在离散 [[SMILES]] 或[[分子图]]上操作。
- 它服务于 MOMO 的[[连续分子表示|连续隐式化学空间]]进化搜索，用于产生新的候选分子。
- 该做法与选择、[[crossover|交叉]]配合使用，属于[[进化算法]]中的 mutation 操作。
- 上下文仅明确提到“高斯扰动初始化种群”，因此其是否还有更具体的变异策略，待从更多论文中补充。
- 由于发生在连续空间中，这类变异思路与离散空间手工化学编辑相比更平滑。

## 别名

- 高斯变异
- 高斯扰动
- Gaussian perturbation
- Gaussian noise mutation

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
