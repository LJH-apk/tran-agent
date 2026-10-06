export const JEV_TOOL_NAME = 'JEVEvaluate'

export function getJEVToolPrompt(): string {
  return `Evaluate decision confidence using JEV (Joint Embedding Vector) model for structured probabilistic decisions in traffic management systems.

## Purpose

JEV provides structured confidence scores instead of open-ended text generation, helping avoid hallucinations in critical traffic management decisions. It uses TypeSafe AI's System One API with typed probabilistic outputs.

## When to Use

Use JEV at three critical decision points:

1. **Cause Identification**: Diagnose congestion root causes
2. **Measure Selection**: Evaluate treatment measure suitability
3. **Solution Recommendation**: Rank candidate solutions

## Input Requirements

- \`decision_type\`: One of \`cause_identification\`, \`measure_selection\`, or \`solution_recommendation\`
- \`context\`: Decision context data (traffic metrics, road attributes, constraints)
- \`candidates\` (optional): List of candidate options to evaluate
- \`threshold_high\` (optional): Confidence threshold for auto-approval (default: 0.8)
- \`threshold_low\` (optional): Confidence threshold for escalation (default: 0.4)

## Output

Returns structured confidence evaluation:
- \`confidence\`: Score in [0, 1]
- \`level\`: HIGH (≥0.8), MEDIUM (0.4-0.8), or LOW (<0.4)
- \`recommendation\`: Suggested next action
- \`reasoning\`: Explanation for the confidence score
- \`selectedOption\`: Chosen option for choice-type decisions

## Confidence Level Actions

| Level | Range | Action |
|-------|-------|--------|
| HIGH | ≥ 0.8 | Auto-approve, proceed with decision |
| MEDIUM | 0.4 - 0.8 | Requires simulation validation (via trans-mcp) |
| LOW | < 0.4 | Escalate to human expert |

## Example Usage

**Cause Identification:**
\`\`\`json
{
  "decision_type": "cause_identification",
  "context": {
    "road_id": "R001",
    "saturation": 0.95,
    "queue_length": 150,
    "signal_cycle": 120
  },
  "candidates": [
    "Capacity overload",
    "Signal timing inefficiency",
    "Traffic incident",
    "Geometric bottleneck"
  ]
}
\`\`\`

**Measure Selection:**
\`\`\`json
{
  "decision_type": "measure_selection",
  "context": {
    "proposed_measure": "Bus-only lane on Main St",
    "current_bus_volume": 45,
    "current_car_volume": 1200,
    "available_lanes": 3
  }
}
\`\`\`

**Solution Recommendation:**
\`\`\`json
{
  "decision_type": "solution_recommendation",
  "context": {
    "problem": "Morning peak congestion",
    "budget": 500000,
    "timeframe": "6 months"
  },
  "candidates": [
    "Signal coordination",
    "Ramp metering",
    "Lane addition"
  ]
}
\`\`\`

## Integration with Trans-MCP

Use JEV to filter decisions before running expensive simulations:

1. **High confidence** → Auto-approve, skip simulation
2. **Medium confidence** → Run simulation via trans-mcp for validation
3. **Low confidence** → Escalate to human expert

This reduces simulation load and prevents low-quality decisions from wasting computational resources.

## Configuration

Requires \`TYPESAFE_API_KEY\` environment variable. Get your API key from https://console.typesafe.ai/keys

Optional environment variables:
- \`JEV_BASE_URL\`: Custom endpoint (default: https://api.typesafe.ai/v1)
- \`JEV_MODEL\`: Model version (default: jev-latest)

## References

- TypeSafe AI Documentation: https://docs.typesafe.ai
- JEV Model: Li Y, Miao Y, Krishnan R. "JEV-as-a-judge: accept when confident, escalate when unsure"
`
}
