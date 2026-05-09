---
type: "concept"
status: "enriched"
category: "分子表示"
domain: "分子生成与多目标分子优化"
background: "included"
---
# SMILES

## 标准定义

SMILES（Simplified Molecular Input Line Entry System）是一种将分子结构编码为线性字符串的标准表示方法，用有限字符集和语法规则描述原子、键、分支、环闭合、芳香性等结构信息。它便于存储、检索、传输和作为机器学习模型的输入输出，也是[[化学信息学]]中最常用的分子文本表示之一。

## 在本知识库中的用法

在本知识库给定论文中，SMILES 主要作为小分子的字符串表示，用于[[大语言模型]]的训练语料、prompt 组织以及生成结果输出。论文中，SMILES 被显式用于将分子写入 JSONL 语料并配合性质标签学习“[[性质预测]] + [[controllable generation|条件生成]]”；在[[Multi-objective evolutionary molecule optimization|多目标分子优化框架]]里，SMILES 也作为父代/子代分子的文本表征参与提示构造与候选[[分子生成]]。另有论文指出 [[MOMO]] 可兼容 SMILES、[[SELFIES]] 和图表示，但其实验主要使用预训练[[encoder-decoder|编码器-解码器]]构建的[[连续分子表示|连续隐式化学空间]]，因此 SMILES 在该框架中更多体现为可兼容的离散表示背景，而非核心搜索空间。

## 关键点

- SMILES 是一种把分子结构压缩为线性字符串的表示，适合文本模型、数据库和在线推理流程，也便于与 [[分子生成]]、[[分子优化]] 等任务衔接。
- 在所涉论文中，SMILES 常被直接作为模型输入/输出格式，用于构造包含性质标签、相似分子信息的训练样本。
- SMILES 是这些方法中的“显式分子表示”背景；但部分框架（如 MOMO）会把搜索转移到连续隐空间，再解码回 SMILES 或其他分子表示进行评估。
- 对于大语言模型分子优化，SMILES 的线性文本形式使其可以像自然语言一样被指令微调、提示生成和拒绝采样流程直接处理。
- SMILES 与 [[SELFIES]]、分子图是常见的可互换分子表示方案；不同表示在有效性、可编辑性和模型训练难度上各有差异。

## 别名

- Simplified Molecular Input Line Entry System
- SMILES字符串
- 分子字符串表示
- 线性分子表示

## 外部背景

- SMILES 具有若干常见变体，例如 canonical SMILES、isomeric SMILES 和 random SMILES，分别用于唯一化表示、保留立体化学信息和数据增强，待核对经典来源。
- SMILES 语法对分支、环编号、芳香性和手性有明确编码规则，因此同一分子可能对应多种写法，而标准化流程常用于消除这种不唯一性，待核对经典来源。
- SMILES 与 SELFIES 的差异常被用于讨论分子表示的“可解析性/鲁棒性”权衡：SMILES 更紧凑但更易产生非法串，SELFIES 更强调语法上总是可解码，待核对经典来源。
- SMILES 是化学信息学与分子机器学习中的经典基础表示，广泛用于性质预测、生成模型、虚拟筛选和分子优化，待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
