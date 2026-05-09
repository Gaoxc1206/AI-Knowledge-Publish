---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标贝叶斯优化"
background: "included"
---
# Tanimoto kernel

## 标准定义

Tanimoto kernel（也常写作 [[Tanimoto similarity]] kernel 或 [[Tanimoto similarity|Tanimoto coefficient]]）是一类用于衡量两个特征向量重叠程度的核函数，常见于 [[Morgan fingerprint]]、[[ECFP]] 这类[[ECFP|分子指纹]]表示。对二元特征，它通常对应“交集/并集”式相似度；在核方法与 [[Gaussian Process]] 中，可将其作为描述样本相似性的核函数。其常见形式之一是基于向量内积与平方范数构造的 Tanimoto 相似度。

## 在本知识库中的用法

在给定论文上下文中，Tanimoto kernel 主要作为背景知识被介绍：论文写出了其公式，但实际实验并未直接使用它，而是使用了计数型指纹更适配的 [[MinMax kernel]]。因此，在本知识库里它主要用于理解分子指纹相似度核与 [[MinMax kernel]] 之间的关系，以及其在[[多目标分子优化]]中作为代理模型核函数的背景角色。

## 关键点

- 它是分子表示中常用的相似度核，尤其适合与 [[Morgan fingerprint]]、[[ECFP]] 这类指纹一起使用。
- 标准定义里，它通过“重叠程度”刻画两个向量的相似性；对二元指纹可理解为 Tanimoto similarity。
- 论文背景中给出了 Tanimoto kernel 的公式，但实验阶段实际采用的是 [[MinMax kernel]]，可视为其面向计数型指纹的推广。
- 在该论文的[[多目标分子设计]]流程里，核函数服务于 [[Gaussian Process]] 代理模型，而 [[acquisition function]] 的比较才是重点。
- 如果要在本库中复用该概念，需要区分“标准定义”与“论文中的实际用法”，避免把背景公式误写成实验设置。

## 别名

- Tanimoto similarity
- Tanimoto coefficient
- Jaccard similarity
- Tanimoto similarity kernel

## 外部背景

- Tanimoto similarity 在[[化学信息学]]中非常常见，通常用于比较两个分子指纹的相似度；二元指纹场景下与 Jaccard 相似度密切相关。
- 待核对经典来源：Tanimoto kernel 在核方法中的正式定义、正定性条件以及与不同指纹编码方式的对应关系。
- 对计数型特征，常见实现会采用 MinMax 形式或其他广义 Tanimoto 变体，以适配非二元分子描述子。
- 在 SVM、[[Gaussian Process]] 等方法中，Tanimoto 类核常用于[[分子性质预测]]、虚拟筛选与分子优化。

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
