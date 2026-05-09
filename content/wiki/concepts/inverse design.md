---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "蛋白质序列逆向设计"
background: "included"
---
# inverse design

## 标准定义

inverse design（逆向设计）是指：不是先给定结构/参数再预测性质，而是先给定目标性质、功能约束或性能指标，再反向搜索满足这些要求的对象。它常见于[[多目标优化]]、[[生成模型]]和基于代理模型的设计流程中；当目标之间存在冲突时，通常需要同时考虑可行性、约束满足与[[Pareto optimality]]。在连续优化、离散[[生物序列设计|序列设计]]或组合生成中，inverse design 往往会被表述为“在[[目标空间]]中寻找输入”的问题。

## 在本知识库中的用法

在这篇论文对应的知识库语境里，inverse design 主要指蛋白质/抗体序列的反向生成与优化：给定多个期望性质（如 Ab-like、[[binding affinity]]、[[BV score]] 等），生成新的序列候选，而不是只做[[性质预测]]。这里它不是单目标搜索，而是希望得到落在或接近[[Pareto front]]的一组候选序列，以便在多个性质之间做权衡选择。论文中的实现思路是把多个属性模型与[[Energy-Based Model]]结合，并通过[[Multiple Gradient Descent]]和[[Langevin Dynamics]]进行多目标采样。

## 关键点

- inverse design 的核心是“由目标反推输入”，与传统 forward prediction 方向相反；在本库中对应蛋白质/抗体序列生成与优化。
- 当多个目标彼此冲突时，inverse design 通常不追求单一最优解，而是寻找一组[[Pareto optimality|Pareto 最优]]候选。
- 这篇论文将 inverse design 具体化为多属性序列采样：同时考虑 Ab-like、[[binding affinity|Aff]]、BV score 等性质，而不是只优化单一指标。
- 方法上，[[pcEBM]] 用多个属性相关的[[Energy-Based Model]]表达约束，并用[[Multiple Gradient Descent]]确定每一步的 Pareto 改进方向。
- 与简单加权求和不同，这里的 inverse design 更强调动态权衡和对[[非凸 Pareto front]] 的覆盖能力。
- 生成过程中加入[[Langevin Dynamics]]噪声，使采样不仅能朝更优区域移动，也能探索更多候选解。

## 别名

- 逆向设计
- 反向设计
- goal-directed design
- backward design

## 外部背景

- 在优化与控制中，inverse design 常与“design under constraints”或“goal-directed optimization”相近，待核对经典来源。
- 在计算材料、分子与蛋白设计中，inverse design 常借助代理模型、梯度法或生成模型来搜索满足目标性质的候选，待核对经典来源。
- 如果目标是连续可微的，inverse design 可以被写成约束优化；如果目标是离散序列，则常结合搜索、采样或生成式建模，待核对经典来源。
- 当目标之间强冲突时，inverse design 的结果往往不是单点最优，而是一个可供决策的候选集合，待核对经典来源。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
