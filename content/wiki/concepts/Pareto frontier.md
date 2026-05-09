---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子优化"
background: "included"
---
# Pareto frontier

## 标准定义

[[Pareto front]]ier（[[Pareto front|帕累托前沿]]）是在[[多目标优化]]中，由所有[[Non-dominated Solutions|非支配解]]构成的集合或边界。若一个解无法在不损害至少一个其他目标的前提下继续改进某个目标，则它可视为位于帕累托前沿上。它刻画了目标之间的权衡关系：前沿上的不同解对应不同的折中方案，而不是单一全局最优解。与[[多目标优化]]、[[非支配解]]和[[选择算子]]密切相关。

## 在本知识库中的用法

在 [[MOLLM]] 中，Pareto frontier 具体指用于下一代分子筛选的 [[Pareto front selection]]：将当前父代与新生成的 offspring 合并后，基于多目标[[Pareto dominance|非支配关系]]筛选候选分子，并与 [[F-value]] selection 交替使用。论文中该机制被证明对[[多目标分子优化]]非常关键；如果不使用多目标选择，虽然多样性和[[uniqueness|唯一性]]可能更高，但整体 fitness 会明显下降。作者还将其作为在固定 [[oracle budget]] 下提升多目标搜索质量的核心组件之一。

## 关键点

- 标准上，Pareto frontier 表示多目标问题中的[[Pareto set|非支配解集合]]，用来描述目标之间的折中，而不是给出单一最优解。
- 在本库所述 MO[[Large Language Model|LLM]] 框架里，它是下一代分子筛选的一种 [[选择算子]]，与 [[F-value]] selection 结合使用。
- 该选择机制作用于“父代 + offspring”的合并池，强调在保留高质量分子的同时维护多目标权衡。
- 论文实验表明，显式使用 Pareto front selection 对提升多目标分子优化的总体表现非常重要。
- 不使用多目标选择时，结果可能更分散，但最终的综合目标值会下降。
- 它适合与 [[遗传算法]] 风格的搜索一起使用，因为可以自然表达“保留一组互不支配候选”的思想。

## 别名

- 帕累托前沿
- 帕累托边界
- Pareto front
- non-dominated frontier

## 外部背景

- 帕累托前沿常被视为多目标优化的核心概念之一，用于描述不同目标之间不可同时完全兼得的折中边界。
- 常见相关概念包括支配关系、非支配排序与拥挤度控制；这些常用于多目标进化算法中，待核对经典来源。
- 在工程和机器学习任务里，研究者往往不会只报告单个最优点，而是报告帕累托前沿上的一组代表性解，以展示 trade-off。
- 帕累托前沿上的解并不一定都“等好”，而是各自在不同目标上具有不同优势。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
