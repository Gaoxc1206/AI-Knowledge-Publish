---
type: "method"
status: "enriched"
category: "优化方法"
domain: "贝叶斯优化"
---
# Multi-objective Bayesian optimization

## 定义

[[多目标贝叶斯优化]]是一类用于黑盒[[多目标优化]]的方法，在[[分子设计]]中可用于搜索同时满足多个性质的候选分子。给定上下文只说明它曾作为传统黑盒多目标优化方法之一，被用于分子设计场景。文中同时指出它在高维离散序列空间中的扩展性较差；关于具体建模与采样细节，待从更多论文中补充。

## 关键点

- 属于传统黑盒多目标优化方法，曾用于分子设计中的多性质联合搜索。
- 上下文强调其在高维离散序列空间中扩展性较差。
- 可用于处理彼此冲突的多个目标，但在该论文语境中被视为现有方法的一种对照背景。
- 关于其代理模型、[[acquisition function|采集函数]]与理论保证，待从更多论文中补充。

## 别名

- 多目标贝叶斯优化
- MOBO
- multi-objective Bayesian optimization

## 相关论文

- [[2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025]]
