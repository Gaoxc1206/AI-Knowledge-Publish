---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化、药物发现"
background: "included"
---
# QED

## 标准定义

QED（Quantitative Estimate of Drug-likeness）是一个用于衡量分子“类药性”的标量指标，通常将多种与药物可开发性相关的分子性质综合到一个分数中。一般取值在 0 到 1 之间，数值越高通常表示该分子越接近常见药物样式。它更适合作为分子性质优化或筛选中的经验性评价指标，而不是严格的生物活性度量。

## 在本知识库中的用法

在本知识库对应论文中，QED 被作为[[分子优化]]的一个核心目标函数之一，用于和相似性、[[PlogP]]、Drd2 等性质共同构成[[多目标优化]]任务。论文在 Task 1 中将 QED 与 Similarity 联合优化，在 Task 3 中与 PlogP 和 Similarity 联合优化，在 Task 4 中与 Drd2 和 Similarity 联合优化。[[MOMO]] 在[[隐式化学空间]]中通过 Pareto 多目标进化搜索同时提升 QED 和其他目标，并尽量保持与先导分子的结构相似性。

## 关键点

- QED 是一个常用的分子类药性评分，常用于衡量候选分子是否更接近可开发药物的经验标准。
- 在标准定义中，QED 更偏向综合性质评分，通常不是单一理化性质，而是多个性质的聚合结果。
- 在该论文的语境里，QED 不是单独优化的唯一目标，而是与 [[Similarity]]、[[PlogP]]、[[Drd2]] 等一起组成多目标优化问题。
- MOMO 将 QED 作为可直接评估的目标函数，在解码回分子空间后计算其值，再用 [[Pareto front]] 机制保留不同折中的候选分子。
- 论文结果表明，QED 既可用于高类药性分子的筛选，也可用于检验优化方法是否能在提升性质的同时保持先导分子相似性。

## 别名

- Quantitative Estimate of Drug-likeness
- drug-likeness score
- 类药性评分
- QED

## 外部背景

- QED 常见取值范围为 0 到 1，通常数值越高表示类药性越强。
- QED 常被用于[[分子生成]]、[[Lead Optimization|先导优化]]和虚拟筛选任务中的性质评价，属于教材级常见指标。
- QED 的具体计算通常会结合多个分子描述符或经验规则；常见构成细节可待核对经典来源。
- 在多目标优化文献中，QED 经常与 logP、SA、SAS、相似性等指标一起使用，作为性质目标之一。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
