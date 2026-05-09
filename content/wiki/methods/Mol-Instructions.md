---
type: "method"
status: "enriched"
category: "优化方法"
domain: "可控多属性多目标分子优化"
---
# Mol-Instructions

## 定义

Mol-Instructions 可概括为一种将[[分子优化]]任务表述为自然语言指令跟随的[[Instruction Tuning|指令微调]]方法。它围绕[[属性特异性目标|属性级目标]]，把“提升某些性质、保持某些性质”编码成 [[SMILES]]-to-SMILES 的生成任务，从而支持[[可控多属性多目标优化|可控多属性多目标分子优化]]。相关论文中，该思路主要体现在 [[C-MuMOInstruct]] 数据集与基于其训练的 [[分子优化基础模型|GeLLM4O-Cs]] 系列模型上。

## 关键点

- 将分子优化重构为可由自然语言指令控制的属性级目标优化问题。
- 支持对不同属性分别指定 improve 或 keep unchanged，而不是默认所有性质都同时提升。
- 通过药物相关阈值和最小改进幅度来构造优化目标。
- 以成对分子样本学习结构修改与属性变化之间的关系，同时尽量保持分子[[药物相似性|结构相似性]]。
- 可训练 specialist 模型与 generalist 模型，其中 generalist 具备更强的跨任务和 [[OOD 泛化]]能力。
- 论文中该方法在 IND 与 OOD 任务上整体优于通用 [[Large Language Model|LLM]] 和化学基础 LLM。

## 别名

- C-MuMOInstruct
- GeLLM4O-Cs
- controllable multi-property, multi-objective optimization
- C-MuMO

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
