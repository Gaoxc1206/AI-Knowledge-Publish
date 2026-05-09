---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# IMG

## 定义

IMG（[[Inference-time Multi-target Generation]]）是一种在[[扩散模型]]推理阶段进行多目标引导的生成方法。它不重新训练扩散模型，而是在反向生成过程中对多个候选样本进行多目标评估，并按[[Weighted Resampling|加权重采样]]将生成分布推向多目标 Boltzmann 目标分布。该方法旨在一次推理中生成覆盖 [[Pareto front]] 的多目标候选样本，适用于黑盒[[多目标优化]]场景。

## 关键点

- 在扩散模型反向推理每一步生成多个候选，并根据多目标[[黑盒 oracle|目标函数]]值计算权重后[[Weighted Resampling|重采样]]。
- 将预训练扩散模型的转移分布视为 base distribution，通过[[Distributional Optimization|分布优化]]视角把样本推向目标分布。
- 支持为不同 batch 样本分配不同 [[Preference Vector|preference vector]]，从而覆盖不同的目标权衡解。
- 当没有给定偏好分布时，可用 [[Quasi-Monte Carlo]] 在正超球面上生成[[Preference Vector|偏好向量]]，以提升覆盖均匀性。
- 论文结果显示，IMG 在相同 objective evaluations 下通常获得更高的 [[Hypervolume]]，[[sample efficiency|样本效率]]优于基于[[进化算法]]的基线。
- IMG 还可以与其他方法结合使用，例如 [[EGD]]+IMG 进一步提升性能。

## 别名

- Inference-time Multi-target Generation
- IMG
- inference-time multi-target generation

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
