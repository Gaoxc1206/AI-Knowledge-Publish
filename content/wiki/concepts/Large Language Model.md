---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "多目标分子优化"
background: "included"
---
# Large Language Model

## 标准定义

Large Language Model（[[大语言模型|LLM]]）是基于大规模文本语料预训练的通用[[大语言模型|语言模型]]，通常以 [[Transformer]] 为基础，通过自回归或其他生成目标学习语言分布，并可借助 [[in-context learning]]、[[prompt engineering]] 在少样本或零样本条件下适配下游任务。作为背景知识，LLM 不仅能生成自然语言，也可在结构化提示下生成代码、步骤、候选方案或领域对象。

## 在本知识库中的用法

在这篇论文相关知识中，LLM 被直接用作[[多目标分子设计]]里的“遗传算子”：根据父代分子的 [[SMILES]]、目标值和归一化 F-value，通过提示词执行 [[crossover]] 与 [[mutation]] 生成子代分子，而不是额外训练新的[[分子生成模型]]。它还被用于结合多目标需求、父代性质信息和输出约束进行 in-context 推理，并配合 [[Pareto front]] selection 与 [[F-value selection]] 完成下一代筛选。论文主实验中不使用 [[ExpeL|experience pool]]，认为可能削弱探索能力。

## 关键点

- LLM 的标准含义是通用预训练语言模型；这里的关键不在“聊天”，而在其可通过 [[prompt engineering]] 直接承担生成与决策角色。
- 在 [[MOLLM]] 中，LLM 被当作分子优化的操作器，负责 crossover 与 mutation，因此它在本库中的角色更接近“可编程生成器”而非单纯文本模型。
- 论文显式利用父代分子性质与目标描述做 [[in-context learning]]，让模型在提示中感知多目标权衡，而不是重新训练任务特定模型。
- LLM 的输出随后要经过分子性质打分与 [[Pareto front]] / F-value 选择，说明模型生成与多目标选择是分离的两个环节。
- 该用法强调样本效率和少调用预算下的优化效果，体现了 LLM 在科学优化任务中的代理化、工具化用法。

## 别名

- 大语言模型
- 大型语言模型
- LLM

## 外部背景

- LLM 通常由海量语料预训练获得通用语言建模能力，可在不同任务间迁移。
- 常见能力包括文本生成、改写、总结、问答、代码生成与结构化信息抽取。
- 在科学与工程场景中，LLM 常被用作生成器、候选提议器、分析助手或规则执行器。
- 待核对经典来源：LLM 的具体定义边界会随“基础模型”“对齐模型”“聊天模型”等术语演化而变化。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
