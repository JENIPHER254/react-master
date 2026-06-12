# Palindromes

A palindrome is a word, phrase, or number that reads the same forwards and backwards.

## Simple palindromes

- `racecar` - reads the same forwards and backwards
- `madam` - reads the same forwards and backwards
- `noon` - reads the same forwards and backwards
- `kayak` - reads the same forwards and backwards
- `level` - reads the same forwards and backwards

## Checking for palindromes

### Basic approach using string reversal

```js
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
```

### Two-pointer approach

```js
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('hello')); // false
```

## Examples of palindromes

Word palindromes:
- `racecar`
- `kayak`
- `level`
- `radar`
- `civic`

Phrase palindromes (ignoring spaces and punctuation):
- `A man, a plan, a canal: Panama`
- `Was it a car or a cat I saw?`
- `Madam, I'm Adam`

Number palindromes:
- `121`
- `1221`
- `12321`

## Checking number palindromes

```js
function isNumberPalindrome(num) {
  const str = Math.abs(num).toString();
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isNumberPalindrome(121)); // true
console.log(isNumberPalindrome(123)); // false
console.log(isNumberPalindrome(-121)); // true (ignores sign)
```

## Summary

- A palindrome reads the same forwards and backwards.
- `racecar` is a classic example.
- Check palindromes by reversing and comparing, or by using a two-pointer approach.
- Palindromes can be words, phrases, or numbers.
