---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# PlogP

## 标准定义

PlogP 通常指 penalized logP，即对分子 [[logP]] 做惩罚修正后的综合分数，用来平衡疏水性与分子可行性。常见背景定义会把可合成性、环结构惩罚等因素纳入，以避免只追求更高 logP 却生成化学上不合理的分子；其具体公式在不同工作中可能略有差异，待核对经典来源。

## 在本知识库中的用法

在这篇论文中，PlogP 被作为多目标[[分子优化]]的一个核心性质目标之一，与相似性一起构成 Task 2，并与 [[QED]]、相似性一起构成 Task 3。作者在 [[Pareto front]] 框架下报告 PlogP improvement（PlogP_imp），并强调 [[MOMO]] 在不同相似性约束下都能保持较高的 PlogP_imp 和较好的稳定性。

## 关键点

- PlogP 是分子优化中常用的性质目标，强调在提升 [[logP]] 的同时避免生成过于“投机”的分子。
- 在本库所对应论文里，PlogP 不是单独优化，而是与 [[Tanimoto similarity]] 等目标联合建模为多目标问题。
- 论文使用 PlogP_imp 作为优化增益的评估方式，关注的是相对先导分子的提升幅度，而不是仅看绝对分数。
- MOMO 在 Task 2（PlogP + Similarity）和 Task 3（QED + PlogP + Similarity）中都以 PlogP 作为重要目标，说明其适合与多目标分子优化结合。
- PlogP 属于典型的“性质分数”而非生成模型本身，通常需要与 [[Pareto front]]、相似性约束等一起解释。

## 别名

- penalized logP
- pLogP
- P-logP

## 外部背景

- PlogP 常被用作分子优化 benchmark 中的目标函数之一，尤其适合测试模型是否能在提升性质的同时保持化学合理性。
- 在不同论文里，PlogP 的具体构造可能不同；最经典的版本通常带有合成可达性和环惩罚项，待核对经典来源。
- PlogP 往往与 QED、DRD2、similarity 等目标组合，形成二目标或三目标优化任务。
- 它既可以作为评价指标，也可以作为搜索目标；两种用法在文献中经常交叉出现。

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
