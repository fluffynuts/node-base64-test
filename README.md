### node-base64-test

This is just a small script to demonstrate that a base64-encoded string from Node's Buffer
_can_ contain the `+` character. Seems like an obvious thing to say, considering
[the base64 character table](https://en.wikipedia.org/wiki/Base64#Base64_table), however
I overheard someone saying "I've never seen a + in a base64 string" and thought:
1. Perhaps Node uses one of the encodings from the above table which omits the `+`, like the url-safe one
2. Perhaps it's just not a character which is hit very often

So I wrote this little script, which, as a whole, isn't that interesting, but it _was_
fun coming up with a brute-forcing strategy:
- establish a character set
- start with the first character in that set
- "increment" that character until out of characters
    - when out of characters, reset back to the first from the set
    - append a new character (the first from the set) and increment that, as above
    - propagate increments up the string

The above was interesting to me because it made me think about how numbers from any
base would be incremented, visually. It's easy to take for granted the output from the
following (found in [count.js](count.js)):

```javascript
(async function() {
    async function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
    const blank = "       ";
    for (let i = 1000; i < 10000; i++) {
        process.stdout.write(`\r${blank}\r${i}`);
        await sleep(50);
    }
})();
```

We see a pretty incrementing counter (the `sleep` calls are put in there so it's not over
before you've had a chance to see what's going on and I keep it in the 1000-9999 range to
make the output flow seem prettier) -- and I needed a similar counter which,
instead of running over the character set `0123456789`, could run over an arbitrary
character set.

Of course, this is by no means the only solution. If what we were looking for were an
alternative base system for numbers, this is a pretty crap implementation. For starters,
one can't read out the value. It would probably (_definitely_) be better to have something
which is base-aware and has an internal numeric value. Perhaps I'll do that some time (:
For now, as a brute-forcing strategy with a given character set, this will do.