---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
background: "included"
---
# Euler sampling

## 标准定义

Euler sampling 通常指在连续时间过程上做一阶离散化采样：给定当前状态和瞬时转移率，用一个小时间步长 h 近似下一时刻的状态演化，并据此逐步生成样本。在 [[连续时间马尔可夫链]] 或基于速率的生成模型中，它常用于把连续时间动力学转成可执行的逐步采样过程；当总离开率为 R_t(x) 时，常见近似会把“保持不变”的概率写成 exp(-hR_t(x))，其余概率分配给发生跳转的候选状态。

## 在本知识库中的用法

在该论文的 [[Discrete Flow Matching]] 采样阶段，Euler sampling 用于对经过多目标引导后的 [[CTMC]] 转移速率进行逐步采样。具体做法是先计算当前位置的 outgoing rate，再用 exp(-hR_t^i(x)) 表示该步不发生跳转的概率；若发生跳转，则转到经多目标打分与 [[hypercone filter]] 过滤后选出的最佳候选 token。它是 [[MOG-DFM]] 最终把多目标偏好落实到离散序列生成轨迹中的采样步骤。

## 关键点

- 它是对连续时间过程的一阶数值采样近似，核心是用小步长 h 近似状态转移，而不是直接在连续嵌入空间里优化。
- 在本知识库对应论文中，Euler sampling 作用于 [[连续时间马尔可夫链]] 形式的离散序列生成过程，用来把引导后的转移速率转成实际的 token 级采样动作。
- 论文里先做多目标重加权，再做 [[hypercone filter]] 过滤，最后通过 Euler sampling 决定该步是否跳转以及跳到哪个候选 token。
- 该采样步骤显式利用 outgoing rate 来计算“保持原状态”的概率 exp(-hR_t^i(x))，因此和速率建模紧密耦合。
- 它属于生成阶段的数值求解/采样手段，不是多目标打分本身；多目标信息主要在前面的 guidance 与候选筛选中注入。

## 别名

- Euler 采样
- 欧拉采样
- Euler discretization sampling
- Euler step sampling

## 外部背景

- 在 [[CTMC]] 里，Euler sampling 可视为最简单的时间离散化方案之一，属于一阶显式近似。
- 在[[扩散模型]]和 flow-based 生成模型的连续时间变体中，类似的 Euler 离散化也常被用来把连续动力学转成可执行的反向采样步。
- 当时间步长较小时，这类方法通常更稳定、实现更简单，但精度受步长 h 影响较大。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
