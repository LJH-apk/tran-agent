# JEV Tool

JEV (Joint Embedding Verification) Tool integrates TypeSafe AI's System One API for high-stakes decision-making with confidence calibration.

## Overview

JEVTool provides AI-powered decision support for scenarios requiring:
- **Cause identification**: Diagnose root causes from symptoms
- **Measure selection**: Choose optimal interventions
- **Solution recommendation**: Rank and recommend solutions with confidence levels

## Configuration

Set the TypeSafe AI API key via environment variable:

```bash
export TYPESAFE_API_KEY="your-api-key-here"
```

Optional configuration:
```bash
export JEV_BASE_URL="https://api.typesafe.ai/v1"  # Default
export JEV_MODEL="jev-latest"                   # Default
```

## Usage

The tool is automatically available in Tran Agent as `JEVEvaluate`. Example invocation:

```typescript
{
  decision_type: "cause_identification",
  context: {
    road_id: "R001",
    saturation: 0.95,
    queue_length: 120,
    incident_count: 3
  },
  candidates: ["traffic_signal", "road_capacity", "incident"]
}
```

## API Reference

### Input Schema

```typescript
{
  decision_type: 'cause_identification' | 'measure_selection' | 'solution_recommendation'
  context: Record<string, unknown>  // Domain-specific context
  candidates?: string[]              // Optional list of options to evaluate
}
```

### Output Schema

```typescript
{
  confidence: number              // 0.0 to 1.0
  level: 'high' | 'medium' | 'low'
  recommendation: string          // Human-readable recommendation
  reasoning?: string              // Optional explanation
  selectedOption?: string         // Selected candidate (if applicable)
}
```

## Architecture

### Components

1. **JEVTool.ts**: Main tool implementation
   - Read-only, concurrency-safe
   - Integrates with Claude Code's tool system
   - Handles input validation and permission checking

2. **client.ts**: TypeSafe AI API client
   - HTTP client with a 30-second default timeout
   - Converts between internal and API formats
   - Manages authentication

3. **types.ts**: Type definitions
   - Decision types enumeration
   - Confidence level classification
   - API request/response schemas

4. **prompt.ts**: Tool documentation
   - User-facing description
   - Usage guidelines
   - Best practices

### Decision Flow

```
User Request
    ↓
JEVTool.call()
    ↓
Input Validation
    ↓
Build Questions (decision type → question templates)
    ↓
TypeSafe AI API Call
    ↓
Parse Responses
    ↓
Calculate Confidence & Select Best Option
    ↓
Return DecisionResult
```

## Testing

Run the test suite:

```bash
cd packages/builtin-tools
bun test src/tools/JEVTool/__tests__/
```

Test coverage:
- Schema validation
- Client API calls
- Confidence calculation
- Error handling
- Rendering logic

## Implementation Notes

### Confidence Calibration

The tool averages confidence scores across answers:

```typescript
confidence = Σ(answer.confidence) / number_of_answers
```

Confidence levels:
- **HIGH**: ≥ 0.8
- **MEDIUM**: ≥ 0.4 and < 0.8
- **LOW**: < 0.4

### Question Templates

Each decision type maps to specific question patterns:

- **cause_identification**: Diagnosis confidence (score 1-4), plus a cause choice when candidates are supplied
- **measure_selection**: Suitability and implementation feasibility (scores 1-4)
- **solution_recommendation**: Recommendation confidence (score 1-4), plus a solution choice when candidates are supplied

### Error Handling

- Missing API key: Returns error with setup instructions
- API timeout: 30s default, configurable through `JEVClient` constructor options
- Network errors: Propagated with context
- Tool input and output: Described with Zod schemas

## Integration Example

```typescript
import { JEVTool } from './tools/JEVTool/JEVTool.js'

// Traffic congestion diagnosis
const result = await JEVTool.call(
  {
    decision_type: 'cause_identification',
    context: {
      road_id: 'R001',
      saturation: 0.95,
      speed_avg: 15.2,
      queue_length: 120
    },
    candidates: ['signal_timing', 'lane_blockage', 'high_demand']
  },
  toolContext
)

console.log(result.data.recommendation)
// "High confidence (87.5%): signal_timing is the primary cause"
```

## References

- [TypeSafe AI Documentation](https://docs.typesafe.ai)
- [System One API Reference](https://docs.typesafe.ai/api-reference)
- [Claude Code Tool Development](https://docs.anthropic.com/claude-code)
