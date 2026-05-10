---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标黑箱优化与分子生成"
background: "included"
---
# Evolutionary Algorithm

## 标准定义

Evolutionary Algorithm（EA，[[Evolutionary Algorithm|进化算法]]）是一类受自然选择启发的随机搜索方法，通常通过初始化种群、评估适应度、执行[[选择]]、[[交叉]]、[[变异]]和精英保留等操作，逐代逼近较优解。EA 常用于[[黑箱优化]]与[[多目标优化]]：在多目标情形下，它通常维护一个候选解群体，以同时逼近一组[[Pareto 最优|非支配解]]并形成或覆盖[[Pareto front]]。EA 的优势是对目标函数形式要求低、适合离散或不可微问题；局限是[[Oracle Calls|评估次数]]开销较大、在高维搜索空间中效率可能下降。

## 在本知识库中的用法

在本知识库对应论文中，EA 主要作为多目标[[分子优化]]的对照基线和外层优化框架出现，例如 [[DiffSBDD]]-EA、[[EGD]] 这类方法会把[[扩散模型]]当作候选生成/精炼模块，再由 EA 在黑箱目标上迭代搜索。论文指出，这类 EA-based 方法虽然适用于[[黑箱优化]]，但通常比 IMG 需要更多 [[Oracle Calls|objective evaluation]]s，且在相同预算下 hypervolume 往往较低；同时，EA 的性能在较低到中等预算后容易趋于平缓。论文还提到，IMG 可与 EGD 组合（EGD+IMG），说明 EA 在库内更像可插拔的优化外壳，而不是核心生成机制。

## 关键点

- EA 是面向[[黑箱优化]]的通用群体搜索方法，不依赖目标函数梯度，适合不可微或仅可评估的场景。
- 在[[多目标优化]]中，EA 通常维护一组解而不是单点最优，以逼近并覆盖[[Pareto front]]。
- 本库论文里，EA 主要体现为 DiffSBDD-EA、EGD 等基线：它们把[[扩散模型]]当作候选生成/精炼器，再做外层迭代搜索。
- 论文结果显示，EA-based baseline 在相同 evaluation budget 下的 hypervolume 通常低于 IMG，且运行时间更长。
- EA 在该任务中仍有模块化价值：论文展示了 EGD+IMG 组合，说明 EA 可与推理时引导机制互补。
- EA 的通用缺点是评估开销高、对高维空间效率有限；在该论文中这也是作者试图用 inference-time 重采样规避的问题。

## 别名

- Evolutionary Algorithm
- 进化计算
- 遗传算法
- 进化算法
- 演化算法
- Evolutionary Computation
- EA
- Genetic Algorithm

## 外部背景

- 经典 EA 家族通常包括[[遗传算法]]（GA）、进化策略（ES）、差分进化（DE）等，待核对经典来源。
- 多目标 EA 的代表性框架包括 [[NSGA-II]]、SPEA2、MOEA/D 等，待核对经典来源。
- EA 常用适应度驱动的群体更新机制，因此对目标函数的可导性没有要求，适合组合优化、结构设计和分子设计等问题。
- 在高维连续空间或昂贵评估场景下，EA 往往需要较多函数调用，因此常与代理模型、局部搜索或生成模型结合，待核对经典来源。
- EA 与 Pareto-based 方法的核心区别在于：前者强调种群演化机制，后者强调多目标非支配排序或分解策略，待核对经典来源。

## 相关论文

- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
