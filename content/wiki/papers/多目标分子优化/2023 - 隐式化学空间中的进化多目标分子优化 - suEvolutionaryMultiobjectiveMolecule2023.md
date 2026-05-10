---
type: paper
citekey: "suEvolutionaryMultiobjectiveMolecule2023"
title: "隐式化学空间中的进化多目标分子优化"
chinese_title: "隐式化学空间中的进化多目标分子优化"
authors: "Yansen Su, Xin Xia, Chunhou Zheng, Yiping Liu, Qingwen Wu, Xiangxiang Zeng"
year: "2023"
venue: ""
doi: "10.21203/rs.3.rs-2798803/v1"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "隐式化学空间中的进化多目标分子优化"
  - "Evolutionary multi-objective molecule optimization in implicit chemical space"
original_title: "Evolutionary multi-objective molecule optimization in implicit chemical space"
---
## 一句话总结

`Evolutionary multi-objective molecule optimization in implicit chemical space` 提出 MOMO：在预训练 encoder-decoder 构造的连续隐式化学空间中进行进化搜索，并在分子序列层面用 Pareto dominance-based 多属性评价策略选择候选分子，从而同时优化 QED、PlogP、DRD2、Similarity 等多个分子性质。

## 研究问题

本文关注先导分子优化中的多属性同时优化问题：给定一个 lead molecule，如何高效生成一组既保持与原分子相似、又在多个目标性质上达到要求的优化分子。

传统或已有 AI 分子优化方法常见做法包括：

1. 只优化单个性质，并把相似性作为约束或惩罚项。
2. 将多个性质通过加权求和合并为单目标。
3. 在离散 SMILES 或分子图空间中直接进行强化学习或进化搜索。
4. 在连续 latent space 中进行生成或局部搜索。

这些方法在多属性任务中存在几个问题：

- 加权求和会丢失多目标问题本身的 trade-off 结构。
- 多个性质的权重难以确定，通常需要大量调参。
- 单目标优化倾向于输出单个或相似的最优解，分子多样性不足。
- 离散化学空间中的交叉、变异容易产生无效分子，搜索效率较低。
- 当需要同时优化两个以上性质时，已有方法性能明显下降。

本文试图解决的问题是：如何在不预设多个目标相对权重的情况下，搜索出一组位于 Pareto-front 上、具有不同性质偏好的高质量分子。

## 背景与动机

分子优化是药物发现流程中的关键环节。现实药物设计通常不只关心单一性质，而是需要同时考虑 drug-likeness、活性、合成可行性、ADME、毒性、与先导分子的结构相似性等多个指标。传统实验试错和计算模拟方法成本较高，因此 AI 驱动的分子优化模型受到关注。

已有 AI 分子优化方法大致可分为两类：

- 在离散分子空间中直接修改分子结构，例如对 SMILES 字符串或分子图执行强化学习动作、进化算法交叉/变异。
- 将分子映射到连续 latent space，在连续空间中进行搜索，再解码为分子。

离散空间方法容易受到化学价键约束影响，生成无效分子的概率较高；连续 latent space 方法有助于平滑搜索，但如果目标函数仍采用加权求和，本质上仍然是单目标优化。

本文的动机是把分子优化明确建模为多目标优化问题，并引入 Pareto-based multi-objective evolutionary optimization，使模型能够输出一组多样化的候选分子，而不是单一加权目标下的一个解。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-02.jpg]]

该图对应论文 Figure 1 的整体说明，比较了“多目标问题退化为单目标优化”和“Pareto-based multi-objective optimization”的差异。前者通常只沿着一个合成目标方向搜索，后者则通过种群逐步逼近 Pareto-front，获得多个具有不同权衡偏好的解。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-03.jpg]]

该子图展示了将多属性优化压缩为单目标优化时的搜索方式。论文强调，这类方式可能只能得到原多目标问题最优解集合中的一个局部代表，难以覆盖不同偏好的候选分子。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-04.jpg]]

该子图展示 Pareto-based multi-objective optimization 的思想：种群在目标空间中从先导分子出发，逐步逼近 Pareto-front。该思路更适合发现一组在多个目标之间具有不同 trade-off 的优化分子。

## 核心思想

MOMO 的核心思想可以概括为：

1. 用预训练 codec 构造隐式化学空间  
   使用预训练 encoder-decoder 将离散分子映射为连续 latent vector，并能从 latent vector 解码回分子。本文实验中采用预训练 `cddd` model 构造隐式化学空间。

2. 在连续 latent space 中执行进化操作  
   个体是分子的 latent vector。MOMO 在 latent vector 上执行 selection、crossover、mutation，以避免直接在离散 SMILES 或图结构上操作带来的无效分子问题。

3. 在分子序列层面进行属性评价  
   虽然进化发生在 latent space，但属性和相似性评价在解码后的分子空间中进行。论文使用 RDKit、pyTDC、ADMETlab 等 property evaluators，具体任务中涉及 QED、PlogP、DRD2、Similarity。

4. 用 Pareto dominance-based evaluation strategy 更新种群  
   MOMO 不把多个目标加权合并，而是将每个性质和相似性作为单独目标，通过 non-domination rank、reference point mechanism 和 dynamic acceptance probability 选择下一代种群。

5. 输出最终种群中的 Pareto-front molecules  
   最后一代种群中位于 Pareto-front 的分子作为优化结果，因此结果天然是一组具有不同性质偏好的候选分子。

## 方法框架

MOMO 由两个主要部分组成：

- 隐式化学空间中的连续表征学习与进化搜索。
- 分子序列层面的 Pareto dominance-based 多目标评价和种群更新。

整体流程如下：

1. 在大型公开分子数据库上预训练 encoder-decoder。
2. 将 lead molecule 编码为 latent vector。
3. 对 latent vector 添加 Gaussian noise，生成初始种群。
4. 在 latent space 中执行 selection、crossover、mutation，生成 offspring。
5. 合并 parent population 与 offspring population。
6. 将 latent vectors 解码为分子。
7. 使用 property evaluators 计算目标属性与相似性。
8. 根据 non-domination rank、reference point mechanism、dynamic acceptance probability 选择下一代。
9. 重复迭代，最终输出最后一代中的 Pareto-front molecules。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-05.jpg]]

该图对应论文 Figure 2 的整体框架，展示了 MOMO 如何将预训练 codec、初始种群生成、隐式空间进化和分子空间评价结合起来。关键设计是“latent space 中进化，molecular space 中评价”。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-06.jpg]]

该子图展示预训练 encoder-decoder 的作用：将分子映射到连续表示，并支持从 latent vector 解码回分子。该模块为后续连续空间进化提供化学先验。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-07.jpg]]

该子图展示初始种群生成方式：对输入 lead molecule 的 latent vector 添加 Gaussian noise。这样得到的一组 latent vectors 作为第一代种群个体。

## 算法流程

### 1. 构造隐式化学空间

给定分子 `x`，encoder 将其映射到 latent vector：

$$
z = E(x)
$$

decoder 将 latent vector 解码回分子：

$$
x' = D(z)
$$

论文指出 MOMO 原则上可兼容不同分子表示和 codec 结构，例如字符串或图表示；本文实验中使用预训练 `cddd` model。

### 2. 多目标优化定义

MOMO 将分子优化建模为：

$$
max_x [f_1(x), f_2(x), \dots, f_m(x), f_{m+1}(x, x_0)]
$$

其中：

- $f_1, \dots, f_m$：多个分子性质评价函数。
- $f_{m+1}$：优化分子与 lead molecule $x_0$ 的相似性函数。
- $\Omega$：latent space。
- 目标是在多个目标上搜索 Pareto solutions。

相似性使用 Morgan fingerprints 上的 Tanimoto similarity：

$$
Sim(x,y)=\frac{fp(x)\cdot fp(y)}{|fp(x)|^2+|fp(y)|^2-fp(x)\cdot fp(y)}
$$

### 3. 进化操作

MOMO 在 latent vectors 上执行进化操作。

**Selection**  
使用 binary tournament selection，从当前种群中反复随机抽取两个个体，选择 fitness 更高者进入 evolve population。

**Crossover**  
使用 blending linear crossover operator。对两个个体 $z_1, z_2$：

$$
z_1'=z_1+c_1(z_2-z_1)
$$

$$
z_2'=z_1+c_2(z_2-z_1)
$$

其中：

$$
c_1=-d+(1+2d)u_1
$$

$$
c_2=-d+(1+2d)u_2
$$

$u_1,u_2 \sim Uniform[0,1]$，$d\geq 0$ 控制插值或外推范围。实验中 $d=0.25$。

**Mutation**  
交叉产生的个体以 $p_m=0.5$ 的概率变异。若发生变异，则随机选择 latent vector 的一个维度，将其替换为从标准高斯分布采样的值。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-08.jpg]]

该子图展示 MOMO 的 molecule evolution 机制：在隐式化学空间中对 latent vectors 执行 selection、crossover、mutation。通过连续表征交换和扰动信息，模型可以更平滑地探索化学空间。

### 4. Pareto dominance-based evaluation strategy

MOMO 在解码后的分子序列层面进行多目标评价，核心包括：

#### Non-domination rank

若解 $z_1$ 在所有目标上不差于 $z_2$，且至少一个目标优于 $z_2$，则 $z_1$ dominates $z_2$。不被其他解支配的解称为 Pareto solution，所有 Pareto solutions 组成 Pareto-front。

种群中的所有个体可按非支配关系划分为多个 rank：

$$
F = \{F_1, F_2, \dots\}
$$

其中 $F_1$ 是最高等级的非支配前沿。

#### Reference point mechanism

为了保持种群多样性，MOMO 引入 reference point mechanism：

1. 使用 Das and Dennis 的方法在超平面上生成结构化 reference points。
2. 对种群个体的目标值进行自适应归一化。
3. 构造 ideal point，并将个体关联到最近的 reference line。
4. 根据 reference point 的 niche count 选择个体。与稀疏 reference point 关联的个体优先被保留。

该机制有助于避免 Pareto-front 上候选分子集中在少数区域。

#### Dynamic acceptance probability

MOMO 还设计了动态接受概率：

$$
p_a=e^{-\frac{1}{t}\times \beta}
$$

其中：

- $t$：当前进化 epoch。
- $\beta$：控制增长速度，实验中设置为 0.3。

论文解释：早期阶段让低目标值分子也有机会进入下一代，以强调多样性；随着迭代推进，接受概率提高，搜索逐渐更偏向高目标值和高相似性的分子。

## 实验设置

论文在三个多属性分子优化任务上评估 MOMO。

### Task 1：QED and Similarity

目标：

- QED $\geq 0.9$
- Similarity $\geq 0.4$

数据：

- 800 个 QED $\in [0.7, 0.8]$ 的分子。
- 来源：Jin et al.，从 ZINC test 中选取。

评价指标：

- Success Rate，满足 QED 和 Similarity 阈值的优化分子比例。

MOMO 参数：

- Population size $P=100$
- Iterations $T=100$
- $d=0.25$
- $p_c=1$
- $p_m=0.5$
- 使用 10 次 initial population restarts，报告最佳结果。

### Task 2：PlogP and Similarity

目标：

- 最大化 PlogP improvement，即 PlogP_imp。
- Similarity threshold $\delta=0.4$ 或 $\delta=0.6$。

数据：

- 800 个低 PlogP 分子。
- 来源：Jin et al.

MOMO 参数：

- $P=100$
- $T=200$
- $d=0.25$
- $p_c=1$
- $p_m=0.5$

### Task 3：QED, DRD2 and Similarity

目标：

- QED $\geq 0.8$
- Drd2 $\geq 0.4$
- Similarity $\geq 0.3$

数据：

- 780 个分子。
- 条件：Drd2 < 0.05 且 QED $\in [0.7, 0.8]$。
- 来源：论文称来自 published article [31]，但正文不同位置对任务设计引用 [35]，需待补充原文/PDF 后确认引用对应关系。

MOMO 参数：

- 不使用 restarts，以公平比较计算成本。
- $P=100$
- $T=200$
- $d=0.25$
- $p_c=1$
- $p_m=0.5$

### Baselines

Task 1 和 Task 2 对比：

- `JTVAE`
- `VSeqtoSeq`
- `VJTNN`
- `QMO`
- `GCPN`
- `GA`

Task 3 对比：

- `IPCA`
- `GA`
- `MSO`
- `QMO`

论文说明，Task 3 中部分方法难以直接扩展到多目标或重训困难，因此选择上述四个 baseline。

## 主要结果

### Task 1：QED + Similarity

论文报告：

- `QMO` 和 `MOMO` 的 success rate 均超过 90%。
- `MOMO` 比 `QMO` 高 1.91%。
- `MOMO` 相比 `QMO` 能生成性质更高、相似性更好且更具多样性的优化分子。

论文认为原因在于：

- 二者都在 latent space 中搜索，因此比部分离散结构优化方法更强。
- `MOMO` 使用种群进化和 Pareto-based selection，而不是加权和目标，因此能覆盖更多不同偏好的解。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-09.jpg]]

该图对应论文 Figure 3 的实验结果总览，覆盖 Task 1、Task 2 和 Task 3。整体结论是 MOMO 在三类多属性优化任务中优于主要 baseline，尤其在需要同时优化多个性质时优势更明显。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-10.jpg]]

该子图展示 Task 1 中 MOMO 与 baseline 的 success rate 对比。论文指出 MOMO 和 QMO 均超过 90%，但 MOMO 仍进一步超过 QMO。

### Task 2：PlogP + Similarity

论文报告：

- 当 $\delta=0.4$ 时，`MOMO` 的平均 PlogP_imp 为 9.61。
- 在该阈值下，MOMO 至少比所有 baseline 高 1.91。
- MOMO 的 PlogP_imp 标准差低于 QMO，说明稳定性更好。
- 当 $\delta=0.6$ 时，MOMO 仍优于 baselines，表明其对不同相似性阈值具有鲁棒性。

论文还观察到：QMO 中有一个优化分子在 PlogP_imp 上更高，但主要由大量碳原子组成，结构多样性不足，因此论文认为其意义有限。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-11.jpg]]

该子图展示 Task 1 中 MOMO 与 QMO 优化分子的性质分布。MOMO 的点云覆盖了更高 QED 和更高 Similarity 的区域，体现了 Pareto-based selection 对多样性和质量的帮助。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-12.jpg]]

该子图展示 Task 2 中不同 Tanimoto similarity constraint 下的 PlogP improvement。论文报告 MOMO 在 $\delta=0.4$ 和 $\delta=0.6$ 下均优于 baseline。

### Task 3：QED + DRD2 + Similarity

论文报告：

- MOMO 的 optimized success rate 为 75.93%。
- 至少比 baseline 高 29.9%。
- MOMO 在三个目标的平均属性值上均优于 baseline。
- 该结果说明，当需要同时优化相似性以外的多个性质时，单目标合并方法明显不足。

论文认为 Task 3 更接近实际药物设计，因为加入了 bioactivity optimization，即 DRD2。

![[raw/zotero/images/多目标分子优化/2023 - 隐式化学空间中的进化多目标分子优化 - suEvolutionaryMultiobjectiveMolecule2023/mineru-figure-13.jpg]]

该子图展示 Task 2 中 MOMO 与 QMO 在 Similarity threshold 为 0.4 时的优化分布。MOMO 能在保持较高 Similarity 的同时获得较高 PlogP_imp，说明把 Similarity 作为独立目标比只作为阈值或惩罚项更有利于发现优质分子。

### Case Study：搜索能力与进化轨迹

正文摘取中提到 Figure 4 和 Figure 5，但“可用图表”列表未提供对应图片路径，当前无法嵌入；待补充原文/PDF 或图片抽取结果后确认。

论文对 Figure 4 的描述：

- 以 Task 1 中一个分子为例。
- lead molecule 用五角星表示。
- 不同颜色点表示 MOMO 在不同世代生成的分子。
- 红点表示最终 Pareto-front 上的优化分子。
- MOMO 能沿多个方向搜索，并最终找到偏向高 Similarity、高 QED 或二者平衡的分子。

论文对 Figure 5 的描述：

- 展示一个分子在 Task 1 中的三条进化轨迹。
- 三行分别对应三个不同 progenitors 从 lead molecule 走向 Pareto-front。
- 阴影区域显示相对于原分子的结构修改区域。
- 结果显示 latent space 中的分子演化比直接结构修改更平滑、更可控。

## 创新点

1. 明确把 molecule optimization 建模为多目标优化问题  
   本文没有将 QED、PlogP、DRD2、Similarity 简单加权合并，而是将它们作为独立目标进行 Pareto-based optimization。

2. 提出 MOMO framework  
   MOMO 结合了隐式化学空间中的连续进化搜索与分子空间中的属性评价，兼顾搜索效率和评价准确性。

3. 设计 Pareto dominance-based multi-property evaluation strategy  
   该策略结合 non-domination rank、reference point mechanism 和 dynamic acceptance probability，使模型能发现具有不同目标偏好的多样化分子集合。

4. 在 latent space 中执行进化操作  
   相比直接对 SMILES 或分子图进行交叉、变异，latent vector 上的进化更平滑，可能减少无效分子产生。

5. 在三个多属性 benchmark tasks 上显示优势  
   尤其是 Task 3 中同时优化 QED、DRD2、Similarity，MOMO 的 SR 达到 75.93%，至少比 baseline 高 29.9%。

## 局限性

论文明确承认以下局限：

1. 编码和解码耗时  
   MOMO 每一代需要将分子编码到 latent space，再将 latent vectors 解码回 molecular space 进行评价。该过程会带来计算成本。

2. 更大规模多目标优化仍待验证  
   现实药物开发通常需要四个或更多目标。本文主要实验覆盖两个或三个目标，四个以上目标的表现仍待补充原文/PDF 后确认。

3. 需要更好结合 latent-space property predictor  
   论文建议未来可将 latent space agent property prediction model 与 molecular space property evaluator 结合，以减少编码/解码时间，同时保持评价准确性。

4. 分布性与多样性机制仍可加强  
   论文提出未来可在分子演化中进一步引入 distributivity 和 diversity 设计，以提升优化性能。

5. 数据集和任务规模有限  
   三个任务分别使用 800、800、780 个 lead molecules，是否能泛化到更大规模、更多疾病靶点、更复杂 ADMET 场景，待补充实验确认。

## 相关概念

- [[分子优化]]
- [[多目标优化]]
- [[隐式化学空间]]
- [[Pareto Front]]
- [[Pareto Dominance]]
- [[Tanimoto Similarity]]
- [[Morgan Fingerprint]]
- [[QED]]
- [[PlogP]]
- [[DRD2]]
## 相关方法

- [[MOMO]]
- [[Multi-objective Evolutionary Algorithm]]
- [[Binary Tournament Selection]]
- [[Reference Point Mechanism]]
- [[非支配排序]]
- [[遗传算法]]
## 相关数据集

- [[ZINC]]
## 相关模型

- [[cddd]]
## 相关论文

- [[Junction Tree Variational Autoencoder for Molecular Graph Generation]]
- [[Learning Multimodal Graph-to-Graph Translation for Molecule Optimization]]
- [[Efficient Multi-objective Molecular Optimization in a Continuous Latent Space]]
- [[Optimizing Molecules Using Efficient Queries from Property Evaluations]]
- [[Graph Convolutional Policy Network for Goal-Directed Molecular Graph Generation]]
- [[A Fast and Elitist Multiobjective Genetic Algorithm NSGA-II]]

## 源文件

- Zotero citekey：`suEvolutionaryMultiobjectiveMolecule2023`
- 标题：`Evolutionary multi-objective molecule optimization in implicit chemical space`
- 作者：Yansen Su, Xin Xia, Chunhou Zheng, Yiping Liu, Qingwen Wu, Xiangxiang Zeng
- 年份：2023
- DOI：10.21203/rs.3.rs-2798803/v1
- 正文来源：MinerU full.md
- Zotero collections：多目标分子优化
- Posted Date：April 21st, 2023
- License：Creative Commons Attribution 4.0 International License
- Competing Interest：There is NO Competing Interest.

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

- https://github.com/ahu-bioinf-lab/MOMO-master
- http://arxiv.org/abs/2206.12411
- https://orcid.org/0000-0003-1081-7658
- https://doi.org/10.21203/rs.3.rs-2798803/v1
- https://doi.org/10.26434/chemrxiv.5309668.v3

## Zotero 原始摘要

Optimization techniques play a pivotal role in advancing molecular optimization, prompting the development of numerous generative methods tailored to e ciently design optimized molecules derived from existing lead compounds. However, these methodologies often encounter di culties in generating diverse, novel, and high-quality molecules when addressing multi-property tasks. Consequently, e ciently searching for diverse optimized candidates that simultaneously satisfy multiple properties remains a signi cant challenge in molecule optimization. To address this problem, we propose a multi-objective molecule optimization framework (MOMO). MOMO employs a specially designed Pareto dominancebased multi-property evaluation strategy at the molecular sequence level, speci cally designed to guide the evolutionary search in a latent molecular space to optimize multiple molecular properties. A comparative analysis of MOMO with extant state-of-the-art baselines across three multi-property molecule optimization tasks reveals that MOMO markedly outperforms them all. These results suggest the e cacy of the proposed MOMO framework for simultaneous optimization of multiple properties in molecule optimization.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值不只是“又做了一个分子优化模型”，而是把多属性分子优化的目标形式从加权单目标切换到了 Pareto 多目标。对于药物设计来说，这一点很重要，因为现实中不同性质之间经常冲突，例如提高活性可能降低相似性、提高 logP 可能影响 drug-likeness。用一个固定权重把这些目标压成单个分数，往往会掩盖这些冲突。

MOMO 的设计有一个清晰分工：搜索在 latent space 中进行，评价在 molecular space 中进行。前者让进化操作更连续、更平滑；后者避免直接在 latent space 中用不可靠代理指标评价分子性质。这个设计虽然带来编码/解码成本，但能兼顾可搜索性和评价准确性。

本文最有说服力的部分是 Task 3。因为 Task 1 和 Task 2 仍然可以被看作“一个主属性 + Similarity”的优化，很多方法都可以用相似性约束处理；而 Task 3 同时包含 QED、DRD2、Similarity，更能体现多目标优化的必要性。MOMO 在 Task 3 中明显优于 baseline，说明 Pareto-based selection 对多属性任务确实有帮助。

不过，从当前解析文本看，实验仍然集中在相对小规模 benchmark 上，且目标最多为三个。对于真实药物优化中的 ADMET、多靶点选择性、毒性、合成可行性等更复杂目标，MOMO 是否仍能保持优势，需要进一步实验验证。

## 后续问题

1. MOMO 在四个或更多目标上是否会受到 Pareto dominance 退化问题影响？
2. Reference point mechanism 的具体实现是否接近 NSGA-III？论文是否有完整伪代码？待补充原文/PDF 后确认。
3. `cddd` model 的预训练数据、latent dimension、解码有效率是多少？当前解析文本未给出完整细节。
4. MOMO 每个 lead molecule 的平均优化时间是多少？编码/解码成本在整体运行时间中占比多少？
5. Task 3 数据来源在正文中似乎存在 [31] 与 [35] 引用不一致，需要核对原文。
6. MOMO 生成分子的 novelty、diversity、synthetic accessibility 是否有系统评估？当前摘取文本中未看到完整结果。
7. 如果使用更强的 property predictor 或 docking score 作为目标，MOMO 的稳定性如何？
8. 动态接受概率 $p_a=e^{-\frac{1}{t}\times\beta}$ 的设计是否经过消融实验验证？当前摘取文本未见 ablation，待补充原文/PDF 后确认。
