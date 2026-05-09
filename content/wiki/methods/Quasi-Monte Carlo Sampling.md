---
type: "method"
status: "enriched"
category: "采样方法"
domain: "多目标分子生成"
---
# Quasi-Monte Carlo Sampling

## 定义

在该论文中，[[Quasi-Monte Carlo]] Sampling 用于在没有用户指定偏好分布时，更均匀地生成 [[Preference Vector|preference vector]]s。作者将其用于正超球面表面的偏好[[Preference Vector|权重向量]]生成，以更好覆盖多目标偏好空间。其作用是减少普通 [[Monte Carlo estimation|Monte Carlo]] 采样可能带来的聚集和空洞，从而提升生成样本在 [[Pareto front]] 上的覆盖多样性。

## 关键点

- 用于 Algorithm 2: Preference Weight Vectors Generation。
- 目标是让 preference vectors 更均匀地覆盖多目标偏好空间。
- 相比普通 Monte Carlo，能减少采样聚集和覆盖空洞。
- 在 [[IMG]] 框架中服务于 batch-level multi-target generation。
- 该方法在本文中用于支持多目标 trade-off 的多样化生成。

## 别名

- QMC
- Quasi-Monte Carlo
- 准蒙特卡洛采样

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
