---
type: "method"
status: "enriched"
category: "优化方法"
domain: "荧光分子设计中的量子化学计算"
---
# GFN2-xTB

## 定义

[[Generative Flow Network|GFN]]2-[[xTB]] 是本文高通量 [[TD-DFT]] 工作流中的一个半经验几何优化步骤，用于在正式[[量子化学计算]]前对分子构象进行快速优化。文中它与 GFN-FF、ALPB 隐式溶剂一起构成预处理流程，之后再进入 [[GPU4PySCF]] 的 SCF 和 TD-DFT 计算。该方法的作用是以较低计算成本为后续物理性质评估提供更合理的初始结构。

## 关键点

- 在论文流程中用于 [[RDKit]] 初始构象粗优化之后的半经验优化步骤。
- 与 GFN-FF、ALPB implicit solvation 共同组成 TD-DFT 计算前的结构预处理。
- 目标是降低后续 SCF / TD-DFT 计算的结构不合理风险，提高高通量流程可用性。
- 该工作流中 GFN2-xTB 并非最终[[性质预测]]模型，而是物理评估管线的一部分。
- 上下文未给出其独立性能指标，待从更多论文中补充。

## 别名

- GFN2-xTB
- xTB
- GFN2-xTB semiempirical method

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
