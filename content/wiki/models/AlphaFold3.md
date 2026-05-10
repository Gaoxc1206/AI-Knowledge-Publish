---
type: "model"
status: "enriched"
category: "基础模型"
domain: "蛋白质复合物结构预测"
background: "included"
---
# AlphaFold3

## 标准定义

AlphaFold3 是面向 [[蛋白质结构预测]] 与复合物建模的深度学习模型，可联合预测蛋白质、核酸、小分子及其相互作用构象。它通常被视为一类用于 [[复合物结构预测]] 的通用基础模型，输出可用于评估结合界面、构象合理性与预测置信度。

## 在本知识库中的用法

在本知识库所给上下文中，AlphaFold3 不是生成模型，而是被用作候选肽-靶蛋白复合物的结构验证工具：作者用它计算 ipTM 来支持 [[AReUReDi]] 和 [[Multi-Objective-Guided Discrete Flow Matching|MOG-DFM]] 设计出的 binder 具有潜在结合合理性，并与 [[AutoDock VINA]] 的 docking score 一起作为计算层面的辅助证据。

## 关键点

- AlphaFold3 的标准作用是做 [[复合物结构预测]]，可用于评估蛋白-肽等相互作用的结构可行性。
- 在当前知识库论文中，它被用来给设计出的 peptide binders 计算 ipTM，属于后验验证而非优化目标本身。
- 它与 [[AutoDock VINA]] 在这里属于互补的计算证据：前者偏结构置信度，后者偏对接能量/打分。
- 本库上下文没有显示 AlphaFold3 参与采样、搜索或[[多目标优化]]过程；这些任务由[[Discrete Flow Matching|离散流]]模型与多目标引导方法完成。
- 若后续论文继续出现 AlphaFold3，建议重点记录其用于蛋白-肽、蛋白-核酸或蛋白-小分子复合物的哪一种验证场景。

## 别名

- AlphaFold 3
- AF3

## 外部背景

- AlphaFold3 是 AlphaFold 系列的后续工作，通常被认为更强调多分子复合物与相互作用建模。
- 它常被用于结构生物学中的计算预测、候选筛选和构象解释，但不能替代实验验证。
- 常见使用场景包括蛋白-蛋白、蛋白-核酸、蛋白-配体复合物预测。
- 待核对经典来源

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
