---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# QMO

## 定义

QMO 是论文笔记中出现的一个[[多目标分子优化]]方法/基线，但现有上下文没有给出其完整机制与实现细节。根据相关结果描述，它被用于与 [[MOMO]] 做对比，主要出现在 [[QED]]、[[PlogP]]、[[Tanimoto similarity|Similarity]] 以及 [[DRD2]] 等多目标[[分子优化]]任务中。已知信息只能说明它参与了[[连续隐空间]]中的搜索与评估比较，其具体算法流程待从更多论文中补充。

## 关键点

- 在多目标分子优化实验中被用作对比方法。
- 与 MOMO 的比较显示，MOMO 在多个任务上优于 QMO。
- 在 P[[logP]] + Similarity 任务中，QMO 曾出现一个 PlogP_imp 很高但[[chemical diversity|结构多样性]]不足的异常分子。
- 从上下文可知，QMO 与 MOMO 都涉及连续[[隐式化学空间|隐空间]]搜索，但 QMO 的具体搜索机制未被完整说明。
- 其具体定义、[[黑盒 oracle|目标函数]]设计和进化/优化策略待从更多论文中补充。

## 别名

- QMO

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
