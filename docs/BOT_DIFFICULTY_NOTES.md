# Bot Difficulty Notes

This document describes the current bot heuristics by difficulty.

## Easy
- Claims any available Protocol first.
- Builds the first affordable Market Node, then affordable reserved nodes.
- Reserves a high-value Market Node if possible.
- Otherwise collects energy based on pool availability.

## Medium
- Builds the best efficiency node when affordable (market first, then reserved).
- Claims any available Protocol after build checks.
- Reserves a high-value Market Node if possible.
- Collects energy toward a best-value target node.

## Hard
- Prioritizes claiming a Protocol when close to a Protocol win.
- Denies opponents near a Protocol by building or reserving nodes that provide missing output types.
- Uses a value score for node selection:
- Score = (efficiency × 2) + output + effectValue − (cost × 0.4)
- Builds best efficiency per cost if no urgent win/deny.
- Reserves a high-value Market Node if possible.
- Exchange happens only when it makes a target node affordable.

## Shared Rules
- Output-based cost deduction is included via `calculateNodeCost`.
- Flux is never collected from the pool.
- Exchange excludes Flux and respects pool constraints.
