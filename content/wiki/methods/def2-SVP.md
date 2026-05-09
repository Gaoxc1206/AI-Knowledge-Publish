---
type: "method"
status: "enriched"
category: "实验设置"
domain: "量子化学计算与TD-DFT"
background: "included"
---
# def2-SVP

## 标准定义

def2-SVP 是 Ahlrichs/Weigend def2 基组族中的一个常用分裂价双ζ（split-valence double-zeta）带极化函数的基组，常用于 [[量子化学计算]] 中的几何优化、频率计算和中等规模的 [[TD-DFT]] 评估。它通常在精度与计算成本之间取得平衡，计算开销低于 def2-TZVP、def2-QZVP 等更大基组，但一般比最小基组更适合描述分子电子结构。作为背景知识，它常与 [[PBE0]] 等泛函及[[IEF-PCM|隐式溶剂模型]]联合使用。 

## 在本知识库中的用法

在本知识库所对应论文中，def2-SVP 被用作高通量 [[TD-DFT]] 计算工作流中的基组设置：先经过 [[RDKit]] 构象生成与 [[xTB]] 预优化，再用 [[GPU4PySCF]] 进行 SCF/[[TD-DFT]] 计算时采用 [[PBE0]] + def2-SVP + [[IEF-PCM]]。它主要服务于快速估计荧光分子的吸收峰、发射峰和[[oscillator strength|振子强度]]，并与神经网络偏差校正模块结合，以兼顾[[物理一致性]]和计算效率。

## 关键点

- def2-SVP 是偏“轻量”的基组选择，适合论文中的高通量筛选场景，而不是追求最高精度的最终定量计算。
- 在该框架里，它与 [[PBE0]]、[[IEF-PCM]] 组成快速 [[TD-DFT]] 评估流水线，用于荧光分子的光物理[[性质预测]]。
- 其作用是降低单分子量子化学计算成本，使大规模候选分子的物理评估可行。
- 本论文没有把 def2-SVP 作为方法创新点，而是作为标准计算协议的一部分。
- 若需要更高精度的激发性质，通常会考虑更大基组；但该文更强调速度与可扩展性平衡。

## 别名

- def2-SVP basis set
- def2 SVP
- split-valence polarized basis

## 外部背景

- def2-SVP 属于 def2 基组家族，常见于德国产生的高效基组体系，广泛用于有机分子与过渡金属体系的常规计算。
- 它一般可视为 split-valence polarized basis set，适合作为结构优化、筛选和初步激发态计算的默认选择。
- 常见相关变体包括 def2-TZVP、def2-TZVPP、def2-QZVP 等，精度和成本通常随基组规模增加而提高。
- 待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
