---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "大语言模型对齐与强化学习"
background: "included"
---
# Proximal Policy Optimization

## 标准定义

Proximal Policy Optimization（[[PPO]]）是一类基于[[强化学习]]的策略优化方法，通过裁剪后的[[黑盒 oracle|目标函数]]或等价的约束形式限制新旧策略的更新幅度，以在提升回报的同时保持训练稳定。它通常依赖[[优势函数]]来估计动作好坏，并常用于[[策略优化]]场景，尤其是在需要把偏好信号或奖励信号转化为可训练目标时。

## 在本知识库中的用法

在该论文相关知识库语境中，PPO主要作为[[RLHF]]里的标准单目标策略优化器：先由[[奖励模型]]给出标量奖励，再通过参考策略约束进行更新。论文进一步引入[[Noon PPO]]，把负的 advantage 截断为 0，用于支撑[[多目标对齐]]中的低复杂度近似与闭式求解思路。

## 关键点

- PPO的核心目标是限制单次策略更新步幅，常见实现是 clipped surrogate objective，并可与[[KL散度]]约束配合使用。
- 在[[RLHF]]中，PPO通常接收来自[[奖励模型]]的标量回报，用来直接优化[[大语言模型|语言模型]]的生成策略。
- 这篇论文里，PPO不是被改造为新的主方法，而是作为[[PAMA]]的基础优化框架；关键改动体现在[[Noon PPO]]对负 advantage 的截断。
- 论文利用 PPO 结构把[[多目标优化]]从高维[[梯度聚合]]，转写为只与目标数量相关的[[凸优化]]近似。
- 在本知识库中，PPO对应的是“标准对齐策略优化器”这一角色，而不是多目标方法本身。

## 别名

- PPO
- Proximal Policy Optimization
- proximal policy optimization

## 外部背景

- PPO由 Schulman 等提出，通常被视为比 TRPO 更易实现的近似策略优化方法，待核对经典来源。
- 常见实现会包含 clip range、entropy bonus、advantage normalization 等细节，待核对经典来源。
- 在语言模型对齐中，PPO经常与RLHF结合，作为从人类偏好或奖励信号优化生成策略的主流方法，待核对经典来源。
- 也存在加入 KL penalty 的变体，与纯 clipped PPO 在实现细节上略有差异，待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
