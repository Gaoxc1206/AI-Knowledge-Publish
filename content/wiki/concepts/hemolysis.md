---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标生物序列优化"
background: "included"
---
# hemolysis

## 标准定义

hemolysis（溶血性）指分子或材料诱导红细胞破裂、释放血红蛋白的倾向。在[[生物序列设计]]，尤其是肽设计中，它通常被当作安全性/血液相容性指标；一般来说，hemolysis 越低越好。

## 在本知识库中的用法

在本知识库给定的两篇论文中，hemolysis 都被作为肽序列多目标设计里的一个可预测、可引导的性质目标：[[MOG-DFM]] 将其与 [[non-fouling]]、[[solubility]]、[[half-life]]、[[binding affinity]] 一起进行多目标引导采样；[[AReUReDi]] 也把它纳入三目标/五目标 binder 设计中的优化集合。这里的 hemolysis 不是单独预测任务的终点，而是 [[多目标优化]] 中需要压低的副作用性质，用来与[[binding affinity|亲和力]]等正向性质做 trade-off，并推动生成结果向 [[Pareto front]] 附近收敛。

## 关键点

- 标准含义上，hemolysis 描述红细胞受损并释放血红蛋白的倾向，在肽/蛋白设计中常作为毒性或血液相容性指标。
- 在这两篇论文里，它被视为一个可由 score function 评估的目标，参与多目标引导的离散序列生成。
- 库内用法明确将 hemolysis 作为需要降低的目标，与 affinity、solubility、non-fouling、half-life 等性质共同权衡。
- 它在 [[肽序列设计]] 场景中更像是安全性约束，而不是独立的主性能指标。
- 在 [[离散生成模型]] 的逐步采样过程中，hemolysis 的改善方向会被编码进引导信号，以帮助样本靠近 [[Pareto front]]。

## 别名

- 溶血性
- 溶血率
- hemolytic activity
- hemolysis rate

## 外部背景

- 常见实验中会用红细胞溶血实验或溶血率来衡量样品的溶血倾向；具体读数和阈值依实验体系而定。
- 在抗菌肽、治疗性肽和递送材料研究中，低 hemolysis 往往表示更好的选择性和更高的血液安全性。
- 文献中常见表述还包括 hemolytic activity、hemolytic toxicity、hemolysis rate；待核对经典来源。
- 在药物筛选中，hemolysis 常与细胞毒性、膜破坏能力和血液相容性一起讨论。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
