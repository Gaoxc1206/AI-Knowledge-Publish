---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# MOLLM

## 定义

MO[[Large Language Model|LLM]] 是一种不需要额外训练的[[多目标分子优化]]方法，直接把[[大语言模型]]用作[[分子设计]]中的[[crossover|交叉]]与[[mutation|变异算子]]。它通过精心设计的 prompt、[[in-context learning]]、[[Pareto front selection]] 和 [[F-value selection]]，在有限 [[黑盒 oracle|oracle]] 调用预算下优化多个分子性质。作者主张利用预训练 LLM 中已有的化学知识来完成分子搜索，而不是为每组目标重新训练生成模型。

## 关键点

- 将 LLM 直接作为分子遗传优化中的 [[crossover]] 和 [[mutation]] 操作器，不依赖传统图编辑算子或额外训练。
- prompt 模块包含多目标要求、目标描述、父代分子性质、输出指令等，用于引导 LLM 生成子代分子。
- 通过 F-value selection 与 [[Pareto front]] selection 进行多目标筛选，强调 selection 对最终性能的重要性。
- 作者专门控制并比较不同初始种群（best / worst / random），说明初始分子对遗传式优化结果影响很大。
- 主实验中发现 [[ExpeL|experience pool]] 会削弱探索能力，因此未作为默认配置使用。
- 在 [[PMO benchmark]] 的固定 [[oracle budget]] 下，MOLLM 在多项实验中优于 [[MolLeo|MOLLEO]]、[[GB-GA]] 等基线，并显著减少 LLM 调用与运行时间。

## 别名

- Multi-Objective Large Language Model for Molecular Design
- Optimizing with Experts
- MOLLM: Multi-Objective Large Language Model for Molecular Design – Optimizing with Experts

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
