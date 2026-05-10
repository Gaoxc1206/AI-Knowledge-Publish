---
type: "model"
status: "enriched"
category: "基础模型"
domain: "大语言模型"
background: "included"
---
# Llama

## 标准定义

Llama（[[大语言模型|Large Language Model]] Meta AI）是 Meta 提出的开源权重 [[基础模型]] 家族，通常采用 decoder-only Transformer 架构，面向通用文本理解、生成与推理等任务。作为通用大模型，它常被用作预训练底座，并进一步通过 [[指令微调]]、[[RLHF]] 或领域适配，迁移到医学、化学、代码与科学问答等下游场景。

## 在本知识库中的用法

在本知识库给定上下文中，Llama 主要作为可迁移的通用[[大语言模型]]底座出现：一方面，[[C-MuMOInstruct]] / [[GeLLM4O-C]] 论文将 Llama 系列作为化学领域[[分子优化]]模型的训练与评测骨干之一；另一方面，[[PAreto Multi-Objective Alignment|PAMA]] 论文在多目标[[大语言模型对齐|对齐]]实验中评估了 LLaMA-2 7B 的多目标 [[大语言模型对齐|RLHF 对齐]]表现；此外，[[MOLLM]] 论文的消融实验也使用了 Llama3-8B 作为对照。整体上，本库中 Llama 的用法是“通用基础模型 + 面向 [[多目标优化]] / [[分子优化]] 的适配对象”，而不是专门为化学预训练的模型。

## 关键点

- Llama 是通用 [[基础模型]]，在本库语境中主要充当化学与对齐任务的可迁移底座，而非专用化学模型。
- 在分子优化场景中，Llama 系列可通过 [[指令微调]] 学习执行属性级控制，例如在 C-[[MuMOInstruct]] 上训练 GeLLM4O-C。
- 在多目标对齐场景中，LLaMA-2 7B 被用于验证 LLM 在多个冲突目标上的联合优化能力。
- MOLLM 的实验表明，Llama3-8B 也可作为分子设计优化框架中的通用生成器/操作器候选。
- 本库中 Llama 的角色更多是“方法载体”和“对照基线”，具体性能取决于是否经过领域适配。

## 别名

- LLaMA
- Meta Llama
- Llama model
- Llama 2
- Llama 3

## 外部背景

- LLaMA 系列通常指 Meta 发布的开源权重大语言模型家族，覆盖多个参数规模与版本迭代。
- Llama 类模型一般采用 decoder-only Transformer，并适合继续预训练、监督微调与对齐训练。
- Llama 2、Llama 3 等版本在开放权重、上下文长度、推理能力与生态支持上逐步增强。
- 待核对经典来源

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
