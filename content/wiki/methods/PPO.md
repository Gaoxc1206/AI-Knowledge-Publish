---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型对齐"
---
# PPO

## 定义

PPO（[[Proximal Policy Optimization]]）在该上下文中指用于 [[RLHF]] 策略优化的标准方法。它通过最大化期望奖励并加入参考策略约束来更新模型参数，常见形式中包含 clipped surrogate objective。文中将其作为单目标对齐与[[多目标对齐]]方法的背景基线来说明。

## 关键点

- 在标准 RLHF 流程中，PPO 用于奖励建模之后的策略优化阶段。
- 优化目标通常写成期望奖励减去与参考策略 \\pi_{ref} 的偏离惩罚，参考策略一般是 SFT 后的模型。
- 其常见形式使用 advantage 和 clipping 机制来限制策略更新幅度。
- 在这篇论文的背景中，PPO 代表的是单奖励对齐范式，难以直接表达多个冲突偏好目标。
- PPO 本身在此处作为多目标对齐方法讨论的起点，[[PAMA]] 也是在其结构上进行改写。

## 别名

- Proximal Policy Optimization
- 近端策略优化

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
