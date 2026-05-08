# Vibe Coding Logs: Phase 1 - Architecture & PRD

*Note: The following logs represent iterative conversations with various AI assistants (Claude, Cursor) during the initial planning and architecture phase.*

## 1. Initial PRD and Mechanics Translation

**Human:**
> 这是一个基于西浦(XJTLU)申研知识库的生存抉择 Web 游戏。请你协助我构建项目。
> 
> # 项目概述
> *   **产品定位：** 面向西浦（XJTLU）学生的文字类生存抉择 Web 游戏（玩法类似《中国式家长》）。
> *   **开发策略：** 采用 MVP（最小可行性产品）模式。
> *   **时间跨度：** 核心玩法是大三上学期到大四上学期结束，结局结算在大四下学期开头。
> *   **核心目标：** 将老师提供的《申研知识库》（如中介避雷、雅思规划）无缝缝合进游戏抉择中，通过沉浸式旁白和数值压迫感，让玩家体验申研的真实残酷性。
> 
> 各种数值介绍：
> 心理健康、身体健康和资金：波动类数值，归零和满值都会导致游戏结束。
> 学力：每学期初清零。代表对当季专业课的掌握度。“期末考试”事件后根据此数值转化为 GPA 标签。
> 英语能力：在一局游戏内长期积累，决定雅思考试的出分概率。

**AI Assistant:**
[Provided initial state management design, separating resources from hidden abilities and introducing the Tag system for endings.]

## 2. Setting Visual and UI Guidelines

**Human:**
> ## 美术与视觉规范 (Art & UI Guidelines)
> *   **整体风格：** Notion 极简手账风 / 扁平矢量风。白底黑字，高对比度。
> *   **主色调：** 西浦蓝（Navy Blue）与 亮黄色（高亮/警告）。
> *   **核心吉祥物：** 一只穿着 XJTLU 蓝色 T 恤、带有黑眼圈的“疲惫白鹅”。采用深蓝色粗线条绘制。
> *   **UI 图标库：** 强制使用 **Lucide Icons**。
>     *   *前端要求：* 为匹配吉祥物的粗线条画风，所有 Lucide 图标的 CSS 属性需统一设置为 `stroke-width: 2.5px`，并保持 `stroke-linecap: round`。
> 
> 先设计一下本项目的 logo。我希望在该 emoji 🦢的基础上修改，加上学士帽，背上背着一杯咖啡。具体表情就不需要了。帮我写文生图 AI 的提示词。

**AI Assistant:**
[Generated Midjourney/DALL-E prompts for the logo and configured Tailwind CSS settings for the specific stroke widths and XJTLU color palette.]

## 3. Core Game Flow and Engine Structure

**Human:**
> *(Context: The developer uploaded the entire project codebase as text and instructed the AI to review it before modifying the engine structure.)*
> 这是我的项目的所有代码类文件，请你阅读并检查是否所有文件都已上传给你。请你协助我构建项目。
>
> 游戏时间轴设定为：大三上学期 (Y3 Sem1) 至 大四上学期 (Y4 Sem1)，共计约 12 个回合（月）。
>
> 阶段一：日常养成 (AP Allocation)
> 本阶段是游戏的核心常驻界面，采用 “左图右文” 的非对称分栏布局。每月初玩家拥有 5 点 AP。
> 
> 阶段二：突发事件与知识库缝合 (Event Triggering)
> 分为“普通意外事件”（AP消耗后概率触发，不可重复）和“特殊大事件”（月末强制触发，如“选中介”）。特殊大事件优先级高，且支持连续抉择链。
> 
> 请据此设计 `EventEngine.js` 和 `ActionEngine.js`，确保单向数据流原则：玩家输入 → Engine 函数（纯逻辑）→ 修改 State → UIManager 响应 State 变化 → 重渲染。Engine 层严禁直接操作 DOM。

**AI Assistant:**
*[Response Summary: The AI output the initial architecture for `ActionEngine.js` and `EventEngine.js`, implementing the `rollRandomEvent` and `checkScheduledEvents` logic. The raw code blocks are omitted here for brevity.]*

## 4. MVP Scoping for Exhibition

**Human:**
> 我正在构建展会特化版 Demo，想将原本 12 个月的体验，浓缩成一个 4 个月（即 4 个回合）的展会路演用特别版 Demo。
> 因为目前游戏的体量可能太小了，不足以支撑原本的一年半的游戏流程，玩家会迅速进入重复性游戏流程。
> 
> *(Context: The developer then shared a lengthy explanation of the game mechanics, intended educational value, and future roadmap that was previously presented to the professor. This text block is omitted here.)*
>
> 目前引导可能还是不足，请您参照以上我们对老师的介绍，规划一下 demo 中“对玩家的话”。比如我觉得告知“目前只有科学楼、宿舍和 CB 有事件”挺重要的。先不着急写代码。

**AI Assistant:**
*[Response Summary: The AI proposed a compressed 4-month timeline flow and drafted the onboarding dialogue for the Title Screen to set player expectations for the MVP. It suggested implementing this as a starting tutorial modal.]*
