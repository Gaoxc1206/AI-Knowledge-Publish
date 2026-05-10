---
type: paper
citekey: "xiaMoleculeOptimizationMultiobjective"
title: "面向隐式化学空间的多目标进化分子优化方法"
chinese_title: "面向隐式化学空间的多目标进化分子优化方法"
authors: "Xin Xia, Yansen Su, Chunhou Zheng, Xiangxiang Zeng"
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
  - "面向隐式化学空间的多目标进化分子优化方法"
  - "Molecule optimization via multi-objective evolutionary in implicit chemical space"
original_title: "Molecule optimization via multi-objective evolutionary in implicit chemical space"
---
## 一句话总结

这篇论文提出 **MOMO**，将自监督分子编码器构建的连续隐式化学空间与基于 Pareto 的多目标进化搜索结合，用于在保持先导分子相似性的同时优化多个分子性质。

## 研究问题

论文关注的是 **molecule optimization, MO**：给定一个先导分子，生成与其结构相似、但在目标性质上更优的新分子。

具体挑战包括：

1. **多目标冲突**：药物发现通常需要同时考虑 QED、PlogP、DRD2、生物活性、ADME、安全性、相似性等多个目标，这些目标之间可能存在冲突。
2. **相似性约束重要**：许多分子设计方法偏重生成高性质分子，但优化后分子与原始先导分子的相似性可能下降。
3. **标注数据稀缺**：很多性质标签昂贵或难以获得，完全依赖有监督学习会限制方法应用。
4. **离散化学空间搜索低效**：直接在 SMILES 或分子图等离散表示上做强化学习或进化搜索，需要处理化学规则约束，搜索效率较低。
5. **单目标标量化存在缺陷**：把多个目标加权合成为一个目标时，权重难以确定，且一次优化通常只能得到一个偏好下的解，难以覆盖 Pareto-front。

## 背景与动机

药物发现需要在活性、类药性、安全性等方面同时满足要求，而先导化合物优化是药物研发中的关键环节。传统虚拟筛选或实验试错成本高、耗时长，而化学空间规模可达 $10^{30}$ 到 $10^{60}$，人工探索极其有限。

已有机器学习分子优化方法大致包括：

- 深度学习方法，如 VAE、RNN、GAN、GNN；
- 强化学习方法，将分子修改建模为 MDP；
- 进化算法方法，通过交叉、变异等操作探索分子空间；
- 深度学习与进化或强化学习结合的混合方法。

这些方法虽然改善了性质优化效果，但多数工作仍然将多目标问题转化为单目标问题，例如加权求和或乘积。论文认为这种做法存在权重选择困难、重复优化成本高、难以覆盖非凸或不连续 Pareto-front、目标量纲不一致导致鲁棒性差等问题。

因此，作者将分子优化明确建模为 **多目标优化问题**，并提出在学习到的连续隐式化学空间中进行多目标进化搜索。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-01.jpg]]

图 1 的第一部分用于说明单目标分子优化过程：通常一次优化只能得到某种偏好下的一个解，难以全面揭示不同目标之间的权衡关系。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-02.jpg]]

图 1 的第二部分对比展示多目标优化过程：多目标优化可以在一次搜索中得到一组不同折中偏好的候选分子，更适合药物发现中多性质共同优化的需求。

## 核心思想

**MOMO** 的核心思想是将分子优化拆成两个互补部分：

1. **学习化学知识**  
   使用预训练 encoder-decoder codec 从大量无标注分子中学习连续分子表示，构建隐式化学空间。论文实验中采用预训练 **cddd** 模型。

2. **在隐式空间中进行多目标进化搜索**  
   将先导分子编码为连续向量，在该向量附近加入高斯噪声形成初始种群；随后在连续向量空间中执行选择、交叉、变异，并将候选向量解码回分子空间，计算多个性质和相似性指标。

3. **用 Pareto 机制保留多样化高质量分子**  
   MOMO 使用非支配排序和参考点机制定义候选分子的偏序关系，并设计随迭代变化的动态接受概率，在早期鼓励多样性，后期强化高质量解。

最终，MOMO 返回最后一代种群中 Pareto-front 上的分子，作为满足不同性质权衡的优化结果。

## 方法框架

MOMO 的整体框架包括以下模块：

- **encoder-decoder codec**：负责在分子空间和隐式化学空间之间转换；
- **latent population initialization**：围绕先导分子的隐向量添加高斯噪声，生成初始种群；
- **evolutionary operations**：在连续隐向量上进行选择、交叉和变异；
- **molecule decoder**：将隐向量解码为 SMILES 或分子结构；
- **property evaluator**：在分子空间中计算 QED、PlogP、DRD2、Similarity 等目标值；
- **Pareto-based population update**：基于非支配排序、参考点机制和动态接受概率更新种群。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-03.jpg]]

图 2 展示 MOMO 的主框架：先导分子被编码到隐式化学空间，种群在隐向量空间中进化，候选分子解码后在分子空间中评估性质和相似性，再根据多目标偏序关系选择进入下一代。

论文将优化目标形式化为：

$$
\max_x [f_1(x), f_2(x), \dots, f_m(x), f_{m+1}(x, x_0)]
$$

其中 $f_1,\dots,f_m$ 是分子性质评估函数，$f_{m+1}$ 是优化分子与先导分子 $x_0$ 的相似性函数。实验中相似性采用基于 Morgan fingerprints 的 Tanimoto similarity。

## 算法流程

MOMO 的优化流程如下：

1. 在大型公共分子数据库上预训练 encoder-decoder codec，学习隐式化学空间。
2. 将先导分子输入 encoder，得到其隐向量表示。
3. 第一代种群通过对先导分子隐向量加入高斯噪声构建；后续代则来自上一代更新后的分子重新编码。
4. 在隐向量种群上执行选择、交叉和变异，生成 offspring。
5. 合并父代和子代隐向量，并通过 decoder 解码为分子。
6. 在分子空间中计算多个目标值，例如 QED、PlogP、DRD2 和 Similarity。
7. 根据非支配排序和参考点机制定义分子偏序。
8. 使用动态接受概率选择下一代种群。
9. 重复迭代，最终返回最后一代 Pareto-front 上的分子。

关键算法细节：

- **选择**：使用 binary tournament selection。
- **交叉**：使用 blending linear crossover operator。
- **变异**：以 $p_m=0.5$ 的概率随机替换隐向量中的一个维度为标准高斯分布采样值。
- **种群更新**：父代和子代合并后，基于非支配排序、参考点机制和接受概率选出下一代。
- **动态接受概率**：

$$
p_a = e^{-\frac{1}{t}\times \beta}
$$

其中 $t$ 是当前迭代轮数，$\beta$ 控制增长速度，实验中设为 0.3。随着迭代进行，接受概率增加，使搜索早期更强调多样性，后期更强调性质和相似性。

## 实验设置

论文在四个多目标分子优化任务上评估 MOMO。

### 任务设计

1. **Task 1: QED and Similarity**  
   目标是优化先导分子，使 QED $\geq 0.9$ 且 Similarity $\geq 0.4$。

2. **Task 2: PlogP and Similarity**  
   目标是在满足相似性阈值 $\delta$ 的同时最大化 PlogP improvement，即 PlogP_imp。相似性阈值设置为 0.4 或 0.6。

3. **Task 3: QED, PlogP and Similarity**  
   目标是 QED $\geq 0.85$、PlogP_imp $\geq 3$、Similarity $\geq 0.3$。

4. **Task 4: QED, Drd2 and Similarity**  
   目标是 QED $\geq 0.8$、Drd2 $\geq 0.4$、Similarity $\geq 0.3$。

### 数据集

- Task 1：来自 Jin et al. 的 QED dataset，包含 800 个从 ZINC test 中选择的分子，QED 位于 $[0.7, 0.8]$。
- Task 2：来自 Jin et al. 的 PlogP dataset，包含 800 个低 PlogP 分子。
- Task 3：合并 Task 1 和 Task 2 的数据，筛选出 500 个唯一分子，要求 QED 位于 $[0.6, 0.8]$ 且 PlogP < -2。
- Task 4：来自已发表论文的数据，包含 780 个分子，要求 Drd2 < 0.05 且 QED 位于 $[0.7, 0.8]$。

### 比较方法

Task 1 和 Task 2 中，MOMO 与以下方法比较：

- DL-based：**JTVAE**、**VSeqtoSeq**、**VJTNN**、**QMO**
- RL-based：**GCPN**
- EC-based：**GA**

Task 3 和 Task 4 中，由于任务更难，比较方法包括：

- **GA**
- **MSO**
- **QMO**
- Task 4 额外比较 **IPCA**

论文说明 Task 3 和 Task 4 中，部分 baseline 将多个目标合成为单目标函数；为了更可靠比较，作者生成多组均匀权重并报告最终结果最好的参数设置。

### 评价指标

- **Success Rate, SR**：优化分子在所有性质和相似性阈值上均满足要求的比例。
- **Average objective value**：优化分子的平均性质值或平均相似性。
- **Average improvement of property**：优化分子平均性质值减去先导分子平均性质值。

### 参数设置

- Task 1：$P=100$，$T=100$，$d=0.25$，$p_c=1$，$p_m=0.5$，使用 10 次重启，报告最佳结果。
- Task 2：$P=100$，$T=200$，$d=0.25$，$p_c=1$，$p_m=0.5$。
- Task 3 和 Task 4：$P=100$，$T=200$，$d=0.25$，$p_c=1$，$p_m=0.5$，不使用重启以公平比较计算成本。

## 主要结果

### Task 1：QED and Similarity

MOMO 和 QMO 在 Task 1 上的 SR 均超过 90%，明显优于其他方法。论文报告 MOMO 相比 QMO 仍提升 1.91%。性质分布图显示，MOMO 可以生成更多同时具有较高 QED 和较高相似性的成功分子。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-04.jpg]]

该图对应 Fig. 3 中 Task 1 的成功率比较，展示 MOMO 与多类 baseline 在 QED 和 Similarity 同时满足阈值时的表现。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-05.jpg]]

该图对应 Fig. 3 中 Task 1 的优化分子分布比较。横轴和纵轴分别反映优化分子的 QED 与相似性，MOMO 的分布表明其能找到更多性质和相似性兼顾的分子。

### Task 2：PlogP and Similarity

Task 2 中，MOMO 在相似性阈值 $\delta=0.4$ 时达到平均 PlogP_imp 9.61，至少超过所有 baseline 1.91。论文还指出 MOMO 的 PlogP_imp 标准差低于 QMO，说明其稳定性更好。在 $\delta=0.6$ 时，MOMO 仍优于 baseline，显示对相似性约束具有鲁棒性。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-06.jpg]]

该图对应 Fig. 3 中 Task 2 在不同 Tanimoto similarity 阈值下的 PlogP improvement 比较。结果显示 MOMO 在不同约束强度下均能保持较强优化能力。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-07.jpg]]

该图对应 Fig. 3 中 Task 2 的优化分子分布比较，用于展示 MOMO 与 QMO 在 PlogP_imp 和 Similarity 之间的权衡。论文指出 MOMO 更倾向于找到同时保持较高 PlogP_imp 与较高相似性的分子。

### Task 3：QED, PlogP and Similarity

Task 3 是三个目标同时优化的更难场景。MOMO 的 SR 为 82.4%，至少比 baseline 高 32.1%。同时，MOMO 优化分子的平均 QED、PlogP_imp 和 Similarity 均优于所有 baseline。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-08.jpg]]

该图对应 Fig. 4 中 Task 3 的性能评估，展示 MOMO 在 QED、PlogP_imp 和 Similarity 三目标共同优化时显著优于比较方法。

### Task 4：QED, Drd2 and Similarity

Task 4 引入与实际药物设计更相关的生物活性目标 Drd2。MOMO 的 SR 为 75.93%，至少比 baseline 高 29.9%。此外，MOMO 在三个目标的平均性质值上也优于 baseline。

![[raw/zotero/images/多目标分子优化/面向隐式化学空间的多目标进化分子优化方法 - xiaMoleculeOptimizationMultiobjective/mineru-figure-09.jpg]]

该图对应 Fig. 4 中 Task 4 的结果或分布分析，说明 MOMO 在优化 QED、Drd2 和 Similarity 时可以更接近多目标理想区域，尤其相比 QMO 更能保持相似性。

### 可视化分析

原文还包含 Fig. 5 和 Fig. 6，用于展示 MOMO 的搜索能力和分子修改轨迹，但当前“可用图表”中未提供对应 Obsidian 图片路径，因此此处不嵌入。需待补充原文/PDF 后确认完整图片资源。

根据正文描述：

- Fig. 5 展示 Task 1 中一个先导分子的进化过程，不同颜色表示不同代的分子，最终 Pareto-front 分子位于红圈附近。结果显示 MOMO 会沿多个方向探索，既能找到高 Similarity 解，也能找到高 QED 解。
- Fig. 6 展示一个分子的部分进化轨迹，三行分别表示从先导分子出发沿不同偏好方向演化的后代：高 QED 低相似性、高 QED 高相似性、低 QED 高相似性。

## 创新点

1. **将 molecule optimization 明确建模为多目标优化问题**  
   与将多性质加权合成为单目标的方法不同，MOMO 直接使用 Pareto-based multi-objective evolutionary search，能够一次搜索得到多个不同偏好的候选分子。

2. **在隐式化学空间中进行进化搜索**  
   MOMO 不直接在离散 SMILES 或分子图上进化，而是在 encoder-decoder 学到的连续 latent space 中执行进化操作，使搜索更平滑，也减少手工化学规则约束。

3. **降低对标注数据的依赖**  
   codec 通过自监督方式学习化学知识，优化过程中直接使用性质评估器作为目标函数，不需要大量特定任务标注数据训练模型。

4. **结合非支配排序和参考点机制**  
   MOMO 使用 Pareto domination、non-domination rank 和 reference point mechanism 共同维护种群质量与多样性。

5. **设计动态接受概率**  
   通过随迭代变化的接受概率，MOMO 在搜索早期保留更多多样性，在后期更强调高性质、高相似性分子。

6. **在三目标任务上表现突出**  
   论文特别强调 MOMO 在 Task 3 和 Task 4 这类三目标同时优化任务中显著优于现有方法。

## 局限性

论文作者明确承认以下局限：

1. **编码和解码过程耗时**  
   在优化过程中频繁进行 encoder 和 decoder 调用会带来较高计算开销。

2. **更多目标优化尚未充分验证**  
   实验主要覆盖二目标和三目标优化。真实药物开发通常需要同时考虑更多目标，例如四个及以上性质。

3. **潜在空间性质预测尚未充分利用**  
   作者提出未来可以结合 latent space 中的代理性质预测模型与 molecule space 中的性质评估器，以减少频繁解码带来的时间消耗。

4. **分子分布性和多样性仍可改进**  
   论文在未来方向中提到，可以进一步考虑分子进化过程中的 distributivity 和 diversity，以提升优化性能。

5. **代码与数据链接不明确**  
   正文称代码和数据将更新到作者 GitHub，但当前解析文本中未给出明确 URL，复现需待补充原文/PDF 或仓库链接后确认。

## 相关概念

- [[Lead Optimization]]
- [[多目标优化]]
- [[隐式化学空间]]
- [[非支配排序]]
- [[Pareto最优解集]]
- [[Tanimoto Similarity]]
- [[Morgan Fingerprint]]
- [[QED]]
- [[PlogP]]
- [[DRD2]]
## 相关方法

- [[MOMO]]
- [[Multi-objective Evolutionary Algorithm]]
- [[Reference Point Mechanism]]
- [[Binary Tournament Selection]]
- [[遗传算法|Genetic Algorithm]]
- [[Linear Scalarization]]
## 相关数据集

- [[ZINC]]
## 相关模型

- [[cddd]]
## 相关论文

- [[Junction Tree Variational Autoencoder for Molecular Graph Generation]]
- [[Learning Multimodal Graph-to-Graph Translation for Molecule Optimization]]
- [[Optimizing Molecules Using Efficient Queries from Property Evaluations]]
- [[Efficient Multi-objective Molecular Optimization in a Continuous Latent Space]]
- [[Multi-Property Molecular Optimization using an Integrated Poly-Cycle Architecture]]
- [[NSGA-II]]

## 源文件

- citekey: xiaMoleculeOptimizationMultiobjective
- title: Molecule optimization via multi-objective evolutionary in implicit chemical space
- authors: Xin Xia, Yansen Su, Chunhou Zheng, Xiangxiang Zeng
- year: 待补充原文/PDF 后确认
- venue: 待补充原文/PDF 后确认
- DOI: 待补充原文/PDF 后确认
- collections: 多目标分子优化
- 正文来源：MinerU full.md

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

- http://arxiv.org/abs/2206.12411
- https://doi.org/10.26434/chemrxiv.5309668.v3

## Zotero 原始摘要

无。

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值不在于提出一个全新的分子生成器，而在于把“分子优化”从常见的加权单目标范式转向真正的 Pareto 多目标搜索范式。对于药物优化来说，研究者往往并不只需要一个“最高分”分子，而是需要一组不同权衡的候选分子，例如有的更接近先导分子，有的 QED 更高，有的活性更强。MOMO 正好契合这种决策场景。

另一个重要点是，MOMO 把“学习化学知识”和“搜索目标分子”解耦：codec 负责提供更合理、更连续的化学空间，MOEA 负责在空间中寻找 Pareto-front。这种设计使得它比纯进化算法更有化学先验，也比纯深度生成模型更容易处理非可微、多目标、无标签或少标签的性质优化问题。

不过，方法依赖 encoder-decoder 的质量。如果 codec 的隐空间不够平滑，或 decoder 解码有效率低，进化搜索的效率会受影响。论文也指出编码/解码耗时是一个主要瓶颈。因此，未来将性质预测器直接放到 latent space 中做快速筛选，再辅以分子空间精确评估，可能是很自然的改进方向。

## 后续问题

1. MOMO 使用的预训练 cddd 模型具体训练数据、版本和超参数是什么？当前文本未给出足够细节，待补充原文/PDF 后确认。
2. 代码和数据是否已经公开到 GitHub？当前文本只写“will be update and available”，但未提供链接。
3. MOMO 在四个以上目标的 many-objective molecular optimization 中是否仍能稳定维持 Pareto-front 多样性？
4. 动态接受概率 $p_a = e^{-\frac{1}{t}\times \beta}$ 对性能有多敏感？是否有消融实验？当前摘取文本未见详细消融，待补充原文/PDF 后确认。
5. 参考点机制具体是否等价或接近 NSGA-III 的实现？正文引用 Deb & Jain，但实现细节仍需代码确认。
6. MOMO 的计算成本相对 QMO、MSO、GA 如何？正文提到编码解码耗时，但未给出详细运行时间对比。
7. 生成分子的合成可行性、毒性、ADMET 性质是否在后续实验中验证？当前实验主要关注 QED、PlogP、DRD2 和 Similarity。
8. 对于 Task 2 中高 PlogP 但结构不合理的大碳链分子，是否需要额外引入 SA 或结构多样性约束来避免投机性优化？
