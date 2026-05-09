---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标分子设计"
background: "included"
---
# controllable generation

## 标准定义

controllable generation（可控生成）是指在生成模型中加入可指定的条件、约束或目标，使模型生成结果可按用户意图在某些属性、结构或分布区域上被引导。与无[[prompt-conditioned generation|条件生成]]相比，它强调生成过程的可控性；与一般的 [[条件生成]] 相比，它更突出“生成结果是否能稳定满足给定控制信号”。在 [[多目标优化]] 场景下，可控生成通常希望模型能根据目标偏好、约束或区域指令，生成落在指定 [[Pareto front]] 区域附近的候选解。

## 在本知识库中的用法

在这篇论文的知识库语境中，controllable generation 特指：不再用传统的 [[preference-conditioning]] 去隐式表达偏好，而是用 [[goal-conditioning]] 显式指定[[目标空间]]中的 [[focus region]]，让模型在该区域内生成分子。这里的“可控”主要体现在两点：一是能指定希望探索的 trade-off 方向；二是能更均匀地覆盖 Pareto 前沿，而不是只偏向极端点。实现上通过 [[GFlowNet]]、focus region、[[replay buffer]] 和 [[hindsight experience replay]] 来提升在复杂目标空间中的可控采样能力。

## 关键点

- 标准意义上，可控生成是让生成模型接受可操控条件，从而把输出引导到期望属性、结构或区域；在[[多目标分子设计]]中，它常用于控制分子落在特定 [[Pareto front]] 区段。
- 本知识库中，该概念主要对应“显式指定[[focus region|目标区域]]”的生成方式：模型不是只接收偏好权重，而是接收 goal / focus region 信息来控制采样方向。
- 该论文认为传统的 preference-conditioning 更像软控制；当目标空间存在凹形或复杂前沿时，容易偏向极端点，难以稳定、均匀地实现可控生成。
- 论文用 [[GFlowNet]] 作为可控生成框架，通过区域内奖励、区域外零奖励的硬约束，提升对目标区域的可达性和可解释性。
- 为了缓解硬约束带来的[[reward sparsity|稀疏奖励]]问题，作者结合了 replay buffer、[[hindsight experience replay]] 和 [[Tab-GS]]，以提高训练稳定性和目标区域覆盖率。
- 因此，在该节点下，可控生成不仅是“生成得更好”，更是“按指定目标更准确地生成并覆盖所需分布”。

## 别名

- controlled generation
- 条件生成
- 可控生成
- goal-conditioned generation

## 外部背景

- 条件生成（conditional generation）是可控生成的常见基础形式：通过类别、属性向量、文本提示或约束变量控制输出分布。待核对经典来源
- 在强化学习与生成建模中，可控生成常与 goal conditioning、reward shaping、constrained generation 等概念相近，但侧重点不同。待核对经典来源
- 在分子生成文献中，可控生成通常还会与 validity、novelty、diversity、QED、SA、toxicity 等属性控制一起讨论。待核对经典来源
- 与 preference-based 方法相比，goal-based 控制通常更强调“达到某个区域/条件”而不是“最大化某个加权目标”。待核对经典来源

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
