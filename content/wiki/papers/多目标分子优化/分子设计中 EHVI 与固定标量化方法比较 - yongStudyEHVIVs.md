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

《A study of EHVI vs fixed scalarization for molecule design》在三个 GUACAMOL 多目标分子优化任务上，控制相同 Gaussian Process 代理模型和分子表征后，发现 Pareto-aware 的 Expected Hypervolume Improvement（EHVI）相比固定权重标量化 Expected Improvement（EI）在 Pareto 前沿覆盖、收敛速度和化学结构多样性上整体更优。

## 研究问题

本文关注一个具体而实用的问题：在分子设计的多目标 Bayesian optimization 场景中，Pareto-based acquisition 是否真的比固定权重 scalarization acquisition 更有优势？

作者将问题进一步拆成三个实验问题：

1. **最优性**：EHVI 是否比 scalarized EI 找到更接近近似 Pareto front 的解？
2. **多样性**：EHVI 选择的分子是否具有更高的结构多样性？
3. **权衡能力**：在固定 BO 评估预算下，EHVI 和 EI 在最优性与多样性之间的权衡表现有何不同？

论文并不是试图否定所有 scalarization 方法，而是聚焦于一个常见且可控的基线：**固定权重 scalarized EI**。作者明确指出，scalarization 还包括 random scalarization、adaptive scalarization 等更灵活变体，这些不是本文主要比较对象。

## 背景与动机

药物分子发现天然是一个多目标优化问题。一个有潜力的候选分子通常需要同时满足活性、安全性、药代动力学性质、合成可行性等多个目标，而这些目标之间常常存在冲突。

传统做法常用 scalarization，即将多个目标通过加权和等方式压缩成一个单一分数，再使用单目标优化流程。这种做法有两个主要问题：

1. **需要预先指定权重**：真实药物发现中，不同目标的重要性通常不确定、依赖上下文，甚至难以事先精确定义。
2. **固定权重通常只对应 Pareto front 上的一个偏好区域**：如果想恢复多样化的 trade-off solution，往往需要多次运行不同权重的优化流程，可能造成计算冗余。

因此，Pareto-based multi-objective Bayesian optimization 更适合这类问题。它保留多目标向量结构，直接寻找 non-dominated solutions，并试图高效覆盖 Pareto front。

本文的动机在于：尽管 MOBO 在理论和应用中受到关注，但在分子设计中，针对 Pareto-based acquisition 与具体 scalarized baseline 的受控实证比较仍然不足。作者希望通过控制 surrogate、kernel、representation 等因素，将差异主要归因于 acquisition function 本身。

## 核心思想

本文核心思想是：在相同 Gaussian Process 代理模型、相同分子指纹表示、相同候选池和相同 BO 预算下，比较两种 acquisition strategy：

- **Expected Hypervolume Improvement（EHVI）**：Pareto-based acquisition，直接估计加入候选点后带来的 hypervolume 增益。
- **Scalarized Expected Improvement（EI）**：先用固定权重将多目标压缩为单目标，再使用 EI 进行选择。

EHVI 的关键优势在于它不把多目标问题压缩成单个固定 utility，而是显式关注 Pareto front 的扩展。这样它更容易探索当前 Pareto front 中覆盖不足的区域，也更有机会得到结构多样、权衡更均衡的候选分子。

## 方法框架

论文采用 multi-objective Bayesian optimization 框架。每个分子性质目标都由独立的 Gaussian Process 建模，然后通过 acquisition function 选择下一个待评估分子。

具体设置包括：

- 分子来自 GUACAMOL training set 的固定候选池。
- 每一步从 10,000 个候选化合物中选择 1 个分子。
- 每个任务运行 200 轮 Bayesian optimization。
- 每种方法在 3 个随机种子下重复实验。
- 两种方法共享相同的 Gaussian Process surrogate 和分子表示。
- 主要差异只在 acquisition function：EHVI vs scalarized EI。

代理模型方面，每个分子性质 $f_j(m)$ 独立建模为 Gaussian Process。分子用 count-based ECFP 表示，半径为 3，由 RDKit 计算，不截断 count features。kernel 使用 MinMax kernel，它是 Tanimoto kernel 的 count-aware generalization：

$$
k_{\mathrm{MinMax}}(x, x') =
\frac{\sum_i \min(x_i, x'_i)}
{\sum_i \max(x_i, x'_i)}
$$

该 kernel 衡量 count-based fingerprint 之间的结构相似性。

EHVI 使用 Monte Carlo 估计，每个候选分子使用 1000 次采样。所有模型超参数在不同方法和 trial 间保持固定，包括 amplitude $\alpha = 1.0$ 和 noise variance $s = 10^{-4}$。

## 算法流程

整体优化流程可以概括如下：

1. 准备 GUACAMOL 多属性优化任务，包括 Amlodipine MPO、Fexofenadine MPO、Perindopril MPO。
2. 从 GUACAMOL training set 中构造固定候选池，每轮从 10,000 个候选分子中选择。
3. 使用 count-based ECFP radius 3 表示分子。
4. 对每个目标性质分别训练独立 Gaussian Process。
5. 根据方法不同计算 acquisition value：
   - EHVI：估计候选分子加入当前 Pareto archive 后的 expected hypervolume improvement。
   - Scalarized EI：用固定权重将多个目标合成为单目标，再计算 Expected Improvement。
6. 选择 acquisition value 最优的一个分子。
7. 评估该分子对应的多目标属性。
8. 将该分子加入训练 archive。
9. 更新 Gaussian Process posterior。
10. 重复 200 轮。
11. 计算 HVI、$R^2$ indicator 和 #Circles metric。
12. 在 3 个随机种子上报告均值和标准差，并用 Cohen's $d$、Cliff's Delta 衡量效应大小。

## 实验设置

### Benchmark tasks

论文使用三个 GUACAMOL benchmark 中的 multi-property optimization（MPO）任务：

- Amlodipine MPO
- Fexofenadine MPO
- Perindopril MPO

每个任务联合优化三个分子性质，包括 target similarity、QED，以及 logP、SA score 或 molecular weight 中的某一项。具体每个任务对应哪一个第三性质，当前摘取文本未逐项列出，待补充原文/PDF 后确认。

### 对比方法

实验比较三类策略：

1. **EHVI**
   - Pareto-based acquisition。
   - 直接优化 expected hypervolume improvement。
   - Monte Carlo 估计使用 1000 draws per candidate。

2. **Scalarized EI**
   - 固定权重 scalarization baseline。
   - 先把多个目标合成单一标量目标，再使用 Expected Improvement。

3. **Random sampling**
   - 作为非 BO 随机基线。
   - 论文结果图中包含 random sampling 曲线，但正文对其实现细节描述较少，待补充原文/PDF 后确认。

### Surrogate model

- 每个目标独立使用 Gaussian Process。
- kernel 使用 MinMax kernel。
- 分子表示为 count-based ECFP radius 3。
- 使用 RDKit 计算 fingerprints。
- GP 框架为 JAX-based `kernel_only_GP`。
- 超参数固定：
  - amplitude $\alpha = 1.0$
  - noise variance $s = 10^{-4}$

### 优化预算

- 每轮从固定候选池 10,000 个化合物中选择 1 个。
- 每次实验运行 200 BO rounds。
- 每个方法使用 3 个 random seeds。
- 计算平台为 NVIDIA H100-47 GPUs。

### 评价指标

1. **Hypervolume Indicator（HVI）**
   - 衡量 non-dominated solutions 相对于 reference point 支配的目标空间体积。
   - 越高越好。
   - 同时反映 Pareto front 的收敛质量和覆盖范围。

2. **$R^2$ indicator**
   - 用一组均匀分布的 reference directions 评估 Pareto front approximation。
   - 论文采用 augmented Tchebycheff scalarization。
   - 越低越好，表示更接近、更均匀地逼近 ideal front。

3. **#Circles metric**
   - 用于衡量化学空间结构多样性。
   - 基于 Tanimoto distance threshold $t$，统计彼此足够不相似的分子覆盖区域。
   - 更高的 #Circles 值表示候选集合覆盖了更多结构差异明显的区域。
   - 论文在初始分子和 200 次 BO 获得分子中的 Pareto-optimal candidates 上计算该指标。

## 主要结果

### 总体结果

EHVI 在三个任务和三类指标上整体优于 scalarized EI：

- 在 HVI 上，EHVI 通常取得更高 hypervolume 和更快收敛。
- 在 $R^2$ indicator 上，EHVI 取得更低数值，表示 Pareto front approximation 更好。
- 在 #Circles metric 上，EHVI 保持或超过 scalarized EI 的化学结构多样性，尤其在较严格 Tanimoto distance threshold 下更明显。

作者还报告了效应大小分析。对于 hypervolume，EHVI 在多个任务上有中等到较大的 Cohen's $d$，例如 Fexofenadine MPO 上 $d = 1.093$。对于 $R^2$ indicator，EHVI 的数值更低，Fexofenadine MPO 上 Cohen's $d = -2.56$，说明相对 EI 的改善幅度较强。

### Hypervolume Indicator（HVI）

Amlodipine MPO 中，EHVI 收敛更快，最终 hypervolume 更高，方差更低。Fexofenadine MPO 中，EHVI 与 scalarized EI 的差距更明显，并在优化后期持续占优。Perindopril MPO 中，两者最终值相近，但 EHVI 更早收敛且方差更低，说明样本效率和鲁棒性更好。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-01.jpg]]

图 1a 展示 Amlodipine MPO 上 200 轮 BO 中 HVI 的变化。EHVI 相比 scalarized EI 和 random sampling 更快提升 hypervolume，并达到更好的最终前沿覆盖。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-02.jpg]]

图 1b 展示 Fexofenadine MPO 上的 HVI 曲线。EHVI 在该任务上的优势最为明显，说明 Pareto-aware acquisition 在该 trade-off 结构下能更有效扩展前沿。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-03.jpg]]

图 1c 展示 Perindopril MPO 上的 HVI 曲线。虽然最终值与 scalarized EI 接近，但 EHVI 更早达到较高水平，并且不确定性更低。

附录 Table 1 给出 200 次 BO 后的最终 hypervolume：

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.4022 ± 0.0661 | 0.3492 ± 0.0190 |
| Amlodipine | 0.2421 ± 0.0425 | 0.2220 ± 0.0251 |
| Perindopril | 0.2080 ± 0.0016 | 0.2088 ± 0.0230 |

Perindopril 上 scalarized EI 的平均最终 HVI 略高于 EHVI，但方差更大；正文强调 EHVI 更早收敛且更稳定。

### $R^2$ indicator

$R^2$ indicator 越低越好。论文显示 EHVI 在三个任务上均优于 scalarized EI 和 random sampling。

Fexofenadine MPO 中，EHVI 的 $R^2$ 最低且最稳定，与 scalarized EI 存在持续较大差距。Amlodipine MPO 中，EHVI 在早期波动后保持较低数值。Perindopril MPO 中，EHVI 从优化中期开始占优，并表现出最低方差。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-04.jpg]]

图 2a 展示 Amlodipine MPO 上 $R^2$ indicator 随 BO 迭代变化。EHVI 在早期波动后整体维持较低 $R^2$，说明其 Pareto front approximation 更接近参考前沿。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-05.jpg]]

图 2b 展示 Fexofenadine MPO 上的 $R^2$ indicator。EHVI 与 scalarized EI 的差距较大且稳定，是论文中最强的前沿逼近优势之一。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-06.jpg]]

图 2c 展示 Perindopril MPO 上的 $R^2$ indicator。EHVI 从中期开始明显优于 EI，且曲线更稳定，说明其在该任务上产生了更均匀的 trade-off 解集。

附录 Table 2 给出 200 次 BO 后最终 $R^2$ values：

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.3728 ± 0.0204 | 0.4360 ± 0.0293 |
| Amlodipine | 0.1649 ± 0.0203 | 0.1816 ± 0.0212 |
| Perindopril | 0.1582 ± 0.0087 | 0.1953 ± 0.0322 |

### #Circles metric

#Circles metric 衡量结构多样性，数值越高表示覆盖更多结构差异明显的化学空间区域。论文显示 EHVI 在所有 MPO 任务中都表现出更好或相当的化学多样性。

在 Fexofenadine MPO 中，当 Tanimoto distance threshold $t \geq 0.60$ 时，EHVI 明显超过 EI，说明它发现了更多不同结构 motif。Perindopril MPO 中，EHVI 在完整 threshold 范围内保持多样性优势。Amlodipine MPO 中，两种方法在低到中等 threshold 下接近，但 EHVI 在 $t > 0.75$ 时保持更高多样性。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-07.jpg]]

图 3a 展示 Amlodipine MPO 上不同 Tanimoto distance threshold 下的 #Circles。EHVI 在较严格阈值下更有优势，表示其找到的高质量分子结构差异更大。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-08.jpg]]

图 3b 展示 Fexofenadine MPO 上的 #Circles。EHVI 在 $t \geq 0.60$ 后明显领先，说明其不仅优化目标值，也扩大了结构 motif 的覆盖。

![[raw/zotero/images/多目标分子优化/分子设计中 EHVI 与固定标量化方法比较 - yongStudyEHVIVs/mineru-figure-09.jpg]]

图 3c 展示 Perindopril MPO 上的 #Circles。EHVI 在整个阈值范围内维持较高结构多样性，支持其在 Pareto front 扩展和化学 novelty 之间取得较好平衡。

### 效应大小

附录 Table 3 报告 HVI 的效应大小：

| Task | Cohen's d | Cliff's Delta |
|---|---:|---:|
| Fexofenadine | 1.093 | 0.556 |
| Amlodipine | 0.576 | 0.333 |
| Perindopril | -0.050 | 0.333 |

附录 Table 4 报告 $R^2$ values 的效应大小，负值表示 EHVI 更好：

| Task | Cohen's d | Cliff's Delta |
|---|---:|---:|
| Fexofenadine | -2.560 | -1.000 |
| Amlodipine | -0.770 | -0.556 |
| Perindopril | -1.602 | -0.778 |

这些结果说明，即使只有 3 个 random seeds，EHVI 的优势在多个指标上仍表现出较强一致性。不过由于实验重复次数较少，统计结论仍应谨慎解读。

## 创新点

1. **受控比较 EHVI 与固定权重 scalarized EI**
   - 两种方法使用相同 Gaussian Process surrogate、相同 kernel、相同分子表示和相同候选池。
   - 因此实验更能隔离 acquisition function 本身的影响。

2. **聚焦分子设计中的实际低预算场景**
   - 每次运行只有 200 轮 BO evaluations。
   - 这符合实验评估昂贵、数据有限的早期分子发现场景。

3. **同时评估 Pareto front 质量和化学多样性**
   - 不只看 hypervolume，还使用 $R^2$ indicator 和 #Circles metric。
   - 这使结论不仅涉及目标空间覆盖，也涉及结构空间探索。

4. **在三个 GUACAMOL MPO tasks 上给出一致证据**
   - Amlodipine MPO、Fexofenadine MPO、Perindopril MPO 中，EHVI 多数指标优于 EI。
   - 说明 Pareto-aware acquisition 对不同多目标分子优化任务具有一定稳健性。

5. **强调 acquisition strategy 的独立贡献**
   - 因为 surrogate fidelity、kernel choice 和 representation capacity 被控制，结果支持“EHVI 的收益主要来自 Pareto-aware acquisition”。

## 局限性

1. **比较对象有限**
   - 本文比较的是固定权重 scalarized EI，而不是所有 scalarization 方法。
   - random scalarization、adaptive scalarization、Tchebycheff scalarization、ParEGO 等方法没有系统纳入主实验。

2. **随机种子较少**
   - 每种方法只有 3 个 random seeds。
   - 虽然作者报告了 Cohen's $d$ 和 Cliff's Delta，但统计稳健性仍有限。

3. **GP surrogate 较简单**
   - 每个目标使用独立 Gaussian Process。
   - 未进行 adaptive hyperparameter tuning。
   - 对复杂或噪声较大的目标可能适应性不足。

4. **EHVI Monte Carlo 样本数未做消融**
   - 当前使用 1000 MC samples per candidate。
   - 论文讨论中指出，更多 MC samples 可能降低 integration variance，但没有实验确认。
   - EHVI 和 EI 对 acquisition noise 的敏感性也未系统分析。

5. **分子表示只使用 count-based ECFP**
   - full-dimensional count-based ECFP 信息丰富，但维度高。
   - 尚未测试 reduced-dimensional embeddings 或 contrastively learned fingerprints 对两类 acquisition 的影响。

6. **任务范围有限**
   - 只使用三个 GUACAMOL MPO tasks。
   - 是否能推广到 noisy、constrained、synthesis-feasible objectives，待进一步验证。

7. **代码与数据尚未正式提供**
   - 正文称代码和数据将在论文接收后发布，但当前解析文本未发现明确链接。

## 相关概念

- [[多目标优化]]
- [[Bayesian optimization]]
- [[Pareto Front]]
- [[Hypervolume Indicator]]
- [[Gaussian Process]]
- [[Tanimoto Similarity]]
- [[Morgan Fingerprint]]
- [[R2 indicator]]
- [[分子优化]]
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

- [[Guacamol: Benchmarking models for de novo molecular design]]
- [[Differentiable expected hypervolume improvement for parallel multi-objective bayesian optimization]]
- [[Predictive entropy search for multi-objective bayesian optimization]]
- [[ParEGO: A hybrid algorithm with on-line landscape approximation for expensive multiobjective optimization problems]]
- [[Random hypervolume scalarizations for provable multi-objective black box optimization]]
- [[Multi-objective GFlowNets]]

## 源文件

- Zotero citekey：`yongStudyEHVIVs`
- 标题：A study of EHVI vs fixed scalarization for molecule design
- 作者：Anabel Yong, Austin Tripp, Layla Hosseini-Gerami, Brooks Paige
- 年份：待补充原文/PDF 后确认
- 会议/期刊：待补充原文/PDF 后确认
- DOI：待补充原文/PDF 后确认
- Zotero collections：多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

- http://dx.doi.org/10.1021/acs.jcim.8b00839
- https://github.com/anabelyong/efficient-mobo
- https://ojs.aaai.org/index.php/AAAI/article/view/28951
- https://doi.org/10.1038/s41598-018-21936-3
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

Multi-objective Bayesian optimization (MOBO) provides a principled framework for navigating trade-offs in molecular design. However, its empirical advantages over scalarized alternatives remain underexplored. We benchmark a simple Paretobased MOBO strategy—Expected Hypervolume Improvement (EHVI)-against a simple fixed-weight scalarized baseline using Expected Improvement (EI), under a tightly controlled setup with identical Gaussian Process surrogates and molecular representations. Across three molecular optimization tasks, EHVI consistently outperforms scalarized EI in terms of Pareto front coverage, convergence speed, and chemical diversity. While scalarization encompasses flexible variants - including random or adaptive schemes—our results show that even strong deterministic instantiations can underperform in low-data regimes. These findings offer concrete evidence for the practical advantages of Pareto-aware acquisition in de novo molecular optimization, especially when evaluation budgets are limited and trade-offs are nontrivial.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的价值在于它没有做过于复杂的方法创新，而是做了一个相对干净的实证问题：如果只改变 acquisition function，Pareto-aware 的 EHVI 是否真的比固定标量化 EI 更适合多目标分子优化？

从结果看，答案基本是肯定的。EHVI 的优势不仅体现在 hypervolume 这种天然偏向 Pareto 方法的指标上，也体现在 $R^2$ indicator 和结构多样性 #Circles 上。这说明 EHVI 并不是单纯“刷高一个指标”，而是在目标空间和化学空间中都产生了更均衡的探索。

不过，这篇论文的结论边界也很清楚：它比较的是固定权重 scalarized EI，而不是更强的 adaptive scalarization 或 random scalarization 家族。因此更准确的结论应该是：在低数据、多目标分子优化中，如果 baseline 是常见的固定偏好单目标化流程，那么 EHVI 是一个更稳健的默认选择。

我认为这篇文章适合作为“分子设计中为什么需要 Pareto-aware BO”的实证证据节点，也适合作为后续比较 EHVI、ParEGO、PESMO、Multi-Objective GFlowNets 等方法的 baseline 参考。

## 后续问题

1. 如果将 scalarized EI 替换为 random scalarization 或 ParEGO，EHVI 的优势是否仍然稳定？
2. EHVI 使用 1000 MC samples per candidate，这个设置对结果影响有多大？更少采样是否仍能保持优势？
3. 在目标数量超过 3 个时，EHVI 的计算成本和效果会如何变化？
4. 如果使用 learned molecular embeddings 而不是 count-based ECFP，EHVI 和 scalarized EI 的相对表现是否改变？
5. 在加入合成可行性、毒性、不确定实验噪声等更真实约束后，EHVI 是否仍然优于固定 scalarization？
6. 当前实验只有 3 个 random seeds，扩大重复次数后效应大小是否稳定？
7. Perindopril MPO 中最终 HVI 平均值 scalarized EI 略高于 EHVI，但方差更大；这个任务是否存在对固定权重更友好的局部结构？
