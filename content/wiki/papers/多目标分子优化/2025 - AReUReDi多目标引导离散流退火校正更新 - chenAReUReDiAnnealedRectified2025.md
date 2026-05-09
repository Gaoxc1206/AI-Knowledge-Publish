---
type: paper
citekey: "chenAReUReDiAnnealedRectified2025"
zotero_key: "C4JQIKVC"
title: "AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance"
chinese_title: "AReUReDi多目标引导离散流退火校正更新"
authors: "Tong Chen, Yinuo Zhang, Pranam Chatterjee"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2510.00352"
zotero_collections:
  - "多目标分子优化"
source_pdf: "raw/zotero/pdfs/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025.pdf"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "AReUReDi多目标引导离散流退火校正更新"
  - "AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance"
---
## 一句话总结

**AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance** 提出了一种面向离散生物序列的多目标优化采样框架，在 Rectified Discrete Flows 基础上结合 Tchebycheff scalarization、locally balanced proposals 与 Metropolis-Hastings 更新，用于将肽序列和 peptide SMILES 生成引导到近似 Pareto front 的区域。

## 研究问题

这篇论文关注的问题是：如何在离散生物序列空间中生成同时满足多个、常常相互冲突目标的候选分子序列。

具体任务包括：

- 野生型肽 binder 设计；
- chemically-modified peptide SMILES 设计；
- 同时优化多个治疗相关性质：
  - binding affinity；
  - solubility；
  - hemolysis；
  - half-life；
  - non-fouling。

论文认为，现有方法存在两个主要不足：

1. 许多生成模型主要在连续空间或潜在空间中工作，难以直接保留离散 token 结构。
2. 离散生成方法已有单目标 guidance，但缺乏针对多目标 Pareto optimality 的理论保证。

因此，作者希望构造一个直接作用于离散 token 空间、同时具备 Pareto 收敛保证和实际生成能力的多目标生物序列生成方法。

## 背景与动机

生物分子工程天然是多目标分子优化问题。例如：

- 治疗肽需要高 binding affinity、低毒性、良好 solubility 和 pharmacokinetics；
- CRISPR guide RNA 需要高 on-target activity 和低 off-target effects；
- synthetic promoters 需要高表达强度和组织特异性。

单目标优化容易导致负面 trade-off：

- 高亲和力肽可能不溶或具有溶血性；
- 稳定性提高的蛋白可能损失 specificity。

传统黑盒多目标优化方法，如 evolutionary search 和 Bayesian optimization，已经用于分子设计，但在高维离散序列空间中扩展性较差。

近年来的 generative approaches 能进行可控生成，例如 ParetoFlow 在连续空间中用 flow matching 生成 Pareto-optimal samples。但对生物序列而言，连续嵌入可能扭曲 token-level structure，使 property guidance 更困难。

因此，作者转向离散流模型，尤其是 Rectified Discrete Flows。ReDi 能通过 rectification 降低 discrete flow matching 的 factorization error，但它本身没有多目标 Pareto guidance。AReUReDi 的动机就是在 ReDi 的离散生成能力上加入多目标引导和 MCMC 保证。

## 核心思想

AReUReDi 的核心思想是：

> 用预训练的 Rectified Discrete Flows 作为离散生成先验，再通过 annealed Tchebycheff scalarization 将多目标分数转化为一个可采样的 reward，并用 locally balanced proposal 与 Metropolis-Hastings 更新构造一个以 Pareto 高质量区域为目标的 Markov chain。

方法由三部分组成：

1. **Annealed Tchebycheff scalarization**
   - 将多个目标归一化后，用 Tchebycheff scalarization 计算平衡型 reward；
   - 通过逐步增大 guidance strength，使采样先探索、后聚焦。

2. **Locally balanced proposals**
   - 用 ReDi 给出的 token-level transition probability 作为生成先验；
   - 用多目标 reward ratio 调整候选 token 的 proposal probability；
   - balancing function 满足对称条件，保证可逆性。

3. **Metropolis-Hastings updates**
   - 对 proposal 进行接受/拒绝；
   - 保持目标分布不变性；
   - 理论上在 guidance strength 趋于无穷时集中到 Pareto-optimal states。

## 方法框架

### 1. 离散状态空间

论文设离散序列空间为：

$$
S = V^L
$$

其中：

- $V$：token vocabulary；
- $L$：序列长度；
- $x = (x_1, \dots, x_L)$：一个离散序列。

### 2. 基础生成模型：ReDi

AReUReDi 假设已有一个预训练的 ReDi 模型，能给出每个位置的 marginal transition probabilities：

$$
p_t^i(\cdot | x_t)
$$

这个概率作为 AReUReDi 中 token mutation 的生成先验。

Rectified Discrete Flows 的作用是通过反复修正 source-target coupling，降低 conditional total correlation，从而缓解 discrete flow matching 中因坐标独立近似导致的 factorization error。

### 3. 多目标函数

设有 $N$ 个目标函数：

$$
s_1, \dots, s_N: S \to \mathbb{R}
$$

并将它们归一化为：

$$
\tilde{s}_n(x) \in [0, 1]
$$

论文使用 Tchebycheff scalarization：

$$
S_\omega(x) = \min_{1 \leq n \leq N} \omega_n \tilde{s}_n(x)
$$

其中 $\omega \in \Delta^{N-1}$ 是目标权重向量。

该 scalarization 偏向“所有目标都较好”的样本，而不是某一个目标特别强、其他目标很弱的样本。

### 4. Annealed guidance

将 scalarized reward 转成 guidance weight：

$$
W_{\eta_t,\omega}(x) = \exp(\eta_t S_\omega(x))
$$

其中 $\eta_t$ 是随采样过程增加的 guidance strength：

$$
\eta_t = \eta_{\min} + (\eta_{\max} - \eta_{\min}) \frac{t}{T-1}
$$

解释：

- 早期 $\eta_t$ 小：鼓励探索；
- 后期 $\eta_t$ 大：聚焦高质量 Pareto candidates。

### 5. Locally balanced proposal

每次只更新一个 token 位置 $i$。对候选 token $y$，构造替换后的序列：

$$
x_t^{(i \leftarrow y)}
$$

计算 reward ratio：

$$
r_i(y; x_t) =
\frac{
W_{\eta_t,\omega}(x_t^{(i \leftarrow y)})
}{
W_{\eta_t,\omega}(x_t)
}
$$

然后使用 balancing function $g$，要求：

$$
g(u) = u g(1/u)
$$

论文提到的典型选择包括：

- Barker’s function：
  
$$
g(u) = \frac{u}{1+u}
$$

- Square-root function：
  
$$
g(u) = \sqrt{u}
$$

未归一化 proposal：

$$
\tilde{q}_i(y|x_t) = p_t^i(y|x_t) g(r_i(y;x_t))
$$

归一化后得到：

$$
q_i(y|x_t)
$$

### 6. Metropolis-Hastings acceptance

定义目标分布：

$$
\pi_{\eta_t,\omega}(x) \propto p_1(x) \exp(\eta_t S_\omega(x))
$$

proposal state 为：

$$
x_{\text{prop}} = x_t^{(i \leftarrow y^\star)}
$$

接受概率为：

$$
\alpha_i(x_t, x_{\text{prop}}) =
\min
\left\{
1,
\frac{
\pi_{\eta_t,\omega}(x_{\text{prop}}) q_i(x_t^i | x_{\text{prop}})
}{
\pi_{\eta_t,\omega}(x_t) q_i(y^\star | x_t)
}
\right\}
$$

论文称使用 Barker’s balancing function 时接受概率可简化为 1，从而自动接受 proposal、加速 mixing。

## 算法流程

根据论文 Algorithm 1，AReUReDi 的流程如下：

1. 输入：
   - 预训练 ReDi 模型 $p_t^i(\cdot|x_t)$；
   - 归一化目标函数 $\tilde{s}_1, \dots, \tilde{s}_N$；
   - 权重向量 $\omega \in \Delta^{N-1}$；
   - annealing 参数 $\eta_{\min}, \eta_{\max}$。

2. 初始化：
   - 从离散状态空间 $S$ 中初始化序列 $x_0$；
   - 指定或采样权重向量 $\omega$。

3. 对每个采样步骤 $t$：
   - 更新 guidance strength：
     
$$
\eta_t = \eta_{\min} + (\eta_{\max} - \eta_{\min}) \frac{t}{T-1}
$$

   - 随机选择一个 token 位置 $i$；
   - 从 ReDi marginal $p_t^i(\cdot|x_t)$ 得到候选 token 集合；
   - 对每个候选 token $y$：
     - 构造替换序列 $x_t^{(i \leftarrow y)}$；
     - 计算 Tchebycheff scalarized reward；
     - 计算 reward ratio；
     - 用 balancing function 构造 proposal；
   - 从 proposal $q_i(\cdot|x_t)$ 中采样 token $y^\star$；
   - 得到 proposed sequence $x_{\text{prop}}$；
   - 用 Metropolis-Hastings 接受或拒绝；
   - 更新当前序列。

4. 输出最终序列 $x_T$。

论文实验中还加入了一个 practical monotonicity constraint：

- 只接受能提高当前目标加权和的 token update；
- 该约束用于加速收敛；
- 作者说明理论保证严格来说是在无限长 Markov chain 极限下成立，实际采样需要效率增强。

## 实验设置

### 任务一：wild-type peptide binder generation

使用 PepReDi 作为基础生成模型，设计野生型 peptide binders。

优化目标最多包括五个治疗相关性质：

- hemolysis；
- non-fouling；
- solubility；
- half-life；
- binding affinity。

测试目标蛋白包括：

- structured targets with known binders：
  - 3IDJ；
  - 5AZ8；
  - 7JVS；
- structured targets without known binders：
  - AMHR2；
  - OX1R；
  - DUSP12；
- intrinsically disordered targets：
  - EWS::FLI1；
  - MYC。

此外，论文还在 1B8Q 和 PPP5 上与传统 MOO 方法比较。

### 任务二：chemically-modified peptide SMILES generation

使用 SMILESReDi 作为基础生成模型，设计 chemically-modified peptide binder SMILES。

目标包括：

- GLP1；
- TfR；
- NCAM1；
- GLAST；
- AMHR2。

优化目标包括四个性质：

- binding affinity；
- hemolysis；
- solubility；
- non-fouling。

### 基础模型

#### PepReDi

- 基于 ReDi；
- backbone 为 Diffusion Transformer (DiT)；
- 训练数据来自 PepNN、BioLip2、PPIRef；
- 约 15,000 条 peptides；
- 长度范围 6 到 49 amino acids；
- rectification 进行三轮。

论文报告 PepReDi 经过 rectification 后 validation NLL、perplexity 等指标改善。conditional TC 第一轮升高，作者解释可能是 model-generated coupling 带来的 distributional shift；后续 rectification 后下降。

#### SMILESReDi

- 同样基于 ReDi；
- backbone 为 DiT；
- 加入 Rotary Positional Embeddings (RoPE)；
- 使用 time-dependent bond-aware noising schedule；
- 使用与 PepMDLM 相同的训练数据；
- 一轮 rectification 后，sampling validity 从 76.3% 提升到 98.6%（16 steps），32 steps 下达到 100%。

### Baselines

论文比较的 baseline 包括：

- NSGA-III；
- SMS-EMOA；
- SPEA2；
- MOPSO；
- PepTune + DPLM；
- PepMDLM；
- PepDFM；
- 未 rectified 的 PepReDi；
- 固定 guidance strength 设置。

### 评价指标

wild-type peptide binder 任务中报告：

- Hemolysis；
- Non-Fouling；
- Solubility；
- Half-Life；
- Affinity；
- runtime；
- 部分结果使用 AlphaFold3 的 ipTM 和 AutoDock VINA docking score 辅助评估。

SMILES 任务中报告：

- Validity；
- Uniqueness；
- Diversity；
- SNN，Similarity to Nearest Neighbor。

## 主要结果

### 1. PepReDi 和 SMILESReDi 生成质量

PepReDi：

- rectification 后 validation NLL 和 perplexity 降低；
- PepReDi3 的 validation NLL 为 1.3548，validation PPL 为 3.88；
- conditional TC 在多轮 rectification 后总体较 base model 有讨论性变化，具体解释依赖 coupling shift。

SMILESReDi：

- base SMILESReDi validity 为 0.763；
- SMILESReDi1 validity 为 0.986；
- AReUReDi 在 SMILES 生成评价中 validity 和 uniqueness 均为 1.000；
- AReUReDi diversity 为 0.789，SNN 为 0.392；
- 相比 PepTune，AReUReDi 在 diversity 更高、SNN 更低，表示 novelty 和结构多样性更好。

### 2. 多目标 guidance ablation

在 7LUL 的三目标任务中：

- 同时使用 hemolysis、solubility、affinity guidance 时，三项指标较均衡；
- 去掉某个 objective guidance 后，对应性质会明显下降；
- 例如去掉 solubility guidance 后 solubility 降到 0.4013，但 affinity 上升到 6.9798，体现 trade-off。

在 CLK1 的三目标任务中：

- 去掉 non-fouling guidance 后，half-life 可超过 96 h，但 non-fouling 接近 0.29；
- 去掉 half-life guidance 后，non-fouling 可保持较高，但 half-life 低于 2 h；
- 同时使用全部 guidance 能得到更平衡的结果。

这说明 AReUReDi 能按目标设置调整优化方向，并在冲突目标之间做 trade-off。

### 3. 五目标 wild-type peptide binder 设计

对 8 个目标蛋白设计 100 个 binders，论文报告：

- hemolysis：约 0.91–0.94；
- non-fouling：大多 > 0.86；
- solubility：大多 > 0.85；
- half-life：约 42–64 h；
- affinity：约 5.7–7.3。

示例：

- AMHR2，length 16：
  - Hemolysis 0.9420；
  - Non-Fouling 0.8914；
  - Solubility 0.8755；
  - Half-Life 63.34 h；
  - Affinity 7.2533。
- EWS::FLI1，length 16：
  - Hemolysis 0.9416；
  - Non-Fouling 0.8875；
  - Solubility 0.8807；
  - Half-Life 64.32 h；
  - Affinity 6.4195。

### 4. 与传统 MOO 和 diffusion-based 方法比较

在 1B8Q 和 PPP5 上，AReUReDi 与 MOPSO、NSGA-III、SMS-EMOA、SPEA2、PepTune + DPLM 比较。

结果显示：

- AReUReDi runtime 更长；
- 但在 non-fouling、solubility、half-life 上显著更好；
- affinity 不一定最高，但保持 competitive；
- half-life 相比 next-best method 可提升数倍。

例如 1B8Q：

- AReUReDi：
  - Hemolysis 0.9214；
  - Non-Fouling 0.8680；
  - Solubility 0.8654；
  - Half-Life 22.93 h；
  - Affinity 5.7130。
- NSGA-III affinity 更高，为 7.2178，但 half-life 仅 7.32 h，non-fouling 和 solubility 明显更低。

PPP5：

- AReUReDi：
  - Non-Fouling 0.896；
  - Solubility 0.8832；
  - Half-Life 38.28 h；
  - Affinity 6.7186。
- SPEA2 affinity 最高，为 7.6253，但 half-life 仅 2.61 h。

说明 AReUReDi 更偏向整体 Pareto trade-off，而不是单项指标最优。

### 5. chemically-modified peptide SMILES 设计

AReUReDi 用 SMILESReDi1 生成 chemically-modified peptide binders，并在 GLP1、TfR、NCAM1、GLAST、AMHR2 上优化四个目标。

论文报告：

- binding affinity 和 non-fouling 在迭代中稳定提升；
- hemolysis 和 solubility 有波动，反映多目标冲突下的平衡过程；
- 选出的代表 binder 在多个目标上得分较高；
- 由于 PepTune 未报告平均 property scores，无法直接定量比较。

### 6. Rectification ablation

比较：

- PepDFM；
- PepReDi without rectification；
- PepReDi3 with three rounds of rectification。

在 AMHR2 上，PepReDi3 五项指标整体最好，half-life 达 63.34 h，明显优于其他基础模型。

在 5AZ8 上，PepReDi3 half-life 为 58.33 h，优于 PepDFM 和未 rectified PepReDi，同时其他指标保持相近。

结论：rectification 降低 conditional TC、改善 probability path，有助于 AReUReDi 得到更好的 Pareto trade-off。

### 7. Annealed guidance strength ablation

比较固定 $\eta_{\min}=1.0$、固定 $\eta_{\max}=20.0$、固定中间值 10.5，以及 annealed schedule。

在 1DDV 和 P53 上：

- annealed schedule 通常获得更好的综合结果；
- 尤其在 half-life 和 solubility 等困难目标上更优；
- 说明逐步增强 guidance 有利于先探索、后优化。

## 创新点

1. **将 ReDi 扩展到多目标优化**
   - AReUReDi 是论文声称的首个 multi-objective extension of rectified discrete flows。

2. **离散 token 空间中的 Pareto guidance**
   - 不依赖连续嵌入或 latent-space optimization；
   - 直接在 amino acid sequence 或 SMILES token 空间中操作。

3. **结合 Tchebycheff scalarization 与 annealing**
   - 使用 $\min_n \omega_n \tilde{s}_n(x)$ 鼓励目标均衡；
   - 用 annealing schedule 平衡探索与利用。

4. **locally balanced proposal + Metropolis-Hastings**
   - 将 ReDi 生成先验与多目标 reward 结合；
   - 通过 MCMC 形式保持 stationary distribution invariance。

5. **理论保证**
   - 在有限状态空间、有界目标等假设下，给出 invariance、Pareto front convergence 和 coverage guarantee。

6. **应用到多性质生物分子生成**
   - 在 wild-type peptides 和 chemically-modified peptide SMILES 上展示最多五目标优化。

## 局限性

1. **理论保证依赖极限条件**
   - 论文明确指出，Pareto optimality 和 full coverage 的理论保证在实践中只在无限长 Markov chain 极限下严格成立。
   - 实际达到 Pareto front 可能需要大量 sampling steps。

2. **采样成本较高**
   - 在与 MOO baseline 比较中，AReUReDi runtime 明显更长。
   - 例如 1B8Q 上 AReUReDi 平均 550 s，而 PepTune + DPLM 为 2.46 s，传统 MOO 方法通常几十秒以内。

3. **使用 monotonicity constraint 可能影响原始 MCMC 性质**
   - 实验中加入“只接受加权和提高的 token update”来加速收敛。
   - 作者称不改变 underlying optimization objectives，但该约束对理论 stationary distribution 和 MH 细节的影响需要进一步确认。
   - 待补充原文/PDF 后确认该约束与理论保证之间的严格关系。

4. **评价主要是 in silico**
   - 结果依赖预测模型、AlphaFold3 ipTM、AutoDock VINA docking score 等计算评估。
   - 缺少实验验证，如体外 binding assay、hemolysis assay、solubility assay 或 half-life assay。

5. **目标打分模型自身有限**
   - 部分 property predictor 的验证性能并不极高。
   - 例如 hemolysis/non-fouling/solubility XGBoost classifier 的 validation F1 分别约为 0.58、0.71、0.68。
   - half-life 数据集仅 105 条 human-related entries，尽管有 stability pretraining，但泛化仍需谨慎。

6. **适用模态仍有限**
   - 论文讨论未来可扩展到 DNA、RNA、antibodies、combinatorial genotype libraries，但本文实验主要集中于 peptides 和 peptide SMILES。

7. **与部分先进方法无法直接比较**
   - 对 chemically-modified peptide SMILES，PepTune 未报告平均 property scores，因此无法直接定量对比。
   - 与连续空间方法如 ParetoFlow 的直接比较也因数据模态不同而不适合。

## 相关概念

- [[多目标优化]]
- [[多目标分子优化]]
- [[Pareto optimality]]
- [[Pareto front]]
- [[Tchebycheff scalarization]]
- [[离散流模型]]
- [[Discrete Flow Matching]]
- [[Rectified Flow]]
- [[Rectified Discrete Flows]]
- [[conditional total correlation]]
- [[factorization error]]
- [[locally balanced proposals]]
- [[Metropolis-Hastings]]
- [[Markov chain Monte Carlo]]
- [[annealed guidance]]
- [[simulated annealing]]
- [[biomolecular sequence design]]
- [[peptide binder design]]
- [[SMILES generation]]
- [[therapeutic peptide design]]
- [[binding affinity]]
- [[solubility]]
- [[hemolysis]]
- [[half-life]]
- [[non-fouling]]
- [[offline multi-objective optimization]]

## 相关方法

- [[AReUReDi]]
- [[ReDi]]
- [[Rectified Discrete Flows]]
- [[Discrete Flow Matching]]
- [[Rectified Flow]]
- [[Diffusion Transformer]]
- [[Masked Diffusion Language Model]]
- [[PepReDi]]
- [[SMILESReDi]]
- [[PepDFM]]
- [[PepTune]]
- [[DPLM]]
- [[PepMDLM]]
- [[ParetoFlow]]
- [[PGD-MOO]]
- [[NSGA-III]]
- [[SMS-EMOA]]
- [[SPEA2]]
- [[MOPSO]]
- [[Bayesian optimization]]
- [[Multi-objective Bayesian optimization]]
- [[MCMC]]
- [[Metropolis-Hastings]]
- [[Barker proposal]]
- [[AutoDock VINA]]
- [[AlphaFold3]]
- [[ESM-2]]
- [[XGBoost]]
- [[OPTUNA]]

## 相关论文

- Liu et al., 2023, **Flow straight and fast: Learning to generate and transfer data with rectified flow**
  - [[Rectified Flow]] 的连续空间基础。
- Yoo et al., 2025, **ReDi: Rectified Discrete Flow**
  - AReUReDi 的基础离散流模型。
- Campbell et al., 2024, **Generative flows on discrete state-spaces**
  - [[Discrete Flow Matching]] 相关工作。
- Gat et al., 2024, **Discrete Flow Matching**
  - 离散流匹配核心相关方法。
- Yuan et al., 2024, **ParetoFlow: Guided flows in multi-objective optimization**
  - 连续空间 flow matching 的多目标生成方法。
- Tang et al., 2025b, **PepTune: De novo generation of therapeutic peptides with multi-objective-guided discrete diffusion**
  - 本文比较的重要 diffusion-based peptide design baseline。
- Wang et al., 2024, **Diffusion language models are versatile protein learners**
  - [[DPLM]] 相关。
- Miettinen, 1999, **Nonlinear multiobjective optimization**
  - [[Tchebycheff scalarization]] 和多目标优化基础。
- Deb and Jain, 2013, **NSGA-III**
  - 多目标 evolutionary baseline。
- Beume et al., 2007, **SMS-EMOA**
  - hypervolume-based multi-objective evolutionary algorithm。
- Zitzler et al., 2001, **SPEA2**
  - evolutionary multi-objective optimization baseline。
- Coello and Lechuga, 2002, **MOPSO**
  - multi-objective particle swarm optimization baseline。

## 源文件

- citekey：chenAReUReDiAnnealedRectified2025
- title：**AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance**
- authors：Tong Chen, Yinuo Zhang, Pranam Chatterjee
- year：2025
- venue：待补充原文/PDF 后确认
- DOI：10.48550/ARXIV.2510.00352
- arXiv：2510.00352v2
- collections：多目标分子优化
- code/data：论文声明代码可由学术社区访问：
  - https://huggingface.co/ChatterjeeLab/AReUReDi

## 图表摘录

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/page-001.png]]

## Zotero 原始摘要

Designing sequences that satisfy multiple, often conflicting, objectives is a central challenge in therapeutic and biomolecular engineering. Existing generative frameworks largely operate in continuous spaces with single-objective guidance, while discrete approaches lack guarantees for multi-objective Pareto optimality. We introduce AReUReDi (Annealed Rectified Updates for Refining Discrete Flows), a discrete optimization algorithm with theoretical guarantees of convergence to the Pareto front. Building on Rectified Discrete Flows (ReDi), AReUReDi combines Tchebycheff scalarization, locally balanced proposals, and annealed Metropolis-Hastings updates to bias sampling toward Pareto-optimal states while preserving distributional invariance. Applied to peptide and SMILES sequence design, AReUReDi simultaneously optimizes up to five therapeutic properties (including affinity, solubility, hemolysis, half-life, and non-fouling) and outperforms both evolutionary and diffusion-based baselines. These results establish AReUReDi as a powerful, sequence-based framework for multi-property biomolecule generation.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

AReUReDi 可以理解为“用 ReDi 提供可行且生物合理的离散生成 prior，再用多目标 MCMC 在这个 prior 上做 Pareto-biased refinement”。

它不是简单地把多个目标加权求和，而是用 Tchebycheff scalarization 强调瓶颈目标，因此更适合生成“均衡”的 therapeutic peptide candidates。比如一个 peptide 亲和力很高但 solubility 很差，在 Tchebycheff reward 下不会被过度奖励。

方法上最关键的是 proposal 的设计：

- ReDi 负责告诉模型哪些 token 替换在生成分布上合理；
- objective models 负责告诉模型哪些替换在治疗性质上更好；
- locally balanced proposal 把两者结合；
- Metropolis-Hastings 让这个过程有 MCMC 意义。

这篇论文的实际价值在于，它把离散生成模型和多目标优化结合得比较系统，并且应用在 peptide design 这种确实需要 trade-off 的任务中。

不过，我对其实验结论需要保持谨慎：

1. 多数结果依赖 predictor，而 predictor 本身可能有误差。
2. 没有 wet-lab validation，不能直接说明生成 peptide 真实有效。
3. 实验中为了效率加入 monotonicity constraint，这可能让理论上的 MH invariant distribution 与实际实现之间存在差异。
4. AReUReDi 的计算成本较高，是否适合大规模 screening 需要进一步评估。

从知识库角度，这篇论文适合作为以下主题的核心节点：

- 多模态多目标优化：虽然本文不是多模态，但涉及多目标生成，可与多模态分子设计方法关联；
- 多目标分子优化；
- 离散扩散模型与离散流模型；
- MCMC guided generation；
- therapeutic peptide design。

## 后续问题

1. AReUReDi 的 monotonicity constraint 是否破坏原始 Metropolis-Hastings 的 detailed balance？
2. 如果使用不同的 scalarization，例如 weighted sum、hypervolume improvement 或 R2 utility，结果会如何变化？
3. Tchebycheff scalarization 在目标数很多时是否仍稳定？
4. objective weights $\omega$ 如何选择？是否可以根据用户偏好自适应调整？
5. 对每个 Pareto point 的 coverage guarantee 在实际有限步采样中表现如何？
6. AReUReDi 是否可以结合 uncertainty-aware scoring，降低 predictor exploitation 风险？
7. 生成 peptide 的 novelty 与 synthesizability 如何进一步验证？
8. 是否能将该方法扩展到 antibody CDR design、RNA design 或 DNA promoter design？
9. 与 GFlowNet、Multi-objective GFlowNet 相比，AReUReDi 在 coverage 和 sample efficiency 上有什么差异？
10. 如果 ReDi base model 质量较差，AReUReDi 的 Pareto optimization 是否会过度依赖 objective model 而产生不合理序列？
11. 论文中的 half-life predictor 训练数据较少，生成结果是否存在模型偏差？
12. AReUReDi 是否可以与 active learning 或 Bayesian optimization 结合，形成实验反馈闭环？
