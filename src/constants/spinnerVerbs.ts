import { getInitialSettings } from '../utils/settings/settings.js'

export function getSpinnerVerbs(): string[] {
  const settings = getInitialSettings()
  const config = settings.spinnerVerbs
  if (!config) {
    return SPINNER_VERBS
  }
  if (config.mode === 'replace') {
    return config.verbs.length > 0 ? config.verbs : SPINNER_VERBS
  }
  return [...SPINNER_VERBS, ...config.verbs]
}

// Spinner verbs for loading messages
export const SPINNER_VERBS = [
  '模拟中',
  '调查中',
  '规划中',
  '推演中',
  '建模中',
  '路网分析中',
  '交通量估算中',
  '参数校准中',
  '方案比选中',
  '路径优化中',
  '信号配时中',
  '梳理出行需求',
  '查看路况',
  '看看这条路',
  '找找拥堵原因',
  '试试这条路线',
  '换条路想想',
  '给思路疏疏堵',
  '把路网理顺',
  '顺着线索走',
  '去路口看看',
  '看看车流怎么走',
  '再跑一遍模拟',
  '调整一下参数',
  '算算通行效率',
  '推敲一下方案',
  '让我试试',
  '灵光一现',
  '我来看看',
  '先理理思路',
  '再琢磨一下',
  '换个思路',
  '想个好办法',
  '慢慢捋清楚',
  '顺着思路想',
  '找找突破口',
  '看看哪里卡住了',
  '试个新办法',
  '把问题拆开',
  '一步一步来',
  '再往前想一步',
  '我再想想',
  '让我算一算',
  '翻翻资料',
  '核对一下数据',
  '对照一下结果',
  '多看一眼',
  '确认一下细节',
  '把线索串起来',
  '整理一下发现',
  '找个更顺的办法',
  '先搭个框架',
  '补上这块拼图',
  '把细节打磨好',
  '看看还有什么可能',
  '离答案近一点',
  '再试一种可能',
  '给方案加点巧思',
  '让思路跑起来',
  '继续往前走',
]
