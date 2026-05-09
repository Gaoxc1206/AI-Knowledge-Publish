---
type: paper
citekey: "yongStudyEHVIVs"
title: "分子设计中 EHVI 与固定标量化方法比较"
chinese_title: "分子设计中 EHVI 与固定标量化方法比较"
authors: "Anabel Yong, Austin Tripp, Layla Hosseini-Gerami, Brooks Paige"
year: ""
venue: ""
doi: ""
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "分子设计中 EHVI 与固定标量化方法比较"
  - "A study of EHVI vs fixed scalarization for molecule design"
original_title: "A study of EHVI vs fixed scalarization for molecule design"
---
## 一句话总结

论文 **A study of EHVI vs fixed scalarization for molecule design** 在受控设置下比较了 Expected Hypervolume Improvement（EHVI）与固定权重标量化的 Expected Improvement（EI），发现 EHVI 在三个 GUACAMOL 多目标分子优化任务上通常能获得更好的 Pareto front 覆盖、更快收敛和更高化学结构多样性。

## 研究问题

本文关注 多目标贝叶斯优化 在 分子设计 中相对于固定标量化方法的实际优势。

核心问题包括：

1. **最优性**：EHVI 是否能比固定权重的 scalarized EI 发现更接近近似 Pareto front 的分子？
2. **多样性**：EHVI 选择的分子是否具有更高的结构多样性？
3. **权衡能力**：在固定 BO 评估预算下，EHVI 与固定权重 EI 如何在最优性与多样性之间取得平衡？

论文特别强调：它并不是要否定所有 标量化方法，因为标量化还包括随机标量化、自适应标量化等更灵活形式；本文只比较一种常用、简单且可控的固定权重 EI 基线。

## 背景与动机

药物分子发现天然是一个 多目标优化 问题。一个候选药物分子通常需要同时满足多个相互竞争的性质，例如：

- 活性或靶标相似性；
- 安全性；
- 药代动力学性质；
- QED；
- logP；
- SA score；
- 分子量等。

传统实践中常使用 标量化方法，即把多个目标通过加权和等方式压缩成单个目标，再使用单目标优化方法。其优点是可以直接复用成熟的单目标优化管线，例如 Expected Improvement、Upper Confidence Bound 等。

但固定权重标量化存在几个问题：

1. **需要预先设定权重**  
   真实药物设计中，各目标的重要性往往不确定、依赖上下文，甚至难以明确量化。

2. **固定权重通常只对应 Pareto front 上的一个区域或一个点**  
   如果希望获得多样化的 trade-off 解，需要多次使用不同权重重复优化。

3. **对非凸 Pareto front 覆盖不足**  
   简单加权和标量化通常只能保证恢复凸前沿上的 Pareto-optimal 解，对非凸区域表现有限。

4. **在低数据、昂贵评估场景中重复优化成本高**  
   分子性质评估、湿实验或高保真模拟通常成本较高，因此样本效率非常关键。

因此，论文动机是检验 Pareto-aware acquisition 是否能在分子优化中比固定标量化策略更有效，尤其是在低数据预算下。

## 核心思想

本文核心思想是：

> 在完全相同的分子表示、Gaussian Process surrogate 和评估流程下，仅改变 acquisition function，比较 Pareto-aware 的 EHVI 与固定权重 scalarized EI 的表现，从而隔离 acquisition strategy 本身的影响。

具体来说：

- EHVI 直接建模并优化 Hypervolume Indicator 的期望提升，显式推动 Pareto front 扩展；
- 固定权重 EI 先将多个目标压缩成单一标量 utility，再使用 Expected Improvement 选择候选分子；
- 二者使用相同的 Gaussian Process、相同的分子指纹、相同的候选池与优化预算。

实验结果显示：

- EHVI 在多数任务上获得更高 hypervolume；
- EHVI 获得更低 R2 indicator，即更好的 Pareto front 近似；
- EHVI 在 #Circles 指标上通常具有更高或相当的化学结构多样性；
- EHVI 的优势在 低数据分子优化 中尤其明显。

## 方法框架

本文方法框架可以概括为一个受控的 多目标贝叶斯优化 比较实验。

### 1. 问题设定

给定分子 $m$，有多个目标性质：

$$
f(m) = (f_1(m), f_2(m), \dots, f_k(m))
$$

目标是寻找一组非支配解，使其尽可能逼近 Pareto front。

### 2. 分子表示

论文使用：

- Morgan fingerprint
- ECFP
- radius = 3
- count-based features
- 未截断的 full-dimensional count-based ECFP vectors
- 使用 RDKit 计算

### 3. Surrogate model

每个分子性质 $f_j(m)$ 独立使用一个 Gaussian Process 建模：

$$
f_j \sim GP(\mu_j, K_j)
$$

每个目标获得独立的 Gaussian posterior：

$$
\vec{\mu}(m), \vec{\sigma}^2(m)
$$

### 4. Kernel

实验使用 MinMax kernel，它是 Tanimoto kernel 的 count-aware generalization，适合 count-based Morgan fingerprints。

公式为：

$$
k_{MinMax}(x, x') = \frac{\sum_i \min(x_i, x'_i)}{\sum_i \max(x_i, x'_i)}
$$

该 kernel 衡量两个分子指纹之间的结构相似性。

论文背景部分也介绍了 Tanimoto kernel：

$$
k_{Tanimoto}(x, x') =
\frac{x^\top x'}{\|x\|_2^2 + \|x'\|_2^2 - x^\top x'}
$$

但实际实验设置中使用的是 MinMax kernel。

### 5. Acquisition functions

比较两个 acquisition strategy：

#### EHVI

Expected Hypervolume Improvement 是 Pareto-based acquisition function。

它衡量加入候选点 $x$ 后，当前非支配集合在目标空间中支配体积的期望增量：

$$
EHVI(x) =
\mathbb{E}[HV_z(P_t \cup \{f(x)\}) - HV_z(P_t)]
$$

其中：

- $P_t$ 是当前 Pareto approximation set；
- $z$ 是 reference point；
- $HV_z$ 是相对于 reference point 的 hypervolume。

EHVI 保留多目标结构，不把目标压缩为单一分数。

#### Scalarized EI

固定权重 scalarized EI 首先将多个目标压缩成单一标量：

$$
f_{ws}(x) = \sum_{i=1}^{k} w_i f_i(x)
$$

然后在该标量目标上使用 Expected Improvement。

论文未在给定摘录中明确列出固定权重的具体数值，需 **待补充原文/PDF 后确认**。

### 6. 实现细节

- GP 实现使用 JAX-based framework：`kernel_only_GP`
- EHVI 使用 Monte Carlo 估计
- 每个候选分子使用 1000 次 Monte Carlo draws
- 每轮从固定候选池中选择一个分子
- 候选池大小：10,000 compounds
- 候选池来自 GUACAMOL training set
- 每次运行 200 BO rounds
- 每个方法使用 3 个 random seeds
- 计算资源：NVIDIA H100-47 GPUs

## 算法流程

### EHVI-based MOBO 流程

1. 初始化训练 archive，包含已有分子及其多个目标性质。
2. 对每个目标性质 $f_j(m)$ 分别训练独立的 Gaussian Process。
3. 对候选池中每个分子计算多目标 posterior：
   - predictive mean；
   - predictive variance。
4. 使用 Monte Carlo sampling 估计每个候选分子的 Expected Hypervolume Improvement。
5. 选择 EHVI 最大的分子。
6. 评估该分子的真实目标性质。
7. 将该分子加入训练 archive。
8. 更新所有 GP surrogate。
9. 重复 200 轮。
10. 使用 Hypervolume Indicator、R2 indicator、#Circles metric 评估最终结果。

### Fixed scalarized EI 流程

1. 初始化训练 archive。
2. 对每个目标性质使用相同 GP surrogate 设置。
3. 用固定权重将多个目标压缩成一个标量 objective。
4. 在 scalarized objective 上计算 Expected Improvement。
5. 选择 EI 最大的候选分子。
6. 评估真实多目标性质。
7. 加入 archive 并更新 GP。
8. 重复 200 轮。
9. 使用与 EHVI 相同的指标评估。

### 受控变量

为确保比较公平，论文固定以下因素：

- 相同的候选池；
- 相同的分子表示；
- 相同的 GP surrogate；
- 相同的 MinMax kernel；
- 相同的 BO 预算；
- 相同的 random seed 数量；
- 相同的评价指标。

主要变量仅为 acquisition function：

- Expected Hypervolume Improvement
- fixed-weight scalarized Expected Improvement

## 实验设置

### Benchmark tasks

使用 GUACAMOL 中三个 multi-property optimization tasks：

1. **Amlodipine MPO**
2. **Fexofenadine MPO**
3. **Perindopril MPO**

每个任务联合优化三个分子性质：

- target similarity；
- QED；
- 以及 logP、SA score 或 molecular weight 中的一个。

具体每个 MPO 对应哪个第三目标，在摘录中未逐项列明，需 **待补充原文/PDF 后确认**。

### 优化预算

- 每轮选择 1 个 molecule；
- 总共 200 BO evaluations；
- 每种方法 3 个 random seeds；
- 候选池大小为 10,000；
- 候选分子来自 GUACAMOL training set。

### Surrogate 设置

- 每个 objective 独立 GP；
- kernel：MinMax kernel；
- molecular representation：count-based ECFP radius 3；
- amplitude $\alpha = 1.0$；
- noise variance $s = 10^{-4}$；
- 所有 hyperparameters 在不同方法和 trials 中固定；
- 未进行 adaptive hyperparameter tuning。

### Acquisition 设置

- EHVI：
  - Pareto-based；
  - Monte Carlo sampling；
  - 每个 candidate 使用 1000 draws。

- Scalarized EI：
  - fixed weights；
  - weighted scalar objective；
  - 使用 Expected Improvement。

### 评价指标

#### 1. Hypervolume Indicator，HVI

Hypervolume Indicator 衡量当前非支配解相对于 reference point 所支配的目标空间体积。

- 越高越好；
- 同时反映 Pareto front 的收敛性和覆盖范围。

#### 2. R2 indicator

R2 indicator 使用一组均匀分布的 reference directions 评估 Pareto front approximation quality。

- 本文使用 augmented Tchebycheff scalarization；
- 越低越好；
- 较低值表示解集更接近理想点且分布更均匀。

#### 3. #Circles metric

#Circles metric 衡量化学空间覆盖与结构多样性。

- 基于 Tanimoto distance threshold；
- 在 Pareto-optimal candidates 上计算；
- 阈值越高，要求分子之间越不相似；
- 较高 #Circles 表示覆盖了更多结构上不同的化学区域。

### 统计分析

由于每种方法只有 3 个 random seeds，论文使用 effect size 辅助判断差异：

- Cohen's d
- Cliff's Delta

## 主要结果

### 总体结论

EHVI 在三个 MPO 任务上整体优于或不弱于 scalarized EI，具体体现在：

- 更高 Hypervolume Indicator；
- 更低 R2 indicator；
- 更高或相当的 #Circles metric；
- 更快收敛；
- 更好的 Pareto front coverage；
- 更好的化学结构多样性。

### Hypervolume 结果

论文报告 EHVI 在 Amlodipine、Fexofenadine 和 Perindopril 三个任务中整体表现更好。

#### Final hypervolume after 200 BO evaluations

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.4022 ± 0.0661 | 0.3492 ± 0.0190 |
| Amlodipine | 0.2421 ± 0.0425 | 0.2220 ± 0.0251 |
| Perindopril | 0.2080 ± 0.0016 | 0.2088 ± 0.0230 |

观察：

- Fexofenadine：EHVI 明显更高；
- Amlodipine：EHVI 更高；
- Perindopril：最终 hypervolume 两者接近，scalarized EI 的均值略高，但 EHVI 方差更低，且论文称 EHVI 收敛更早、更稳健。

#### Hypervolume effect sizes

| Task | Cohen's d | Cliff's Delta |
|---|---:|---:|
| Fexofenadine | 1.093 | 0.556 |
| Amlodipine | 0.576 | 0.333 |
| Perindopril | -0.050 | 0.333 |

解释：

- Fexofenadine 上 EHVI 有较大优势；
- Amlodipine 上 EHVI 有中等优势；
- Perindopril 上最终 hypervolume 差异很小，但 Cliff's Delta 仍显示匹配试验中 EHVI 有一定有利趋势。

### R2 indicator 结果

R2 越低越好。EHVI 在三个任务上均取得更低 final R2。

#### Final R2 after 200 BO evaluations

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.3728 ± 0.0204 | 0.4360 ± 0.0293 |
| Amlodipine | 0.1649 ± 0.0203 | 0.1816 ± 0.0212 |
| Perindopril | 0.1582 ± 0.0087 | 0.1953 ± 0.0322 |

观察：

- EHVI 在所有任务上 R2 更低；
- Fexofenadine 上差距最大；
- Perindopril 上 EHVI 从中期以后明显占优；
- Amlodipine 上 EHVI 在早期波动后保持较低 R2。

#### R2 effect sizes

| Task | Cohen's d | Cliff's Delta |
|---|---:|---:|
| Fexofenadine | -2.560 | -1.000 |
| Amlodipine | -0.770 | -0.556 |
| Perindopril | -1.602 | -0.778 |

解释：

- 负值表示 EHVI 更好；
- Fexofenadine 和 Perindopril 上优势很强；
- Amlodipine 上也有明显优势。

### #Circles diversity 结果

论文报告 EHVI 在化学结构多样性方面表现为“superior or comparable”。

具体趋势：

- **Fexofenadine MPO**：当 Tanimoto distance threshold $t \geq 0.60$ 时，EHVI 明显超过 EI，发现更多结构不同的分子 motif。
- **Perindopril MPO**：EHVI 在整个阈值范围内保持更好的 diversity。
- **Amlodipine MPO**：低到中等阈值下两者相近；当 $t > 0.75$ 时，EHVI 维持更高 diversity，说明其更能探索结构差异较大的高质量解。

摘录中未给出 #Circles 的具体数值表，需 **待补充原文/PDF 后确认**。

## 创新点

1. **受控比较 EHVI 与固定 scalarized EI**  
   本文不是泛泛比较 MOBO 与 scalarization，而是在相同 surrogate、相同 representation、相同候选池、相同 BO 预算下，只改变 acquisition function。

2. **聚焦分子设计中的实际低数据场景**  
   分子优化常常评估昂贵，论文强调 EHVI 在有限评估预算下的样本效率优势。

3. **同时评估 Pareto 质量与化学多样性**  
   不只看 hypervolume，还使用 R2 indicator 和 #Circles metric，覆盖：
   - Pareto front coverage；
   - Pareto approximation quality；
   - chemical structural diversity。

4. **提供 EHVI 在 de novo molecular optimization 中的实证证据**  
   结果支持 Pareto-aware acquisition 在分子优化中可作为比固定权重标量化更稳健的默认选择。

5. **隔离 acquisition function 的影响**  
   因为 surrogate fidelity、kernel choice、representation capacity 都保持一致，结果更能说明 acquisition strategy 本身的重要性。

## 局限性

1. **只比较固定权重 scalarized EI**  
   本文没有覆盖更强或更灵活的 scalarization 方法，例如：
   - random scalarizations；
   - adaptive scalarizations；
   - Tchebycheff scalarization；
   - hypervolume scalarization；
   - ParEGO。

2. **random seeds 较少**  
   每种方法仅 3 个 random seeds。虽然论文使用 Cohen's d 和 Cliff's Delta，但统计功效仍有限。

3. **GP hyperparameters 固定**  
   amplitude 和 noise variance 固定，没有进行 adaptive hyperparameter tuning，可能限制 surrogate 在复杂或噪声目标下的适应性。

4. **每个 objective 使用独立 GP**  
   没有建模不同目标之间的相关性。对于多性质分子优化，目标间相关性可能包含有用信息。

5. **EHVI 使用 1000 次 Monte Carlo draws，但未做采样数消融**  
   论文讨论中指出，MC sampling 数量可能影响 EHVI 估计精度和优化行为，未来需要 ablation study。

6. **候选池固定为 GUACAMOL training set 中的 10,000 compounds**  
   这更接近 pool-based optimization，而不是完全开放式 de novo generation。是否能推广到更大的生成空间，需进一步验证。

7. **没有纳入合成可行性、约束优化或噪声目标的系统评估**  
   论文提到未来可扩展到 noisy、constrained 或 synthesis-feasible objectives。

8. **年份、venue、DOI 元数据缺失**  
   论文第一页显示 accepted to AI for Science workshop (NeurIPS 2025)，但 Zotero 元数据中 year、venue、DOI 为空。最终 bibliographic 信息需 **待补充原文/PDF 后确认**。

## 相关概念

- [[多目标优化]]
- [[多目标贝叶斯优化]]
- [[分子设计]]
- [[de novo molecular optimization]]
- [[multi-property optimization]]
- [[Pareto optimality]]
- [[Pareto set]]
- [[Pareto front]]
- [[non-dominated solution]]
- [[Hypervolume Indicator]]
- [[Expected Hypervolume Improvement]]
- [[Expected Improvement]]
- [[Gaussian Process]]
- [[Bayesian optimization]]
- [[acquisition function]]
- [[scalarization]]
- [[weighted sum scalarization]]
- [[Tchebycheff scalarization]]
- [[hypervolume scalarization]]
- [[Tanimoto kernel]]
- [[MinMax kernel]]
- [[Morgan fingerprint]]
- [[ECFP]]
- [[QED]]
- [[logP]]
- [[SA score]]
- [[molecular weight]]
- [[chemical diversity]]
- [[#Circles metric]]
- [[R2 indicator]]
- [[Cohen's d]]
- [[Cliff's Delta]]
- [[low-data molecular optimization]]
- [[Pareto-aware acquisition]]
- [[sample efficiency]]
- [[structure-property relationship]]

## 相关方法

- [[Expected Hypervolume Improvement]]
- [[Expected Improvement]]
- [[Gaussian Process Bayesian Optimization]]
- [[fixed-weight scalarized EI]]
- [[weighted sum scalarization]]
- [[Tchebycheff scalarization]]
- [[random scalarization]]
- [[hypervolume scalarization]]
- [[ParEGO]]
- [[PESMO]]
- [[DGEMO]]
- [[NSGA-II]]
- [[MOEA/D]]
- [[Multi-Objective GFlowNets]]
- [[Thompson Sampling]]
- [[Upper Confidence Bound]]
- [[Monte Carlo estimation]]
- [[MinMax kernel GP]]
- [[Tanimoto kernel GP]]

## 相关论文

- [[Guacamol: Benchmarking Models for de Novo Molecular Design]]
- [[Random Hypervolume Scalarizations for Provable Multi-Objective Black Box Optimization]]
- [[Differentiable Expected Hypervolume Improvement for Parallel Multi-Objective Bayesian Optimization]]
- [[Hypervolume-based Expected Improvement: Monotonicity Properties and Exact Computation]]
- [[ParEGO: A Hybrid Algorithm with On-line Landscape Approximation for Expensive Multiobjective Optimization Problems]]
- [[Predictive Entropy Search for Multi-objective Bayesian Optimization]]
- [[Diversity-Guided Multi-Objective Bayesian Optimization with Batch Evaluations]]
- [[Multi-Objective GFlowNets]]
- [[Sample-Efficient Multi-Objective Molecular Optimization with GFlowNets]]
- [[Pareto Optimization to Accelerate Multi-Objective Virtual Screening]]
- [[Computer-Aided Multi-Objective Optimization in Small Molecule Discovery]]
- [[Diagnosing and Fixing Common Problems in Bayesian Optimization for Molecule Design]]
- [[A Fresh Look at De Novo Molecular Design Benchmarks]]
- [[Extended-Connectivity Fingerprints]]
- [[Graph Kernels for Chemical Informatics]]
- [[Gaussian Processes for Machine Learning]]
- [[A Fast and Elitist Multiobjective Genetic Algorithm: NSGA-II]]
- [[MOEA/D: A Multiobjective Evolutionary Algorithm Based on Decomposition]]

## 源文件

- citekey: `yongStudyEHVIVs`
- title: **A study of EHVI vs fixed scalarization for molecule design**
- authors: Anabel Yong, Austin Tripp, Layla Hosseini-Gerami, Brooks Paige
- year: 待补充原文/PDF 后确认
- venue: Zotero 元数据缺失；PDF 首页显示 accepted to AI for Science workshop (NeurIPS 2025)，需待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化

## 图表摘录

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/page-001.png]]

## Zotero 原始摘要

Multi-objective Bayesian optimization (MOBO) provides a principled framework for navigating trade-offs in molecular design. However, its empirical advantages over scalarized alternatives remain underexplored. We benchmark a simple Paretobased MOBO strategy—Expected Hypervolume Improvement (EHVI)-against a simple fixed-weight scalarized baseline using Expected Improvement (EI), under a tightly controlled setup with identical Gaussian Process surrogates and molecular representations. Across three molecular optimization tasks, EHVI consistently outperforms scalarized EI in terms of Pareto front coverage, convergence speed, and chemical diversity. While scalarization encompasses flexible variants - including random or adaptive schemes—our results show that even strong deterministic instantiations can underperform in low-data regimes. These findings offer concrete evidence for the practical advantages of Pareto-aware acquisition in de novo molecular optimization, especially when evaluation budgets are limited and trade-offs are nontrivial.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的价值不在于提出一个新的 EHVI 算法，而在于给出一个相对干净的实证比较：当模型、表示、kernel、候选池和预算都相同的时候，Pareto-aware acquisition 本身是否带来收益。

从结果看，答案倾向于是肯定的。固定权重 scalarized EI 的根本限制在于它把多目标问题提前压缩成一个单目标问题，因此优化过程会被预设偏好牵引。对于药物发现这样 trade-off 不明确的场景，这种预设权重可能过早限制搜索方向。EHVI 则直接奖励对当前 Pareto front 的 hypervolume 增量，因此更自然地探索不同 trade-off 区域。

特别值得注意的是，EHVI 不仅提高了 hypervolume，也改善了 R2 indicator 和 #Circles diversity。这说明它不是简单地在某个方向上优化得更激进，而是更好地覆盖了目标空间和化学结构空间。

不过，这篇论文的结论应理解为：

> EHVI 优于一种常用的固定权重 scalarized EI 基线。

而不应扩大为：

> EHVI 一定优于所有 scalarization 方法。

因为随机标量化、Tchebycheff scalarization、ParEGO、hypervolume scalarization 等方法可能更强。论文自己也承认了这一点。

对我的启发是：在 多目标分子优化 中，如果目标偏好尚不明确，且评估预算有限，直接使用 Expected Hypervolume Improvement 或其他 Pareto-aware acquisition 可能比手工设定固定权重更稳健。尤其是在早期 hit discovery 或 lead optimization 的探索阶段，获得一组多样化 Pareto candidates 往往比得到单个高分分子更有价值。

## 后续问题

1. 固定权重 scalarized EI 中具体使用了哪些权重？是否所有任务相同？需待补充原文/PDF 后确认。
2. 如果与 ParEGO、random scalarization、Tchebycheff scalarization 比较，EHVI 是否仍有优势？
3. EHVI 的优势是否部分来自 1000 次 Monte Carlo draws 带来的更精确 acquisition estimate？
4. Monte Carlo sample 数量从 100、500、1000、5000 变化时，EHVI 的性能和计算成本如何变化？
5. 如果 GP hyperparameters 自适应调优，EHVI 与 EI 的差距会扩大还是缩小？
6. 独立 GP 是否足够？使用 multi-output GP 或 co-kriging 建模目标相关性会不会提升表现？
7. 在更高维目标，例如 5 个或 10 个分子性质时，EHVI 是否仍然稳定？其计算成本是否会成为瓶颈？
8. 在包含合成可行性约束的分子优化任务中，EHVI 表现如何？
9. 固定候选池优化结果能否推广到真正的生成式 de novo molecular design？
10. #Circles 指标与实际 medicinal chemistry 中的 scaffold diversity、series diversity 是否一致？
11. EHVI 是否会偏好极端 trade-off 解？是否需要与 diversity-aware acquisition 结合？
12. 如果使用 learned molecular embeddings 而不是 count-based ECFP + MinMax kernel，结果是否保持一致？
