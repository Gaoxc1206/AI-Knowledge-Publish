---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化、黑箱优化"
background: "included"
---
# EGD

## 标准定义

EGD 可理解为一种将 [[扩散模型]] 嵌入 [[Evolutionary Algorithm|进化算法]] 的混合优化方法：[[扩散模型]]负责生成或精炼候选解，进化过程负责选择、保留与迭代更新，从而用于 [[黑箱优化]] 或多目标搜索。它通常适合在没有可微梯度、只能通过评估函数打分的场景中使用，并常与 [[Pareto front]]、[[hypervolume]] 等多目标指标一起评估。

## 在本知识库中的用法

在这篇论文的上下文里，EGD 是一个对比基线：它把扩散模型当作 evolutionary algorithm 里的候选生成/精炼模块，而不是直接在扩散推理时改写反向转移分布。论文用它来对照 IMG，说明仅把扩散模型作为 frozen refiner 会受限于预训练分布、优化效率较低。实验中，EGD 在不同 [[Oracle Calls|objective evaluation]] budget 下整体 hypervolume 通常低于 IMG，运行时间也更长；但论文也报告了 EGD+IMG 的组合结果，说明 IMG 可以作为现有迭代优化框架的可插拔模块。

## 关键点

- EGD 是一种面向 [[黑箱优化]] 的混合式优化思路：用 [[扩散模型]] 提供候选，用 [[Evolutionary Algorithm|进化算法]] 做筛选与迭代。
- 在本知识库对应论文中，EGD 的角色是 baseline，而不是本文提出的方法。
- 论文特别指出，EGD 这类做法没有利用扩散模型内部的反向转移分布，因此推理时对目标分布的调整能力有限。
- 在多目标[[分子生成]]评测中，EGD 主要通过 hypervolume 和 [[Pareto Front|Pareto front]] 数量衡量，但整体表现通常弱于 IMG。
- 论文还展示了 EGD+IMG 的组合结果，说明 EGD 代表的外循环优化框架可以与推理时分布引导方法叠加。

## 别名

- Evolutionary Guided Diffusion
- EA-guided Diffusion
- 进化引导扩散
- 扩散-进化混合优化

## 外部背景

- [[Evolutionary Algorithm|进化算法]]擅长处理非凸、离散或不可微目标，但在高维生成空间里往往样本效率不高；待核对经典来源。
- 扩散模型既可以作为生成器，也可以作为局部精炼器或先验分布载体；待核对经典来源。
- [[多目标优化]]通常不追求单点最优，而是寻找一组[[Pareto 最优|非支配解]]；待核对经典来源。
- 若 EGD 作为具体方法名在不同论文中含义不一致，建议在本库中按具体来源论文再细化；待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
