---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "离散生成模型与多目标分子优化"
background: "included"
---
# conditional total correlation

## 标准定义

conditional total correlation（条件总相关）是衡量一组随机变量在给定条件变量后仍保留多少整体依赖性的多变量信息量。对 $X_1,\dots,X_d$ 和条件 $Y$，常写作 $\mathrm{TC}(X_{1:d}\mid Y)=\sum_i H(X_i\mid Y)-H(X_{1:d}\mid Y)$，也可等价写成给定 $Y$ 时联合分布相对条件独立分解的 [[KL散度]]：$\mathbb{E}_Y[\mathrm{KL}(p(X_{1:d}\mid Y)\|\prod_i p(X_i\mid Y))]$。数值越大，表示在条件 $Y$ 下各维度仍越不接近 [[条件独立]]；越小则表示条件下的整体耦合更弱。

## 在本知识库中的用法

在 [[AReUReDi]] / [[ReDi]] 相关笔记中，它主要用于解释 [[Rectified Discrete Flows]] 的多轮 rectification 为什么能改进离散生成：通过修正 source-target coupling，降低条件下的残余相关性，从而缓解[[Discrete Flow Matching|离散流匹配]]里的 [[factorization error]]。论文还提到 [[PepReDi]] 的多轮 rectification 后 conditional TC 会发生变化，用作描述模型对离散 token 依赖结构被重整的现象，而不是作为多目标 guidance 的直接优化目标。

## 关键点

- 标准上，它是条件化的多变量依赖度量，可看作“给定条件后，联合分布偏离条件独立分解”的程度。
- 在本库中，它主要用来说明 [[Rectified Discrete Flows]] 通过 rectification 逐步削弱序列各位置之间的条件依赖，从而降低 [[factorization error]]。
- 它关注的是整体依赖结构，不等同于两两相关系数，也不同于单一[[互信息]]。
- 在 PepReDi / [[SMILESReDi]] 的语境下，conditional TC 的变化说明多轮修正会重新塑造 token-level 依赖结构。
- 它更适合作为生成模型的诊断量或解释量，而不是多目标引导中的直接优化目标。

## 别名

- 条件总相关
- conditional TC
- conditional multi-information
- CTC

## 外部背景

- 常见公式是条件熵差或对条件分布的 KL 形式；若条件变量是常量，则退化为普通 total correlation。
- 也常被称为 conditional multi-information；不同文献的符号约定可能略有差异，待核对经典来源。
- 在生成建模里，降低它通常意味着模型更接近按坐标分解的条件独立假设，因此常被用来诊断 sequence model / flow model 的依赖建模质量。

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
