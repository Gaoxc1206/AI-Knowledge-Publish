---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子生成"
background: "included"
---
# DiffSBDD

## 标准定义

Diff[[Structure-based Drug Design|SBDD]] 通常指用于结构基础药物设计（SBDD）的扩散式生成方法：以蛋白靶点或结合口袋为条件，借助[[扩散模型]]在三维空间中逐步生成、补全或细化候选分子/配体，并尽量满足几何、化学[[validity|有效性]]与结合相关约束。它更像一种[[controllable generation|条件生成]]器或候选细化器，而不是显式求解[[黑箱优化]]的通用优化器。

## 在本知识库中的用法

在本知识库对应论文中，DiffSBDD 作为与 [[IMG]] 对照的基线方法出现。作者将其与[[进化算法]]结合形成 DiffSBDD-EA，把预训练[[扩散模型]]当作冻结的 refiner，由外部搜索循环驱动候选生成；实验中它在多目标黑箱[[分子生成]]任务上通常不如直接在扩散推理阶段进行[[Weighted Resampling|重采样]]的 IMG，表现为 [[Hypervolume]] 较低、运行时间更长，且较早出现性能平台期。

## 关键点

- DiffSBDD 在此被视为一种基于预训练分布的候选生成/修正模块，而非论文提出的核心方法。
- 论文中的 DiffSBDD-EA 属于“外部优化循环 + 冻结扩散模型”的用法，依赖进化搜索来推动多目标改进。
- 与本文的 IMG 不同，DiffSBDD 没有直接利用扩散反向过程中的目标分布重加权机制。
- 在相同 objective evaluations 下，DiffSBDD-EA 的 Hypervolume 整体低于 IMG，说明其多目标覆盖与[[sample efficiency|样本效率]]较弱。
- 该基线反映了结构基础分子设计中常见的扩散模型用法：先学生成分布，再在下游任务中做筛选或局部细化。

## 别名

- DiffSBDD
- Diffusion for Structure-Based Drug Design
- 基于扩散的结构基础药物设计

## 外部背景

- 结构基础药物设计通常以蛋白靶点/口袋为条件，生成与结合位点形状和化学环境匹配的分子。
- 扩散式 SBDD 一般采用逐步去噪的生成过程，适合建模 3D 几何与分子构象。
- 将扩散模型作为候选生成器并与 [[多目标优化]]、进化算法或打分函数结合，是该方向常见的组合方式。
- DiffSBDD 的原始论文细节与标准缩写含义建议待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
