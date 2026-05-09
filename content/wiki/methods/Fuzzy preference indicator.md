---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多模态多目标优化"
---
# Fuzzy preference indicator

## 定义

一种基于模糊集合思想的多样性评价/选择指标，用于在[[多模态多目标优化]]中衡量个体周围的稀疏程度。根据论文上下文，它将[[决策空间]]与[[目标空间]]中的邻域[[拥挤距离]]进行融合，以更好地区分不同 Pareto solution set。该指标服务于档案更新与截断选择，帮助同时维护收敛性与解集分布。若单独作为通用概念，待从更多论文中补充。

## 关键点

- 在论文中对应的具体机制是 Neighborhood Fuzzy Crowding Distance（[[拥挤距离|NFCD]]），用于多样性维护。
- 融合了决策空间和目标空间的邻域拥挤距离，而不是只看单一空间。
- 通过[[模糊集合理论]]进行融合，以获得更适合 [[多模态多目标优化|MMOP]]s 的稀疏度判断。
- 主要用于档案选择和截断，帮助保留不同的 global PS 和 local PS。
- 相比简单欧氏距离、[[CSCD]] 或非邻域版本，NFCD 在消融实验中表现更好。

## 别名

- Neighborhood Fuzzy Crowding Distance
- NFCD
- fuzzy crowding distance

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
