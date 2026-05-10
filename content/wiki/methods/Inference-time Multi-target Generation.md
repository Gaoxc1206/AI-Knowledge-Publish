---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标黑箱优化与分子生成"
background: "included"
---
# Inference-time Multi-target Generation

## 标准定义

Inference-time Multi-target Generation（推理时多目标生成）是一类在模型推理阶段直接注入多目标偏好、在一次或少量生成过程中同时产生多个 trade-off 候选的生成方法。它通常不修改基础模型参数，而是通过对采样、重采样或轨迹选择进行调控，使输出更接近多目标目标分布。可视为将逐步生成过程与 [[Pareto front]] 覆盖目标结合的推理时优化方法。

## 在本知识库中的用法

在这篇论文中，IMG 指把预训练[[扩散模型]]的 reverse diffusion 过程当作可被重加权的基础分布，在每个反向扩散步根据多目标值计算权重并做 [[weighted resampling]]，从而把生成分布推向多目标 [[Boltzmann distribution]]/mixture target distribution。它被用于黑箱多目标[[分子生成]]，不需要微调 [[DiffSBDD]]，只需在推理时用不同 preference vector 同时覆盖多个 trade-off 区域；实验中在多目标 3D 分子生成任务上取得了比 [[EGD]] 和 DiffSBDD-EA 更高的 hypervolume，并且可作为已有迭代优化框架的模块接入。

## 关键点

- 核心是在推理阶段而不是训练阶段做多目标引导，因此避免了为多目标目标重新标注数据或微调扩散模型的成本。
- 方法将扩散模型的逐步采样过程视为分布转移过程，通过基于目标值的重加权与重采样，把样本分布向目标多目标分布偏移。
- 论文中的 IMG 采用多目标分布混合与不同 preference vector 的批量生成机制，一次 diffusion pass 可覆盖多个 trade-off 区域。
- 在本知识库语境下，它主要用于多目标分子生成/多目标[[黑箱优化]]，而不是泛指任何推理时采样技巧。
- 实验显示 IMG 在相同 [[Oracle Calls|objective evaluation]] budget 下通常能取得更高 hypervolume，且运行时间短于多个 EA-based baseline。

## 别名

- IMG
- Inference-time Multi-target Generation
- 推理时多目标生成

## 外部背景

- 推理时[[可控生成|引导生成]]通常依赖采样偏置、重打分或重采样机制，不一定需要更新模型参数。
- [[多目标优化]]通常用 [[Pareto front]]、hypervolume 等指标评价解集质量与覆盖范围。
- 带权重重采样（importance resampling）和 Boltzmann reweighting 是常见的分布偏置手段，待核对经典来源。
- 扩散模型的反向采样可视为从噪声逐步恢复数据分布的生成轨迹，待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
