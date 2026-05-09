---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "荧光分子生成与多目标优化"
background: "included"
---
# prompt-conditioned generation

## 标准定义

prompt-conditioned generation（提示[[controllable generation|条件生成]]）是指在生成过程中显式输入一个或多个条件 prompt，让模型据此调整采样分布并生成满足约束的样本。条件可以是离散标签、连续属性、文本描述、结构片段或环境变量，常见于[[条件生成]]、[[扩散模型]]等框架中。其核心是把“想要什么”编码进生成过程，而不是只在生成后再做筛选。

## 在本知识库中的用法

在本知识库对应论文中，prompt-conditioned generation 主要指 [[LUMOS]] 的 [[latent diffusion]] 生成模式：在潜在空间中把介电常数、λabs、λemi、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等条件作为 prompt 输入，经 [[Gaussian]] RBF embedding 编码后，通过 [[adaptive layer normalization]] 注入到[[潜在扩散模型]]/[[Diffusion Transformer|DiT]] 中，直接生成荧光分子。该用法强调推理阶段无需反向传播，速度快，适合按目标性质进行[[controllable generation|可控生成]]；但论文也指出对 log ε 和 PLQY 的控制较弱，且在分布尾部 prompt 上 novelty 与 [[uniqueness]] 会下降。

## 关键点

- 本质上是“条件驱动的生成”而不是无条件采样：模型根据 prompt 改变生成分布，使输出朝目标性质或约束靠拢。
- 在该论文中，prompt 不是自然语言，而是荧光分子的连续属性条件，包括溶剂介电常数和多种光物理/理化指标。
- 条件先被嵌入为连续表示，再通过[[adaLN]]注入扩散主干，实现对[[潜在扩散模型]]的显式控制。
- 这种方式适合快速推理和批量生成，不需要像 gradient-guided generation 那样在采样时做梯度回传。
- 论文中的经验结论是：对部分目标（如 λabs、λemi）控制较好，但对 log ε、PLQY 的可控性仍有限，且稀缺条件下的生成多样性会下降。

## 别名

- 条件生成
- 条件式生成
- conditional generation
- prompt-based generation
- prompt conditioning

## 外部背景

- 提示条件生成通常有三类条件来源：类别标签、连续属性向量和文本/结构提示；在生成图像、文本、分子时都很常见。
- 在分子生成里，prompt 可以对应目标性质、骨架约束、片段约束、反应条件或环境信息，属于更广义的[[条件分子生成]]。
- 连续条件常通过嵌入层、交叉注意力、前缀 token 或调制层注入生成网络；待核对经典来源
- prompt-conditioned generation 与 classifier guidance / classifier-free guidance 在“按条件控制生成”这一目标上相近，但实现机制不同；待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
