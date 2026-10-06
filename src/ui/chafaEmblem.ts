import stripAnsi from 'strip-ansi'
import variants from './tranEmblemChafa.json'

export function getChafaEmblem(columns: number, rows: number) {
  return (
    variants.find(
      variant => variant.width < columns && variant.rows.length + 6 < rows,
    ) ?? variants[variants.length - 1]!
  )
}

export function renderChafaRow(row: string, useColor: boolean): string {
  // Keep chafa's original foreground/background colors instead of tinting it blue.
  return useColor ? row : stripAnsi(row)
}
