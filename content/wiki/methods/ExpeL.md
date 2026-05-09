---
type: "method"
status: "enriched"
category: "其他"
domain: "大语言模型提示学习"
background: "included"
---
# ExpeL

## 标准定义

ExpeL 可理解为一种基于经验的提示增强框架：把历史任务中的成功经验、失败教训或操作规则压缩为可复用的文本经验，在推理时注入 [[大语言模型]] 的 prompt，以增强 [[in-context learning]] 和决策质量。它通常不依赖额外训练，而是通过经验检索、经验摘要与提示组织来影响模型输出。

## 在本知识库中的用法

在 [[MOLLM]] 中，ExpeL 被借鉴来设计 experience pool。该经验池会包含从更好且结构相似的分子中总结出的知识，以及避免生成较差分子的负面经验；这些内容作为 prompt 中的 past experience 部分注入 [[Large Language Model|LLM]]，用来辅助 [[crossover]] 和 [[mutation]]。但作者的消融结果显示，引入 experience 反而会降低优化性能，因此主实验最终未启用该经验池。

## 关键点

- ExpeL 的核心是把“经验”显式写入提示词，而不是重新训练生成模型；更接近 [[prompt engineering]] 与 [[in-context learning]] 的组合。
- 经验通常可来自历史成功样本、失败样本或专家规则，适合压缩成短文本供 LLM 复用。
- 在 MOLLM 语境下，ExpeL 主要体现为 experience pool，用于为[[分子生成]]补充“过去什么更好/什么应避免”的提示信息。
- 这类经验注入有助于利用专家知识，但也可能让搜索过早收缩，增加 [[局部最优]] 风险。
- 从该论文的结论看，经验机制并非越多越好，是否加入需要结合消融实验判断。

## 别名

- ExpeL
- experience pool
- 经验增强提示

## 外部背景

- 待核对经典来源：ExpeL 名称通常与 experience-based [[Prompt tuning|prompting]] 或经验记忆机制相关，核心思想是把过去交互中学到的经验转成可复用文本。
- 在多轮推理、规划与搜索任务中，经验摘要常作为记忆模块的一部分，与 [[prompt engineering]] 结合使用。
- 把正向经验和负向经验分开存储，是常见的经验组织方式；前者强化可复用策略，后者帮助规避重复错误。
- 经验池类方法往往能提升[[sample efficiency|样本效率]]，但也可能降低探索多样性，尤其在需要广泛搜索的任务中。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
