---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型对齐"
---
# RLHF

## 定义

RLHF（[[Reinforcement Learning from Human Feedback]]）是一种基于人类偏好反馈来对[[大语言模型|语言模型]]进行对齐的方法。标准流程通常包括奖励建模和策略优化两阶段：先用偏好数据训练[[奖励模型]]，再用 [[PPO]] 等方法优化策略。本文将 RLHF 视为主流的单目标对齐范式，指出它通常把多样化人类偏好压缩成单一[[奖励模型|奖励函数]]，因此难以直接处理多个冲突目标。

## 关键点

- 标准 RLHF 一般分为奖励建模和策略优化两步。
- 奖励建模阶段使用偏好数据训练奖励模型，区分偏好回复与较差回复。
- 策略优化阶段通常使用 PPO，并带有相对参考策略的 KL 约束。
- 在本文语境中，RLHF 主要对应单目标对齐方法。
- 其局限是难以同时表达和优化多个可能冲突的人类偏好维度。

## 别名

- Reinforcement Learning from Human Feedback
- 基于人类反馈的强化学习
- 人类反馈强化学习

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
