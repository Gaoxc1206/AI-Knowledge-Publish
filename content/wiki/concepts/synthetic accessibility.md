---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子设计"
background: "included"
---
# synthetic accessibility

## 标准定义

synthetic accessibility（[[Synthesizability|可合成性]]）指一个分子被实验化学方法实际合成出来的难易程度，通常反映结构复杂度、官能团兼容性、环系与手性中心数量、可获得砌块匹配度等因素。它既可以作为分子性质评价指标，也可以作为生成与优化任务中的约束或目标，用来避免模型产生“性质很好但难以合成”的候选分子。

## 在本知识库中的用法

在这篇论文里，synthetic accessibility 被当作[[多目标分子设计]]中的一个优化目标/性质之一，与 binding energy、toxicity、EC50、[[QED]] 等并列，用于构造目标向量并评估生成分子是否落入指定的 [[focus region]]。论文的核心重点不在于重新定义该指标本身，而是把它纳入 [[goal-conditioning|goal-conditioned]] [[GFlowNet]] 的[[目标空间]]中，作为控制[[分子生成]]方向的一部分；关于其具体计算方式与阈值设定，待从更多论文中补充。

## 关键点

- 它表示分子在现实化学实验中被合成出来的难易程度，属于面向[[药物发现]]的实用性指标。
- 在本知识库对应论文中，synthetic accessibility 只是多目标向量中的一个分量，并未展开成独立方法或独立评分体系。
- 论文将其与 [[binding energy]]、[[toxicity]]、[[QED]] 等性质一起纳入 [[多目标分子设计]]，用于描述目标空间中的 trade-off。
- 在 goal-conditioned GFlowNet 框架下，这类性质不是简单做加权和，而是共同决定分子是否进入指定的[[focus region|目标区域]]。
- 它强调“可实现性”而不仅是“性质最优”，因此常用于筛除不可合成或代价过高的候选分子。

## 别名

- SA
- synthetic accessibility score
- 可合成性
- 合成可及性

## 外部背景

- 常见做法是用经验打分函数近似 synthetic accessibility，例如基于片段贡献、结构复杂度和环系统惩罚项的启发式评分；待核对经典来源。
- 在药物发现中，它经常与 [[drug-likeness]]、活性和选择性一起作为多目标优化的一部分；待核对经典来源。
- 与“可合成性”相关的更强概念还包括 retrosynthetic accessibility（逆合成可达性），但两者不完全相同；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
