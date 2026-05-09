---
type: "concept"
status: "enriched"
category: "分子性质"
domain: "多属性多目标分子优化"
background: "included"
---
# BBBP

## 标准定义

BBBP（Blood-Brain Barrier Permeability）指分子穿过血脑屏障的能力，是[[drug discovery|药物研发]]中的重要理化/药理性质。通常可被建模为二分类标签（可穿透/不可穿透）或连续打分；在 CNS 药物设计中，较高 BBBP 往往更有利于候选分子到达中枢神经系统。其大小通常与分子极性、[[lipophilicity|脂溶性]]、氢键供受体数量、拓扑极性表面积等因素相关。

## 在本知识库中的用法

在本知识库的上下文中，BBBP 主要作为多属性/[[多目标分子优化]]中的一个优化目标使用：一方面在 [[MOLLM]] 的 6 目标扩展实验中被加入目标集合，并且作者报告生成的 top 100 分子集合全部达到 BBB+；另一方面在 [[分子优化基础模型|GeLLM4O-Cs]] 的案例中，BBBP 被明确设定为需要提升的属性，同时配合 [[AMP]]、[[MUT]]、[[PlogP]] 等属性的保持约束，用于展示“选择性提升某一属性”的可控优化能力。

## 关键点

- BBBP 表示分子跨越 [[血脑屏障]] 的能力，属于典型的药物相关性质。
- 在 [[多属性多目标优化]] 中，BBBP 常作为需要显式提升的目标，尤其适用于 CNS 相关候选[[分子设计]]。
- 在本知识库中，BBBP 既出现在 MOLLM 的多目标打分与 [[Pareto front]] 选择流程中，也出现在 [[GeLLM4O-C]]s 的属性级指令优化任务中。
- BBBP 与分子极性、脂溶性和结构修饰策略相关，常与其他性质存在权衡。
- 当任务设定要求“提升 BBBP、保持其他已达标属性”时，BBBP 更接近可控优化目标，而不只是静态性质标签。

## 别名

- Blood-Brain Barrier Permeability
- BBB permeability
- BBB permeability prediction
- BBB+
- 血脑屏障通透性

## 外部背景

- BBBP 常见于分子性质预测基准中，既可作为分类任务也可作为回归/打分任务；待核对经典来源。
- 对于 CNS 药物，BBBP 通常越高越好；但并非所有药物都需要高 BBBP，具体取决于治疗靶点是否在中枢神经系统。
- BBBP 与分子量、cLogP、TPSA、HBD/HBA 等性质通常存在相关性，常被用作结构优化时的间接设计约束。
- 在分子生成与优化文献中，BBBP 往往与 [[QED]]、[[PlogP]]、[[hERG]] 等性质共同作为多目标权衡对象。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
