---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "大语言模型与分子多目标优化"
background: "included"
---
# In-context Learning

## 标准定义

In-context Learning（ICL）指模型在不更新参数的前提下，仅通过输入中的任务说明、示例和上下文信息，临时适应当前任务的能力。它通常依赖 [[Prompt Engineering]] 来组织提示，并常见于 [[Large Language Model]] 的 few-shot 或零样本设置中：模型从上下文中推断输出模式、约束和目标，而不是通过梯度训练获得新知识。

## 在本知识库中的用法

在本知识库所对应论文中，ICL 主要体现为：把父代分子的 [[SMILES]]、各目标的数值、目标描述、输出格式要求，必要时再加历史经验，放入 prompt 中，让 LLM 根据这些上下文直接生成子代分子。它不是独立训练的模块，而是 [[MOLLM]] 用来把专家知识、当前种群状态和优化目标临时注入生成过程的方式，服务于分子[[多目标优化]]与遗传操作中的 crossover / mutation。

## 关键点

- ICL 的核心是“通过上下文临时学习”，不需要对模型参数做额外训练或微调。
- 在 MOLLM 中，ICL 主要用于把父代分子及其目标分数写入 prompt，使 LLM 依据当前优化状态生成更合适的子代。
- 该论文中的 ICL 与 [[遗传算法|Genetic Algorithm]] 结合，充当 crossover 和 mutation 的生成依据，而不是单独的生成模型。
- 上下文不仅包含分子结构，还包含多目标要求、目标值、输出约束和可选经验，体现了面向任务的提示编排。
- 这种用法的目标是让 LLM 在分子多目标优化中直接调用已有化学知识，减少额外训练与外部操作器依赖。

## 别名

- ICL
- in-context learning
- 上下文学习
- 上下文内学习
- few-shot prompting

## 外部背景

- ICL 是 [[Large Language Model]] 的典型能力之一，常见于 zero-shot / few-shot prompting 场景，待核对经典来源。
- ICL 与 few-shot learning 相近，但通常强调“在推理时依赖上下文”而非参数更新，待核对经典来源。
- 在生成任务中，ICL 常通过示例对齐格式、风格和约束，帮助模型输出更符合任务要求的结果。
- 在化学与分子设计任务里，ICL 可把结构、性质、约束和操作示例一起放入提示中，作为条件生成的外部控制信号。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
