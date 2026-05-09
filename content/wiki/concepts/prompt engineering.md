---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "大语言模型分子设计"
background: "included"
---
# prompt engineering

## 标准定义

Prompt engineering（提示工程）是指通过设计、组织和迭代输入提示，让 [[Large Language Model]] 更稳定地完成指定任务的一类实践方法。常见做法包括任务说明、角色设定、示例演示、约束条件、输出格式要求和推理引导等；其核心是在不修改模型参数的前提下，利用上下文来控制模型行为。

## 在本知识库中的用法

在 [[MOLLM]] 中，prompt engineering 被直接用来把 [[Large Language Model|LLM]] 变成[[分子优化]]中的 [[crossover]] 与 [[mutation]] 算子：prompt 会写入多目标要求、目标描述、父代分子及其性质值、输出指令，以及可选的 past experience。作者特别强调父代的目标值可以作为 [[in-context learning]] 信号，帮助模型理解当前搜索方向；但实验发现 [[experience pool]] 可能降低探索能力，因此主实验中不使用。

## 关键点

- prompt engineering 的核心是通过上下文约束而不是参数更新来塑造模型输出。
- 在该论文中，prompt 的作用不是普通文本生成，而是把 LLM 组织成分子优化算子，直接参与搜索过程。
- MOLLM 的 prompt 需要同时表达多目标要求、父代分子信息和输出格式，以支持[[多目标分子设计]]。
- 仅靠 prompt 本身不足以保证多目标质量，仍需与 [[Pareto front selection]] 和 [[F-value selection]] 配合。
- 经验池属于可选增强，但在本文消融中未带来稳定收益，主实验因此移除。

## 别名

- 提示工程
- 提示词工程
- prompting
- prompt design

## 外部背景

- prompt engineering 常与 zero-shot [[Prompt tuning|prompting]]、few-shot prompting、chain-of-thought 等提示方式一起讨论；待核对经典来源
- 与 fine-tuning 相比，prompt engineering 不改变模型参数，而是通过输入文本临时调控模型行为。
- 在生成式任务中，提示的措辞、示例顺序和输出格式往往会显著影响结果；待核对经典来源

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
