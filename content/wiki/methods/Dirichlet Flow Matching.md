---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
background: "included"
---
# Dirichlet Flow Matching

## 标准定义

Dirichlet [[Flow Matching]] 可视为流匹配（Flow Matching）在离散或单纯形相关表示上的生成建模思路：通过学习随时间变化的[[速度场]]或 token 级[[转移速率]]，在[[连续时间马尔可夫链]]轨迹上把简单初始分布逐步传输到数据分布。它强调直接在离散状态空间建模，而不是先映射到连续嵌入再采样。

## 在本知识库中的用法

在本知识库对应论文中，它作为预训练的离散生成器底座被使用：先生成肽段或 enhancer DNA，再在每一步 token 转移上叠加多目标引导。[[MOG-DFM]] 对原始转移速率进行重加权，并结合自适应 hypercone 过滤与[[Euler sampling]]，使样本朝多个性质的[[Pareto front]]区域移动。

## 关键点

- 它的核心是离散状态上的逐步生成，而不是连续噪声到数据的单次映射；生成过程可以用[[连续时间马尔可夫链]]来表述。
- 在本论文上下文中，[[Discrete Flow Matching|DFM]] 作为基础 backbone，为后续的多目标引导提供每步 token 替换与采样接口。
- 多目标引导不是直接改写最终序列目标，而是对每步候选替换的局部改进进行 rank-directional 重加权，再更新[[转移速率]]。
- 自适应 hypercone 过滤用于保留与[[Preference Vector|偏好向量]]一致的转移方向，减少与目标 trade-off 相悖的跳转。
- 该框架面向肽段与 enhancer DNA 设计，目标是靠近[[Pareto front]]，但作者明确不保证 Pareto optimal。

## 别名

- DFM
- Discrete Flow Matching
- 离散流匹配
- 流匹配生成模型

## 外部背景

- 流匹配通常可视为直接学习概率路径或速度场的生成框架；在离散场景中，常用 [[CTMC]]/jump process 实现。待核对经典来源
- [[离散生成模型]]常通过 token-level transition rate 描述一步步替换过程；与[[扩散模型]]的离散化表述有联系。待核对经典来源
- 多目标生成/优化常借助偏好向量、Pareto 采样或[[标量化]]策略在不同权衡方向上搜索。待核对经典来源
- Dirichlet 相关参数化常用于概率单纯形上的分布建模；“Dirichlet Flow Matching”这一具体命名待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
