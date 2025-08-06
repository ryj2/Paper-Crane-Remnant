import { GameNode } from '../../types/game';

export const chapter1Nodes: Record<string, GameNode> = {
  start: {
    id: 'start',
    title: '序章：雨蚀的信仰',
    content: '[旁白]昨夜的雨，是梅雨季特有的黏稠与阴冷，像无数细小的冰针，舔舐着都市的钢铁骨架。霓虹灯牌在湿漉漉的玻璃幕墙上晕开模糊的光斑，如同我心中那个被冲刷得褪色的信念——它曾如东京铁塔的探照灯般锐利，如今却在雨水的侵蚀下，显露出锈迹斑斑的裂痕。[/旁白]\n\n[线索]"真相，值得付出一切代价去追寻吗？"[/线索]\n\n三年前，若有人如此诘问，我会以冷笑作答。彼时的我，笃信真相是柄无坚不摧的利刃，足以刺穿任何虚伪的浓雾。而此刻，我咀嚼着这浸透雨水的疑问，苦涩在口腔里弥漫，像生锈的铁屑卡在喉间。',
    choices: [
      {
        id: 'continue_story',
        text: '继续阅读',
        nextNodeId: 'chapter1_intro'
      },
      {
        id: 'reflect_truth',
        text: '思考真相的意义',
        nextNodeId: 'truth_reflection'
      }
    ]
  },

  truth_reflection: {
    id: 'truth_reflection',
    title: '对真相的思考',
    content: '[旁白]真相，更像镰仓海岸永不止息的潮汐。它并非瞬间的照亮，而是日复一日的侵蚀。它冲刷记忆的堤岸，将鲜明的爱憎漂洗成惨淡的灰白，将坚硬的誓言搓捻得起毛、变形。最终，它并非带来救赎，而是让支撑你站立的地基，无声无息地坍塌为流沙。[/旁白]\n\n我叫[人名]林栖[/人名]。一名蜗居于上海老闸北三坪"鸽笼"的见习律师。这里的正义，卑微如石缝间挣扎的苔藓，脆弱而执拗地宣告着存在本身。昨日的信念，在现实的泥泞中，还能剩下多少残骸？',
    achievements: ['哲学思考者'],
    choices: [
      {
        id: 'continue_to_chapter1',
        text: '进入第一章',
        nextNodeId: 'chapter1_intro'
      }
    ]
  },

  chapter1_intro: {
    id: 'chapter1_intro',
    title: '第一章：鸽笼苔藓与纸鹤的邀约',
    content: '居委会施舍的杂物间，铁皮屋顶在雨季叮咚作响，像永无止境的倒计时。我的"律所"弥漫着冷藏食品的腥气和陈年尘埃的味道。战场不在庄严的法庭，而在便利店冷柜前颤抖的店员、外卖电动车残骸旁失语的骑手。\n\n四月末的黄昏，空气滞重得能拧出水珠。我正埋首于一叠工伤赔偿的残缺记录，纸页上廉价油墨的酸腐气息直冲鼻腔。指尖突然触到桌角一丝异样：一只纸鹤。',
    items: ['神秘纸鹤'],
    choices: [
      {
        id: 'examine_crane',
        text: '仔细检查纸鹤',
        nextNodeId: 'crane_examination'
      },
      {
        id: 'ignore_crane',
        text: '暂时忽略，继续工作',
        nextNodeId: 'work_continues'
      }
    ]
  },

  crane_examination: {
    id: 'crane_examination',
    title: '神秘的纸鹤',
    content: '[旁白]折痕磨损得近乎透明，翅尖泛着濒死的脆意，仿佛一口气就能将它吹散。鹤腹中，塞着对折两次的A4纸，铅字冰冷如法医解剖报告：[/旁白]\n\n[线索]"[人名]林栖[/人名]律师：\n倘若您心中尚存一丝对旧日之事的挂念，请于五月一日二十时整，移步长阳路「迟慢」书吧。\n我恳请委托您，为一位已无法开口诉说的逝者，洗去定论的污名。\n委托人：纸鹤"[/线索]\n\n没有电话，没有预付金。落款却像一颗石子，骤然投入我记忆的深潭，激起冰冷涟漪——[线索]纸鹤[/线索]。那是大学BBS推理版上一个幽灵般的ID，一个只属于[人名]唐远[/人名]的代号。',
    achievements: ['线索发现者'],
    items: ['委托信'],
    choices: [
      {
        id: 'remember_tangyuan',
        text: '回忆唐远',
        nextNodeId: 'tangyuan_memory'
      },
      {
        id: 'decide_meeting',
        text: '决定赴约',
        nextNodeId: 'meeting_decision'
      },
      {
        id: 'hesitate',
        text: '犹豫不决',
        nextNodeId: 'hesitation'
      }
    ]
  },

  tangyuan_memory: {
    id: 'tangyuan_memory',
    title: '唐远的回忆',
    content: '唐远。我的室友，推理社棋逢对手的搭档。无数个熄灯后的深夜，我们用对讲机在电波的彼端编织光怪陆离的谜题，自诩为"真相的共犯"。三年前，梅雨初歇的那个午夜，他留下轻飘飘一句"我去写结局了"，便在苏州河昌化路桥的栏杆外，融入了冰冷的夜色。\n\n警方以"自杀"匆匆结裁，唯一的谜题是：河水奔流，尸骨无踪。一个活生生的人，就这样被潦草涂抹掉了存在的痕迹。',
    achievements: ['回忆收集者'],
    choices: [
      {
        id: 'go_to_meeting',
        text: '前往「迟慢」书吧',
        nextNodeId: 'bookstore_arrival'
      },
      {
        id: 'investigate_first',
        text: '先调查唐远的死因',
        nextNodeId: 'death_investigation'
      }
    ]
  },

  work_continues: {
    id: 'work_continues',
    title: '继续工作',
    content: '我决定先完成手头的工作，将那只纸鹤放在一旁。时间一分一秒流逝，窗外的雨声渐渐变大，敲打着铁皮屋顶，如同无数细小的手指在催促着什么。\n\n当我终于处理完最后一份文件，抬头看向窗外时，天色已经完全暗了下来。那只纸鹤依然静静地躺在桌角，在昏黄的台灯光下投下一道细长的影子。',
    choices: [
      {
        id: 'examine_crane_later',
        text: '现在检查纸鹤',
        nextNodeId: 'crane_examination'
      },
      {
        id: 'go_home',
        text: '收拾东西回家',
        nextNodeId: 'go_home_ending'
      }
    ]
  },

  go_home_ending: {
    id: 'go_home_ending',
    title: '错过的机会',
    content: '我将纸鹤随手塞进抽屉，关灯锁门离开了办公室。雨中的夜晚格外寒冷，我裹紧外套快步走向地铁站。\n\n第二天早晨，当我再次打开办公室抽屉时，那只纸鹤已经不见了。窗户微微敞开，雨后的微风轻轻吹拂着窗帘。\n\n或许有些真相，一旦错过，就再也无法触及。',
    isEnding: true,
    achievements: ['错失良机'],
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        nextNodeId: 'start'
      }
    ]
  },

  meeting_decision: {
    id: 'meeting_decision',
    title: '决定赴约',
    content: '我凝视着纸鹤，指腹抚过那磨损的折痕。窗外，雨滴在生锈的防火梯上敲出细密鼓点，如同倒计时的秒针。\n\n唐远。那个曾经与我共同探寻真相的搭档，那个被官方草草定论为"自杀"的朋友。如果有任何可能，哪怕只有万分之一的机会能揭开他死亡的真相，我都不能放弃。\n\n我决定赴约。五月一日，二十时整，长阳路「迟慢」书吧。',
    choices: [
      {
        id: 'prepare_for_meeting',
        text: '为会面做准备',
        nextNodeId: 'preparation'
      },
      {
        id: 'go_directly',
        text: '直接前往书吧',
        nextNodeId: 'bookstore_arrival'
      }
    ]
  },

  preparation: {
    id: 'preparation',
    title: '会面准备',
    content: '在前往书吧之前，我决定做些准备工作。我翻出了三年前关于唐远"自杀"的新闻报道和警方通告，仔细研读每一个细节。\n\n我还找出了大学时期与唐远的合照，那时的他眼神锐利，嘴角总是挂着若有若无的笑意，仿佛世间所有谜题都逃不过他的洞察。\n\n最后，我带上了录音笔和笔记本，以及一把黑伞——五月的上海，雨总是来得猝不及防。',
    items: ['录音笔', '旧照片', '黑伞'],
    achievements: ['谨慎准备者'],
    choices: [
      {
        id: 'go_to_bookstore',
        text: '前往「迟慢」书吧',
        nextNodeId: 'bookstore_arrival'
      }
    ]
  },

  hesitation: {
    id: 'hesitation',
    title: '犹豫不决',
    content: '我盯着那只纸鹤，内心挣扎。唐远的死，警方已经给出了明确的结论。重启调查意味着什么？意味着质疑官方，意味着可能触碰某些不该触碰的黑暗。\n\n作为一名刚起步的律师，我有这个资格和能力吗？更重要的是，我准备好面对可能揭露的真相了吗？\n\n窗外的雨声渐渐变大，仿佛在催促我做出决定。',
    choices: [
      {
        id: 'overcome_hesitation',
        text: '克服犹豫，决定赴约',
        nextNodeId: 'meeting_decision'
      },
      {
        id: 'decline_invitation',
        text: '拒绝邀请',
        nextNodeId: 'decline_ending'
      }
    ]
  },

  decline_ending: {
    id: 'decline_ending',
    title: '拒绝的代价',
    content: '我最终决定不去赴约。将纸鹤重新折好，放入抽屉深处。有些过去，或许就该让它安静地尘封在记忆里。\n\n一周后，报纸上的一则小新闻引起了我的注意：长阳路一家名为「迟慢」的书吧发生火灾，店主下落不明。现场发现多处纵火痕迹，警方正在调查中。\n\n我的手指无意识地颤抖着，将那张报纸揉成一团。窗外，雨依然下个不停，仿佛在无声地诉说着某个再也无法挽回的遗憾。',
    isEnding: true,
    achievements: ['谨慎的旁观者'],
    choices: [
      {
        id: 'restart',
        text: '重新开始',
        nextNodeId: 'start'
      }
    ]
  },

  death_investigation: {
    id: 'death_investigation',
    title: '调查死因',
    content: '在赴约前，我决定先了解更多关于唐远死亡的细节。我联系了几个警局的老熟人，查阅了公开的案件记录。\n\n官方记录显示：2019年5月1日凌晨00:10分左右，唐远从昌化路桥跳入苏州河，被判定为自杀。尸体于三天后在下游被打捞上岸，已经面目全非。身份确认主要依靠随身物品和DNA比对。\n\n奇怪的是，案件调查报告异常简短，许多常规程序似乎被省略了。而且，确认死者身份的DNA样本来源不明，报告中只模糊提及"与数据库中的样本匹配"。',
    items: ['案件记录'],
    choices: [
      {
        id: 'go_to_meeting_with_info',
        text: '带着信息前往书吧',
        nextNodeId: 'bookstore_arrival'
      }
    ]
  }
};