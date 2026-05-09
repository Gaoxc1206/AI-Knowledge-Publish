---
type: "method"
status: "enriched"
category: "其他"
domain: "多模态多目标优化"
---
# MMODE_CSCD

## 定义

上下文中只提到 [[CSCD|ACEA-CSCD]] 作为与 [[CMMO|ACEA-NFCD]]、ACEA-ED、ACEA-FCD 并列的消融对比方法，但没有给出其完整机制定义。可以确认它属于[[多模态多目标优化]]中的一种相关选择/[[拥挤距离]]变体，但具体设计细节待从更多论文中补充。

## 关键点

- 它出现在 ACEA-[[拥挤距离|NFCD]] 论文的消融实验对比中，说明与[[拥挤距离|邻域模糊拥挤距离]]相关的设计有关。
- 上下文没有说明 [[CSCD]] 的完整展开、计算方式或更新流程，具体机制待从更多论文中补充。
- 论文结论表明，加入 neighborhood + fuzzy 融合后的 NFCD 明显优于 ACEA-CSCD。
- 因此，CSCD 在该工作中主要作为基线或对照方法，用于验证 NFCD 的改进效果。

## 别名

- ACEA-CSCD
- CSCD

## 相关论文

- [[2026 - 自适应收敛指标与邻域模糊拥挤距离的多峰多目标优化 - dangAdaptiveConvergenceIndicator2026]]
