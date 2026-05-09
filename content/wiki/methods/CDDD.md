---
type: "method"
status: "enriched"
category: "分子表示"
domain: "分子表示学习与隐式化学空间"
background: "included"
---
# CDDD

## 标准定义

CDDD 通常指 [[cddd model|Continuous Data-Driven Descriptors]]，是一种基于 [[自监督学习]] 的分子表征方法：通过 [[encoder-decoder]] 将离散分子（如 [[SMILES]]）映射为连续的低维向量，再从该向量重构回分子，从而得到可用于检索、相似性计算与优化的 [[连续分子表示]]。它的核心价值在于把离散化学结构压缩到平滑、可操作的潜在空间中，便于后续搜索与编辑。待从更多论文中补充。

## 在本知识库中的用法

在本知识库所对应论文中，CDDD 作为预训练的[[encoder-decoder|编码器-解码器]]模型，用来构建 [[隐式化学空间]]；先导分子先被编码成隐向量，再在该空间中进行[[Pareto-based evolutionary search|多目标进化搜索]]，最后解码回分子并计算性质。它在这里主要承担“表示学习底座”的角色，为 [[MOMO]] 提供连续、可搜索的分子潜在空间。

## 关键点

- CDDD 的核心是把离散分子结构转成连续向量表示，方便在连续空间中进行优化与采样。
- 它通常依赖 [[encoder-decoder]] 训练目标，从大量无标签分子中学习通用化学先验，较少依赖性质标签。
- 在该论文中，CDDD 被用作 [[隐式化学空间]] 的构建工具，支撑 MOMO 在潜在空间里做选择、[[crossover|交叉]]和变异。
- 该表示既可服务于重构，也可服务于性质优化，因此更像“可操作的分子坐标系”而不只是静态特征。
- 论文中提到 CDDD 可兼容不同分子表示形式，但具体实现以预训练 [[encoder-decoder|codec]] 为主，细节待从更多论文中补充。

## 别名

- Continuous Data-Driven Descriptors
- continuous data-driven descriptor
- 连续数据驱动描述符
- CDDD

## 外部背景

- CDDDD 的全称通常被解释为 Continuous Data-Driven Descriptors，常见于分子表征与[[性质预测]]任务，待核对经典来源。
- 它常与 [[SMILES]] 重构式自编码器一类方法并列讨论，也可与图表示学习方法比较。
- 由于潜在空间是连续的，CDDD 常被用于插值、相似分子搜索、[[分子优化]]和生成建模。
- 不同论文中对 CDDD 的训练目标、编码器结构和解码器形式可能略有差异，需结合具体实现核对。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
