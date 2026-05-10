---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "多目标语言模型对齐"
background: "included"
---
# IMDb

## 标准定义

IMDb（Internet Movie Database）通常指用于[[情感分析]]的电影评论数据集，包含影评文本及其情感标签，常用于二分类文本分类、情感强度评估和奖励建模等任务。

## 在本知识库中的用法

在该论文中，IMDb 被用于 [[GPT-2]] 125M 的 sentiment + length 多目标[[大语言模型对齐|对齐]]实验，作为情感奖励相关数据来源之一；论文报告 [[PAreto Multi-Objective Alignment|PAMA]] 在 IMDb 相关的 sentiment reward 与 length reward 上均优于 [[MORLHF]] 和 [[MGDA-UB]]，并呈现更稳定的训练曲线。具体划分与预处理细节待从更多论文中补充。

## 关键点

- IMDb 是典型的电影评论情感数据集，常作为[[情感分析]]与二分类基准。
- 在本知识库中，它主要用于多目标 [[强化学习从人类反馈|RLHF]] 中的 sentiment 目标建模与评估。
- 该论文将 IMDb 与 length 目标组合，用来检验 PAMA 在冲突目标下的 Pareto 对齐能力。
- 实验表明，在 GPT-2 125M 设置下，基于 IMDb 的情感奖励可以与生成长度一同提升。
- 该节点关注的是 IMDb 作为对齐实验数据集的角色，而不是其电影数据库本身。

## 别名

- IMDB
- IMDb Reviews
- Internet Movie Database

## 外部背景

- IMDb 数据集通常由大规模电影评论构成，经典用途是情感分类。
- 常见公开版本多用于正负面二分类，常见来源可追溯到影评情感数据集，待核对经典来源。
- 在生成式模型研究中，IMDb 也常被改造成奖励函数输入或偏好信号来源。

## 相关论文

- [[2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025]]
