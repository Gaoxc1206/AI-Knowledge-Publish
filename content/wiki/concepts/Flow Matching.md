---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
background: "included"
---
# Flow Matching

## 标准定义

Flow Matching 是一种[[生成模型]]训练范式，核心是学习从简单基分布到数据分布的时间依赖[[速度场]]或流场，使样本沿预先设定的[[概率路径]]逐步演化；在推断时通常通过数值积分或采样得到生成结果。它与[[扩散模型]]/score-based 方法相关，但侧重点是直接匹配流而非显式学习噪声条件下的 score。离散情形下，Flow Matching 可扩展为基于[[连续时间马尔可夫链]]的[[Discrete Flow Matching|离散流匹配]]。

## 在本知识库中的用法

在这篇论文里，Flow Matching 主要体现为其离散版本[[离散流匹配]]，作为可控生物序列生成的基础生成器。作者不是把 Flow Matching 当作单纯的无[[controllable generation|条件生成]]器，而是把它的采样过程当作多目标引导的载体：在每一步 token 转移时，结合多个[[性质预测]]器的局部改进与偏好方向，对原始转移速率进行重加权，并通过自适应 hypercone 过滤来推动序列向[[Pareto front]]附近采样。论文的重点是把[[多目标优化]]直接嵌入离散生成的[[连续时间马尔可夫链]]采样中，而不是先映射到连续空间再优化。

## 关键点

- 标准上，Flow Matching 学的是从噪声/基分布到数据分布的连续流；在离散序列中则常落到 jump process 或[[连续时间马尔可夫链]]表述。
- 本文中的用法是：以预训练[[离散流匹配]]作为 backbone，在采样阶段加入多目标引导，而不是重新训练一个端到端的生成器。
- [[MOG-DFM]] 通过局部改进分数和偏好方向，对每一步候选 token 的转移速率做重加权，使生成样本朝多个性质的[[Pareto front]]区域移动。
- 论文强调这种做法适合离散生物序列，因为它避免了先做连续嵌入再优化可能带来的分布扭曲。
- Flow Matching 在这里更像“可被引导的生成动力学”，其作用是把多目标偏好注入采样轨迹，而不是直接输出最终设计序列。

## 别名

- FM
- 流匹配
- Flow-Matching
- Discrete Flow Matching
- DFM

## 外部背景

- 待核对经典来源：Flow Matching 通常被视为与扩散模型并列的一类生成建模方法，目标是学习概率流的速度场并通过常微分方程/数值积分生成样本。
- 待核对经典来源：离散版 Flow Matching 需要把连续流的思想改写到离散状态空间，常见做法是使用[[连续时间马尔可夫链]]或 jump process。
- 待核对经典来源：Flow Matching 及其变体常与 [[Rectified Flow]]、OT-based generative modeling 等方向一起讨论，但具体关系依实现而异。
- 待核对经典来源：在条件生成或引导生成中，Flow Matching 的速度场/转移率可以被外部打分函数重加权，从而实现属性控制。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
