---
type: "concept"
status: "enriched"
category: "理论概念"
domain: "多目标黑箱优化"
background: "included"
---
# Quasi-Monte Carlo

## 标准定义

Quasi-[[Monte Carlo estimation|Monte Carlo]]（[[Quasi-Monte Carlo Sampling|QMC]]）是一类用低差异序列替代独立随机采样的数值方法，目标是在有限样本下更均匀地覆盖采样空间，从而提升积分估计、搜索和覆盖型采样的稳定性。与普通 Monte Carlo 不同，QMC 更强调点集的全局均匀性，而不是样本之间的随机独立性。

## 在本知识库中的用法

在该论文中，Quasi-Monte Carlo 用于 Algorithm 2 的 preference weight vectors generation：作者用 QMC 在正超球面上更均匀地生成多目标[[Preference Vector|偏好向量]]，从而避免普通 Monte Carlo 采样出现聚集和空洞。这样可以让一个 batch 中的不同样本对应不同的目标权衡，提升对多目标权重空间的覆盖，并增强最终候选集对 [[Pareto front]] 的多样性覆盖。

## 关键点

- QMC 的核心是用[[低差异序列]]替代随机点，使样本在空间中分布更均匀。
- 它通常适合覆盖型采样、数值积分和需要减少聚集/空洞的任务；常见用途是提升有限样本下的空间覆盖质量。
- 在本知识库对应论文里，QMC 直接服务于[[偏好向量]]生成，而不是用于优化模型参数本身。
- 论文将 QMC 采样到的偏好向量用于多目标扩散推理中的批量生成，使不同样本覆盖不同 trade-off。
- 这种更均匀的偏好覆盖有助于生成更分散的候选解，并提升对[[Pareto front]]的覆盖与多样性。

## 别名

- QMC
- quasi-Monte Carlo
- quasi Monte Carlo
- 低差异采样
- 准蒙特卡洛

## 外部背景

- QMC 的经典思想是用低差异点集近似随机采样，以降低点集在高维空间中的局部聚集；待核对经典来源。
- 常见的 QMC 构造包括 Sobol 序列、Halton 序列和 Faure 序列；待核对经典来源。
- QMC 常用于单位超立方体上的采样；若[[目标空间]]是球面、单纯形或其他流形，通常需要再做几何映射或归一化；待核对经典来源。
- QMC 的效果通常与维度、映射方式和后续使用的[[黑盒 oracle|目标函数]]结构有关，高维时并不总是优于随机 Monte Carlo；待核对经典来源。

## 相关论文

- [[2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025]]
