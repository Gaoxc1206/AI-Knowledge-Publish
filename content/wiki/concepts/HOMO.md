---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "荧光分子设计 / 分子轨道理论"
background: "included"
---
# HOMO

## 标准定义

HOMO（highest occupied molecular orbital，最高占据分子轨道）是分子在基态下能量最高、通常仍被电子占据的轨道。它常与 [[LUMO]] 一起用于描述分子的前线轨道特征，并与电子给体能力、氧化倾向、以及轨道能隙相关。

## 在本知识库中的用法

在该论文语境中，HOMO 主要作为物理解释指标出现：作者提到 [[Attentive Graph Predictor|AGP]] 的注意力分布与 DFT 计算得到的 [[HOMO]]/[[LUMO]] 分布有较好对应，用来说明模型学到了一定的前线轨道相关结构-性质关系；此外，HOMO 也属于 [[TD-DFT]] 这类物理评价流程所依赖的分子电子结构背景。

## 关键点

- HOMO 是基态中能量最高的已占据轨道，通常用于刻画分子的电子供体特征和反应活性。
- 在[[荧光分子设计]]中，HOMO 往往与吸收/发射、电子转移和能隙分析等物理解释相关。
- 本库中的用法主要是解释性而非直接优化目标：作者用它来对照 AGP 的注意力结果与 [[TD-DFT]] 计算。
- HOMO 常与 [[LUMO]] 联合使用，构成前线轨道分析的基础。
- 对于该论文的[[多目标优化]]框架，HOMO 更像是辅助理解模型与量子化学结果一致性的概念节点。

## 别名

- 最高占据分子轨道
- Highest Occupied Molecular Orbital
- 前线占据轨道

## 外部背景

- 常与 [[LUMO]] 共同讨论，是前线分子轨道理论的核心概念。
- HOMO-[[LUMO]] gap 常被用于粗略估计电子跃迁能量和化学反应活性，待核对经典来源。
- 在 [[TD-DFT]] 或光谱解释中，HOMO→L[[unconstrained molecular optimization|UMO]] 跃迁常作为最低能吸收的近似解释，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
