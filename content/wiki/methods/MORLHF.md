---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型多目标对齐"
---
# MORLHF

## 定义

[[Multi-Objective Reinforcement Learning|MORL]]HF 是论文中与 [[PAMA]]、[[MGDA-UB]] 对比的[[Multi-Objective Alignment|多目标 RLHF]] 基线方法。根据给定笔记，它在多目标偏好之间进行对齐，但在实验中容易受到固定权重带来的优化偏向影响。上下文未给出其完整算法展开，待从更多论文中补充。

## 关键点

- 作为多目标 [[RLHF]] 基线，用于和 PAMA、[[MGDA]]-UB 进行比较。
- 论文笔记显示它受固定权重限制，容易出现对某一目标的偏向。
- 在 GPT-2 125M 的 [[IMDb]] 实验中，MORLHF 在 sentiment 和 length 上都低于 PAMA。
- 在 GPT-2 XL 1.5B 的 [[HH-RLHF]] 实验中，MORLHF 主要优化长度，对幽默提升有限。
- 在 LLaMA-2 7B 的 HH-RLHF 实验中，MORLHF 收敛到较低性能。
- 具体更新规则、目标组合方式和理论性质在给定上下文中未充分说明，待从更多论文中补充。

## 别名

- 多目标RLHF
- MORLHF

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
