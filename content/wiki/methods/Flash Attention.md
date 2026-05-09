---
type: "method"
status: "enriched"
category: "优化方法"
domain: "小分子生成与化学语言模型训练"
background: "included"
---
# Flash Attention

## 标准定义

Flash Attention 是一种用于加速 [[注意力机制]] 计算的高效实现方法，核心目标是在尽量不改变 [[Transformer]] 注意力结果的前提下，降低显存占用并提升训练/推理效率。它通常通过分块计算、融合算子等方式，避免显式保存完整的注意力矩阵，尤其适合长上下文场景。

## 在本知识库中的用法

在该论文中，Flash Attention 被作为继续预训练化学专用[[大语言模型]]时的训练实现细节之一，与 PyTorch [[FSDP]]、2048 上下文长度一起用于提升训练效率。论文将其用于 Chemlactica-125M、Chemlactica-1.3B 和 Chemma-2B 的训练流程中；其中 Chemma-2B 还使用了 bfloat16。论文没有进一步展开 Flash Attention 的算法推导，而是把它作为支撑大规模分子语料训练的工程组件。

## 关键点

- Flash Attention 的本质是高效实现 [[注意力机制]]，重点在于减少显存和中间张量开销。
- 它特别适合长序列建模，因此常用于 [[Transformer]] 和大[[大语言模型|语言模型]]训练。
- 在本知识库中，它主要是[[化学语言模型]]预训练的工程加速手段，而不是[[分子优化]]目标本身。
- 论文将 Flash Attention 与 FSDP、较长上下文和大规模分子语料结合，用于训练面向 [[SMILES]] 的专用模型。
- 该论文未报告 Flash Attention 的独立消融结果，因此其贡献应理解为训练基础设施的一部分。

## 别名

- FlashAttention
- Flash Attention v1/v2
- 高效注意力
- 注意力加速

## 外部背景

- FlashAttention 系列方法通常通过“在线 softmax + 分块矩阵乘法”来重排注意力计算，以降低显存峰值。
- 待核对经典来源：FlashAttention 最初提出于高效长序列训练场景，常见于大模型训练框架与推理加速实现中。
- 与标准注意力相比，它通常更关注系统效率，而不是改变模型结构或学习目标。
- 在超长上下文或大 batch 训练时，Flash Attention 往往能显著改善可训练性。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
