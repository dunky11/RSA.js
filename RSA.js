const crypto = require("crypto");
console.log(BigInt(42));

class RSA {
  isPrime(x) {
    if (x < 2) {
      return false;
    }
    for (let i = 2; i < x; i++) {
      if (x % n == 0) {
        return false;
      }
    }
    return true;
  }
  /**
   * https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test
   * Efficient algorithm to check if a number is a prime or not
   */
  millerRabinTest(n, k) {
    if (n == 2 || n == 3) {
      return true;
    }
    if (n % 2 == 0 || n < 2) {
      return false;
    }
    var s = 0;
    var d = n - 1;
    while (d % 2 == 0) {
      d /= 2;
      s++;
    }
    WitnessLoop: do {
      let x = Math.pow(2 + Math.floor(Math.random() * (n - 3)), d) % n;
      if (x == 1 || x == n - 1) {
        continue;
      }
      for (let i = s - 1; i--; ) {
        x = (x * x) % n;
        if (x == 1) {
          return false;
        }
        if (x == n - 1) {
          continue WitnessLoop;
        }
      }
      return false;
    } while (k--);
    return true;
  }

  greatestCommonDivisor(a, b) {
    let temp;
    while (true) {
      temp = a % b;
      if (temp === 0) {
        return b;
      }
      a = b;
      b = temp;
    }
  }

  genPrime(bitlength) {
    /**
     * Generate a random number with a length of bitlength
     */
    let randomNumber = crypto.randomBytes(2 ^ (bitlength + 1));
    console.log(randomNumber);
    /**
     * Set bit at index 0 to 1 (ensures that it's odd)
     */
    randomNumber = randomNumber | (1 << 0);
    /**
     * Set bit at highest index to 1. (Ensures that the number is of length
     * of bitlength)
     */
    randomNumber = randomNumber | (1 << bitlength);
    while (!this.millerRabinTest(randomNumber, 200)) {
      /**
       * += 2 because we know that the number is odd
       */
      randomNumber += 2;
    }
    return randomNumber;
  }
  generateKeys(bitLength) {
    if (bitLength % 2 !== 0) {
      throw Error("Only whole numbers are allowed as bitlength");
    }
    if (bitLength < 0) {
      throw Error("The bitlength cannot be negative");
    }

    const e = 65537;
    console.log(this.genPrime(bitLength));
    console.log(this.genPrime(bitLength));
    /*
    const n = p * q;
    let e = 2;
    const phi = (p - 1) * (q - 1);
    while (e < phi) {
      if (this.greatestCommonDivisor(e, phi) === 1) {
        break;
      }
      e++;
    }
  }
  */
  }
}

console.log(crypto);

const rsaGen = new RSA();
rsaGen.generateKeys(1024);
