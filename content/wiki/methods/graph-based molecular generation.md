---
type: "method"
status: "enriched"
category: "生成模型"
domain: "多目标分子设计"
---
# graph-based molecular generation

## 定义

在该论文语境下，graph-based [[分子生成|molecular generation]] 指以[[分子图]]为生成对象的条件式[[分子生成]]方法。作者用 [[Goal-conditioned GFlowNets]] 在给定[[focus region|目标区域]]（[[focus region]]）下逐步构造分子，并让生成结果落入用户指定的[[目标空间]]区域。相比仅用 [[Preference Vector|preference vector]] 做[[linear scalarization|加权标量化]]，这种做法更强调对 [[Pareto front]] 的可控、均匀采样。更一般的 graph-based molecular generation 定义待从更多论文中补充。

## 关键点

- 该方法将分子生成建模为图结构上的逐步构造过程，并与 [[GFlowNet]] 框架结合。
- 核心改进是用 goal / focus region 直接约束生成目标，而不是只输入偏好权重进行[[标量化]]。
- focus region 通过目标方向和 cosine similarity 阈值定义，只有落入区域内的分子才获得正奖励。
- 为缓解 hard constraint 带来的[[reward sparsity|稀疏奖励]]问题，使用 [[replay buffer]] 和 [[hindsight experience replay]]。
- 引入 [[reward shaping|reward sharpening]] / [[reward shaping|limit reward coefficient]]，使样本更偏向 focus region 中心而非边界。
- 还提出 [[Tab-GS]] 来降低不可行目标方向的采样浪费，提高多目标任务的采样效率。

## 别名

- molecular graph generation
- graph molecular generation
- 分子图生成
- Graph-based molecular generation
- Goal-conditioned GFlowNet molecular design

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
