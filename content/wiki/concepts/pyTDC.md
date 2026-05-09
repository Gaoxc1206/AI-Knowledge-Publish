---
type: "concept"
status: "enriched"
category: "其他"
domain: "多目标分子优化与生物医药评测"
background: "included"
---
# pyTDC

## 标准定义

pyTDC 通常指 [[Therapeutics Data Commons]] 的 Python 工具包，用于组织和访问生物医药机器学习任务的数据、标准化数据划分，并提供统一的基准评测接口。它更偏向于任务与评测基础设施，而不是单一模型；在常见用法中，可服务于[[性质预测]]、[[药物发现]]、生成与检索等任务。

## 在本知识库中的用法

在本知识库中，pyTDC 被当作[[分子优化]]流程里的外部评估工具之一，与 [[RDKit]]、[[ADMETlab]] 并列，用于对候选分子的目标性质或活性进行评估，从而支持 [[MOMO]] 的多目标选择；其具体调用模块与评测细节在上下文中未展开，待从更多论文中补充。

## 关键点

- pyTDC 的标准角色是为 [[Therapeutics Data Commons]] 提供统一的数据与评测接口，方便不同论文在相近任务设置下比较结果。
- 它不是[[分子生成模型]]，而是偏向数据加载、任务定义、划分与评估的工具型组件。
- 在本库对应论文中，pyTDC 主要作为分子性质/活性评估器的一部分，配合 [[RDKit]] 等工具为[[多目标优化]]提供打分。
- 这种用法说明 MOMO 的搜索在[[隐式化学空间|隐空间]]中进行，但最终目标值仍依赖外部评估工具在[[化学空间|分子空间]]中计算。
- 上下文只明确提到 pyTDC 参与评估流程，具体支持的任务或接口细节待从更多论文中补充。

## 别名

- PyTDC
- TDC
- Therapeutics Data Commons

## 外部背景

- TDC（Therapeutics Data Commons）常被用作[[drug discovery|药物研发]]任务的统一基准与数据资源平台，覆盖性质预测、药物-靶点、生成等任务。
- pyTDC 通常提供数据集读取、划分、benchmark 和 evaluator 等常见组件，便于复现实验，待核对经典来源。
- 在分子优化场景中，这类工具常用于提供预测型指标或统一评测入口，而不仅仅是规则型化学描述符计算。
- 若评测依赖预测器输出，其结果可能受训练数据、模型校准和[[OOD generalization|域外泛化]]影响，待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
