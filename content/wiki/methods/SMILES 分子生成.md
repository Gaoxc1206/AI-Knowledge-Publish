---
type: "method"
status: "enriched"
category: "生成模型"
domain: "分子生成"
---
# SMILES 分子生成

## 定义

[[SMILES]] 是一种把分子表示为字符串的方式，可作为[[分子生成模型]]的输入或输出表示。在给定论文中，SMILES 主要作为可兼容的分子表示之一，被[[encoder-decoder|编码器-解码器]]映射到[[连续隐空间]]，再解码回分子。该论文并未专门聚焦“纯 [[SMILES generation|SMILES 生成]]”，而是说明其多目标进化框架可以处理 SMILES/[[SELFIES]] 等字符串表示。更具体的 SMILES 生成方法，待从更多论文中补充。

## 关键点

- SMILES 是字符串式分子表示，可被用于[[分子生成]]任务。
- 论文中的 [[MOMO]] 方法支持 SMILES 作为可兼容的表示之一。
- 生成/优化过程主要在[[连续分子表示|连续隐式化学空间]]中进行，而不是直接在离散 SMILES 空间中手工编辑。
- 分子先被编码为隐向量，再解码回分子字符串进行性质评估。
- 该上下文没有给出专门针对 SMILES 生成的独立算法细节，待从更多论文中补充。

## 别名

- SMILES generation
- SMILES-based molecular generation
- SMILES 生成

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
