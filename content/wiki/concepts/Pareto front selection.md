---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# Pareto front selection

## 标准定义

[[Pareto front]] selection 是[[多目标优化]]中的一种选择准则：在候选解集合中优先保留位于[[Pareto 前沿]]上的[[非支配解]]，即不存在另一个解在所有目标上都不差且至少一个目标更好的解。它不依赖单一加权标量，而是直接维护多个目标之间的权衡关系，常用于生成下一代候选集或维持解集多样性。

## 在本知识库中的用法

在 [[MOLLM]] 中，Pareto front selection 用于把当前父代分子与新生成的 offspring 合并后，筛选下一代分子；它与[[F-value selection]]并列作为多目标选择机制，且两者按一定概率交替使用。论文强调，多目标选择不是可有可无的附加项，而是提升[[多目标分子优化]]性能的关键环节；消融实验显示，不使用多目标选择时，fitness 明显下降，尽管多样性和[[uniqueness|唯一性]]可能更高。

## 关键点

- 它的核心不是“选分最高”的单个分子，而是保留在[[Pareto 前沿]]上的候选，以维持多个性质目标之间的平衡。
- 在 MO[[Large Language Model|LLM]] 的流程里，它属于后验选择步骤：先由 LLM 生成 offspring，再与父代合并，最后做非支配筛选。
- 论文中它与[[F-value selection]]共同构成多目标选择模块；单靠 prompt 写入目标不足，还需要显式的选择机制。
- 消融结果表明，去掉 MO selection 后，整体 fitness 会显著变差，说明 Pareto-style selection 对多目标[[分子优化]]很重要。
- 在目标数量增多时，这类选择策略更能体现价值，因为它帮助模型在更复杂的权衡空间中保留高质量候选。

## 别名

- Pareto frontier selection
- front selection
- 基于 Pareto 前沿的选择
- 非支配选择

## 外部背景

- 经典多目标优化中，Pareto front selection 常与[[非支配排序]]、[[拥挤距离]]或精英保留等策略结合使用，待核对经典来源。
- Pareto front 也常写作 [[Pareto frontier]]，二者在多数优化文献中指同一类非支配解集合，待核对经典来源。
- 与加权和法相比，Pareto front selection 对目标尺度和权重设定更不敏感，但通常需要额外规则处理前沿上的解数量与多样性，待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
