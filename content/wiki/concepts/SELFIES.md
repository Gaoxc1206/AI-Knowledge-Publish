---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "多目标分子优化与分子生成"
background: "included"
---
# SELFIES

## 标准定义

SELFIES（Self-Referencing Embedded Strings）是一类用于分子建模的字符串表示。它通过专门的语法约束，使字符串与化学结构之间保持更强的一一对应关系，目标是提高分子表示在[[生成模型]]中的鲁棒性。与传统[[SMILES]]相比，SELFIES 的优势通常在于：生成过程中更不容易产生无效分子，因此常被用于[[分子生成]]、性质优化和表示学习等任务。

## 在本知识库中的用法

在本知识库当前上下文中，SELFIES 被作为 [[MOMO]] 可兼容的[[SMILES|分子字符串表示]]之一，与 [[SMILES]]、[[分子图]]一起构成可输入到 [[编码器-解码器]] 的离散分子表示；随后由模型学习到的 [[隐式化学空间]] 承载进化搜索。这里的用法重点不是 SELFIES 本身的语法细节，而是把它视作一种可被编码、解码并参与[[多目标分子优化]]流程的表示形式。

## 关键点

- SELFIES 是一种面向 [[分子表示]] 的字符串编码，设计目标之一是减少无效分子生成。
- 它常与 [[生成模型]]、[[编码器-解码器]] 结合，用于把离散分子映射到可操作的表示空间。
- 相较于 [[SMILES]]，SELFIES 更强调语法鲁棒性，适合需要大规模采样的[[分子设计]]任务。
- 在本库所涉论文中，SELFIES 不是算法核心，而是 MOMO 可兼容的输入表示之一。
- MOMO 将分子先映射到连续的 [[隐式化学空间]] 再做多目标进化，因此 SELFIES 在这里主要承担“可表示、可编码”的角色。

## 别名

- Self-Referencing Embedded Strings
- SELFIES字符串表示
- SELFIES表示

## 外部背景

- SELFIES 的经典特点是“任意字符串都可映射为有效分子”这一鲁棒表示思想，待核对经典来源。
- 常见用途包括分子生成、分子插值、性质优化与表示学习。
- SELFIES 也可作为图模型或[[大语言模型|语言模型]]的序列输入，但具体效果依赖 tokenization 与训练方式，待核对经典来源。
- 在一些工作中，SELFIES 被视为比 [[SMILES]] 更适合探索式生成的字符串表示。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
