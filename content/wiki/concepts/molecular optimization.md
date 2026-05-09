---
type: "concept"
status: "enriched"
category: "优化问题"
domain: "多目标分子优化"
background: "included"
---
# molecular optimization

## 标准定义

molecular optimization 指在[[化学空间]]中搜索并改造分子，使其在一个或多个性质目标上更接近期望值的过程，常见目标包括活性、选择性、[[Synthesizability|可合成性]]、药代性质与安全性等。它既可以是单目标搜索，也可以是[[多目标优化]]：在多个相互冲突的性质之间寻找折中解，通常需要借助评分函数、搜索策略、约束条件和选择机制来迭代更新候选分子。许多方法会把问题表述为在有限 [[oracle budget]] 下最大化综合得分或逼近 [[Pareto front]]。

## 在本知识库中的用法

在这篇论文对应的知识库语境中，molecular optimization 具体指一种面向[[分子设计]]的多目标搜索任务：给定若干性质目标和初始分子种群，使用预训练 [[Large Language Model]] 直接充当 [[crossover]] 与 [[mutation]] 算子生成子代，再结合 [[Pareto front]] selection 与 [[F-value selection]] 筛选下一代。该实现强调无需额外训练[[分子生成模型]]，而是通过 [[in-context learning]] 和 [[prompt engineering]] 注入父代分子、目标值与生成约束；实验中还专门比较了不同初始种群、不同目标数和是否使用 [[ExpeL|experience pool]] 的影响。主实验遵循固定的 [[黑盒 oracle|oracle]] 调用预算（5000 次）来评估优化质量、效率和多样性。

## 关键点

- 标准上，molecular optimization 是在化学空间中对候选分子做定向搜索，目标通常是提升若干性质并尽量保持可行性与新颖性。
- 本库中的用法更具体：[[MOLLM]] 将 [[Large Language Model]] 作为遗传式优化里的生成算子，用 prompt 直接驱动 crossover / mutation，而不是依赖传统图编辑算子。
- 该任务强调多目标权衡，因此不仅看单个分子是否高分，还要结合 [[Pareto front]] 与综合 F-value 来选择下一代。
- 论文特别关注初始种群、目标数量和 oracle 调用预算对结果的影响，说明 molecular optimization 的性能很依赖搜索初始化与选择策略。
- 主实验中作者发现 experience pool 可能削弱探索能力，因此最终不作为默认设置。

## 别名

- 分子优化
- molecular design optimization
- compound optimization
- multi-objective molecular optimization
- MO

## 外部背景

- 经典的分子优化通常建立在分子表示、性质预测器和搜索算法之上，常见搜索方式包括遗传算法、强化学习和贝叶斯优化，待核对经典来源。
- 多目标分子优化通常会同时考虑活性、合成可行性、药物相似性等指标，并用加权和、约束优化或 Pareto 方法处理冲突目标，待核对经典来源。
- 在生成式分子设计中，molecular optimization 与 molecular generation 相邻但不完全相同：前者更强调围绕已有分子做定向改造，后者更强调从头生成，待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
