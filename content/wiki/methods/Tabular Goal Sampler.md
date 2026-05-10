---
type: "method"
status: "enriched"
category: "采样方法"
domain: "多目标分子优化"
background: "included"
---
# Tabular Goal Sampler

## 标准定义

Tabular Goal Sampler（表格式目标采样器）是一类基于显式表格统计的目标采样策略，通常为离散或已离散化的[[目标空间]]维护每个目标/目标区域的可行性、成功率或访问频率等信念，并据此决定下一次应优先采样哪些目标。它的核心作用是把“目标怎么采”从固定的均匀采样，改成带有经验反馈的自适应采样，从而提高训练效率并减少对不可行目标的浪费。它常与[[Goal-conditioned Generation]]、[[Replay Buffer]] 这类机制配合使用。

## 在本知识库中的用法

在这篇论文的上下文里，Tab-GS 是一个用于 goal-conditioned [[GFlowNet|GFlowNets]] 的 learned goal distribution 近似器：它用简单的表格统计维护每个目标方向的可行性信念，降低不可行目标方向被采样的概率，从而让训练更高效。作者指出，目标数较少时 Tab-GS 与 Uniform-GS 差异不大，但在 3 目标和 4 目标任务中，Tab-GS 在训练约 25% 后开始更明显地优先采样可行目标方向，进而提升 goal-reaching accuracy，并改善 [[Inverted Generational Distance|IGD]] 与 PC-ent。论文还提到，Tab-GS 的参数规模会随目标数增加而变得不理想，因此未来工作设想用 [[GFlowNet]] 风格的目标采样器替代它。

## 关键点

- Tab-GS 本质上是一个“按可行性自适应采样目标”的表格化策略，而不是固定的均匀目标采样。
- 它服务于 goal-conditioned [[GFlowNet]]s：目标不是用偏好权重[[Scalarization|标量化]]，而是直接采样目标方向/目标区域。
- 在论文中，Tab-GS 通过维护每个目标方向的简单统计信念，减少对不可行方向的浪费。
- 它在多目标数场景下更有价值，尤其是 3、4 目标时对训练稳定性和样本效率帮助更明显。
- 论文将其视为一个实用但可扩展性有限的方案，并明确提出未来可用更强的生成式目标采样器替代。
- Tab-GS 的作用更多体现在训练阶段的目标分布调控，而不是[[分子生成]]结构本身。

## 别名

- Tab-GS
- tabular goal sampler
- 表格式目标采样器
- 目标表采样器

## 外部背景

- 在离散动作空间中，表格法（tabular）通常指用显式表或计数器存储状态、动作或目标的统计量，适合小规模、可枚举的问题。
- 目标采样器常见于强化学习、目标[[可控生成|条件生成]]和 curriculum learning 中，用于控制训练分布并缓解稀疏奖励问题。
- 待核对经典来源：tabular 目标分布学习与 bandit/优先级采样、hard-example mining 在思想上有相似之处，但实现目标不同。
- 待核对经典来源：当目标空间维度上升时，纯表格方法往往面临规模膨胀与泛化不足，因此常被更参数化的策略替代。

## 相关论文

- [[目标条件GFlowNets可控多目标分子设计 - royGoalconditionedGFlowNetsControllable]]
