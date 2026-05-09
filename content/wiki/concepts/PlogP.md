---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标分子优化"
background: "included"
---
# PlogP

## 标准定义

P[[logP]]（Penalized logP）通常指对分子[[logP|疏水性]]指标 logP 进行惩罚修正后的评分，用来衡量分子在“更高[[lipophilicity|脂溶性]]”与“更可合成、更合理环结构”之间的综合表现。经典用法中，它不是单纯的 logP，而是将 logP 与合成可及性、环复杂度等惩罚项结合，常作为 [[分子优化]] 和 [[多目标优化]] 的目标之一；一般认为数值越高越好，但它更适合作为基准任务中的代理目标，而不应被直接等同于真实[[developability|药物可开发性]]。

## 在本知识库中的用法

在本知识库对应论文中，PlogP 被当作[[多目标分子优化]]的核心优化目标之一，通常与 [[Similarity]]、[[QED]]、[[DRD2]] 联合评估。第一篇论文把它作为 [[MOMO]] 在[[隐式化学空间]]中搜索的目标之一，报告了 PlogP 与相似性同时提升的结果；第二篇论文把它纳入[[可控多属性多目标优化]]任务，要求模型在提升 PlogP 的同时保持或调整其他属性，并在案例中展示了对 PlogP 的定向提升与属性保持。

## 关键点

- PlogP 是对 logP 的“惩罚版”评分，常用于 [[分子优化]] 基准，而不是单独的理化常数。
- 在该知识库中，它主要作为需要与相似性、[[药物相似性]]或生物活性共同优化的目标值出现。
- 第一篇论文中，MOMO 在 [[隐式化学空间]] 里优化 PlogP + [[Tanimoto similarity|Similarity]]，并报告了较高且更稳定的结果。
- 第二篇论文中，PlogP 被写入属性级指令目标，既可以“提升”，也可以与其他性质一起“保持/约束”。
- 由于 PlogP 本质上偏向疏水性提升，它与可开发性、毒性、溶解性等性质可能存在权衡，不能只看单项分数。

## 别名

- Penalized logP
- Penalized LogP
- pLogP
- penalized logP score

## 外部背景

- PlogP 常见于分子生成与优化论文中的标准 benchmark，尤其是检验模型是否能在不破坏结构相似性的前提下提升性质。
- 经典定义通常由 logP、synthetic accessibility penalty 和环结构惩罚组合而成；具体实现细节在不同工作中可能略有差异，待核对经典来源。
- 它与 [[QED]] 不同：QED 更偏向综合类药性估计，而 PlogP 更强调一个特定的性质—结构惩罚组合。
- 在不少分子优化任务里，PlogP 作为高分目标容易被“投机式”优化，因此通常要结合相似性或其他约束一起看。
- 不同代码库对 PlogP 的计算接口可能引用 RDKit 或其他工具链，具体公式与实现建议待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
