---
type: "model"
status: "enriched"
category: "基础模型"
domain: "通用大语言模型"
background: "included"
---
# Claude

## 标准定义

Claude 是 Anthropic 推出的对话式[[大语言模型]]系列，通常面向通用问答、文本生成、推理与工具使用场景；其常见特点包括较强的指令遵循、长上下文处理能力和安全[[大语言模型对齐|对齐]]。

## 在本知识库中的用法

待从更多论文中补充

## 关键点

- Claude 属于通用[[基础模型]]，可作为下游任务的通用生成与推理底座。
- 在药物设计等研究中，它通常会被当作未经领域微调的通用 [[大语言模型|LLM]] baseline，与化学专用模型或[[指令微调]]模型对比。
- 与领域模型相比，Claude 更强调自然语言理解和指令跟随，但对专业化学知识与分子结构约束的掌握通常需要额外任务适配。
- 如果后续论文直接使用 Claude 进行[[分子优化]]、问答或方案生成，应记录具体版本、提示词和是否经过领域微调。

## 别名

- Anthropic Claude
- Claude AI
- Claude 模型
- Claude LLM

## 外部背景

- Claude 是 Anthropic 的对话式 LLM 系列，常见版本包括 Claude 1/2/3/3.5；待核对经典来源。
- Claude 相关工作通常强调 Constitutional AI、长上下文与较强的安全对齐；待核对经典来源。
- 在科研基准中，Claude 常被放在通用 LLM baseline 位置，用于衡量领域模型或专门微调方法的增益。

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
