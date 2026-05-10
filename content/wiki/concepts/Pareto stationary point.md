---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标语言模型对齐"
background: "included"
---
# Pareto Stationary Point

## 标准定义

Pareto Stationary Point（帕累托驻点）是[[多目标优化]]中的一个一阶概念：在该点附近，不存在一个共同下降方向能够同时让所有目标都严格变好。它通常被视为达到[[Pareto 最优|Pareto optimality]]之前的必要条件之一，但并不保证是全局[[Pareto 最优|帕累托最优]]。直观地说，如果某点是帕累托驻点，那么从局部一阶信息看，已经很难再找到一个方向去同步改善全部目标。

## 在本知识库中的用法

在本知识库对应论文中，Pareto Stationary Point 主要作为 PAMA 的理论收敛目标：作者证明其多目标对齐过程在一定假设下会收敛到 Pareto stationary point。这里的用法强调的是多目标 RLHF 中“可证明地达到一阶平衡状态”，而不是把多个奖励简单加权成单目标。论文将其与 [[Noon PPO]] 的优势重构、闭式凸优化以及多目标梯度组合替代方案联系起来，用来说明算法在十亿参数级语言模型上仍具有可运行性和理论保证。

## 关键点

- 它是[[多目标优化]]中的一阶平衡点概念，核心含义是：局部上不存在能同时改善所有目标的方向。
- Pareto 驻点通常是分析[[Pareto front]]和多目标算法收敛性的常用理论终点，但不等于全局最优。
- 在本库论文中，PAMA 将其作为多目标对齐的收敛保证，并声称在约束条件下可到达该状态。
- 该论文中的证明依赖优势项重构与[[Noon PPO]]，而不是直接在高维参数空间做标准梯度聚合。
- 因此，这里的 Pareto stationary point 更像是“多目标对齐已达到一阶折中”的理论标记，而不是任务性能的唯一评价指标。

## 别名

- Pareto stationary
- Pareto-stationary point
- 帕累托驻点
- 帕累托临界点

## 外部背景

- 常见等价表述包括：不存在使所有目标下降的可行方向，或零向量属于多目标梯度锥的某种广义条件，待核对经典来源。
- 在光滑情形下，它常与加权和法、KKT 型条件、最小范数梯度组合等分析框架相关，待核对经典来源。
- 它是[[多目标优化]]里比“帕累托最优”更弱、也更容易验证的一阶概念，待核对经典来源。
- 不同文献对 Pareto stationary、weakly Pareto stationary、critical point 的术语边界可能不完全一致，待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
