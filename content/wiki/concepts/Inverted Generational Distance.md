---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Inverted Generational Distance

## 标准定义

Inverted Generational Distance（IGD）是[[多目标优化]]中衡量解集逼近性与覆盖性的指标：先给定一组参考点，通常来自真实 [[Pareto front]] 或其高质量近似，再计算每个参考点到候选解集最近样本的平均距离；IGD 越小，说明生成解集越接近参考前沿，且覆盖更充分。该指标通常依赖距离度量与参考点采样方式，实际数值会受这两者影响。

## 在本知识库中的用法

在这篇目标条件 [[GFlowNet|GFlowNets]] 论文中，IGD 被用来比较 preference-conditioned [[GFlowNet|GFN]] 与 goal-conditioned GFN 在不同二维、三维和四维目标地形上的前沿覆盖质量。作者发现，IGD 上两种方法的差距有时不如 Avg-PCC 和 PC-ent 明显，因为 IGD 只关注参考点到最近样本的距离，不能充分反映生成分布是否均匀或条件控制是否稳定；但在目标数增加时，goal-conditioned 方法通常表现出更好的 IGD。

## 关键点

- IGD 衡量的是生成解集对参考 [[Pareto front]] 的平均近邻距离，数值越小越好。
- 它更偏向评估“逼近 + 覆盖”，但对样本是否均匀分布不敏感，因此常需要和其他指标一起看。
- 在本库对应论文中，IGD 主要用于验证 goal-conditioned [[GFlowNet]]s 是否能覆盖复杂的多目标折中区域。
- 论文指出，IGD 有时无法充分拉开 preference-conditioned 与 goal-conditioned 的差距，因为少量命中参考区域的样本就可能带来不错的 IGD。
- 随着目标维度升高，IGD 更能体现 goal-conditioned 方法在高维[[目标空间]]中的覆盖优势。

## 别名

- IGD
- 倒代际距离
- 反向生成距离

## 外部背景

- 常与 [[Hypervolume Indicator|Hypervolume]]、Generational Distance、Spacing 等多目标优化指标配合使用。
- 参考点集通常需要从真实前沿均匀采样；若真实前沿不可得，可用高质量近似前沿替代。
- IGD 的绝对值不宜跨任务直接比较，因为不同任务的目标尺度与归一化方式会影响结果。
- 待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
