---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# MOMO

## 定义

MOMO（[[分子隐空间优化|Molecule optimization via multi-objective evolutionary in implicit chemical space]]）是一种将预训练 [[encoder-decoder]] 学到的[[连续分子表示|连续隐式化学空间]]与[[Pareto-based evolutionary search|多目标进化搜索]]结合的[[分子优化]]方法。它不把多个目标简单加权成单目标，而是基于 [[Pareto dominance]] 直接搜索一组在性质与相似性之间具有不同权衡的候选分子。方法在[[隐式化学空间|隐空间]]中进行选择、[[crossover|交叉]]和变异，再解码回分子并评估 [[QED]]、[[PlogP]]、[[DRD2]] 和相似性等目标。实验表明它在若干二目标和三目标任务上优于多种基线。

## 关键点

- 将分子优化明确建模为[[多目标优化]]问题，而不是单目标加权优化。
- 在预训练 encoder-decoder 构建的连续[[隐式化学空间]]中进行进化搜索，实验中使用了 [[深度生成模型|cddd]] 模型。
- 进化操作包括 selection、[[crossover]] 和 [[mutation]]，候选向量再解码为分子进行性质评估。
- 采用 Pareto dominance、non-domination rank、[[Reference point mechanism|reference point]] mechanism 和动态接受概率维护搜索质量。
- 支持在多个目标之间寻找不同偏好的解，尤其适用于 QED、P[[logP]]、DRD2 与 [[Tanimoto similarity|Similarity]] 的联合优化。
- 作者指出其局限包括编码/解码耗时，以及对更多目标和多样性的进一步验证不足。

## 别名

- Multi-Objective Molecule Optimization
- Molecule optimization via multi-objective evolutionary in implicit chemical space
- multi-objective molecule optimization framework

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
