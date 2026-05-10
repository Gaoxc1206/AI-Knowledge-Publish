---
type: "method"
status: "enriched"
category: "搜索方法"
domain: "序列生成与解码"
background: "included"
---
# Beam Search

## 标准定义

Beam Search（束搜索）是一种常用的近似搜索/解码策略：在序列生成的每一步，保留得分最高的前 k 个候选（beam），继续向前扩展并比较，最后从有限候选中选出整体得分最高的输出。它介于[[贪心搜索]]与穷举搜索之间，常用于机器翻译、文本生成和语音识别等任务。

## 在本知识库中的用法

待从更多论文中补充。当前提供的论文上下文未明确说明在 [[C-MuMOInstruct]]、[[GeLLM4O-C]] 或相关[[分子优化]]实验中使用了 Beam Search。

## 关键点

- Beam Search 通过 beam width 控制搜索宽度；宽度越大，越不容易陷入局部最优，但计算开销也越高。
- 它是一种近似解码方法，不保证全局最优；相比[[贪心搜索]]更稳健，但比穷举搜索更高效。
- 在语言模型生成中，Beam Search 常用于提高输出序列的整体分数与稳定性。
- 它可能降低生成多样性，并带来短序列偏好、重复片段等问题。
- 在本知识库中，暂未见该论文对 Beam Search 的明确使用说明；待从更多论文中补充。

## 别名

- 束搜索
- beam search decoding
- 束宽搜索

## 外部背景

- 经典背景中，Beam Search 常被视为一种启发式状态空间搜索方法，也可理解为对动态规划式路径搜索的近似实现。
- 常见变体包括 length normalization、coverage penalty 和 diverse beam search，用于缓解长度偏置与重复问题。
- 在[[可控生成|条件生成]]任务中，Beam Search 往往能提升结果的可读性与指标表现，但未必适合需要高多样性的场景。

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
