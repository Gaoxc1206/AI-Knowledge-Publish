---
type: "model"
status: "enriched"
category: "基础模型"
domain: "多目标语言模型对齐"
background: "included"
---
# GPT-2

## 标准定义

GPT-2 是 OpenAI 提出的[[自回归语言模型]]，采用 [[Transformer]] 解码器架构，通过大规模预训练学习下一个 token 预测；它属于通用的生成式基础模型，常被用作后续微调、[[大语言模型对齐|对齐]]和生成任务的底座。

## 在本知识库中的用法

在这篇论文中，GPT-2 主要作为多目标 [[大语言模型对齐|RLHF 对齐]]的实验底座：作者在 GPT-2 125M 上测试 sentiment + length 任务，在 [[GPT-2 XL]] 1.5B 上测试 humor + length 任务，并进一步在更大模型设置下验证 [[PAreto Multi-Objective Alignment|PAMA]] 的稳定性与可扩展性。论文还用 GPT-2 的训练过程和测试集结果来观察多目标奖励提升是否对应实际生成长度变化。

## 关键点

- GPT-2 是本文使用的基础生成模型，用于承载多目标对齐实验，而不是本文方法本身。
- 论文分别在 GPT-2 125M 与 GPT-2 XL 1.5B 上做了多目标 [[强化学习从人类反馈|RLHF]] 测试，覆盖 sentiment、humor、length 等冲突目标。
- 在 GPT-2 设置下，PAMA 被用来对比 [[MORLHF]] 和 [[MGDA-UB]]，重点检验多目标奖励是否能同时提升。
- GPT-2 的实验结果用于说明 PAMA 在较小和中等规模语言模型上都能保持较稳定的多目标平衡。
- GPT-2 的训练曲线和实际生成长度分析，用于验证 reward 改善是否真正反映到生成行为上。

## 别名

- Generative Pre-trained Transformer 2
- GPT2
- OpenAI GPT-2
- GPT-2 XL

## 外部背景

- 背景知识：GPT-2 通常指 OpenAI 于 2019 年发布的生成式预训练 Transformer 语言模型，面向文本续写与开放式生成。
- 背景知识：它是 decoder-only 架构，按自回归方式建模序列中的下一个 token，适合作为通用文本生成底座。
- 背景知识：常见规模包括 117M、345M、774M 和 1.5B 参数版本，其中 GPT-2 XL 通常指约 1.5B 参数版本。
- 背景知识：GPT-2 常被用作后续[[Instruction Tuning|指令微调]]、偏好对齐和强化学习微调研究中的经典基座模型。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
