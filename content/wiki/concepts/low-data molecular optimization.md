---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "低数据多目标分子优化"
background: "included"
---
# low-data molecular optimization

## 标准定义

low-data [[molecular optimization]] 指在样本标注、实验测量或高保真模拟预算很少的条件下，对分子结构进行搜索与改进，以提升一个或多个目标性质的优化问题。这里的“低数据”通常强调：可用于训练代理模型或指导搜索的已知分子样本很少，目标评估代价高，且需要尽量提高[[sample efficiency|样本效率]]。该问题常与[[贝叶斯优化]]、[[多目标优化]]、[[分子生成]]和基于代理模型的主动搜索结合使用。

## 在本知识库中的用法

在该论文上下文中，low-data molecular optimization 主要指受控的[[多目标分子设计]]场景：使用固定的分子候选池、少量 BO 轮次和有限[[oracle budget|评估预算]]，比较不同 [[acquisition function|acquisition]] strategy 在低数据条件下的效率与效果。论文强调，在这种低数据预算下，[[EHVI]] 相比[[固定权重标量化]]的 [[Expected Improvement]] 往往能更快找到更好的 [[Pareto front]] 覆盖，并带来更高或相当的[[chemical diversity|结构多样性]]。

## 关键点

- 本质上是一个[[优化问题]]：在有限[[oracle calls|评估次数]]下寻找满足多个性质的优质分子。
- 低数据场景的核心约束不是算力，而是可用于学习和评估的样本很少，因此样本效率最重要。
- 该论文中的低数据设定采用固定候选池、Gaussian Process 代理模型和有限 BO 预算来模拟实际分子设计中的稀缺反馈。
- 在这种场景下，Pareto-aware 的 acquisition（如 EHVI）比固定权重标量化更能兼顾最优性与多样性。
- 低数据分子优化通常需要依赖[[代理模型]]来近似性质评估，并通过主动学习式迭代逐步改进候选分子。
- 如果没有足够论文支撑具体任务定义，可视为待从更多论文中补充。

## 别名

- low-resource molecular optimization
- few-shot molecular optimization
- data-efficient molecular optimization
- low-data molecular design

## 外部背景

- 低数据优化是主动学习和贝叶斯优化中的常见设置，目标是在少量查询下尽快找到高价值解。
- 在分子优化中，低数据常对应“训练数据少、实验验证贵、目标性质多且相互冲突”的现实情境。
- 常见变体包括单目标低数据优化、多目标低数据优化、约束优化和离线优化，待核对经典来源。
- 分子设计中的低数据问题通常依赖分子指纹、图表示或生成模型来提升泛化能力，待核对经典来源。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
