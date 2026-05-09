---
type: "method"
status: "enriched"
category: "理论概念"
domain: "量子化学计算 / TD-DFT"
---
# PBE0

## 定义

PBE0 是本文用于高通量 [[TD-DFT]] 工作流中的一种泛函设置，用来计算荧光分子的激发性质。它与 [[def2-SVP|def2-SVP 基组]]和 [[IEF-PCM]] [[IEF-PCM|隐式溶剂模型]]一起使用，并通过 [[GPU4PySCF]] 完成相关电子结构计算。文中将其作为物理驱动评估的一部分，用于估计吸收峰等性质。

## 关键点

- 出现在作者的 TD-DFT + 神经网络混合预测流程中，作为[[量子化学计算]]的核心设置之一。
- 与 [[def2-SVP|def2-SVP basis set]] 和 IEF-[[IEF-PCM|PCM]] implicit solvent 联合使用。
- 用于计算前 5 个激发态，并进一步估计 λabs 等光物理性质。
- 属于物理可解释、但计算成本较高的评价手段，因此适合与神经网络偏差校正结合。
- 本文未提供 PBE0 的更多原理性说明，待从更多论文中补充。

## 别名

- PBE0 functional
- PBE0 泛函
- PBE1PBE

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
