---
type: "model"
status: "enriched"
category: "基础模型"
domain: "小分子性质预测与优化"
background: "included"
---
# Chemma-2B

## 标准定义

Chemma-2B 可视为一种面向化学文本与分子序列的 2B 级[[大语言模型]]：通常以 [[SMILES]] 和性质文本为输入，通过自回归语言建模学习分子结构、性质与[[可控生成|条件生成]]之间的对应关系。作为背景知识，这类模型常用于[[分子性质预测|性质预测]]、条件[[分子生成]]、以及在黑盒目标下作为候选生成器或搜索策略的一部分；其核心能力来自对大规模序列语料的预训练与后续领域继续训练。

## 在本知识库中的用法

在本文知识库中，Chemma-2B 是基于 Gemma 继续训练得到的分子大语言模型之一，与 [[Chemlactica-125M]]、[[Chemlactica-1.3B]] 并列使用。它在约 110M 个小分子与约 40B token 的分子/性质语料上训练，用于 [[SMILES]] 性质预测、条件生成和黑盒 [[black-box oracle]] 下的分子优化。论文将其作为群体式优化框架中的生成器，在 [[PMO benchmark]]、Docking 多目标优化、QED+similarity 约束设计以及 [[MoleculeNet]]/[[ADMET]] 回归任务中评估，并报告其在 PMO 总分上优于先前方法；在部分任务上，[[动态 fine-tuning]] 会影响其优化表现。

## 关键点

- Chemma-2B 是论文中的 2B 级分子语言模型，属于继续训练后的 [[基础模型]]，用于学习分子结构与性质的联合表示。
- 它接受由 [[SMILES]]、性质标签、相似分子提示等组成的文本化输入，并以 causal language modeling 目标训练。
- 在本知识库中，它不仅用于性质预测，也被放入群体式分子优化流程中，结合 prompt 采样、oracle 评分与动态 fine-tuning 迭代搜索高分分子。
- 论文报告其在 [[PMO benchmark]] 上取得较强结果，并在 Docking、多性质约束设计与 MoleculeNet/ADMET 任务中展示了较好的效果。
- 模型表现对采样策略、repetition penalty、undesired token suppression 和是否动态 fine-tuning 都较敏感。
- 从实验结论看，Chemma-2B 更像一个可用于分子生成与优化的通用序列模型，而不是专门为单一性质设计的定制优化器。

## 别名

- Chemma 2B
- Gemma-based Chemma
- Chemma-2B-39B

## 外部背景

- 大语言模型（LLM）通常指基于 Transformer 的自回归或双向预训练模型，经过大规模语料训练后可迁移到下游任务。
- 在化学领域，SMILES 序列化使分子可以像文本一样被建模，因此 LLM 可用于分子表示学习、性质预测与条件生成。
- 继续训练（continued pretraining / domain-adaptive pretraining）是常见做法，即在通用预训练模型基础上加入领域语料。
- 待核对经典来源：将语言模型直接用于黑盒分子优化的标准框架与评价协议在不同论文中实现不完全一致。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
