---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标优化与大语言模型对齐"
background: "included"
---
# Pareto stationary point

## 标准定义

Pareto stationary point（帕累托驻点）是[[多目标优化]]中的一阶临界概念：在该点附近，不存在一个共同下降/上升方向能同时改善所有目标到一阶近似意义下。对可微的无约束问题，常见等价表述是存在一组非负系数 c_i，满足 ∑_i c_i = 1，且 ∑_i c_i ∇ f_i(x^*) = 0；这表示各目标梯度的凸组合可以抵消为零。它不同于全局的 [[Pareto optimality]]，但通常是算法可证明收敛到的第一性目标。

## 在本知识库中的用法

在这篇论文中，Pareto stationary point 被作为 [[PAMA]] 的理论收敛目标。作者证明：在梯度满足 Lipschitz smoothness、学习率有界、奖励有界等条件下，PAMA 的优化过程最终满足 Pareto stationary condition，即存在 simplex 上的权重 c^(i)，使 ∑_i c^(i) ∇_\theta L^(i)(\theta^*) = 0。这里它用于说明：PAMA 虽然把[[多目标对齐]]从高维梯度式多目标优化改写成更便宜的闭式近似，但仍能在理论上逼近合理的多目标折中解，而不是退化成单一标量奖励最优。

## 关键点

- 它是多目标优化中的一阶驻点概念，强调“没有共同改进方向”，而不是“某个单目标最优”。
- 标准判据常写成：存在位于单纯形上的系数 c_i，使各目标梯度的凸组合为 0；这与 [[Pareto optimality]] 密切相关，但更弱、也更适合算法分析。
- 在本知识库对应论文里，PAMA 的理论结论之一就是收敛到 Pareto stationary point，用它作为多目标对齐的可证明终点。
- 论文中的具体形式是 ∑_i c^(i) \nabla_\theta L^(i)(\theta^*) = 0，说明模型参数在多个对齐目标之间达到一阶平衡。
- 与传统梯度式多目标方法相比，这个概念提供的是优化终态的理论刻画；PAMA 进一步把求解过程降到与目标数近似线性相关的代价。

## 别名

- Pareto stationarity
- 帕累托驻点
- Pareto-stationary point
- Pareto-stationary solution

## 外部背景

- Pareto stationary point 常被视为多目标优化中的“驻点”版本，和单目标优化里的临界点类似，但面向多个相互冲突的目标。
- 若问题可微且无约束，Pareto stationary 的常见几何解释是：目标梯度张成的凸包包含原点。
- 它与 [[Pareto front]] 不同：[[Pareto front]] 是解集合的全局图景，Pareto stationary point 只是某个解是否具备一阶多目标平衡性质。
- 在[[Multiple Gradient Descent|多目标梯度法]]、[[MGDA]] 等方法中，收敛到 Pareto stationary point 往往是理论保证的标准表述；待核对经典来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
