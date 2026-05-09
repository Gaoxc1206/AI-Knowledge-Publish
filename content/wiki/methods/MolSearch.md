---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标分子优化"
---
# MolSearch

## 定义

当前上下文主要对应 [[MOLLM]]：一种不额外训练模型、直接用[[大语言模型]]充当[[分子优化]]中的 [[crossover]] 与 [[mutation]] 算子的[[多目标优化]]框架。它通过 [[in-context learning]]、[[prompt engineering]] 以及 [[Pareto front selection]] 和 [[F-value selection]] 来搜索更优分子，并在作者实验中优于多类基线。由于上下文中未直接出现“MolSearch”这一名称，相关细节需待从更多论文中补充。

## 关键点

- 将预训练 [[Large Language Model]] 直接用作分子优化中的遗传操作器，负责 crossover 和 mutation。
- Prompt 设计包含多目标要求、目标描述、父代分子性质、输出约束，必要时还可加入经验池信息。
- 选择阶段结合 F-value selection 与 [[Pareto front]] selection，以同时兼顾多目标权衡与优化质量。
- 实验中采用固定 [[oracle budget]]，并从 [[ZINC250K]] 构造不同初始种群来评估优化效果与鲁棒性。
- 消融结果显示，[[ExpeL|experience pool]] 在主实验中反而会降低性能，因此作者最终未采用。
- 在多目标任务和效率上，MO[[Large Language Model|LLM]] 在作者报告中优于 [[MolLeo|MOLLEO]] 等对比方法。

## 别名

- 无

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
