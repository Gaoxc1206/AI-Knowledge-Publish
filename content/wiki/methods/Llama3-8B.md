---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子优化"
---
# Llama3-8B

## 定义

Llama3-8B 在该论文上下文中作为 [[MOLLM]] 的[[大语言模型]]骨干，用于[[分子优化]]过程中的候选[[分子生成]]。它通过提示词接收父代分子的 [[SMILES]]、性质值与多目标要求，直接执行 [[crossover]] 和 [[mutation]] 等遗传式操作。论文主要报告的是它在 MO[[Large Language Model|LLM]] 框架中的用法和效果，而非该模型本身的独立细节；模型本体信息待从更多论文中补充。

## 关键点

- 作为 MOLLM 的 LLM backbone，用于生成分子优化中的 offspring。
- 通过 prompt 注入多目标要求、目标描述、父代性质值等信息。
- 在框架中承担 crossover 与 mutation 两类遗传操作。
- 与 [[F-value selection]] 和 [[Pareto front selection]] 配合完成多目标筛选。
- 上下文未提供 Llama3-8B 的训练细节、参数规模以外信息，待从更多论文中补充。

## 别名

- Llama 3 8B

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
