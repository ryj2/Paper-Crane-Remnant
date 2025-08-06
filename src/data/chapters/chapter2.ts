import { GameNode } from '../../types/game';

export const chapter2Nodes: Record<string, GameNode> = {
  bookstore_arrival: {
    id: 'bookstore_arrival',
    title: '第二章：书吧幽影与法律之刃',
    content: '五月一日，天空如约阴沉。细密的雨丝斜织成网，将昏黄的路灯光钉在湿漉漉的柏油路上。我撑开黑伞，推开「迟慢」沉重的木门。"吱呀"一声，恍如推开了尘封的过往。\n\n店内弥漫着旧书页、陈年咖啡渣和潮湿木头混合的腐朽芬芳，像一座被时光遗忘的图书馆。唯一点亮的是角落一盏黄铜立灯，光晕昏黄如昭和时代的默片胶片，照出一个蜷缩在阴影深处的轮廓。',
    choices: [
      {
        id: 'approach_figure',
        text: '走向阴影中的人',
        nextNodeId: 'meet_chiman'
      },
      {
        id: 'observe_bookstore',
        text: '先观察书吧环境',
        nextNodeId: 'bookstore_observation'
      }
    ]
  },

  meet_chiman: {
    id: 'meet_chiman',
    title: '神秘的委托人',
    content: '[旁白]女人。宽大的黑色渔夫帽压得极低，遮蔽了所有表情，只吝啬地露出一线薄而苍白的唇。[/旁白]\n\n[人名]"林栖？"[/人名]她的声音轻如苏打水中瞬间破裂的气泡，带着不易察觉的颤抖。\n\n[人名]"是我。"[/人名]\n\n[人名]"抱歉，无法告知真名。"[/人名]指尖无意识地抠着橡木桌面干裂的纹理，[人名]"叫我迟慢就好。这里曾是我妹妹的书吧。"[/人名]她推来一个磨损的牛皮纸文件袋，封口处贴着一只褪色的纸鹤。\n\n[人名]"请帮我，推翻他们对[线索]唐远自杀[/线索]的裁定。"[/人名]语气平静，却像绷紧到极限的琴弦。',
    items: ['证据文件袋'],
    choices: [
      {
        id: 'ask_identity',
        text: '询问她的身份',
        nextNodeId: 'identity_reveal'
      },
      {
        id: 'examine_evidence',
        text: '检查证据文件袋',
        nextNodeId: 'evidence_examination'
      },
      {
        id: 'ask_why_now',
        text: '为什么现在才来委托',
        nextNodeId: 'timing_question'
      }
    ]
  },

  evidence_examination: {
    id: 'evidence_examination',
    title: '关键证据',
    content: '[旁白]文件袋里只有三件物证，冰冷如三块墓碑：[/旁白]\n\n[线索]1. 2019年4月30日23:46的地铁4号线末班车票（上海火车站→中潭路）：纸张边缘褶皱如老人枯槁的手背，透着仓促的焦灼。[/线索]\n\n[线索]2. 被粗暴撕去大半的便利店小票：00:07，关东煮三串、乌龙茶一瓶。残留的锯齿边缘参差，如同被野兽的利齿撕咬过。[/线索]\n\n[线索]3. 一张彩色照片：焦点是苏州河昌化路桥冰冷的金属栏杆外侧。一条灰色羊绒围巾软塌塌地悬挂着，像一条被遗弃的肢体。照片左下角的水印时间赫然：00:21。[/线索]',
    achievements: ['证据分析师'],
    items: ['地铁车票', '便利店小票', '围巾照片'],
    choices: [
      {
        id: 'analyze_timeline',
        text: '分析时间线矛盾',
        nextNodeId: 'timeline_analysis'
      },
      {
        id: 'question_wet_scarf',
        text: '质疑围巾为何湿透',
        nextNodeId: 'scarf_question'
      }
    ]
  },

  timeline_analysis: {
    id: 'timeline_analysis',
    title: '时间线的矛盾',
    content: '[人名]"围巾浸满了水，沉重冰冷，"[/人名]她的声音如同梦呓，[人名]"可这张车票和小票，却干燥得没有一丝水汽。那晚的天空，一滴雨也没有落下…"[/人名]\n\n空洞的目光转向我，带着冰冷的质询：[人名]"[线索]林栖[/线索]律师，你说，那条围巾，怎么会是湿透的？如果他是[线索]00:10坠河[/线索]，21分钟后，本该随他入水的围巾为何还在桥上？"[/人名]\n\n我的指尖划过照片上的时间戳，寒意顺着脊柱爬升。[人名]"有人将它提前浸湿，然后挂在了那里，伪造一个他刚刚坠河的假象？"[/人名]',
    achievements: ['逻辑推理师'],
    choices: [
      {
        id: 'ask_who_benefits',
        text: '谁会从中获益？',
        nextNodeId: 'motive_analysis'
      },
      {
        id: 'ask_her_role',
        text: '你在其中扮演什么角色？',
        nextNodeId: 'role_revelation'
      }
    ]
  },

  role_revelation: {
    id: 'role_revelation',
    title: '共犯的告白',
    content: '她微微颔首，帽檐下的阴影更深了："有人付出了巨大代价。"\n\n"为什么要等到三年后？"\n\n"因为，"她深吸一口气，仿佛耗尽所有力气，"我也是共犯。"\n\n昏黄的灯光下，她的叙述如同揭开地狱之门：2019年4月30日深夜。刺耳的电话铃声撕裂寂静。听筒那边，是唐远喘息急促、扭曲变调的声音，背景是呼啸的风声和沉闷的水流拍岸声。\n\n"姐我我可能做了无法挽回的事杀了人"声音破碎得不成样子，"如果明天天亮前没有我的消息把我电脑里那个叫纸鹤的文件夹彻底格式化！记住，是彻底！求你了！"',
    achievements: ['真相接近者'],
    choices: [
      {
        id: 'ask_what_happened',
        text: '那晚到底发生了什么？',
        nextNodeId: 'night_truth'
      },
      {
        id: 'ask_sister_identity',
        text: '你真的是他的姐姐？',
        nextNodeId: 'identity_final_reveal'
      }
    ]
  },

  identity_final_reveal: {
    id: 'identity_final_reveal',
    title: '身份的真相',
    content: '"因为上个月！我妹妹——这家迟慢真正的主人——留下一封遗书，也从同一座桥上跳了下去！"她猛地抬手，用力摘下那顶遮蔽一切的渔夫帽——\n\n灯光瞬间完整地照亮了她的脸。苍白、憔悴，如同被岁月漂洗过无数次。但那双眼睛下方左眼下方，一颗小小的、深褐色的泪痣，赫然在目。位置、大小，与记忆中的唐远，分毫不差。\n\n"我不是迟慢。我是唐远的双胞胎姐姐，唐书遥。"',
    achievements: ['身份揭露者'],
    items: ['唐书遥的真实身份'],
    choices: [
      {
        id: 'demand_full_truth',
        text: '要求她说出全部真相',
        nextNodeId: 'full_confession'
      },
      {
        id: 'investigate_legally',
        text: '通过法律途径调查',
        nextNodeId: 'legal_investigation'
      }
    ]
  },

  bookstore_observation: {
    id: 'bookstore_observation',
    title: '观察书吧环境',
    content: '我没有立即走向那个阴影中的人影，而是先仔细观察了书吧的环境。书架上的书籍大多是推理小说和哲学著作，其中不少是绝版或限量版。\n\n靠近吧台的墙上挂着一张照片，照片中是两个年轻女孩，面容相似，应该是姐妹。其中一个女孩的左眼下方有一颗明显的泪痣，让我不由自主地想起了唐远。\n\n吧台上放着一本签到簿，最后一个签名日期是三年前的4月30日，签名人：唐远。',
    items: ['姐妹照片', '签到簿'],
    achievements: ['细心观察者'],
    choices: [
      {
        id: 'approach_after_observation',
        text: '走向阴影中的人',
        nextNodeId: 'meet_chiman'
      },
      {
        id: 'check_backdoor',
        text: '检查书吧后门',
        nextNodeId: 'backdoor_discovery'
      }
    ]
  },

  backdoor_discovery: {
    id: 'backdoor_discovery',
    title: '后门的发现',
    content: '我悄悄绕过书架，来到书吧后方。一扇半掩的门后隐约可见一个小房间，里面堆满了纸箱和文件。墙上贴着大量剪报和照片，中心是一张苏州河昌化路桥的航拍图，上面用红笔标注了大量笔记。\n\n正当我想靠近查看时，身后传来轻微的脚步声。',
    items: ['调查笔记'],
    choices: [
      {
        id: 'turn_around',
        text: '转身面对来人',
        nextNodeId: 'meet_chiman'
      },
      {
        id: 'hide_and_observe',
        text: '躲起来继续观察',
        nextNodeId: 'hidden_observation'
      }
    ]
  },

  hidden_observation: {
    id: 'hidden_observation',
    title: '隐秘的观察',
    content: '我迅速躲在一个高大的书架后面。一个戴着黑色渔夫帽的女人走进了房间，摘下帽子，露出一张憔悴的脸。她在墙上的照片前站了很久，手指轻轻抚过那些剪报。\n\n突然，她开口说道："林栖律师，你可以出来了。既然你已经看到了这些，我们不妨开门见山。"',
    achievements: ['隐秘观察者'],
    choices: [
      {
        id: 'reveal_yourself',
        text: '现身相见',
        nextNodeId: 'meet_chiman'
      }
    ]
  },

  identity_reveal: {
    id: 'identity_reveal',
    title: '身份的疑问',
    content: '"你是谁？"我直截了当地问道。\n\n"我是那个夜晚，最后看到他的人。"她终于抬起头。灯光吝啬地勾勒出她清瘦的下颌线。当那双眼睛完整暴露在光晕中时，我的心骤然被一只冰冷的手攫紧——那是一双与唐远几乎无异的眼睛。同样深邃、疲惫，像蒙着薄雾的琵琶湖。唯一的区别是：唐远左眼下方那颗标志性的泪痣，在她的脸上，消失了。',
    choices: [
      {
        id: 'ask_about_evidence',
        text: '询问她的证据',
        nextNodeId: 'evidence_examination'
      },
      {
        id: 'ask_about_relationship',
        text: '询问她与唐远的关系',
        nextNodeId: 'relationship_question'
      }
    ]
  },

  relationship_question: {
    id: 'relationship_question',
    title: '关系的疑问',
    content: '"你和唐远是什么关系？"我谨慎地问道，目光紧盯着她的反应。\n\n她的手指在桌面上轻轻敲击，节奏不安而混乱。"我们很近，也很远。"她的声音低沉，带着一丝难以察觉的颤抖，"他是我的镜像。"\n\n这个模糊的回答让我更加困惑，但她的眼神告诉我，至少现在，我不会得到更明确的答案。',
    choices: [
      {
        id: 'ask_for_evidence',
        text: '要求看证据',
        nextNodeId: 'evidence_examination'
      }
    ]
  },

  timing_question: {
    id: 'timing_question',
    title: '时机的疑问',
    content: '"为什么是现在？为什么等了三年才来找我？"我的问题直指核心。\n\n她的肩膀微不可察地颤抖了一下，仿佛被无形的重量压得更低。"因为时间到了。"她的声音几乎是一种耳语，"有些真相，需要等到所有的棋子都就位，所有的伤口都结痂，才能被揭开。"\n\n她抬起头，眼中闪烁着决绝的光芒："而且，因为上个月发生了一件事，彻底改变了一切。"',
    choices: [
      {
        id: 'ask_what_happened',
        text: '询问发生了什么',
        nextNodeId: 'sister_revelation'
      },
      {
        id: 'examine_evidence_first',
        text: '先检查证据',
        nextNodeId: 'evidence_examination'
      }
    ]
  },

  sister_revelation: {
    id: 'sister_revelation',
    title: '妹妹的命运',
    content: '"我妹妹——这家迟慢真正的主人——上个月留下一封遗书，从昌化路桥上跳了下去。"她的声音平静得可怕，仿佛在讲述一个与己无关的故事，"同一座桥，同样的结局。这不可能是巧合。"\n\n她推过来一张照片，是两个年轻女孩的合影，面容相似，应该是姐妹。其中一个女孩的左眼下方有一颗明显的泪痣，与唐远如出一辙。\n\n"我必须知道真相。为了她，也为了他。"',
    items: ['姐妹合影'],
    choices: [
      {
        id: 'examine_evidence_now',
        text: '现在检查证据',
        nextNodeId: 'evidence_examination'
      }
    ]
  },

  scarf_question: {
    id: 'scarf_question',
    title: '围巾之谜',
    content: '"围巾为什么会湿？"我直接问道。\n\n"围巾浸满了水，沉重冰冷，"她的声音如同梦呓，"可这张车票和小票，却干燥得没有一丝水汽。那晚的天空，一滴雨也没有落下…"\n\n我思考着这个矛盾："如果唐远是00:10坠河，21分钟后，本该随他入水的围巾为何还在桥上？而且是湿透的？"\n\n"除非，"我的声音变得冰冷，"有人将它提前浸湿，然后挂在那里，伪造一个他刚刚坠河的假象。"',
    achievements: ['关键质疑者'],
    choices: [
      {
        id: 'ask_about_her_role',
        text: '询问她在其中的角色',
        nextNodeId: 'role_revelation'
      }
    ]
  },

  motive_analysis: {
    id: 'motive_analysis',
    title: '动机分析',
    content: '"谁会从唐远的死亡中获益？"我冷静地分析道，"谁有动机伪造这一切？"\n\n她的嘴角浮现出一丝苦涩的微笑："有时候，最大的获益者，恰恰是死者本人。"\n\n这个回答如同一道闪电，照亮了我思维的黑暗角落。"你是说唐远自导自演了自己的死亡？"\n\n"或许比这更复杂。"她轻声说，"有些人，需要死亡才能获得新生。有些身份，需要被埋葬，才能让另一个身份继续呼吸。"',
    choices: [
      {
        id: 'ask_her_identity',
        text: '直接询问她的真实身份',
        nextNodeId: 'identity_final_reveal'
      }
    ]
  },

  night_truth: {
    id: 'night_truth',
    title: '那个夜晚的真相',
    content: '"那晚到底发生了什么？"我追问道。\n\n她的叙述如同揭开地狱之门：\n\n"2019年4月30日深夜。刺耳的电话铃声撕裂寂静。听筒那边，是唐远喘息急促、扭曲变调的声音，背景是呼啸的风声和沉闷的水流拍岸声。\n\n姐我我可能做了无法挽回的事杀了人声音破碎得不成样子，如果明天天亮前没有我的消息把我电脑里那个叫纸鹤的文件夹彻底格式化！记住，是彻底！求你了！\n\n我没有问杀了谁。甚至没有问为什么。那一刻，只有深入骨髓的恐惧攫住了我。作为检察官，我比任何人都清楚杀人二字背后的腥风血雨和无底深渊。"\n\n她的声音变得更加低沉："5月1日清晨，手机屏幕空白如死。我抱起弟弟那台沉甸甸的笔记本电脑，冲向电脑城深处。看着硬盘盘片在专业消磁设备下化作一片死寂，所有数据化为虚无，我才感到一丝扭曲的安全感。"',
    achievements: ['真相聆听者'],
    choices: [
      {
        id: 'ask_about_identity',
        text: '质疑她的身份',
        nextNodeId: 'identity_final_reveal'
      }
    ]
  },

  full_confession: {
    id: 'full_confession',
    title: '完整的忏悔',
    content: '"我要知道全部真相。"我的声音坚定而冷静。\n\n唐书遥深吸一口气，开始了她的忏悔：\n\n"4月30日深夜，当我凭借直觉疯狂赶到苏州河边时，唐远确实站在桥栏边。但那个在监控时间戳00：10纵身跃入漆黑河面的身影是我自己！\n\n我想死。那一刻，背负着秘密和绝望，我只想结束这一切刺骨的河水淹没我的口鼻的刹那，是他是唐远像疯子一样跳下来，拼命抓住了我！"\n\n她的声音因回忆而撕裂，泪水无声地汹涌而出，"他在冰冷的河水里挣扎着拖着我，用尽全力把我推回堤岸他浑身湿透，冷得像块冰，牙齿都在打颤，却把那条同样湿透的、沉重的围巾硬塞进我手里，喘着粗气，断断续续地说：姐替我活！活下去！用我的名字活下去！"\n\n"然后然后他转身，踉跄着，消失在昌化路桥下的那片黑暗里"',
    achievements: ['忏悔聆听者'],
    choices: [
      {
        id: 'ask_why_now',
        text: '为什么现在才说出真相',
        nextNodeId: 'confession_reason'
      },
      {
        id: 'investigate_further',
        text: '继续调查真相',
        nextNodeId: 'legal_investigation'
      }
    ]
  },

  confession_reason: {
    id: 'confession_reason',
    title: '忏悔的理由',
    content: '"为什么现在才说？！为什么等了三年？！"我的愤怒和困惑如同火山爆发。\n\n"因为我恨他！"她猛地抬起头，泪水纵横的脸上交织着最纯粹的痛苦与刻骨的恨意，"恨他把这份沉重的、虚假的、没有呼吸的人生硬塞给我！恨他让我独自背负着谋杀弟弟和逼死妹妹的双重罪恶，像行尸走肉一样苟活！"\n\n她攥紧的拳头指节发白，指甲深深陷入掌心，"但我更恨恨我自己！恨当时站在岸上的我，浑身湿冷，明明已经抓住了他冰冷的手腕为什么！为什么那一刻我松开了手！是我是我亲手把他推向了黑暗！"',
    choices: [
      {
        id: 'legal_path',
        text: '通过法律途径调查',
        nextNodeId: 'legal_investigation'
      }
    ]
  }
};