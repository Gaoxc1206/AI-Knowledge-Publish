---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# Pareto-Clusters Entropy

## 标准定义

Pareto-Clusters Entropy（[[PC-ent]]，帕累托簇熵）是一类用于衡量一组解在 [[Pareto front]] 上分布均匀性与覆盖广度的熵型指标。通常先把[[目标空间]]中的帕累托区域划分为若干簇或离散区域，再统计样本落入各簇的频率，并计算其 [[熵]]；熵越高，说明样本越分散、覆盖越均匀，熵越低则说明样本更集中在少数区域。具体划分方式和熵公式在不同论文中可能略有差异，待从更多论文中补充。

## 在本知识库中的用法

在该论文中，PC-ent 用来评价生成分子对多目标折中区域的覆盖是否均匀，属于比单纯最优性更强调分布质量的指标。作者用它对比 [[preference-conditioning|preference-conditioned GFlowNet]] 与 [[goal-conditioning|goal-conditioned]] [[GFlowNet]] 的采样结果：后者在多种凹形或多峰形目标景观下通常表现出更高的 PC-ent，说明其能更均匀地覆盖目标空间中的不同 trade-off 区域。

## 关键点

- PC-ent 是一个面向 [[Pareto front]] 的分布均匀性指标，核心关注“样本是否覆盖了多个帕累托区域”。
- 从直觉上看，它更像是对“解集多样性 + 前沿覆盖”的熵度量，而不只是单点最优性。
- 在这篇论文里，PC-ent 被用来衡量 [[GFlowNet]] 生成结果对不同目标折中方向的覆盖质量。
- 与 [[IGD]] 这类距离型指标相比，PC-ent 更能反映样本在前沿上的分散程度和可控采样能力。
- 论文结果显示，goal-conditioned 方法在 PC-ent 上普遍优于 [[preference-conditioning|preference-conditioned]] 方法，尤其在复杂或非凸目标景观中。

## 别名

- PC-ent
- Pareto cluster entropy
- Pareto Clusters Entropy
- 帕累托簇熵

## 外部背景

- 待核对经典来源：[[多目标优化]]中常见的熵型多样性指标通常通过对前沿样本分箱、聚类或网格化后再计算频率熵得到。
- 待核对经典来源：这类指标通常与 [[Pareto front]] 的覆盖度、分布均匀性和解集多样性密切相关。
- 待核对经典来源：不同论文中的“cluster”定义可能不同，可能是 K-means 簇、目标空间网格，或基于前沿离散区域的分段。
- 待核对经典来源：若样本高度集中于少数簇，PC-ent 会降低；若样本较均匀铺开，PC-ent 会升高。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
