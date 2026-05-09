---
type: "concept"
status: "enriched"
category: "生物靶点"
domain: "药物发现、多目标分子优化"
background: "included"
---
# GSK3β

## 标准定义

GSK3β（glycogen synthase kinase 3 beta）是一种丝/苏氨酸蛋白激酶，属于 GSK3 家族的 β 亚型，参与糖原代谢、Wnt/β-catenin 信号、细胞增殖与存活等过程。它在[[药物发现]]中常被当作可调控的生物靶点，尤其常见于神经、炎症和代谢相关研究。

## 在本知识库中的用法

在该论文的[[多目标分子优化]]任务中，GSK3β被当作需要联合优化的分子性质/靶点之一，与 [[QED]]、SA、[[DRD2]]、[[JNK3]] 等一起进入目标集合；任务设定里它对应“↓”方向，即希望降低该项得分。论文中的 [[F-value]] 计算和 [[Pareto front]] 选择都把 GSK3β 作为多目标评估的一部分，和其它目标一起决定候选分子的保留与筛选。

## 关键点

- GSK3β 是一种经典的蛋白激酶靶点，在知识库中更适合作为“生物靶点/性质目标”节点，而不是生成模型或表示方法节点。
- 在本文的[[多目标分子设计]]设置中，GSK3β 与 [[QED]]、[[SA]]、[[DRD2]]、[[JNK3]] 共同构成优化目标之一。
- 库内用法里，GSK3β 的优化方向是“↓”，即在候选分子打分中希望该项更低。
- 该目标会被纳入 [[F-value]] 归一化聚合与 [[Pareto front]] 筛选，用于决定下一代分子。
- 在该框架中，GSK3β 只是被 [[黑盒 oracle|oracle]] 评估的一个目标维度，实际优化通过 [[SMILES]] 级别的 [[Large Language Model|LLM]] [[crossover|交叉]]与变异来实现。

## 别名

- GSK-3β
- GSK3-beta
- glycogen synthase kinase 3 beta
- glycogen synthase kinase-3β

## 外部背景

- GSK3β 通常被视为 GSK3 家族的两个主要同工型之一，另一种是 GSK3α。
- 它是丝/苏氨酸激酶，常与糖原合成调控和 Wnt 信号通路相关。
- 在[[drug discovery|药物研发]]中，GSK3β 常被讨论为神经退行性疾病、炎症和代谢疾病方向的潜在靶点。
- 待核对经典来源

## 相关论文

- [[MOLLM借助专家优化的分子设计多目标大语言模型 - ranMOLLMMultiObjectiveLarge]]
