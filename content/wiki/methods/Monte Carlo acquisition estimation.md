---
type: "method"
status: "enriched"
category: "优化方法"
domain: "多目标贝叶斯优化 / 多目标分子设计"
---
# Monte Carlo acquisition estimation

## 定义

在给定论文中，[[Monte Carlo estimation|Monte Carlo]] [[acquisition function|acquisition]] estimation 指用蒙特卡洛采样来近似计算[[acquisition function|采集函数]]的期望值，具体用于 [[Expected Hypervolume Improvement|EHVI]] 的估计。论文中每个候选分子使用 1000 个 Monte Carlo samples 来估计加入当前非支配集合后的期望[[Hypervolume Indicator|超体积]]提升。它服务于候选分子的打分与排序，但更一般的适用方式待从更多论文中补充。

## 关键点

- 论文将其用于 EHVI 的数值估计，而不是解析计算。
- 每个候选分子采用 1000 个 MC samples 进行采样近似。
- 该估计在固定候选池上进行，用于多目标 BO 中的候选选择。
- EHVI 与 [[fixed-weight scalarized EI|scalarized EI]] 共享相同 GP、分子表示和候选池，因此 MC 估计主要影响 EHVI 的采集值计算。
- 上下文只明确了在该研究中的用法，更一般的 Monte Carlo acquisition estimation 形式待从更多论文中补充。

## 别名

- MC estimation
- Monte Carlo EHVI
- MC-EHVI

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
