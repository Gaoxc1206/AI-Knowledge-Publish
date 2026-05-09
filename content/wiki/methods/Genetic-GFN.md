---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# Genetic-GFN

## 定义

Genetic-[[Generative Flow Network|GFN]] 在给定笔记中仅作为[[多目标分子优化]]的对比基线被提及。上下文没有提供其完整方法细节、模型结构或训练方式，只能确认它参与了[[分子优化]]实验比较。其在 random initial 设置下的 Top1 F 为 4.157，低于 [[MOLLM]]。待从更多论文中补充。

## 关键点

- 在 MO[[Large Language Model|LLM]] 论文中作为多目标分子优化基线方法出现。
- 上下文仅给出实验对比结果，未说明其具体算法机制。
- 在 random initial 设置下，Top1 F 记录为 4.157。
- 从对比结果看，其性能低于 MOLLM。
- 关于其与 GFN 的关系、遗传操作细节和选择策略，当前笔记证据不足。

## 别名

- Genetic GFN

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
