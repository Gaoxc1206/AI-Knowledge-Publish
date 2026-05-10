---
type: paper
citekey: "tagasovskaParetooptimalCompositionalEnergybased"
title: "用于蛋白质序列采样与优化的帕累托最优组合能量模型"
chinese_title: "用于蛋白质序列采样与优化的帕累托最优组合能量模型"
authors: "Nataša Tagasovska, Nathan C Frey, Andreas Loukas, Isidro Hötzel, Ryan Lewis Kelly, Yan Wu, Arvind Rajpal, Richard Bonneau, Kyunghyun Cho, Stephen Ra, Vladimir Gligorijevic"
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
  - "用于蛋白质序列采样与优化的帕累托最优组合能量模型"
  - "A Pareto-optimal compositional energy-based model for sampling and optimization of protein sequences"
original_title: "A Pareto-optimal compositional energy-based model for sampling and optimization of protein sequences"
---
## 一句话总结

本文提出 **Pareto-compositional energy-based model (pcEBM)**，把 **multiple gradient descent (MGD)** 引入 **compositional energy-based models (cEBM)** 的采样过程，用于生成或改造同时满足多个抗体性质目标的蛋白质序列，并在真实抗体设计任务中展示了更好的 Pareto front 覆盖与多目标优化能力。

## 研究问题

本文关注生命科学逆向设计中的多目标生成问题：如何生成新的蛋白质/抗体序列，使其不仅像真实数据分布中的序列，还能同时满足多个期望性质。

在抗体设计中，论文重点考虑三个性质：

1. **Ab-like**：与已知人类抗体序列相似；
2. **Aff**：对目标抗原具有较好的 binding affinity；
3. **BV score**：与 nonspecificity 相关的实验指标，论文中较高 BV score 更好。

核心困难在于，这些性质可能彼此冲突或近似正交。例如，单纯优化 binding affinity 可能损害 developability 相关性质。因此，论文不追求找到一个“同时最优”的单点解，而是希望生成一组位于或接近 **Pareto front** 的候选序列，使研究者能够在不同性质之间进行权衡选择。

## 背景与动机

深度生成模型已经被广泛用于生命科学中的逆向设计任务，例如分子、蛋白质和抗体设计。论文提到的典型生成模型包括 **GANs**、**VAEs**、**energy-based models (EBMs)** 和 **diffusion models**。这些模型可以生成化学或物理上合理的候选设计，但在真实工业场景中的成功案例仍然较少。

作者认为主要挑战包括：

- 图像数据集在生成模型研究中过度代表，生命科学任务的真实约束更复杂；
- 缺乏适用于合成生物分子数据的统一评估协议和指标；
- 可控生成与训练稳定性仍然困难；
- 生成结果可能过度接近训练样本，缺乏真正有价值的新颖性；
- 实际候选分子需要同时满足多个性质，而非单一目标。

对于治疗性抗体而言，除 binding affinity 外，还需要关注 polyreactivity、viscosity、nonspecificity、manufacturability 等性质。如果忽略这些 developability 相关指标，可能在后续放大生产、质量控制或临床试验阶段造成严重问题。

因此，本文的动机是：构建一种能够同时考虑多个目标性质、并能在非凸 Pareto front 上采样的生成方法。

## 核心思想

本文的核心思想是把多目标优化中的 **multiple gradient descent (MGD)** 与 **compositional energy-based models (cEBM)** 结合。

传统 **cEBM** 在多个属性 EBM 上做组合时，通常把多个 energy 相加：

$$
E(x)=\sum_i E(x|f_i)
$$

然后用 Langevin Dynamics 沿总 energy 的梯度方向采样。这相当于用固定权重把多个目标合成一个目标，容易偏向某些目标，尤其在目标冲突或 Pareto front 非凸时表现不足。

本文提出的 **pcEBM** 不直接使用简单求和梯度，而是在每一步采样中根据当前样本的多个目标梯度，自适应求出一个 Pareto 改进方向。这个方向来自 **MGD**，目标是最大化所有目标中“下降最慢”的那个目标的改善速度，从而尽量让所有目标同时下降。

直观地说：

- **cEBM**：把多个属性 energy 加起来，沿总梯度走；
- **MGD**：寻找一个能同时改善多个目标的方向，但没有采样噪声；
- **pcEBM**：用 MGD 找 Pareto 改进方向，再加入 Langevin noise 进行探索，从而既优化多目标，又覆盖更广的 Pareto front。

## 方法框架

论文首先把抗体表示为氨基酸序列。每条抗体由两条氨基酸链组成，每个氨基酸来自 20 种字符构成的字母表，典型总长度约为 $L \sim 250$。序列记为：

$$
x=(x_1,\ldots,x_L)
$$

其中 $x_l \in \{1,\ldots,20\}$ 表示第 $l$ 个位置的氨基酸类型。

对于每条序列，论文考虑 $m$ 个性质函数：

$$
f_i:\mathbb{R}^L \to \mathbb{R}, \quad i=1,\ldots,m
$$

目标是生成新的序列 $x^*$，使其在多个性质上具有较优取值。由于多个目标可能冲突，作者采用 Pareto optimality 的视角。

在方法上，论文分三步构建：

1. 训练多个单属性 EBM，每个 EBM 对应一个性质；
2. 用 compositional EBM 将多个性质组合起来；
3. 在采样时用 MGD 自适应确定多目标下降方向，形成 **pcEBM**。

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/mineru-figure-01.jpg]]

图 1 对比了 **pcEBM** 和朴素多目标采样 **cEBM** 的输出。绿色点表示起始序列，每个点表示从该起点修改得到的候选设计；pcEBM 能沿 Pareto front 产生同时改善 affinity 和 nonspecificity 的候选，而 cEBM 更容易只优化其中一个目标。

### Pareto optimality

论文采用如下定义：如果对于两个点 $x_1,x_2$，有

$$
f_i(x_2) \leq f_i(x_1), \forall i
$$

则称 $x_1$ 被 $x_2$ 支配。若一个点不被任何其他点支配，则称为全局 Pareto optimal；若在其局部邻域内不被其他点支配，则称为局部 Pareto optimal。所有 Pareto optimal 点的目标函数值集合构成 Pareto front。

### Multiple Gradient Descent

在线性标量化中，会用权重向量 $\lambda$ 把多个目标合成为：

$$
f_\lambda(x)=\sum_{i=1}^m \lambda_i f_i(x)
$$

但这种方法主要适合凸 Pareto front。对于非凸 Pareto front，线性标量化可能无法覆盖关键区域。

MGD 的做法是，在当前点 $x$ 处寻找一个方向 $g$，使得所有目标都尽可能下降。论文写作：

$$
g (x) \propto \underset {g \in \mathbb {R} ^ {d}} {\operatorname{argmax}} \left\{\min _ {i \in [ m ]} \langle g, \nabla_ {x} f _ {i} (x) \rangle \text { subject to } \| g \| _ {2} \leq 1 \right\}
$$

该方向试图最大化最慢目标的下降率。如果找不到能同时改善所有目标的方向，则过程会终止于局部 Pareto 点附近。

### Compositional EBM

EBM 学习一个 energy function：

$$
E_\theta(x)
$$

并用未归一化 Boltzmann distribution 表示数据分布：

$$
p_\theta(x) \propto e^{-E_\theta(x)}
$$

采样通常使用 Langevin Dynamics：

$$
x = x ^ {k - 1} - \frac {\eta}{2} \nabla_ {x} E _ {\theta} (x ^ {k - 1}) + \omega^ {k}
$$

其中 $\omega \sim \mathcal{N}(0,\sigma^2)$。

对于多个属性，**cEBM** 使用 product of experts：

$$
p (x \mid f _ {1} \wedge f _ {2} \wedge \dots \wedge f _ {m}) = \prod_ {i} p (x \mid f _ {i}) \propto e ^ {- \sum_ {i} E (x \mid f _ {i})}
$$

对应采样为：

$$
x = x ^ {k - 1} - \frac {\eta}{2} \nabla_ {x} \sum_ {i} E _ {\theta} (x ^ {k - 1} | f _ {i}) + \omega^ {k}
$$

### pcEBM

本文提出的 **pcEBM** 在采样中使用 MGD 方向：

$$
x ^ {k} \leftarrow x ^ {k - 1} - \eta \underset {g \in \mathbb {R} ^ {d}} {\operatorname{argmax}} \{\min _ {i \in [ m ]} \langle g, \nabla_ {x} f _ {i} (x ^ {k - 1}) \rangle \text { subject to } \| g \| _ {2} \leq 1 \} + \sqrt {2} \alpha \omega
$$

其中 $\alpha$ 是正数，外层采样类似 Langevin diffusion，内层优化问题与 MGD 相同。

作者给出的直观解释是：

- 当样本远离 Pareto front，且各目标梯度范数较大时，MGD 方向会推动样本靠近 Pareto front；
- 当样本接近 Pareto front，梯度近乎消失时，噪声项会主导，使样本进行 Brownian motion，从而探索 front 附近的不同区域；
- 相比纯 MGD，噪声有助于覆盖更广的 Pareto front；
- 相比 cEBM，自适应 Pareto 方向使优化更有效。

## 算法流程

根据正文，pcEBM 的采样流程可以整理为：

1. 准备多个单属性 EBM  
   分别针对 **Ab-like**、**Aff**、**BV score** 等性质训练 EBM。

2. 初始化序列  
   可以从随机噪声开始生成新序列，也可以从已有抗体序列 seed 出发进行性质改造。

3. 计算多个目标梯度  
   对当前序列 $x^{k-1}$，分别计算每个属性 energy 或目标函数的梯度：

   $$
   \nabla_x f_i(x^{k-1})
   $$

4. 求解 MGD 方向  
   在单位范数约束下寻找一个方向 $g$，使所有目标中最慢下降的目标也能尽可能改善。

5. 更新序列表示  
   按照 pcEBM 更新式加入 Pareto 改进方向和噪声项：

   $$
   x^k \leftarrow x^{k-1} - \eta g + \sqrt{2}\alpha\omega
   $$

6. 重复采样  
   迭代 $k$ 步，得到候选序列集合。

7. 评估 Pareto front 与性质改善  
   使用 **Hyper-Volume (HV)**、edit distance、BV score surrogate oracle 等指标评估生成结果。

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/mineru-figure-02.jpg]]

该图展示了 **pcEBM** 与 **cEBM** 在相同步长 $\eta=0.01$ 和相同起始序列下，各属性 energy score 随采样步数变化的轨迹。论文据此认为 pcEBM 收敛更快，这部分支持了 pcEBM 相比 cEBM 的优化优势。

## 实验设置

论文比较了 **pcEBM** 与三个 baseline：

1. **MGD**  
   使用 multiple gradient descent，不添加噪声。

2. **cEBM**  
   使用 Langevin dynamics，对所有属性使用均匀权重。

3. **ls-cEBM**  
   linearly scaled cEBM，区别在于引入 domain-informed weights。

4. **pcEBM**  
   每个序列、每一步根据当前梯度自适应学习/求解属性权重或 Pareto 改进方向。

### 任务与性质

实验目标是生成合理抗体序列，并同时满足三个性质：

- **Ab-like**：与公共数据库中已知人类抗体相似；
- **Aff**：对目标抗原的 binding affinity；
- **BV score**：nonspecificity 的实验度量，论文中较高 BV score 更好。

训练数据来自公共和 proprietary sources。由于 proprietary 数据未公开具体内容，具体数据规模、划分方式和部分实验细节需要待补充原文/PDF 后确认。

### 模型结构

论文称所有属性模型均使用 sequence-based convolution networks，附录中进一步说明：

- 每个性质和 baseline 使用相同的神经网络架构；
- 每条 protein chain 使用一个模型；
- 模型包含三个 Conv1D layers；
- kernel size 为 9；
- padding 为 1；
- 使用 ReLU nonlinearities；
- penultimate layer size 为 256；
- 所有 EBM 使用 contrastive training；
- 优化器为 Adam；
- 使用 early stopping criterion。

### 超参数

附录给出的随机搜索超参数网格包括：

- step size：$\eta \in \{1e^{-4}, 1e^{-2}, 1, 10, 40\}$；
- number of steps：$k \in \{100, 200, 300, 400\}$；
- noise type：$\omega \in \{\mathcal{N}, \mathcal{U}\}$。

### 评价指标

论文主要使用两个指标。

第一是 **Hyper-Volume (HV)**，用于衡量多目标解集质量。实验中以各属性 EBM 的 energy score 作为目标，目标是最小化 energy score。HV 的 reference point 设为：

$$
r=(1.0,1.0,1.0)
$$

HV 使用 **PyMoo** 实现。

第二是 edit distance，用于衡量生成序列与训练集中具有某属性的序列之间的最小编辑距离。论文使用 Levenshtein distance，考虑 insertion、deletion 和 substitution。正文称使用 python library edist，并引用了 Edlib；具体库名是否为 edist 或 Edlib 的 Python 接口，待补充原文/PDF 后确认。

## 主要结果

论文围绕四个问题展开实验：

- Q1：EBM 能否生成有效/合理且满足多属性的抗体序列？
- Q2：Langevin Dynamics 是否能提出更多 Pareto optimal sequences？
- Q3：pcEBM 是否优于 cEBM？
- Q4：从 seed sequence 出发，能否用 compositional EBM 改善某个目标性质？

### 多目标生成能力

Table 1 报告了不同 step size 下，不同方法在多个属性组合上的 **Hyper-Volume (HV)**。总体观察是：

- 在较小步长 $\eta=0.01$ 时，**pcEBM** 在三属性 HV 和多个二属性组合 HV 上表现最好或接近最好；
- **MGD** 通常是较强 baseline；
- **cEBM** 和 **ls-cEBM** 在某些设置下可以表现不错，但对步长较敏感；
- pcEBM 在不同 $\eta$ 下的方差更小，说明稳定性更好。

正文给出的 Table 1 中，$\eta=0.01$ 时：

| 方法 | HV(Ab-Like, Aff, BV) | HV(Aff, BV) | HV(Ab-Like, BV) | HV(Ab-Like, Aff) |
|---|---:|---:|---:|---:|
| MGD | 0.04 | 0.22 | 0.23 | 0.29 |
| ls-cEBM | 0.00 | 0.24 | 0.24 | 0.23 |
| cEBM | 0.00 | 0.25 | 0.24 | 0.25 |
| pcEBM | 0.049 | 0.30 | 0.29 | 0.30 |

这表明在较保守步长下，pcEBM 对多属性 Pareto front 的覆盖更好。

### 与真实属性数据的相似性

Table 2 使用 edit distance 衡量生成序列与训练集中对应属性序列的相似度，越小越好。论文结论是：

- 单属性 EBM 生成的序列更接近其自身属性数据，但对其他属性不一定好；
- 多属性 EBM 生成序列相比单属性 EBM，在多个属性上的距离更均衡；
- 在 $\eta=40$ 和 $\eta=0.01$ 的多目标设置中，pcEBM 的平均 edit distance 较小；
- MGD 也表现较强，是接近 pcEBM 的 baseline。

正文中 $\eta=0.01$ 时的平均 edit distance：

| 方法 | average edit distance |
|---|---:|
| MGD | 89.46 |
| cEBM | 221.23 |
| ls-cEBM | 218.51 |
| pcEBM | 86.02 |

这说明在小步长下，pcEBM 生成的序列更接近真实属性数据，而 cEBM/ls-cEBM 在该设置下明显偏离。

### pcEBM 的收敛速度优势

论文通过 energy score 轨迹比较 pcEBM 和 cEBM。结果显示，在相同起始序列和相同步长 $\eta=0.01$ 下，pcEBM 的能量下降更快。作者将这解释为 pcEBM 相比 cEBM 的优势之一：pcEBM 每一步选择的是更适合多目标同时下降的局部方向，而不是简单合并 energy 梯度。

### Pareto front 覆盖

正文中还提到 Figure 2 展示了不同 baseline 生成候选序列形成的 Pareto front，以及估计 hypervolume。该图在“可用图表”中未提供对应图片，因此此处不嵌入；具体图像细节待补充原文/PDF 后确认。

作者的结论是：

- pcEBM front 比基于 MGD 的方法更宽，说明加入 Langevin Dynamics 噪声有助于覆盖更广的 Pareto front；
- pcEBM 和 MGD 的 front 更接近原点，说明它们在 energy 最小化意义上优于直接 Langevin Dynamics；
- 这支持 Q2 和 Q3：Langevin noise 有助于探索，MGD 方向有助于多属性优化，而 pcEBM 结合二者。

### 从 seed 改善 BV score

论文还测试了从已有抗体序列出发，改善 nonspecificity 相关 BV score 的能力。实验流程是：

1. 筛选出 BV score 较差的已有序列，作为 seeds；
2. 使用 compositional EBM 变体生成改造后的设计；
3. 使用外部 **SeqCNN classifier** 作为 surrogate pseudo-oracle 评估新设计的 predicted BV score。

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/mineru-figure-03.jpg]]

该图是 Figure 4 的左侧图，对应 **cEBM** 对低 BV score seed 的改造轨迹。点的颜色表示 BV score，蓝色更好，橙色点表示初始 seed；图中可以看到生成序列向高 BV score 区域移动。

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/mineru-figure-04.jpg]]

该图是 Figure 4 的右侧图，对应 **pcEBM** 对同类 seed 的改造轨迹。论文用 tSNE 投影 nonspecificity oracle 最后一层特征，显示 pcEBM 也能把低分 seed 推向 BV score 更好的流形区域。

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/mineru-figure-05.jpg]]

该图是 Figure 5 的左侧小提琴图，比较 seeds 与各 baseline 生成设计的 predicted BV score 分布。论文指出，多目标方法能把最差 BV score 从约 0.27 提升到 0.9 以上，说明这些方法可用于已有抗体的性质改造。

![[raw/zotero/images/多目标分子优化/用于蛋白质序列采样与优化的帕累托最优组合能量模型 - tagasovskaParetooptimalCompositionalEnergybased/mineru-figure-06.jpg]]

该图是 Figure 5 的右侧图，展示 pcEBM 在不同步数下 proposal trajectories 的 energy score。较低 energy score 更好，用于观察 pcEBM 随采样步数推进时各目标的优化趋势。

## 创新点

1. **将 Pareto optimality 引入 compositional EBM 采样**  
   本文不是简单把多个 EBM 的 energy 相加，而是在采样过程中显式考虑多目标 Pareto 改进方向。

2. **用 MGD 替代固定权重标量化方向**  
   pcEBM 每一步根据当前样本的多个属性梯度求解局部 Pareto 改进方向，避免固定权重在冲突目标或非凸 Pareto front 上的局限。

3. **结合 MGD 的优化性与 Langevin Dynamics 的探索性**  
   MGD 有助于同时降低多个目标，Langevin noise 有助于在 Pareto front 附近探索更多样的候选。

4. **面向真实抗体设计任务验证**  
   实验不是纯 toy problem，而是在 Ab-like、Aff、BV score 等真实抗体设计相关性质上进行评估。

5. **支持从已有 seed 进行性质改造**  
   除了从噪声生成，论文还展示了从 BV score 较差的已有抗体出发进行优化的场景，更接近实际抗体工程流程。

## 局限性

1. **数据集细节不完整**  
   论文提到使用 public 和 proprietary sources，但 proprietary 数据的具体来源、规模、划分和可复现性信息在当前解析文本中不足，需要待补充原文/PDF 后确认。

2. **实验主要集中在抗体序列**  
   作者在 conclusion 中提到未来可扩展到 graph structures suitable for molecules，说明本文尚未验证分子图等其他数据类型。

3. **属性评估依赖 surrogate model**  
   BV score 改善实验使用外部 SeqCNN classifier 作为 surrogate pseudo-oracle。生成设计是否能在真实实验中保持同样提升，需要湿实验验证；当前解析文本中未看到真实实验验证结果。

4. **EBM 训练与离散序列采样细节仍需确认**  
   论文给出 sequence-based convolution networks 和 Langevin-style sampling，但离散氨基酸序列如何从连续表示映射回字符序列等实现细节在当前摘取文本中不充分，待补充原文/PDF 后确认。

5. **对比方法范围有限**  
   Baseline 包括 MGD、cEBM、ls-cEBM，但没有与更现代的蛋白质语言模型、扩散式蛋白质生成模型或强化学习式多目标设计方法进行系统比较。是否在完整论文中有更多对比，待补充原文/PDF 后确认。

6. **Pareto optimality 是基于模型 energy 的近似**  
   实验中用各属性 EBM energy 作为目标代理，因此 Pareto front 是模型代理意义上的 front，不必然等价于真实实验性质下的 Pareto front。

## 相关概念

- [[Pareto 最优]]
- [[Pareto Front]]
- [[多目标优化]]
- [[Energy-Based Model]]
- [[蛋白质序列设计]]
- [[可控生成]]
- [[Hypervolume Indicator]]
- [[抗体可开发性]]
## 相关方法

- [[Pareto-compositional Energy-Based Model]]
- [[Compositional Energy-Based Model]]
- [[Multiple Gradient Descent]]
- [[Langevin Dynamics]]
- [[Contrastive Divergence]]
- [[Linear Scalarization]]
## 相关数据集

- 待补充。
## 相关模型

- [[Sequence CNN|SeqCNN]]
## 相关论文

- [[Multiple-gradient descent algorithm for multiobjective optimization]]
- [[Compositional Visual Generation with Energy Based Models]]
- [[Implicit Generation and Modeling with Energy Based Models]]
- [[Profiling Pareto Front with Multi-Objective Stein Variational Gradient Descent]]
- [[Observed Antibody Space]]
- [[Tartarus]]

## 源文件

- citekey：tagasovskaParetooptimalCompositionalEnergybased
- title：A Pareto-optimal compositional energy-based model for sampling and optimization of protein sequences
- authors：Nataša Tagasovska, Nathan C Frey, Andreas Loukas, Isidro Hötzel, Ryan Lewis Kelly, Yan Wu, Arvind Rajpal, Richard Bonneau, Kyunghyun Cho, Stephen Ra, Vladimir Gligorijevic
- year：待补充原文/PDF 后确认
- venue：待补充原文/PDF 后确认
- DOI：待补充原文/PDF 后确认
- collections：多目标分子优化
- 正文来源：MinerU full.md

注意：正文摘取中的作者列表包含 Julien Lafrance-Vanasse，而元数据作者列表中未包含该作者；最终作者信息需待补充原文/PDF 或 Zotero 元数据后确认。

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

未在当前解析文本中发现明确数据集或 benchmark 链接。

### 其他链接

未在当前解析文本中发现其他外部资源链接。

## Zotero 原始摘要

Deep generative models have emerged as a popular machine learning-based approach for inverse design problems in the life sciences. However, these problems often require sampling new designs that satisfy multiple properties of interest in addition to learning the data distribution. This multi-objective optimization becomes more challenging when properties are independent or orthogonal to each other. In this work, we propose a Pareto-compositional energy-based model (pcEBM), a framework that uses multiple gradient descent for sampling new designs that adhere to various constraints in optimizing distinct properties. We demonstrate its ability to learn non-convex Pareto fronts and generate sequences that simultaneously satisfy multiple desired properties across a series of real-world antibody design tasks.

## Zotero 原始笔记

暂无 Zotero 子笔记。

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值在于：它把“多目标优化”真正放进了生成模型的采样步骤，而不是在生成后再筛选，或者简单把多个属性分数加权求和。

在抗体设计这种任务中，多目标冲突是常态。一个候选分子如果只在 affinity 上很好，但 nonspecificity 或 developability 很差，实际研发价值可能很低。pcEBM 的思路更贴近真实设计流程：它不是强行定义一个唯一最优目标，而是生成一批位于不同 trade-off 位置的候选，让实验人员或下游决策系统选择。

从方法上看，pcEBM 可以理解为：

- EBM 提供“属性能量地形”；
- MGD 提供“多目标同时下降方向”；
- Langevin noise 提供“front 附近探索能力”。

因此，它比 cEBM 更有目标协调能力，比纯 MGD 更有多样性和覆盖能力。

不过，这篇工作的可信度很大程度取决于属性 EBM 和 surrogate oracle 的质量。如果这些模型没有很好对应真实实验性质，那么 Pareto front 可能只是模型空间中的 Pareto front。对于实际抗体设计，后续是否能通过实验验证 pcEBM 提出的序列，才是最关键的问题。

## 后续问题

1. pcEBM 如何处理离散氨基酸序列的连续梯度更新？更新后如何投影或解码回合法序列？
2. proprietary antibody datasets 的规模、性质分布和训练/测试划分是什么？
3. Affinity 任务中的 antigen of interest 是单一抗原还是多个抗原？
4. BV score surrogate oracle 与真实实验 BV score 的相关性如何？
5. pcEBM 生成的序列是否经过湿实验验证？
6. pcEBM 与基于蛋白质语言模型的 guided generation 方法相比表现如何？
7. pcEBM 在目标数更多时是否仍然稳定？MGD 内部优化开销如何随目标数增长？
8. 是否可以把 pcEBM 扩展到结构生成、分子图生成或 diffusion model sampling？
9. 噪声强度 $\alpha$ 对 Pareto front 覆盖和序列有效性的影响如何？
10. 该方法是否容易生成过度接近训练集的序列？edit distance 是否足够衡量新颖性？
