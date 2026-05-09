---
type: "method"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化、分子生成"
background: "included"
---
# cddd model

## 标准定义

[[CDDD]]（Continuous Data-Driven Descriptors）是一类[[encoder-decoder]]式的分子表示模型，目标是把离散的分子字符串映射到连续的[[latent space]]，再从连续向量解码回分子表示。它通常被用作可平滑搜索的[[分子表示学习|分子嵌入]]空间，支持分子插值、优化和相似性检索等任务。作为背景知识，它更强调“连续可操作的分子表示”而不是直接预测单一性质。

## 在本知识库中的用法

在本文的 [[MOMO]] 框架中，[[深度生成模型|cddd]] model 作为预训练 [[encoder-decoder|codec]] 用来构建[[隐式化学空间]]：先将先导分子编码为 latent vector，再在连续空间中进行进化搜索，并把 offspring 解码成分子序列后计算性质。论文实验里，它主要承担“把离散分子转成可搜索连续表示”的角色，而不是作为[[性质预测]]器或最终优化目标本身。

## 关键点

- 在标准意义上，CDDD 是一种分子[[encoder-decoder]]表示：编码离散分子，解码连续向量，方便在[[latent space]]里做连续优化。
- 在这篇论文里，CDDD 被用来搭建[[隐式化学空间]]，使 MOMO 可以把[[多目标分子优化]]转化为连续空间中的进化搜索。
- MOMO 的进化算子作用在 latent vector 上，而性质评价发生在解码后的分子层面；因此 CDDD 是连接“连续搜索”和“分子可解释评价”的桥梁。
- 相比直接在[[SMILES]]或[[分子图]]上做[[crossover|交叉]]/变异，CDDD 所提供的连续表示通常更平滑，也更利于保留有效分子结构，但效果依赖预训练模型质量。
- 本文没有展开 CDDD 的训练数据、训练目标或结构细节，因此这些实现层信息需要结合原始模型论文进一步确认。

## 别名

- CDDD
- Continuous Data-Driven Descriptors
- continuous data-driven descriptor model

## 外部背景

- CDDD 常被视为 continuous molecular descriptors 的一种实现，用于把分子映射到可计算、可插值的连续向量空间。
- 这类模型常见用途包括[[分子优化]]、分子插值、近邻检索和生成式建模；其核心优势是把离散化学结构转为连续优化问题。待核对经典来源
- CDDD 的实际效果通常取决于解码有效率、潜空间平滑性以及训练语料覆盖范围。待核对经典来源
- 不同论文中的 CDDD 版本可能在输入表示、训练任务和数据构造上有差异，不能默认等同于所有分子自编码器。待核对经典来源

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
