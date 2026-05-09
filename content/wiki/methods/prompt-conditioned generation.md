---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标荧光分子设计"
---
# prompt-conditioned generation

## 定义

一种基于条件提示词进行[[分子生成]]的方法。在 [[LUMOS]] 中，prompt-conditioned generation 指在[[Diffusion Transformer|潜在扩散模型]]中注入溶剂介电常数和目标光物理性质等条件，从而直接生成满足指定目标的荧光分子。该方法强调推理阶段无需反向传播，生成速度较快，但在部分性质和分布尾部条件上控制能力有限。

## 关键点

- 条件输入包括溶剂介电常数 ε、λabs、λemi、[[molar extinction coefficient|log ε]] 和 [[photoluminescence quantum yield|PLQY]]。
- 条件先通过 [[Gaussian|Gaussian RBF]] embedding 编码，再通过 [[adaptive layer normalization]]（[[adaptive layer normalization|adaLN]]）注入 [[Diffusion Transformer]]。
- 生成过程在 [[latent chemical space|latent space]] 中进行，之后再解码为分子结构。
- 相比 [[gradient-guided generation]]，prompt-conditioned generation 推理更快，不需要采样时反向传播。
- 在 log ε 和 PLQY 的控制上相对较弱，且分布尾部 prompt 下 [[uniqueness]] 和 novelty 会下降。
- 作者认为性能受限与荧光标注数据稀缺有关。

## 别名

- 条件生成
- prompt-conditioned generation
- conditioned generation
- prompt-based generation

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
