---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "大语言模型微调与多属性分子优化"
background: "included"
---
# LoRA

## 标准定义

LoRA（Low-Rank Adaptation）是一种[[参数高效微调]]方法：在保持预训练模型主体参数基本冻结的前提下，只为部分线性层学习低秩增量矩阵，从而近似原始权重更新。它通常用于[[语言模型微调]]、[[指令微调]]等场景，以显著降低显存与训练成本；在推理时也可将低秩更新合并回主权重。

## 在本知识库中的用法

在给定论文中，LoRA 被用于微调基座模型 [[Mistral-7B-Instruct|Mistral-7B-Instruct-v0.3]] 和 [[Llama3.1-8B-Instruct]]，以训练 [[分子优化基础模型|GeLLM4O-Cs]] 系列模型。论文明确说明 LoRA 应用于每个 projection layer 和 language modeling head，用于支持 [[C-MuMOInstruct]] 上的多属性、[[多目标分子优化]]指令学习。

## 关键点

- LoRA 的核心是用低秩分解近似权重更新，避免对整个模型做全参数训练。
- 它通常与[[预训练模型]]配合使用，适合在大模型上做参数高效适配。
- 在本知识库里，LoRA 主要承担把通用 [[Large Language Model|LLM]] 适配到化学[[分子优化]]任务的作用。
- 论文采用 LoRA 对每个 projection layer 和 language modeling head 进行微调，以增强[[属性特异性目标|属性级目标]]控制能力。
- 相比全参微调，LoRA 更适合多任务指令数据集上的快速实验与资源受限训练。

## 别名

- Low-Rank Adaptation
- 低秩适配
- 低秩微调
- LoRA

## 外部背景

- LoRA 最初作为对 Transformer 等大模型进行参数高效适配的通用方法提出，常见做法是在注意力或前馈层上注入低秩更新。
- 常见变体包括对不同模块选择性注入 LoRA，以及与量化结合的 QLoRA；待核对经典来源。
- LoRA 的一个实用优点是可将适配后的低秩参数单独存储，便于在不同任务之间切换。
- 在生成模型与对齐训练中，LoRA 常被用来降低显存占用并加快实验迭代。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
