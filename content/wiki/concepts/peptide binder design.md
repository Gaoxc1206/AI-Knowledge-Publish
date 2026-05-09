---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标生物序列设计"
background: "included"
---
# peptide binder design

## 标准定义

peptide binder design 指针对特定靶标蛋白或生物大分子，设计能够发生特异性结合的肽序列；其目标通常是同时提升 [[binding affinity]]、选择性和[[developability|可开发性]]，并尽量兼顾 [[solubility]]、[[half-life]]、毒性等性质。作为背景知识，它既可以是单目标设计，也常被表述为[[多目标优化]]问题，最终希望得到在若干性质上处于 [[Pareto front]] 附近的候选肽。

## 在本知识库中的用法

在本知识库中，它主要作为离散生物序列多目标生成任务的代表应用：一类方法将其表述为在肽序列空间中同时优化 [[hemolysis]]、[[non-fouling]]、[[solubility]]、[[half-life]] 和 [[binding affinity]]；另一类方法则以 wild-type peptide binder design 为任务，结合预训练[[离散流模型]]与多目标引导，在多个靶蛋白上生成近似 Pareto 贸易权衡的候选肽。

## 关键点

- 该任务的核心不是只追求单一 [[binding affinity]]，而是同时平衡多个常常冲突的性质，因此天然适合多目标优化。
- 在给定论文中，它被用作 [[Discrete Flow Matching]] / [[Rectified Discrete Flows]] 的离散序列生成应用场景，强调在采样过程中直接做目标引导。
- [[MOG-DFM]] 中，肽 binder 设计通过多目标引导把生成样本推向 [[Pareto front]] 附近，重点关注[[hemolysis|溶血性]]降低、[[non-fouling]]、[[solubility]]、[[half-life]] 和 affinity 的联合权衡。
- AReUReDi 中，wild-type peptide binder design 被作为五目标任务示例，用于验证离散流采样结合 [[annealed guidance]]、[[locally balanced proposals|locally balanced proposal]] 和 MH 更新的效果。
- 该任务的评价通常需要看目标之间的 trade-off，而不是单看某个指标是否最高；因此“最优”更接近 Pareto 意义上的可接受折中。

## 别名

- peptide binder design
- peptide binder engineering
- binding peptide design
- 肽结合体设计
- 肽配体设计

## 外部背景

- 肽 binder 通常指能与靶蛋白稳定结合的短肽或肽样分子，常见于抑制蛋白-蛋白相互作用、靶向递送和诊疗分子设计。
- 经典的 peptide design 流程往往先依赖实验筛选或结构建模，再用序列优化方法改良亲和力与可开发性；具体标准流程待核对经典来源。
- 多目标肽设计常会把亲和力与溶解性、稳定性、免疫原性、细胞毒性等性质一起考虑，以避免单指标优化导致的性能退化。
- 在生成式设计中，peptide binder design 常被视为离散序列生成与条件控制的结合场景。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
