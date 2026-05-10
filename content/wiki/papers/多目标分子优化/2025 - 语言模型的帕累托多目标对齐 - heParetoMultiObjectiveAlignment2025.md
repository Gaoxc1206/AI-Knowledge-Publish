---
type: paper
citekey: "heParetoMultiObjectiveAlignment2025"
title: "语言模型的帕累托多目标对齐"
chinese_title: "语言模型的帕累托多目标对齐"
authors: "Qiang He, Setareh Maghsudi"
year: "2025"
venue: ""
doi: "10.48550/ARXIV.2508.07768"
zotero_collections:
  - "多目标分子优化"
status: imported
reading_status: inbox
tags:
  - paper
aliases:
  - "语言模型的帕累托多目标对齐"
  - "Pareto Multi-Objective Alignment for Language Models"
original_title: "Pareto Multi-Objective Alignment for Language Models"
---
## 一句话总结

《Pareto Multi-Objective Alignment for Language Models》提出 PAreto Multi-Objective Alignment (PAMA)，把 LLM 的多目标 RLHF 对齐转化为可闭式求解的凸优化问题，将传统梯度式多目标优化的复杂度从 $\mathcal{O}(n^2 d)$ 降到 $\mathcal{O}(n)$，并在 GPT-2、GPT-2 XL、LLaMA-2 7B 上展示了比 MORLHF 和 MGDA-UB 更稳定的多目标对齐效果。

## 研究问题

本文关注的问题是：如何让大型语言模型在 RLHF 对齐阶段同时优化多个可能冲突的目标，而不是把复杂的人类偏好压缩成单一奖励函数。

典型冲突目标包括：

- 信息量与简洁性；
- 有帮助性与创造性；
- 积极情感与生成长度；
- 幽默性与生成长度；
- harmlessness 与生成长度。

现有 RLHF 通常只优化一个标量奖励函数，容易导致模型行为僵化、偏向单一偏好。直接使用多目标优化方法又面临 LLM 参数规模下的计算瓶颈。例如 MGDA 需要处理多个目标在全参数空间中的梯度组合，复杂度约为 $\mathcal{O}(n^2d)$，其中 $n$ 是目标数，$d$ 是模型参数量；当 $d$ 达到十亿级时不可行。

因此，本文要解决的核心问题是：

> 能否构造一种既有 Pareto 理论保证、又能在十亿参数级 LLM 上实际运行的多目标对齐算法？

## 背景与动机

RLHF 通常包含两个阶段：奖励建模和策略优化。奖励建模阶段用偏好数据训练奖励函数；策略优化阶段通常用 PPO 在奖励函数和 KL 正则约束下微调策略。传统形式可以写成优化：

$$
\mathbb{E}_{x \sim \mathcal{D}, y \sim \pi(\cdot | x)}
\left[
r(x,y)-\beta \log \frac{\pi(y|x;\theta)}{\pi_{ref}(y|x)}
\right]
$$

但这里的 $r(x,y)$ 是单一奖励函数。对于真实应用中的多元偏好，这种单目标建模不足以表达不同人群、不同场景、不同任务之间的偏好冲突。

一个朴素做法是把多个奖励函数用固定权重加权求和，例如：

$$
\min_{\theta}\sum_{i=1}^{N} c^{(i)} \mathcal{L}^{(i)}(\theta)
$$

但固定权重存在明显问题：

1. **冲突目标难平衡**：一个目标提升可能导致另一个目标下降。
2. **权重敏感**：不同权重会显著改变模型行为，且权重通常主观设定。
3. **计算成本高**：梯度式多目标优化需要分别计算和组合各目标梯度，在 LLM 参数规模下非常昂贵。

本文认为，多目标对齐需要一种不依赖昂贵全参数梯度聚合、但仍能保证 Pareto stationarity 的方法。

## 核心思想

PAMA 的核心思想是：不直接在高维参数空间中求解多目标梯度的 min-norm 问题，而是借助 Noon PPO 的结构，把多目标 RLHF 的梯度组合问题上界化为一个关于 advantage 标量的凸优化问题，并进一步得到闭式解。

传统多目标优化中常见的 min-norm 问题为：

$$
\min_{c^{(1)},\dots,c^{(N)}} 
\left\|
\sum_{i=1}^{N} c^{(i)} \nabla_{\theta}\mathcal{L}^{(i)}(\theta)
\right\|_2^2
$$

约束为：

$$
\sum_{i=1}^{N}c^{(i)}=1,\quad c^{(i)}\geq 0
$$

该式需要处理每个目标在完整参数空间中的梯度，因此复杂度随参数维度 $d$ 增长。

PAMA 的做法是利用 Noon PPO 下的 advantage 形式，将其上界转化为：

$$
\min_{c^{(1)},\dots,c^{(N)}}
\left\|
\sum_{i=1}^{N} c^{(i)} I(A^{(i)})
\right\|_2^2
$$

其中 $I(A^{(i)})$ 是与 PPO clipping 和 advantage 相关的项。由于这里优化的是目标数量维度上的组合，而不是参数空间梯度，复杂度从 $\mathcal{O}(n^2d)$ 降为 $\mathcal{O}(n)$。

直观上，PAMA 不再问“如何在十亿维梯度空间中组合多个目标”，而是问“如何基于每个目标当前的 advantage 信号选择一个 Pareto 合理的组合”。

## 方法框架

本文方法主要包含四个部分：

1. **多目标 RLHF 问题形式化**  
   将策略优化从单一奖励扩展到多个奖励目标：
   $$
   \max_{\theta} (J^{(1)}(\theta),J^{(2)}(\theta),\dots,J^{(N)}(\theta))^\top
   $$

2. **Noon PPO**  
   Noon PPO 是 PPO 的一个变体。Noon 表示 “No Negative”，即将负 advantage 截断为 0：
   $$
   A_t=\max(A'_t,0)
   $$
   这样只让非负优势动作参与策略更新，减少不稳定梯度波动。

3. **PAMA 的凸优化重构**  
   原始多目标梯度 min-norm 问题被替换为关于 $I(A^{(i)})$ 的凸优化问题，避免显式构造高维梯度 Gram matrix。

4. **闭式解与 Pareto stationary 保证**  
   Theorem 1 表明，标量 convex combination 的最优值等于将 0 投影到 $[\min_i A^{(i)},\max_i A^{(i)}]$ 区间上。Theorem 2 进一步证明，在 Lipschitz smoothness、学习率有界、奖励有界等条件下，PAMA 收敛到 Pareto stationary point。

Noon PPO 的 clipped surrogate objective 为：

$$
\mathcal{L}^{\mathrm{NOON}}(\theta)
=
\mathbb{E}_t
\left[
\min
\left(
u_t(\theta)A_t,
\operatorname{clip}(u_t(\theta),1-\epsilon,1+\epsilon)A_t
\right)
\right]
$$

其中：

$$
u_t(\theta)=
\frac{\pi_{\theta}(a_t|s_t)}
{\pi_{\theta_{\mathrm{ref}}}(a_t|s_t)}
$$

Noon PPO 在 PAMA 中的重要作用是让 advantage 非负，从而有助于后续理论推导和稳定优化。

## 算法流程

PAMA 的算法流程可概括如下：

1. 输入 prompt 数据集 $D$、SFT policy $\pi(\cdot;\theta)$、目标数量 $N$。
2. 为语言模型添加 $N$ 个 value heads，对应 $N$ 个奖励目标。
3. 每轮迭代中从 $D$ 采样一批 prompts。
4. 对每个 prompt 生成 response。
5. 使用多个 reward models 得到奖励向量：
   $$
   \mathbf{R}(x_j,y_j)=
   (R^1(x_j,y_j),R^2(x_j,y_j),\dots,R^N(x_j,y_j))
   $$
6. 根据 Noon PPO 计算每个目标的 advantage。
7. 使用 Theorem 1 求解 PAMA 的闭式凸组合权重。
8. 用得到的组合目标进行策略梯度上升。
9. 更新 $N$ 个 Noon PPO value functions。
10. 返回优化后的 policy。

论文给出的伪代码位于 Appendix E。当前解析文本没有提供伪代码图像，只有文字版 Algorithm 1。

PAMA 的关键闭式解如下。对于：

$$
s^*=\sum_{i=1}^{N} c^{(i)}A^{(i)}
$$

最优值为：

$$
s ^ {*} =
\begin{cases}
0, & \text{if } \min_i A^{(i)} \leq 0 \leq \max_i A^{(i)} \\
\min_i A^{(i)}, & \text{if } A^{(i)} > 0 \text{ for all } i \\
\max_i A^{(i)}, & \text{if } A^{(i)} < 0 \text{ for all } i
\end{cases}
$$

换言之，$s^*$ 是 0 到区间 $[\min_i A^{(i)},\max_i A^{(i)}]$ 的投影。

## 实验设置

论文在三个规模的语言模型上验证 PAMA：

| 模型 | 参数量 | 数据集 | 目标 |
|---|---:|---|---|
| GPT-2 | 125M | IMDb | sentiment + length |
| GPT-2 XL | 1.5B | HH-RLHF / Helpful Assistant | humor + length |
| LLaMA-2 | 7B | HH-RLHF / Helpful Assistant | harmlessness + length |

对比方法包括：

- **MORLHF**：固定权重加权多个目标，是常见但可能次优的多目标 RLHF 标量化方法。
- **MGDA-UB**：基于 min-norm 思路的动态多目标梯度平衡方法。
- **PAMA**：本文方法。

实现细节：

- 基于 open-source TRL framework。
- 实验硬件：Intel i9-14900K CPU，单张 NVIDIA RTX A6000 GPU。
- Figure 1 使用 8 个固定随机种子并报告标准差阴影区域。
- Figure 2 和 Figure 3 因训练成本较高，使用单个固定随机种子。
- LLaMA-2 7B 实验中使用 8bit quantization 和 LoRA，LoRA r = 64，LoRA alpha = 128，LoRA dropout = 0.05。
- LLaMA-2 实验中 SFT 阶段对所有算法共享。

部分超参数如下：

| 项目 | GPT-2 设置 |
|---|---|
| Dataset | IMDb |
| Sentiment model | `https://huggingface.co/lvwerra/distilbert-imdb` |
| Length reward | `numpy.clip(l/140, min=70/140, max=210/140)` |
| Batch size | 128 |
| Epoch | 1 |

| 项目 | GPT-2 XL 设置 |
|---|---|
| Dataset | Helpful Assistant |
| Humor reward | Humor no humor |
| Length reward | `numpy.clip(l/140, 0, 4096/140)` |
| Evaluation frequency | 每 50 training steps |
| Epoch | 1 |

| 项目 | LLaMA-2 7B 设置 |
|---|---|
| Dataset | Helpful Assistant |
| Harmless reward | gpt2 large harmless reward model |
| Length reward | `numpy.clip(l/140, 0, 4096/140)` |
| Quantization | 8bit |
| Fine-tuning | LoRA |
| Optimizer | Adam |
| RLHF learning rate | 1e-5 |
| KL regularization | 0.2 |
| Cliprange | 0.2 |
| Target KL | 3 |

## 主要结果

### GPT-2 125M：sentiment + length

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-01.jpg]]

图 1 的 length reward 曲线显示，在 IMDb 上使用 GPT-2 训练时，PAMA 在长度目标上比 MORLHF 和 MGDA-UB 提升更明显，并呈现较稳定的收敛趋势。阴影区域表示 8 次实验的标准差，用于反映稳定性。

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-02.jpg]]

图 1 的 sentiment reward 曲线显示，PAMA 在情感奖励上同样优于两个 baseline。论文指出 MORLHF 停滞在较低水平，MGDA-UB 没有展现出相对 MORLHF 的优势。

GPT-2 测试集平均奖励如下：

| Reward | MGDA-UB | MORLHF | PAMA (Ours) |
|---|---:|---:|---:|
| Sentiment | 1.4734 | 1.6224 | 2.3159 |
| Length | 1.1943 | 1.2288 | 1.4179 |

该表说明 PAMA 在 sentiment 与 length 两个目标上均取得最高分，支持其多目标平衡能力。

### GPT-2 XL 1.5B：humor + length

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-03.jpg]]

图 2 的 humor reward 曲线显示，PAMA 能持续提升 humor 奖励，而 MORLHF 只出现边际提升后趋于平台，MGDA-UB 则表现为下降或失效。该实验体现了固定加权方法在多目标冲突下可能偏向部分目标的问题。

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-04.jpg]]

图 2 的 length reward 曲线显示，PAMA 与 MORLHF 都能优化 length，但论文强调 MORLHF 更像是只优化长度而忽视 humor。MGDA-UB 在该设置下出现明显退化。

### LLaMA-2 7B：harmlessness + length

当前“可用图表”列表中没有提供 LLaMA-2 7B 主文 Figure 3 对应的图片文件，但正文摘取中描述了该图。根据正文，Figure 3 展示了 PAMA 在 harmlessness 与 length 两个目标上都能稳定提升，而 MORLHF 与 MGDA-UB 在 harmlessness 上存在较大波动或收敛到较低水平。具体图片待补充原文/PDF 后确认。

LLaMA-2 7B 测试集平均奖励如下：

| Reward | MGDA-UB | MORLHF | PAMA (Ours) |
|---|---:|---:|---:|
| Harmlessness | -0.2844 | -0.1313 | 0.4406 |
| Length | 9.0842 | 5.3502 | 3.1400 |

该表需要谨慎解读：PAMA 在 harmlessness 上显著优于 baselines；length 数值上 MGDA-UB 更高，但论文表述为 MGDA-UB 和 MORLHF 难以平衡冲突目标，而 PAMA 有效优化 harmlessness 和 length。由于 length reward 的定义与实际生成长度可能存在差异，进一步细节待补充原文/PDF 后确认。

### 附加实验：生成长度与训练过程

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-05.jpg]]

图 4 展示 GPT-2 125M 训练过程中实际生成文本长度的变化。它用于补充说明 length reward 的提升是否对应真实生成长度变化，而不只是奖励模型数值变化。

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-06.jpg]]

图 5 展示 GPT-2 XL 1.5B 在测试集上的生成文本长度。该图用于观察不同方法在更大模型上对生成长度的影响。

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-07.jpg]]

图 6 的 length reward 训练曲线显示，在 GPT-2 XL 1.5B 与 HH-RLHF 设置下，PAMA 在 length reward 上表现优于 baseline。该图是 Figure 2 之外的附加验证结果。

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-08.jpg]]

图 6 的 humor reward 训练曲线进一步显示，PAMA 在 humor reward 上也保持优势，说明其不是单纯牺牲质量目标来换取长度收益。

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/mineru-figure-09.jpg]]

图 7 展示 GPT-2 XL 1.5B 训练过程中实际生成长度的变化。它补充验证了 reward 曲线和实际生成行为之间的关系。

### 总体结论

跨 125M、1.5B、7B 三个模型规模，PAMA 的主要优势是：

- 多目标奖励同时提升或取得更好折中；
- 训练曲线更稳定；
- 相比 MORLHF 更少受固定权重影响；
- 相比 MGDA-UB 更适合 LLM 参数规模；
- 理论复杂度与实践可运行性更匹配。

## 创新点

1. **提出 PAMA 作为 LLM 多目标对齐算法**  
   PAMA 面向 Multi-Objective Alignment，不是简单把多个奖励加权成一个奖励，而是从 Pareto stationarity 的角度构造对齐算法。

2. **将高维梯度 min-norm 问题转化为低维凸优化问题**  
   传统 MOO 需要在参数空间中计算多个目标的梯度组合，复杂度依赖 $d$。PAMA 通过 Noon PPO advantage 的结构，将问题转化为目标维度上的闭式优化。

3. **复杂度从 $\mathcal{O}(n^2d)$ 降到 $\mathcal{O}(n)$**  
   这是本文最重要的工程和理论卖点，使得十亿参数模型上的多目标对齐变得可行。

4. **提供 Pareto stationary convergence guarantee**  
   在 Lipschitz smoothness、有界学习率、有界奖励等假设下，论文证明 PAMA 收敛到 Pareto stationary point。

5. **在多个模型规模上验证**  
   实验覆盖 GPT-2 125M、GPT-2 XL 1.5B、LLaMA-2 7B，展示了方法的可扩展性。

## 局限性

1. **理论保证依赖假设**  
   收敛证明依赖梯度 Lipschitz 连续、有界学习率、有界奖励等条件。深度神经网络和 RLHF 实践中这些条件是否严格成立，需要进一步讨论。

2. **Pareto stationary 不等于全局 Pareto optimal**  
   论文证明的是收敛到 Pareto stationary point，这是多目标优化中的一阶必要条件，并不保证达到全局 Pareto 最优。

3. **实验目标数量较少**  
   当前主要实验是两个目标的组合，例如 sentiment + length、humor + length、harmlessness + length。多于两个目标时的效果，正文中没有充分展示，待补充原文/PDF 后确认。

4. **人类偏好评估不足**  
   现有实验主要基于 reward models 和长度函数。是否经过人工评估、是否存在 reward hacking，当前解析文本中未发现明确说明。

5. **LLaMA-2 7B 的结果解读需要更细粒度分析**  
   表 4 中 length 数值最高的是 MGDA-UB，但论文仍称 PAMA 更好地平衡 harmlessness 和 length。这里可能涉及 reward 定义、实际生成长度、目标冲突权衡等因素，需结合完整图和实验细节进一步确认。

6. **代码仓库未发现 PAMA 专用实现链接**  
   文中提到基于 TRL，但当前解析文本未发现 PAMA 官方代码链接。

## 相关概念

- [[多目标优化]]
- [[强化学习从人类反馈]]
- [[大语言模型对齐]]
- [[多目标强化学习]]
- [[Pareto Front]]
- [[Pareto Stationary Point]]
## 相关方法

- [[PAreto Multi-Objective Alignment]]
- [[Noon PPO]]
- [[MORLHF]]
- [[MGDA-UB]]
## 相关数据集

- [[IMDb]]
- [[HH-RLHF]]
- [[Helpful Assistant]]
## 相关模型

- [[Llama]]
## 相关论文

- [[Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback]]
- [[Proximal Policy Optimization Algorithms]]
- [[Multiple-Gradient Descent Algorithm]]
- [[Multi-task Learning as Multi-objective Optimization]]
- [[Conflict-Averse Gradient Descent for Multi-task Learning]]
- [[Rewards-in-Context]]

## 源文件

- citekey: `heParetoMultiObjectiveAlignment2025`
- title: `Pareto Multi-Objective Alignment for Language Models`
- authors: Qiang He, Setareh Maghsudi
- year: 2025
- DOI: `10.48550/ARXIV.2508.07768`
- source: MinerU full.md
- Zotero collection: 多目标分子优化
- Zotero note: Accepted at ECML/PKDD 2025

## 代码与数据

### 代码

未在当前解析文本中发现明确代码仓库。

### 数据集 / Benchmark

- https://huggingface.co/lvwerra/distilbert-imdb

### 其他链接

- https://github.com/huggingface/trl
- https://doi.org/10.48550/ARXIV.2303.08774
- https://huggingface.co/openai-community/gpt2
- https://doi.org/10.48550/ARXIV.2204.05862
- https://doi.org/10.1613/JAIR.1.15702
- https://doi.org/10.1109/CVPR52729.2023.01936
- https://openreview.net/forum?id=apXtolxDaJ

## Zotero 原始摘要

Large language models (LLMs) are increasingly deployed in real-world applications that require careful balancing of multiple, often conflicting, objectives, such as informativeness versus conciseness, or helpfulness versus creativity. However, current alignment methods, primarily based on reinforcement learning from human feedback (RLHF), optimize LLMs toward a single reward function, resulting in rigid behavior that fails to capture the complexity and diversity of human preferences. This limitation hinders the adaptability of LLMs to practical scenarios, making multi-objective alignment (MOA) a critical yet underexplored area. To bridge this gap, we propose PAreto Multi-Objective Alignment (PAMA), a principled and computationally efficient algorithm designed explicitly for MOA in LLMs. In contrast to computationally prohibitive gradient-based multi-objective optimization (MOO) methods, PAMA transforms multi-objective RLHF into a convex optimization problem with a closed-form solution, significantly enhancing scalability. Traditional gradient-based MOO approaches suffer from prohibitive O(n2d) complexity, where d represents the number of model parameters, typically in the billions for LLMs, rendering direct optimization infeasible. PAMA reduces this complexity to O(n) where n is the number of objectives, enabling optimization to be completed within milliseconds. We provide theoretical guarantees that PAMA converges to a Pareto stationary point, where no objective can be improved without degrading at least one other. Extensive experiments across language models ranging from 125M to 7B parameters demonstrate PAMA’s robust and effective multi-objective alignment capabilities, consistently outperforming baseline methods, aligning with its theoretical advantages. PAMA provides a highly efficient solution to the MOA problem that was previously considered intractable, offering a practical and theoretically grounded approach to aligning LLMs with diverse human values, paving the way for versatile and adaptable real-world AI deployments.

## Zotero 原始笔记

Other

Accepted at ECML/PKDD 2025

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的关键价值在于，它没有直接沿用经典 MOO 的“多目标梯度聚合”路线，而是利用 PPO/RLHF 结构中的 advantage 信号，把问题降维到目标数量维度上。对于 LLM 来说，这一点非常重要，因为参数维度 $d$ 太大，任何需要在全参数空间构造多目标梯度 Gram matrix 的方法都会迅速变得不现实。

PAMA 的思想可以理解为一种“面向 RLHF 结构特化的 Pareto 优化”：它并不是通用地解决所有 MOO 问题，而是针对 Noon PPO 的 advantage 形式，找到一个可解析、可扩展、具有 Pareto stationary 解释的权重选择机制。这样做牺牲了一定通用性，但换来了在 LLM 上实际运行的可能性。

值得注意的是，PAMA 的理论保证是 Pareto stationary，而不是全局 Pareto optimal；这与多数非凸深度学习优化理论类似。实际应用中，PAMA 更像是一种稳定且低成本的动态多目标权重机制，特别适合多个 reward model 同时参与 RLHF 的场景。

从实验看，PAMA 的优势主要体现在稳定性与冲突目标平衡上。MORLHF 固定加权容易偏向某个目标，MGDA-UB 虽然动态平衡但在大模型训练中不稳定。PAMA 则通过避免高维梯度操作，在训练稳定性和效率之间取得较好折中。

## 后续问题

1. PAMA 在超过两个目标时是否仍然稳定？例如同时优化 helpfulness、harmlessness、honesty、conciseness、style 等多个奖励。
2. Noon PPO 将负 advantage 截断为 0 是否会导致某些重要的负反馈信息丢失？
3. PAMA 是否会引发 reward hacking，尤其是在 length reward 这类容易被模型利用的目标上？
4. PAMA 与 DPO、IPO、KTO 等非 PPO 对齐方法能否结合？
5. PAMA 是否能输出一组 Pareto front 上的可控策略，而不仅是一个折中策略？
6. 在真实用户偏好而非 reward model 评价下，PAMA 的多目标对齐优势是否仍然成立？
7. LLaMA-2 7B 表 4 中 length 数值与论文“有效优化 length”的表述之间如何解释？需要结合完整 PDF、图 3 和 reward 定义进一步确认。
8. PAMA 是否有官方代码或复现实验脚本？当前解析文本未发现，需要后续检索 arXiv 页面或作者主页。
