---
type: "method"
status: "enriched"
category: "优化方法"
domain: "可控多属性多目标分子优化"
---
# MolOpt-Instructions

## 定义

MolOpt-Instructions 是一种将[[分子优化]]重构为自然语言指令控制的[[属性特异性目标|属性级目标]]优化方法。它通过 [[C-MuMOInstruct]] [[Instruction Tuning|指令微调]]数据集训练[[大语言模型]]，使模型能够根据输入分子和属性级要求，选择性提升部分性质、保持部分已达标性质，并尽量维持[[药物相似性|结构相似性]]。该方法面向真实[[先导化合物优化]]中“改哪些、保哪些”的需求，而不是默认所有性质同时提升。它支持 specialist 与 generalist 两类模型，用于固定属性组合和跨属性组合泛化。

## 关键点

- 将[[可控多属性多目标优化|可控多属性多目标分子优化]]（[[C-MuMO]]）表示为 [[SMILES]]-to-SMILES 的指令跟随任务。
- 通过自然语言显式指定每个属性是需要 improve 还是 keep，从而实现属性级控制。
- 使用阈值驱动机制：对需要改进的属性设定最小改善幅度，对已达标属性要求保持在允许变化范围内。
- 基于 C-[[MuMOInstruct]] 构建训练数据，覆盖 10 个药物相关性质、28,266 个优化任务和 256,185 个分子对。
- 训练得到 [[分子优化基础模型|GeLLM4O-Cs]] 系列模型，包含针对单一属性组合的 specialist，以及可跨任务泛化的 generalist。
- 论文结果显示该方法在 IND 和 OOD 任务上均优于通用 [[Large Language Model|LLM]] 和化学基础 LLM，且对未见指令具有较好泛化能力。

## 别名

- C-MuMO
- C-MuMOInstruct
- GeLLM4O-Cs
- 可控多属性多目标分子优化
- instruction-tuned molecular optimization

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
