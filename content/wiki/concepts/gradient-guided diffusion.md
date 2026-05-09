---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "多目标分子优化"
background: "included"
---
# gradient-guided diffusion

## 标准定义

gradient-guided diffusion 指在 [[扩散模型]] 的采样或去噪过程中，利用外部[[黑盒 oracle|目标函数]]、可微代理模型或能量函数的梯度，对生成轨迹施加引导，使样本更倾向于满足指定属性、约束或偏好。它通常发生在连续表示空间（如 [[潜在空间]]）中，可把“生成”与“优化”统一起来，适合做[[controllable generation|条件生成]]和约束优化。

## 在本知识库中的用法

在 [[LUMOS]] 框架中，gradient-guided diffusion 指在 [[latent diffusion]] 的去噪过程中，利用冻结的 [[潜在代理预测器]]（[[Latent Surrogate Predictor|LSP]]）对目标性质构造损失，并对当前 latent 的去噪轨迹施加梯度引导，从而朝着期望的吸收峰、发射峰、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等方向优化。它与 [[prompt-conditioned generation]] 互补：前者不依赖采样时反向传播，更灵活，适合多目标与新任务适配；同时还可作为 evolutionary framework 中“扩散突变”的生成算子，与 [[NSGA-III]] 结合进行[[多目标分子优化]]。

## 关键点

- 本质上是把 [[梯度引导]] 嵌入 [[扩散模型]] 的采样过程，用目标梯度修正去噪方向，而不是只靠无条件随机采样。
- 在 [[LUMO]]S 中，梯度主要来自冻结的 LSP，因此可以直接对 latent vector 求导，适合在连续 [[潜在空间]] 中做性质定向生成。
- 它用于荧光分子的多目标优化，可同时考虑 λabs、λemi、log ε、PLQY 等目标，而不只是单一性质。
- 相较于纯 prompt-conditioned generation，这种方法更灵活，便于为新性质或新约束快速定义优化目标。
- 在该知识库语境里，它还可作为“扩散突变”算子，与 [[NSGA-III]] 共同构成局部搜索与全局 Pareto 选择的组合流程。

## 别名

- 梯度引导扩散
- guided diffusion
- gradient-guided sampling
- 梯度指导扩散

## 外部背景

- 在生成模型中，梯度引导常见于条件采样、classifier guidance 或基于能量的引导采样，用于把无条件生成结果推向目标区域。
- 对于离散结构如分子，梯度引导通常先在连续表示（潜在向量、嵌入或图的松弛表示）中进行，再解码回可解释结构。
- 待核对经典来源：不同论文对 guidance、classifier-free guidance、energy guidance 的命名与实现细节并不完全一致。
- 梯度引导的优点是可解释、可组合多目标；局限是依赖代理模型质量，且可能带来分布外偏移或采样不稳定。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
