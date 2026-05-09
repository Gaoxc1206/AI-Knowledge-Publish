---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标分子优化"
---
# IPCA

## 定义

待从更多论文中补充。当前给定上下文主要描述的是一种在[[隐式化学空间]]中结合[[Pareto-based evolutionary search|多目标进化搜索]]的[[分子优化]]框架，其核心是把分子编码到[[连续隐空间]]中，再用 Pareto 思想同时优化相似性与多个分子性质。若 IPCA 指向该类方法中的具体变体或别名，当前证据不足以准确确认。待从更多论文中补充。

## 关键点

- 当前上下文表明相关方法面向[[多目标分子优化]]，而不是单目标加权优化。
- 方法思路是在预训练[[encoder-decoder|编码器-解码器]]构建的[[连续分子表示|连续隐式化学空间]]中进行进化搜索。
- 优化时同时考虑先导[[药物相似性|分子相似性]]与性质目标，如 [[QED]]、[[PlogP]]、[[DRD2]]。
- 选择策略基于 [[Pareto dominance]]、non-domination rank、[[Reference point mechanism|reference point]] mechanism 等。
- 当前材料中未能明确证明“IPCA”的标准全称或与 [[MOMO]] 的准确对应关系。

## 别名

- 待从更多论文中补充

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
