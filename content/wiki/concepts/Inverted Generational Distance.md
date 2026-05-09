---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Inverted Generational Distance

## 标准定义

Inverted Generational Distance（[[IGD]]）是一种用于评价[[多目标优化]]解集质量的指标，通常通过计算参考的 [[Pareto front]] 或参考解集中的每个点，到当前算法生成解集的最近距离，再取平均来衡量覆盖程度。IGD 越小，通常表示生成解集对目标前沿的覆盖越充分、越接近参考前沿。它与 [[Generational Distance]] 方向相反：前者更强调“参考前沿到解集”的覆盖，后者更强调“解集到参考前沿”的逼近。背景知识中，IGD 常与 [[Hypervolume]] 等指标一起使用。

## 在本知识库中的用法

在这篇关于 controllable multi-objective [[分子设计|molecular design]] 的论文中，IGD 被用作评估不同方法对[[目标空间]]前沿覆盖情况的指标，主要用于比较 [[preference-conditioning|preference-conditioned GFlowNet]] 与 [[goal-conditioning|goal-conditioned]] [[GFlowNet]]。在作者报告的多个二维目标 landscape 上，两者的 IGD 差距整体不大；论文同时指出，尽管 IGD 相近，goal-conditioned 方法在 [[Avg-PCC]] 和 [[PC-ent]] 上更优，说明其分布更均匀、可控性更强。这里的 IGD 主要服务于衡量 [[Pareto front]] 覆盖质量，而不是单纯的单点最优性。

## 关键点

- IGD 是面向 [[multi-objective optimization]] 的解集评价指标，重点看生成解集对参考前沿的覆盖程度。
- 数值越小通常越好，表示生成结果更接近并更全面覆盖参考 [[Pareto front]]。
- 与只看单点质量不同，IGD 更适合比较一组解的整体分布质量。
- 本知识库中的用法是：作为多目标分子设计实验中的辅助指标，用来比较 preference-conditioned 与 goal-conditioned GFlowNet 的前沿覆盖。
- 论文结果显示，IGD 并未明显拉开两种方法差距，因此作者进一步结合 Avg-PCC 和 PC-ent 来判断均匀性与可控性。

## 别名

- IGD
- 反向世代距离
- 倒代际距离

## 外部背景

- IGD 通常需要一个参考点集或参考前沿；参考集质量会影响指标解释。
- 与 [[Hypervolume]] 相比，IGD 更偏向距离型覆盖度评估，计算和直观理解通常更简单。
- 在多目标优化文献中，IGD 常用于比较不同算法在非凸或复杂 Pareto 前沿上的覆盖能力。
- 待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
