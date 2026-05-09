---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "扩散模型推理时多目标黑箱优化"
background: "included"
---
# Weighted Resampling

## 标准定义

Weighted Resampling（加权重采样）是一种基于样本权重进行重新抽样的通用方法：先从某个基础分布或候选集合中生成多个样本，再根据每个样本相对目标分布的权重、得分或重要性系数进行保留、复制或淘汰，从而让后续样本更接近目标分布。它常与[[重采样]]、[[重要性采样]]、[[粒子滤波]]等思想相关；在生成任务中，也可理解为一种“按分数筛选候选并偏向高质量样本”的通用机制。

## 在本知识库中的用法

在本知识库对应论文中，Weighted Resampling 指 [[扩散模型]] 反向推理阶段的候选筛选机制：每一步先从预训练 reverse transition 中采样多个候选，再用多目标偏好权重计算 $W(x;\lambda)$，按该权重进行重采样或贪婪选择，把生成分布逐步推向多目标 [[Boltzmann分布]] 目标。它是 [[IMG]]（[[Inference-time Multi-target Generation]]）的核心操作，用于在不重新训练模型、也不训练可微 surrogate 的情况下，直接实现[[多目标黑盒优化|多目标黑箱优化]]。

## 关键点

- 标准上，Weighted Resampling 的核心是“先采样、再按权重重选”，本质上是一种把候选集合向目标分布拉近的近似 [[重采样]] 过程。
- 在本文中，权重由多[[黑盒 oracle|目标函数]]值与[[Preference Vector|偏好向量]]共同决定，形式上对应 $W(x;\lambda)$，用于把 base distribution 转成目标分布。
- 它被嵌入到[[扩散模型]]每个反向时间步，而不是作为外部的后处理步骤，因此能直接影响生成轨迹。
- 与传统 [[多目标优化]] 的外循环搜索不同，这里更强调在单次推理中通过重采样实现 Pareto trade-off 覆盖。
- 该机制依赖候选 buffer 的规模：候选越多，重采样越有机会保留高质量多目标样本。

## 别名

- weighted sampling
- importance resampling
- resampling with weights
- 加权采样
- 加权重抽样

## 外部背景

- 在粒子滤波和 [[Sequential Monte Carlo]] 中，weighted resampling 通常用于缓解权重退化：复制高权重粒子、丢弃低权重粒子。
- 在 [[重要性采样]] 中，样本权重反映 proposal 分布与 target 分布之间的差异；重采样可把有限样本近似为目标分布。
- 在[[Energy-Based Model|能量模型]]或基于分数的生成框架中，按能量/得分加权选择候选，也可视为 weighted resampling 的一种变体。
- 待核对经典来源

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
