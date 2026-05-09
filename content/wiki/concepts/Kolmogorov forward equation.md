---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散流匹配与生物序列生成"
background: "included"
---
# Kolmogorov forward equation

## 标准定义

Kolmogorov forward equation（也常被称为 forward equation 或 master equation 的一种表述）描述[[连续时间马尔可夫链]]（[[CTMC]]）的边际分布随时间如何演化。对状态分布 $p_t$，它把“当前时刻的概率质量变化”写成由转移速率决定的线性微分方程。背景上，它常用于刻画由时间相关 [[transition rate]] 驱动的随机过程，并与生成模型中的概率流/采样动力学相联系。

## 在本知识库中的用法

在这篇论文的 [[Discrete Flow Matching]] 背景下，Kolmogorov forward equation 被用来刻画离散序列生成过程中的 [[CTMC]] 边际概率演化：模型通过时间相关的转移速率 $u_t(y,x)$ 将初始分布 $p_0$ 推向目标分布 $p_1$。论文直接写出 $\frac{d}{dt}p_t(y)=\sum_{x\in S}u_t(y,x)p_t(x)$，并据此讨论 factorized velocity、guided transition rate 以及后续的 [[Euler sampling|Euler 采样]]。这里它更像是[[Discrete Flow Matching|离散流匹配]]生成过程的基础动力学约束，而不是独立的优化目标。

## 关键点

- 它是 [[CTMC]] 的基础演化方程，用来把状态转移速率与边际分布变化连接起来。
- 在本论文中，它为离散序列生成的概率动力学提供数学基础，支撑 [[Discrete Flow Matching]] 的采样过程。
- 论文把多目标引导作用在转移速率上，但仍通过 Kolmogorov forward equation 所对应的 CTMC 演化来更新边际分布。
- 这里的使用重点是“生成过程的动力学描述”，不是单独作为一个评分函数或优化方法。
- 与 Euler 采样配合时，它用于从 guided transition rate 推出一步步的离散跳转概率。

## 别名

- forward equation
- Kolmogorov forward equation
- master equation
- 前向科尔莫哥洛夫方程
- 主方程

## 外部背景

- 它是随机过程论中的经典方程，通常与 [[master equation]]、forward Kolmogorov equation 视为同类表述，待核对经典来源。
- 对于有限状态空间，它可写成关于生成元（generator）或速率矩阵的线性常微分方程，待核对经典来源。
- 在物理、排队系统和化学反应网络中也常用来描述概率质量在状态之间的流动，待核对经典来源。
- 在生成模型领域，它可作为连续时间离散采样过程的理论基础，尤其适合与 CTMC、jump process 结合。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
