---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化与分子生成"
---
# Preference-Guided Diffusion

## 定义

一种在[[扩散模型]]推理阶段进行偏好引导的多目标生成方法。它不重新训练扩散模型，也不依赖可微 surrogate，而是在反向生成的每一步根据多个黑盒目标的加权权重对候选样本[[Weighted Resampling|重采样]]。其目标是把预训练扩散模型的生成分布推向多目标 Boltzmann 目标分布，从而生成覆盖 [[Pareto front]] 的候选解。

## 关键点

- 核心做法是在扩散反向过程中的每个时间步生成多个候选，并按多目标权重进行重采样或贪婪选择。
- 方法从[[Distributional Optimization|分布优化]]角度把单目标最优分布写成指数倾斜形式，并扩展为多目标 mixture 分布。
- 使用[[Preference Vector|偏好向量]] λ 控制不同目标之间的 trade-off，不同样本可以对应不同偏好，从而覆盖不同的 Pareto 权衡。
- 当没有给定偏好分布时，使用 [[Quasi-Monte Carlo]] 在正超球面上生成更均匀的 [[Preference Vector|preference vector]]s。
- 论文报告该方法在[[多目标分子设计|多目标分子生成]]任务上具有更高的 [[Hypervolume]] 和更好的[[sample efficiency|样本效率]]。
- 该方法可与其他 baseline 结合，例如 [[EGD]]+[[IMG]] 进一步提升性能。

## 别名

- IMG
- Inference-time Multi-target Generation
- preference-guided inference-time diffusion

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
