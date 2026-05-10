---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多模态多目标优化"
background: "included"
---
# MMODE_CSCD

## 标准定义

[[MMODE_CSCD|CSCD]]（Convergence Score and Crowding Distance）可理解为一种面向[[多模态多目标优化]]的个体选择/截断思路：先用收敛分数衡量个体逼近[[Pareto front]]的程度，再用[[拥挤距离]]估计局部稀疏性，以在收敛与多样性之间折中。待核对经典来源。

## 在本知识库中的用法

在源论文的消融对照中，ACEA-CSCD 是与 ACEA-ED、ACEA-FCD、ACEA-NFCD 并列的基线版本，用来比较不同多样性维护策略对 global PS / local PS 搜索的影响。就该文上下文而言，它可视为没有采用论文提出的[[邻域模糊拥挤距离]]、而使用较传统 CSCD 机制的对照方法。

## 关键点

- 它主要服务于[[多模态多目标优化]]中的“找全解集”任务，而不仅是逼近一个 [[Pareto front]]。
- 标准思路是把“收敛性评估”和“局部稀疏性评估”结合起来，避免只看[[Pareto Dominance|支配关系]]导致的误删。
- 在本库语境里，ACEA-CSCD 更像是对照基线，而不是论文的主创新点；主创新点是 [[自适应收敛指标]] 和 [[邻域模糊拥挤距离]]。
- 论文消融结果显示，加入更强的邻域与模糊融合机制后，NFCD 明显优于 CSCD，说明单纯的收敛分数 + [[拥挤距离]]对 [[多模态多目标优化|MMOP]]s 仍偏弱。
- 它常被用来衡量：当多样性维护从更复杂的邻域建模退回到传统拥挤距离时，global PS / local PS 的覆盖能力会下降多少。

## 别名

- ACEA-CSCD
- CSCD
- Convergence Score and Crowding Distance

## 外部背景

- 拥挤距离是[[Multi-objective Evolutionary Algorithm|多目标进化算法]]中常见的多样性保持指标，经典用法多见于 [[NSGA-II]] 一类框架。
- 收敛分数/收敛指标通常用于衡量个体向最优前沿靠近的程度，但不同论文的具体定义可能差异较大，待核对经典来源。
- 在多峰多目标问题中，[[目标空间]]相近并不代表[[决策空间]]相同，因此仅靠目标空间的距离往往不足以保留所有 [[Pareto最优解集|Pareto optimal solution set]]。
- CSCD 这一缩写在不同论文里可能有不同展开方式，待核对经典来源。

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
