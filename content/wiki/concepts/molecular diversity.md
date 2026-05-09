---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# molecular diversity

## 标准定义

分子多样性（molecular diversity）是衡量一组分子在结构、骨架、指纹空间或性质空间中彼此差异程度的指标，通常用于评价分子集合是否覆盖了更广的[[化学空间]]。它强调集合层面的分散性，而不是单个分子的可行性；因此常与 [[validity]]、[[uniqueness]]、[[novelty]] 一起使用，以区分“能否生成”“是否重复”和“是否足够多样”。常见实现会基于[[ECFP|分子指纹]]相似度、子结构差异或成对距离来计算。

## 在本知识库中的用法

在该论文笔记中，molecular diversity 主要作为[[多目标分子优化]]结果的集合质量指标，用来描述最终候选分子在结构上的分散程度。作者在不同初始种群设置下报告了 Top1/Top10 F、[[uniqueness]]、[[validity]] 和 diversity，并用它来观察 [[MOLLM]] 在提升目标值的同时是否仍能保持候选集合的[[chemical diversity|化学多样性]]。该文中 diversity 的数值可与 selection 策略、initial population 和 [[ExpeL|experience pool]] 等机制的效果一起解读；例如，引入多目标选择会显著提高 fitness，但 diversity 可能下降。

## 关键点

- 分子多样性是[[分子生成]]和[[多目标分子优化]]中的集合级指标，关注候选分子之间的差异而非单个分子的合法性。
- 在该知识库对应论文中，它与 Top F、[[uniqueness]]、[[validity]] 一起报告，用于评估 MO[[Large Language Model|LLM]] 生成结果的整体质量。
- 从实验现象看，启用多目标选择后 fitness 提升明显，但 diversity 可能降低，说明优化强度与探索广度之间存在权衡。
- 该论文中的 diversity 主要用于比较不同初始种群、不同选择策略以及是否加入 experience pool 时的生成分布变化。
- 分子多样性通常可通过指纹相似度或成对距离近似度量，属于比单目标打分更偏全局的评价视角。

## 别名

- 分子多样性
- chemical diversity
- molecular set diversity
- internal diversity

## 外部背景

- 待核对经典来源：分子多样性常被理解为候选集合在化学空间中的覆盖广度，可用于避免优化过程过度收敛到少数相似结构。
- 待核对经典来源：常见做法是基于 Morgan fingerprint、[[Tanimoto similarity]] 或内部多样性（internal diversity）来计算。
- 待核对经典来源：在药物发现中，多样性通常与可合成性、活性和新颖性共同考虑，以平衡探索与利用。
- 待核对经典来源：不同论文对 diversity 的具体定义可能不完全一致，需结合实验指标说明其计算方式。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
