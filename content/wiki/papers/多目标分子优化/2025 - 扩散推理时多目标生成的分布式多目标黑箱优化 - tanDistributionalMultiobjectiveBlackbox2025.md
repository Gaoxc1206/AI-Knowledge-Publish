---
type: paper
citekey: "tanDistributionalMultiobjectiveBlackbox2025"
title: "扩散推理时多目标生成的分布式多目标黑箱优化"
chinese_title: "扩散推理时多目标生成的分布式多目标黑箱优化"
authors: "Kim Yong Tan, Yueming Lyu, Ivor Tsang, Yew-Soon Ong"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2510.26278"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "扩散推理时多目标生成的分布式多目标黑箱优化"
  - "Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation"
original_title: "Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation"
---
## 一句话总结

这篇论文提出 **Inference-time Multi-target Generation (IMG)**：在扩散模型推理过程中用基于多目标值的加权重采样直接调整反向扩散转移分布，使预训练扩散模型无需微调、仅一次生成过程即可产生覆盖 Pareto front 的多目标候选分子，并在多目标 3D 分子生成任务上取得高于多个 EA-based baseline 的 hypervolume。

## 研究问题

论文研究的问题是：如何利用预训练扩散模型解决高维 **multi-objective black-box optimization**，尤其是多目标分子生成任务，同时避免以下两类已有方法的缺陷：

1. **训练或微调扩散模型的方法**  
   这类方法通常需要先给数据标注多目标值，再训练 conditional diffusion 或 fine-tune diffusion model，成本高、数据需求大。

2. **把扩散模型作为外部优化循环中的 frozen refiner 的方法**  
   例如 **DiffSBDD-EA** 或 **EGD** 使用扩散模型作为 evolutionary algorithm 中的候选生成/精炼模块，但没有利用扩散生成过程内部的分布转移机制，容易受限于预训练模型原始分布，效率较低。

本文希望回答的问题是：能否在扩散模型的 inference-time 直接引导反向扩散过程，使生成样本分布向多目标最优分布偏移，并且保持黑箱目标设定，不依赖目标函数可微或 surrogate model？

## 背景与动机

多目标优化的目标不是找到单个最优点，而是找到一组非支配解，即 **Pareto front**。在药物设计中，候选分子往往需要同时满足结合亲和力、可合成性、类药性等目标，这些目标之间可能冲突，因此天然适合多目标优化建模。

黑箱优化设定下，目标函数只能被评估，无法获得解析形式或梯度。这使得传统 gradient-based 方法难以直接使用。传统 evolutionary algorithms 虽然适合黑箱优化，但在高维空间中候选生成效率较低。

扩散模型擅长学习复杂高维数据分布，因此近年来被用于分子生成和优化。但已有基于扩散模型的多目标优化方法通常存在两个问题：

- 若训练/微调 diffusion model，需要额外数据和训练成本。
- 若只把 diffusion model 当作 EA 中的 frozen refiner，则没有改变推理过程内部的生成分布，优化效率受限。

本文的动机是：扩散模型的反向生成过程本身就是逐步转移分布的过程。如果能在每个 reverse diffusion step 中根据多目标偏好对候选进行加权重采样，就可以在推理时把生成分布推向目标 Boltzmann distribution，从而提高多目标生成效率。

## 核心思想

IMG 的核心思想可以概括为：

> 将预训练扩散模型每一步的反向转移分布视为 base distribution，然后根据候选样本的多目标值计算权重，并在反向扩散过程中执行 weighted resampling，使最终样本近似服从一个多目标 Boltzmann mixture target distribution。

论文先从 distributional optimization 出发，对单个目标 $f_k$ 构造 KL-regularized distributional optimization：

$$
q_k^*(x;\lambda)=\arg\min_q \left\{\mathbb{E}_q[f_k(x)] + \lambda_k \mathrm{KL}(q(x)||p_{base}(x))\right\}
$$

其闭式解是指数倾斜分布：

$$
q_k^*(x;\lambda)\propto p_{base}(x)e^{-\frac{f_k(x)}{\lambda_k}}
$$

对于多个目标，论文将各单目标最优分布混合，得到：

$$
q_{mix}^*(x;\lambda)
= p_{base}(x) \sum_k e^{-\frac{f_k(x)-c_k}{\lambda_k}}
$$

其中权重函数为：

$$
W(x;\lambda)=\sum_k e^{-\frac{f_k(x)-c_k}{\lambda_k}}
$$

因此，只要从 base distribution 采样候选，再按 $W(x;\lambda)$ 进行重采样，就可以把样本分布从 $p_{base}$ 推向目标分布 $q_{mix}^*$。

IMG 将这一思想嵌入扩散推理过程：每个 reverse diffusion step 都从预训练模型产生多个候选，再按不同 preference vector 对候选进行选择，从而一次生成多个对应不同 trade-off 的样本。

## 方法框架

IMG 的方法框架包含四个关键组成部分：

1. **Distributional multi-objective formulation**  
   将多目标优化转化为目标分布构造问题，而不是直接搜索单个最优点。

2. **Multi-target Boltzmann distribution**  
   对每个目标得到一个指数倾斜分布，再将多个目标分布混合，得到多目标目标分布。

3. **Inference-time weighted resampling**  
   在扩散模型每个 reverse step 中，从预训练转移分布采样多个候选，并根据多目标权重函数进行重采样。

4. **Preference vector generation**  
   为 batch 中不同样本分配不同 preference vector，使一次 diffusion pass 同时覆盖多个 trade-off 区域。

在分子生成实验中，IMG 使用 **DiffSBDD** 的预训练模型作为基础生成器。论文并不是重新训练扩散模型，而是在其推理过程中插入多目标选择机制。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-01.jpg]]

该图展示了 IMG 在单次 diffusion inference pass 中生成的 9 个分子，目标蛋白口袋为 PDB ID: 5ndu。它用于定性说明 IMG 能够在一次推理中生成多样化且面向多个目标优化的候选分子。

## 算法流程

### Algorithm 1：Inference-time Multi-Target Generation (IMG)

输入包括：

- 预训练扩散模型 $p_\theta$
- batch size $N$
- resampling size $M$
- 多目标黑箱函数 $f:\mathbb{R}^d\to\mathbb{R}^n$

算法主要步骤如下：

1. 为 batch 中每个样本初始化一个 preference vector $\lambda^i$。
2. 初始化扩散起点。一般算法描述中从 Gaussian noise $x_T\sim \mathcal{N}(0,I)$ 开始；在分子生成实验中则从参考分子加噪后的状态开始。
3. 对每个 reverse diffusion step $t=T,\dots,1$：
   - 对每个当前状态 $x_t^i$，从预训练反向转移分布采样 $M$ 个候选：
     $$
     \tilde{x}_{t-1}^{ij}\sim p_\theta(x_t^i,t)
     $$
   - 总共得到 $B=N\times M$ 个候选。
   - 对每个候选计算多目标值：
     $$
     y^b=[f_1(x^b),\dots,f_n(x^b)]
     $$
   - 对 batch 中每个 preference vector $\lambda^i$，根据权重函数选择一个候选作为新的 $x_{t-1}^i$。
4. 输出最终 batch 样本 $\{x_0^i\}$。

### Greedy Sampling Without Replacement

理论上可以按 categorical distribution 进行概率采样：

$$
P(x_{t-1}=x^b;\lambda^i)
=
\frac{W(x^b;\lambda^i)}
{\sum_{x'\in X}W(x';\lambda^i)}
$$

但论文指出小 batch 下概率近似可能不稳定，因此实际采用 **greedy sampling without replacement**：

- 对每个 preference vector 选择权重最优的候选；
- 被选中的候选从 buffer 中移除，避免多个样本重复选择同一候选；
- 这样有助于提升 batch 内多样性。

需要注意：正文中公式 (18) 写作 $\arg\min \tilde{W}$，但前文描述为选择最大权重的候选；这里存在符号方向上的潜在不一致，待补充原文/PDF 后确认。

### Algorithm 2：Preference Weight Vectors Generation

当用户没有给定 preference distribution $p(\lambda)$ 时，论文提出使用正超球面第一象限上的均匀分布作为先验，并用 **Quasi-Monte Carlo** 生成更均匀的 preference vectors。

流程大致为：

1. 先在 $(n-1)$ 维 unit cube 中用 lattice rule 生成 QMC points。
2. 将 QMC points 分成角度变量 $\Theta$ 和辅助变量 $X$。
3. 基于 **Tashiro (1977)** 的球面均匀采样方法，将这些点映射到正超球面表面。
4. 输出 preference weight vectors $\Lambda$。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-04.jpg]]

该图是 Figure 5 的一部分，用于比较三目标空间中 preference vector 的生成效果。这里展示了较小样本数下 Algorithm 2 与 Tashiro (1977) 方法的分布差异，重点是说明 QMC-based 方法能减少聚集和空洞。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-05.jpg]]

该图继续展示不同样本规模下的 preference vector 分布对比。论文强调，Algorithm 2 在样本数量增加时仍能保持更均匀的覆盖。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-06.jpg]]

该图对应 Figure 5 的后续子图，展示三目标 preference space 中更多样本数的分布。与随机 Monte Carlo 相比，QMC-based 采样在视觉上更少出现局部簇集。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-07.jpg]]

该图展示 Algorithm 2 和 Tashiro (1977) 在另一组样本数设置下的对比。其作用是支持论文关于“preference vectors 更均匀，有利于覆盖 Pareto trade-offs”的论点。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-08.jpg]]

该图继续比较不同采样数下的 preference vector 覆盖效果。QMC-based 方法被用作没有用户偏好时的默认 preference prior。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-09.jpg]]

该图展示更大样本数下两种采样方法的分布差异。论文希望通过该组图说明 Algorithm 2 相比普通随机采样更稳定、更均匀。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-10.jpg]]

该图是 Figure 5 的后续子图，展示 Algorithm 2 在较大 $N$ 下生成的 preference vectors。它说明 QMC-based lattice rule 可用于构造覆盖更完整的偏好方向集合。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-11.jpg]]

该图展示 Tashiro (1977) 方法在相同或相近样本数下的对照结果。其用途是凸显普通随机采样容易存在局部空隙和聚集。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-12.jpg]]

该图展示更高样本数下 Algorithm 2 的分布结果。它用于说明随着 $N$ 增加，Algorithm 2 仍能保持 preference space 的较均匀覆盖。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-13.jpg]]

该图展示 Figure 5 中最后一组 Algorithm 2 与 Tashiro (1977) 对比之一。论文通过这一系列图证明 QMC-based 方法更适合作为 batch preference vector 的初始化策略。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-14.jpg]]

该图是 Figure 5 的另一个截取部分，继续用于比较 preference vector generation methods。由于当前解析图像是 MinerU 拆分后的局部图片，具体对应的 $N$ 值需待补充原文/PDF 后确认。

## 实验设置

### 任务

实验任务是多目标 3D 分子生成。论文将药物设计建模为三目标 black-box optimization：

1. **Vina score**：用于估计与目标蛋白的 binding affinity。
2. **SA score**：用于衡量 synthesizability。
3. **QED value**：用于衡量 drug-likeness。

目标蛋白为 oncology inhibitor 相关的 phosphoprotein，PDB ID 为 **5ndu**。

### 预训练模型

论文使用 **DiffSBDD** 作为预训练分子生成模型。具体使用：

- **crossdocked_fullatom_cond model**
- 训练数据为 **CrossDocked dataset** 中约 100,000 个 protein-ligand complexes
- 条件生成目标为 target protein binding pocket

需要注意：正文中 “We use DiffSBDD (Sun et al. 2025)” 与参考文献中 DiffSBDD 对应 Schneuing et al. 2024，Sun et al. 2025 对应 EGD。这里可能是引用标注混乱，待补充原文/PDF 后确认。

### 分子生成起点

虽然 Algorithm 1 描述的是从 Gaussian noise 开始：

$$
x_T\sim \mathcal{N}(0,I)
$$

但实验中遵循 **DiffSBDD** 的 diversify strategy：

1. 给定参考分子 $x_{ref}$；
2. 通过 forward diffusion 加噪得到：
   $$
   x_\tau\sim p(x_\tau|x_{ref})
   $$
3. 从 $t=\tau$ 开始执行 reverse diffusion。

论文使用：

- target protein：**5ndu**
- reference molecule：**8V2**
- diversify steps：$\tau=100$

### IMG 参数

主要参数：

- batch size：$N=64$
- resampling batch size：$M\in\{4,8,16\}$，正文结果中也提到 $M=\{8,16,32\}$
- 每次运行 objective evaluations 数量：
  $$
  N\times M\times \tau
  $$

### Baselines

论文比较了：

1. **EGD**
2. **DiffSBDD-EA (Mean)**
3. **DiffSBDD-EA (SPEA2)**

其中 **DiffSBDD-EA** 原本为单目标优化设计，论文将其扩展为多目标 baseline：

- **Mean**：将多个目标取平均作为单一 fitness。
- **SPEA2**：使用 **SPEA2** fitness function。

baseline 设定：

- population size：64
- evolutionary steps：3000
- 总 objective evaluations：
  $$
  64\times 3000=192k
  $$

### 评价指标

核心指标是 **hypervolume (HV)**。由于论文将目标值归一化到 $[-1,0]$ 且越小越好，同时使用原点作为 reference point，HV 定义为 Pareto front 到 reference point 围成的体积。

论文每个算法独立运行 3 次，报告平均 hypervolume 与标准差。

## 主要结果

### Table 1：性能比较

论文报告在不同 objective evaluation budget 下的 hypervolume、Pareto front 数量和运行时间。关键结果如下：

| Objective Evaluations | Algorithm | Hypervolume | Pareto Front 数量 | Run Time |
|---:|---|---:|---:|---|
| 25.6k | IMG | 0.5732 ± 0.0387 | 12.33 | 1h 12m |
| 25.6k | EGD | 0.5379 ± 0.0301 | 17.00 | 2h 34m |
| 25.6k | DiffSBDD-EA (Mean) | 0.5366 ± 0.0374 | 9.00 | 2h 39m |
| 25.6k | DiffSBDD-EA (Spea2) | 0.5149 ± 0.0375 | 18.00 | 2h 41m |
| 51.2k | IMG | 0.6450 ± 0.0964 | 12.00 | 1h 59m |
| 51.2k | EGD | 0.5747 ± 0.0480 | 18.00 | 5h 8m |
| 51.2k | DiffSBDD-EA (Mean) | 0.5619 ± 0.0501 | 8.00 | 5h 18m |
| 51.2k | DiffSBDD-EA (Spea2) | 0.5253 ± 0.0623 | 10.00 | 5h 22m |
| 102.4k | IMG | 0.6972 ± 0.0394 | 7.67 | 3h 42m |
| 102.4k | EGD | 0.5732 ± 0.0396 | 19.00 | 10h 13m |
| 102.4k | DiffSBDD-EA (Mean) | 0.5824 ± 0.0373 | 3.00 | 10h 37m |
| 102.4k | DiffSBDD-EA (Spea2) | 0.5515 ± 0.0318 | 19.00 | 10h 44m |
| 204.8k | IMG | 0.7413 ± 0.0119 | 13.00 | 7h 24m |
| 32k + 51.2k | EGD+IMG | 0.7447 ± 0.0496 | 13.67 | 5h 11m |

主要观察：

- 在相同 objective evaluation budget 下，IMG 通常取得更高 hypervolume。
- IMG 的运行时间也明显短于多个 EA baseline。
- baseline 方法在约 50k evaluations 后性能提升趋于平缓，而 IMG 随着 resampling size 增大仍能继续提升。
- **EGD+IMG** 的组合取得最高表格结果之一，说明 IMG 可作为模块接入已有 iterative optimization framework。

### Hypervolume 曲线

论文 Figure 2 展示 hypervolume 随 objective evaluations 增加的变化。当前“可用图表”中没有提供 Figure 2 对应图片，因此无法嵌入；待补充原文/PDF 后确认。

### Ablation：coefficient parameter 与 batch size

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-02.jpg]]

该图展示 IMG 对超参数的消融实验。左侧比较 coefficient parameter $c$ 对 hypervolume 的影响，右侧比较 batch size $N$ 对 hypervolume 的影响。

![[raw/zotero/images/多目标分子优化/2025 - 扩散推理时多目标生成的分布式多目标黑箱优化 - tanDistributionalMultiobjectiveBlackbox2025/mineru-figure-03.jpg]]

该图同样对应 Figure 4 的消融实验结果，可能是 MinerU 对同一图的拆分或重复截取。根据上下文，论文结论是 IMG 对 coefficient parameter $c$ 相对稳健，而增大 batch size $N$ 会提升 hypervolume。

消融结论：

1. **coefficient parameter $c$**  
   静态设置 $c_1=\cdots=c_n=c$ 并在 $[-1,1]$ 范围变化时，hypervolume 有波动但整体不敏感，说明 IMG 不需要大量调参。

2. **batch size $N$**  
   随着 $N$ 增大，hypervolume 明显提升。原因是：
   - 更大的 $N$ 对应更多 preference vectors；
   - 能同时探索更多 trade-off；
   - buffer 大小 $B=NM$ 也随之增大，候选池更丰富。

### Pareto front 结果

Appendix 中报告：

- IMG 单次运行生成 64 个样本；
- 其中识别出 16 个 non-dominated Pareto points；
- hypervolume 为 0.7640。

合并四个算法的 64 个样本，共 256 个解后：

- combined Pareto front 有 31 个 non-dominated points；
- overall hypervolume 为 0.8103；
- 各算法贡献：
  - IMG：16
  - EGD：6
  - DiffSBDD-EA (Mean)：8
  - DiffSBDD-EA (Spea2)：1

当前“可用图表”中没有提供 Figure 6 和 Figure 7 对应图片，因此无法嵌入；待补充原文/PDF 后确认。

## 创新点

1. **提出 inference-time 的多目标扩散生成算法 IMG**  
   不需要重新训练或微调扩散模型，而是在 reverse diffusion 过程中通过 weighted resampling 调整生成分布。

2. **从分布优化角度推导 multi-target Boltzmann distribution**  
   论文将每个目标的 KL-regularized optimal distribution 混合，得到可用于重采样的多目标目标分布。

3. **给出 negative log-likelihood 解释**  
   论文定义：
   $$
   \mathcal{L}(x;\lambda)
   =
   -\log\left(\sum_k e^{-\frac{f_k(x)-c_k}{\lambda_k}}\right)
   $$
   并说明当 $\beta=1$ 时，对该 loss 做 KL-regularized distributional optimization 得到的最优分布与前述 mixture target distribution 成比例。

4. **用 batch preference vectors 实现 single-pass Pareto front generation**  
   batch 中每个样本对应一个不同的 preference vector，使一次 diffusion pass 同时生成多个 trade-off 解。

5. **提出 QMC-based preference vector generation 方法**  
   在用户没有指定偏好时，使用正超球面表面上的均匀偏好向量，并通过 Quasi-Monte Carlo 改善覆盖均匀性。

6. **展示 IMG 可作为模块增强已有 EA-based 方法**  
   EGD+IMG 结果显示，IMG 能进一步提升已收敛 EA population 的表现。

## 局限性

1. **依赖大量 objective evaluations**  
   IMG 在每个 reverse diffusion step 都需要对 $N\times M$ 个候选评估多目标值。若目标评估非常昂贵，成本可能仍然较高。

2. **实验主要集中在一个分子生成任务**  
   当前解析文本中主要实验是针对 5ndu target protein 的三目标分子生成。方法在其他任务、更多目标数或非分子领域中的表现待补充原文/PDF 后确认。

3. **weight function 中 coefficient $c_k$ 的理论值不可直接获得**  
   $c_k$ 涉及 normalization constant $Z_k$，实际实现中使用 running upper bound 或静态值近似。虽然消融显示稳健，但理论与实践之间仍有近似。

4. **greedy sampling 的分布一致性需要进一步确认**  
   理论分布对应概率重采样，而实际使用 greedy sampling without replacement。两者之间的偏差和收敛性质待补充原文/PDF 后确认。

5. **部分公式或引用存在潜在不一致**  
   例如选择最大权重与公式中的 $\arg\min \tilde{W}$ 表述，以及 DiffSBDD 引用标注问题，需结合 PDF 原文确认。

6. **可用图表不完整**  
   当前可用图片缺少正文 Figure 1、Figure 2、Appendix Figure 6 和 Figure 7 的 Obsidian raw 路径版本，仅能根据文本描述记录。

## 相关概念

- [[多目标优化]]
- [[黑箱优化]]
- [[Pareto Front]]
- [[Hypervolume Indicator]]
- [[Boltzmann Distribution]]
- [[KL 正则化]]
- [[Quasi-Monte Carlo]]
- [[扩散模型]]
- [[分子优化]]
- [[分子生成]]
## 相关方法

- [[Inference-time Multi-target Generation]]
- [[Weighted Resampling]]
- [[Preference Vector Generation]]
- [[Greedy Sampling Without Replacement]]
## 相关数据集

- [[CrossDocked dataset]]
## 相关模型

- [[DiffSBDD]]
## 相关论文

- [[Structure-based drug design with equivariant diffusion models]]
- [[Evolutionary training-free guidance in diffusion model for 3D multi-objective molecular generation]]
- [[Preference-Guided Diffusion for Multi-Objective Offline Optimization]]
- [[Training-free multi-objective diffusion model for 3d molecule generation]]
- [[Diffusion models for black-box optimization]]
- [[Smooth Tchebycheff Scalarization for Multi-Objective Optimization]]

## 源文件

- Zotero citekey：`tanDistributionalMultiobjectiveBlackbox2025`
- 标题：**Distributional Multi-objective Black-box Optimization for Diffusion-model Inference-time Multi-Target Generation**
- 作者：Kim Yong Tan, Yueming Lyu, Ivor Tsang, Yew-Soon Ong
- 年份：2025
- DOI：`10.48550/ARXIV.2510.26278`
- Collections：多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

Diffusion models have been successful in learning complex data distributions. This capability has driven their application to high-dimensional multi-objective black-box optimization problem. Existing approaches often employ an external optimization loop, such as an evolutionary algorithm, to the diffusion model. However, these approaches treat the diffusion model as a black-box refiner, which overlooks the internal distribution transition of the diffusion generation process, limiting their efficiency. To address these challenges, we propose the Inference-time Multi-target Generation (IMG) algorithm, which optimizes the diffusion process at inferencetime to generate samples that simultaneously satisfy multiple objectives. Specifically, our IMG performs weighted resampling during the diffusion generation process according to the expected aggregated multi-objective values. This weighted resampling strategy ensures the diffusion-generated samples are distributed according to our desired multi-target Boltzmann distribution. We further derive that the multi-target Boltzmann distribution has an interesting log-likelihood interpretation, where it is the optimal solution to the distributional multi-objective optimization problem. We implemented IMG for a multi-objective molecule generation task. Experiments show that IMG, requiring only a single generation pass, achieves a significantly higher hypervolume than baseline optimization algorithms that often require hundreds of diffusion generations. Notably, our algorithm can be viewed as an optimized diffusion process and can be integrated into existing methods to further improve their performance.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键不是提出一个新的扩散模型结构，而是提出一种“推理时分布重加权”的使用方式。它把扩散模型每一步的反向转移分布当作可采样的 base distribution，然后用黑箱目标函数对候选进行筛选，从而把生成过程逐步偏向多目标高价值区域。

与 EA-based 方法相比，IMG 的优势在于它不是每一代调用扩散模型作为 refiner，而是直接在一次反向扩散链内部做多目标选择。这样做的直观含义是：优化压力被分布式地施加在整个 denoising trajectory 上，而不是只在生成完成后或 EA 外循环中筛选。

它的 theoretical framing 也比较清楚：从 KL-regularized distributional optimization 推导出指数倾斜分布，再把多个单目标分布混合为 multi-target Boltzmann distribution。这样 weighted resampling 就不只是 heuristic，而是有目标分布解释。

不过，实际算法中使用 greedy sampling without replacement，而理论中更自然的是概率重采样。这个 gap 是我认为后续需要重点关注的地方：greedy 可能提高小 batch 下的性能，但是否仍能严格采样到目标分布并不明显。

## 后续问题

1. IMG 中 greedy sampling without replacement 与理论 categorical weighted resampling 的关系能否形式化？
2. 如果 objective evaluation 非常昂贵，能否结合 surrogate model 或 early stopping 降低每步 $N\times M$ 次评估成本？
3. 当目标数量 $n$ 增大时，preference vector coverage 和 batch size $N$ 之间如何权衡？
4. coefficient $c_k$ 使用 running upper bound 是否在所有任务中都稳定？
5. IMG 是否可用于离散序列生成、蛋白设计、材料结构生成等非分子 3D 场景？
6. 与 classifier guidance、DPS、reward-guided diffusion 等 inference-time guidance 方法相比，IMG 的分布偏移机制有何本质差异？
7. 当前实验是否只针对单个 target protein 5ndu？如果换 target，结果是否稳定？待补充原文/PDF 后确认。
8. Figure 2、Figure 6、Figure 7 的原图需要补入 Obsidian raw 路径，以便完整记录实验曲线和 Pareto front 可视化。
