---
type: "concept"
status: "enriched"
category: "数据集"
domain: "大语言模型对齐"
background: "included"
---
# HH-RLHF

## 标准定义

HH-[[RLHF]]（通常理解为 Helpfulness-Harmlessness RLHF）是一类用于人类偏好对齐的基准数据/任务，核心目标是让模型在[[RLHF]]框架下同时兼顾“有用性”和“[[无害性奖励|无害性]]”。它通常通过成对回复比较来训练[[奖励模型]]，再用于策略优化或偏好优化；在更宽泛的语境中，也可被视为一个典型的多属性对齐基准。

## 在本知识库中的用法

在这篇论文里，HH-RLHF 被当作[[多目标对齐]]的实验基准之一，用来检验 [[PAMA]] 在冲突目标下的平衡能力。作者分别在 GPT-2 XL 1.5B 和 LLaMA-2 7B 上使用该基准，考察了“幽默性 + 长度”和“无害性 + 长度”两类目标组合，并与 [[MORLHF]]、[[MGDA-UB]] 做对比。

## 关键点

- HH-RLHF 在标准语义上更接近“有用且无害”的偏好对齐基准，而不是一种优化算法。
- 在本知识库对应论文中，它被用作[[Multi-Objective Alignment|多目标 RLHF]] 的实验场景，强调不同奖励之间的冲突与折中。
- 论文把 HH-RLHF 任务与长度等辅助目标组合，用来观察方法在多目标设置下的稳定性和收敛表现。
- 从节点组织上，HH-RLHF 适合连接到[[RLHF]]、[[奖励模型]]和[[多目标优化]]等概念。

## 别名

- Helpful-Harmless RLHF
- Helpfulness-Harmlessness RLHF
- Anthropic HH-RLHF
- HH

## 外部背景

- 待核对经典来源：HH-RLHF 最常被理解为 Anthropic 相关的 Helpful and Harmless RLHF 数据/基准。
- 常见流程是先用偏好比较数据训练[[奖励模型]]，再通过 [[PPO]] 或其他偏好优化方法微调策略。
- HH-RLHF 体现了“多属性对齐”的思路：同一模型需要同时满足多个可能冲突的人类偏好。
- 在一些实验设置中，HH-RLHF 会被简称为 HH 数据集或 HH 基准。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
