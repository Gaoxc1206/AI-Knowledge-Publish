---
type: "model"
status: "enriched"
category: "基础模型"
domain: "可控多属性多目标分子优化"
background: "included"
---
# GeLLM4O-C

## 标准定义

[[GeLLM4O-C|GeLLM]]4O-C 可理解为一种面向 [[large language model]] 的[[分子优化]]模型：通过 [[instruction tuning]] 学习在输入起始分子、目标属性与结构约束的条件下生成优化后的候选分子。其标准用途通常是服务于 [[lead optimization]] 场景，在提升目标性质的同时尽量保持已达标性质和分子骨架相似性。

## 在本知识库中的用法

在本知识库中，Ge[[大语言模型|LLM]]4O-C 指论文《[[大语言模型|Large Language Model]]s for Controllable Multi-property Multi-objective Molecule Optimization》基于 [[C-MuMOInstruct]] 训练得到的可控分子优化模型系列，用于执行属性级别的多属性、多目标分子优化。论文区分 specialist 与 generalist 两类变体：前者针对单一属性组合训练，后者在多种属性组合上联合训练；整体上 generalist 往往更强，尤其在 IND、OOD 以及未见 instruction 上表现更稳健，但部分任务会出现相似性下降以换取更高的优化成功率。

## 关键点

- GeLLM4O-C 的目标不是“所有性质都同时变好”，而是按属性级目标进行可控优化：对需要改进的性质进行提升，对已接近阈值的性质尽量保持稳定。
- 它以 [[C-MuMOInstruct]] 为核心训练数据，把分子对与自然语言指令结合起来，让模型学习“输入分子 → 目标分子”的可控编辑模式。
- 模型家族包含 specialist 和 generalist 两种训练范式：specialist 更偏向特定任务，generalist 则通过多任务联合训练获得更好的泛化能力。
- 论文报告中，GeLLM4O-C 在 IND 与 OOD 任务上整体优于通用 LLM 和化学基础 LLM 基线，但在个别任务上会用更大的结构改动换取更高 SR/RI。
- 该模型面向真实药物设计中的 trade-off 场景，尤其适合需要同时考虑药效、[[ADMET]]、毒性与结构相似性的分子优化问题。

## 别名

- GeLLM
- GeLLM4O-C-P(10)
- GeLLM4O-C-P(N)
- GeLLM4O-C
- GeLLM4O-C系列模型
- Controllable Multi-property Multi-objective Molecule Optimization LLM

## 外部背景

- 待核对经典来源：[[Instruction Tuning|instruction tuning]] 通常指用任务指令形式的数据微调模型，使其更好地按自然语言要求执行下游任务。
- 待核对经典来源：多目标分子优化一般需要在活性、选择性、ADMET、毒性和可合成性之间做权衡，而不是单指标最优。
- 待核对经典来源：OOD 泛化通常指模型在未见过的属性组合、目标设定或提示表达上仍能保持可用性能。
- 待核对经典来源：在[[药物发现]]中，[[分子优化|lead optimization]] 往往强调“在尽量保留核心 scaffold 的前提下改善性质”。

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
