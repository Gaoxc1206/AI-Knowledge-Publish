---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化与扩散模型推理时优化"
background: "included"
---
# Diffusion Model for Black-box Optimization

## 标准定义

[[扩散模型]]用于[[黑盒优化|黑箱优化]]，通常指将[[扩散模型]]作为生成先验或搜索过程的载体，在[[黑盒 oracle|目标函数]]不可微、只能评估的[[黑箱优化]]场景下，通过采样引导、重加权、[[Weighted Resampling|重采样]]或搜索策略，在推理阶段寻找高质量候选。若是多目标情形，目标通常不是单点最优，而是近似[[Pareto front]]，并尽量平衡多个冲突目标。与基于梯度的优化不同，这类方法更依赖生成分布、候选筛选与目标权重设计；与传统进化搜索相比，扩散模型往往能提供更强的数据先验和更好的高维生成能力。

## 在本知识库中的用法

在本知识库对应论文中，该方法特指：不重新训练扩散模型、也不训练可微 surrogate model，而是在扩散模型反向生成的推理阶段进行[[多目标黑盒优化|多目标黑箱优化]]。论文将预训练反向转移分布视为 base distribution，通过多目标期望值诱导的权重函数和重采样，把生成分布推向多目标 Boltzmann 目标分布；该流程被命名为 IMG（[[Inference-time Multi-target Generation]]）。它支持在单次推理中生成覆盖不同 trade-off 的候选，并通过 batch 级 [[Preference Vector|preference vector]] 与 [[Quasi-Monte Carlo]] 生成[[Preference Vector|偏好向量]]来提升对偏好空间和 [[Pareto front]] 的覆盖。

## 关键点

- 核心思路是在推理阶段直接操控扩散采样分布，而不是把扩散模型当作外部的冻结 refiner。
- 论文把多目标黑箱优化写成分布优化问题，并用加权重采样近似把 base distribution 推向目标分布。
- IMG 在每个反向时间步生成多个候选，再按多目标权重选择/重采样，以提高样本质量与效率。
- 该方法面向多目标任务，强调生成一组非支配解而非单一最优解，目标是逼近[[Pareto front]]。
- 论文在分子生成任务中报告了更高的 Hypervolume，且在较少 objective evaluations 下优于若干基线。
- 当用户未指定偏好分布时，论文用 Quasi-Monte Carlo 均匀生成 preference vectors，以改善 trade-off 覆盖。

## 别名

- diffusion-based black-box optimization
- diffusion model for black-box optimization
- inference-time multi-target generation
- IMG
- 扩散模型黑箱优化

## 外部背景

- 待核对经典来源：扩散模型的推理时引导（如基于 score / reward / classifier 的 guidance）是把外部目标注入生成过程的常见范式。
- 待核对经典来源：黑箱优化中常见的多目标方法包括 [[进化算法]]、NSGA-II、SPEA2 和 MOEA/D。
- 待核对经典来源：KL 正则化的分布优化常会导出指数倾斜形式的最优分布，并与 Boltzmann 形式相关。
- 待核对经典来源：在生成模型中用重采样/拒绝采样来近似目标分布，是一种常见但计算代价较高的策略。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
