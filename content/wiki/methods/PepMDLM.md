---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标肽序列生成"
---
# PepMDLM

## 定义

待从更多论文中补充。当前上下文没有提供 Pep[[MDLM]] 的直接定义，只能确认相关笔记讨论的是面向离散生物序列的多目标引导生成方法。相关内容涉及用[[离散流模型]]、Tchebycheff [[标量化]]、局部平衡提案和 [[Metropolis-Hastings]] 更新，将序列引导到近似 [[Pareto front]] 区域。

## 关键点

- 待从更多论文中补充。
- 相关笔记聚焦离散生物序列中的[[多目标优化]]与 Pareto 导向生成。
- 方法框架中使用 [[Rectified Discrete Flows]] 作为离散生成先验。
- 通过 [[Tchebycheff scalarization]] 将多个目标合成为可采样的 reward。
- 采用 [[annealed guidance]]、[[locally balanced proposals]] 与 Metropolis-Hastings 更新实现逐步聚焦高质量样本。
- 实验展示了在肽序列和 peptide [[SMILES generation|SMILES 生成]]中的多目标权衡能力。

## 别名

- 无

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
