---
type: "concept"
status: "enriched"
category: "生物靶点"
domain: "多目标分子优化"
background: "included"
---
# DRD2

## 标准定义

DRD2 通常指 Dopamine Receptor D2（多巴胺D2受体），是一类与多巴胺信号传导相关的生物靶点。[[drug discovery|药物研发]]中，DRD2 相关指标常用来表示分子对该靶点的活性、[[binding affinity|亲和力]]或抑制能力；具体是“激动/拮抗/抑制”中的哪一种，取决于数据集、实验体系或预测器定义。

## 在本知识库中的用法

在本知识库的论文语境中，DRD2 主要作为[[多目标分子优化]]中的一个性质目标出现：在 [[MOMO]] 的 [[QED]]-DRD2-[[Tanimoto similarity|Similarity]] 任务里，它与 [[QED]] 和 [[相似性]] 一起被同时优化，并通过 [[Pareto front]] 搜索一组权衡不同目标的候选分子；在 [[C-MuMOInstruct]] / [[分子优化基础模型|GeLLM4O-Cs]] 中，DRD2 被列为 10 个药物相关属性之一，面向抗精神病药场景通常希望提高其值，同时与其他属性的提升或保持共同满足指令约束。

## 关键点

- DRD2 是多巴胺D2受体的常用缩写，属于经典药物靶点；在[[分子优化]]任务里，它通常被当作可打分的生物活性目标。
- 在 [[多目标分子优化]] 场景下，DRD2 往往与 [[QED]]、[[相似性]] 等目标一起出现，需要在活性与结构保守性之间做权衡。
- 本知识库中的 MOMO 将 DRD2 作为三目标任务的一部分，说明它适合放入 [[Pareto front]] 式的多目标搜索，而不是简单并入单一加权分数。
- 在 [[C-MuMOInstruct]] 中，DRD2 被定义为药物相关属性之一；论文语境里更偏向“希望提高 DRD2 相关得分/抑制能力”的优化目标。
- DRD2 的具体数值含义取决于数据集或预测器：有时表示受体抑制活性，有时表示对靶点的预测打分，使用时需要先确认任务定义。

## 别名

- 多巴胺D2受体
- D2受体
- Dopamine receptor D2
- D2 receptor

## 外部背景

- DRD2 即 dopamine receptor D2，通常指多巴胺D2受体，是 G 蛋白偶联受体家族成员，参与中枢神经系统多巴胺信号调控。
- DRD2 相关活性常被用于神经精神类[[药物发现]]与[[Lead Optimization|先导优化]]，尤其与抗精神病药设计关系密切；待核对经典来源。
- 在许多分子基准与性质预测任务中，DRD2 会被表示为分类标签、回归分数或抑制活性预测值，具体定义随数据集而变化。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
