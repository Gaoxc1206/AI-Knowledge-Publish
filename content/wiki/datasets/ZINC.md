---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "分子生成与分子优化"
background: "included"
---
# ZINC

## 标准定义

ZINC 是一个面向[[药物发现]]与虚拟筛选的公开小分子数据库，通常收录可购买、可检索的 [[SMILES]]/结构化化合物，并常配套基础理化性质或可计算派生特征。它经常被用作[[分子生成]]、[[分子优化]]、检索与预训练的标准数据源；在不同研究中也会使用其子集（如 ZINC250K）作为基准或初始化分子集合。

## 在本知识库中的用法

在给定论文上下文中，ZINC 主要以 ZINC250K 的形式出现，用于 [[MOLLM]] 的初始种群构造：从中选择 100 个分子作为 random initial、best initial 或 worst initial。论文将其描述为约 25 万个经过整理的 drug-like molecules，包含化学结构及若干性质（如 logP、[[QED]]、SA），并用来分析不同初始化方式对多目标遗传式分子优化结果的影响。

## 关键点

- ZINC 是[[分子生成|分子设计]]领域常用的公开化合物数据库，常用于 [[分子生成]]、[[分子优化]] 和虚拟筛选。
- 在本知识库相关论文中，ZINC250K 被当作遗传优化的起始分子池，而不是训练标签数据集。
- 论文强调初始化策略会显著影响基于进化/遗传方法的优化表现，因此从 ZINC 中构造 best / worst / random initial 进行公平比较。
- ZINC 相关分子通常可直接用于计算 QED、[[PlogP]]、[[SA]] 等性质，也便于和 oracle-based 优化流程衔接。
- 若具体指 ZINC 的版本、筛选规则或规模细节，待从更多论文中补充。

## 别名

- ZINC 数据库
- ZINC250K
- ZINC15

## 外部背景

- ZINC 常被用作药物样分子库，支持结构检索、对接筛选与生成模型评测。待核对经典来源
- 常见变体包括 ZINC15、ZINC250K 等，不同版本在规模、可购买性和过滤规则上可能不同。待核对经典来源
- 在分子生成基准中，ZINC250K 经常作为训练集或初始化池，用于评估模型是否能生成有效且类药的分子。待核对经典来源
- ZINC 分子一般以分子图或 [[SMILES]] 表示，便于与深度生成模型和[[遗传算法]]结合。待核对经典来源

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
