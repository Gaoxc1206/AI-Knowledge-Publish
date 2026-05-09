---
type: "method"
status: "enriched"
category: "生成方法"
domain: "扩散模型逆问题与推理时采样"
background: "included"
---
# Diffusion Posterior Sampling

## 标准定义

Diffusion Posterior Sampling（DPS）是一类基于[[扩散模型]]先验的后验采样方法：在反向生成过程中，把观测约束、似然项或数据一致性项注入采样轨迹，从而近似从[[后验分布]] p(x|y) 中采样。它常用于[[逆问题]]，目标是在不重新训练生成模型的前提下，把生成结果约束到满足观测的解空间中。

## 在本知识库中的用法

待从更多论文中补充

## 关键点

- 核心思想是把预训练[[扩散模型]]当作先验，在采样阶段完成“生成 + 约束”的联合求解。
- DPS 通常通过修改反向扩散中的更新方向，引入观测一致性、数据保真项或近似似然梯度。
- 它常见于[[逆问题]]场景，如重建、修复、超分辨率和压缩感知等。
- 与[[controllable generation|条件生成]]、引导采样和后验推断关系密切，但重点是推理时求解而不是额外训练判别器。
- 在当前知识库上下文中，相关论文强调的是推理时多目标[[Weighted Resampling|重采样]]与分布引导；这与 DPS 的“采样阶段施加目标约束”思想相近，但并未直接给出 DPS 的明确用法。

## 别名

- DPS
- Diffusion Posterior Sampling
- 扩散后验采样

## 外部背景

- 常用于图像去噪、超分辨率、修复、压缩感知重建等生成式逆问题。
- 与[[后验分布]]采样、likelihood guidance、plug-and-play 和 score-based inverse solving 有概念关联。
- 通常假设存在一个可用的预训练扩散先验，再通过观测模型把生成分布拉向满足测量的解。
- 待核对经典来源

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
