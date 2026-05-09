---
type: "method"
status: "enriched"
category: "生成方法"
domain: "多目标荧光分子设计"
---
# LUMOS

## 定义

[[LUMO]]S（[[LUMO|Latent Unified fraMework for fluOrophore deSign]]）是一个面向[[荧光小分子]][[inverse design|反向设计]]的“数据-物理双驱动”生成框架。它将[[分子图]]映射到连续潜在空间，并结合神经网络预测器、快速 [[TD-DFT]] 工作流、[[Diffusion Transformer|潜在扩散模型]]和 [[NSGA-III]]，实现对吸收峰、发射峰、消光系数、[[photoluminescence quantum yield|PLQY]] 等性质的[[多目标优化]]与生成。该框架还支持 scaffold 级全局优化、fragment 级局部优化以及带 [[ADMET]] 约束的[[荧光探针]]设计。

## 关键点

- 使用 [[graph-to-sequence autoencoder]] 构建连续、紧凑的 [[latent chemical space]]，用于分子重构、生成和优化。
- 构建双分支[[性质预测]]器：[[Attentive Graph Predictor|AGP]] 用于快速筛选和可解释分析，[[Latent Surrogate Predictor|LSP]] 用于 latent-to-property 的可微映射和[[gradient-guided diffusion|梯度引导生成]]。
- 引入 TD-DFT + 神经网络混合预测器，对物理计算结果进行偏差校正，以提升 [[OOD 泛化]]和[[物理一致性]]。
- 在 latent space 上训练 diffusion model / Diffusion Transformer，支持 prompt-conditioned generation 和 gradient-guided generation。
- 将部分去噪过程作为 mutation operator，与 NSGA-III 结合进行多目标进化优化。
- 针对荧光分子设计中常见的溶剂效应、scaffold 保持与局部片段改造等约束进行统一建模。

## 别名

- LUMOS
- Latent Unified fraMework for fluOrophore deSign

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
