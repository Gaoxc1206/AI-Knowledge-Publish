---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化"
background: "included"
---
# Weighted Resampling

## 标准定义

Weighted Resampling（加权重采样）是一种按候选样本的非负权重进行抽样、复制或保留的机制；权重越高的样本，被选中进入下一轮的概率越大。它常用于 [[重要性采样]]、[[粒子滤波]] 和 [[顺序蒙特卡洛]] 等方法中，用来让有限样本更接近目标分布，或在搜索过程中偏向高质量候选。

## 在本知识库中的用法

在这篇论文的 [[reverse diffusion]] 推理框架中，Weighted Resampling 是 [[Inference-time Multi-target Generation|IMG]] 的核心步骤：预训练[[扩散模型]]在每个反向扩散步先生成多个候选，再根据多目标权重函数对候选进行加权重采样，从而把生成分布从基分布推向多目标 Boltzmann 目标分布。该机制不需要微调扩散模型，也不依赖可微目标或 surrogate model；在一次推理中可配合不同 preference vector 同时覆盖多个 [[Pareto front]] 的 trade-off 区域。论文还报告，增大 batch size 会提升 hypervolume，说明更大的重采样池有助于多目标探索。

## 关键点

- 本质上是“按权重选样本”的分布调整手段，而不是重新训练模型。
- 可视为把 [[顺序蒙特卡洛]]/[[粒子滤波]] 的重采样思想迁移到扩散模型推理阶段。
- 在本文中，权重由多个目标的优劣共同决定，用于偏向更符合多目标偏好的候选。
- 它作用在 [[reverse diffusion]] 的每一步，因此不仅影响最终输出，也影响中间转移分布。
- 该库中该术语特指 IMG 的 inference-time 选择机制，服务于 [[多目标黑箱优化]] 和[[分子生成]]。

## 别名

- 加权重采样
- weighted sampling
- importance resampling
- resampling with weights

## 外部背景

- 待核对经典来源：在重要性采样中，重采样常用于缓解权重退化，使高权重样本获得更多保留机会。
- 待核对经典来源：在粒子滤波中，按权重复制粒子是维持近似后验分布的重要步骤。
- 待核对经典来源：在[[Evolutionary Algorithm|进化算法]]中，基于适应度的选择与加权重采样在思想上相近，但实现方式不同。
- 待核对经典来源：在生成模型里，加权重采样常与 rejection sampling、guidance 等分布控制方法并列讨论。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
