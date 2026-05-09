---
type: "method"
status: "enriched"
category: "其他"
domain: "量子化学计算"
---
# TDDFT-ris

## 定义

[[TD-DFT|TDDFT]]-ris 是文中用于高通量激发态性质估计的一种 [[TD-DFT]] 计算流程。它被嵌入到[[荧光分子设计]]框架中，与 [[RDKit]]、[[xTB]] 和 [[GPU4PySCF]] 等步骤结合，用于快速计算前 5 个激发态并估计吸收相关性质。该流程具体的“ris”含义和实现细节，待从更多论文中补充。

## 关键点

- 用于论文中的高通量 TD-DFT 工作流，服务于荧光分子性质评估。
- 计算前 5 个激发态，并用于估计 absorption maximum 等性质。
- 与 [[PBE0|PBE0 functional]]、[[def2-SVP|def2-SVP basis set]]、[[IEF-PCM]] [[IEF-PCM|隐式溶剂模型]]一起使用。
- 位于 RDKit 构象生成、xTB 优化之后，由 GPU4PySCF 执行 SCF 和 TD-DFT 计算。
- 在该框架中，它作为物理锚定的评价手段，用来增强模型的 [[OOD 泛化]]与[[物理一致性]]。

## 别名

- TD-DFT-RIS
- RI-TDDFT
- TDDFT

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
