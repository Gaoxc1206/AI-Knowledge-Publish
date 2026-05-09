---
type: "method"
status: "enriched"
category: "优化方法"
domain: "小分子优化"
---
# REINVENT

## 定义

REINVENT 是文中提到的一种基于[[强化学习]]的[[分子优化]]方法，属于较早的[[分子设计]]/[[分子生成]]基线之一。给定上下文只表明它被用于[[小分子优化]]相关基准比较，并未提供更详细的算法机制。其具体实现细节待从更多论文中补充。

## 关键点

- 属于强化学习类的分子优化方法，在相关工作中常被作为基线方法出现。
- 在 [[PMO benchmark]] 的 23 个任务总和指标上，REINVENT 的 [[Top-10 AUC]] 为 14.196。
- 在文中 docking 多性质优化实验里，REINVENT 的 [[generative yield]] 和 [[oracle burden]] 表现整体低于 Chemlactica 系列方法。
- 在 [[QED]] + 相似性约束优化实验中，REINVENT 也作为对比方法之一被引用，但上下文未给出其具体数值。
- 关于其内部策略、奖励设计或训练流程，当前上下文不足，待从更多论文中补充。

## 别名

- Reinvent
- REINVENT (RL)
- reinvent

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
