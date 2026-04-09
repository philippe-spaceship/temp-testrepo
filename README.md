# temp-testrepo

Mini order-pricing engine with promo rules and manual review heuristics.

## Why this is good for auto-documentation testing

- Multiple modules with imports (`index` -> `pricing` -> `promo`)
- Business rules with edge cases (tax, shipping thresholds, promo types)
- Decision logic (`flagForManualReview`) that can be explained in docs

## Run

```bash
npm install
npm run demo
```

## Suggested test pushes

1. Push baseline implementation.
2. Change tax rate or shipping threshold.
3. Add a new promo type like `BOGO`.
4. Update manual review logic and observe changelog output.
