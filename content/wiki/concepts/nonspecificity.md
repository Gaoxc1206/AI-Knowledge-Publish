---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "抗体序列多目标优化"
background: "included"
---
# nonspecificity

## 标准定义

nonspecificity 指分子或蛋白质与非目标对象发生非特异性相互作用的程度，也可理解为设计结果产生 off-target 结合、粘附或背景结合的倾向。在抗体与蛋白质设计中，它通常作为一种可优化的性质约束来使用，和 [[binding affinity]]、[[developability]] 等指标一起评估；一般而言，越低表示越不容易产生非特异结合。

## 在本知识库中的用法

在这篇论文中，nonspecificity 是抗体序列[[多目标优化]]中的一个目标性质，论文将其记作 [[BV score]]。它与 [[Ab-like]]、[[binding affinity]] 一起构成 [[pcEBM]] 的多目标属性集合，用来同时权衡“像人源抗体”“能结合目标抗原”和“减少非特异结合风险”三类要求。上下文中它被当作一个需要尽量降低的属性，用于学习和采样 [[Pareto front]] 上的候选序列。

## 关键点

- 标准上，nonspecificity 描述的是序列对非目标分子或非目标环境的非特异相互作用倾向，属于蛋白设计中的性质约束。
- 在本库对应论文里，它是[[抗体设计]]的一个优化目标，通常以 BV score 表示，并与 [[Ab-like]]、[[binding affinity]] 联合考虑。
- 该性质和其他目标可能存在冲突，因此更适合放入 [[Pareto front]] 框架中做多目标权衡，而不是单独追求最小值。
- p[[cEBM]] 将 nonspecificity 对应的属性模型纳入 [[Energy-Based Model]] 组合采样，通过 Pareto 方向更新来减少非特异结合风险。
- 从设计目标上看，nonspecificity 越低，通常意味着候选抗体越不容易产生背景结合或 off-target 风险。

## 别名

- nonspecific binding
- non-specificity
- polyspecificity
- off-target binding
- BV score

## 外部背景

- 抗体开发中，nonspecificity 往往被视为 [[developability]] 风险的一部分，常与聚集、黏度和稳定性等问题一起评估。待核对经典来源
- 相关术语在不同文献里可能写作 nonspecific binding、polyspecificity、off-target binding 或 nonspecific interaction，细微语义并不完全一致。待核对经典来源
- 实际研究中，nonspecificity 既可来自实验测定，也可来自机器学习预测器输出的标量分数；不同数据集上的定义未必统一。待核对经典来源
- 在高通量筛选和抗体工程中，降低 nonspecificity 通常有助于提高候选分子的[[developability|可开发性]]和体内外表现。

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
