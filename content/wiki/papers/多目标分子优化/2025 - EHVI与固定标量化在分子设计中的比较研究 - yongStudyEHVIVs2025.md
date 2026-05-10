---
type: paper
citekey: "yongStudyEHVIVs2025"
title: "EHVI与固定标量化在分子设计中的比较研究"
chinese_title: "EHVI与固定标量化在分子设计中的比较研究"
authors: "Anabel Yong, Austin Tripp, Layla Hosseini-Gerami, Brooks Paige"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2507.13704"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "EHVI与固定标量化在分子设计中的比较研究"
  - "A study of EHVI vs fixed scalarization for molecule design"
original_title: "A study of EHVI vs fixed scalarization for molecule design"
---
## 一句话总结

这篇论文在受控实验中比较了 Pareto-aware 的 Expected Hypervolume Improvement (EHVI) 与固定权重标量化的 Expected Improvement (EI)，发现 EHVI 在三个 GUACAMOL 多目标分子优化任务上通常具有更好的 Pareto front 覆盖、更快收敛和更高化学结构多样性。

## 研究问题

论文关注的问题是：在 de novo molecular optimization 中，如果其他因素尽量保持一致，仅改变 acquisition function，Pareto-based MOBO 是否比固定权重 scalarized BO 更有效？

具体研究问题包括：

1. **最优性**：EHVI 是否比 scalarized EI 发现更接近近似 Pareto front 的解？
2. **多样性**：EHVI 选择的分子是否具有更高结构多样性？
3. **权衡能力**：在固定 Bayesian optimization 评估预算下，EHVI 和 EI 在最优性与多样性之间如何取舍？

论文强调比较对象不是“所有 scalarization 方法”，而是一个常见、简单且受控的固定权重 scalarized EI baseline。作者希望隔离 acquisition function 的影响，避免 surrogate model、kernel、molecular representation 等因素造成混淆。

## 背景与动机

药物分子发现本质上是多目标优化问题。一个候选分子通常需要同时满足多个互相冲突的目标，例如活性、毒性、安全性、药代性质、合成可及性等。传统 scalarization 方法会将多个目标用加权和等方式压缩成单个标量目标，因此可以直接使用单目标优化流程。

但固定 scalarization 存在几个问题：

- 权重需要预先指定，而真实药物设计中目标偏好往往不确定、上下文相关或难以精确定义。
- 一个固定权重通常只对应 Pareto front 上的一个区域或一个点。
- 若想覆盖多样化 trade-off，需要多次使用不同权重重复优化，可能带来计算冗余。
- 对非凸 Pareto front，简单加权和可能无法恢复某些 Pareto-optimal 区域。

Multi-objective Bayesian optimization (MOBO) 通过保持目标向量结构，直接搜索非支配解和 Pareto front，可以更自然地处理 trade-off。EHVI 是其中典型的 Pareto-based acquisition function，它以期望超体积增益作为采样准则，直接鼓励候选点扩展当前 Pareto front 覆盖范围。

本文的动机是：尽管 MOBO 在理论和多个科学设计任务中受到关注，但在分子优化中，Pareto-based acquisition 与常用 scalarized acquisition 的受控实证比较仍不足。因此作者设计了一个“尽量公平”的实验：两类方法使用相同 Gaussian Process surrogate、相同 molecular representation、相同 candidate pool 和相同优化预算，仅 acquisition function 不同。

## 核心思想

本文核心思想是：在多目标分子设计中，不应过早把目标压缩成一个固定标量分数，而应使用 Pareto-aware acquisition function 直接面向 Pareto front 覆盖进行优化。

具体来说：

- scalarized EI 使用固定权重把多个 molecular property 合成一个标量目标，再用 Expected Improvement 选择下一个分子；
- EHVI 保留多个目标的向量形式，评估候选分子加入当前非支配解集合后能带来的期望 hypervolume improvement；
- 在低数据、评估预算有限的场景中，EHVI 更能主动探索尚未覆盖的 trade-off 区域，因此可能获得更高 hypervolume、更好的 Pareto front approximation 和更多结构多样分子。

论文结果支持这一观点：EHVI 在 Amlodipine MPO、Fexofenadine MPO、Perindopril MPO 三个任务上整体优于 fixed-weight scalarized EI 和 random sampling。

## 方法框架

本文方法框架可以概括为一个受控的 multi-objective Bayesian optimization pipeline：

1. 从 GUACAMOL training set 中构建固定候选分子池。
2. 使用 ECFP / Morgan fingerprints 表示分子。
3. 对每个分子属性目标分别训练一个 Gaussian Process surrogate。
4. 所有方法使用相同的 surrogate model、kernel、表示和候选池。
5. 比较两种 acquisition strategy：
   - Expected Hypervolume Improvement (EHVI)
   - fixed-weight scalarized Expected Improvement (EI)
6. 每轮从候选池中选择一个分子进行评估并加入训练 archive。
7. 重复 200 轮 Bayesian optimization。
8. 使用 Hypervolume Indicator、$R^2$ indicator 和 #Circles metric 评估结果。

分子表示与 kernel：

- 分子使用 extended-connectivity fingerprints (ECFPs)，半径为 3；
- fingerprints 由 RDKit 计算；
- 使用 count-based features，没有截断；
- Gaussian Process 使用 MinMax kernel，这是 Tanimoto kernel 的 count-aware generalization：

$$
k _ {\text { MinMax }} (x, x ^ {\prime}) = \frac {\sum_ {i} \min (x _ {i} , x _ {i} ^ {\prime})}{\sum_ {i} \max (x _ {i} , x _ {i} ^ {\prime})}
$$

每个目标 $f_j(m)$ 独立建模：

$$
f_j \sim \mathcal{GP}(\mu_j, K_j(x_i, x_q))
$$

预测时，每个目标给出独立 Gaussian posterior，对应预测均值和方差 $\vec{\mu}(m)$ 与 $\vec{\sigma}^2(m)$。

模型实现：

- 使用 JAX-based framework：kernel_only_GP；
- amplitude $\alpha = 1.0$；
- noise variance $s = 10^{-4}$；
- 所有超参数在 trials 和 methods 之间固定；
- EHVI 使用 Monte Carlo sampling，每个候选分子 1000 draws；
- 每轮从 10,000 个 GUACAMOL training set 分子组成的固定候选池中选择一个；
- 每个方法每个任务运行 200 optimization rounds；
- 每个方法重复 3 个 random seeds；
- 计算均值和标准差；
- 使用 Cohen's $d$ 与 Cliff's Delta 分析 effect size；
- 计算硬件为 NVIDIA H100-47 GPUs。

## 算法流程

本文没有给出伪代码，但根据正文可以整理出如下流程。

### EHVI 流程

1. 初始化已评估分子 archive。
2. 对每个目标属性分别训练 Gaussian Process。
3. 对候选池中每个候选分子：
   - 使用每个 GP 预测目标分布；
   - 用 Monte Carlo sampling 估计该候选加入当前 Pareto set 后带来的 expected hypervolume improvement。
4. 选择 EHVI 最大的候选分子。
5. 评估该分子的真实目标值。
6. 将该分子加入 archive。
7. 更新所有 GP。
8. 重复直到达到 200 次 BO evaluations。

EHVI 的形式为：

$$
\operatorname{EHVI} (x) = \mathbb {E} [ H V _ {z} (\mathcal {P} _ {t} \cup \{f (x) \}) - H V _ {z} (\mathcal {P} _ {t}) ]
$$

原文公式中第二项疑似排版为 $\mathcal{P}_{\sqcup}$，根据 EHVI 定义应为当前 Pareto approximation set，需待补充原文/PDF 后确认具体排版。

### Scalarized EI 流程

1. 初始化已评估分子 archive。
2. 对每个目标属性分别训练相同的 Gaussian Process。
3. 使用固定权重将多个目标组合为单个 scalarized objective。
4. 对候选池中每个候选分子计算 Expected Improvement。
5. 选择 EI 最大的候选分子。
6. 评估该分子的真实目标值。
7. 将该分子加入 archive。
8. 更新 GP。
9. 重复直到达到 200 次 BO evaluations。

### Random sampling baseline

论文图中还报告了 random sampling baseline。其具体采样细节在当前摘取文本中未详细展开，待补充原文/PDF 后确认。

## 实验设置

### Benchmark tasks

论文使用 GUACAMOL 中的三个 multi-property optimization (MPO) tasks：

- Amlodipine MPO
- Fexofenadine MPO
- Perindopril MPO

每个任务联合优化三个 molecular properties：

- target similarity
- QED
- logP、SA score 或 molecular weight 中的一个

不同任务对应哪个第三属性，当前摘取文本没有逐项列明，待补充原文/PDF 后确认。

### 方法对比

比较方法：

- Expected Hypervolume Improvement (EHVI)
- fixed-weight scalarized Expected Improvement (EI)
- random sampling baseline，主要出现在结果图中

作者明确说明，scalarization 有很多更灵活的变体，例如 random scalarizations 或 adaptive scalarizations；本文只比较固定权重 EI，并不声称 EHVI 全面优于所有 scalarization 方法。

### Evaluation metrics

#### Hypervolume Indicator (HVI)

HVI 衡量非支配解相对于 reference point 所支配的目标空间体积。HVI 越高，表示 Pareto front 覆盖和 trade-off 质量越好。

#### $R^2$ indicator

$R^2$ indicator 用于评估 Pareto front approximation quality。论文采用 Jain et al. (2023) 设置，使用一组均匀分布的 reference directions，并计算 augmented Chebyshev scalarization。较低的 $R^2$ 表示 front 更接近 ideal front 且分布更均匀。

#### #Circles metric

#Circles metric 用于度量化学空间结构多样性。它统计在给定 Tanimoto distance threshold $t$ 下，候选集合中能覆盖多少 pairwise dissimilar molecules。阈值越高，表示要求分子之间更不相似；在高阈值下 #Circles 越大，表示探索到了更多结构上显著不同的区域。

本文在初始分子和 200 次 BO 后获得的 Pareto-optimal candidates 上计算 #Circles，而不是在所有生成样本上计算。

## 主要结果

### 总体结果

论文报告 EHVI 在三个任务、三类指标上整体优于 scalarized EI：

- Hypervolume Indicator：EHVI 通常更高，说明 Pareto front coverage 更好；
- $R^2$ indicator：EHVI 通常更低，说明 Pareto approximation 更接近参考前沿；
- #Circles metric：EHVI 在严格 Tanimoto distance threshold 下通常有更高结构多样性。

作者还用 effect size 支持结论：

- Hypervolume 上，EHVI 的 Cohen's $d$ 在 0.576 到 1.093 之间，表示中到大效应；Perindopril 上 Cohen's $d=-0.050$，说明最终 HVI 不占优或差异很小。
- $R^2$ indicator 上，EHVI 有明显更低数值，例如 Fexofenadine MPO 上 $d=-2.56$。
- Cliff's Delta 也总体支持 EHVI 的优势。

### Hypervolume Indicator 结果

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-01.jpg]]

图 1 总览了三个 MPO task 上 200 轮 Bayesian optimization 的 HVI 曲线。总体看，EHVI 比 scalarized EI 和 random sampling 更快达到较高 hypervolume，并表现出更好的最终 Pareto front coverage。

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-02.jpg]]

Amlodipine MPO 中，EHVI 收敛更快，最终 HVI 更高，且方差较低。这说明在该任务中 Pareto-aware acquisition 带来了更稳定的 front expansion。

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-03.jpg]]

Fexofenadine MPO 中，EHVI 与 scalarized EI 的差距更明显，尤其在优化后期持续领先。这表明当 trade-off 更复杂或 scalarized objective 覆盖不足时，EHVI 的优势更突出。

根据附录表 1，200 次 BO evaluations 后 final hypervolume 为：

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.4022 ± 0.0661 | 0.3492 ± 0.0190 |
| Amlodipine | 0.2421 ± 0.0425 | 0.2220 ± 0.0251 |
| Perindopril | 0.2080 ± 0.0016 | 0.2088 ± 0.0230 |

Perindopril 上二者最终 HVI 几乎相同，scalarized EI 的均值略高，但 EHVI 方差更小；论文正文强调 EHVI 更早收敛并更稳定。

### $R^2$ indicator 结果

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-04.jpg]]

图 2 展示了三个任务上 $R^2$ indicator 随 BO iterations 的变化。由于 $R^2$ 越低越好，EHVI 曲线整体更低，说明它得到的 Pareto front approximation 更接近 reference front。

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-05.jpg]]

Amlodipine MPO 中，EHVI 早期有一定波动，但后续通常保持低于 scalarized EI 的 $R^2$。这说明 EHVI 在该任务中 front approximation 的优势相对温和但持续存在。

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-06.jpg]]

Fexofenadine MPO 中，EHVI 获得最低且最稳定的 $R^2$ scores，与 scalarized EI 保持明显差距。这是论文中 EHVI 在 front approximation 上最强的证据之一。

根据附录表 2，200 次 BO evaluations 后 final $R^2$ values 为：

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.3728 ± 0.0204 | 0.4360 ± 0.0293 |
| Amlodipine | 0.1649 ± 0.0203 | 0.1816 ± 0.0212 |
| Perindopril | 0.1582 ± 0.0087 | 0.1953 ± 0.0322 |

三个任务上 EHVI 的 $R^2$ 均更低。

### #Circles chemical diversity 结果

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-07.jpg]]

图 3 总体展示了随着 Tanimoto distance threshold 增大，Pareto-optimal candidates 的结构多样性变化。EHVI 通常保持或超过 scalarized EI，尤其在更严格的高阈值下优势更明显。

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-08.jpg]]

Amlodipine MPO 中，EHVI 和 EI 在低到中等阈值下相近，但在 $t > 0.75$ 后 EHVI 多样性更高。这说明 EHVI 更容易找到结构差异较大的高质量分子。

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-09.jpg]]

Fexofenadine MPO 与 Perindopril MPO 中，EHVI 在较高 Tanimoto distance threshold 下表现出更明显的结构多样性优势。论文认为这说明 EHVI 能在优化目标性能的同时更好保留 chemical novelty。

### Effect size 结果

Hypervolume effect size：

| Task | Cohen's d | Cliff's Delta |
|---|---:|---:|
| Fexofenadine | 1.093 | 0.556 |
| Amlodipine | 0.576 | 0.333 |
| Perindopril | -0.050 | 0.333 |

$R^2$ values effect size：

| Task | Cohen's d | Cliff's Delta |
|---|---:|---:|
| Fexofenadine | -2.560 | -1.000 |
| Amlodipine | -0.770 | -0.556 |
| Perindopril | -1.602 | -0.778 |

对于 $R^2$，负值表示 EHVI 更好，因为 $R^2$ 越低越优。

## 创新点

1. **受控比较 acquisition function**
   - 论文将 surrogate model、molecular representation、kernel、候选池和优化预算保持一致，突出比较 EHVI 与 fixed-weight scalarized EI 的 acquisition strategy 差异。

2. **针对分子设计场景验证 Pareto-aware BO 的实用优势**
   - 论文不是只从理论上说明 EHVI 的合理性，而是在 GUACAMOL 的三个 MPO tasks 上给出实证证据。

3. **同时评估 Pareto coverage、front approximation 和 chemical diversity**
   - 使用 HVI、$R^2$ indicator 和 #Circles metric，从目标空间覆盖、Pareto front 近似质量、化学结构多样性三个角度评价。

4. **强调低数据预算下的差异**
   - 每个任务仅 200 次 BO evaluations，符合分子设计中评估昂贵、数据有限的实际场景。

5. **对固定 scalarization 的局限提供具体实验依据**
   - 论文不是笼统否定 scalarization，而是指出即使是常见且强确定性的固定权重 EI，在有限预算、多目标 trade-off 中也可能低于 Pareto-aware acquisition。

## 局限性

1. **只比较固定权重 scalarized EI**
   - Scalarization 包括 random scalarization、adaptive scalarization、Tchebycheff scalarization、hypervolume scalarization 等多种形式。本文只比较 fixed-weight scalarized EI，不能推出 EHVI 优于所有 scalarization 方法。

2. **随机种子数量较少**
   - 每个方法只有 3 个 random seeds。作者使用 Cohen's $d$ 和 Cliff's Delta 弥补统计稳定性不足，但样本数仍较少。

3. **GP 超参数固定，没有自适应调优**
   - amplitude 和 noise variance 固定，surrogate 可能无法适应不同任务或优化过程中的 posterior landscape 变化。

4. **各目标使用独立 GP**
   - 模型没有显式建模目标之间的相关性，可能限制 surrogate fidelity。

5. **EHVI 使用 1000 MC samples，但没有系统消融**
   - 作者指出未来需要研究 Monte Carlo sample 数量和 acquisition noise 对 EHVI 表现的影响。

6. **分子表示高维，扩展性可能受限**
   - 使用 full-dimensional count-based ECFP 和 MinMax kernel，信息丰富但高维，可能带来 scalability 和 sample efficiency 问题。

7. **任务范围有限**
   - 只在三个 GUACAMOL MPO tasks 上实验；对于 noisy objectives、constrained objectives、synthesis-feasible objectives 等实际药物发现任务，仍需进一步验证。

8. **random sampling baseline 细节不足**
   - 图中包含 random sampling，但当前摘取文本没有完整说明其初始化、候选池处理和评估方式，待补充原文/PDF 后确认。

## 相关概念

- [[Hypervolume Indicator]]
- [[Pareto Front]]
- [[多目标优化]]
- [[Bayesian optimization]]
- [[Gaussian Process]]
- [[分子优化]]
- [[药物发现]]
- [[R2 indicator]]
- [[Tanimoto Similarity]]
- [[QED]]
## 相关方法

- [[Expected Hypervolume Improvement]]
- [[Expected Improvement]]
- [[Scalarization]]
## 相关数据集

- [[GUACAMOL]]
- [[Amlodipine MPO]]
- [[Fexofenadine MPO]]
- [[Perindopril MPO]]
## 相关模型

- 待补充。
## 相关论文

- [[GuacaMol Benchmarking Models for de Novo Molecular Design]]
- [[ParEGO]]
- [[Differentiable Expected Hypervolume Improvement for Parallel Multi-Objective Bayesian Optimization]]
- [[Random Hypervolume Scalarizations for Provable Multi-Objective Black Box Optimization]]
- [[Multi-Objective GFlowNets]]
- [[Diversity-guided multi-objective Bayesian optimization with batch evaluations]]

## 源文件

- citekey: yongStudyEHVIVs2025
- Zotero title: A study of EHVI vs fixed scalarization for molecule design
- PDF/source title: Bayesian Optimization for Molecules Should Be Pareto-Aware
- authors: Anabel Yong, Austin Tripp, Layla Hosseini-Gerami, Brooks Paige
- year: 2025
- DOI: 10.48550/ARXIV.2507.13704
- collections: 多目标分子优化
- 正文来源：MinerU full.md
- Zotero note: Accepted to NeurIPS AI4Science Workshop 2025

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

- https://github.com/anabelyong/efficient-mobo
- https://github.com/anabelyong/efficient-mobo.”
- http://dx.doi.org/10.1021/acs.jcim.8b00839
- https://ojs.aaai.org/index.php/AAAI/article/view/28951
- https://doi.org/10.1038/s41598-018-21936-3
- https://doi.org/10.48550/ARXIV.2507.13704
- https://doi.org/10.1021/ci100050t
- https://openreview.net/pdf?id=gS3XMun4cl\_
- https://arxiv.org/abs/1805.12168
- https://www.cell.com/patterns/fulltext/S2666-3899(23
- https://doi.org/10.1016/0360-8352(96
- https://doi.org/10.1007/s00186-023-00823-2
- http://dx.doi.org/10.1039/D3DD00227F
- https://doi.org/10.1021/acsomega.2c04919
- https://doi.org/10.48550/arXiv.2210.04096
- https://doi.org/10.1089/soro.2023.0134
- https://arxiv.org/abs/2210.12765
- https://doi.org/10.48550/arXiv.1012.2599
- https://doi.org/10.7551/mitpress/3206.001.0001
- https://arxiv.org/abs/2006.04655
- https://arxiv.org/abs/2006.05078
- https://arxiv.org/abs/2112.12542
- https://doi.org/10.1016/0021-9991(78
- https://www.sciencedirect.com/science/article/pii/0021999178900049
- https://arxiv.org/abs/2406.07709

## Zotero 原始摘要

Multi-objective Bayesian optimization (MOBO) provides a principled framework for navigating trade-offs in molecular design. However, its empirical advantages over scalarized alternatives remain underexplored. We benchmark a simple Paretobased MOBO strategy—Expected Hypervolume Improvement (EHVI)—against a simple fixed-weight scalarized baseline using Expected Improvement (EI), under a tightly controlled setup with identical Gaussian Process surrogates and molecular representations. Across three molecular optimization tasks, EHVI consistently outperforms scalarized EI in terms of Pareto front coverage, convergence speed, and chemical diversity. While scalarization encompasses flexible variants—including random or adaptive schemes—our results show that even strong deterministic instantiations can underperform in low-data regimes. These findings offer concrete evidence for the practical advantages of Pareto-aware acquisition in de novo molecular optimization, especially when evaluation budgets are limited and trade-offs are nontrivial.

## Zotero 原始笔记

Other

Accepted to NeurIPS AI4Science Workshop 2025

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的价值不在于提出一个新算法，而在于做了一个比较干净的实证对照：在分子多目标 BO 中，把 surrogate、kernel、fingerprint 和候选池都固定，只比较 EHVI 和固定权重 scalarized EI。结果说明，在预算有限时，直接面向 Pareto front 的 acquisition function 往往比固定 scalar utility 更稳健。

需要注意的是，这篇论文的结论边界很重要：它并没有证明“EHVI 一定优于 scalarization”。更准确的表述是：在本文设置下，EHVI 优于一个常用的固定权重 scalarized EI baseline。对于 random scalarization、adaptive scalarization、Tchebycheff scalarization、ParEGO 或 hypervolume scalarization，仍需进一步实验比较。

从分子优化角度看，#Circles 结果尤其有意义。很多优化方法会在目标分数上取得提升，但可能集中到相似骨架附近；EHVI 在高 Tanimoto distance threshold 下仍能维持更高 #Circles，说明它可能更适合早期 hit discovery 或 lead exploration 场景，因为这些场景不仅需要好分数，也需要结构多样的候选集合。

## 后续问题

1. EHVI 相比 random scalarization、ParEGO、Tchebycheff scalarization 是否仍有优势？
2. 如果目标数从 3 个增加到更多，EHVI 的 Monte Carlo estimation 成本和方差会如何变化？
3. 使用 1000 MC samples 是否是 EHVI 表现优异的关键？减少或增加 MC samples 会怎样？
4. 如果 GP 超参数自适应学习，而不是固定 amplitude 和 noise variance，EHVI 与 EI 的差距是否会改变？
5. 如果使用 learned molecular embeddings 替代 count-based ECFP，EHVI 的优势是否仍然稳定？
6. 三个 GUACAMOL MPO 任务各自第三个属性的具体配置是什么？待补充原文/PDF 后确认。
7. random sampling baseline 的完整设置是什么？待补充原文/PDF 后确认。
8. 在真实 wet-lab 或 synthesis-constrained molecular design 中，EHVI 是否仍能保持结构多样性与目标性能优势？
