---
type: "method"
status: "enriched"
category: "代理模型"
domain: "多目标分子优化 / 贝叶斯优化"
---
# Gaussian Process with MinMax kernel

## 定义

一种用于 count-based [[Morgan fingerprint|分子指纹]]输入的[[Gaussian Process|高斯过程]]代理模型。其核函数采用 [[MinMax kernel]]，定义为各维计数特征的逐维最小值之和除以逐维最大值之和，用于刻画分子指纹之间的相似性。上下文中的论文将其作为每个目标性质的独立 GP 核，并与 [[Expected Hypervolume Improvement|EHVI]]、固定[[Expected Improvement|标量化 EI]] 在相同设置下进行比较。更多关于该核在其他任务中的性质与适用范围，待从更多论文中补充。

## 关键点

- 适用于 count-based [[Morgan fingerprints]] / [[ECFP]] 表示，尤其是 [[RDKit]] 生成的未截断全维计数特征。
- 核函数形式为 k(x, x') = sum_i min(x_i, x'_i) / sum_i max(x_i, x'_i)，是 [[Tanimoto kernel]] 的泛化形式。
- 在论文实验中，每个目标性质分别使用独立 [[Gaussian Process]] 建模。
- 论文固定了部分超参数，包括 amplitude = 1.0、noise variance = 1e-4。
- 该 GP 作为 EHVI 与 [[fixed-weight scalarized EI|scalarized EI]] 的共同代理模型，用于隔离[[acquisition function|采集函数]]差异带来的影响。

## 别名

- MinMax kernel
- Min-Max kernel
- Tanimoto kernel

## 相关论文

- [[2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025]]
