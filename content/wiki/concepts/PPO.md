---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "强化学习与语言模型对齐"
background: "included"
---
# PPO

## 标准定义

PPO（Proximal Policy Optimization）是一类常用的策略梯度强化学习方法，通过限制新旧策略之间的更新幅度来获得更稳定的训练过程。其核心通常是 clipped surrogate objective，必要时也可结合 [[KL 正则化|KL 约束]]；在 [[RLHF]] 中，PPO 常作为基于奖励模型进行策略微调的标准优化框架。

## 在本知识库中的用法

在本文语境中，PPO 是 RLHF 策略优化阶段的基础方法背景。作者在此基础上引入 No Negative PPO（[[Noon PPO]]）：将负的 [[advantage]] 截断为 0，仅让非负优势动作参与更新，以减少训练不稳定性。随后，PAMA 进一步利用 Noon PPO 的 advantage 结构，把多目标对齐中的梯度组合问题重构为更低维的凸优化问题，从而服务于 Pareto 多目标对齐。

## 关键点

- PPO 是一种稳定的策略优化方法，适合在大模型对齐中做在线/近在线策略更新。
- 其关键机制是对策略更新幅度进行约束，避免一次更新过大导致性能崩坏。
- 在该知识库中，PPO 主要作为 [[RLHF]] 的标准策略优化背景，而不是多目标对齐本身。
- 论文中的 Noon PPO 是 PPO 的变体：将负 [[advantage]] 截断为 0，只保留非负优势信号。
- PAMA 复用了 PPO/Noon PPO 的 advantage 结构，把多目标梯度聚合转化为更易求解的凸优化。

## 别名

- Proximal Policy Optimization
- 近端策略优化
- PPO算法
- 策略优化截断法

## 外部背景

- PPO 通常被视为对 TRPO 的简化实现，目标是在较低工程复杂度下保留稳定更新特性。
- 经典 PPO 有两种常见写法：ratio clipping 版本与 [[KL 正则化|KL penalty]] 版本；具体表述可待核对经典来源。
- 在语言模型对齐中，PPO 常与奖励模型、参考策略和 KL 正则一起使用，以平衡奖励提升与语言质量保持。
- PPO 是近端策略优化的标准中文译名，也常直接沿用英文缩写 PPO。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
