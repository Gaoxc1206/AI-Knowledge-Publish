---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# PMF

## 标准定义

PMF 是一个缩写歧义较大的术语；在[[多目标优化]]语境下，常可指 Pareto membership function（帕累托隶属函数），即将多个目标的满足程度映射为单一隶属度/偏好分数，用于排序、决策或解的筛选；在概率论中也可指 probability mass function（概率质量函数）。

## 在本知识库中的用法

待从更多论文中补充。本文围绕 [[NSGA-III]]、[[帕累托前沿]] 和多目标荧光[[分子优化]]展开，但未直接定义 PMF，也未给出其明确用法。

## 关键点

- PMF 不是唯一确定的缩写，需先依据上下文判断；在优化类论文中更常见的是与 [[多目标优化]]、[[帕累托前沿]] 相关的含义。
- 若指 Pareto membership function，它通常用于把多个目标的优劣压缩成一个可比较的隶属度或满意度分数，便于排序与决策。
- 若指 probability mass function，则它描述离散随机变量各取值的概率分布，属于概率论基础概念，与本文的[[分子设计]]任务关联较弱。
- 本文强调的是基于 [[NSGA-III]] 的 Pareto 选择与多目标搜索流程，而不是 PMF 本身；PMF 若要纳入本库，需要后续论文进一步确认。

## 别名

- 帕累托隶属函数
- Pareto membership function
- 概率质量函数
- probability mass function
- PMF

## 外部背景

- 在模糊多目标优化中，membership function 常被用于表达“目标满足程度”，并可据此将多目标问题转化为更易决策的形式。
- 在多目标决策场景中，Pareto membership function 常用于从 Pareto 解集中挑选更符合偏好的解。
- 在概率论中，PMF（probability mass function）是离散型随机变量的基础定义。
- 待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
