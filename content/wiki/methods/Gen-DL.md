---
type: "method"
status: "enriched"
category: "生成模型"
domain: "荧光分子设计与多目标分子优化"
---
# Gen-DL

## 定义

Gen-DL 指在连续潜在空间中进行[[分子生成]]与优化的扩散式生成流程。根据上下文，它以预训练的分子表示空间为基础，使用 [[latent diffusion model]] / [[Diffusion Transformer]] 进行去噪生成，并可结合目标性质条件或梯度引导实现定向设计。该方法主要用于[[荧光小分子]]的[[inverse design|反向设计]]、 scaffold 优化和多目标性质改进。

## 关键点

- 在 [[latent chemical space|latent space]] 中执行扩散生成，而不是直接在离散 [[SMILES]] 或[[分子图]]空间中搜索。
- 可支持 [[prompt-conditioned generation]]，条件包括溶剂介电常数、吸收峰、发射峰、[[molar extinction coefficient|log ε]] 和 [[photoluminescence quantum yield|PLQY]] 等。
- 可支持 [[gradient-guided generation]]，通过冻结的 [[Latent Surrogate Predictor|LSP]] 对去噪轨迹施加梯度引导。
- 生成结果需要再通过预训练 [[SMILES decoder]] 解码回分子结构。
- 可嵌入[[分子优化]]框架，与 [[NSGA-III]] 和部分噪声去噪循环结合，用于[[多目标优化]]。

## 别名

- latent diffusion model
- Diffusion Transformer
- 扩散生成
- 潜在扩散生成
- diffusion-based generation

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
