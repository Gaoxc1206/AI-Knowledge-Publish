---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子生成"
---
# Inference-time Multi-target Generation

## 定义

Inference-time Multi-target Generation（[[IMG]]）是一种在[[扩散模型]]推理阶段进行多目标引导的生成方法。它不重新训练扩散模型，也不依赖可微 surrogate，而是在反向生成的每一步对候选样本按多目标权重进行[[Weighted Resampling|重采样]]，把预训练扩散模型的生成分布推向目标多目标分布。其目标是在单次推理中生成覆盖 [[Pareto front]] 的多目标候选集合，并提升[[sample efficiency|样本效率]]。

## 关键点

- 将[[多目标黑盒优化|多目标黑箱优化]]表述为[[分布式优化]]问题，用 Boltzmann 形式的目标分布引导生成。
- 在扩散模型每个反向时间步，先采样多个候选，再根据多目标期望值计算权重并重采样。
- 通过 [[Preference Vector|preference vector]] 为不同样本分配不同目标偏好，从而覆盖不同 trade-off 解。
- 可用 [[Quasi-Monte Carlo]] 在正超球面上生成更均匀的[[Preference Vector|偏好向量]]，以改善 Pareto front 覆盖多样性。
- 论文中该方法在[[多目标分子设计|多目标分子生成]]任务上表现出更高的 [[Hypervolume]] 和更好的样本效率。

## 别名

- IMG
- Inference-time Multi-target Generation
- 推理时多目标生成

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
