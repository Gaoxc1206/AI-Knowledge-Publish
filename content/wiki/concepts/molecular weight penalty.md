---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# molecular weight penalty

## 标准定义

[[molecular weight]] penalty 指在[[分子生成]]或[[多目标优化]]中，对[[分子量]]过大、超出目标区间或偏离期望分布的候选分子施加的惩罚项。它通常被写入[[奖励函数]]、损失函数或打分函数，用来抑制生成过重分子，并与[[Synthesizability|可合成性]]、药物样性等目标共同形成 trade-off。

## 在本知识库中的用法

在给定论文《[[Goal-conditioned GFlowNets]] for Controllable Multi-Objective Molecular Design》的上下文中，作者主要讨论如何用 [[Goal-conditioned GFlowNets|goal-conditioned GFlowNets]] 在[[目标空间]]的 [[focus region]] 内进行可控采样，涉及的示例性质包括 binding score、[[QED]]、toxicity、EC50 和 [[Synthesizability|synthesizability]]，但摘要与笔记中未明确展开 molecular weight penalty 的具体定义、形式或实验用法。因此本知识库中该节点目前记为：待从更多论文中补充。

## 关键点

- 它本质上是对分子量相关的过大值进行抑制的惩罚项，常用于避免模型偏向生成“过重”的分子。
- 在[[多目标分子优化]]里，它通常与其他性质目标一起使用，作为[[标量化]]奖励的一部分或额外约束。
- 惩罚形式可以是阈值型、分段型或连续型正则项，具体实现会影响分布的平滑性与可优化性。
- 从本知识库给定论文看，当前更强调目标区域控制与 Pareto front 覆盖，而不是 molecular weight penalty 的专门设计。
- 若后续论文明确把分子量作为目标或约束，再补充其与[[帕累托前沿]]、[[奖励函数]]之间的具体关系。

## 别名

- MW penalty
- molecular weight regularization
- 分子量惩罚
- 分子量正则项

## 外部背景

- 常见做法是把分子量作为经验约束之一，用于提升候选分子的药物可行性。待核对经典来源
- 在药物设计中，molecular weight penalty 往往与 [[QED]]、合成可及性和脂溶性等指标一起出现。待核对经典来源
- 其数值形式可写成对超阈值部分的线性惩罚、hinge penalty 或平滑正则项。待核对经典来源
- 它也可被视为对“分子大小偏好”的软约束，而不一定是硬性过滤规则。待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
