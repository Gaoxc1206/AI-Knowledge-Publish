---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标荧光分子设计"
background: "included"
---
# OOD generalization

## 标准定义

OOD generalization（[[分布外泛化|out-of-distribution generalization]]，[[分布外泛化]]）指模型在测试样本来自与训练数据不同、但仍相关的[[分布外样本]]时，依然保持较好性能的能力。这里的“不同”通常表现为输入结构、特征组合、环境条件或标签分布偏离[[训练分布]]。在机器学习中，这一概念强调模型不仅要拟合训练集，还要学到更稳健、可迁移的规律。

## 在本知识库中的用法

在这篇[[荧光分子设计]]论文中，OOD generalization主要指[[性质预测]]器和生成框架对训练集之外分子、scaffold、官能团组合及溶剂条件的泛化能力。作者指出纯[[神经网络预测器]]在 OOD 分子上容易外推失真，因此引入[[TD-DFT]]与神经网络的混合校正，以提升预测的[[物理一致性]]和外推稳定性。该概念也与[[潜在空间]]中的分子重构、scaffold 新颖性以及尾部分布 prompt 条件下生成质量下降的问题相关。

## 关键点

- 标准上，OOD generalization关注的是模型对训练分布之外输入的稳定预测能力，而不是仅在同分布测试集上表现良好。
- 在本知识库对应论文中，它主要用于描述荧光[[分子性质预测]]器对新 scaffold、新取代模式和新环境条件的泛化。
- 作者认为纯数据驱动预测器在 OOD 分子上不够稳健，因此用物理计算与学习模型结合来缓解外推失败。
- 混合预测器通过[[TD-DFT]]提供更强的物理锚定，再用神经网络做偏差校正，以提升分布外泛化。
- OOD generalization 也影响生成模型的可用性：当条件 prompt 落在稀疏区域时，生成结果的 [[uniqueness]] 和 novelty 会下降。
- 在该任务中，[[OOD 泛化]]不仅是预测精度问题，也是[[多目标优化]]、scaffold 发现和实际[[Synthesizability|可合成性]]之间的综合约束问题。

## 别名

- out-of-distribution generalization
- OOD 泛化
- 分布外泛化
- 域外泛化

## 外部背景

- OOD generalization 常与 domain shift、distribution shift、dataset shift 等概念相近，但侧重点略有不同。
- 提高 OOD generalization 的常见思路包括数据增强、领域不变表示学习、物理先验注入、因果建模和不确定性估计。
- 在化学与分子机器学习中，OOD 问题尤为突出，因为新分子常常同时在骨架、官能团组合和性质范围上偏离训练集。
- 待核对经典来源

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
