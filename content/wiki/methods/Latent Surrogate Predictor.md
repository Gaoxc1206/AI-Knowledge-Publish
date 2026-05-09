---
type: "method"
status: "enriched"
category: "代理模型"
domain: "多目标荧光分子设计"
---
# Latent Surrogate Predictor

## 定义

Latent Surrogate Predictor（LSP）是一种从潜在表示到分子性质的可微代理预测器，用于学习 latent-to-property mapping。它基于冻结的 [[MolCT]] 编码器提取分子 [[latent chemical space|latent representation]]，并结合溶剂图编码后，通过 MLP 回归目标性质。相比图级预测器，LSP 的优势在于可以直接对 latent vector 求梯度，从而支持 [[gradient-guided generation]]。

## 关键点

- 输入通常包括[[分子图]]经冻结 [[MolCT Graph Encoder|MolCT encoder]] 得到的 latent representation，以及由 [[MPNN]] 编码的溶剂图表示。
- 核心作用是预测 latent 空间中的性质映射，而不是直接从离散分子结构做端到端优化。
- 模型是可微的，因此可用于对扩散采样轨迹施加梯度引导。
- 在作者框架中，LSP 是后续 [[gradient-guided generation|guided generation]] 的关键组件。
- 文中提到其准确性略低于 [[Attentive Graph Predictor|AGP]]，但更适合优化与生成控制。

## 别名

- LSP
- latent surrogate model
- latent-to-property predictor

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
