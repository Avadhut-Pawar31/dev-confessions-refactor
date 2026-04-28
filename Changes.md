# CHANGES.md

## Variable Renames

| Old Name | New Name | Why |
|---|---|---|
| d | confessionData | clearer meaning |
| arr | filteredConfessions | describes contents |
| res2 | formattedResponse | better readability |

## Function Splits

### handleAll() split into:

- validateConfessionInput()
- saveConfession()
- formatConfessionResponse()

Why:
Original function handled validation + DB + formatting together.
Splitting improves readability and testing.