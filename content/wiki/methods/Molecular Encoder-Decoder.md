---
type: "method"
status: "enriched"
category: "分子表示"
domain: "分子生成与多目标分子优化"
background: "included"
---
# Molecular Encoder-Decoder

## 标准定义

Molecular Encoder-Decoder 指将分子从离散表示（如 [[SMILES]]、分子图）映射到 [[潜在空间]]，再由解码器从潜在表示重建或[[分子生成|生成分子]]的模型框架。一般由 encoder 提取连续表示、decoder 还原结构，可用于分子重建、插值、生成和性质优化。若采用 [[自监督学习]] 预训练，这类模型还能在缺少显式标签的情况下学习通用化学表示。背景上，它也常被称为 molecular autoencoder 或 [[cddd|codec]]。

## 在本知识库中的用法

在本知识库所对应论文中，Molecular Encoder-Decoder 主要指预训练的 encoder-decoder codec（实验中采用 [[cddd]]）所学习到的连续[[隐式化学空间]]。[[MOMO]] 先将先导分子编码为连续向量，在该空间中进行多目标进化搜索，再将候选向量解码回分子并计算性质与相似性。它的作用不是单独完成生成，而是为 [[分子优化]] 提供可搜索的连续表示，并支撑基于 [[Pareto Front|Pareto前沿]] 的多目标选择。

## 关键点

- 标准上，encoder 负责把分子离散结构压缩为连续向量，decoder 负责从向量恢复分子结构；这种框架本质上是在学习一个可操作的 [[连续表示]]。
- 在该论文中，这一模块是 MOMO 的基础设施：先导分子被编码后，搜索在 [[潜在空间|latent space]] 中展开，再解码回分子空间进行评估。
- 其核心价值在于把原本离散、受化学规则强约束的搜索，转移到更平滑的[[潜在空间|隐空间]]中，便于结合 [[Evolutionary Algorithm|进化算法]] 做[[多目标优化]]。
- 论文使用的 encoder-decoder codec 通过无标注分子预训练获得化学知识，因此对任务特定标注数据的依赖较低。
- 解码后的分子会用性质指标和相似性指标共同评价；其中相似性计算使用 [[Morgan fingerprints]] 和 [[Tanimoto similarity]]。
- 在本库语境里，它更像“搜索空间构造器”而不是最终优化器：优化策略由 MOMO 的多目标机制负责，编码器-解码器负责提供可搜索、可还原的分子表示。

## 别名

- 分子编码器-解码器
- molecular autoencoder
- encoder-decoder codec
- 分子编解码器
- 连续分子表示模型

## 外部背景

- 分子 encoder-decoder 常见于自动编码器、变分自编码器和相关生成模型，用于学习分子结构的低维表示与可逆映射。
- 待核对经典来源：cddd 常被视为一种通用的连续分子表示学习方法，适合做分子插值与属性优化的基础编码器。
- 在分子生成任务中，encoder-decoder 往往与 [[潜在空间]] 优化、[[Bayesian optimization|贝叶斯优化]]或梯度引导搜索结合使用。
- 不同变体可能采用 SMILES、分子图或 3D 结构作为输入输出，因此“encoder-decoder”更像一类方法框架，而非单一模型。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
