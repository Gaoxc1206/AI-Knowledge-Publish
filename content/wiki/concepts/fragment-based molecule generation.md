---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "分子生成"
background: "included"
---
# fragment-based molecule generation

## 标准定义

fragment-based molecule generation 指一种以“片段”为基本构件来构造分子的生成范式：先从片段库中选择或采样子结构，再通过拼接、替换、扩展或连接等操作形成完整分子。与逐原子生成相比，这类方法通常更容易融入化学先验、提高[[Synthesizability|可合成性]]，并在一定程度上控制骨架、官能团和局部药效团结构。它常与 [[分子图生成]]、规则约束或搜索式构造结合使用。

## 在本知识库中的用法

待从更多论文中补充。当前给定上下文中的论文主要讨论的是用 [[Goal-conditioned GFlowNets]] 做可控[[多目标分子设计]]，显式指定[[focus region|目标区域]]（[[focus region]]）来更均匀地探索 [[Pareto front]]，并未明确展开 fragment-based molecule generation 的具体流程或实现。

## 关键点

- 标准定义上，fragment-based molecule generation 是“先片段、后组装”的分子构造方式，核心目标是生成化学上合理且更可合成的候选分子。
- 它与逐原子生成的区别在于：生成单位更大，通常更贴近已知化学结构与药物化学经验。
- 从该论文上下文看，研究重点不在片段生成本身，而在 [[GFlowNet]] 条件化与目标区域控制；fragment-based 相关用法未被直接讨论。
- 如果把片段生成与该文思想联系起来，更自然的切入点是：在片段组装过程中引入目标区域约束，以提升多目标可控性。
- 本知识库中关于该节点的证据不足，当前只能确认其作为[[分子生成]]的一类构造范式存在，具体与该论文的对应关系仍需补充。

## 别名

- 基于片段的分子生成
- 片段式分子生成
- fragment-based generation
- fragment assembly
- fragment growing

## 外部背景

- 常见实现包括 fragment replacement、fragment growing 和 fragment linking 等变体，分别对应替换、扩展与连接片段。
- 该方向常借助预定义片段库、化学反应模板或键合规则来限制生成空间。
- 待核对经典来源
- 在[[药物发现]]中，片段级操作常用于提高可解释性与合成可行性。
- 一些工作会把片段生成与[[强化学习]]、搜索算法或生成模型结合，以平衡新颖性与可合成性。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
