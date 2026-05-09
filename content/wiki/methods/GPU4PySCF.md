---
type: "method"
status: "enriched"
category: "计算化学方法"
domain: "荧光分子设计与量子化学计算"
---
# GPU4PySCF

## 定义

GPU4PySCF 是论文中高通量 [[TD-DFT]] 工作流的一部分，用于在 GPU 上执行 SCF 和 TD-DFT 计算。该方法与 [[RDKit]]、[[xTB]] 预优化以及 [[PBE0]]/[[def2-SVP]]/[[IEF-PCM]] 设置结合，用来估计荧光分子的吸收和发射相关性质。它在文中主要承担物理评价与高通量筛选的角色。具体实现细节在给定上下文中未完全展开，待从更多论文中补充。

## 关键点

- 用于高通量 TD-DFT 计算流程中，执行 SCF 和 TD-DFT 计算。
- 与 RDKit 构象生成、xTB 预优化步骤衔接，形成较完整的量子化学评估链路。
- 文中使用 [[PBE0|PBE0 泛函]]、[[def2-SVP|def2-SVP 基组]]和 IEF-[[IEF-PCM|PCM]] [[IEF-PCM|隐式溶剂模型]]。
- [[TDDFT-ris]] 被用于计算前 5 个激发态，并据此估计 λabs 等性质。
- 该模块服务于荧光分子的物理导向筛选和数据-物理双驱动建模。

## 别名

- GPU4PySCF
- GPU-accelerated PySCF

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
