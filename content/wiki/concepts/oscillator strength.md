---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "荧光分子设计、量子化学"
background: "included"
---
# oscillator strength

## 标准定义

oscillator strength（振子强度）是描述电子跃迁“强弱”的无量纲物理量，常用于衡量某一激发态跃迁的吸收概率或跃迁偶极强度。一般来说，振子强度越大，对应的吸收峰通常越强；它在光谱学中常与吸收带面积、跃迁偶极矩以及 [[TD-DFT]] 输出结果相关。

## 在本知识库中的用法

在这篇论文的快速 [[TD-DFT]] 工作流中，oscillator strength 被用于估计 [[molar extinction coefficient|摩尔消光系数]]（[[molar extinction coefficient|log ε]]）：先计算前若干个激发态，再取与目标吸收跃迁相关的振子强度作为吸收强度的物理依据。作者同时明确指出，oscillator strength 与 log ε 并不等价，只是近似相关的物理量，因此它在库中的用法更接近“物理启发的辅助估计量”，而不是直接优化目标。

## 关键点

- oscillator strength 是电子跃迁强度的标准量，常用于表征吸收峰强弱；在[[荧光分子设计]]中，它与 [[molar extinction coefficient|log ε]] 的关系最直接。
- 本知识库中的用法来自快速 [[TD-DFT]] 评估流程：通过计算激发态的振子强度，辅助推断吸收相关性质，而不是单独作为设计目标。
- 论文明确提醒：振子强度只能近似反映吸收能力，不能直接替代 [[molar extinction coefficient|log ε]]。
- 它属于物理可解释的量子化学输出，适合与数据驱动预测器结合，用于提升分子性质评估的可迁移性。
- 在该框架里，oscillator strength 主要服务于吸收性质估计，与 [[absorption maximum|λabs]]、[[emission maximum|λemi]] 等指标共同构成多目标评价的一部分。

## 别名

- 振子强度
- oscillator strength
- f 值

## 外部背景

- 振子强度通常由[[量子化学计算]]直接给出，尤其常见于激发态计算和光谱模拟中。
- 它与吸收峰强度存在经验相关，但与实验测得的[[molar extinction coefficient|摩尔消光系数]]并非严格一一对应。
- 在经典光谱学中，振子强度可理解为跃迁“允许程度”的度量；待核对经典来源。
- 不同软件和计算方法对振子强度的实现细节可能略有差异，比较不同结果时需要注意方法一致性。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
