---
type: "method"
status: "enriched"
category: "理论概念"
domain: "量子化学计算"
---
# IEF-PCM

## 定义

IEF-PCM 在该论文中作为 [[TD-DFT]] 计算流程里的隐式溶剂处理方式出现，用于描述溶剂环境对分子激发性质的影响。它与 [[PBE0]]、[[def2-SVP]] 等设置一起用于高通量计算荧光分子的吸收与发射相关性质。上下文只说明它是隐式溶剂模型，更多具体实现细节待从更多论文中补充。

## 关键点

- 用于 [[GPU4PySCF]] 的 TD-DFT 计算流程中，作为隐式溶剂设置的一部分。
- 与 [[PBE0|PBE0 functional]]、[[def2-SVP|def2-SVP basis set]] 一起使用。
- 用于荧光分子性质估计时考虑溶剂环境效应。
- 上下文未进一步展开其数值实现或参数设置，待从更多论文中补充。

## 别名

- IEF-PCM
- PCM
- 隐式溶剂模型

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
