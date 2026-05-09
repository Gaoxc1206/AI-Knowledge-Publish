---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多属性多目标分子优化"
---
# Llama3.1-8B-Instruct

## 定义

Llama3.1-8B-Instruct 是论文中用于构建 [[分子优化基础模型|GeLLM4O-Cs]] 的基础指令模型之一。作者在 [[C-MuMOInstruct]] 数据集上对其进行 [[LoRA]] 微调，使其能够根据自然语言指令执行[[可控多属性多目标优化|可控多属性多目标分子优化]]。就当前上下文而言，它主要体现为一个用于[[分子优化]]任务的 backbone [[Large Language Model|LLM]]，更多模型细节待从更多论文中补充。

## 关键点

- 作为 [[GeLLM4O-C]]s 系列的 backbone 之一，与 [[Mistral-7B-Instruct|Mistral-7B-Instruct-v0.3]] 并列使用。
- 在 C-[[MuMOInstruct]] 上进行[[Instruction Tuning|指令微调]]，用于学习[[属性特异性目标|属性级目标]]控制的分子优化。
- 微调方法采用 LoRA，并应用于每个 projection layer 和 language modeling head。
- 支持 0-shot 评估场景下对未见过属性组合和未见过 instruction 表达的泛化测试。
- 论文提到 [[GeLLM4O-C|GeLLM4O-C-P(10)]]Llama 在 unseen instructions 上比对应的 Mistral 版本更稳健。

## 别名

- Llama 3.1 8B Instruct
- Meta Llama 3.1 8B Instruct
- Llama3.1-8B

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
