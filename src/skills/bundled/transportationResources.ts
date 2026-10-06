import governanceSkill from './traffic-congestion-governance/SKILL.md' with {
  type: 'text',
}
import governanceReferences from './trafficCongestionGovernanceContent.json'
import { TRANSPORTATION_FILES } from './transportationContent.js'

// Keep textbook paths stable and namespace governance references to prevent
// collisions. All resources share the same bundled skill extraction directory.
export const TRANSPORTATION_RESOURCES: Record<string, string> = {
  ...TRANSPORTATION_FILES,
  'governance/SKILL.md': governanceSkill,
  ...Object.fromEntries(
    Object.entries(governanceReferences).map(([path, content]) => [
      `governance/${path}`,
      content,
    ]),
  ),
}
