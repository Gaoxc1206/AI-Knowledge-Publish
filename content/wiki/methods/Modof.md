---
type: "method"
status: "enriched"
category: "优化方法"
domain: "可控多属性多目标分子优化"
---
# Modof

## 定义

Modof 指代一种面向[[可控多属性多目标优化|可控多属性多目标分子优化]]的[[Instruction Tuning|指令微调]]方法框架，其核心是把[[分子优化]]重构为“按[[属性特异性目标|属性级目标]]进行修改”的 [[SMILES]]-to-SMILES 任务。该方法通过自然语言指令显式指定哪些性质需要提升、哪些性质需要保持，并结合属性阈值和分子对学习结构修改与性质变化之间的关系。论文中对应的实现是基于 [[C-MuMOInstruct]] 数据集训练的 [[分子优化基础模型|GeLLM4O-Cs]] 系列模型。它适用于需要在多种药物相关性质之间做选择性权衡的[[先导化合物优化]]场景。

## 关键点

- 将[[多属性分子优化]]定义为 [[C-MuMO|controllable multi-property, multi-objective optimization]]（[[C-MuMO]]），强调“选择性提升 + 保持已达标性质”。
- 通过自然语言指令明确每个属性的目标，包括 improve 和 keep 两类属性级控制。
- 使用带约束的 molecule pairs 进行训练，要求优化结果满足[[药物相似性|结构相似性]]、属性改进和属性稳定等条件。
- 结合属性阈值 Θ_p 与最小改进幅度 Δ_p，实现阈值驱动的优化目标设定。
- 训练得到 specialist 与 generalist 两类 [[Large Language Model|LLM]]，其中 generalist 具备对未见属性组合和未见指令表达的 [[0-shot 泛化]]能力。

## 别名

- C-MuMO
- controllable multi-property, multi-objective optimization
- GeLLM4O-Cs

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
