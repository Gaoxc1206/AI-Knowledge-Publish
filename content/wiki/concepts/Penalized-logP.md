---
type: "concept"
status: "enriched"
category: "优化目标"
domain: "多目标分子优化"
background: "included"
---
# Penalized-logP

## 标准定义

Penalized-[[logP]]（常写作 [[PlogP]]）是[[分子生成]]与[[分子优化]]中的常用基准目标，通常以[[logP|疏水性]]指标 logP 为核心，再减去对合成可行性和环结构等不理想特征的惩罚项，用来避免模型通过生成“极端疏水但不具备可用性”的分子获得虚高分数。常见写法是将 logP 与合成可及性惩罚、环惩罚组合成一个标量评分；但具体公式和归一化方式会随基准实现而变化。它本质上是一个面向[[药物发现]]的代理性质目标，而不是单一的真实药效指标。

## 在本知识库中的用法

在本知识库对应论文中，Penalized-logP / PlogP 作为[[多目标分子优化]]的一个优化目标，与 [[Tanimoto Similarity]]、[[QED]]、[[DRD2]] 组合使用。[[MOMO]] 在连续的[[隐式化学空间]]中进行进化搜索，并通过 Pareto 式选择同时提升 PlogP 与其他目标；论文在二目标任务（PlogP + [[Tanimoto similarity|Similarity]]）和三目标任务（QED + PlogP + Similarity）中报告了显著优于基线的结果。

## 关键点

- Penalized-logP 是分子优化里常见的 [[评价指标]] / 目标函数，通常用于衡量“疏水性提升”与“可合成性约束”之间的折中。
- 标准定义一般以 logP 为基础，并加入合成可及性与环结构相关的惩罚项；不同基准实现的细节可能不完全一致。
- 在本库论文中，它是 MOMO 的核心优化目标之一，用于与 [[Tanimoto Similarity]] 联合构成二目标任务，或与 [[QED]] 一起构成三目标任务。
- 论文中的实验表明，MOMO 可以在保持较高相似性的同时提升 PlogP，说明该目标适合用于检验多目标优化算法的权衡能力。
- PlogP 数值过高并不必然代表分子质量更好；需要结合结构多样性、相似性与可用性一起解读，避免出现“高分但不实用”的分子。

## 别名

- PlogP
- penalized logP
- penalized-logP
- PenLogP

## 外部背景

- 常见基准定义：PlogP = logP − SA penalty − cycle penalty（或其变体）；具体实现与归一化方式需核对经典来源。
- 它常出现在先导优化与分子生成 benchmark 中，作为比单纯 logP 更“现实”的代理目标，因而更能约束模型不要走向过度疏水化。
- 高 PlogP 分子有时会偏向碳链更长、结构更简单的模式，因此通常需要与 [[QED]]、相似性或其他可行性指标联合评估。
- 许多实现会借助 [[RDKit]] 计算 logP 及部分结构相关量，但完整 PlogP 评分的具体管线仍建议待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
