---
type: "method"
status: "enriched"
category: "其他"
domain: "多目标分子设计"
---
# fragment-based drug design

## 定义

给定上下文主要讨论的是 [[Goal-conditioned GFlowNets]] 在可控[[多目标分子设计]]中的应用，并没有直接说明 fragment-based drug design 的定义、流程或关键机制。当前只能确认它与[[分子生成]]、[[多目标优化]]和可控采样有关；关于 fragment-based drug design 的具体内容，待从更多论文中补充。若需要将该节点补全为方法条目，还需要更多直接涉及碎片设计的论文笔记支持。

## 关键点

- 当前上下文没有直接给出 fragment-based drug design 的具体定义或操作步骤。
- 上下文相关内容主要是用 Goal-conditioned [[GFlowNets]] 做可控多目标[[分子设计]]，而不是碎片基础药物设计本身。
- 该方法背景涉及在[[目标空间]]中显式指定 [[focus region]]，以提高生成结果的可控性和覆盖均匀性。
- 文中还使用 [[replay buffer]]、[[hindsight experience replay]] 和 [[reward shaping|reward sharpening]] 来缓解硬约束带来的[[reward sparsity|稀疏奖励]]问题。
- 关于 fragment-based drug design 的方法细节、优势和适用场景，待从更多论文中补充。

## 别名

- 无

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
