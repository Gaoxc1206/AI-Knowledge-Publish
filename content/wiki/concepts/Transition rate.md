---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散流匹配与生物序列生成"
background: "included"
---
# Transition rate

## 标准定义

Transition rate（转移速率）是[[连续时间马尔可夫链]]（[[Continuous-time Markov chain]]）中的核心量，表示系统在单位时间内从当前状态跳到另一个状态的瞬时强度。对离散状态空间而言，它通常写成速率矩阵中的非对角元素；对应状态的总离开速率由所有外跳速率求和得到，而对角项由行和为零约束确定。标准上，它与 [[Kolmogorov forward equation]] 一起刻画分布随时间的演化。

## 在本知识库中的用法

在该论文的上下文中，transition rate 指[[Discrete Flow Matching|离散流匹配]]（[[Discrete Flow Matching]]）生成过程中，每个 token 位置从当前 token 跳转到候选 token 的局部速率。[[MOG-DFM]] 会先基于多个性质的局部改进分数对原始速率进行重加权，再结合 trade-off 方向向量进行过滤，从而得到 guided transition rate。随后，采样阶段通过这些速率计算每个位置的 outgoing rate，并用 Euler 方式决定是否跳转以及跳到哪个候选 token。

## 关键点

- 标准含义上，transition rate 是 [[Continuous-time Markov chain]] 中“单位时间内从状态 x 到状态 y 的跳转强度”，是离散随机过程的基本参数。
- 在[[离散生成模型]]里，它可以被理解为“下一步更可能替换成哪个 token”的局部动态，而不是一次性给出最终样本。
- 本文将 transition rate 具体化为 token-level 的局部跳转速率，用于直接在离散序列空间中建模和采样。
- MOG-[[Discrete Flow Matching|DFM]] 会根据多目标改进分数和[[Preference Vector|权重向量]] ω 对基础 transition rate 做指数重加权，形成 guided transition rate。
- 自适应 hypercone 过滤会限制保留的候选跳转方向，使 transition rate 更偏向与目标 trade-off 一致的转移。
- 采样时，当前位置的总 outgoing rate 决定是否发生跳转，并与 [[Euler sampling]] 结合完成逐步生成。

## 别名

- 转移速率
- 跳转速率
- transition rate
- rate matrix
- generator

## 外部背景

- 在 [[CTMC]] 中，转移速率矩阵也常被称为 generator 或 infinitesimal generator；待核对经典来源。
- 对很小的时间步长 h，发生一次跳转的概率通常与 h 乘以 outgoing rate 近似成正比；待核对经典来源。
- 在离散[[Flow Matching|流匹配]]/跳过程建模中，transition rate 可视作对“token 替换动作”的连续时间参数化；待核对经典来源。
- 速率矩阵的对角线通常取负的离开速率，以保证每行元素和为零；待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
