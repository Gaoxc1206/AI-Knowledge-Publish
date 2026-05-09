---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# F-value selection

## 标准定义

F-value selection 是一种基于标量 F-value 对候选解进行排序并筛选下一代个体的选择策略。它通常先将多个目标做归一化或聚合，再把多目标比较转化为单一分数比较，因此更接近 fitness-based selection，而不是直接处理[[Pareto dominance|非支配关系]]的 [[Pareto front selection]]。在遗传式搜索中，它常用于在固定预算下快速保留高分候选。

## 在本知识库中的用法

在 [[MOLLM]] 中，F-value selection 用于对当前 parent molecules 与新生成的 offspring 合并后进行筛选，决定下一代分子集合。作者将它与 [[Pareto front selection]] 作为两种多目标选择方式交替使用，且在单目标任务或随机概率条件下会使用 F-value selection。文中还用 F-value 对 [[ZINC250K]] 初始种群做 best / worst initial 的采样划分。

## 关键点

- 它把多目标信息压缩成一个可排序的标量分数，便于在分子搜索中直接做保留与截断。
- 在本研究里，F-value selection 是 [[多目标分子优化]] 的核心 selection 机制之一，用来控制每一代保留下来的[[分子量|分子质量]]。
- 它与 [[Pareto front selection]] 互补：前者强调综合得分，后者强调[[Pareto set|非支配解集合]]。
- 从实验现象看，加入多目标选择后，fitness 明显提升，但 [[molecular diversity|diversity]] 可能下降，说明该策略更偏向强化高分区域。
- 该论文中的 F-value 是归一化后的综合指标，具体聚合公式应以论文实现为准。

## 别名

- F值选择
- 基于F值的选择
- fitness selection
- F-value ranking

## 外部背景

- 在[[进化算法]]中，selection 指根据 fitness 或 score 选择父代、幸存者或下一代个体的过程。
- [[多目标优化]]中常见的[[hypervolume scalarization|标量化方法]]会把多个目标合成为一个分数，再进行排序和筛选。
- F-value 的具体定义会随任务变化，常见做法包括归一化后加权求和；待核对经典来源。
- 与 Pareto 方法相比，标量选择通常更简单、计算更快，但可能损失部分解集多样性；待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
