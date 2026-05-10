---
type: "dataset"
status: "enriched"
category: "数据集"
domain: "增强子序列建模与可控 DNA 设计"
background: "included"
---
# melanoma enhancer dataset

## 标准定义

通常指用于研究黑色素瘤相关[[增强子]]活性、调控功能或序列特征的[[DNA序列]]数据集。常见形式是把候选增强子序列及其标签（如细胞类型特异性活性、是否为 enhancer、或与表达/染色质状态相关的注释）整理成可用于分类、预测或生成建模的样本集。

## 在本知识库中的用法

待从更多论文中补充。当前上下文只提到 [[enhancer DNA 多目标设计]]：任务目标是 enhancer class 与[[DNA shape]]（如 HelT、Rise），并用[[Discrete Flow Matching]]的多目标引导进行采样；没有给出 melanoma enhancer dataset 的构建方式、规模、标签体系或基准划分。

## 关键点

- 这是一个面向[[增强子]]序列任务的数据集节点，通常服务于 enhancer 活性预测、分类或生成。
- 就当前上下文而言，论文把 enhancer 设计作为离散生物序列优化任务处理，优化目标包括 enhancer class 与 DNA 形状特征。
- 该上下文中出现的是 enhancer DNA 任务而非明确的 melanoma 特异数据集，因此和[[多目标优化]]、[[Discrete Flow Matching]]的关联需要后续文献补充。
- 若后续确认其为黑色素瘤相关数据集，可进一步补充细胞类型、正负样本来源和预处理规则。
- 目前无法从给定材料判断其样本规模、标签定义和划分协议。

## 别名

- enhancer dataset
- enhancer DNA dataset
- enhancer sequence dataset
- melanoma enhancer data

## 外部背景

- 待核对经典来源：增强子数据集通常来自 ChIP-seq、ATAC-seq、STARR-seq、eQTL 或文献整理的功能注释。
- 待核对经典来源：增强子序列建模常把问题表述为[[序列分类]]、活性回归或细胞类型特异性预测。
- 待核对经典来源：如果是黑色素瘤相关数据集，标签往往与 melanoma 细胞系中的调控活性或疾病相关 enhancer 状态有关。
- 待核对经典来源：此类数据集常用于[[代理模型]]训练和生成模型评估。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
