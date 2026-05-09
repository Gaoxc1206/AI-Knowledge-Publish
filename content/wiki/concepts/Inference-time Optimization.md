---
type: "concept"
status: "enriched"
category: "优化方法"
domain: "扩散模型推理与多目标黑盒优化"
background: "included"
---
# Inference-time Optimization

## 标准定义

Inference-time Optimization（推理时优化）是指在模型参数固定不变的前提下，利用推理阶段可获得的信息，对生成结果进行额外的搜索、筛选、重打分、[[Weighted Resampling|重采样]]或约束引导，以提升输出质量或满足目标约束的一类方法。它通常发生在[[扩散模型]]采样、[[黑盒优化]]搜索或其他生成过程的测试阶段，核心是“优化输出而不是再训练模型”。

## 在本知识库中的用法

在这篇论文中，Inference-time Optimization具体指在[[扩散模型]]反向生成过程中进行多目标引导：把预训练 [[Reverse Diffusion Process|reverse transition]] 视作 base distribution，每一步采样多个候选，评估它们的黑盒多目标值，再按多目标 Boltzmann 权重进行[[重采样]]，从而把生成分布推向目标多目标分布。论文将这一过程实现为 [[IMG]]（[[Inference-time Multi-target Generation]]），并进一步通过 batch 内不同的 [[Preference Vector|preference vector]] 覆盖不同的[[Pareto front]]权衡解。

## 关键点

- 标准意义上，它属于“测试/推理阶段做优化”，与重新训练或微调模型不同，通常不更新参数，而是通过搜索、选择或重采样改进输出。
- 在本库对应论文中，它被用于扩散模型的反向采样过程：从冻结的生成分布中产生多个候选，再依据多目标权重函数进行筛选。
- 论文中的核心做法是用多目标 Boltzmann 形式把 base distribution 重新加权，使单次推理即可朝目标分布移动，而不是把扩散模型当作外部固定 refiner。
- 该方法特别适合[[黑盒目标]]：[[黑盒 oracle|目标函数]]不可微、只能评估，因此更依赖推理阶段的候选生成与重排序。
- 它强调[[sample efficiency|样本效率]]与覆盖性：通过不同 preference vector 和批量重采样，在一次推理中生成多个 trade-off 不同的候选。

## 别名

- 推理时优化
- 测试时优化
- test-time optimization
- inference-time optimization
- inference-time guidance

## 外部背景

- 常见变体包括 test-time optimization、test-time search、inference-time guidance、best-of-N sampling 等，待核对经典来源。
- 在生成模型中，推理时优化常与[[重打分]]、[[拒绝采样]]、beam search 或约束解码结合，待核对经典来源。
- 在扩散模型语境下，推理时优化常表现为对采样轨迹施加引导项、修改转移分布或对多个样本进行后验筛选，待核对经典来源。
- 与训练时优化相比，推理时优化更依赖可计算的目标函数、采样预算和候选池大小。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
