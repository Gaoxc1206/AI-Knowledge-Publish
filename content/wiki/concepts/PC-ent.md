---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# PC-ent

## 标准定义

待从更多论文中补充。根据常见用法，PC-ent 通常可理解为一种用于衡量 [[Pareto front]] 覆盖均匀性/分散程度的熵类指标；数值越高，一般表示样本在[[目标空间]]中的分布越均匀、覆盖越广。

## 在本知识库中的用法

在这篇论文中，PC-ent 与 [[IGD]]、[[Avg-PCC]] 一起用于比较不同条件式生成策略在[[多目标分子设计]]中的前沿覆盖情况。作者用它来体现模型是否能在整个 Pareto 前沿上更均匀地采样，而不是只集中在少数极端 trade-off 区域。结果显示，[[goal-conditioning|goal-conditioned]] [[GFlowNet]] 在多个复杂目标景观下的 PC-ent 持续高于 [[preference-conditioning|preference-conditioned GFlowNet]]。

## 关键点

- PC-ent 是一个偏向“覆盖均匀性”的指标，用来补充只看最优性或距离类指标时的不足。
- 在本文语境里，它主要服务于评估 [[GFlowNet]] 在多目标[[分子设计]]中的探索分布是否均匀。
- PC-ent 更高通常意味着生成样本对不同 trade-off 区域的覆盖更全面，不容易只落在 Pareto 前沿的两端。
- 论文将 PC-ent 与 [[IGD]]、[[Avg-PCC]] 联合使用，以区分“接近前沿”与“前沿上覆盖均匀”这两类能力。
- 该指标在本文中支持了一个核心结论：[[goal-conditioning]] 相比 [[preference-conditioning]] 更有利于在复杂 Pareto 结构上实现可控且均匀的采样。

## 别名

- Pareto coverage entropy
- PC entropy
- PC-ent

## 外部背景

- 熵常被用来衡量分布的离散程度；把目标空间划分为若干区域后，可用各区域样本占比的熵来刻画覆盖均匀性。
- 在[[多目标优化]]评估中，常见指标还包括 [[Hypervolume Indicator|hypervolume]]、spacing、coverage、[[IGD]] 等；PC-ent 更偏向“分布是否均匀”。
- 不同论文对 PC-ent 的分箱方式、归一化方式、计算对象可能不同，跨论文比较时需要核对经典来源。
- 待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
