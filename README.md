## How to do this:
### Generate keypair:
1. Get two random prime numbers -> p and q.
1. Multiply them -> n = p * q. P and q are the only pair of primenumbers which will be n when multiplied.
1. Look at all integers 1 ... n. Find out the amount of integers which are not common factors of n(also called coprimes of n).
1. Step 3 can be shortenend with the formula: ϕ(n) = (p-1)(q-1)
1. Pick e. E must have two properties:
   1. 1 < e < ϕ(n)
   1. e must be a corpime of n and ϕ(n)
1. Our public key is (e, n)
1. Pick d, so that d * e(mod ϕ(n)) = 1
1. Our private key is (d, n)
