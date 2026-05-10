---
type: "method"
status: "enriched"
category: "优化方法"
domain: "可控多属性分子优化"
background: "included"
---
# Prompt Engineering

## 标准定义

Prompt Engineering（提示工程）是通过设计、改写和组织输入提示/指令，引导[[大语言模型]]完成特定任务的方法。常见做法包括明确任务目标、约束条件、输出格式和示例，必要时配合[[instruction tuning]]，让模型学会对不同表述方式保持稳定响应。

## 在本知识库中的用法

在该论文上下文中，Prompt Engineering 主要用于把[[分子优化]]任务写成自然语言指令：显式表达每个属性是“提升、降低还是保持”，补充阈值要求、结构相似约束和属性组合，并用多种模板描述同一任务。其目的不是单纯提升可读性，而是让模型学会执行属性级可控优化，并对未见指令表达保持鲁棒性。论文中的 [[C-MuMOInstruct]] 就是这种指令设计的载体。

## 关键点

- 这里的 Prompt Engineering 不是泛泛的聊天提示，而是把 [[lead optimization]] 需求转成可学习的 [[自然语言指令]]。
- 指令需要同时编码属性方向、阈值和保持项，例如“提升 A、降低 B、保持 C”，对应 [[threshold-based optimization]]。
- 通过多模板生成同一任务，可以减少模型对单一措辞的过拟合，并增强对未见指令的泛化能力。
- 在该论文中，提示设计服务于 [[instruction tuning]]：先构造 C-[[MuMOInstruct]]，再训练 [[GeLLM4O-C]]。
- 该工作更强调数据与任务定义，Prompt Engineering 在这里体现为指令模板与任务表述设计，而非独立算法模块。

## 别名

- Prompt Engineering
- Prompt Design
- 提示工程
- 提示词工程
- Prompting
- 提示设计
- 指令设计

## 外部背景

- 待核对经典来源：Prompt engineering 通常包括 zero-shot、few-shot、role prompting、chain-of-thought 等常见变体。
- 待核对经典来源：在结构化任务中，好的提示通常要明确输入字段、约束条件和输出格式，以降低歧义。
- 待核对经典来源：在化学与[[分子生成]]场景中，提示常用于编码性质目标、可编辑区域和保留约束。
- 待核对经典来源：提示设计常与[[Instruction Tuning|指令微调]]配套使用，用多样化表述提升模型鲁棒性。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
