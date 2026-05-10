---
type: "model"
status: "enriched"
category: "基础模型"
domain: "大语言模型与分子优化"
background: "included"
---
# Mistral

## 标准定义

Mistral 通常指 Mistral AI 发布的一类开放权重[[大语言模型]]家族，属于以自回归生成为核心的 [[基础模型]]，常用于通用文本生成、[[指令微调]] 和各类下游任务适配。作为背景知识，它更强调通用语言建模能力，而不是某个特定化学任务本身。

## 在本知识库中的用法

在本知识库所对应论文中，Mistral 作为[[分子优化]]任务的 [[大语言模型|LLM]] 底座，被用于构建 [[GeLLM4O-C]] 的多个变体，如 [[GeLLM4O-C|GeLLM4O-C-P(10)]]_Mistral、[[GeLLM4O-C]]-N_Mistral，也作为基线模型 [[LlaSMol]]_Mistral 的核心骨干。论文用它来验证：经过 [[C-MuMOInstruct]] [[Instruction Tuning|指令微调]]后，Mistral 能更好执行可控多属性、多目标分子优化，并在 IND 与 OOD 任务上取得显著提升。

## 关键点

- Mistral 在标准意义上是通用 [[基础模型]]，可通过 [[指令微调]] 适配到特定任务。
- 在该论文中，它被当作分子优化的语言模型底座，用于生成和改写分子相关指令输出。
- 论文中的 Mistral 变体包括 [[GeLLM4O-C|GeLLM]]4O-C 的 specialist/generalist 版本，以及基线 LlaSMol_Mistral。
- 基于 Mistral 的 GeLLM4O-C 在 IND 与 OOD 上都表现强于通用 LLM 和化学基础 LLM 基线。
- Mistral 的作用不是定义任务本身，而是承载对多属性目标、属性保持与结构修改规则的学习。

## 别名

- Mistral AI
- Mistral 7B
- Mistral-7B

## 外部背景

- Mistral AI 的模型家族通常采用 decoder-only Transformer 架构，适合生成式任务，待核对经典来源。
- Mistral 系列常被视为高效的开放权重通用模型，可作为多种领域适配的起点，待核对经典来源。
- 在很多化学语言模型工作中，Mistral 会被用作通用文本到分子任务的 backbone，而不是专门的分子预训练模型。
- Mistral 家族后续也出现了 MoE 等变体，如 Mixtral，待核对经典来源。

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
