---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# MolLeo

## 定义

MolLeo（上下文中更常见写法为 MOLLEO）是一种用于[[分子优化]]的 [[Large Language Model|LLM]] 辅助方法。根据给定论文笔记，它通过[[大语言模型]]参与分子优化过程，但仍依赖 [[GB-GA]] 作为框架中的操作算子，因此并不是完全由 LLM 独立完成搜索。现有笔记中对其多目标实验和 prompt 设计的描述较为初步，细节待从更多论文中补充。

## 关键点

- 在分子优化中引入 LLM 辅助搜索，但仍保留 GB-GA 等传统遗传式操作框架。
- 可用于[[多目标分子优化]]，但上下文指出其多目标实验与 prompt 研究还不够成熟。
- 在相关对比实验中，[[MOLLM]] 在多目标性能上优于 MOLLEO。
- 作者认为初始种群会显著影响这类遗传式优化方法的表现，而 MOLLEO 相关研究对这一因素控制不充分。
- 关于 MolLeo 的独立方法细节，待从更多论文中补充。

## 别名

- MOLLEO
- LLM辅助分子优化

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
