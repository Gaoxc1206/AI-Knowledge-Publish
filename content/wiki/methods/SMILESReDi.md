---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散分子生成、肽 SMILES 设计"
---
# SMILESReDi

## 定义

[[SMILES]][[ReDi]] 是一种面向 SMILES 序列的离散生成方法，属于 [[Rectified Discrete Flows]] 的应用形式。在给定上下文中，它被用作 chemically-modified peptide SMILES 的预训练生成先验，并为后续的多目标引导采样提供 token 级转移概率。论文指出，rectification 有助于缓解 discrete flow matching 中由坐标独立近似带来的 [[factorization error]]。该方法在实验中展示出较高的[[validity|有效性]]，base SMILESReDi 的 [[validity]] 为 0.763，而后续版本可提升到 0.986。

## 关键点

- 基于 [[Rectified Discrete Flows|Rectified Discrete Flow]]s，用于离散 token 序列的生成。
- 在 [[AReUReDi]] 框架中充当生成先验，提供每个位置的 marginal transition probabilities。
- 面向 chemically-modified peptide SMILES 设计，而不仅是[[连续隐空间|连续潜空间]]采样。
- 通过 rectification 降低 discrete flow matching 的 factorization error。
- 实验中 SMILESReDi 的生成有效性明显提升，后续版本 validity 达到 0.986。

## 别名

- ReDi
- SMILES Rectified Discrete Flow
- Rectified Discrete Flows for SMILES

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
