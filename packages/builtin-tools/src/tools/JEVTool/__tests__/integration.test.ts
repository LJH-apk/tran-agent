import { describe, expect, test } from 'bun:test'
import { JEVTool } from '../JEVTool.js'

describe('JEVTool Integration', () => {
	test('should be exported correctly', () => {
		expect(JEVTool).toBeDefined()
		expect(JEVTool.name).toBe('JEVEvaluate')
	})

	test('should have all required tool interface methods', () => {
		expect(typeof JEVTool.description).toBe('function')
		expect(typeof JEVTool.prompt).toBe('function')
		expect(typeof JEVTool.call).toBe('function')
		expect(typeof JEVTool.isReadOnly).toBe('function')
		expect(typeof JEVTool.isConcurrencySafe).toBe('function')
		expect(typeof JEVTool.renderToolUseMessage).toBe('function')
		expect(typeof JEVTool.mapToolResultToToolResultBlockParam).toBe('function')
	})

	test('should have correct tool properties', () => {
		expect(JEVTool.isReadOnly()).toBe(true)
		expect(JEVTool.isConcurrencySafe()).toBe(true)
		expect(JEVTool.maxResultSizeChars).toBeGreaterThan(0)
	})

	test('should have valid input schema', () => {
		expect(JEVTool.inputSchema).toBeDefined()
		expect(JEVTool.inputSchema.parse).toBeDefined()

		// Test valid input
		const validInput = {
			decision_type: 'cause_identification',
			context: { test: true },
		}
		expect(() => JEVTool.inputSchema.parse(validInput)).not.toThrow()
	})

	test('should have search hint for tool discovery', () => {
		expect(JEVTool.searchHint).toBeDefined()
		expect(JEVTool.searchHint.length).toBeGreaterThan(0)
	})
})
