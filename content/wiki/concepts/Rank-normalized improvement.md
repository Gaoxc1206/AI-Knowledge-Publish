---
type: "concept"
status: "enriched"
category: "评价指标"
domain: "多目标离散序列生成"
background: "included"
---
# Rank-normalized improvement

## 标准定义

Rank-normalized improvement 是一种把候选方案在各个目标上的改变量转成“相对名次分数”的做法：先比较一组候选的局部改进，再按排名映射到统一尺度（通常接近 0-1），以便在 [[多目标优化]] 中比较不同目标、不同量纲的改进强弱。它更强调相对排序而不是绝对数值，常用于减弱尺度差异、异常值和噪声的影响；在生成模型或黑盒搜索中，也可作为局部引导信号，与其他打分项一起用于筛选更接近 [[Pareto front]] 的候选。

## 在本知识库中的用法

在本文的离散[[生物序列设计]]中，rank-normalized improvement 被用于候选 token 替换的局部打分：对每个目标先计算新旧序列的差值，再把该差值按排名归一化为 I_n(y_i,x)=rank(s_n(x_new)-s_n(x))/|T|。这个分数随后与 trade-off 方向 ω 共同组成 rank-directional scoring，用来重加权 [[Discrete Flow Matching]] 的转移速率，并配合 hypercone 过滤，推动采样朝更符合多目标偏好的候选区域移动。

## 关键点

- 它衡量的是“局部改进的相对强弱”，而不是原始目标值本身，因此更适合不同量纲、不同范围的多个性质同时比较。
- 本文把每个目标的改变量先转成 rank-normalized improvement，再与方向项结合，构成对 token-level 转移的引导信号。
- 这种设计主要服务于离散序列生成中的逐步采样，而不是直接给出全局最优解判定。
- 由于采用排名而非绝对数值，它对尺度差异和极端值更稳健，也更容易在多个目标之间做统一加权。
- 在本文里，它是多目标引导的一部分，用于帮助生成序列向更符合偏好的区域移动，而非单独充当最终评价指标。

## 别名

- rank-based normalized improvement
- rank normalization of improvement
- rank-normalized score
- RNI

## 外部背景

- 常见背景是把多目标的改变量映射到统一区间，便于在同一打分框架下比较不同目标。
- 相较于 min-max normalization 或 z-score normalization，rank-based 方法更强调相对次序，对异常值通常更稳健。
- 在排序学习、检索优化和黑盒搜索中，基于 rank 的归一化常被用作局部 [[reward shaping]] 或候选重排序信号；待核对经典来源。
- rank-normalized improvement 一般适合“只关心谁更好、好多少的相对顺序”的场景，而不是需要精确数值解释的场景。

## 相关论文

- [[面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow]]
