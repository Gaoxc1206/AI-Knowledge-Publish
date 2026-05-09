---
type: "method"
status: "enriched"
category: "优化方法"
domain: "小分子优化"
---
# Prompt tuning

## 定义

在这篇论文的语境中，Prompt tuning 指的是将当前高分分子池中的若干相似分子与目标性质组织成提示词（prompt），用来引导[[大语言模型]]生成新的候选分子。它是[[分子优化]]循环中的一部分，配合[[遗传算法]]式的分子池更新、[[拒绝采样]]和 [[黑盒 oracle|oracle]] 评价一起工作。论文还提到在优化停滞时会基于当前高分样本进行[[在线微调|动态微调]]；但关于“prompt tuning”本身的独立机制，证据不足，待从更多论文中补充。

## 关键点

- 从高分分子池中选取若干相似分子作为 prompt 的输入上下文。
- prompt 中会结合相似性信息和目标性质，指导模型生成新的 [[SMILES]] 候选。
- 它服务于[[黑盒 oracle]] 场景下的分子优化，而不是单独作为一个独立任务。
- 在论文的优化框架里，prompt 生成与候选分子筛选、oracle 评价和池子更新形成闭环。
- 论文没有给出该术语的更细粒度定义，具体做法待从更多论文中补充。

## 别名

- 提示优化
- prompt optimization
- prompting

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
