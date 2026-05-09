---
type: "concept"
status: "enriched"
category: "其他"
domain: "药物发现"
background: "included"
---
# drug discovery

## 标准定义

Drug discovery 指从疾病需求或生物学靶点出发，经过靶点确认、命中发现、[[先导化合物优化]]、[[Drug-likeness|成药性]]评估等阶段，逐步筛选并开发潜在药物的过程。现代 drug discovery 往往结合实验筛选与计算方法，以提高发现效率并降低试错成本。

## 在本知识库中的用法

在本知识库中，drug discovery 主要作为[[分子设计]]的应用背景：[[MOLLM]] 将 [[Large Language Model]] 用作分子搜索中的交叉与[[mutation|变异算子]]，服务于面向药物发现的 [[molecular design]]。论文重点讨论如何在有限 [[oracle budget]] 下同时优化多个分子性质，并通过 [[Pareto front selection]] 等机制提升候选分子的质量、创新性与多样性。实验中的 QED、SA、[[DRD2]]、[[GSK3β]]、[[JNK3]] 和 [[BBBP]] 等任务，都是药物发现场景下的[[多目标分子优化]]示例。

## 关键点

- 在本知识库中，drug discovery 主要是 [[molecular design]] 的应用场景，而不是某个单独算法；论文用它来说明分子优化的实际价值。
- 该论文强调药物发现往往涉及 [[multi-objective optimization]]：不仅看活性，还要兼顾成药性、合成可行性和其他性质。
- 作者将 [[Large Language Model]] 作为交叉与变异算子，用于面向 drug discovery 的候选分子搜索，以减少对传统遗传式图操作的依赖。
- 在有限 [[oracle budget]] 下，论文希望同时提高候选分子的质量、创新性和多样性，并通过 [[Pareto front selection]] 与 F-value selection 做多目标筛选。
- 文中以 QED、SA、DRD2、GSK3β、JNK3 以及 BBBP 等任务作为 drug discovery 相关的实验例子，体现多性质权衡。

## 别名

- 药物发现
- 药物研发
- drug development
- 药物发现与开发

## 外部背景

- 常见流程包括靶点识别、命中发现、先导发现、先导优化与临床前/临床开发；待核对经典来源。
- 计算机辅助 drug discovery 常结合虚拟筛选、QSAR、分子对接、分子生成等方法；待核对经典来源。
- 在实际研发中，活性、选择性、ADMET、合成可行性通常需要联合考虑；待核对经典来源。

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
