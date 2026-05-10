---
type: "model"
status: "enriched"
category: "基础模型"
domain: "小分子性质预测与分子优化"
background: "included"
---
# Chemlactica-1.3B

## 标准定义

Chemlactica-1.3B 是 Chemlactica 系列中的 13 亿参数[[大语言模型]]，属于面向化学文本与分子表示的自回归模型。它通常通过继续预训练学习 [[SMILES]]、分子性质与相关文本之间的统计关系，从而支持[[分子性质预测|性质预测]]、[[可控生成|条件生成]]和基于文本提示的分子搜索。

## 在本知识库中的用法

在本知识库对应论文中，Chemlactica-1.3B 是基于公开预训练模型继续训练得到的中等规模版本，训练语料来自约 110M 小分子与约 40B token 的 [[SMILES]]/性质文本。它被用作小[[分子性质预测]]、条件生成以及 [[黑盒 oracle]] 下的群体式[[分子优化]]器主体模型，并在 [[PMO benchmark]] 上取得优于早期方法的结果。论文还展示了它在 [[sitagliptin_mpo]] 等任务上的多 seed 优化轨迹，以及[[动态 fine-tuning]] 对部分困难任务的影响。

## 关键点

- 它是本文三种 Chemlactica 模型之一，规模介于 125M 与 2B 之间，定位为中等规模的分子语言模型。
- 在 [[PMO benchmark]] 上，Chemlactica-1.3B 的总分优于 125M 版本，但不一定在每个单项任务上都最强。
- 它既能做 computed [[分子性质预测|property prediction]]，也能做条件生成；后者通常更难，且对采样策略更敏感。
- 论文将它用于维护高分分子池、基于相似分子构造 prompt，并结合 oracle 反馈进行迭代优化。
- 在 [[MoleculeNet]] 回归任务中，Chemlactica-1.3B 的平均 RMSE 低于或接近部分基线，但整体不如 125M 版本稳定。

## 别名

- Chemlactica 1.3B
- Chemlactica-1.3B model

## 外部背景

- SMILES 是一种将分子结构线性化表示的常用格式，便于用序列模型处理。
- 继续预训练/领域自适应预训练是把通用语言模型迁移到化学等专门领域的常见做法。
- [[自回归语言模型]]可以通过下一 token 预测同时学习结构模式与属性相关模式，适合序列化分子建模。
- 待核对经典来源

## 相关论文

- [[基于大语言模型的小分子生成性质预测与优化 - bedrosianSmallMoleculeOptimization]]
