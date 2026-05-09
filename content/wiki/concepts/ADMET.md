---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "药物发现中的多目标分子优化"
background: "included"
---
# ADMET

## 标准定义

[[ADME]]T 是[[drug discovery|药物研发]]中对候选分子吸收（Absorption）、分布（Distribution）、代谢（Metabolism）、排泄（Excretion）和毒性（Toxicity）的统称，用于评估其药代动力学与安全性。它通常与 [[药代动力学]]、[[毒性]]、[[类药性]] 一起，作为先导化合物筛选和优化阶段的重要背景约束。

## 在本知识库中的用法

在本知识库的论文上下文里，ADMET 主要作为[[分子设计]]中的一类“应用导向性质集合”出现，而不是单一标量指标。它被用来描述在生成或优化分子时，除了主要功能目标之外，还要兼顾[[developability|可开发性]]与安全性；例如在荧光分子[[多目标优化]]中，作者明确提到需要同时优化 ADMET / [[细胞膜通透性|细胞通透性]]等性质。在具体任务层面，ADMET 往往被拆解为 [[HIA]]、[[BBBP]]、[[hERG]]、[[CARC]]、MUT、LIV 等可预测属性，并与 [[多目标优化]]、[[分子生成]]、[[分子优化]] 一起作为控制目标或保持约束使用。

## 关键点

- ADMET 是从“能否成药”的角度评价分子的核心概念，覆盖吸收、分布、代谢、排泄和毒性五个方面。
- 在多目标分子优化中，ADMET 常与活性、选择性、溶解性、稳定性等性质共同权衡，目标之间可能彼此冲突。
- 本知识库语境里，ADMET 往往不是直接作为一个整体标签使用，而是拆成多个可建模属性，如 HIA、BBBP、hERG、CARC、MUT、LIV。
- 在可控生成任务中，ADMET 更像一组约束：有些属性需要提升，有些属性需要保持在可接受范围内。
- 对于面向药物发现的生成模型，ADMET 约束有助于避免只追求单一功能指标而导致的不可开发分子。

## 别名

- ADME-T
- ADME/T
- 药代毒理性质

## 外部背景

- ADMET 是药物研发中的经典缩写，标准展开为 Absorption、Distribution、Metabolism、Excretion、Toxicity。
- ADME 侧重药代动力学，ADMET 在此基础上加入 Toxicity，用于更全面地评估候选化合物的可开发性。
- 常见与 ADMET 相关的代理性质包括溶解性、渗透性、血脑屏障穿透、CYP 代谢、心脏毒性等，具体定义与测定体系需结合任务背景。
- 待核对经典来源

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
