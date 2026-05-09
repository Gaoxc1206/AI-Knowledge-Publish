---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子设计"
background: "included"
---
# Pearson correlation coefficient

## 标准定义

Pearson correlation coefficient（皮尔逊相关系数，常记为 [[Avg-PCC|PCC]] 或 Pearson's r）是衡量两个变量之间线性相关程度的统计量，取值范围为 [-1, 1]。其绝对值越接近 1，表示线性相关越强；接近 0 表示线性线性关系越弱或不存在。标准形式通常基于协方差与标准差进行归一化，适合刻画连续变量之间的线性一致性，但不能充分反映非线性关系。

## 在本知识库中的用法

在该论文语境中，PCC 被作为评估[[多目标分子设计]]结果的统计指标之一，与 [[Pareto front]] 覆盖质量和[[目标空间]]分布相关联。文中报告了 [[Avg-PCC]]，用来比较 [[preference-conditioned GFN]] 与 [[Trajectory Balance|goal-conditioned GFN]] 在不同目标景观下生成结果的整体相关表现；结合上下文可理解为衡量生成样本在目标空间中的线性一致性/匹配程度。具体 Avg-PCC 的精确定义与计算细节，待从更多论文中补充。

## 关键点

- PCC 是一个标准的 [[相关系数]]，主要衡量两个连续变量之间的线性关系，而不是一般意义上的因果关系。
- 取值范围为 [-1, 1]：正值表示正相关，负值表示负相关，0 附近表示线性相关弱。
- 在本知识库相关论文中，PCC/Avg-PCC 用作多目标生成结果的评价指标之一，用来辅助判断模型是否更均匀地覆盖目标空间。
- 该论文更强调 [[goal-conditioned GFlowNet]] 在复杂目标景观下的可控性；PCC 反映的是结果分布与目标方向之间的统计一致性，而不是训练目标本身。
- PCC 只能描述线性关系，因此在存在非凸、凹形或分段结构的 [[Pareto front]] 场景下，单独依赖 PCC 可能不足以完整评价方法优劣。

## 别名

- PCC
- Pearson's r
- Pearson r
- 皮尔逊相关系数
- 皮尔逊 r

## 外部背景

- PCC 的经典定义是协方差除以两个变量标准差的乘积，等价于对线性关系强度的归一化度量。
- 在机器学习与统计分析中，PCC 常用于特征相关性分析、预测值与真值一致性评估，以及多指标之间的线性依赖分析。
- 常见别名包括 Pearson's r、sample correlation coefficient、皮尔逊 r；具体实现可能区分总体相关与样本相关，待核对经典来源。
- PCC 对异常值可能较敏感，且对非线性关系不够敏感，因此常需要与其他评价指标联合使用，待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
