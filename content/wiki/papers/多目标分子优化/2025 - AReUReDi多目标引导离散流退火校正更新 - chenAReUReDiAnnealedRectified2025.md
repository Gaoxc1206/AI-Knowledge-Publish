---
type: paper
citekey: "chenAReUReDiAnnealedRectified2025"
title: "AReUReDi多目标引导离散流退火校正更新"
chinese_title: "AReUReDi多目标引导离散流退火校正更新"
authors: "Tong Chen, Yinuo Zhang, Pranam Chatterjee"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2510.00352"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "AReUReDi多目标引导离散流退火校正更新"
  - "AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance"
original_title: "AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance"
---
## 一句话总结

AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance 提出了一种基于 Rectified Discrete Flows 的离散序列多目标优化采样算法，通过 Tchebycheff scalarization、locally balanced proposals 与 annealed Metropolis-Hastings updates，将肽序列和 peptide SMILES 生成引导到多属性 Pareto front，并在体外预测指标上优于多种进化算法和扩散式基线。

## 研究问题

这篇论文关注的问题是：如何在离散生物分子序列空间中生成同时满足多个、且往往相互冲突的属性目标的候选分子。

具体到本文任务，作者主要研究：

1. 如何在氨基酸序列和 peptide SMILES 这类离散 token 空间中做多目标引导生成。
2. 如何在保持离散流生成模型分布性质的同时，将采样偏向 Pareto-optimal states。
3. 如何同时优化 therapeutic peptide design 中的多个属性，例如 binding affinity、solubility、hemolysis、half-life、non-fouling。
4. 如何让离散生成模型不仅产生有效序列，还能在多目标 trade-off 上优于传统 MOO 算法和 diffusion-based baseline。

## 背景与动机

生物分子设计天然是多目标优化问题。治疗性肽需要高 binding affinity、低 toxicity、良好 solubility 和 pharmacokinetics；CRISPR guide RNA 需要高 on-target activity 和低 off-target effect；synthetic promoter 需要高表达且组织特异。单目标优化容易导致不良 trade-off，例如高亲和力肽可能变得不溶或具有溶血性。

传统黑盒多目标优化方法，如 NSGA-III、SMS-EMOA、SPEA2、MOPSO 等，在分子设计中已有应用，但在高维离散序列空间中扩展性有限。近期的生成式方法如 ParetoFlow 能在连续空间中做 Pareto-guided generation，但生物序列本身是离散 token 结构，映射到连续空间可能破坏 token-level 结构，也使属性引导变得复杂。

Discrete Flow Matching 和 Rectified Discrete Flow 为离散序列建模提供了更直接的路径。ReDi 通过 rectification 降低 conditional total correlation，从而改善少步采样下的离散生成质量。但 ReDi 本身没有多目标 Pareto 引导机制。AReUReDi 的动机就是在 ReDi 的离散流基础上加入有理论保证的多目标引导采样。

## 核心思想

AReUReDi 的核心思想是：以预训练的 ReDi 模型作为离散生成 prior，在每一步只修改一个序列位置，用多目标属性函数对候选 token 变异进行评分，再通过 Tchebycheff scalarization 构造偏向均衡多目标改进的 reward，并用 locally balanced proposal 和 Metropolis-Hastings update 保证目标分布不变性与 Pareto front 收敛性质。

本文把目标分布定义为：

$$
\pi_{\eta_t,\omega}(x) \propto p_1(x)\exp(\eta_t S_\omega(x))
$$

其中 $p_1(x)$ 来自 ReDi 生成模型，$S_\omega(x)$ 是 Tchebycheff scalarized reward：

$$
S_\omega(x)=\min_{1\leq n\leq N}\omega_n\tilde{s}_n(x)
$$

这种 scalarization 偏好“所有目标都不差”的样本，而不是只在某一个目标上很强的样本。退火参数 $\eta_t$ 从小到大增加，使早期采样更探索，后期更集中于高质量 Pareto candidates。

## 方法框架

AReUReDi 的方法框架由四部分组成：

1. 预训练 Rectified Discrete Flow  
   作者先训练 PepReDi 或 SMILESReDi，用作无条件离散序列生成器。ReDi 的 rectification 降低 factorization error，使其能提供更可靠的 token-level transition probabilities。

2. 多目标属性评分  
   给定多个 objective functions，例如 hemolysis、non-fouling、solubility、half-life、binding affinity，将它们归一化到 $[0,1]$ 后参与优化。

3. Annealed Tchebycheff scalarization  
   用权重向量 $\omega$ 平衡多个目标，并通过 $\min_n \omega_n\tilde{s}_n(x)$ 鼓励多目标均衡改进。guidance strength $\eta_t$ 随迭代逐步增大。

4. Locally balanced proposal + Metropolis-Hastings update  
   每一步选择一个位置，基于 ReDi 的候选 token 概率和属性 reward ratio 构造 proposal，再用 MH 接受率保证目标分布不变性。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-01.jpg]]

图 1 展示了 AReUReDi 的整体流程：先用 discrete flow matching 和 rectification 得到低 conditional total correlation 的离散流模型，再在每个时间步对单点突变候选进行多目标评分，并通过 Tchebycheff scalarization、退火引导和 MH 更新将序列推向 Pareto front。

## 算法流程

AReUReDi 的采样流程可以概括为：

1. 初始化序列 $x_0$。  
   对 wild-type peptide binder generation，使用 PepReDi 作为基础生成模型；对 chemically-modified peptide SMILES，初始序列来自 SMILESReDi 生成样本。

2. 在第 $t$ 步设置退火引导强度：

$$
\eta_t=\eta_{\min}+(\eta_{\max}-\eta_{\min})\frac{t}{T-1}
$$

3. 随机或按设定选择一个位置 $i$。

4. 从 ReDi marginal transition probability $p_t^i(\cdot|x_t)$ 中得到候选 token。  
   对 peptide SMILES，由于 vocabulary size 为 586，作者只评估 top 200 candidate tokens；对 wild-type peptide，则评估所有可能 token transitions。

5. 对每个候选 token $y$，构造替换后的序列 $x_t^{(i\leftarrow y)}$，计算 reward ratio：

$$
r_i(y;x_t)=\frac{W_{\eta_t,\omega}(x_t^{(i\leftarrow y)})}{W_{\eta_t,\omega}(x_t)}
$$

其中：

$$
W_{\eta_t,\omega}(x)=\exp(\eta_t S_\omega(x))
$$

6. 用 balancing function $g$ 修正 proposal：

$$
\tilde{q}_i(y|x_t)=p_t^i(y|x_t)g(r_i(y;x_t))
$$

其中 $g$ 满足 $g(u)=u g(1/u)$。论文提到 Barker's function $g(u)=u/(1+u)$ 和 square-root function $g(u)=\sqrt{u}$。

7. 从归一化后的 $q_i(y|x_t)$ 中采样候选 token，得到 proposed state。

8. 使用 Metropolis-Hastings acceptance probability 接受或拒绝：

$$
\alpha_i(x_t,x_{\mathrm{prop}})=
\min\left\{
1,
\frac{
\pi_{\eta_t,\omega}(x_{\mathrm{prop}})q_i(x_t^i|x_{\mathrm{prop}})
}{
\pi_{\eta_t,\omega}(x_t)q_i(y^\star|x_t)
}
\right\}
$$

9. 重复 $T$ 步，输出最终序列。

实践中，作者为了加速收敛，在所有实验中加入 monotonicity constraint：只接受会增加当前 objective scores 加权和的 token updates。作者明确指出理论 Pareto guarantee 是无限长 Markov chain 的极限性质，实际采样需要额外效率策略。

## 实验设置

论文构建了两个 benchmark，因为作者称当前没有公开的 biological sequence multi-objective optimization benchmark。

### 任务 1：wild-type peptide binder generation

- 基础生成模型：PepReDi。
- 训练数据：约 15,000 条 peptide sequences，来自 PepNN、BioLip2 和 PPIRef。
- 序列长度：6 到 49 个 amino acids。
- 模型 backbone：Diffusion Transformer，基于 MDLM paradigm。
- tokenizer：ESM-2-650M tokenizer。
- rectification：生成每个长度 10,000 条新序列作为 coupling，迭代 rectification 3 次。
- 目标属性：hemolysis、non-fouling、solubility、half-life、binding affinity。
- wild-type sampling steps：20 × binder length。
- objective weights：所有 wild-type peptide binder generation task 中各目标权重相同。

### 任务 2：chemically-modified peptide SMILES generation

- 基础生成模型：SMILESReDi。
- 训练数据：与 PepMDLM 相同，具体数据集细节需待补充原文/PDF 后确认。
- backbone：与 PepReDi 类似，但加入 Rotary Positional Embeddings。
- tokenizer：PeptideCLM-23M tokenizer。
- 额外机制：time-dependent bond-aware noising schedule，用于保护 peptide backbone tokens。
- rectification：生成长度 4 到 1035 的 peptide SMILES，每个长度 100 条，进行一轮 rectification。
- 目标属性：binding affinity、hemolysis、solubility、non-fouling。
- sampling steps：128。
- candidate tokens：每步只评估 top 200。
- objective weights：binding affinity 权重 0.7，其余三个属性各 0.1。
- 额外约束：拒绝会让 SMILES sequence 变成 invalid peptide 的 transition。

### 属性评分模型

wild-type peptide 的评分模型包括：

- hemolysis、non-fouling、solubility：基于 mean-pooled ESM-2-650M embedding 的 XGBoost logistic regression classifier。
- binding affinity：使用 unpooled reciprocal attention transformer，输入为 ESM-2 token-level embeddings。
- half-life：先在 stability dataset 上预训练三层 MLP，再在 half-life dataset 上 fine-tune。

评分模型验证结果：

- hemolysis / non-fouling / solubility F1：0.58、0.71、0.68。
- binding affinity validation Spearman correlation：0.64。
- half-life fine-tuned model validation Spearman correlation：0.8581，$R^2=0.5977$。

这些指标说明评分器有一定预测能力，但也提示最终结果主要是 in silico 预测，实验验证仍待补充。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-03.jpg]]

该图对应 SMILESReDi 和 peptide SMILES 生成实验附近的图像内容，原文上下文强调 SMILESReDi 在较少训练 epoch 和有限 generation steps 下获得较高 validity，并在 rectification 后显著提高 peptide SMILES 的有效性。具体图内子面板含义需要待补充原文/PDF 后确认。

## 主要结果

### 1. PepReDi rectification 改善基础生成质量

PepReDi 经过三轮 rectification 后，训练和验证指标改善明显：

- Val NLL：从 1.6458 降至 1.3548。
- Val PPL：从 5.19 降至 3.88。
- Conditional TC：base 为 10.6027，第一轮升至 12.6250，第三轮降至 11.2339。

作者解释第一轮 rectification 后 conditional TC 上升可能来自模型生成 coupling 的分布转移；ReDi 的单调下降保证是在每个 coupling 内部成立，而不是跨不同生成 coupling 的绝对 TC 一定下降。

### 2. SMILESReDi 显著提高 peptide SMILES validity

SMILESReDi 在 16 generation steps 下 validity 为 76.3%；一轮 rectification 后，16 steps validity 提升到 98.6%，32 steps 达到 100%。在 Table 2 中，AReUReDi 生成的 SMILES 在 validity、uniqueness 上为 1.000，diversity 为 0.789，SNN 为 0.392，相比 PepTune diversity 更高、SNN 更低。

### 3. Ablation 显示多目标 guidance 能避免单属性 collapse

在 PDB 7LUL 任务中，使用 hemolysis、solubility、affinity 三目标 guidance。移除任一目标会导致对应属性下降，例如去掉 solubility guidance 后 solubility 从 0.9398 降到 0.4013。

在 CLK1 任务中，使用 non-fouling、half-life、affinity 三目标 guidance。去掉 non-fouling guidance 后 half-life 可超过 96 h，但 non-fouling 接近 0.29；去掉 half-life guidance 后 non-fouling 保持较高，但 half-life 降到约 1.33 h。这说明这些目标之间确实存在 trade-off，AReUReDi 的多目标引导能更均衡地处理冲突。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-04.jpg]]

该图位于“目标 trade-off 平衡能力”实验上下文中，用于支持去除某些 guidance 会造成相应属性 collapse 的结论。当前解析文本未提供该图片内部各子图的精确标题，需待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-05.jpg]]

该图同样对应 AReUReDi 多目标 guidance ablation 相关实验，帮助观察不同 guidance 设置下属性分数的变化。由于 MinerU 提取中多个图像共享 Figure 2 图注，具体子面板语义需待补充原文/PDF 后确认。

### 4. 五属性 wild-type peptide binder design

AReUReDi 被用于 8 个蛋白目标，每个目标生成 100 条 binders，覆盖：

- 有已知 binder 的 structured targets：3IDJ、5AZ8、7JVS。
- 无已知 binder 的 structured targets：AMHR2、OX1R、DUSP12。
- intrinsically disordered targets：EWS::FLI1、MYC。

整体结果显示：

- hemolysis scores：约 0.91–0.94。
- non-fouling：大多高于 0.86。
- solubility：大多高于 0.85。
- half-life：约 42–64 h。
- affinity：约 5.7–7.3。

作者还用 AlphaFold3 计算 ipTM，用 AutoDock VINA 计算 docking score，以支持设计 binder 的结合潜力。但这些仍属于计算验证，是否真实结合需要实验确认。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-02.jpg]]

该图展示了 AReUReDi-designed binders 与目标蛋白复合物结构示例，包括 PDB 1B8Q、OX1R、EWS::FLI1 等，并同时显示五个属性分数、AlphaFold3 ipTM 和 AutoDock VINA docking score。它用于说明 AReUReDi 不仅提高预测属性，也能产生在结构预测和 docking 中看似合理的 binder candidates。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-06.jpg]]

该图属于 Figure 2 的后续子图或拆分图像，原图注描述其包含 EWS::FLI1 binder 设计过程中的五属性均值随 iteration 的变化，以及 guided peptides 与 PepReDi 无条件生成 peptides 的属性分布对比。它支持 AReUReDi 能把生成分布推向更高 binding affinity 和更均衡多属性区域。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-07.jpg]]

该图也来自 Figure 2 的拆分结果，重点服务于 wild-type peptide binder generation 的结构和属性可视化。由于当前解析未区分各拆分图的具体面板，精确对应关系待补充原文/PDF 后确认。

![[raw/zotero/images/多目标分子优化/2025 - AReUReDi多目标引导离散流退火校正更新 - chenAReUReDiAnnealedRectified2025/mineru-figure-08.jpg]]

该图继续展示 Figure 2 中的结构或属性分布相关内容，用于说明 AReUReDi 在 EWS::FLI1 等目标上的多属性优化趋势。当前可用图注截断，具体子图解释待补充原文/PDF 后确认。

### 5. 与传统 MOO 和 PepTune + DPLM 对比

作者在 1B8Q 和 PPP5 两个目标上比较 AReUReDi 与 MOPSO、NSGA-III、SMS-EMOA、SPEA2、PepTune + DPLM。

主要结论：

- AReUReDi runtime 更长：
  - 1B8Q：55 s / binder。
  - PPP5：195 s / binder。
- 但其 trade-off 更均衡：
  - non-fouling 和 solubility 显著高于多数基线。
  - half-life 相比 next-best method 有 3–13 倍提升。
  - affinity 虽不总是最高，但保持竞争性。

在 1B8Q 上，NSGA-III 和 SPEA2 的 affinity 高于 AReUReDi，但 AReUReDi 在 non-fouling、solubility、half-life 上大幅领先。因此其优势更像是“均衡 therapeutic profile”而非单个指标最优。

### 6. Chemically-modified peptide SMILES design

AReUReDi 还用于 GLP1、TfR、NCAM1、GLAST、AMHR2 五个 therapeutic targets 的 chemically-modified peptide binder SMILES 设计。四个优化目标为 binding affinity、hemolysis、solubility、non-fouling。

作者称所有代表性 binders 在四个属性上都有高分；generation 过程中 binding affinity 和 non-fouling 持续上升，hemolysis 与 solubility 有波动，说明算法在多个冲突目标间调整 trade-off。

由于 PepTune 未报告其生成 binders 的平均属性分数，作者没有做直接定量比较。

### 7. Rectification 与 annealed guidance 的消融

Rectification 消融：

- 对 AMHR2，PepReDi 三轮 rectification 后在五个属性上整体最好，half-life 比 next-best 高近 13 h。
- 对 5AZ8，rectified model 显著提升 half-life，同时其他指标相近。

Annealing 消融：

- 固定 $\eta_{\min}$、固定 $\eta_{\max}$、固定 midpoint 都不如 annealed schedule。
- 在 P53 上，annealing 同时取得更高 hemolysis、non-fouling、solubility、half-life、affinity。
- 在 1DDV 上，annealing 明显提高 half-life 和 solubility。

## 创新点

1. 首个面向 multi-objective optimization 的 rectified discrete flow 扩展  
   作者将 ReDi 从无条件离散生成扩展到多目标 Pareto-guided sampling。

2. 将 Tchebycheff scalarization 用于离散生物序列生成  
   通过 $\min_n \omega_n \tilde{s}_n(x)$ 鼓励多目标均衡，而不是简单加权和偏向某一强指标。

3. Annealed guidance strength  
   从弱引导到强引导，兼顾探索和收敛。消融显示退火比固定 guidance strength 更有效。

4. Locally balanced proposal 与 Metropolis-Hastings update 结合  
   在引入属性 reward 的同时保持目标分布不变性，并给出 Pareto convergence 和 coverage 的理论分析。

5. 覆盖 amino acid sequence 和 peptide SMILES 两类离散生物分子表示  
   作者不仅在 wild-type peptide 上验证，还在 chemically-modified peptide SMILES 上展示可扩展性。

## 局限性

1. 结果主要是 in silico prediction  
   论文展示了属性评分模型、AlphaFold3 ipTM 和 AutoDock VINA docking score，但没有湿实验验证。设计 binders 的真实结合能力、稳定性、毒性和体内半衰期仍待实验确认。

2. 理论保证依赖极限条件  
   Pareto convergence 和 full coverage 是在有限状态空间、bounded objectives、无限长 Markov chain、$\eta\to\infty$ 等条件下成立。实际采样中的 mixing rate 和 finite-step behavior 仍是关键问题。

3. 实践中加入 monotonicity constraint  
   作者为加速收敛加入“只接受加权目标和增加的更新”的约束。该约束改善实证性能，但它与原本 MH sampling 的理论不变性之间的关系需要更细致分析；当前文本称“不改变 underlying optimization objectives”，但是否保持原理论分布待补充原文/PDF 后确认。

4. 评分模型误差可能传导到生成结果  
   hemolysis、non-fouling、solubility 分类器 F1 并不很高，binding affinity Spearman 为 0.64。生成器可能 exploit scoring model bias。

5. 运行时间较长  
   AReUReDi 比多种进化基线和 PepTune + DPLM 更慢，尤其 PPP5 上约 195 s / binder。

6. benchmark 自建，外部可比性有限  
   作者指出没有公共 benchmark，因此构建了自己的任务设置。不同论文间的严格横向比较仍有困难。

## 相关概念

- [[多目标优化]]
- [[Pareto Front]]
- [[Rectified Flow]]
- [[Locally Balanced Proposals]]
- [[Metropolis-Hastings]]
- [[可控生成]]
- [[生物序列设计]]
- [[肽结合物设计]]
## 相关方法

- [[AReUReDi]]
- [[Rectified Discrete Flows]]
- [[Discrete Flow Matching]]
- [[Tchebycheff scalarization]]
- [[PepReDi]]
- [[SMILESReDi]]
- [[NSGA-III]]
## 相关数据集

- [[PepNN]]
- [[BioLip2]]
- [[PPIRef]]
## 相关模型

- [[ESM-2]]
- [[AlphaFold3]]
- [[Diffusion Transformer]]
## 相关论文

- [[ReDi Rectified Discrete Flow]]
- [[ParetoFlow]]
- [[PepTune]]
- [[Discrete Flow Matching]]
- [[Flow Straight and Fast]]
- [[Multi-objective Evolutionary Algorithms]]

## 源文件

- citekey：chenAReUReDiAnnealedRectified2025
- title：AReUReDi: Annealed Rectified Updates for Refining Discrete Flows with Multi-Objective Guidance
- authors：Tong Chen, Yinuo Zhang, Pranam Chatterjee
- year：2025
- DOI：10.48550/ARXIV.2510.00352
- collections：多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

- https://huggingface.co/ChatterjeeLab/AReUReDi

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

Designing sequences that satisfy multiple, often conflicting, objectives is a central challenge in therapeutic and biomolecular engineering. Existing generative frameworks largely operate in continuous spaces with single-objective guidance, while discrete approaches lack guarantees for multi-objective Pareto optimality. We introduce AReUReDi (Annealed Rectified Updates for Refining Discrete Flows), a discrete optimization algorithm with theoretical guarantees of convergence to the Pareto front. Building on Rectified Discrete Flows (ReDi), AReUReDi combines Tchebycheff scalarization, locally balanced proposals, and annealed Metropolis-Hastings updates to bias sampling toward Pareto-optimal states while preserving distributional invariance. Applied to peptide and SMILES sequence design, AReUReDi simultaneously optimizes up to five therapeutic properties (including affinity, solubility, hemolysis, half-life, and non-fouling) and outperforms both evolutionary and diffusion-based baselines. These results establish AReUReDi as a powerful, sequence-based framework for multi-property biomolecule generation.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值在于把“离散生成模型”和“多目标 Pareto 优化”用 MCMC 的语言连接起来。ReDi 提供一个比较可靠的离散序列生成 prior，AReUReDi 则在 prior 上加一个由多目标 reward 定义的指数倾斜分布。Tchebycheff scalarization 使算法关注短板目标，locally balanced proposal 让局部突变更容易朝高 reward 方向走，MH update 则负责理论上的分布一致性。

从应用角度看，AReUReDi 很适合治疗性肽设计，因为这类任务不是“亲和力越高越好”这么简单，还要同时顾及溶血性、非特异吸附、溶解度和半衰期。论文的实验也显示，很多 baseline 在 affinity 上可以很强，但 solubility、non-fouling 或 half-life 崩掉；AReUReDi 的优势是更均衡。

不过，当前结果高度依赖预测模型。尤其 half-life 数据只有 105 条，虽然作者用了 stability pretraining，但真实 half-life 预测仍可能不稳定。若未来能结合 active learning、uncertainty-aware scoring 或湿实验反馈，这个框架会更有说服力。

## 后续问题

1. Monotonicity constraint 是否破坏了 Metropolis-Hastings invariant distribution？如果破坏，理论保证在实际实验设置中如何解释？
2. AReUReDi 对 score model calibration 有多敏感？如果某个属性模型过于乐观，是否会被生成器 exploit？
3. Tchebycheff scalarization 中不同 $\omega$ 的采样策略是什么？论文实验中 wild-type 任务使用 equal weights，但 full Pareto front coverage 是否需要系统性采样多个 $\omega$？
4. 对 chemically-modified peptide SMILES，binding affinity 权重设为 0.7、其他属性 0.1 的依据是什么？是否做过权重敏感性分析？
5. 对大型 target，如 PPP5，runtime 已到 195 s / binder。能否通过 surrogate caching、batched proposal evaluation 或 parallel chains 加速？
6. 是否可以将 uncertainty-aware objective model 纳入 $S_\omega(x)$，避免优化到评分模型不确定区域？
7. 真实实验验证中，AReUReDi-designed binders 的 binding affinity、hemolysis、solubility 和 half-life 是否能保持预测优势？
8. 该方法能否直接扩展到 antibody CDR design、RNA guide design 或 DNA regulatory sequence design？不同 alphabet 和约束下 proposal 机制是否需要改写？
