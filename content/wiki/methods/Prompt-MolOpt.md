---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多属性多目标分子优化"
---
# Prompt-MolOpt

## 定义

一种以自然语言 prompt/指令来控制分子结构修改的优化方法范式，可将[[分子优化]]表示为 [[SMILES]]-to-SMILES 的指令跟随任务。其核心是按[[属性特异性目标|属性级目标]]选择性提升某些性质，同时保持已达标性质与[[药物相似性|结构相似性]]。就该节点的精确定义而言，待从更多论文中补充。

## 关键点

- 通过自然语言指令显式指定每个属性是需要 improve 还是 keep unchanged。
- 用药物相关阈值和最小改进幅度来约束优化目标，而不是要求所有性质同时提升。
- 基于满足结构相似性与属性约束的 molecule pairs 进行监督学习，学习从输入分子到优化后分子的修改模式。
- 可结合 specialist 与 generalist 训练策略：前者面向固定属性组合，后者面向多种属性组合与指令表达。
- 在该论文中，这一思路对应于 [[C-MuMOInstruct]] 数据集与 [[分子优化基础模型|GeLLM4O-Cs]] 的[[Instruction Tuning|指令微调]]框架。

## 别名

- 提示词驱动分子优化
- 指令驱动分子优化
- prompt-based molecular optimization
- 自然语言分子优化

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
