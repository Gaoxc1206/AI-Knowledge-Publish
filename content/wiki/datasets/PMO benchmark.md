---
type: "dataset"
status: "enriched"
category: "基准测试"
domain: "小分子优化"
background: "included"
---
# PMO benchmark

## 标准定义

PMO benchmark（Practical Molecular Optimization）是一类用于评估[[分子优化]]算法的标准化基准，通常把候选分子搜索建模为[[黑盒优化]]问题：模型或搜索器在给定目标性质、约束或打分函数后，反复提出候选分子，并依据 oracle 分数衡量其优化能力。它的核心不是单次生成是否合理，而是算法在有限预算下能否持续找到更高得分、更符合约束的分子。

## 在本知识库中的用法

在本文对应知识库中，PMO benchmark 用来评估基于[[大语言模型]]的[[分子优化]]能力。论文使用 sum of 23 AUC Top-10 作为汇总指标，并将 [[Chemlactica-125M]]、[[Chemlactica-1.3B]]、[[Chemma-2B]] 与 [[REINVENT]]、Augmented memory、Genetic-guided [[GFlowNet|GFlowNets]] 等方法比较。上下文中报告 Chemma-2B 在 PMO benchmark 上取得最好结果（17.534 ± 0.214），并据此说明 [[大语言模型|LLM]] 结合群体式搜索与[[动态 fine-tuning]] 能在该基准上达到较强性能。

## 关键点

- PMO benchmark 是面向[[分子优化]]的评测集合，通常检验在有限 oracle 预算下的搜索效率与最终分子质量。
- 本知识库里的用法重点是把 PMO 作为 LLM 驱动优化器的主评测场景，比较不同模型规模与优化策略的效果。
- 论文采用 sum of 23 AUC Top-10 作为总体指标，强调整个优化轨迹而不只是最终最优值。
- 在该基准上，作者比较了 Chemlactica/Chemma 与 REINVENT、Augmented memory、Genetic-guided [[GFlowNet]]s 等传统方法。
- PMO 适合观察 prompt 设计、群体式搜索、[[oracle]] 调用与动态 fine-tuning 对优化过程的影响。

## 别名

- Practical Molecular Optimization
- PMO
- PMO benchmark

## 外部背景

- PMO 通常是 Practical Molecular Optimization 的缩写，属于分子设计领域的基准测试集合。
- 这类基准一般包含多个目标任务，用于考察算法在离散化学空间中的探索-利用平衡、样本效率和稳定性。
- 常见报告指标可能包括 AUC Top-k、success rate、generative yield、oracle burden 等；待核对经典来源。
- PMO 往往用于比较生成式方法、遗传算法、强化学习和搜索式方法在相同预算下的表现；待核对经典来源。

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
