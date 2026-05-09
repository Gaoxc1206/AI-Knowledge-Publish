---
type: "method"
status: "enriched"
category: "优化方法"
domain: "大语言模型多目标对齐"
---
# PCGrad

## 定义

PCGrad 是论文中提到的一类传统梯度式[[多目标优化]]方法，用于处理多个可能冲突的目标梯度。该类方法通常需要分别计算各目标的高维梯度，并对其进行聚合。文中将 PCGrad 作为与 [[MGDA]]、[[CAGrad]] 并列的代表方法，指出其在[[大语言模型]]场景下计算开销较大，不适合直接扩展到几十亿参数规模。

## 关键点

- 属于梯度式多目标优化方法，用于缓解多个目标之间的冲突。
- 需要对多个目标分别计算并组合高维梯度。
- 论文指出这类方法的复杂度通常为 O(n^2 d)，其中 n 是目标数量，d 是模型参数量。
- 在 [[Large Language Model|LLM]] 规模下，由于参数量巨大，这类方法的计算成本不可接受。
- 论文将 PCGrad 作为传统 [[Multi-Objective Optimization|MOO]] 基线/对照方法之一，与 [[MGD]]A、CAGrad 一起提及。

## 别名

- PCGrad

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
