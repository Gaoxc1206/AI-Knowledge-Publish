---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
background: "included"
---
# MOMO

## 标准定义

MOMO（Multi-objective Molecule Optimization / Evolutionary Multi-objective Molecule Optimization）可泛指一类用于[[分子优化]]的 [[多目标优化]] 方法：在给定先导分子或候选分子时，同时优化多个性质目标，并通过 [[Pareto Front|Pareto前沿]]、[[非支配排序]]等机制保留一组具有不同权衡偏好的解，而不是把多个目标简单合成为单一标量目标。此类方法常结合 [[Evolutionary Algorithm|进化算法]]、连续[[潜在空间|潜空间]]搜索或生成模型，以提升搜索效率和结果多样性。

## 在本知识库中的用法

在本知识库中，MOMO 特指 2023 年论文提出的进化式多目标分子优化框架：先用预训练的 [[编码器-解码器]]（文中为 [[cddd]]）构造 [[隐式化学空间]]，再把 lead molecule 编码后的 latent vector 作为种群个体，在 [[潜在空间|latent space]] 中执行 selection、crossover、mutation 和基于 Gaussian noise 的初始化；随后将候选解码回分子，在分子层面对 [[QED]]、[[PlogP]]、DRD2、Similarity 等目标进行评价，并用 non-domination rank、reference point mechanism 与 dynamic acceptance probability 进行种群更新，最终输出位于 Pareto-front 上的一组优化分子。

## 关键点

- 核心目标不是单点最优，而是得到一组位于 [[Pareto Front|Pareto前沿]] 上、对应不同权衡偏好的候选分子。
- 方法把搜索放在连续的 [[隐式化学空间]] 中进行，以减少在离散 [[SMILES]]/图空间直接交叉和变异带来的无效分子问题。
- 进化操作发生在 latent vector 上，但属性评价在解码后的分子层面完成，兼顾搜索平滑性与化学属性可解释性。
- 与[[Linear Scalarization|加权求和]]式多目标处理不同，MOMO 将 QED、PlogP、DRD2、Similarity 作为独立目标处理。
- 本知识库中的 MOMO 重点用于 [[分子优化|lead optimization]] 场景，强调同时提升性质、活性和结构相似性。

## 别名

- Evolutionary multi-objective molecule optimization
- MOMO
- 多目标分子进化优化

## 外部背景

- 多目标优化通常关注在多个互相冲突的目标之间寻找一组非支配解，而不是单一最优解。
- 进化算法在多目标优化中常用种群、变异、交叉和选择机制来逐步逼近 Pareto-front。
- 分子潜空间搜索通常依赖预训练生成模型或编码器-解码器，将离散分子映射到连续向量空间后再进行优化。
- 参考点选择、拥挤度控制或自适应接受概率等机制常用于提升多目标搜索中的解多样性与分布均匀性，待核对经典来源。

## 相关论文

- [[面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective]]
- [[2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023]]
