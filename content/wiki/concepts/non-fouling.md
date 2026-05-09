---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标生物序列设计"
background: "included"
---
# non-fouling

## 标准定义

non-fouling（抗污性）通常指材料、表面或分子减少[[非特异性吸附]]、[[蛋白吸附]]和细胞黏附的能力；在分子/[[生物序列设计|序列设计]]中，它常被建模为“越高越好”的性质分数，用来表征更低的非特异性相互作用和更好的生物相容性。

## 在本知识库中的用法

在给定论文中，non-fouling 是肽段多目标设计里的一个正向优化目标，和[[hemolysis]]、[[solubility]]、[[half-life]]、[[binding affinity]]一起做 trade-off；在 [[MOG-DFM]] 与 [[AReUReDi]] 中，它都被当作可由预训练打分器提供的[[黑盒 oracle|目标函数]]/性质分数，用来引导离散生成朝 [[Pareto front]] 靠近。

## 关键点

- 在本文语境中，non-fouling 是一个需要提高的性质分数，而不是生成模型结构本身。
- 它与[[hemolysis]]、[[solubility]]、[[half-life]]、[[binding affinity]]构成肽段多目标权衡中的核心指标集合。
- 在 MOG-[[Discrete Flow Matching|DFM]] 中，它会进入多目标打分器，参与对离散 token 转移速率的重加权，以推动样本向 Pareto front 靠近。
- 在 AReU[[ReDi]] 中，它同样作为多目标 reward/目标函数的一部分，影响 [[Tchebycheff scalarization]] 和采样接受-拒绝过程。

## 别名

- anti-fouling
- antifouling
- 抗污性
- 抗污能力

## 外部背景

- 常见译法是“抗污性”或“抗污能力”，英文常写作 anti-fouling；在不同语境中也可能与抗生物污染、抗蛋白吸附相关。
- 在生物材料与药物递送背景下，non-fouling 往往意味着降低血清蛋白吸附、细胞黏附和表面污染。
- 在[[分子设计]]任务里，它通常与活性、稳定性、溶解性等指标共同构成[[多目标优化]]；具体实验定义和测量口径待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
