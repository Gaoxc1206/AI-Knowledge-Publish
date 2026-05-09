---
type: "method"
status: "enriched"
category: "生成模型"
domain: "离散生物序列生成"
background: "included"
---
# Discrete Flow Matching

## 标准定义

标准定义：Discrete [[Flow Matching]]（[[Flow Matching|DFM]]）是一类用于离散状态空间生成建模的方法，通常借助[[连续时间马尔可夫链]]或其他跳跃过程来描述从简单分布到数据分布的演化，并学习时间相关的 token 转移速率/velocity field。它与连续空间的[[Flow Matching]]思路相近，但直接在[[离散状态空间]]上工作。

## 在本知识库中的用法

本知识库中，DFM 主要被用作离散[[生物序列设计]]的预训练生成底座：先学到氨基酸或 DNA token 的逐位置转移速率，再在采样阶段加入多目标引导，使生成结果朝不同偏好方向上的[[Pareto front]]区域移动。相关论文重点展示了它在肽段与 enhancer DNA 的[[controllable generation|可控生成]]中，如何通过重加权转移和逐步采样实现多目标权衡。

## 关键点

- 核心对象是离散 token 序列，适合蛋白、DNA、[[SMILES]] 等生成任务。
- 通过学习时间相关的转移速率来定义生成轨迹，而不是先映射到连续 latent 再优化。
- 在本库里，它是多目标引导方法的底座；引导策略会对原始速度场进行重加权。
- 论文场景中可用于肽段 binder 与 enhancer DNA 设计，目标是平衡[[binding affinity|亲和力]]、[[hemolysis|溶血性]]、[[solubility|溶解性]]等冲突性质。
- 与一般[[多目标优化]]不同，这里优化过程嵌入到逐步采样中，偏向生成而非仅做黑盒搜索。

## 别名

- DFM
- Discrete Flow Matching
- 离散流匹配
- 离散流模型

## 外部背景

- [[离散生成模型|离散流匹配]]可视为把 flow matching 从连续向量场推广到 categorical 序列的生成框架。
- 常见实现会把每一步更新写成单个位置的 token [[mutation]]，并用数值积分或离散采样推进轨迹。
- 它常被视为离散扩散模型、自回归模型之外的另一类序列生成路线；与 rectified / guided 变体的经典谱系待核对经典来源。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
