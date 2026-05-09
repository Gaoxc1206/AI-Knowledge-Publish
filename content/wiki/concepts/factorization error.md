---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生成模型"
background: "included"
---
# factorization error

## 标准定义

factorization error（分解误差）通常指：当一个复杂的联合分布被拆成若干条件项、局部项或坐标独立项来近似时，由这种分解假设带来的偏差或近似误差。在[[离散流模型]]、自回归建模或基于局部更新的生成方法中，它常反映为模型无法准确表达变量之间的高阶依赖关系，尤其是多坐标之间的相关结构被过度简化时产生的误差。

## 在本知识库中的用法

在这篇论文的语境里，factorization error 主要指离散 flow matching 中由于按坐标独立近似建模而引入的误差。作者借助 [[Rectified Discrete Flows]] 的 rectification 过程来降低这种误差，并通过减少与坐标分解相关的依赖偏差（文中提到 [[conditional total correlation]]）来改善离散序列生成质量。

## 关键点

- 它是离散生成建模中的一种结构性近似误差，来源于把联合分布拆成更简单的局部/坐标级分解。
- 当序列 token 之间存在强依赖时，factorization error 往往会导致生成结果偏离真实联合分布。
- 在本库论文中，它被视为 [[Rectified Discrete Flows]] 需要修正的关键问题之一。
- 论文将 rectification 理解为逐步修正 source-target coupling，以减少与分解近似相关的误差，并缓解 [[条件总相关]]。
- 该概念在本库中主要用于解释为什么离散 flow matching 需要“校正”而不仅仅是直接按坐标生成。

## 别名

- 分解误差
- factorization approximation error
- 分解近似误差

## 外部背景

- 在概率建模里，若联合分布 $p(x_1,\dots,x_L)$ 被近似为若干简单因子的乘积，分解越粗糙，通常越容易产生 factorization error。
- 在图模型、变分推断和生成模型中，类似误差常与“独立性假设过强”有关。
- 在离散序列生成里，这类误差会表现为局部 token 预测看似合理，但全局序列一致性较差。
- 待核对经典来源

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
