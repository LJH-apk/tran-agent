const strip1M = (value: string) => value.replace(/\[1m\]/gi, '')
const has1M = (value: string) => /\[1m\]/i.test(value)

/** Match menu aliases to the actual model, including explicit session overrides. */
export function getInitial1MSelections(
  values: readonly (string | null)[],
  initial: string | null,
  resolve: (value: string) => string,
  is1M: (value: string) => boolean = has1M,
): Set<string> {
  const marked = new Set<string>()
  for (const value of values) {
    if (value && is1M(resolve(value))) marked.add(strip1M(value))
  }
  if (initial !== null) {
    const initialModel = resolve(initial)
    for (const value of [...values, initial]) {
      if (value && strip1M(resolve(value)) === strip1M(initialModel)) {
        if (is1M(initialModel)) marked.add(strip1M(value))
        else marked.delete(strip1M(value))
      }
    }
  }
  return marked
}

/** A pinned [1m] mapping must not undo an explicit toggle off or duplicate tags. */
export function getModelPickerSelection(
  value: string,
  wants1M: boolean,
  resolve: (value: string) => string,
): string {
  const base = strip1M(value)
  const resolved = resolve(base)
  const selection = has1M(resolved) ? strip1M(resolved) : base
  return wants1M ? `${selection}[1m]` : selection
}
