---
type: "method"
status: "enriched"
category: "生成模型"
domain: "蛋白质序列生成"
background: "included"
---
# Diffusion Model

## 标准定义

Diffusion Model（[[扩散模型]]）是一类生成模型：先通过逐步加噪把数据分布变成近似简单分布，再学习反向去噪过程，从噪声中逐步生成样本。常见实现包括基于 [[score matching]] 的连续扩散、以及离散/连续时间的去噪生成框架。它的优势通常在于生成质量稳定、训练相对容易、可通过条件输入或 guidance 做[[controllable generation|可控生成]]。

## 在本知识库中的用法

在这篇论文的上下文里，Diffusion Model 只是作为生命科学[[inverse design|逆向设计]]中的一类[[深度生成模型]]被背景性提及，用来说明蛋白质/抗体序列生成并不只依赖 [[Generative Adversarial Network|GAN]]、[[变分自编码器|VAE]] 或 [[Energy-Based Model]]。论文没有展开 diffusion model 的具体算法、训练或实验结果，因此在本知识库中它目前更多是“相关背景方法”，而不是该论文的核心方法。

## 关键点

- 标准上，Diffusion Model 通过“正向加噪—反向去噪”建模数据分布，适合从随机噪声逐步生成高质量样本。
- 常见用途包括[[controllable generation|条件生成]]、编辑和受约束生成，可与属性控制或 guidance 结合。
- 在本论文中，它被放在生命科学深度生成模型的背景脉络里，用来对比说明[[蛋白质序列设计]]中的生成范式选择。
- 这篇论文的核心并不是 diffusion，而是将[[多目标优化]]与 [[Energy-Based Model]] 结合，形成 [[pcEBM]]；因此 diffusion 相关内容属于背景知识。
- 若要把 diffusion model 进一步用于蛋白质序列/抗体设计，还需要结合序列离散化、条件控制和可行性约束等专门设计。

## 别名

- diffusion model
- 扩散模型
- DDPM
- score-based model
- 去噪扩散模型

## 外部背景

- 经典扩散模型通常对应 DDPM、score-based generative modeling 等路线；具体归属与首篇来源可待核对经典来源。
- 扩散模型在生成任务中常通过采样步数、噪声调度和条件引导来控制生成质量与多样性。
- 相较于一次性生成模型，扩散模型通常采样较慢，但训练稳定性和样本质量常较好。
- 在离散序列场景中，扩散模型常需要对 token 级别的噪声过程或连续松弛进行专门改造；待从更多论文中补充。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
