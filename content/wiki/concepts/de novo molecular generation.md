---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "分子生成"
background: "included"
---
# de novo molecular generation

## 标准定义

de novo [[分子生成|molecular generation]] 指在不直接依赖已有候选分子的前提下，从头生成满足目标约束的新分子结构的任务或过程。它通常与[[生成模型]]、[[分子表示学习]]和[[潜在空间]]中的采样、条件控制或优化结合，用于探索巨大的[[化学空间]]并提出可合成、可评估的新分子。

## 在本知识库中的用法

在这篇论文中，de novo molecular generation 主要指 LUMOS 在连续[[latent chemical space|潜在化学空间]]中生成新的荧光小分子：先通过 [[graph-to-sequence autoencoder]] 学得[[潜在空间]]，再用 [[latent diffusion]] / [[Diffusion Transformer]] 在该空间中进行条件生成，最后由 [[SMILES decoder]] 还原为具体分子结构。其生成条件可包括 λabs、λemi、log ε、PLQY 和溶剂介电常数，并且既支持 [[prompt-conditioned generation]]，也支持基于 LSP 的[[gradient-guided diffusion|梯度引导生成]]；此外，生成过程还可嵌入[[多目标优化]]与 [[NSGA-III]] 的后代产生环节，用于荧光分子的反向设计。

## 关键点

- 标准含义上，它强调“从头生成”新结构，而不是仅对已知分子做局部改造；常见实现会依赖[[生成模型]]或搜索策略在化学空间中提出候选。
- 在本文中，de novo generation 不是直接在离散分子图上盲采样，而是首先进入[[潜在空间]]，再用 latent diffusion 完成条件生成，提高可控性与搜索效率。
- LUMOS 支持基于性质条件的生成，条件变量包括 λabs、λemi、log ε、PLQY 和溶剂介电常数，面向荧光分子的定制化设计。
- 该框架还支持梯度引导生成：利用 LSP 将目标性质的优化信号传回生成轨迹，从而把生成与[[多目标优化]]连接起来。
- 生成结果最终通过 SMILES decoder 还原为分子结构，因此这里的 de novo generation 同时依赖表示学习、条件建模和解码器质量。
- 在该论文语境下，它既是独立的荧光分子生成能力，也是扩散突变与 NSGA-III 进化搜索中的后代生成机制。

## 别名

- de novo generation
- 从头分子生成
- 从头分子设计
- molecular generation from scratch
- de novo molecular design

## 外部背景

- 常见实现路线包括基于 [[SMILES]] 的语言模型生成、基于分子图的生成、VAE/flow/扩散模型生成等；具体优缺点与适用场景待核对经典来源。
- de novo generation 常与虚拟筛选区分：前者更强调主动提出新结构，后者更强调在既有库中筛选。
- 常见评价维度包括 validity、uniqueness、novelty、多样性以及目标性质达标率；待核对经典来源。
- 在药物设计和材料设计中，de novo generation 往往需要同时满足可合成性、约束条件和多目标性质优化。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
