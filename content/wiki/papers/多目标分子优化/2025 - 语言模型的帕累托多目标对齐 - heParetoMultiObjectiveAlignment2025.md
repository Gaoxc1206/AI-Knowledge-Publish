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
# Pareto Multi-Objective Alignment for Language Models

## 一句话总结

这篇论文提出 **PAreto Multi-Objective Alignment (PAMA)**，将大语言模型的多目标对齐问题从昂贵的梯度式多目标优化转化为带闭式解的凸优化近似，在理论上收敛到Pareto stationary point，并在 **GPT-2、GPT-2 XL、LLaMA-2 7B** 上验证其相比 **MORLHF** 和 **MGDA-UB** 更稳定、更高效。

## 研究问题

当前主流大语言模型对齐方法主要基于RLHF，通常把人类偏好压缩成单一奖励函数进行优化。但真实应用中，模型往往需要同时平衡多个可能冲突的目标，例如：

- 信息量 vs. 简洁性
- 有用性 vs. 创造性
- 安全性/无害性 vs. 回复长度
- 情感积极性 vs. 文本长度
- 幽默性 vs. 文本长度

论文关注的问题是：

> 如何在不引入不可承受计算开销的前提下，对大语言模型进行多目标对齐，使模型能够在多个冲突奖励之间达到合理的 Pareto 折中？

具体挑战包括：

1. **单目标 RLHF 过于僵化**  
   单一奖励函数难以表达多样化人类偏好。

2. **简单加权和方法存在偏置**  
   将多个奖励线性加权为一个标量目标会高度依赖权重选择，容易忽略部分目标。

3. **传统梯度式 MOO 不适合 LLM 规模**  
   如 **MGDA**、**PCGrad**、**CAGrad** 等方法需要对多个目标分别计算高维梯度并进行聚合，复杂度通常为 $O(n^2 d)$，其中：
   - $n$：目标数量
   - $d$：模型参数量  
   对于几十亿参数的 LLM，这一复杂度不可接受。

## 背景与动机

论文的背景是大语言模型对齐与多目标优化的交叉。

### 单目标 RLHF 的局限

标准RLHF一般包含两个阶段：

1. **奖励建模**  
   根据人类偏好数据训练奖励模型：

   $$
   L_{RM} = \mathbb{E}_{(x,y_w,y_l)\sim D}
   [\log(\sigma(r(x,y_w)-r(x,y_l)))]
   $$

   其中：
   - $x$ 是 prompt
   - $y_w$ 是偏好回复
   - $y_l$ 是较差回复
   - $r(x,y)$ 是奖励函数

2. **策略优化**  
   通常使用 **PPO** 优化：

   $$
   \arg\max_{\pi(y|x;\theta)}
   \mathbb{E}_{x\sim D,y\sim \pi(\cdot|x)}
   \left[
   r(x,y) - \beta \log \frac{\pi(y|x;\theta)}{\pi_{ref}(y|x)}
   \right]
   $$

   其中 $\pi_{ref}$ 通常是 SFT 后的参考策略。

问题在于，该过程一般只优化一个奖励函数，难以建模多个偏好维度。

### 多目标对齐的必要性

论文将多目标对齐形式化为：

$$
\max_\theta
\left(
J^{(1)}(\theta),
J^{(2)}(\theta),
\ldots,
J^{(N)}(\theta)
\right)^\top
$$

目标是找到Pareto optimality意义下的解，即不存在另一个策略能够在不降低任何目标的情况下提升至少一个目标。

### 传统 MOO 方法的计算瓶颈

典型梯度式多目标优化方法会求解类似的 min-norm 问题：

$$
\min_{c^{(1)},...,c^{(N)}}
\left\|
\sum_{i=1}^N c^{(i)} \nabla_\theta L^{(i)}(\theta)
\right\|_2^2
$$

约束为：

$$
\sum_{i=1}^N c^{(i)} = 1,\quad c^{(i)} \geq 0
$$

该方法需要构造目标梯度之间的 Gram matrix，复杂度近似为：

$$
O(n^2 d)
$$

当 $d$ 是 LLM 的数十亿参数时，方法难以直接应用。

## 核心思想

论文提出 **PAreto Multi-Objective Alignment (PAMA)**，核心思想是：

> 不直接在参数空间中求解高维梯度组合，而是利用 **Noon PPO** 的特殊结构，把多目标 PPO 的梯度组合问题转化为一个只依赖目标数量 $n$ 的凸优化问题，并进一步得到闭式解。

PAMA 的关键设计包括：

1. **引入 Noon PPO**
   - Noon 表示 “No Negative”。
   - 将 advantage 中的负值截断为 0：
     $$
     A_t = \max(A'_t, 0)
     $$
   - 只保留非负优势动作的更新，减少不稳定梯度波动。

2. **用 advantage 相关项近似/上界原始 min-norm 梯度问题**
   - 原始问题涉及 $\nabla_\theta L^{(i)}$，维度与模型参数量相关。
   - PAMA 将其转化为关于 $I(A^{(i)})$ 的组合优化。

3. **闭式解**
   - 对如下问题：
     $$
     \min_{c^{(1)},...,c^{(N)}}
     \left(
     \sum_{i=1}^N c^{(i)} A^{(i)}
     \right)^2
     $$
     subject to:
     $$
     \sum_i c^{(i)}=1,\quad c^{(i)}\geq 0
     $$
   - 最优组合值 $s^*$ 是 0 在区间
     $$
     [\min_i A^{(i)}, \max_i A^{(i)}]
     $$
     上的投影。

4. **复杂度从 $O(n^2 d)$ 降到 $O(n)$**
   - 不再需要显式构造高维梯度 Gram matrix。
   - 计算成本主要随目标数量线性增长。

## 方法框架

PAMA 的方法框架可以分为以下部分：

### 1. 多目标 RLHF 设置

假设有 $N$ 个奖励模型：

$$
R(x,y) =
\left(
R_1(x,y),
R_2(x,y),
\ldots,
R_N(x,y)
\right)
$$

每个奖励模型对应一个目标。

论文聚焦于策略优化阶段，即假定奖励模型已经存在，不重点研究奖励模型训练。

### 2. Noon PPO

标准 PPO 中使用 advantage $A'_t$。PAMA 使用 **Noon PPO**：

$$
A_t = \max(A'_t, 0)
$$

概率比为：

$$
u_t(\theta)=
\frac{\pi_\theta(a_t|s_t)}
{\pi_{\theta_{ref}}(a_t|s_t)}
$$

Noon PPO 的 clipped surrogate objective 为：

$$
L_{NOON}(\theta)
=
\mathbb{E}_t
\left[
\min
\left(
u_t(\theta) A_t,
\operatorname{clip}(u_t(\theta),1-\epsilon,1+\epsilon)A_t
\right)
\right]
$$

由于负 advantage 被截断为 0，Noon PPO 只鼓励提升非负优势动作的概率。

### 3. PAMA 的优化重写

传统 min-norm 多目标问题为：

$$
\min_c
\left\|
\sum_{i=1}^{N}
c^{(i)} \nabla_\theta L^{(i)}(\theta)
\right\|_2^2
$$

PAMA 利用 Noon PPO 结构推导上界：

$$
\left\|
\sum_{i=1}^{N}
c^{(i)}
\nabla_\theta L^{(i)}(\theta)
\right\|_2^2
\leq
\left\|
\sum_{i=1}^{N}
c^{(i)} I(A^{(i)})
\right\|_2^2
\left\|
\frac{1}{\pi_{ref}}\nabla_\theta \pi(\theta)
\right\|_2^2
$$

其中 $I(A)$ 在正文中定义为：

$$
I(A)=
\begin{cases}
0, & u > 1+\epsilon \\
A, & u \leq 1+\epsilon
\end{cases}
$$

于是原始高维优化变成：

$$
\min_{c^{(1)},...,c^{(N)}}
\left\|
\sum_{i=1}^{N} c^{(i)} I(A^{(i)})
\right\|_2^2
$$

约束为：

$$
\sum_i c^{(i)}=1,\quad c^{(i)}\geq 0
$$

### 4. 闭式解

论文定理 1 给出如下结论。

对于：

$$
\min_c
\left(
\sum_i c^{(i)} A^{(i)}
\right)^2
$$

最优组合值为：

$$
s^* =
\begin{cases}
0, & \min_i A^{(i)} \leq 0 \leq \max_i A^{(i)} \\
\min_i A^{(i)}, & A^{(i)} > 0 \ \forall i \\
\max_i A^{(i)}, & A^{(i)} < 0 \ \forall i
\end{cases}
$$

也就是说，$s^*$ 是 0 到区间 $[\min_i A^{(i)}, \max_i A^{(i)}]$ 的投影。

### 5. 理论保证

论文证明，在以下假设下，PAMA 收敛到 Pareto stationary point：

- 梯度满足 $\kappa$-Lipschitz smoothness
- 学习率有界：
  $$
  0 \leq \eta \leq \frac{2}{\kappa}
  $$
- 奖励有界：
  $$
  |r(x,y)| \leq R_{max}
  $$

结论是：

$$
\lim_{k\to\infty}
\|\nabla_\theta L(\theta_k)\|_2 = 0
$$

并最终满足 Pareto stationary condition：

$$
\sum_{i=1}^{N}
c^{(i)} \nabla_\theta L^{(i)}(\theta^*) = 0
$$

## 算法流程

根据论文附录 Algorithm 1，**PAMA** 流程如下：

1. 输入 prompt 数据集 $D$。
2. 初始化 SFT policy：
   $$
   \pi(\cdot;\theta)
   $$
3. 给语言模型添加 $N$ 个 value heads，每个目标对应一个 value function。
4. 设置训练迭代次数 $T$ 和 mini-batch size $B$。
5. 对每轮训练：
   1. 从数据集 $D$ 中采样一批 prompts $x_j$。
   2. 使用当前策略生成回复：
      $$
      y_j \sim \pi(x_j;\theta)
      $$
   3. 使用多个 reward models 计算奖励向量：
      $$
      R(x_j,y_j)=
      (R_1(x_j,y_j),...,R_N(x_j,y_j))
      $$
   4. 计算 Noon PPO advantage。
   5. 根据定理 1 求解 PAMA 的闭式组合权重。
   6. 使用该组合进行策略梯度更新。
   7. 优化 $N$ 个 value functions。
6. 返回优化后的 policy。

可抽象为：

```text
Input: prompt dataset D, SFT policy πθ, N reward models
For each iteration:
    sample prompts
    generate responses
    compute N rewards
    compute Noon PPO advantages
    solve convex combination by closed-form PAMA rule
    update policy with aggregated Noon PPO objective
    update N value heads
Return aligned policy
```

## 实验设置

论文在三个模型规模上评估 PAMA：

### 模型

1. **GPT-2**
   - 参数量：125M

2. **GPT-2 XL**
   - 参数量：1.5B

3. **LLaMA-2**
   - 参数量：7B

### 数据集

使用的数据集包括：

- **IMDb**
  - 用于电影评论生成。
  - 目标：积极情感 + 较长回复。

- **HH-RLHF**
  - 用于 helpful/harmless assistant 风格数据。
  - 目标包括幽默性、无害性、回复长度。

### 奖励模型与目标

#### GPT-2 / IMDb

目标：

1. 积极情感 reward
   - 使用预训练情感分类模型：
     **lvwerra/distilbert-imdb**
2. 长度 reward
   - 鼓励更长电影评论。

#### GPT-2 XL / HH-RLHF

目标：

1. 幽默 reward
   - 使用 humor classifier：
     **mohameddhiab/humor-no-humor**
2. 长度 reward

#### LLaMA-2 7B / HH-RLHF

目标：

1. 无害性 reward
   - 使用：
     **Ray2333/gpt2-large-harmless-reward_model**
2. 长度 reward

### Baselines

论文比较了：

1. **MORLHF**
   - 使用固定权重加权和的多目标 RLHF 方法。
   - 问题：权重固定，难以平衡冲突目标。

2. **MGDA-UB**
   - **MGDA** 的近似版本。
   - 通过 upper bound 降低多目标梯度计算成本。
   - 论文中观察到其在部分 LLM 设置下不稳定。

3. **PAMA**
   - 本文方法。

### 计算资源

实验环境：

- GPU：单张 **NVIDIA RTX A6000 48G**
- CPU：**Intel i9-14900K**
- 内存：128G
- 实现基于 **TRL** 框架。

### 训练细节

从附录表格可知：

#### GPT-2 实验

- Dataset：**IMDb**
- Batch size：128
- Epoch：1
- 评价：训练后评估
- 长度 reward：
  $$
  \operatorname{clip}(l/140, min=70/140, max=210/140)
  $$

#### GPT-2 XL 实验

- Dataset：**Helpful Assistant / HH-RLHF**
- 任务：生成幽默且较长的回答
- Evaluation frequency：每 50 training steps
- Epoch：1
- 长度 reward：
  $$
  \operatorname{clip}(l/140,0,4096/140)
  $$

#### LLaMA-2 7B 实验

- Dataset：**Helpful Assistant / HH-RLHF**
- 任务：生成无害且较长的回答
- 训练量化：8bit
- Fine-tuning：**LoRA**
- LoRA r：64
- LoRA alpha：128
- LoRA dropout：0.05
- Optimizer：Adam
- Batch size：32
- RLHF KL regularization：0.2
- Learning rate：$1e^{-5}$
- GAE lambda：0.95
- Gamma：1
- Cliprange：0.2
- Target KL：3

## 主要结果

### GPT-2 125M：IMDb，积极情感 + 长度

论文 Figure 1 显示：

- **PAMA** 在 sentiment reward 和 length reward 上均优于 **MORLHF** 与 **MGDA-UB**。
- **MORLHF** 改善缓慢，受固定权重限制。
- **MGDA-UB** 没有表现出比 MORLHF 明显优势。

附录 Table 3 给出测试集均值：

| Reward | MGDA-UB | MORLHF | PAMA |
|---|---:|---:|---:|
| Sentiment | 1.4734 | 1.6224 | 2.3159 |
| Length | 1.1943 | 1.2288 | 1.4179 |

结论：PAMA 在两个目标上同时取得最高分。

### GPT-2 XL 1.5B：HH-RLHF，幽默 + 长度

论文 Figure 2 显示：

- **PAMA** 能稳定提升 humor reward。
- **MORLHF** 主要优化长度，对幽默提升有限。
- **MGDA-UB** 在该设置下出现明显退化，humor 和 length 都表现较差。

结论：PAMA 在中等规模 LLM 上表现出更好的多目标平衡能力。

### LLaMA-2 7B：HH-RLHF，无害性 + 长度

论文 Figure 3 显示：

- **PAMA** 在 harmlessness reward 上稳定提升。
- **MORLHF** 收敛到较低性能。
- **MGDA-UB** 训练过程波动明显，不稳定。
- PAMA 在长度 reward 上也保持稳定优化。

附录 Table 4 给出测试集均值：

| Reward | MGDA-UB | MORLHF | PAMA |
|---|---:|---:|---:|
| Harmlessness | -0.2844 | -0.1313 | 0.4406 |
| Length | 9.0842 | 5.3502 | 3.1400 |

需要注意：表中 PAMA 的 harmlessness 最高，但 length 数值低于 MGDA-UB 和 MORLHF。论文解释为 PAMA 更好地平衡了冲突目标，而不是单纯追求长度。此处是否存在 reward scale 或目标权衡解释上的细节，需要进一步结合完整实验设置确认。

### 总体结论

论文认为实验结果验证了：

1. PAMA 在不同模型规模上均有效。
2. PAMA 比固定加权的 **MORLHF** 更能平衡冲突目标。
3. PAMA 比 **MGDA-UB** 更稳定。
4. PAMA 的理论复杂度优势能够转化为实际训练可行性。
5. PAMA 可以在单张 **NVIDIA RTX A6000** 上微调 **LLaMA-2 7B**。

## 创新点

1. **提出 PAMA：面向 LLM 的多目标对齐算法**  
   论文声称 PAMA 是第一个有理论保证、适用于 LLM 的高效多目标对齐算法之一。

2. **复杂度显著降低**  
   将传统梯度式 MOO 的复杂度从：

   $$
   O(n^2 d)
   $$

   降低到：

   $$
   O(n)
   $$

   其中 $d$ 是模型参数量，$n$ 是目标数量。

3. **引入 Noon PPO**  
   通过截断负 advantage：

   $$
   A_t=\max(A'_t,0)
   $$

   减少不稳定更新，并服务于后续理论推导。

4. **将多目标 PPO 优化转化为闭式解凸优化问题**  
   避免显式计算和聚合高维参数梯度。

5. **给出 Pareto stationary convergence 理论保证**  
   在 Lipschitz smoothness、有界学习率、有界奖励等假设下，证明 PAMA 收敛到 Pareto stationary point。

6. **跨模型规模实验验证**
   - **GPT-2 125M**
   - **GPT-2 XL 1.5B**
   - **LLaMA-2 7B**

## 局限性

1. **理论保证是 Pareto stationary，而非 Pareto optimal**
   - 论文证明的是收敛到Pareto stationary point。
   - Pareto stationary 是 Pareto optimal 的必要条件，不一定是充分条件。

2. **依赖奖励模型质量**
   - 实验使用已有 reward models。
   - 如果 reward model 本身偏差较大，PAMA 仍可能优化错误方向。
   - 奖励模型训练阶段不是本文重点。

3. **实验目标数量较少**
   - 主实验多为两个目标：情感+长度、幽默+长度、无害性+长度。
   - 摘要中讨论 $n=10$ 的复杂度优势，但实际多目标数量扩展到更多目标的实验细节有限，需待补充原文/PDF 后确认更全面结果。

4. **PAMA 的闭式解基于特定上界与 Noon PPO 结构**
   - 方法是否能直接迁移到其他 RLHF 优化器，如 DPO、IPO、KTO 等，论文未充分展开。
   - 待补充原文/PDF 后确认。

5. **长度目标可能导致 reward hacking 风险**
   - 多个实验包含 length reward。
   - 如果没有额外质量约束，模型可能通过冗长输出获取高分。
   - 论文中虽有情感、幽默、无害性约束，但实际生成质量的人类评估情况不明确，待补充原文/PDF 后确认。

6. **LLaMA-2 7B 表格中 length reward 解读需要谨慎**
   - Table 4 中 PAMA 的 harmlessness 最优，但 length reward 低于 baselines。
   - 这支持“更平衡”但不等于所有指标均最高。
   - 需要结合 Pareto front 或更多定性样例判断。

7. **与更近期 LLM 对齐方法的比较不足**
   - Baseline 主要是 MORLHF 和 MGDA-UB。
   - 未看到与 **Rewarded Soups**、**Rewards-in-Context**、**MOC** 等方法的直接实验比较，至少正文摘取中没有充分展示。

## 相关概念

- [[大语言模型]]
- [[LLM Alignment]]
- [[大语言模型对齐]]
- [[RLHF]]
- [[Reinforcement Learning from Human Feedback]]
- [[PPO]]
- [[Proximal Policy Optimization]]
- [[Noon PPO]]
- [[多目标优化]]
- [[Multi-Objective Optimization]]
- [[多目标强化学习]]
- [[Multi-Objective Reinforcement Learning]]
- [[多目标对齐]]
- [[Multi-Objective Alignment]]
- [[Pareto optimality]]
- [[Pareto stationary point]]
- [[Pareto front]]
- [[KKT condition]]
- [[凸优化]]
- [[闭式解]]
- [[梯度聚合]]
- [[奖励模型]]
- [[奖励标量化]]
- [[线性标量化]]
- [[LoRA]]
- [[TRL]]
- [[HH-RLHF]]
- [[IMDb]]
- [[安全对齐]]
- [[无害性奖励]]
- [[长度奖励]]
- [[幽默奖励]]
- [[情感奖励]]

## 相关方法

- [[PAMA]]
- [[PAreto Multi-Objective Alignment]]
- [[Noon PPO]]
- [[PPO]]
- [[RLHF]]
- [[MORLHF]]
- [[MGDA]]
- [[MGDA-UB]]
- [[PCGrad]]
- [[CAGrad]]
- [[ICA]]
- [[Independent Component Alignment]]
- [[MOC]]
- [[Multi-Objective Controllable Language Models]]
- [[Rewarded Soups]]
- [[Rewards-in-Context]]
- [[Envelope Q-Learning]]
- [[Pareto Q-learning]]
- [[Scalarized MORL]]
- [[Multi-objective reinforcement learning based on decomposition]]

## 相关论文

- **Pareto Multi-Objective Alignment for Language Models**  
  - 本文。
  - citekey: `heParetoMultiObjectiveAlignment2025`

- **Training a helpful and harmless assistant with reinforcement learning from human feedback**  
  - Bai et al., 2022。
  - 与 **HH-RLHF** 数据集和 helpful/harmless alignment 相关。

- **Training language models to follow instructions with human feedback**  
  - Ouyang et al., 2022。
  - InstructGPT/RLHF 经典工作。

- **Proximal Policy Optimization Algorithms**  
  - Schulman et al., 2017。
  - **PPO** 基础方法。

- **Multiple-Gradient Descent Algorithm (MGDA)**  
  - Désidéri, 2009。
  - 经典[[多目标优化]]梯度法。

- **Multi-task learning as multi-objective optimization**  
  - Sener and Koltun, 2018。
  - **MGDA-UB** 相关。

- **Gradient surgery for multi-task learning**  
  - Yu et al., 2020。
  - **PCGrad**。

- **Conflict-averse gradient descent for multi-task learning**  
  - Liu et al., 2021。
  - **CAGrad**。

- **Independent Component Alignment for Multi-Task Learning**  
  - Senushkin et al., 2023。
  - **ICA**。

- **Rewarded Soups: towards Pareto-optimal alignment by interpolating weights fine-tuned on diverse rewards**  
  - Ramé et al., 2023。
  - 与多奖励/多目标对齐相关。

- **Rewards-in-Context: Multi-objective alignment of foundation models with dynamic preference adjustment**  
  - Yang et al., 2024。
  - 与动态偏好调节和多目标基础模型对齐相关。

- **One model for all: Multi-objective controllable language models**  
  - He et al., 2025。
  - 文中简称 **MOC**，与可控多目标语言模型相关。

## 源文件

- citekey: `heParetoMultiObjectiveAlignment2025`
- title: **Pareto Multi-Objective Alignment for Language Models**
- authors: Qiang He, Setareh Maghsudi
- year: 2025
- venue: 待补充原文/PDF 后确认；Zotero 笔记显示 Accepted at ECML/PKDD 2025
- DOI: `10.48550/ARXIV.2508.07768`
- arXiv: `2508.07768`
- collections: 多目标分子优化

## 图表摘录

![[raw/zotero/images/多目标分子优化/2025 - 语言模型的帕累托多目标对齐 - heParetoMultiObjectiveAlignment2025/page-001.png]]

## Zotero 原始摘要

Large language models (LLMs) are increasingly deployed in real-world applications that require careful balancing of multiple, often conflicting, objectives, such as informativeness versus conciseness, or helpfulness versus creativity. However, current alignment methods, primarily based on reinforcement learning from human feedback (RLHF), optimize LLMs toward a single reward function, resulting in rigid behavior that fails to capture the complexity and diversity of human preferences. This limitation hinders the adaptability of LLMs to practical scenarios, making multi-objective alignment (MOA) a critical yet underexplored area. To bridge this gap, we propose PAreto Multi-Objective Alignment (PAMA), a principled and computationally efficient algorithm designed explicitly for MOA in LLMs. In contrast to computationally prohibitive gradient-based multi-objective optimization (MOO) methods, PAMA transforms multi-objective RLHF into a convex optimization problem with a closed-form solution, significantly enhancing scalability. Traditional gradient-based MOO approaches suffer from prohibitive O(n2d) complexity, where d represents the number of model parameters, typically in the billions for LLMs, rendering direct optimization infeasible. PAMA reduces this complexity to O(n) where n is the number of objectives, enabling optimization to be completed within milliseconds. We provide theoretical guarantees that PAMA converges to a Pareto stationary point, where no objective can be improved without degrading at least one other. Extensive experiments across language models ranging from 125M to 7B parameters demonstrate PAMA’s robust and effective multi-objective alignment capabilities, consistently outperforming baseline methods, aligning with its theoretical advantages. PAMA provides a highly efficient solution to the MOA problem that was previously considered intractable, offering a practical and theoretically grounded approach to aligning LLMs with diverse human values, paving the way for versatile and adaptable real-world AI deployments.

## Zotero 原始笔记

Other

Accepted at ECML/PKDD 2025

## PDF 标注

暂无从 Zotero 读取到的 PDF 标注。

## 我的理解

这篇论文的核心贡献不是简单地“把多个 reward 加起来”，而是尝试解决 LLM 多目标对齐中最关键的工程瓶颈：传统多目标优化需要在巨大参数空间里处理多个目标梯度，导致计算成本随参数量 $d$ 爆炸。

PAMA 的切入点比较巧妙：它利用 **Noon PPO** 让 advantage 非负化，然后把原本依赖参数梯度的 min-norm 问题，转化为只在目标维度上求解的凸问题。由于目标数量 $n$ 通常远小于参数量 $d$，这使得方法在 LLM 场景下具有实际意义。

我认为这篇论文有三点值得重点关注：

1. **它把 MOA 从“理论上合理但不可训练”推进到“LLM 上可训练”**
   - 如果复杂度真能接近标准单目标 PPO，那么多目标 RLHF 的实用性会明显提升。

2. **Noon PPO 是理论推导的关键**
   - 负 advantage 截断看似简单，但它让后续上界和收敛证明更容易成立。
   - 但这也意味着 PAMA 与 Noon PPO 深度绑定，是否适用于其他 preference optimization 方法仍需研究。

3. **实验支持了 PAMA 的稳定性，但还不完全等同于完整 Pareto front 建模**
   - PAMA 似乎更像是在训练中动态找一个稳定折中点。
   - 它不是显式学习整个 Pareto front，也不是让用户在推理时动态指定偏好。
   - 因此它与 Rewards-in-Context 或 MOC 这类“可控偏好”方法定位不同。

放在多目标分子优化集合中，这篇论文虽然对象是 LLM alignment，但它的思想可能对分子生成中的多目标奖励优化有启发：如果生成模型有多个性质奖励，例如活性、毒性、合成可行性、相似性等，传统加权和也会遇到权重敏感和目标冲突问题。PAMA 的“低维目标空间闭式权重求解”思路也许可以借鉴到分子生成 RL 或偏好优化中。

## 后续问题

1. **PAMA 是否能推广到 DPO/IPO/KTO 等非 PPO 对齐方法？**  
   当前推导依赖 Noon PPO 和 advantage 结构。若不使用 PPO，是否还能构造类似闭式解？

2. **PAMA 是否能学习完整 Pareto front？**  
   本文更关注收敛到 Pareto stationary point，而不是显式建模整个 Pareto front。若用户想动态调节偏好，是否需要结合 MOC 或 Rewards-in-Context？

3. **目标数量增加时表现如何？**  
   摘要强调复杂度为 $O(n)$，但主实验多为两个目标。需要更多 5 个、10 个甚至更多目标的实证验证。

4. **Noon PPO 截断负 advantage 是否会损失有用学习信号？**  
   负 advantage 通常用于降低坏动作概率。Noon PPO 忽略这部分更新，可能提升稳定性，但是否牺牲样本效率或导致保守更新？

5. **PAMA 在 reward hacking 场景下是否更稳健？**  
   长度 reward 容易诱导冗长输出。如果奖励模型不完善，PAMA 是否仍可能被某个目标牵引？

6. **与 Rewarded Soups、Rewards-in-Context、MOC 的直接比较如何？**  
   论文 related work 中提到这些方法，但正文摘取中未见直接实验比较。

7. **PAMA 对 reward scale 是否敏感？**  
   多目标优化中，不同 reward 的尺度差异会影响权重和优化轨迹。论文是否做了 reward normalization？从摘取内容看不完全明确，待补充原文/PDF 后确认。

8. **在多目标分子优化中是否可以借鉴 PAMA？**  
   如果把分子生成模型的多个性质预测器视为 reward models，是否可以用类似 PAMA 的方式避免手工设置加权和？这值得后续探索。
