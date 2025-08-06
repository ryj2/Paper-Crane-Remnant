import { GameNode } from '../../types/game';

export const chapter3Nodes: Record<string, GameNode> = {
  legal_investigation: {
    id: 'legal_investigation',
    title: '第三章：律师之刃的寒光',
    content: '作为律师，冰冷的法条此刻是我唯一的锚点——《律师法》第三十五条如利刃出鞘：\n\n"受委托的律师根据案情的需要，可以申请人民检察院、人民法院收集、调取证据或者申请人民法院通知证人出庭作证。律师自行调查取证的，凭律师执业证书和律师事务所证明，可以向有关单位或者个人调查与承办法律事务有关的情况。"\n\n翌日清晨，我带着盖有律所鲜红印章的律师函和执业证书，开始了真正的调查。',
    achievements: ['法律武器使用者'],
    choices: [
      {
        id: 'investigate_subway',
        text: '调查地铁监控记录',
        nextNodeId: 'subway_investigation'
      },
      {
        id: 'investigate_store',
        text: '调查便利店监控',
        nextNodeId: 'store_investigation'
      },
      {
        id: 'investigate_forensics',
        text: '申请法医物证报告',
        nextNodeId: 'forensic_investigation'
      }
    ]
  },

  subway_investigation: {
    id: 'subway_investigation',
    title: '地铁监控的秘密',
    content: '地铁集团档案室。工作人员叼着烟，眼皮都懒得抬："调监控？法院传票呢？没那玩意儿，别浪费时间。"\n\n我将律师证和书面申请推到他面前，声音平稳如刀："依据《律师法》第三十五条，我要求调取2019年4月30日23:46至5月1日00:30间，4号线上海火车站站至中潭路站的闸机数据。拒绝配合，我将向律协及检察机关提交执业权利受阻的正式投诉。"\n\n二十分钟后，冰冷的闸机数据终于铺陈在眼前：\n\n23:46，唐远的实名交通卡刷入上海火车站4号线进站闸机。\n23:58，中潭路站检出记录清晰显示——但刷出站的，登记的不是唐远的卡，而是另一张崭新的、实名登记为"唐书遥"的交通卡！',
    achievements: ['数据挖掘者'],
    items: ['地铁刷卡记录'],
    choices: [
      {
        id: 'confront_tangshu',
        text: '质问唐书遥',
        nextNodeId: 'confrontation'
      },
      {
        id: 'continue_investigation',
        text: '继续深入调查',
        nextNodeId: 'deeper_investigation'
      }
    ]
  },

  store_investigation: {
    id: 'store_investigation',
    title: '便利店的监控',
    content: '便利店的监控录像已被覆盖，但硬盘被尘封在仓库角落。再次出示律师证，管理员摊手："硬盘坏了，修不了。"\n\n"根据《律师法》第三十五条，你有义务配合调查。"我打开手机，调出律协的电子投诉模板，"现在，要么你亲自去调取，要么我立刻向市律协提交投诉，并申请法院强制调取。你选。"\n\n他咒骂着翻出硬盘。00:07分，收银台监控画面：一个头戴压得极低的黑色鸭舌帽的男人，将购物篮放在柜台。关东煮，乌龙茶。他用现金付账。就在店员低头找零，他伸手去接的一瞬间——那只摊开的右手虎口处，一块形状奇特的、宛如展翅蝴蝶的暗红色胎记，在监控画面中一闪而逝！',
    items: ['便利店监控'],
    choices: [
      {
        id: 'compare_birthmark',
        text: '比对胎记',
        nextNodeId: 'birthmark_comparison'
      },
      {
        id: 'investigate_more',
        text: '继续调查',
        nextNodeId: 'forensic_investigation'
      }
    ]
  },

  birthmark_comparison: {
    id: 'birthmark_comparison',
    title: '胎记的秘密',
    content: '我立刻回想起唐书遥推过文件袋时，那只骨节分明的手——她的右手虎口，有着一模一样的印记！这不可能是巧合。\n\n如果监控中的人是唐远，那么他和他的姐姐唐书遥共享着同样的胎记，这符合双胞胎的特征。但如果监控中的人是唐书遥自己，那么她为什么要伪装成唐远的样子出现在便利店？\n\n更重要的是，如果唐远和唐书遥是双胞胎，为什么在我的记忆中，唐远从未提起过他有一个双胞胎姐姐？',
    choices: [
      {
        id: 'investigate_forensics_now',
        text: '申请法医物证报告',
        nextNodeId: 'forensic_investigation'
      },
      {
        id: 'confront_about_birthmark',
        text: '质问唐书遥关于胎记',
        nextNodeId: 'confrontation'
      }
    ]
  },

  forensic_investigation: {
    id: 'forensic_investigation',
    title: '法医物证的真相',
    content: '最冰冷的判决来自法医物证报告复印件（通过法院内部关系艰难获取）：那条作为关键物证的灰色围巾上，检测出两名个体的脱落细胞。\n\n男性部分与唐远三年前留存在警方数据库的口腔拭子样本DNA分型99.999%吻合。女性部分，与唐书遥应警方要求（在她妹妹"自杀"后）抽取送检的血液样本完全吻合。\n\n冰冷的科学数据，像一把重锤，带着法律和逻辑的绝对权威，敲碎了所有侥幸的幻想。唐远碰过围巾。唐书遥也碰过围巾。而且是在围巾被水浸透的状态下。',
    items: ['DNA检测报告'],
    choices: [
      {
        id: 'confront_with_evidence',
        text: '带着证据质问唐书遥',
        nextNodeId: 'confrontation'
      },
      {
        id: 'deeper_investigation',
        text: '继续深入调查',
        nextNodeId: 'deeper_investigation'
      }
    ]
  },

  confrontation: {
    id: 'confrontation',
    title: '最后的对质',
    content: '我将所有证据摊在「迟慢」书吧的桌上，冷静地直视着唐书遥的眼睛："地铁卡记录显示，那晚从中潭路站出站的是你的卡，不是唐远的。便利店监控显示，购买关东煮的人手上有与你相同的胎记。DNA报告证实，你和唐远都接触过那条湿透的围巾。"\n\n"告诉我真相，唐书遥。那晚到底发生了什么？"\n\n她的眼神从震惊、恐惧，最终归于一种近乎解脱的平静。"你已经知道了，不是吗？"她轻声说，"那晚跳河的人是我，不是唐远。是他救了我，然后...消失了。"',
    choices: [
      {
        id: 'ask_full_story',
        text: '要求她讲述完整故事',
        nextNodeId: 'full_confession'
      },
      {
        id: 'investigate_apartment',
        text: '调查唐远的公寓',
        nextNodeId: 'apartment_investigation'
      }
    ]
  },

  deeper_investigation: {
    id: 'deeper_investigation',
    title: '更深的真相',
    content: '便利店的监控硬盘被尘封在仓库角落。再次出示律师证后，00:07分的监控画面显示：一个头戴压得极低的黑色鸭舌帽的男人，将购物篮放在柜台。关东煮，乌龙茶。他用现金付账。就在店员低头找零，他伸手去接的一瞬间——那只摊开的右手虎口处，一块形状奇特的、宛如展翅蝴蝶的暗红色胎记，在监控画面中一闪而逝！\n\n我立刻回想起唐书遥推过文件袋时，那只骨节分明的手——她的右手虎口，有着一模一样的印记！\n\n最冰冷的判决来自法医物证报告：那条作为关键物证的灰色围巾上，检测出两名个体的脱落细胞。男性部分与唐远三年前留存在警方数据库的口腔拭子样本DNA分型99.999%吻合。女性部分，与唐书遥的血液样本完全吻合。',
    achievements: ['真相逼近者'],
    items: ['DNA检测报告'],
    choices: [
      {
        id: 'final_confrontation',
        text: '最终对质',
        nextNodeId: 'final_truth'
      }
    ]
  },

  apartment_investigation: {
    id: 'apartment_investigation',
    title: '公寓的秘密',
    content: '"昌平路1009弄7号502室。我妹妹生前的公寓。"她推来一把冰凉的黄铜钥匙，"你想知道的自己去看吧。那里或许有你要的结局。"\n\n公寓漂浮着旧书页的浓重霉味与残留的、已经稀薄的柠檬草精油气息，混杂出一种奇异的、近乎祭奠的氛围。书架上，一排精装本整齐肃立——封面署名全是"唐远"。写字台上，一台银色MacBook在昏暗光线下反射着微弱的光泽。键盘左侧，"Z"键的位置是一个刺眼的空洞。',
    items: ['唐远的笔记本电脑'],
    choices: [
      {
        id: 'check_computer',
        text: '检查笔记本电脑',
        nextNodeId: 'computer_discovery'
      }
    ]
  },

  computer_discovery: {
    id: 'computer_discovery',
    title: '电脑中的秘密',
    content: '心跳如擂鼓。我按下电源键。屏幕亮起，桌面背景是深邃的苏州河夜景，昌化路桥的灯火在水中扭曲成流动的、变幻莫测的光斑。硬盘里，几乎空空如也。唯一存在的文件夹，名字刺眼：纸鹤。\n\n点开。里面只有一个未完成的Word文档。标题：《在昨日之雨里，我替你写下结局》。文档创建时间：2019-04-30 23:55。\n\n光标停留在最后一行未完成的文字上，像一道凝固的、永不愈合的伤口："姐姐，如果我死了，请把真相告诉林栖。"',
    items: ['未完成的文档'],
    choices: [
      {
        id: 'return_to_bookstore',
        text: '带着发现返回书吧',
        nextNodeId: 'final_truth'
      }
    ]
  }
};