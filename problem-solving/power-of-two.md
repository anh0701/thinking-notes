# Power of Two

## Problem

Given an integer `n`, determine whether `n` is a power of 2.

A positive integer is a power of 2 if it can be written as:

```text
n = 2^k
```

where `k` is a non-negative integer.

Examples:

```text
1  = 2^0  → true
2  = 2^1  → true
4  = 2^2  → true
8  = 2^3  → true
16 = 2^4  → true

3  → false
6  → false
10 → false
```

---

## Approach 1: Repeated Division

The most straightforward approach is to repeatedly divide `n` by `2`.

If `n` is a power of 2, repeatedly dividing it by `2` will eventually produce `1` without leaving a remainder.

### Idea

For example:

```text
16 → 8 → 4 → 2 → 1
```

But:

```text
12 → 6 → 3
```

Since `3` cannot be divided evenly by `2`, `12` is not a power of 2.

### Implementation

```js
function isPowerOfTwo(n) {
    if (n <= 0) {
        return false;
    }

    while (n % 2 === 0) {
        n /= 2;
    }

    return n === 1;
}
```

### Complexity

Let `n` be the input.

Each iteration divides `n` by `2`, so the number of iterations is approximately `log₂(n)`.

```text
Time:  O(log n)
Space: O(1)
```

### Advantages

* Easy to understand.
* Does not depend on floating-point calculations.
* Works directly from the mathematical definition.

### Disadvantages

* Requires a loop.
* Not as efficient as the bitwise approach.

---

## Approach 2: Using Logarithms

From:

```text
n = 2^k
```

we can take the logarithm base 2:

```text
log₂(n) = k
```

Therefore, `n` is a power of 2 if `log₂(n)` is an integer.

### Implementation

```js
function isPowerOfTwo(n) {
    if (n <= 0) {
        return false;
    }

    const exponent = Math.log2(n);

    return Number.isInteger(exponent);
}
```

### Complexity

```text
Time:  O(1)
Space: O(1)
```

### Advantages

* Very short implementation.
* No loop is required.
* Directly follows the mathematical definition.

### Disadvantages

The main problem is **floating-point precision**.

Logarithmic calculations are performed using floating-point arithmetic, so relying on exact integer results can introduce precision issues for sufficiently large values or in environments with limited numeric precision.

Therefore, although this approach is mathematically elegant, it is generally less robust than an integer-based solution.

---

## Approach 3: Bit Manipulation

This is the most interesting approach because powers of 2 have a special property in binary.

Every positive power of 2 contains exactly **one `1` bit**.

```text
1  = 0001
2  = 0010
4  = 0100
8  = 1000
16 = 10000
```

Now consider what happens when we subtract `1`.

For example:

```text
8      = 1000
8 - 1  = 0111
```

The only `1` bit of `8` becomes `0`, while all bits to its right become `1`.

Therefore:

```text
1000
0111
----
0000
```

So:

```text
n & (n - 1) === 0
```

is true only when `n` contains exactly one set bit.

### Implementation

```js
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
```

### Example

For `8`:

```text
n     = 1000
n - 1 = 0111

1000
0111
----
0000
```

Therefore:

```text
8 & 7 = 0
```

For `10`:

```text
n     = 1010
n - 1 = 1001

1010
1001
----
1000
```

Therefore:

```text
10 & 9 ≠ 0
```

So `10` is not a power of 2.

### Complexity

```text
Time:  O(1)
Space: O(1)
```

### Important Edge Case

`0` also satisfies:

```text
0 & (0 - 1) === 0
```

Therefore, the condition must include:

```js
n > 0
```

The complete condition is:

```js
n > 0 && (n & (n - 1)) === 0
```

---

## Comparison

| Approach          |       Time |  Space | Main Idea                             | Main Concern                                 |
| ----------------- | ---------: | -----: | ------------------------------------- | -------------------------------------------- |
| Repeated Division | `O(log n)` | `O(1)` | Keep dividing by 2                    | Requires iteration                           |
| Logarithm         |     `O(1)` | `O(1)` | Check whether `log₂(n)` is an integer | Floating-point precision                     |
| Bit Manipulation  |     `O(1)` | `O(1)` | A power of 2 has exactly one set bit  | Requires understanding binary representation |

---

## Why Does `n & (n - 1)` Work?

The key property is:

> A positive power of 2 has exactly one set bit in its binary representation.

For example:

```text
2^0 = 0001
2^1 = 0010
2^2 = 0100
2^3 = 1000
2^4 = 10000
```

Subtracting `1` changes that single `1` bit into `0` and changes every bit to its right into `1`.

Therefore, the two numbers have no common set bits:

```text
n       = 10000
n - 1   = 01111
          -----
n & n-1 = 00000
```

For a number that is not a power of 2, there are multiple `1` bits, so at least one of them remains in the result.

---

## Final Takeaway

There are several ways to solve the same problem:

```text
Mathematical definition
        ↓
Repeated Division
        ↓
Logarithm
        ↓
Binary representation
        ↓
Bit Manipulation
```

The repeated-division approach is the most intuitive because it directly follows the definition of a power of 2.

The logarithm approach is concise, but floating-point precision makes it less suitable when exact integer behavior is important.

The bit manipulation approach takes advantage of a structural property of powers of 2. It achieves `O(1)` time and avoids floating-point calculations:

```js
n > 0 && (n & (n - 1)) === 0
```

The important lesson is not only how to check whether a number is a power of 2, but how recognizing a mathematical or binary property can lead to a simpler and more efficient algorithm.
