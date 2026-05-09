---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "扩散模型与多目标分子生成"
background: "included"
---
# Reverse Diffusion Process

## 标准定义

Reverse Diffusion Process（反向扩散过程）是 [[扩散模型]] 中的生成阶段：从高斯噪声或高噪声状态出发，逐步执行去噪采样，学习一个从 $x_t \to x_{t-1}$ 的逆向转移分布，最终恢复为数据样本。它通常对应于对 [[前向扩散过程]] 的时间反演近似，并可写成一系列条件分布 $p_\theta(x_{t-1}\mid x_t)$ 的迭代采样过程。标准用途是生成新样本、[[controllable generation|条件生成]]和引导式采样。

## 在本知识库中的用法

在本知识库对应论文中，reverse diffusion process 被直接用作 [[IMG]] 的[[Inference-time Optimization|推理时优化]]载体：把预训练[[扩散模型]]每一步的 reverse transition 视为 base distribution，在反向去噪的每个时间步生成多个候选，再依据多目标[[黑盒 oracle|黑盒函数]]的加权得分进行[[Weighted Resampling|重采样]]，从而把生成轨迹推向多目标 Boltzmann 目标分布。这里它不是重新训练后的新模型，而是一个可被 [[重采样]] 和[[Preference Vector|偏好向量]]引导的单次推理过程，用来在不训练 surrogate model 的情况下生成覆盖 [[Pareto front]] 的候选分子。对于 batch 中不同样本，还会分配不同 preference vector，以增强 trade-off 覆盖。

## 关键点

- 标准上，reverse diffusion process 是从噪声到数据的逐步去噪生成过程，核心是迭代采样 $p_\theta(x_{t-1}\mid x_t)$。
- 它依赖于 [[扩散模型]] 已学习到的数据分布结构，因此能够在高维空间中生成复杂样本。
- 本论文将 reverse diffusion process 视为可控的推理时优化通道，而不是仅用于无条件生成的固定采样器。
- IMG 在每个反向扩散步中对多个候选样本做黑盒目标评估，并通过权重函数进行重采样，以近似多目标目标分布。
- 这种用法强调“在生成轨迹内部做优化”，区别于把扩散模型当作外部 [[代理模型]] 或冻结的 refinement 模块。
- 通过为不同样本分配不同偏好向量，reverse diffusion process 可以在一次推理中覆盖多个目标权衡解。

## 别名

- reverse diffusion
- backward diffusion process
- denoising process
- sampling process
- reverse process

## 外部背景

- 背景知识：在 [[Denoising Diffusion Probabilistic Models|DDPM]]、score-based generative models 等框架中，reverse process 通常是与前向加噪过程对应的生成链。
- 背景知识：反向扩散常可结合 guidance 方法使用，例如 classifier guidance 或 classifier-free guidance，以实现条件控制。
- 背景知识：在离散时间实现中，生成通常从 $x_T$ 开始，逐步采样到 $x_0$；在连续时间表述中则对应随机微分方程/概率流 ODE 的逆向求解。
- 背景知识：反向扩散过程也常被称为 denoising process、backward diffusion 或 sampling process。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
