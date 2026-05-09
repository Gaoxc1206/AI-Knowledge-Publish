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

这篇论文在相同 [[Gaussian Process]] 代理模型和分子表示的受控条件下，对比了 Pareto-aware 的 [[Expected Hypervolume Improvement]]（EHVI）与[[Scalarized Expected Improvement|固定权重标量化 Expected Improvement]]（EI），发现 EHVI 在三个 GUACAMOL [[多目标分子优化]]任务上通常获得更好的 [[Pareto front]] 覆盖、更快收敛和更高[[chemical diversity|化学多样性]]。

## 研究问题

论文关注的问题是：在[[多目标分子设计]]中，直接面向 Pareto front 的多目标 [[Bayesian Optimization]] [[acquisition function]]，是否比常见的[[固定权重标量化]]策略更有效？

具体实验问题包括：

1. **Optimality**：EHVI 是否比 scalarized EI 更能发现接近近似 Pareto front 的分子？
2. **Diversity**：EHVI 选出的分子是否具有更高结构多样性？
3. **Trade-offs**：在固定 BO 评估预算下，EHVI 与 EI 在最优性和多样性之间的权衡有何不同？

论文强调对比的是一个具体、受控的设置：EHVI vs [[fixed-weight scalarized EI]]，而不是泛泛比较所有 Pareto-based [[多目标贝叶斯优化|MOBO]] 与所有 [[scalarization]] 方法。

## 背景与动机

药物[[分子设计|分子发现]]天然是[[多目标优化|多目标优化问题]]。一个候选分子通常需要同时满足活性、安全性、药代性质、[[Synthesizability|合成可行性]]、[[分子量]]、[[logP|疏水性]]等多个要求，这些目标之间往往存在冲突。

传统[[分子优化]]中常用 scalarization，即把多个目标通过加权和等方式压缩为一个标量目标，然后使用单目标优化方法。这样做的优点是简单，并且能复用已有单目标 Bayesian Optimization 流程；但缺点也明显：

- 需要预先指定权重，而真实[[药物发现|药物设计]]中的目标偏好经常不确定、依赖上下文或难以明确。
- 固定权重通常只偏向 Pareto front 上的某一部分，难以覆盖多样化 trade-off 解。
- 如果要覆盖多个 trade-off，需要多次运行不同权重配置，可能导致计算冗余。
- 对[[非凸 Pareto front]]，简单加权和 scalarization 不一定能恢复所有 Pareto-optimal 区域。

相比之下，Pareto-based MOBO 保留目标向量结构，直接寻找 [[Non-dominated Solutions|non-dominated solutions]]，并通过 acquisition function 引导采样以扩展 Pareto front 覆盖。论文希望通过严格控制代理模型、分子表示和优化预算，只改变 acquisition strategy，来检验 [[Pareto-aware acquisition]] 本身的实际价值。

## 核心思想

论文的核心思想是：

> 在多目标分子优化中，与其把多个目标固定加权成一个标量，不如直接使用 EHVI 这样的 Pareto-aware acquisition function，让优化过程显式追求 Pareto front 的 [[Hypervolume Indicator|hypervolume]] improvement。

具体来说，EHVI 会估计如果评估某个候选分子，它可能给当前 [[Pareto set|non-dominated set]] 带来的期望 hypervolume 增量。因此，EHVI 不只是寻找某个固定效用函数下最优的分子，而是倾向于选择能够扩展 Pareto front、改善 trade-off 覆盖的候选分子。

论文认为，在低数据、评估预算有限、目标冲突非平凡的 [[de novo molecular optimization]] 场景中，这种 Pareto-aware 策略更适合作为默认选择。

## 方法框架

论文采用多目标 Bayesian Optimization 框架。每个分子属性目标分别由独立 Gaussian Process 建模，然后通过不同 acquisition function 选择下一轮要评估的分子。

整体框架如下：

1. 使用[[ECFP|分子指纹]]表示候选分子。
2. 对每个目标属性建立一个独立 Gaussian Process surrogate。
3. 在固定候选池中计算 acquisition value。
4. EHVI 方法选择期望 hypervolume 改进最大的分子。
5. scalarized EI 方法先将多目标固定加权成单目标，再使用 EI 选择分子。
6. 将选中分子加入训练 archive，更新 GP，重复 200 轮。

分子表示与代理模型：

- 分子表示：count-based ECFP，radius 3。
- 工具：[[RDKit]]。
- kernel：MinMax kernel，是适合 count-based [[Morgan fingerprints]] 的 [[Tanimoto kernel]] 泛化形式。
- 每个目标属性独立建模为 GP。
- 实现框架：JAX-based `kernel_only_GP`。
- 固定超参数：amplitude $\alpha = 1.0$，noise variance $s = 10^{-4}$。
- EHVI 使用 Monte Carlo sampling，每个候选分子 1000 draws。
- 每轮从 GUACAMOL training set 中采样得到的固定 10,000 分子候选池中选择一个分子。
- 每次运行 200 BO rounds。

MinMax kernel 定义为：

$$
k_{\text{MinMax}}(x, x') = \frac{\sum_i \min(x_i, x_i')}{\sum_i \max(x_i, x_i')}
$$

EHVI acquisition 定义为：

$$
\operatorname{EHVI}(x) =
\mathbb{E}
\left[
HV_z(\mathcal{P}_t \cup \{f(x)\}) - HV_z(\mathcal{P}_t)
\right]
$$

其中 $\mathcal{P}_t$ 是当前 Pareto front 近似集合，$z$ 是 reference point。

## 算法流程

论文中的优化流程可以整理为：

1. **初始化**
   - 从分子数据中获得初始训练 archive。
   - 为每个 MPO task 定义多个目标属性。
   - 使用 ECFP count-based fingerprints 表示分子。

2. **训练代理模型**
   - 对每个目标属性 $f_j(m)$ 独立训练 Gaussian Process。
   - 使用相同 MinMax kernel 与固定超参数。
   - 得到每个候选分子在各目标上的预测均值与方差。

3. **计算 acquisition value**
   - 对 EHVI：
     - 基于当前 non-dominated set 和 reference point；
     - 对每个候选分子用 1000 次 Monte Carlo sampling 估计 expected hypervolume improvement。
   - 对 scalarized EI：
     - 将多个目标用固定权重合成为一个 scalar objective；
     - 使用 Expected Improvement 选择最有潜力的候选分子。

4. **选择并评估候选分子**
   - 每轮从 10,000 个候选分子中选择 acquisition value 最高的一个。
   - 计算其真实目标值。
   - 加入训练 archive。

5. **更新模型**
   - 使用新数据更新每个目标对应的 GP。
   - 重复 200 轮。

6. **评估结果**
   - 记录 Hypervolume Indicator、$R^2$ indicator 和 #Circles metric。
   - 每种方法在每个任务上使用 3 个 random seeds 重复实验。
   - 报告均值、标准差，以及 Cohen’s $d$ 和 Cliff’s Delta 等 effect size 指标。

## 实验设置

### 对比方法

论文比较三类策略：

- Expected Hypervolume Improvement（EHVI）
- fixed-weight scalarized Expected Improvement（EI）
- random sampling

其中 EHVI 与 scalarized EI 使用相同 Gaussian Process surrogate、相同分子表示、相同 kernel 和相同候选池，以尽量隔离 acquisition function 的影响。

### 数据集与任务

实验使用 GUACAMOL 中的三个 multi-property optimization（MPO）任务：

- Amlodipine MPO
- Fexofenadine MPO
- Perindopril MPO

每个任务联合优化三个分子属性，包括：

- target similarity
- QED
- 以及 logP、SA score 或 molecular weight 中的一个

具体每个任务对应哪一个第三属性，正文只概括说明，需待补充原文/PDF 后确认更精确映射。

### 评估指标

论文使用三个互补指标：

1. **Hypervolume Indicator（HVI）**
   - 衡量 non-dominated solutions 相对 reference point 支配的目标空间体积。
   - 越高越好。
   - 同时反映 Pareto front 收敛质量和 trade-off 覆盖范围。

2. **$R^2$ indicator**
   - 衡量近似 Pareto front 相对 ideal/utopian point 和 reference directions 的质量。
   - 越低越好。
   - 论文采用类似 Jain et al. 2023 的设置，通过 augmented Chebyshev scalarization 评估不同方向上的 front 近似质量。

3. **#Circles metric**
   - 衡量化学空间结构多样性。
   - 基于 Tanimoto distance threshold $t$，统计超过距离阈值的 pairwise dissimilar molecules 覆盖数量。
   - 越高表示覆盖越多结构上不同的化学区域。
   - 论文在初始分子和 200 次 BO acquisition 后得到的 Pareto-optimal candidates 上计算该指标。

### 统计设置

- 每个方法每个任务重复 3 个 random seeds。
- 报告均值与标准差。
- 使用 Cohen’s $d$ 和 Cliff’s Delta 分析效应大小。
- 计算资源：NVIDIA H100-47 GPUs。

## 主要结果

### Hypervolume Indicator

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-01.jpg]]

这张图展示了三个 MPO task 中 200 轮 Bayesian Optimization 期间的 Hypervolume Indicator 变化。它帮助理解 EHVI 是否能更快、更稳定地扩展 Pareto front 覆盖；图中阴影区域表示 3 个 random seeds 的标准差。

论文报告的趋势是：

- EHVI 在所有任务上整体优于 scalarized EI 和 random sampling。
- Amlodipine MPO 中，EHVI 收敛更快，最终 hypervolume 更高，方差更低。
- Fexofenadine MPO 中，EHVI 优势更明显，尤其在后期阶段持续领先。
- Perindopril MPO 中，两种方法最终值接近，但 EHVI 更早收敛且方差更低，体现更好的 sample efficiency 和稳定性。

Appendix 中给出的 200 次 BO 后 final hypervolume 为：

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.4022 ± 0.0661 | 0.3492 ± 0.0190 |
| Amlodipine | 0.2421 ± 0.0425 | 0.2220 ± 0.0251 |
| Perindopril | 0.2080 ± 0.0016 | 0.2088 ± 0.0230 |

从最终 hypervolume 看，EHVI 在 Fexofenadine 和 Amlodipine 上更高；Perindopril 的最终均值 scalarized EI 略高，但 EHVI 方差更小。正文称 EHVI 在 Perindopril 中更早收敛、鲁棒性更好。

Hypervolume effect size：

| Task | Cohen’s d | Cliff’s Delta |
|---|---:|---:|
| Fexofenadine | 1.093 | 0.556 |
| Amlodipine | 0.576 | 0.333 |
| Perindopril | -0.050 | 0.333 |

### $R^2$ Indicator

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-04.jpg]]

这张图展示了三个任务中 $R^2$ indicator 随 BO iteration 的变化。由于 $R^2$ 越低表示 Pareto front 近似越好，该图主要帮助判断 EHVI 是否不仅扩大 hypervolume，而且能形成更均匀、更接近参考前沿的 trade-off 解集。

论文报告的趋势是：

- EHVI 在所有任务上表现出更好的 Pareto front approximation。
- Fexofenadine 中，EHVI 获得最低且最稳定的 $R^2$ 分数，与 scalarized EI 存在持续差距。
- Amlodipine 中，早期有波动，但 EHVI 后续保持较低 $R^2$。
- Perindopril 中，EHVI 从中期开始占优，并表现出更稳定、更低方差的估计。

Appendix 中 200 次 BO 后 final $R^2$ values：

| Task | EHVI | Scalarized EI |
|---|---:|---:|
| Fexofenadine | 0.3728 ± 0.0204 | 0.4360 ± 0.0293 |
| Amlodipine | 0.1649 ± 0.0203 | 0.1816 ± 0.0212 |
| Perindopril | 0.1582 ± 0.0087 | 0.1953 ± 0.0322 |

$R^2$ effect size：

| Task | Cohen’s d | Cliff’s Delta |
|---|---:|---:|
| Fexofenadine | -2.560 | -1.000 |
| Amlodipine | -0.770 | -0.556 |
| Perindopril | -1.602 | -0.778 |

这里负值表示 EHVI 更好，因为 $R^2$ 越低越好。

### #Circles Metric

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-07.jpg]]

这张图比较了不同 Tanimoto distance threshold 下的 #Circles metric，用来观察 EHVI 与 scalarized EI 发现的 Pareto-optimal molecules 是否覆盖更多结构差异显著的化学区域。阈值越高，对结构差异要求越严格，因此高阈值下的优势更能说明方法是否探索到真正不同的分子结构。

论文报告的趋势是：

- EHVI 在所有 MPO task 上具有更高或相当的化学多样性。
- Fexofenadine 中，EHVI 在 $t \geq 0.60$ 时明显优于 EI，发现更多 distinct structural motifs。
- Perindopril 中，EHVI 在整个阈值范围内维持多样性优势。
- Amlodipine 中，两种方法在低到中等阈值相近，但 EHVI 在 $t > 0.75$ 后保持更高多样性。

需要注意：可用图表 OCR/抽取内容中有若干列名错误或数值异常，例如 “ERH”“Method A”“Method B” 以及极大的科学计数值，可能是 MinerU 图表解析误差；关于 #Circles 的精确数值应待补充原文/PDF 后确认。

## 创新点

1. **受控比较 acquisition function 本身**
   - 论文没有泛泛比较 MOBO 与 scalarization，而是在相同 GP surrogate、相同分子表示、相同 kernel、相同候选池下，只改变 acquisition strategy。
   - 这使得 EHVI 与 scalarized EI 的差异更能归因于 Pareto-aware acquisition。

2. **聚焦实际分子优化低数据场景**
   - 实验预算为 200 次 BO evaluations，符合分子设计中评估昂贵、数据有限的背景。
   - 论文强调 EHVI 在 limited evaluation budgets 下的实际优势。

3. **同时评估最优性、front approximation 和化学多样性**
   - 使用 HVI、$R^2$ indicator 和 #Circles metric 三类指标。
   - 不只看标量分数，还关注 Pareto front 覆盖与结构多样性。

4. **说明固定权重 scalarized EI 的局限**
   - 结果显示，即使在受控且合理的设置下，固定权重 scalarized EI 在多个任务中仍可能弱于 EHVI。
   - 这为早期多目标分子优化中使用 Pareto-aware acquisition 提供了实证支持。

5. **使用 effect size 而非只报告均值**
   - 由于只有 3 个 random seeds，论文使用 Cohen’s $d$ 与 Cliff’s Delta 辅助评估差异的一致性和幅度。

## 局限性

1. **只比较固定权重 scalarized EI**
   - 论文明确承认 scalarization 包含随机、动态、自适应等更灵活形式。
   - 因此结果不能说明所有 scalarization 方法都不如 EHVI。
   - 与 random scalarization、adaptive scalarization、Tchebycheff scalarization、ParEGO 等方法的全面比较仍待补充。

2. **random seeds 数量较少**
   - 每种方法每个任务只有 3 个 seeds。
   - 尽管使用 effect size 分析，但统计稳健性仍有限。

3. **代理模型较简单**
   - 使用 independent Gaussian Processes。
   - 没有 adaptive hyperparameter tuning。
   - 对复杂或噪声较高目标的适应性可能不足。

4. **EHVI 的 Monte Carlo sample 数未做消融**
   - 当前 EHVI 每个候选使用 1000 MC samples。
   - 论文指出需要进一步研究 MC sample 数量、积分误差和 acquisition noise 对性能的影响。

5. **高维分子表示的可扩展性问题**
   - 使用 full-dimensional count-based ECFP 与 MinMax kernel 信息较丰富，但也可能带来可扩展性和样本效率问题。
   - 使用低维 fingerprint、learned embedding 或 contrastive representation 后结果是否保持，仍待验证。

6. **任务范围有限**
   - 只包含 GUACAMOL 中 3 个 MPO tasks。
   - 没有评估 noisy objectives、constrained objectives 或 synthesis-feasible objectives。
   - 对真实 wet-lab 闭环分子设计的适用性仍需更多实验支持。

7. **图表抽取存在疑似错误**
   - 用户提供的可用图表中，部分图注重复、列名异常、数值可能不可靠。
   - 精确图表内容和数值应待补充原文/PDF 后确认。

## 相关概念

- [[多目标优化]]
- [[Pareto 最优性]]
- [[Bayesian Optimization]]
- [[Gaussian Process]]
- [[Hypervolume Indicator]]
- [[R2 Indicator]]
- [[分子指纹]]
- [[化学空间多样性]]

## 相关方法

- [[Expected Hypervolume Improvement]]
- [[Expected Improvement]]
- [[Scalarization]]
- [[ParEGO]]
- [[Predictive Entropy Search for Multi-objective Optimization]]
- [[Multi-Objective GFlowNets]]

## 相关论文

- [[A study of EHVI vs fixed scalarization for molecule design]]
- [[GuacaMol Benchmarking Models for de Novo Molecular Design]]
- [[Differentiable Expected Hypervolume Improvement for Parallel Multi-Objective Bayesian Optimization]]
- [[Random Hypervolume Scalarizations for Provable Multi-Objective Black Box Optimization]]
- [[Multi-Objective GFlowNets]]
- [[Diagnosing and fixing common problems in Bayesian optimization for molecule design]]

## 源文件

- citekey：yongStudyEHVIVs2025
- Zotero 标题：A study of EHVI vs fixed scalarization for molecule design
- PDF/正文标题：Bayesian Optimization for Molecules Should Be Pareto-Aware
- authors：Anabel Yong, Austin Tripp, Layla Hosseini-Gerami, Brooks Paige
- year：2025
- DOI：10.48550/ARXIV.2507.13704
- collection：多目标分子优化
- venue：Accepted to NeurIPS AI4Science Workshop 2025
- code：https://github.com/anabelyong/efficient-mobo

标题存在 Zotero 元数据与正文标题不一致的情况：Zotero 中为 “A study of EHVI vs fixed scalarization for molecule design”，正文标题为 “Bayesian Optimization for Molecules Should Be Pareto-Aware”。需待补充原文/PDF 后确认正式引用标题。

## 关键图表

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-02.jpg]]

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-03.jpg]]

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-05.jpg]]

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-06.jpg]]

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-08.jpg]]

![[raw/zotero/images/多目标分子优化/2025 - EHVI与固定标量化在分子设计中的比较研究 - yongStudyEHVIVs2025/mineru-figure-09.jpg]]
## Zotero 原始摘要

Multi-objective Bayesian optimization (MOBO) provides a principled framework for navigating trade-offs in molecular design. However, its empirical advantages over scalarized alternatives remain underexplored. We benchmark a simple Paretobased MOBO strategy—Expected Hypervolume Improvement (EHVI)—against a simple fixed-weight scalarized baseline using Expected Improvement (EI), under a tightly controlled setup with identical Gaussian Process surrogates and molecular representations. Across three molecular optimization tasks, EHVI consistently outperforms scalarized EI in terms of Pareto front coverage, convergence speed, and chemical diversity. While scalarization encompasses flexible variants—including random or adaptive schemes—our results show that even strong deterministic instantiations can underperform in low-data regimes. These findings offer concrete evidence for the practical advantages of Pareto-aware acquisition in de novo molecular optimization, especially when evaluation budgets are limited and trade-offs are nontrivial.

## Zotero 原始笔记

Other

Accepted to NeurIPS AI4Science Workshop 2025

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的价值在于它做了一个相对干净的对照实验：不改变分子表示、不改变 GP surrogate、不改变优化预算，只比较 EHVI 和固定权重 scalarized EI。这样得到的结论比较清晰：在目标权衡复杂、预算有限的多目标分子优化中，显式面向 Pareto front 的 EHVI 往往比固定权重 EI 更稳健。

但它的结论边界也很重要。论文并没有证明 “EHVI 优于所有 scalarization 方法”。相反，它证明的是：一个简单、常见、确定性的 fixed-weight scalarized EI baseline，在低数据分子优化中可能明显弱于一个基础 Pareto-aware acquisition。这个结果支持把 EHVI 或其他 Pareto-aware 方法作为早期 MPO 的默认强基线。

从实际应用角度看，EHVI 的优势不只是最终分数更高，而是它更自然地服务于药物发现中的候选组合需求：早期项目往往不需要一个单一最优分子，而是希望得到一组具有不同 trade-off 和不同结构骨架的候选分子，供后续专家筛选、合成评估或实验验证。因此，HVI、$R^2$ 和 #Circles 三类指标共同支持了 EHVI 更适合这种场景。

同时，EHVI 的计算成本、MC 估计方差、高维目标扩展性和候选池依赖，是后续需要重点关注的问题。如果目标维度更多，或者候选分子来自生成模型而非固定池，EHVI 的优势是否保持仍需要实验验证。

## 后续问题

1. 如果将 fixed-weight EI 换成 random scalarization、adaptive scalarization 或 ParEGO，EHVI 的优势是否仍然显著？
2. EHVI 的 1000 Monte Carlo samples 是否是关键因素？减少或增加 MC samples 对结果影响多大？
3. 在更多目标维度，例如 5–10 个目标的分子优化中，EHVI 是否仍然可扩展？
4. 使用 learned molecular embeddings 替代 count-based ECFP 后，EHVI 与 scalarized EI 的相对表现是否变化？
5. 如果目标函数带有噪声、约束或合成可行性约束，EHVI 是否仍能保持优势？
6. 论文中固定候选池大小为 10,000，如果改为生成模型动态提出候选分子，算法流程和结果会如何变化？
7. #Circles metric 的图表数值存在抽取异常，需要用原始 PDF 或代码结果重新核对。
8. 正式标题到底应引用 “A study of EHVI vs fixed scalarization for molecule design” 还是 “Bayesian Optimization for Molecules Should Be Pareto-Aware”？需待补充原文/PDF 后确认。
