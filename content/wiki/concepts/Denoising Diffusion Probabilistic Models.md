---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "扩散模型与分子生成"
background: "included"
---
# Denoising Diffusion Probabilistic Models

## 标准定义

DDPM（Denoising [[Diffusion Model|Diffusion]] Probabilistic Models，去噪扩散概率模型）是一类 [[扩散模型]]：它先通过前向过程逐步向数据加入噪声，再学习一个 [[反向扩散过程]] 逐步去噪并生成样本。训练时通常通过噪声预测、[[ELBO|变分下界]]或等价形式来拟合数据分布；生成时则从纯噪声出发迭代采样得到数据。

## 在本知识库中的用法

在这篇论文中，DDPM 被当作[[Diffusion Model for Black-box Optimization|推理时多目标生成]]的预训练生成骨干：作者直接把[[扩散模型]]的反向转移分布视为 base distribution，在每个去噪步生成多个候选，再根据多目标黑盒目标的加权得分进行[[Weighted Resampling|重采样]]，从而把生成过程推向目标的多目标 Boltzmann 分布。这里的 DDPM 不需要重新训练或微调，而是作为 [[IMG]]（[[Inference-time Multi-target Generation]]）中的推理载体，用于在单次推理中产出覆盖 [[Pareto front]] 的候选分子。

## 关键点

- 标准 DDPM 通过“加噪—去噪”两阶段学习复杂数据分布，适合高维生成任务。
- 在本库对应论文里，DDPM 的反向转移分布被直接用作[[多目标优化]]中的基础分布，不再只是无[[controllable generation|条件生成]]器。
- IMG 在每个去噪步对多个候选做目标评估，并用重采样把样本推向多目标偏好更高的区域。
- 这种用法把 [[黑盒优化]] 变成了推理时的分布引导问题，而不是重新训练模型的问题。
- 通过为 batch 中不同样本分配不同的 [[偏好向量]]，DDPM 可以一次生成不同权衡的候选集合，提升 [[Pareto front]] 覆盖。

## 别名

- DDPM
- 去噪扩散概率模型
- Denoising Diffusion Probabilistic Model

## 外部背景

- 经典 DDPM 的核心是固定前向噪声日程与可学习的逆向去噪网络，待核对经典来源。
- 常见训练目标是预测噪声或预测清洁样本，也可与变分下界表述互相转换，待核对经典来源。
- DDPM 及其变体常与 [[score-based model]]、DDIM、classifier guidance / classifier-free guidance 一起讨论，待核对经典来源。
- 由于迭代采样开销较大，DDPM 常通过减少采样步数、蒸馏或加速求解器来改进推理效率，待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
