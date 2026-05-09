---
type: "method"
status: "enriched"
category: "其他"
domain: "小分子大语言模型训练"
---
# FSDP

## 定义

FSDP 在本文中作为训练基础设施的一部分，与 [[Flash Attention]] 一起用于训练化学专用[[大语言模型]]。上下文只说明它被用于支持较大模型的 causal language modeling 训练、上下文长度 2048 以及 bfloat16 等配置，但没有提供其具体算法细节。待从更多论文中补充。

## 关键点

- 本文在训练 Chemlactica-125M、Chemlactica-1.3B 和 Chemma-2B 时使用了 PyTorch FSDP。
- FSDP 与 Flash Attention 一起用于支持大规模分子[[大语言模型|语言模型]]训练。
- 上下文仅能确认它出现在模型预训练设置中，未说明其具体并行策略或通信细节。
- 本节点目前只能把 FSDP 视为分布式训练相关方法，更多细节待从更多论文中补充。

## 别名

- Fully Sharded Data Parallel
- FSDP

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
