---
type: "concept"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
background: "included"
---
# GFlowNet

## 标准定义

GFlowNet（[[Generative Flow Network]]，[[Generative Flow Network|生成流网络]]）是一类用于学习“按奖励分布采样”的生成模型：给定对象 x 的奖励 R(x)，模型学习使采样概率近似满足 p(x) ∝ R(x)。它通常通过构造式决策过程在离散空间中逐步生成样本，并通过流量守恒/平衡约束来训练前向与反向策略。与只追求单个最优解的优化方法不同，GFlowNet更强调从高奖励区域中采样出多样化解，适合[[多目标优化]]、组合生成和需要覆盖整个[[Pareto front]]的任务。

## 在本知识库中的用法

在该论文中，GFlowNet被用作[[多目标分子设计]]的[[controllable generation|可控生成]]框架：作者不再采用基于权重的[[标量化]]或[[偏好条件化]]，而是提出[[目标条件化]]的 GFlowNet，让用户显式指定希望探索的目标方向/区域（[[focus region]]）。模型在给定[[focus region|目标区域]]下学习采样分子，使其落入目标区域时获得正奖励，区域外奖励为 0，从而更均匀地覆盖复杂形状的 [[Pareto front]]。为缓解[[reward sparsity|稀疏奖励]]和可行目标不足问题，论文还结合了[[replay buffer]]、[[hindsight experience replay]]以及用于筛选可行方向的 [[Tab-GS]] 目标采样策略。

## 关键点

- GFlowNet的核心不是只找一个最优解，而是学习一个与奖励成比例的生成分布，因而更适合从高质量区域中采样多样化候选。
- 在该论文的多目标[[分子设计]]场景中，GFlowNet被改造成[[目标条件化]]版本：模型接收目标方向/目标区域信息，而不是仅接收偏好权重。
- 论文用 focus region 表达“希望分子落在哪个目标空间区域”，并将落入该区域的样本视为成功样本；这比传统[[偏好条件化]]更强约束、更可控。
- 为减少稀疏奖励带来的训练不稳定，作者结合了[[replay buffer]]与[[hindsight experience replay]]，把历史轨迹重新标注到其他可行目标区域中。
- 论文还引入 reward sharpening/limit reward coefficient，使分子越接近 focus region 中心，奖励越高，以提高目标命中精度。
- 在复杂或非凸的[[Pareto front]]上，文中方法比单纯基于权重的标量化方法更能均匀覆盖目标空间。

## 别名

- Generative Flow Network
- GFN
- 生成流网络

## 外部背景

- GFlowNet最初常用于离散组合空间中的生成任务，常见应用包括分子图生成、程序/子结构生成与多样化候选搜索。
- GFlowNet与传统强化学习的一个重要区别是：它追求的是“匹配奖励分布的采样器”，而不是只优化单条轨迹的回报；待核对经典来源。
- 在多目标优化中，标量化是把多个目标合成为单一标量奖励的常见方法，但当 Pareto front 非凸时，容易出现覆盖不均匀的问题。
- 目标条件化（goal conditioning）常见于控制与强化学习语境，通常表示模型根据显式目标而非仅根据偏好参数来生成或规划；待核对经典来源。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
