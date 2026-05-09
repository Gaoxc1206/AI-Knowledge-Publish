---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子优化"
---
# GPT-4o

## 定义

在给定上下文中，GPT-4o 被作为[[分子优化]]实验里的[[大语言模型]]方案出现，主要用于直接提出候选分子，并与 [[MOLLM]] 等方法进行对比。上下文仅明确了它在“GPT-4o direct propose”设置中的角色，未提供其是否针对分子任务额外训练的证据。就当前笔记而言，它体现为一种通用大模型参与[[分子生成]]/提议的基线方式，具体实现细节待从更多论文中补充。

## 关键点

- 在 MO[[Large Language Model|LLM]] 论文的对比实验中，以“GPT-4o direct propose”的形式出现。
- 其作用是直接生成候选分子，用于与基于 [[Llama3-8B]] 的 MOLLM 设置比较。
- 上下文没有给出 GPT-4o 的详细提示模板、微调方式或生成策略，待从更多论文中补充。
- 上下文没有完整展示 GPT-4o 的实验结果数值，待从更多论文中补充。

## 别名

- GPT-4 Omni
- OpenAI GPT-4o
- GPT-4o direct propose

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
