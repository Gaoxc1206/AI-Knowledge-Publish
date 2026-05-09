---
type: "method"
status: "enriched"
category: "优化方法"
domain: "蛋白质序列多目标优化"
---
# linearly scaled cEBM

## 定义

一种基于 [[compositional EBM]] 的[[线性标量化]]基线方法，将多个性质对应的目标以固定权重线性加和后进行采样或优化。它本质上对应于对多个能量/目标做加权求和，而不是像 [[pcEBM]] 那样动态寻找 Pareto 改进方向。论文指出这种方法更适合凸 [[Pareto front]]，但对[[非凸 Pareto front]] 的覆盖能力有限。

## 关键点

- 将多个性质目标按权重 \(\lambda\) 线性组合：\(f_\lambda(x)=\sum_i \lambda_i f_i(x)\)。
- 权重满足单纯形约束：\(\lambda_i\ge 0\)，且 \(\sum_i \lambda_i=1\)。
- 可看作 compositional [[Energy-Based Model|EBM]] 中“把多个目标能量直接加起来”的固定权重版本。
- 主要局限是更适用于凸 Pareto front，难以覆盖非凸 Pareto front 的全部区域。
- 在论文实验中作为与 p[[cEBM]]、[[MGD]] 等方法对比的基线之一。

## 别名

- ls-cEBM
- linear scalarization cEBM
- 线性标量化 cEBM
- 线性加权 cEBM
- linear scalarization baseline

## 相关论文

- [[用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased]]
