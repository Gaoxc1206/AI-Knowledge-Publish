---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标优化"
background: "included"
---
# Linear Scalarization

## 标准定义

Linear [[Scalarization]]（线性标量化）是 [[多目标优化]] 中最常见的标量化策略之一：把多个目标函数按权重加权求和，构造成一个单目标代理目标，再用任意单目标优化器求解。形式上通常写作 $f_\lambda(x)=\sum_i \lambda_i f_i(x)$，其中 $\lambda_i$ 表示各目标的重要性。它的优点是简单、易实现、便于与梯度法结合；局限是对非凸 [[Pareto front]] 的覆盖不充分，且结果对权重设定与目标尺度较敏感。

## 在本知识库中的用法

在本知识库对应论文中，线性标量化作为传统 [[compositional energy-based model]] 的朴素组合方式出现：把多个属性的 energy 直接相加，再沿总梯度进行 Langevin 采样。作者将其与 [[Multiple Gradient Descent]] 对比，指出这种固定加权的做法更像单点折中，容易偏向某些目标，在非凸 [[Pareto Front|Pareto front]] 上覆盖不足，因此需要 [[Compositional Energy-Based Model|pcEBM]] 这类更自适应的多目标采样方式来替代或增强它。

## 关键点

- 本质上是把多个目标压缩成一个标量目标，便于直接套用单目标优化器；与 [[Pareto front]] 的关系是“用一个权重点去近似一类权衡解”。
- 在论文语境中，线性标量化对应 c[[Energy-Based Model|EBM]] 的简单能量求和采样，是 pcEBM/MGD 的对照基线。
- 它通常只在 Pareto front 近似凸时更有效；面对非凸前沿时，可能遗漏某些关键折中解。
- 权重选择会强烈影响优化结果；不同目标量纲不一致时，往往还需要归一化或手工调参。
- 相比之下，[[Multiple Gradient Descent]] 不预设固定权重，而是根据当前梯度自适应寻找共同改进方向。

## 别名

- weighted sum
- weighted-sum scalarization
- linear weighting
- 加权求和
- 线性加权法

## 外部背景

- 经典做法通常把线性标量化视为多目标问题最基础的 scalarization 方法之一，可作为生成一组不同权重解的简单手段。
- 常见变体包括固定权重、随机权重、归一化后加权，以及随迭代变化的动态权重；待核对经典来源。
- 在线性加权框架下，若各目标尺度差异较大，优化结果可能被数值范围更大的目标主导，因此常需先做尺度处理。
- 对于非凸 [[Pareto Front|Pareto 前沿]]，线性标量化往往无法完整恢复全部前沿点，这是其最重要的局限之一。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
