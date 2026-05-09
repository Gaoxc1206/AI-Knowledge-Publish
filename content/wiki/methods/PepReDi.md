---
type: "method"
status: "enriched"
category: "生成模型"
domain: "肽序列生成"
---
# PepReDi

## 定义

Pep[[ReDi]] 可理解为一种面向肽序列的 [[Rectified Discrete Flows|Rectified Discrete Flow]] 生成方法/模型。根据相关论文笔记，它通过多轮 rectification 修正 source-target coupling，以降低离散 flow matching 中的 [[factorization error]]，从而提升离散序列建模与生成质量。文中还将 PepReDi 作为离散生成先验，用于后续多目标引导采样框架中的肽序列生成与优化。

## 关键点

- 面向离散生物序列，尤其是肽序列建模与生成。
- 基于 [[Rectified Discrete Flows]]，通过 rectification 减少 factorization error。
- 可作为预训练离散生成先验，为后续目标引导采样提供 token-level transition probabilities。
- 论文中报告了多轮 rectification 版本（如 PepReDi3）的 validation NLL 和 perplexity 改善。
- 与[[多目标优化]]框架结合时，PepReDi 主要承担“生成能力”而非直接的多目标引导。

## 别名

- PepReDi
- Peptide ReDi

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
