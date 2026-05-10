---
type: "model"
status: "enriched"
category: "基础模型"
domain: "多目标分子生成"
background: "included"
---
# Graph Transformer

## 标准定义

Graph Transformer 是面向图结构数据的 [[Transformer]] 变体，通常用自注意力在节点之间建模全局依赖，并结合图的结构信息（如邻接关系、边特征、位置/结构编码）来更新节点表示。与普通序列 Transformer 相比，它更适合处理 [[图神经网络]] 难以充分覆盖的长程交互；与传统消息传递方法相比，它往往具有更强的全局建模能力。

## 在本知识库中的用法

在本知识库对应论文中，Graph Transformer 被用作 fragment-based [[GFlowNet]] 的状态编码器：模型从空图逐步构造分子图时，由 Graph Transformer 处理当前图状态并输出动作分布。论文还在状态图中加入了一个 fully-connected [[虚拟节点]]，其嵌入来自条件向量（如 preference vector 或 goal direction），用于把目标条件注入图表示，从而支持 goal-conditioned / preference-conditioned 的[[分子生成]]。

## 关键点

- Graph Transformer 是一种针对图数据的注意力式编码器，核心作用是把节点和边的结构信息转成可用于下游预测或生成的表示。
- 它通常通过全局自注意力捕获远距离依赖，比纯局部消息传递更容易建模复杂图结构。
- 在这篇论文里，它不是单独做分类或回归，而是作为 GFlowNet 的图状态网络，服务于分子逐步构造过程。
- 论文在图中显式加入 [[虚拟节点]]，并把条件信息写入该节点，以便模型根据不同[[目标区域]][[分子生成|生成分子]]。
- 这种用法强调 Graph Transformer 的条件融合能力，而不是仅仅做通用图表征。

## 别名

- 图变换器
- GT
- Graph Transformer
- 图 Transformer
- 图注意力 Transformer
- GTR

## 外部背景

- Graph Transformer 常见于分子图、知识图谱和一般图表示学习任务中，属于图上全局建模的一类方法。
- 常见设计会把节点特征、边特征、结构/位置编码一起送入注意力模块；具体实现细节因论文而异，待核对经典来源。
- 在分子任务中，Graph Transformer 常被用于[[分子性质预测|性质预测]]、分子生成、反应建模等场景。
- 有些变体会引入全局 token 或虚拟节点，以汇聚图级信息并注入条件信号。

## 相关论文

- [[基于数据物理双驱动生成框架的多目标荧光分子设计 - liMultiobjectiveFluorescentMolecule]]
- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
