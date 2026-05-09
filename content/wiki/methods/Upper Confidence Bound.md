---
type: "method"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化"
---
# Upper Confidence Bound

## 定义

Upper Confidence Bound（UCB）是一类可用于单目标[[Bayesian Optimization|贝叶斯优化]]的 [[acquisition function|acquisition]] 方法。在给定上下文中，它仅作为固定[[标量化]]后可复用的成熟单目标优化策略被提及，与 [[Expected Improvement]] 一样可用于标量化后的目标。该上下文没有提供 UCB 的具体公式、超参数设置或实验结果，待从更多论文中补充。

## 关键点

- 在该论文笔记中，UCB 只是作为单目标优化管线的例子出现。
- 它可与[[固定权重标量化]]结合，在压缩后的单一目标上进行优化。
- 当前上下文未给出 UCB 的具体实现细节、实验对比或性能结论。
- 相较于 [[Expected Hypervolume Improvement|EHVI]]，这里没有看到 UCB 直接用于保留多目标 Pareto 结构的证据。

## 别名

- UCB
- 置信上界
- Upper Confidence Bound

## 相关论文

- [[分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs]]
