---
type: "method"
status: "enriched"
category: "优化方法"
domain: "可控多属性多目标分子优化"
---
# GeLLM4O-C

## 定义

Ge[[Large Language Model|LLM]]4O-C 是论文中基于 [[C-MuMOInstruct]] [[Instruction Tuning|指令微调]]得到的一类[[大语言模型]]方法，用于[[可控多属性多目标优化|可控多属性多目标分子优化]]。它把[[分子优化]]建模为 [[SMILES]] 到 SMILES 的指令跟随任务，支持对不同属性分别指定“改进”或“保持”的目标。该方法既包含面向特定属性组合的 specialist 版本，也包含可泛化到未见属性组合的 generalist 版本。该名称下的模型主要依赖自然语言指令、属性阈值和分子对学习来生成更符合约束的候选分子。

## 关键点

- 面向 [[C-MuMO|controllable multi-property, multi-objective optimization]]（[[C-MuMO]]）问题，不再假设所有性质都要同时提升。
- 核心是[[属性特异性目标|属性级目标]]控制：对某些 sub-optimal properties 进行改进，对 near-optimal properties 尽量保持稳定。
- 基于 C-[[MuMOInstruct]] 指令微调数据集训练，使用多样自然语言模板描述每个属性的优化目标。
- 包含 specialist 与 generalist 两类训练方式：前者针对单一属性组合，后者[[多任务学习|联合学习]]多种属性组合并支持 [[0-shot 泛化]]。
- 论文中使用 [[LoRA]] 微调 [[Mistral-7B-Instruct|Mistral-7B-Instruct-v0.3]] 和 [[Llama3.1-8B-Instruct]] 作为 backbone。
- 在 IND 与 OOD 任务上整体优于通用 LLM 和化学基础 LLM，且对 unseen instructions 具有一定泛化能力。

## 别名

- GeLLM4O-Cs
- GeLLM4O-C-N
- GeLLM4O-C-P(N)
- GeLLM4O-C-P(10)

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
