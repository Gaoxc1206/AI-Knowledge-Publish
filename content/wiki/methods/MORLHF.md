---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标语言模型对齐"
background: "included"
---
# MORLHF

## 标准定义

[[多目标强化学习|MORL]]HF 可理解为 [[RLHF]] 的多目标扩展：在[[大语言模型对齐|对齐]]阶段同时优化多个可能冲突的奖励/偏好信号，而不是把人类偏好压缩成单一标量奖励。其目标通常不是找到唯一最优解，而是寻找在多个目标之间具有良好折中的策略，即接近 [[Pareto 最优]] 或 [[Pareto Front|Pareto 前沿]]上的解。常见做法包括加权和、约束优化、梯度聚合或其他[[多目标优化]]技巧。

## 在本知识库中的用法

在给定论文中，MO[[强化学习从人类反馈|RLHF]] 作为一个多目标对齐 baseline，与 [[PAMA]] 和 [[MGDA-UB]] 对比，用于评估多目标 RLHF 的效果与稳定性。论文实验覆盖 GPT-2 125M、GPT-2 XL 1.5B 和 LLaMA-2 7B；整体上，MORLHF 往往只能带来有限改进，部分设置下会出现某一目标提升但另一目标停滞的现象。在 GPT-2 125M 的 sentiment+length 任务中，它的表现低于 PAMA；在 GPT-2 XL 1.5B 的 humor+length 任务中，它更像是主要优化了长度、对 humor 的提升有限；在 LLaMA-2 7B 的 harmlessness+length 任务中，其 harmlessness 表现也不如 PAMA 稳定。

## 关键点

- 本质上是 [[RLHF]] 的多目标版本，用于同时处理多个冲突偏好。
- 标准目标是获得 Pareto 折中，而不是只优化单一 reward。
- 在本知识库对应论文中，MORLHF 被当作 baseline，与 [[PAMA]]、[[MGDA-UB]] 做比较。
- 实验里它常表现为对某一目标有收益，但对其他目标的平衡不足，稳定性弱于 PAMA。
- 它体现了多目标对齐中“权重选择”和“目标冲突”带来的典型问题。

## 别名

- 多目标RLHF
- Multi-Objective RLHF
- 多目标人类反馈强化学习
- MORLHF

## 外部背景

- [[多目标强化学习]]/多目标优化中，常见方法包括加权和、约束法、Pareto 方法和梯度投影/梯度聚合；待核对经典来源。
- 在 RLHF 场景里，若把多个偏好直接线性加权成单一奖励，权重设定会显著影响最终行为；待核对经典来源。
- 多目标方法通常关注 [[Pareto Front|Pareto front]] 覆盖、各目标间的折中质量和训练稳定性；待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
