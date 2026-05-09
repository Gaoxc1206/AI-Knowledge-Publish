---
type: paper
citekey: "chenMultiObjectiveGuidedDiscreteFlow"
title: "面向可控生物序列设计的多目标引导离散流匹配"
chinese_title: "面向可控生物序列设计的多目标引导离散流匹配"
authors: "Tong Chen, Yinuo Zhang, Sophia Tang, Pranam Chatterjee"
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
  - "面向可控生物序列设计的多目标引导离散流匹配"
  - "Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design"
original_title: "Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design"
---
## 一句话总结

**Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design** 提出 **Multi-Objective-Guided Discrete Flow Matching (MOG-DFM)**，用于在离散生物序列生成过程中引入多目标引导，使预训练 Discrete Flow Matching 生成器能够朝多个性质的 Pareto front 方向采样，并在肽段 binder 设计和 enhancer DNA 设计任务中展示了较好的多目标权衡能力。

## 研究问题

本文关注的问题是：如何在离散生物序列空间中生成同时满足多个、可能相互冲突的功能和生物物理性质的序列。

具体包括：

- 在 肽段设计 中，同时优化：
  - hemolysis，即溶血性，目标是降低；
  - non-fouling，目标是提高；
  - solubility，目标是提高；
  - half-life，目标是延长；
  - binding affinity，目标是提高。
- 在 enhancer DNA 设计 中，同时控制：
  - enhancer class；
  - DNA shape，例如 HelT、Rise。
- 在方法层面，问题是如何将 多目标优化 融入 离散生成模型 的逐步采样过程，而不是先把离散序列嵌入连续空间再优化。

作者认为现有方法存在以下不足：

1. 很多生物分子设计方法只优化单一目标，容易导致其他性质退化。
2. 经典 多目标优化 方法如 NSGA-III、SPEA2、SMS-EMOA、MOPSO 可用于黑盒优化，但在高维序列空间中效率和生成质量受限。
3. 一些基于 flow matching 的多目标方法，如 ParetoFlow，主要工作在连续空间；用于离散序列时通常需要连续嵌入，可能扭曲离散分布。
4. 现有 Discrete Flow Matching 引导工作主要面向单目标任务，尚未充分支持多目标 Pareto 引导。

## 背景与动机

生物分子工程中的实际设计目标通常不是单一指标。例如：

- 治疗性蛋白或肽段需要兼顾高亲和力、低免疫原性和良好药代性质；
- CRISPR guide RNA 需要高 on-target activity 和低 off-target effect；
- 合成启动子需要高表达强度和组织特异性。

单目标优化虽然能在某个指标上取得高分，但经常产生不理想的 trade-off。例如：

- 高亲和力肽段可能溶解性差或毒性高；
- 稳定化蛋白可能失去功能特异性。

因此，作者希望构建一种可在生成过程中直接进行多目标控制的方法，使生成样本接近 Pareto-efficient 区域。

本文选择 Discrete Flow Matching 作为基础模型，原因是：

- 它直接在离散状态空间中建模序列分布；
- jump-process 形式的 Discrete Flow Matching 具有 token-level transition rates，可自然地对每一步 token 转移进行重加权；
- 相比连续 simplex 或连续 embedding 方法，它更少依赖可能扭曲离散分布的连续松弛。

## 核心思想

MOG-DFM 的核心思想是：

> 在预训练 Discrete Flow Matching 生成器的每一步采样中，评估候选 token 替换对多个目标的局部改进，并结合用户指定的 trade-off 方向，对原始转移速率进行重加权；随后用自适应 hypercone 过滤掉与目标方向不一致的转移，从而推动序列逐步靠近 Pareto front。

其关键组件包括：

1. **权重向量 ω**
   - 表示多目标之间的 trade-off 偏好。
   - 通过 **Das–Dennis simplex lattice** 在多目标 simplex 上生成多个方向。
   - 每次生成随机选择一个 ω，以覆盖不同 Pareto 区域。

2. **Hybrid rank-directional score**
   - 同时考虑：
     - 每个目标的局部改进 rank；
     - 改进向量与 trade-off 权重向量 ω 的方向一致性。
   - 用于重加权原始 Discrete Flow Matching 的 token transition velocity。

3. **Adaptive hypercone filter**
   - 只接受位于 ω 附近角锥内的候选转移。
   - hypercone 角度根据 rejection rate 自适应调整：
     - 拒绝过多则放宽；
     - 拒绝过少则收窄。
   - 目的是在探索和利用之间动态平衡。

4. **Euler sampling for CTMC**
   - 在经过多目标引导和 hypercone 过滤后，根据引导后的 CTMC transition rate 进行 Euler 采样。

## 方法框架

### 1. 基础模型：Discrete Flow Matching

论文设定离散序列：

$$
x = (x_1, \dots, x_d), \quad x_i \in \mathcal{T} = [K]
$$

其中 $\mathcal{T}$ 是 vocabulary，例如氨基酸或 DNA 碱基。

模型使用连续时间马尔可夫链 CTMC：

$$
\{X_t\}_{t \in [0,1]}
$$

用时间相关转移速率 $u_t(y,x)$ 将初始分布 $p_0$ 传输到目标数据分布 $p_1$。

边际概率满足 Kolmogorov forward equation：

$$
\frac{d}{dt}p_t(y)=\sum_{x \in S}u_t(y,x)p_t(x)
$$

转移速率采用 factorized velocity：

$$
u_t(y,x)=\sum_i \delta(y_{\bar{i}},x_{\bar{i}})u^i_t(y_i,x)
$$

也就是说，每次只考虑某个位置的 token 转移。

训练目标是学习 velocity field $u^\theta_t$。在 mixture path 参数化下，学习 velocity field 等价于学习边际 posterior：

$$
p^i_{1|t}(x^i_1|x)
$$

训练使用 generalized KL loss，该 loss 也可作为模型评估指标，并提供目标分布 likelihood 的 ELBO。

### 2. MOG-DFM 的输入

MOG-DFM 假设已有：

- 一个预训练 Discrete Flow Matching 生成模型；
- $N$ 个预训练 scalar score functions：

$$
s_n:S \to \mathbb{R}, \quad n=1,\dots,N
$$

这些 score functions 用于评价任意序列的多个目标性质。

目标是生成序列 $x_1$，使其 score vector：

$$
(s_1(x_1),s_2(x_1),\dots,s_N(x_1))
$$

接近 Pareto front，但作者明确写道“不保证 Pareto optimal”。

### 3. Rank-directional scoring

对于当前位置 $i$，候选替换 token $y_i \neq x_i$，定义替换后的新序列 $x_{\text{new}}$。

对于每个目标 $n$，计算局部改进：

$$
s_n(x_{\text{new}})-s_n(x)
$$

并转化为 rank-normalized improvement：

$$
I_n(y_i,x)=\frac{\text{rank}(s_n(x_{\text{new}})-s_n(x))}{|\mathcal{T}|}
$$

方向项定义为：

$$
D(y_i,x,\omega)=\Delta s(y_i,x)\cdot \omega
$$

其中 $\Delta s$ 是多目标改进向量，$\omega$ 是 trade-off 权重向量。

最终综合分数为：

$$
\Delta S(y_i,x,\omega)
=
\text{Norm}\left[
\frac{1}{N}\sum_{n=1}^{N} i_n I_n(y_i,x)
\right]
+
\lambda \text{Norm}[D(y_i,x,\omega)]
$$

其中：

- $I=[i_1,\dots,i_N]$ 是 importance vector；
- $\lambda$ 控制方向项强度；
- Norm 表示 z-score normalization。

然后用该分数重加权原始 DFM velocity：

$$
u^i_{\text{guided},t}(y_i,x|\omega)
=
\beta u^i_t(y_i,x)\exp(\Delta S(y_i,x,\omega)),
\quad y_i \neq x_i
$$

对于 $y_i=x_i$，通过负的 outgoing rate 保证 rate 条件成立。

### 4. Adaptive hypercone filtering

为保证候选转移方向与 trade-off 方向一致，计算候选改进向量与 $\omega$ 的夹角：

$$
\alpha_i=
\arccos
\left(
\frac{\Delta s(y_i,x)\cdot \omega}
{\|\Delta s(y_i,x)\|\|\omega\|}
\right)
$$

只接受满足：

$$
\alpha_i \leq \Phi
$$

的候选 token，其中 $\Phi$ 是当前 hypercone angle。

若接受集合 $Y_i$ 非空，则选择：

$$
y_i^{\text{best}}
=
\arg\max_{y_i \in Y_i}
\Delta S(y_i,x,\omega)
$$

若没有候选落入 hypercone，论文描述了两个退化情况：

1. 所有候选 $\alpha_i \geq \pi$：认为所有转移都降低性能，执行 self-transition。
2. 存在 $\alpha_i < \pi$ 但不在当前 cone 内：选择最佳对齐候选继续推进。

hypercone 角度根据 rejection rate 自适应更新：

$$
r_t=
\frac{\#\{y_i:\alpha_i>\Phi\}}
{\text{total candidate transitions}}
$$

计算 EMA：

$$
\bar{r}_t=\alpha_r\bar{r}_{t-h}+(1-\alpha_r)r_t
$$

更新角度：

$$
\Phi_{t+h}
=
\text{clip}
\left(
\Phi_t\exp(\eta(\bar{r}_t-\tau)),
\Phi_{\min},\Phi_{\max}
\right)
$$

其中：

- $\tau$ 是目标 rejection rate；
- $\eta$ 是更新学习率；
- $\Phi_{\min}, \Phi_{\max}$ 限制角度范围。

### 5. Euler sampling

在得到 guided transition rate 后，计算当前坐标 $i$ 的 outgoing rate：

$$
R^i_t(x)
=
\sum_{y_i \neq x_i}
u^i_{\text{guided},t}(y_i,x|\omega)
$$

CTMC Euler 采样概率为：

$$
P(X^i_{t+h}=x_i|X_t=x)
=
\exp(-hR^i_t(x))
$$

若发生跳转，则转到经过 hypercone filtering 选出的 best candidate。

## 算法流程

MOG-DFM 的整体流程如下：

1. 输入：
   - 预训练 Discrete Flow Matching 模型；
   - 多个目标的 score functions；
   - 采样步数 $T$；
   - hypercone 和引导相关超参数。

2. 初始化：
   - 从离散状态空间 $S$ 中均匀采样初始序列 $x_0$；
   - 使用 **Das–Dennis simplex lattice** 生成覆盖 Pareto front 的权重向量集合；
   - 随机选择一个权重向量 $\omega$。

3. 对 $t=0$ 到 $1$ 进行 $T$ 步采样：
   - 随机选择一个序列位置 $i$；
   - 对每个候选 token 替换：
     - 计算每个目标的 rank-normalized improvement；
     - 计算多目标改进向量与 $\omega$ 的 directional alignment；
     - 合成 hybrid rank-directional score；
     - 用该 score 重加权原始 DFM transition velocity。
   - 计算候选转移与 $\omega$ 的角度；
   - 用 adaptive hypercone filtering 筛选候选；
   - 选择最佳候选；
   - 根据 guided CTMC rate 进行 Euler 采样；
   - 更新 hypercone angle。

4. 输出最终序列 $x_1$。

## 实验设置

### 1. 任务设置

论文设计了两个 benchmark，因为作者指出目前没有公开数据集专门用于生物序列多目标优化算法评估。

#### 任务一：peptide binder generation

目标：生成肽段 binder，同时优化五个治疗相关性质：

- hemolysis，越低越好；
- non-fouling，越高越好；
- solubility，越高越好；
- half-life，越高越好；
- binding affinity，越高越好。

评估目标蛋白包括：

- 有已知 binder 的结构化目标：
  - 1B8Q
  - 1E6I
  - 3IDJ
  - 5AZ8
  - 7JVS
- 无已知 binder 的结构化目标：
  - AMHR2
  - OX1R
  - DUSP12
- intrinsically disordered targets：
  - EWS::FLI1
  - MYC

每个目标通常生成 100 个 binder。

#### 任务二：enhancer DNA generation

目标：生成 enhancer DNA，同时控制：

- enhancer class；
- DNA shape。

具体包括两个任务：

1. Task 1：
   - enhancer class 1；
   - high HelT；
   - class 1 与 ATF motif 相关。
2. Task 2：
   - enhancer class 16；
   - high Rise。

由于时间限制，每个设置生成 5 条长度为 100 的 enhancer DNA 序列。

### 2. 基础生成模型

#### PepDFM

**PepDFM** 是用于肽段生成的 unconditional Discrete Flow Matching 模型。

模型信息：

- backbone：U-Net-style convolutional architecture；
- 数据集：
  - PepNN；
  - BioLip2；
  - PPIRef 中长度 6 到 49 的序列；
- 数据划分：80/10/10 train/validation/test；
- 训练结果：
  - training loss：3.3134；
  - validation loss：3.1051；
- 使用 generalized KL loss 进行评估；
- 生成结果用 Hamming distance 和 Shannon entropy 评估多样性和生物合理性。

训练细节：

- 训练设备：2xH100 NVIDIA NVL GPU，94 GB VRAM；
- 训练 200 epochs；
- batch size 512；
- Adam optimizer；
- learning rate 1e-4；
- 20 warm-up epochs + cosine decay；
- embedding dimension 512；
- hidden dimension 256；
- 使用 dynamic batching。

#### EnhancerDFM

**EnhancerDFM** 是用于 enhancer DNA 生成的 unconditional Discrete Flow Matching 模型。

模型信息：

- backbone 与 PepDFM 相同；
- 数据集来自 Stark et al. 的 enhancer DNA design 任务；
- 数据包含 89k human melanoma enhancer sequences；
- 每条序列长度 500；
- 共 47 个 cell classes，标签由 ATAC-seq 数据确定；
- 使用 Fréchet Biological Distance，即 FBD，进行评估。

训练细节：

- 训练设备：2xH100 NVIDIA NVL GPU，94 GB VRAM；
- 训练 1500 epochs；
- batch size 256；
- Adam optimizer；
- learning rate 1e-3；
- 150 warm-up epochs + cosine decay；
- embedding dimension 256；
- hidden dimension 256。

### 3. 评分模型

#### Hemolysis、non-fouling、solubility

- 数据来自 PepLand 和 PeptideBERT datasets；
- 分别有：
  - hemolysis：9,316 条；
  - non-fouling：17,185 条；
  - solubility：18,453 条；
- 使用 ESM-2-650M mean pooled embedding；
- 分类模型为 XGBoost boosted trees；
- train/validation split：0.8/0.2；
- 使用 OPTUNA 搜索超参数；
- validation F1：
  - hemolysis：0.58；
  - non-fouling：0.71；
  - solubility：0.68。

#### Binding affinity

- 数据量：1,781；
- 使用 unpooled reciprocal attention transformer；
- 输入为 ESM-2 650M token-level embeddings；
- 结构包括 convolutional layers 和 cross-attention layers；
- validation Spearman correlation：0.64。

#### Half-life

- 数据来自：
  - PEPLife；
  - PepTherDia；
  - THPdb2；
- 只选择 human subjects，去除缺失和重复后共 105 条；
- 由于数据较小，先在 stability dataset 上预训练，再在 half-life 数据上 fine-tune；
- stability pre-training：
  - validation Spearman：0.7915；
  - $R^2$：0.6864。
- half-life fine-tuning：
  - 预测 $\log_{10}$ half-life；
  - validation Spearman：0.8581；
  - $R^2$：0.5977。

### 4. MOG-DFM 采样超参数

#### Peptide binder generation

- num_div：64；
- $\lambda=1.0$；
- $\beta=1.0$；
- $\alpha_r=0.5$；
- $\tau=0.3$；
- $\eta=1.0$；
- $\Phi_{\text{init}}=45^\circ$；
- $\Phi_{\min}=15^\circ$；
- $\Phi_{\max}=75^\circ$；
- total sampling step $T=100$。

五属性 guidance 的 importance vector：

$$
[1,1,1,0.5,0.2]
$$

对应：

- hemolysis；
- non-fouling；
- solubility；
- half-life；
- binding affinity。

其中 hemolysis 被转换为 $1-h$，使所有目标都成为 maximization。

half-life 的 log-scale 预测被 cap 到 2，即 100 小时，以防其主导优化。

#### Enhancer DNA generation

- 除采样步数外，其余超参数与 peptide binder task 相同；
- total sampling step $T=800$。

importance vector：

- Task 1：[1, 10]，对应 enhancer class guidance 和 HelT guidance；
- Task 2：[1, 100]，对应 enhancer class guidance 和 Rise guidance。

## 主要结果

### 1. PepDFM 能生成多样且生物合理的 peptide

作者报告：

- PepDFM 生成的 peptide 与 test set 的 Hamming distance 较高，说明生成样本具有较强 novelty；
- 生成 peptide 的 Shannon entropy 接近 test set，说明生成序列具有生物合理性；
- 具体图中数值需要结合 Figure 3 原图进一步读取，待补充原文/PDF 后确认。

### 2. EnhancerDFM 的 unconditional enhancer DNA 生成质量接近 Dirichlet FM

在 10k 条 enhancer DNA 生成评估中：

| Method | FBD | NFE | Training Epochs |
|---|---:|---:|---:|
| Random Sequence | 622.8 | - | - |
| Dirichlet FM | 5.3 | 100 | 1400 |
| EnhancerDFM | 5.9 | 100 | 20 |

结果说明：

- EnhancerDFM 的 FBD 明显低于 random sequence；
- EnhancerDFM 与 Dirichlet FM 接近；
- EnhancerDFM 达到最佳 checkpoint 所需 epoch 显著更少。

原文有一句“best EnhancerDFM model is achieved within 20 training epochs, while the best EnhancerDFM is obtained only in around 1400 training epochs”，应是将后者写成 Dirichlet FM 的笔误；待补充原文/PDF 后确认。

### 3. MOG-DFM 能平衡多目标 trade-off

作者通过 ablation 验证每个 guidance signal 的作用。

#### 7LUL 三目标 ablation

目标：affinity、solubility、hemolysis。

结果显示：

- 去掉任一目标 guidance 后，对应性质会显著退化；
- 只优化 affinity 会得到高 affinity，但 solubility 很低、hemolysis 较高；
- 三个目标同时引导时更平衡。

#### CLK1 三目标 ablation

目标：affinity、non-fouling、half-life。

结果显示：

- 去掉 non-fouling guidance 时，half-life 可超过 80 小时，但 non-fouling 接近很低；
- 去掉 half-life guidance 时，non-fouling 较高，但 half-life 低于 2 小时；
- 全部 guidance 同时启用时得到更均衡的属性组合。

### 4. 五属性 peptide binder 设计结果

MOG-DFM 在多个 target 和 binder length 上生成 100 个 binder 的平均结果表明：

- hemolysis 通常在 0.06–0.09；
- non-fouling 通常大于 0.78；
- solubility 通常大于 0.74；
- half-life 大约 28–47 小时；
- affinity score 大约 6.4–7.6。

部分代表结果：

| Target | Binder Length | Hemolysis ↓ | Non-Fouling ↑ | Solubility ↑ | Half-Life ↑ | Affinity ↑ |
|---|---:|---:|---:|---:|---:|---:|
| AMHR2 | 8 | 0.0755 | 0.8352 | 0.8219 | 31.624 | 7.3789 |
| AMHR2 | 12 | 0.0570 | 0.8419 | 0.8279 | 28.761 | 7.4274 |
| EWS::FLI1 | 12 | 0.0616 | 0.8302 | 0.8130 | 34.225 | 6.3631 |
| MYC | 8 | 0.0809 | 0.8135 | 0.8005 | 39.836 | 6.8488 |
| OX1R | 10 | 0.0741 | 0.8115 | 0.7969 | 33.533 | 7.4162 |
| 3IDJ | 7 | 0.0924 | 0.8246 | 0.7992 | 30.388 | 7.6304 |
| 7JVS | 11 | 0.0628 | 0.8390 | 0.8206 | 32.834 | 6.9569 |

### 5. 与已有 binder 的比较

对有 pre-existing binder 的目标，作者用 MOG-DFM 设计 binder，并与已有 binder 比较。

论文声称：

- MOG-DFM-designed binders 在多个属性上显著优于已有 binders；
- binding potential 未明显受损；
- 通过 AlphaFold3 的 ipTM 和 AutoDock VINA docking score 进一步验证；
- 设计 binder 与已有 binder 可能结合在类似 target positions，但序列和结构显著不同。

具体结构图和数值见 Figure 2、Figure 4；由于当前摘取文本未包含所有图中具体数值，待补充原文/PDF 后确认。

### 6. 采样过程中的性质改善

以 EWS::FLI1 的 12-aa binder 设计为例：

- 记录 100 个 binder 在每次 iteration 的五个属性均值和标准差；
- 五个属性随迭代整体改善；
- solubility 和 non-fouling 平均分数从约 0.3 提高到约 0.8；
- hemolysis、non-fouling、solubility 的改善逐渐收敛；
- half-life 最终方差较大，作者认为是因为 half-life 对 guidance 更敏感，需要与其他性质平衡。

### 7. 外部 ADMET-AI 验证

作者使用 ADMET-AI 作为外部评估工具，验证 MOG-DFM 设计 binder 的 solubility 和 half-life。

结果：

- 平均 LogS 大约在 -2.5 log mol·L⁻¹ 左右；
- 高于常用 good solubility 阈值 -4；
- half-life 估计通常大于 15 小时。

部分结果：

| Target | LogS | Half-Life |
|---|---:|---:|
| AMHR2 | -2.3931 | 15.505 |
| EWS::FLI1 | -2.3869 | 18.945 |
| OX1R | -2.4772 | 23.002 |
| 1B8Q | -2.3203 | 18.7862 |
| 3IDJ | -2.4193 | 20.3586 |
| 7JVS | -2.4824 | 20.2565 |

### 8. 与传统多目标优化算法比较

比较方法：

- MOPSO
- NSGA-III
- SMS-EMOA
- SPEA2
- MOG-DFM

目标蛋白：

- 1B8Q；
- PPP5。

结果摘要：

- MOG-DFM runtime 更长；
- 但在 non-fouling、solubility、half-life 上显著更优；
- affinity 保持竞争性，但不一定所有 target 上都是最高；
- hemolysis 相比部分方法更优，但也不是所有表格项都绝对最优。

例如 1B8Q：

| Method | Time (s) | Hemolysis ↓ | Non-Fouling | Solubility | Half-Life | Affinity |
|---|---:|---:|---:|---:|---:|---:|
| MOPSO | 8.54 | 0.1066 | 0.4763 | 0.4684 | 4.449 | 6.0594 |
| NSGA-III | 33.13 | 0.0862 | 0.5715 | 0.5825 | 7.324 | 7.2178 |
| SMS-EMOA | 8.21 | 0.1196 | 0.3450 | 0.3511 | 3.023 | 5.955 |
| SPEA2 | 17.48 | 0.0819 | 0.4973 | 0.5057 | 4.126 | 7.324 |
| MOG-DFM | 43.00 | 0.0785 | 0.8445 | 0.8455 | 27.227 | 5.9094 |

MOG-DFM 在 affinity 上低于 SPEA2 和 NSGA-III，但在 non-fouling、solubility、half-life 上明显更优，体现了多目标 trade-off。

作者未与 ParetoFlow 比较，理由是 ParetoFlow 需要 score models 接受 continuous inputs，不适合本文离散序列任务。

### 9. Hyperparameter sensitivity

作者测试了多个超参数，包括：

- num_div；
- $\beta$；
- $\lambda$；
- $\alpha_r$；
- $\eta$；
- $\Phi_{\text{init}}$；
- $[\Phi_{\min}, \Phi_{\max}]$；
- $\tau$；
- sampling step $T$；
- importance weights。

主要结论：

- 增加 sampling steps $T$ 通常提升所有指标，因为更细步长更接近连续时间 dynamics；
- $\Phi_{\text{init}}$ 过小或过大都会变差：
  - 过小限制探索；
  - 过大削弱方向引导；
- importance weights 对多目标平衡很关键；
- $\beta,\lambda,\alpha_r,\eta,\tau,\Phi_{\min},\Phi_{\max}$ 的中等变化影响相对较小，说明 MOG-DFM 有一定鲁棒性。

### 10. Adaptive hypercone filtering ablation

在 3IDJ、4E-BP2、EWS::FLI1 上做 ablation：

设置：

- w/o filtering：完全关闭 hypercone filtering；
- w/o adaptation：使用 hypercone 但不自适应角度；
- MOG-DFM：完整方法。

结果显示：

- 去掉 filtering 会导致 half-life 大幅下降；
- 静态 hypercone 可恢复部分 half-life，但会牺牲 non-fouling 和 solubility；
- 完整 MOG-DFM 能同时提高 half-life 并维持其他目标表现；
- 在 disordered targets，如 4E-BP2 和 EWS::FLI1，上自适应 cone 尤其重要。

代表结果：

| Target | Method | Hemolysis ↓ | Non-Fouling | Solubility | Half-Life | Affinity |
|---|---|---:|---:|---:|---:|---:|
| EWS::FLI1 | w/o filtering | 0.0450 | 0.8596 | 0.8570 | 4.40 | 6.1392 |
| EWS::FLI1 | w/o adaptation | 0.0620 | 0.8444 | 0.8482 | 28.82 | 6.2118 |
| EWS::FLI1 | MOG-DFM | 0.0616 | 0.8302 | 0.8130 | 34.225 | 6.3631 |

### 11. Enhancer DNA 多目标设计结果

Task 1：

- 目标 enhancer class 1；
- 目标 high HelT，最大 HelT 设置为 36。

Task 2：

- 目标 enhancer class 16；
- 目标 high Rise，最大 Rise 设置为 3.7；
- canonical Rise 范围约 3.3–3.4。

结果显示：

- 同时使用 class guidance 和 shape guidance 时，MOG-DFM 能同时获得目标 enhancer class 的高概率和接近目标的 DNA shape；
- 去掉其中一个 guidance，相应属性明显退化；
- 去掉两个 guidance，class probability 和 shape 均较差。

需要注意：Table 4 排版较混乱，部分列名与数值对应关系需要查阅原始 PDF 表格确认；待补充原文/PDF 后确认。

## 创新点

1. **提出 MOG-DFM**
   - 将 多目标优化 与 Discrete Flow Matching 的离散 CTMC 采样过程结合。
   - 可用于引导任意预训练 DFM 生成器，前提是有多个 scalar score functions。

2. **直接在离散序列空间进行多目标引导**
   - 不依赖连续 embedding 或连续 relaxation。
   - 避免连续空间方法可能扭曲离散分布的问题。

3. **Hybrid rank-directional score**
   - 将局部 rank-normalized improvement 与全局 trade-off direction alignment 结合。
   - 同时兼顾局部探索和方向性利用。

4. **Adaptive hypercone filtering**
   - 用动态角锥限制转移方向，强化沿 Pareto trade-off 方向的推进。
   - 通过 rejection rate 自适应调整角度，平衡探索和利用。

5. **训练了两个 unconditional base models**
   - **PepDFM**：用于多样 peptide generation；
   - **EnhancerDFM**：用于 functional enhancer DNA generation。

6. **跨序列类型验证**
   - 在 peptide binder 和 enhancer DNA 两类生物序列任务上验证 MOG-DFM。

7. **与传统多目标优化算法比较**
   - 与 MOPSO、NSGA-III、SMS-EMOA、SPEA2 对比，并展示在多属性平衡上的优势。

## 局限性

1. **不保证 Pareto optimal**
   - 作者明确表示目标是生成 score vector 接近 Pareto front，不是保证 Pareto optimal。

2. **依赖预训练 score models**
   - 多目标引导质量取决于各个性质预测器的准确性。
   - hemolysis、non-fouling、solubility 的 F1 分数分别为 0.58、0.71、0.68，存在一定预测误差。
   - half-life 数据仅 105 条，虽然使用预训练和微调，但数据规模仍小。

3. **实验主要基于预测指标**
   - 肽段性质、binding affinity、half-life 等多数结果来自预测模型。
   - 虽然使用了 ADMET-AI、AlphaFold3、AutoDock VINA 做辅助验证，但缺少湿实验验证；原文未报告实验室实验证据。

4. **runtime 较长**
   - 与传统多目标优化算法相比，MOG-DFM 生成单个 binder 的时间更长。
   - 例如 1B8Q 上 MOG-DFM 为 43s，高于 MOPSO、SMS-EMOA、SPEA2，也高于 NSGA-III。

5. **长序列和高维输出仍待扩展**
   - 结论中作者提到未来工作将扩展到 longer sequences 和 higher-dimensional outputs。

6. **理论保证有限**
   - 附录证明说明在 hypercone 条件下期望上沿 $\omega$ 方向有正改进。
   - 但更强的 Pareto convergence guarantee 仍是未来方向。

7. **DNA 设计实验样本数较小**
   - enhancer DNA 每个设置仅生成 5 条序列，统计稳定性有限。

8. **表格和文本存在可能笔误**
   - EnhancerDFM 与 Dirichlet FM training epochs 的描述可能有笔误。
   - Table 4 排版不清晰，需要原始 PDF 确认。

## 相关概念

- [[多目标优化]]
- [[Pareto front]]
- [[Pareto optimality]]
- [[Pareto-efficient solution]]
- [[Discrete Flow Matching]]
- [[Flow Matching]]
- [[离散生成模型]]
- [[连续时间马尔可夫链]]
- [[CTMC]]
- [[Kolmogorov forward equation]]
- [[Factorized velocity field]]
- [[Transition rate]]
- [[Euler sampling]]
- [[Bregman divergence]]
- [[Generalized KL divergence]]
- [[ELBO]]
- [[Das–Dennis simplex lattice]]
- [[Hypercone filtering]]
- [[Adaptive hypercone]]
- [[Rank-normalized improvement]]
- [[Directional alignment]]
- [[生物序列设计]]
- [[肽段设计]]
- [[Peptide binder design]]
- [[Enhancer DNA design]]
- [[DNA shape]]
- [[HelT]]
- [[Rise]]
- [[Binding affinity]]
- [[Solubility]]
- [[Hemolysis]]
- [[Non-fouling]]
- [[Half-life]]
- [[ADMET]]
- [[AlphaFold3]]
- [[AutoDock VINA]]
- [[Fréchet Biological Distance]]
- [[ESM-2]]
- [[XGBoost]]
- [[OPTUNA]]

## 相关方法

- [[MOG-DFM]]
- [[PepDFM]]
- [[EnhancerDFM]]
- [[Discrete Flow Matching]]
- [[Dirichlet Flow Matching]]
- [[Gumbel-Softmax Flow Matching]]
- [[ParetoFlow]]
- [[PepTune]]
- [[Masked Discrete Diffusion Language Model]]
- [[MDLM]]
- [[Monte Carlo Tree Search]]
- [[NSGA-III]]
- [[SMS-EMOA]]
- [[SPEA2]]
- [[MOPSO]]
- [[Bayesian optimization]]
- [[Evolutionary algorithms]]
- [[U-Net]]
- [[Deep DNAshape]]
- [[ADMET-AI]]

## 相关论文

- **Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design**  
  - citekey: `chenMultiObjectiveGuidedDiscreteFlow`
  - 本文。
- **Discrete Flow Matching**  
  - Gat et al., NeurIPS 2024。
  - 本文基础生成框架。
- **Dirichlet Flow Matching with applications to DNA sequence design**  
  - Stark et al., ICML 2024。
  - enhancer DNA 设计相关 baseline。
- **Gumbel-Softmax Flow Matching with Straight-Through Guidance for Controllable Biological Sequence Generation**  
  - Tang et al., 2025。
  - 离散可控生成相关方法。
- **Unlocking Guidance for Discrete State-Space Diffusion and Flow Models**  
  - Nisonoff et al., ICLR 2025。
  - 离散 diffusion/flow guidance 相关。
- **ParetoFlow: Guided Flows in Multi-Objective Optimization**  
  - Yuan et al., 2024。
  - 连续空间 flow matching 多目标优化方法。
- **PepTune: De novo generation of therapeutic peptides with multi-objective-guided discrete diffusion**  
  - Tang, Zhang, Chatterjee, ICML 2025。
  - 同一实验室的多目标肽段生成相关工作。
- **Simple and Effective Masked Diffusion Language Models**  
  - Sahoo et al., NeurIPS 2024。
  - PepTune 相关 MDLM 基础。
- **Accurate structure prediction of biomolecular interactions with AlphaFold 3**  
  - Abramson et al., Nature 2024。
  - 用于结构和 ipTM 评估。
- **AutoDock VINA**  
  - Trott and Olson, 2010。
  - 用于 docking score 评估。
- **ADMET-AI**  
  - Swanson et al., Bioinformatics 2024。
  - 用于外部 ADMET 评估。
- **Predicting DNA structure using a deep learning method**  
  - Li, Chiu, Rohs, Nature Communications 2024。
  - Deep DNAshape 相关。

## 源文件

- citekey: `chenMultiObjectiveGuidedDiscreteFlow`
- title: **Multi-Objective-Guided Discrete Flow Matching for Controllable Biological Sequence Design**
- authors: Tong Chen, Yinuo Zhang, Sophia Tang, Pranam Chatterjee
- year: 待补充原文/PDF 后确认
- venue: 待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认
- arXiv: `arXiv:2505.07086v2 [cs.LG] 14 May 2025`
- collections: 多目标分子优化
- code/materials: `https://huggingface.co/ChatterjeeLab/MOG-DFM`

## 图表摘录

![[raw/zotero/images/多目标分子优化/面向可控生物序列设计的多目标引导离散流匹配 - chenMultiObjectiveGuidedDiscreteFlow/page-001.png]]

## Zotero 原始摘要

Designing biological sequences that satisfy multiple, often conflicting, functional and biophysical criteria remains a central challenge in biomolecule engineering. While discrete flow matching models have recently shown promise for efficient sampling in high-dimensional sequence spaces, existing approaches address only single objectives or require continuous embeddings that can distort discrete distributions. We present Multi-Objective-Guided Discrete Flow Matching (MOG-DFM), a general framework to steer any pretrained discrete flow matching generator toward Pareto-efficient trade-offs across multiple scalar objectives. At each sampling step, MOG-DFM computes a hybrid rank-directional score for candidate transitions and applies an adaptive hypercone filter to enforce consistent multi-objective progression. We also trained two unconditional discrete flow matching models, PepDFM for diverse peptide generation and EnhancerDFM for functional enhancer DNA generation, as base generation models for MOG-DFM. We demonstrate MOG-DFM’s effectiveness in generating peptide binders optimized across five properties (hemolysis, non-fouling, solubility, half-life, and binding affinity), and in designing DNA sequences with specific enhancer classes and DNA shapes. In total, MOG-DFM proves to be a powerful tool for multi-property-guided biomolecule sequence design.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的价值在于把 多目标优化 直接嵌入到 Discrete Flow Matching 的 token-level transition dynamics 中，而不是把序列先变成连续向量再做多目标控制。

我理解 MOG-DFM 的“可控性”主要来自三个层次：

1. **方向控制**
   - 权重向量 $\omega$ 决定这次生成要探索 Pareto front 的哪个区域。
   - 不同 $\omega$ 对应不同属性 trade-off。

2. **局部候选重排**
   - 每个 token 替换都会被多个 score models 评价。
   - rank score 解决不同目标数值尺度不同的问题；
   - directional score 保证整体改进方向和 $\omega$ 一致。

3. **几何过滤**
   - hypercone filter 相当于在 score space 中限制“走路方向”。
   - 不是所有局部高分转移都允许，必须与整体多目标方向一致。
   - 自适应角度则避免过度保守或过度发散。

从生成建模角度看，MOG-DFM 不是重新训练条件生成模型，而是在采样时对 pretrained unconditional DFM 进行 guidance。因此它比较灵活，只要有 score functions，就能迁移到不同性质组合上。

从生物设计角度看，这种方法的瓶颈主要在 score models。若 score models 不可靠，生成结果可能只是“优化了预测器”，而不一定优化真实实验性质。论文用 ADMET-AI、AlphaFold3、AutoDock VINA 做了交叉验证，但最终仍需要实验验证。

这篇论文也提示了一个重要方向：对于离散生物序列，Discrete Flow Matching 的 jump-process 形式可能比连续 simplex 方法更适合做逐 token 可控生成，因为 transition rate 可以被性质分数自然重加权。

## 后续问题

1. MOG-DFM 在真实湿实验中生成的 peptide binder 是否仍能保持低溶血、高溶解性和强结合？
2. score model 的误差如何影响 Pareto front 估计？是否会出现 reward hacking？
3. 是否可以引入 uncertainty-aware guidance，降低对不确定预测区域的过度优化？
4. 对长蛋白序列、抗体 CDR、RNA 序列等更长或结构约束更强的生物序列，MOG-DFM 是否仍稳定？
5. adaptive hypercone filtering 是否可以有更强的 Pareto convergence guarantee？
6. 当前每步只随机更新一个 position，是否可以扩展到 block update 或 learned proposal？
7. importance vector 目前依赖属性范围手动设定，能否自动学习或动态调整？
8. 多个 score functions 的计算成本较高时，是否可以用 surrogate 或 caching 加速？
9. MOG-DFM 与 classifier guidance、classifier-free guidance 在离散流模型中的关系能否统一？
10. enhancer DNA 实验每个设置只生成 5 条序列，扩大样本规模后结果是否仍稳定？
11. 能否将用户偏好从固定 $\omega$ 扩展为交互式 feedback-guided generation？
12. 对非凸、不连续 Pareto front，adaptive hypercone 是否总能避免陷入局部区域？
13. 是否可以将 docking、folding 或结构约束直接纳入采样环，而不是事后评估？
14. 与 PepTune 相比，MOG-DFM 在同等预算下的 Pareto hypervolume、diversity 和 novelty 如何？
15. 如果多个目标之间高度冲突，MOG-DFM 的生成多样性和收敛性会如何变化？
