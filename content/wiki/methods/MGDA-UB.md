---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标语言模型对齐"
background: "included"
---
# MGDA-UB

## 标准定义

[[Multiple Gradient Descent|MGDA]]-UB（[[Multiple Gradient Descent]] Algorithm - Upper Bound）通常被视为 [[多目标优化]] 中 MGDA 的一个上界近似/变体：它不直接求解完整的多目标梯度 min-norm 问题，而是通过某种上界重构或简化形式，寻找能够推动参数朝向 [[Pareto stationary point]] 的更新方向。其目标是在保留多目标折中性质的同时，降低原始 MGDA 在高维参数空间中的计算开销。待从更多论文中补充。

## 在本知识库中的用法

在《Pareto Multi-Objective Alignment for Language Models》中，MGDA-UB 被作为多目标 [[大语言模型对齐|RLHF 对齐]]的 baseline，与 [[MORLHF]]、PAMA 对比。文中将其定位为需要处理多个目标在全参数空间梯度组合的梯度式[[多目标优化]]方法，并指出其在大模型场景下计算代价较高，复杂度可达 O(n^2 d)。实验中，MGDA-UB 在 GPT-2 125M、GPT-2 XL 1.5B、LLaMA-2 7B 的多目标[[大语言模型对齐|对齐]]任务上整体不如 PAMA 稳定，部分设置下出现退化或难以兼顾冲突目标；例如在 sentiment+length、humor+length、harmlessness+length 等组合上，论文均将其作为弱于 PAMA 的对照方法。

## 关键点

- MGDA-UB 属于多目标梯度法家族，核心关注的是在多个损失/奖励目标之间寻找 [[Pareto stationarity]] 相关的更新方向。
- 与原始 MGDA 相比，MGDA-UB 通常通过上界化或近似化降低求解难度，但仍保留“多目标梯度组合”的思想。
- 在本知识库对应论文中，它被用作 [[RLHF]] 多目标对齐 baseline，而不是作者提出的新方法。
- 论文将其主要问题概括为：在十亿参数级语言模型上，直接进行梯度聚合的计算和稳定性都不理想。
- 对比结果显示，MGDA-UB 在多个任务上不如 PAMA 稳定，尤其在冲突目标同时存在时更容易出现性能退化。

## 别名

- MGDA-UB
- MGDA Upper Bound
- Multiple Gradient Descent Algorithm - Upper Bound

## 外部背景

- MGDA 是多目标优化中的经典方法之一，常用于从多个目标梯度中构造一个共同下降方向；待核对经典来源。
- “UB”通常表示 upper bound（上界）思想，即用更易优化的上界或代理问题替代原始困难问题；待核对经典来源。
- 在深度学习/强化学习场景中，MGDA 类方法往往面临高维梯度存储与组合成本较高的问题；待核对经典来源。
- 多目标优化中的 [[Pareto 最优]]/驻点概念是理解 MGDA-UB 的基础；待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
