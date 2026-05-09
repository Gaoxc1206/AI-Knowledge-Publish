---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "荧光分子生成与多目标优化"
background: "included"
---
# LUMO

## 标准定义

L[[unconstrained molecular optimization|UMO]] 在标准化学术语中通常指最低未占据分子轨道（Lowest Unoccupied Molecular Orbital）；如果作为方法名或框架名，则必须结合具体论文语境来理解。就通用方法论而言，当前证据不足以把“LUMO”定义为一个已公认的独立算法概念，待从更多论文中补充。

## 在本知识库中的用法

本库中该节点主要对应论文提出的 [[LUMOS]] 框架：将分子映射到连续[[潜在空间]]，再结合快速[[性质预测器]]、[[TD-DFT]]校正流程、潜在[[扩散模型]]与[[NSGA-III]]，实现[[荧光小分子]]的[[controllable generation|条件生成]]和[[多目标优化]]。它既支持 scaffold 级全局搜索，也支持 fragment 级局部编辑，并可叠加溶剂、[[ADMET]] 等约束。

## 关键点

- 在本文语境下，LUMO 更接近一个面向荧光小分子[[inverse design|反向设计]]的统一生成框架，而不是单独的[[性质预测]]模型。
- 其核心是把离散分子结构压缩到连续[[潜在空间]]，从而支持条件生成、梯度引导和进化式搜索。
- 框架把数据驱动的[[性质预测器]]与物理驱动的[[TD-DFT]]结果结合，以提升速度、稳定性和外推能力。
- 潜在[[扩散模型]]负责生成候选分子，[[NSGA-III]]负责处理多个冲突目标的 Pareto 选择。
- 该框架面向[[荧光分子设计]]中的 absorption/emission、[[molar extinction coefficient|log ε]]、PLQY、[[Stokes shift]] 等多目标权衡。
- 若只看通用术语，LUMO 也可能指最低未占据分子轨道，因此在笔记中需要和方法名 LUMOS 做好区分。

## 别名

- LUMOS
- Latent Unified fraMework for fluOrophore deSign
- Lowest Unoccupied Molecular Orbital
- 最低未占据分子轨道

## 外部背景

- 在量子化学中，LUMO 通常指最低未占据分子轨道（Lowest Unoccupied Molecular Orbital），与 HOMO 相对。待核对经典来源
- 连续[[潜在空间]]常用于把离散分子表示转化为可优化向量，以便做生成、插值和梯度搜索。待核对经典来源
- 多目标分子优化通常用 Pareto 前沿、进化算法或约束优化处理多个冲突目标。待核对经典来源
- 物理约束或量子化学校正常用于缓解纯数据驱动模型在分布外样本上的不稳定性。待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
