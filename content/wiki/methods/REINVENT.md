---
type: "method"
status: "enriched"
category: "生成模型"
domain: "分子生成与分子优化"
background: "included"
---
# REINVENT

## 标准定义

REINVENT 是一种用于 [[分子生成]] 的基于 [[reinforcement learning|强化学习]] 的生成式方法，通常以 [[SMILES]] 作为表示空间，先训练一个“prior”学习化学语法与分布，再通过策略优化得到“agent”，在保持可生成性和化学合理性的同时，朝目标性质进行 [[molecular optimization|分子优化]]。它常被用于单目标或多目标性质优化，也可与奖励函数、过滤器或约束条件结合。背景上，REINVENT 体现的是“先学分布、再做目标导向微调”的经典路线。

## 在本知识库中的用法

在这篇 [[MOLLM]] 论文的上下文里，REINVENT 只是被列为多目标[[分子优化]]的对比基线之一，用来和 MO[[大语言模型|LLM]]、[[MOLLEO]]、DyMol、Genetic-[[GFlowNet|GFN]] 等方法比较在固定 oracle calls 预算下的多目标 fitness 表现。论文摘要和背景没有展开 REINVENT 的具体实现细节，因此本知识库中对它的使用仅限于“传统分子优化基线方法”这一层面；更细的算法机制、训练设定与原始实验结果待从更多论文中补充。

## 关键点

- REINVENT 的核心范式是把 [[reinforcement learning|强化学习]] 用于序列式[[分子生成]]，并通过奖励信号把生成过程朝目标性质推进。
- 它通常以 [[SMILES]] 为主要表示，因此兼具实现简单、易于采样和便于定义奖励函数的特点。
- 在方法谱系上，REINVENT 属于经典的目标导向[[分子生成|分子设计]]基线，常用于与 [[multi-objective optimization|多目标优化]] 方法比较。
- 在本知识库对应论文中，REINVENT 被当作外部对照方法出现，具体性能、参数和版本信息未在上下文中展开。
- 从 MOLLM 论文的比较语境看，REINVENT 所代表的是传统生成式优化路线，而非直接利用 [[LLM]] 作为遗传操作器的路线。

## 别名

- REINVENT
- Reinvent
- 基于强化学习的分子生成方法
- SMILES-RL 分子优化

## 外部背景

- REINVENT 最初常被概括为一种基于“prior + agent”框架的分子生成方法：prior 负责保留化学先验，agent 在奖励驱动下进行定向优化。
- 它常与分子打分函数、约束条件、相似性惩罚或多目标加权奖励结合，用于[[药物发现]]中的 de novo design。
- 在后续工作中，REINVENT 相关框架被扩展到不同生成骨架、奖励设计与多目标设定；待核对经典来源。
- REINVENT 通常被视作可与 GA、BO、VAE、RL 等方法并列的经典分子优化基线。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
