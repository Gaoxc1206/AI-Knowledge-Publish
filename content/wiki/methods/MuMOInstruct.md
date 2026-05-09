---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多属性多目标分子优化"
---
# MuMOInstruct

## 定义

MuMOInstruct 是上下文中提到的一个用于多属性[[多目标分子优化]]的[[Instruction Tuning|指令微调]]方法/前作，核心是把[[分子优化]]任务表述为自然语言指令驱动的生成问题。根据给定上下文，它主要面向“所有属性同时提升”的优化设定，而不是属性级的选择性控制。后续工作认为它在表达“提升 A、保持 B、降低 C”这类真实药物优化需求上存在局限。

## 关键点

- 作为前作被提及，属于 instruction-tuned [[Large Language Model|LLM]] 的分子优化方法。
- 主要处理[[multi-property optimization|多属性优化]]，但倾向于让所有属性同时提升。
- 对[[属性特异性目标|属性级目标]]控制能力有限，难以直接表达“提升某些性质、保持另一些性质”的需求。
- 后续的 [[C-MuMOInstruct]] / [[分子优化基础模型|GeLLM4O-Cs]] 将这一思路扩展为更可控的属性级优化。
- 具体数据构造、规模和模型细节在当前上下文中未给出，待从更多论文中补充。

## 别名

- GeLLM^3O

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
