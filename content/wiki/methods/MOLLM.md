---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# MOLLM

## 标准定义

MO[[大语言模型|LLM]] 可视为一种将[[大语言模型]]直接用作候选生成与编辑算子的[[多目标优化]]框架：在类似[[遗传算法]]的迭代搜索中，让模型承担 crossover 与 mutation，再配合多目标选择策略，在有限评估预算下同时优化多个分子性质。

## 在本知识库中的用法

在本知识库中，MOLLM特指论文“借助专家优化的[[分子生成|分子设计]]多目标[[大语言模型]]”提出的无额外训练方法：从[[ZINC250K]]初始化种群，在固定 5,000 oracle calls 预算下，主要用 ChatGPT 4o 通过提示词对父代分子的[[SMILES]]执行 crossover/mutation，并结合 F-value 选择或[[Pareto Front|Pareto 前沿]]选择生成下一代；论文还系统比较了 best/worst/random initial，并强调在该设置下其相较 [[MOLLEO]]、[[GB-GA]] 等方法具有更高多目标 fitness 且更少 LLM 调用与运行时间。

## 关键点

- MOLLM 的核心是把 [[大语言模型]] 直接当作分子进化搜索中的生成算子，而不是先训练专门的[[分子生成]]模型。
- 方法同时支持 crossover 与 mutation，并通过提示词注入目标描述、父代分子性质和输出格式约束。
- 多目标筛选使用 F-value 与[[Pareto Front|Pareto 前沿]]两种机制，兼顾 exploitation 与 exploration。
- 论文特别强调初始化公平性，区分 best initial、worst initial 和 random initial，以避免遗传类方法比较失真。
- 该框架采用[[in-context learning]]式提示组织历史经验，但经验池在消融中未带来增益。
- 在本知识库收录的实验里，MOLLM 在多目标[[分子优化]]上优于多种基线，并显著减少 LLM 调用。

## 别名

- MOLLM: Optimizing with Experts
- Multi-Objective Large Language Model
- MOLLM: Multi-Objective Large Language Model for Molecular Design
- Multi-Objective LLM
- MOLLM
- Multi-Objective Large Language Model for Molecular Design
- 多目标大语言模型分子设计框架

## 外部背景

- [[遗传算法]]中的 crossover 和 mutation 是常见的组合搜索算子，常用于在结构空间中做局部与全局探索，待核对经典来源。
- [[多目标优化]]通常用 Pareto dominance / [[Pareto Front|Pareto front]] 描述非支配解集合，以平衡多个冲突目标，待核对经典来源。
- [[Prompt Engineering]] 与[[in-context learning]]是大语言模型零样本/少样本生成的重要方式，待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
