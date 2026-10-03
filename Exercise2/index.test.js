import assert from 'node:assert/strict'

import { sum } from './index.js'

describe('sum', () => {
  it('should add 1 + 2 to equal 3', () => {
    assert.equal(sum(1, 2), 3)
  })

  it('should add two decimal numbers within floating-point tolerance', () => {
    const result = sum(0.1, 0.2)

    assert.ok(Math.abs(result - 0.3) < Number.EPSILON)
  })
})
