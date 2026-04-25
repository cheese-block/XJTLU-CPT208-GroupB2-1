# 玩家视角 4 个月节奏流程图（Demo）

本图用于描述当前 Demo（4 回合）下，玩家在每个月份会经历的关键解锁与主线压力节点。

```mermaid
flowchart TD
    startNode["开始新游戏（Month1 / 9月）"] --> month1Core["Month1：基础期\n可行动建筑：SB、FB、EB、PB、GYM、Dorm\n核心目标：熟悉行动与生存数值平衡"]
    month1Core --> month1End["月末结算（Month1结束）"]
    month1End --> unlockCB["触发 unlock_cb_notice\n解锁 CB（图书馆）"]

    unlockCB --> month2Core["Month2：语言准备期\nCB 开放（雅思相关行动与机会）\n继续推进学力/生存状态"]
    month2Core --> month2End["月末结算（Month2结束）"]
    month2End --> unlockIA["触发 unlock_ia_notice\n解锁 IA（中介线入口）"]

    unlockIA --> month3Core["Month3：决策分化期\nIA 开放，中介风云主线可推进\nCB 继续承担雅思机会触发"]
    month3Core --> month3End["月末结算（Month3结束）"]
    month3End --> ieltsLastSlot["触发 ielts_guarantee\n进入最后考位压力节点"]

    ieltsLastSlot --> month4Core["Month4：集中清算期\n雅思最后冲刺 + 期末准备并行"]
    month4Core --> month4End["月末结算（Month4结束）"]
    month4End --> finalExam["触发 sem1_final_exam\n学力结算为 GPA"]
    finalExam --> finalReview["进入最终履历复盘与结局流程"]
```

## 说明

- 该流程图与当前事件调度常量保持同步：`unlock_cb_notice` -> `unlock_ia_notice` -> `ielts_guarantee` -> `sem1_final_exam`。
- 若后续调整了建筑解锁顺序、特殊事件触发月份、或回合结构，请同步更新本文件。
