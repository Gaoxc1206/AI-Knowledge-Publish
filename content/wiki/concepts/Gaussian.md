---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "潜在扩散模型与多目标荧光分子设计"
background: "included"
---
# Gaussian

## 标准定义

Gaussian 通常指高斯分布（正态分布），是一类由均值和方差参数化的连续概率分布；在机器学习中也常扩展为高斯噪声、高斯核或高斯径向基函数（Gaussian RBF），用于平滑建模、特征映射和随机扰动。

## 在本知识库中的用法

在该论文框架中，Gaussian 主要出现在两处：一是 [[latent diffusion]] 的前向过程，把潜在向量逐步加入 Gaussian noise，实现连续空间中的去噪生成；二是 [[prompt-conditioned generation]] 中，用 Gaussian RBF embedding 对条件变量（如介电常数、λabs、λemi、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]]）做平滑编码，再注入[[Diffusion Transformer|扩散 Transformer]]。这里的 Gaussian 更偏向“平滑噪声建模/条件嵌入”而非单独的[[性质预测]]对象。

## 关键点

- 标准意义上，Gaussian 既可以指正态分布，也可以指基于 exp(-||x-c||^2 / 2σ^2) 的高斯核或高斯径向基函数。
- 在本知识库的 [[LUMOS]] 框架里，Gaussian noise 用于 latent diffusion 的前向加噪过程，帮助在连续潜在空间中学习生成与去噪。
- Gaussian RBF embedding 被用于把连续条件变量平滑映射到模型输入空间，支持对溶剂与光物理目标的条件控制。
- 这里的 Gaussian 作用更偏向 [[latent diffusion]] 和条件编码的数学工具，而不是独立的化学性质或分子表示。
- 由于论文上下文主要涉及生成与控制，Gaussian 的语义重点是“概率扰动 + 平滑嵌入”，而非单纯统计分布本身。

## 别名

- 正态分布
- 高斯分布
- Gaussian distribution
- Gaussian noise
- 高斯核

## 外部背景

- 高斯分布是经典概率论与统计学中的基础分布，常用于表示测量误差、随机扰动和噪声模型。
- Gaussian kernel / RBF kernel 是核方法中的常见选择，具有局部平滑和距离衰减特性，待核对经典来源。
- [[扩散模型]]通常采用高斯噪声作为前向扩散的基础扰动形式，这是现代生成模型中的通用设定，待核对经典来源。
- 高斯基函数也常用于将连续标量条件映射为高维特征，以增强神经网络对连续控制变量的表达能力。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
