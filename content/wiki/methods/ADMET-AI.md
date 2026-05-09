---
type: "method"
status: "enriched"
category: "其他"
domain: "药物发现中的ADMET预测与优化"
background: "included"
---
# ADMET-AI

## 标准定义

[[ADMET]]-AI 通常指利用机器学习、深度学习或[[深度生成模型|生成式模型]]，对 [[ADMET]]（吸收、分布、代谢、排泄、毒性）相关性质进行预测、筛选、解释或约束优化的一类方法。它既可以是单一性质的[[性质预测]]器，也可以嵌入 [[多目标优化]]、[[分子生成]]与闭环设计流程中，用来提升候选分子的药物[[developability|可开发性]]。

## 在本知识库中的用法

在当前知识库上下文中，没有看到对 [[ADME]]T-AI 这一方法名的专门定义；仅能看出 ADMET/[[细胞膜通透性|细胞通透性]]等性质会作为[[荧光分子设计]]与[[Lead Optimization|先导优化]]中的附加约束，和其他目标一起进入多目标设计流程。关于 ADMET-AI 的具体算法形态、训练数据和评估方式，待从更多论文中补充。

## 关键点

- 标准上，ADMET-AI 是围绕 [[性质预测]]、虚拟筛选和结构优化展开的 AI 方法集合，目标是降低候选分子的药物开发风险。
- 它常与生成模型、强化学习或 [[多目标优化]] 结合，把可接受的 ADMET 约束直接纳入[[分子设计]]过程。
- 在本知识库现有上下文里，ADMET 更像是一个设计约束而不是独立算法：例如荧光分子优化中会同时考虑 ADMET / 细胞通透性等性质。
- 当前证据不足以说明某个具体名为 ADMET-AI 的统一框架，待从更多论文中补充。
- 若用于实际应用，ADMET-AI 既可服务于早期虚拟筛选，也可服务于先导化合物的多属性改造。

## 别名

- ADMET AI
- ADMET 预测
- ADMET 优化
- ADMET 机器学习

## 外部背景

- ADMET 是药物发现中的经典缩写，通常指 Absorption, Distribution, Metabolism, Excretion, Toxicity。
- 常见 ADMET-AI 任务包括分类（如是否有毒）和回归（如清除率、渗透性、溶解度）两类，待核对经典来源。
- ADMET 预测常被视为 QSAR / 分子性质预测 的应用分支，后来也扩展到生成式分子设计中的约束项。
- 在真实药物优化中，ADMET 指标往往与活性指标存在 trade-off，因此经常需要多目标权衡。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
