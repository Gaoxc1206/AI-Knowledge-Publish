---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "荧光分子性质预测"
background: "included"
---
# fluorophore split

## 标准定义

fluorophore split 指一种按荧光团核心或骨架家族进行分组的数据划分方式：训练集、验证集和测试集中的分子不共享同一荧光骨架，从而减少结构泄漏，更严格地评估模型对新骨架的 [[OOD泛化]] 能力。它与 [[scaffold split]] 类似，但划分依据更贴近荧光团子结构或荧光核心家族，而不只是一般意义上的分子骨架。

## 在本知识库中的用法

在本知识库对应论文中，fluorophore split 用于荧光[[分子性质预测]]的评测划分，与 random split、scaffold split 并列。其目的是真实模拟“新荧光骨架发现”场景下的分布外泛化，重点考察模型在未见荧光团子结构上的预测能力。论文在该划分上比较了 AGP、LSP、纯神经网络与 [[TD-DFT]]/NN hybrid predictor，结果显示 hybrid predictor 在 [[lambda_abs]] 和 [[lambda_emi]] 上同时改善了 RMSE 和 R²，说明该切分更能体现物理增强模型的泛化优势。

## 关键点

- 一种面向荧光分子的分组切分方式：按荧光团核心/子结构划分，而不是随机打散样本。
- 核心作用是评估模型在未见荧光骨架上的迁移能力，属于更严格的 [[OOD泛化]] 测试。
- 本库中它主要用于荧光[[分子性质预测|性质预测]]任务的验证，而不是用于生成模型训练本身。
- 与 [[scaffold split]] 相近，但更强调荧光团家族或荧光核心的划分粒度。
- 在论文中，该切分帮助揭示了 TD-DFT/NN hybrid predictor 相比纯数据驱动模型在新骨架上的优势。

## 别名

- fluorophore scaffold split
- 荧光团分割
- 基于荧光团的划分
- fluorophore-based split

## 外部背景

- 常用于分子性质预测、[[分子生成]]和[[药物发现]]中的分布外评测，以避免随机切分带来的信息泄漏。
- 实现时通常依赖骨架抽取、核心子结构聚类或人工定义的荧光团家族；具体规则会因数据集而异，待核对经典来源。
- 与 random split 相比，通常会显著降低指标，但更能反映真实应用中的泛化性能。
- 在荧光化学中，这类切分尤其适合检验模型是否学到了可迁移的电子结构规律，而不仅是记住常见骨架。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
