---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标分子优化"
---
# VSeqtoSeq

## 定义

给定上下文中未直接出现 VSeqtoSeq 的明确论文定义。上下文只表明相关方法采用了 [[encoder-decoder]] / [[encoder-decoder|codec]] 将分子映射到[[连续分子表示|连续隐式化学空间]]，再解码回[[化学空间|分子空间]]进行优化搜索。VSeqtoSeq 与这一序列到序列式表示学习流程的具体对应关系，待从更多论文中补充。

## 关键点

- 给定上下文未直接说明 VSeqtoSeq 的具体结构、输入输出形式或训练目标，需待从更多论文中补充。
- 上下文中的相关技术是用预训练 encoder-decoder 学习连续[[隐式化学空间]]，而不是直接在离散 [[SMILES]] 或[[分子图]]上操作。
- 该[[隐式化学空间|隐空间]]表示用于支持后续的选择、[[crossover|交叉]]、变异等进化搜索操作。
- 分子性质与相似性评估仍在解码后的分子空间中完成。
- 当前上下文更明确对应的是 [[MOMO]] 框架及其 codec 模块，而非 VSeqtoSeq 本身。

## 别名

- 无

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
