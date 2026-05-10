---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "多目标荧光分子设计"
background: "included"
---
# FluoDB

## 标准定义

FluoDB 通常可理解为面向荧光小分子研究的结构-性质数据集，用于支持 [[分子表示]] 学习、荧光[[分子性质预测|性质预测]]与[[分子生成]]等任务。此类数据集一般包含分子结构及其与荧光相关的实验或计算性质，常见目标包括吸收峰、发射峰、[[Stokes shift]]、摩尔消光系数和量子产率等；是否包含更细的溶剂/实验条件与具体规模，待从更多论文中补充。

## 在本知识库中的用法

在本知识库对应论文中，FluoDB 是 LUMOS 框架的核心训练与评测数据集，用于训练图编码器、双分支性质预测器以及[[潜在空间]][[扩散模型|扩散生成模型]]。论文基于 FluoDB 对 [[FluoDB]] 内部测试集、random split、[[scaffold split]] 和 [[fluorophore split]] 进行比较，重点评估模型在 OOD 泛化场景下对吸收峰、发射峰、log ε 和 PLQY 的联合预测能力。该数据集也用于验证潜在空间重构质量、化学相似性保持，以及 prompt-conditioned / gradient-guided 生成结果的性质可控性。

## 关键点

- FluoDB 在本文中是[[荧光分子设计]]的主数据集，服务于 [[多目标优化]]、性质预测和潜在空间生成三类任务。
- 数据集围绕荧光相关性质构建，核心预测目标包括吸收峰、发射峰、log ε 和 PLQY，并强调吸收/发射之间的物理一致性。
- 论文使用 FluoDB 进行 random split、[[scaffold split]] 和 fluorophore split 对比，其中 fluorophore split 更接近新骨架发现的 [[OOD泛化]] 场景。
- FluoDB 不仅用于训练预测器，也用于评估 autoencoder 重构、latent similarity 与化学相似性的对应关系。
- 在本文语境中，FluoDB 是支撑 [[潜在扩散模型]] 与 [[TD-DFT]]/NN 混合校正的关键数据基础。
- 关于数据集的精确规模、收录分子范围和标注流程，待从更多论文中补充。

## 别名

- FluoDB
- Fluorescence Database
- 荧光分子数据集

## 外部背景

- 荧光分子数据集通常由分子结构、溶剂信息和光谱/量子效率等标签组成，适合做多任务回归与生成建模。
- 用于荧光[[分子生成|分子设计]]的数据集常面临样本稀缺、分布偏移和实验条件不一致等问题，因此常结合物理计算或迁移学习。
- 分子数据集的常见划分方式包括随机划分、骨架划分和按功能团/骨架划分；后两者更能检验 [[OOD泛化]]。
- 关于 FluoDB 的统一公开定义、字段规范与基准划分方式，待核对经典来源。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
