---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# MSO

## 定义

MSO 在给定笔记中主要对应一种基于[[隐式化学空间]]的[[多目标分子优化]]思路：先用预训练的 [[encoder-decoder]] 学习[[连续分子表示]]，再在[[隐式化学空间|隐空间]]中进行进化搜索。它不把多个目标简单加权成单目标，而是用 [[Pareto dominance]] 直接处理性质优化与相似性约束的权衡。该方法旨在同时返回一组具有不同偏好的候选分子，而不是单个最优解。若 MSO 的具体缩写含义需要进一步确认，待从更多论文中补充。

## 关键点

- 在连续的隐式[[化学空间]]中进行分子搜索，而不是直接在离散 [[SMILES]] 或[[分子图]]上操作。
- 使用预训练的 encoder-decoder/[[深度生成模型|cddd]] 学习分子表示，降低对带标签数据的依赖。
- 在隐空间中执行 selection、[[crossover]]、[[mutation]] 等进化操作，再解码回[[化学空间|分子空间]]评估性质。
- 采用 Pareto dominance、non-domination rank、[[Reference point mechanism|reference point]] mechanism 和动态接受概率进行多目标选择。
- 可同时优化 [[QED]]、[[PlogP]]、[[DRD2]] 与 Tanimoto [[Tanimoto similarity|Similarity]] 等目标，并输出 [[Pareto front]] 上的一组分子。
- 论文实验显示该方法在二目标和三目标任务上优于多种基线，但编码/解码开销较高。

## 别名

- MOMO
- multi-objective molecule optimization
- multi-objective evolutionary molecular optimization

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
