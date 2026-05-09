---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化"
---
# SPEA2

## 定义

SPEA2 是一种经典的[[多目标进化算法]]，常用于黑盒[[多目标优化]]和 [[Pareto front]] 搜索。给定上下文中，它被作为传统多目标优化基线方法提及，用于与[[扩散模型]]或离散生成方法比较。相关笔记只说明它适用于[[多目标黑盒优化|多目标黑箱优化]]，但在高维序列空间中的效率和生成质量受限；更具体的机制待从更多论文中补充。

## 关键点

- 属于经典多目标[[进化算法]]，在多目标[[黑盒优化|黑箱优化]]中常被用作基线。
- 可用于近似 Pareto front，但在高维序列空间中的效率受限。
- 上下文中将其与 [[NSGA-III]]、[[SMS-EMOA]]、[[MOPSO]] 并列为传统多目标优化方法。
- 在扩散模型或离散生成相关工作中，常作为对比方法出现。
- 关于其内部选择、环境选择和档案机制的具体细节，待从更多论文中补充。

## 别名

- Strength Pareto Evolutionary Algorithm 2
- SPEA-2

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
