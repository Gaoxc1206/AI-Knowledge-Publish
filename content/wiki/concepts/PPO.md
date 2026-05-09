---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "强化学习与大语言模型对齐"
background: "included"
---
# PPO

## 标准定义

PPO（[[Proximal Policy Optimization]]，[[Proximal Policy Optimization|近端策略优化]]）是一类常用的 on-policy 策略梯度方法，通过裁剪后的 surrogate objective 或类似的信赖域近似，限制每次参数更新幅度，从而提升训练稳定性。它常与 [[advantage]] 估计、[[reward model]]、以及 [[KL]] 约束一起使用；在 [[RLHF]] 中，PPO 经常作为策略优化阶段的核心算法。

## 在本知识库中的用法

在这篇论文的上下文里，PPO指标准 [[RLHF]] 中的策略优化方法：先由[[奖励模型]]给出标量奖励，再用带参考策略的 PPO 目标进行更新。论文将其作为[[多目标对齐]]的背景基线，并在此基础上引入 [[Noon PPO]] 与 [[PAMA]]，把[[多目标优化]]从高维[[梯度聚合]]重写为更便宜的[[凸优化]]近似。

## 关键点

- PPO 是 [[RLHF]] 中最常见的策略优化器之一，核心作用是用裁剪机制稳定策略更新，避免一步更新过大。
- 本文中的 PPO 主要承担“单目标对齐基线”的角色：它默认只有一个标量奖励，因此难以直接表达多个冲突目标。
- PAMA 不是直接替代 PPO，而是以 PPO 的裁剪式目标为结构基础，进一步构造 [[Noon PPO]] 来处理多目标情形。
- 在论文语境下，PPO 的重要性不在于新算法本身，而在于它提供了一个可被改写的、适合对齐任务的策略优化框架。
- 与传统多目标梯度方法相比，论文指出直接在 PPO 参数空间做多目标聚合会带来较高计算成本，因此需要更轻量的近似。
- PPO 的参考策略约束与奖励模型配合，是本文讨论多目标对齐时的标准背景设定。

## 别名

- Proximal Policy Optimization
- 近端策略优化
- PPO算法
- Proximal Policy Optimization Algorithm

## 外部背景

- PPO 由待核对经典来源提出，通常被视为一种比 TRPO 更简单、工程上更易实现的近端策略优化方法。
- 经典 PPO 常见两种写法：裁剪目标（clipping）和 KL 惩罚式目标，二者都旨在抑制策略分布偏移过大。
- 在[[大语言模型对齐]]中，PPO 往往与 [[SFT]] 后的参考模型、奖励模型和 KL 正则共同使用。
- PPO 训练中常配合 [[GAE]] 估计优势函数，以降低方差并提升样本效率。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
