---
type: "concept"
status: "enriched"
category: "分子性质"
domain: "多目标分子优化"
background: "included"
---
# molecular weight

## 标准定义

molecular weight（[[分子量]]）通常指一个分子的相对质量或摩尔质量相关概念，常用于描述分子大小与组成。对于药物分子与[[分子描述符]]场景，它是一个基础的[[分子性质]]，可作为筛选、约束或优化目标；在文献中也常与 molecular mass、molar mass 等术语混用，但严格含义需结合语境理解。

## 在本知识库中的用法

在本知识库对应论文中，molecular weight 被当作 GUACAMOL [[多目标分子优化]]任务里的候选优化性质之一，与 target similarity、[[QED]]、[[logP]]、[[SA score]] 等一起组成多目标评价。它不是本文方法创新点，而是用于构造[[多目标贝叶斯优化]]问题的目标维度之一。

## 关键点

- 它在[[分子设计]]中属于基础的[[分子性质]]，可作为优化目标、过滤条件或约束项。
- 本库语境下，molecular weight 主要出现在 [[GUACAMOL]] 的多目标任务设定中，和其他性质共同定义优化目标。
- 论文比较的是 [[多目标贝叶斯优化]] 中的采集策略，因此 molecular weight 只是被优化的目标之一，不是算法本身。
- 从任务建模角度看，它与 QED、logP、SA score 等一起构成多目标权衡空间。
- 由于上下文没有给出该指标的具体阈值或计算细节，相关实现细节待从更多论文中补充。

## 别名

- 分子量
- molecular mass
- molar mass
- MW

## 外部背景

- 常见背景知识：molecular weight 是分子组成的基本表征，通常以 Da 或 g/mol 表示，待核对经典来源。
- 在[[药物发现]]中，molecular weight 常与[[developability|可成药性]]、渗透性、分子复杂度等经验规律相关，待核对经典来源。
- 它常被当作分子筛选规则或[[多目标优化]]中的一个约束/目标项，而不是单独决定分子优劣的唯一指标。
- 不同文献可能把 molecular weight、molecular mass、molar mass 交替使用，严格区分时需看上下文。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
