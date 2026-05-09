---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# QED

## 标准定义

QED（Quantitative Estimate of [[Drug-likeness]]）是用于衡量分子“[[类药性]]”的综合评分，通常将多个理化与结构性质的偏好度汇总为一个 0 到 1 之间的数值，数值越高通常表示该分子越符合药物候选分子的常见经验分布。它更像一种经验性质量指标，而不是活性预测器；在 [[分子优化]] 中常被用作优化目标、筛选指标或与其他性质一起组成 [[多目标优化]] 问题。

## 在本知识库中的用法

在本知识库给定论文上下文中，QED 主要被当作[[多目标分子优化]]里的一个核心目标性质，用来与 [[Similarity]]、[[PlogP]]、[[DRD2]] 等一起构成优化任务。[[MOMO]] 在[[隐式化学空间]]中解码候选分子后，直接计算 QED，并通过基于 Pareto 支配的多目标选择寻找同时兼顾类药性与[[药物相似性|结构相似性]]的候选解。其他论文中，QED 也被用于：作为[[黑盒 oracle]] 的一部分、作为 LLM 提示中的属性标签、以及作为多属性[[Instruction Tuning|指令微调]]数据中的属性目标。总体上，这里的 QED 既是“要提升的性质”，也是评估分子是否足够 drug-like 的通用标准之一。

## 关键点

- QED 是 Quantitative Estimate of Drug-likeness，核心含义是用一个经验分数概括分子的类药性，通常分数越高越好。
- 在本知识库中，QED 经常不是单独优化，而是与 [[Similarity]]、PlogP、DRD2 等一起做多目标权衡。
- MOMO 将 QED 作为分子空间中的目标性质之一，在隐空间进化后解码评估，再用 Pareto 选择保留候选解。
- 在 LLM 分子优化语境里，QED 常出现在属性标签、prompt 或训练样本中，作为可被条件生成和优化的目标。
- QED 更适合被理解为经验性类药性指标，而不是直接代表生物活性或实验可行性。

## 别名

- Quantitative Estimate of Drug-likeness
- drug-likeness score
- 类药性评分

## 外部背景

- 待核对经典来源：QED 通常被认为来自 Bickerton 等人的经典类药性评分工作，核心思想是把多个分子性质的 desirability 组合成单一指标。
- QED 常见取值范围是 0 到 1，通常可由 RDKit 直接计算。
- QED 评估的是“像不像药”，不等同于“有没有活性”，因此常与活性、毒性、可合成性等指标联合使用。
- 在分子生成与优化研究中，QED 经常作为 benchmark 目标或约束项，用来衡量生成分子的经验质量。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
