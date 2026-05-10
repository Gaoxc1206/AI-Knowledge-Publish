---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "药物发现与分子优化"
background: "included"
---
# Lead Optimization

## 标准定义

Lead Optimization（先导化合物优化）是[[药物发现]]中的关键阶段，通常发生在 [[hit molecule]] 之后、[[lead molecule]] 之前，目标是在保留核心骨架与主要活性的前提下，系统改良化合物的效力、选择性、[[ADMET]] 性质、稳定性和可合成性等，使其更接近可开发候选物。它本质上是一个带有多约束的分子设计与[[多目标优化]]问题：不是单纯追求某一指标越高越好，而是要在多个药物相关性质之间做权衡。

## 在本知识库中的用法

在这篇论文中，Lead Optimization 被具体化为可控多属性、多目标[[分子优化]]任务：输入是一个 [[hit molecule]]，输出是结构尽量相似的优化分子，用于把早期命中分子推进到更接近 [[lead molecule]] 的状态。其重点不是“所有属性都同时提升”，而是按属性分别设定目标：对未达标性质进行提升，对已接近达标的性质保持稳定，并尽量维持结构相似性。论文用这一场景构建了 [[C-MuMOInstruct]] 数据集，并训练 [[GeLLM4O-C]]，使 LLM 能根据属性级指令执行药效、渗透性、毒性等多目标权衡优化。

## 关键点

- 标准上，Lead Optimization 是药物发现中把 [[hit molecule]] 逐步改造成可开发 [[lead molecule]] 的阶段，核心是性质改良与风险控制并行。
- 在这篇论文中，它被重新表述为属性级可控的多属性分子优化：对不同性质分别指定“提升”“降低”或“保持”目标。
- 与传统“全部性质一起优化”不同，论文强调真实场景中的 trade-off，例如提高 BBBP/DRD2 的同时降低 hERG、MUT 或 DILI 风险。
- 该任务还显式要求保持 [[结构相似性]]，避免为追求指标而过度偏离原始化学骨架。
- 论文将 lead optimization 作为构造 C-[[MuMOInstruct]] 的应用背景，并据此训练 [[GeLLM4O-C|GeLLM]]4O-C 做指令式分子修改。

## 别名

- 先导优化
- 先导化合物优化
- Lead Optimization
- hit-to-lead optimization

## 外部背景

- 经典药物化学中，lead optimization 通常通过构效关系分析、局部取代基修改、骨架保留与性质再平衡来推进，待核对经典来源。
- 该阶段常同时考虑 potency、selectivity、solubility、permeability、metabolic stability、toxicity 等多维指标，待核对经典来源。
- 在计算药物设计里，lead optimization 常被建模为约束优化或[[多目标优化]]问题，而不是单目标搜索，待核对经典来源。
- 常见相关术语包括 hit-to-lead、lead optimization、multi-parameter optimization（MPO），待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
