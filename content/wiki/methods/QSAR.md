---
type: "method"
status: "enriched"
category: "理论概念"
domain: "分子性质建模与分子优化"
---
# QSAR

## 定义

本文上下文没有直接定义 QSAR。仅能看出研究使用多种分子性质（如 [[QED]]、[[hERG]]、[[BBBP]]、[[HIA]] 等）来构造和评估[[可控分子优化]]任务，说明其与[[分子性质预测]]和属性驱动优化相关。QSAR 在本文中的具体建模方式、输入表示和预测流程，待从更多论文中补充。

## 关键点

- 上下文中未单独展开 QSAR 的方法细节，无法从当前材料确认其具体实现。
- 论文围绕 10 个药物相关性质构建优化任务，这些性质评估可作为 QSAR 类性质建模的输入或监督信号。
- [[C-MuMOInstruct]] 使用[[属性特异性目标|属性级目标]]来指定哪些性质需要 improve、哪些需要 keep unchanged。
- 研究重点是[[可控多属性多目标优化]]，而不是专门讨论 QSAR 预测模型本身。
- 若需补充 QSAR 节点，应进一步查找其在分子[[性质预测]]、[[structure-property relationship|构效关系]]分析中的定义与常见用法。

## 别名

- QSAR
- Quantitative Structure-Activity Relationship
- 定量构效关系

## 相关论文

- [[2025 - 可控多属性多目标分子优化的大语言模型 - deyLargeLanguageModels2025]]
