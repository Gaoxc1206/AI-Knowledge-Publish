---
type: "method"
status: "enriched"
category: "生成模型"
domain: "荧光分子设计与多目标分子优化"
---
# latent diffusion

## 定义

latent diffusion 是在连续潜在空间中进行[[分子生成]]的方法：先将分子编码到 latent vector，再对该表示逐步加噪并通过去噪生成新的 [[latent chemical space|latent representation]]。生成过程中使用 [[Diffusion Transformer]] 预测噪声，最后再由预训练 [[SMILES decoder]] 解码回分子结构。该方法在 [[LUMOS]] 中用于荧光分子的[[controllable generation|可控生成]]，并可结合条件提示或梯度引导进行[[多目标优化]]。

## 关键点

- 在 [[latent chemical space|latent space]] 中而不是直接在 [[SMILES]] 或[[分子图]]空间中扩散，便于连续优化与生成。
- 前向过程对 latent vector 逐步加入 [[Gaussian|Gaussian noise]]，反向过程由 [[Diffusion Model|Diffusion]] Transformer 去噪。
- 生成后的 latent representation 通过预训练 SMILES decoder 转回分子结构。
- 支持 [[prompt-conditioned generation]]，可按溶剂介电常数、吸收峰、发射峰、[[molar extinction coefficient|log ε]]、[[photoluminescence quantum yield|PLQY]] 等[[controllable generation|条件生成]]。
- 也支持 [[gradient-guided generation]]，可借助 [[Latent Surrogate Predictor|LSP]] 对目标性质施加梯度引导，适合多目标优化。

## 别名

- latent diffusion model
- latent-space diffusion
- Diffusion Transformer
- LDM

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
