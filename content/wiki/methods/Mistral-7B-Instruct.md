---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多属性多目标分子优化"
---
# Mistral-7B-Instruct

## 定义

Mistral-7B-Instruct 是论文中用于[[可控多属性多目标优化|可控多属性多目标分子优化]]的指令式[[大语言模型]]骨干之一。该模型在 [[C-MuMOInstruct]] 数据集上结合 [[LoRA]] 进行微调，用于根据自然语言指令将一个输入分子（[[SMILES]]）改写为更符合[[属性特异性目标|属性级目标]]的候选分子。论文将其作为 [[分子优化基础模型|GeLLM4O-Cs]] 系列模型的 backbone，并在 IND 与 OOD 任务中进行评测。其具体通用能力边界与预训练细节，待从更多论文中补充。

## 关键点

- 作为 [[GeLLM4O-C]]s 系列的 backbone 之一，基于[[Instruction Tuning|指令微调]]来学习分子改写任务。
- 微调时使用 LoRA，并将其应用于各个 projection layer 和 language modeling head。
- 输入为自然语言指令加分子 SMILES，输出为优化后的候选分子 SMILES。
- 在实验中采用 0-shot evaluation，并对每个输入分子用 [[Beam Search|beam search]] 生成 20 个候选分子。
- 该模型在 C-[[MuMOInstruct]] 上学习属性级目标：部分性质提升、部分性质保持不变。
- 在论文结果中，[[GeLLM4O-C|GeLLM4O-C-P(10)]]Mistral 在 IND 与 OOD 任务上表现优于多个基线。

## 别名

- Mistral-7B-Instruct-v0.3
- Mistral 7B Instruct
- GeLLM4O-C-P(10)Mistral

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
