---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子设计"
background: "included"
---
# Avg-PCC

## 标准定义

Avg-[[Pearson correlation coefficient|PCC]] 通常可理解为一种“平均覆盖”类指标，用于衡量模型在一组目标条件或偏好条件下，对[[目标空间]]或 [[Pareto front]] 的平均覆盖程度。一般而言，数值越高表示模型对多个目标方向的达成与分布覆盖越好。由于当前上下文只提供了指标名及其相对表现，具体全称、计算公式和归一化方式待从更多论文中补充。

## 在本知识库中的用法

在《[[Goal-conditioned GFlowNets]] for Controllable Multi-Objective Molecular Design》中，Avg-PCC 是用于比较不同方法在复杂 Pareto front 上表现的重要指标之一。作者用它对比 [[preference-conditioned GFN]] 和 [[fragment-based molecule generation|goal-conditioned GFN]]；结果显示 [[goal-conditioning|goal-conditioned]] GFN 在多个 landscape 上的 Avg-PCC 持续更高，说明其能更均匀地覆盖不同[[focus region|目标区域]]，也更符合显式 goal/[[focus region]] 的[[controllable generation|可控生成]]目标。

## 关键点

- Avg-PCC 属于多目标生成/优化中的覆盖型评价指标，核心关注模型对目标空间的平均覆盖能力。
- 在本文里，它与 IGD、PC-ent 一起使用；其中 Avg-PCC 更直接反映对 Pareto front 各方向的均匀覆盖。
- goal-conditioned GFN 的 Avg-PCC 系统性高于 preference-conditioned GFN，支持其在凹形或复杂 Pareto front 上更可控。
- 该指标更适合观察模型是否只偏向极端点，还是能在多个 trade-off 方向上保持采样。
- 当前上下文不足以确认 Avg-PCC 的精确定义与展开式，需结合更多论文补充。

## 别名

- PCC
- Avg PCC
- Average PCC

## 外部背景

- 多目标优化中常用 IGD、Hypervolume、Spacing、覆盖率等指标评价 Pareto front 的质量；覆盖类指标通常关注分布均匀性。
- 在条件生成模型里，也常见“按条件分桶后取平均”的方式，评估模型对不同目标条件的平均可控性。待核对经典来源
- 如果 PCC 是某个 coverage/consistency 类缩写，不同论文可能有不同全称，不能仅凭该文题断定。待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
