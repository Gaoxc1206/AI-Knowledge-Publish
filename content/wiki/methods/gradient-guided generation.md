---
type: "method"
status: "enriched"
category: "生成方法"
domain: "多目标分子生成"
---
# gradient-guided generation

## 定义

一种在连续潜在空间中的[[Gen-DL|扩散生成]]方法，通过冻结的[[性质预测]]器对去噪轨迹施加梯度，引导生成结果朝目标性质优化。该方法不依赖采样时的反向传播搜索离散[[化学空间|分子空间]]，而是在 [[latent diffusion]] 过程中直接注入[[黑盒 oracle|目标函数]]信息。上下文中它被用于荧光分子的[[多目标优化]]，并可与后续的进化选择框架结合。

## 关键点

- 依赖冻结的 [[Latent Surrogate Predictor|LSP]]（latent surrogate predictor）计算目标性质损失，并对 denoising trajectory 施加梯度引导。
- 在潜在空间中进行引导生成，适合与 [[latent diffusion model]] / [[Diffusion Transformer]] 配合使用。
- 相比纯 [[prompt-conditioned generation]]，更灵活，便于自定义目标函数和适配新任务。
- 可用于多目标优化场景，也可与 [[NSGA-III]] 等进化策略结合做[[分子优化]]。
- 上下文中提到它支持通过微调 LSP 快速迁移到新数据。

## 别名

- guided generation
- gradient guidance
- 梯度引导生成
- gradient-guided diffusion

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
