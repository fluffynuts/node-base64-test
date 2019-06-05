module.exports = class ArbNumber {
  get value() {
    return this._value.join("");
  }

  constructor(
    chars,
    onWidthIncrease
  ) {
    this._chars = chars;
    this._map = chars.split("").reduce((acc, cur, idx) => {
      acc[cur] = idx;
      return acc;
    }, {});
    this._value = [];
    this._onWidthIncrease = onWidthIncrease || (() => {});
  }

  increment() {
    for (var i = this._value.length - 1; i > -1; i--) {
      if (this._incrementAt(i)) {
        return;
      }
    }
    this._onWidthIncrease();
    this._value.push(this._chars[0]);
  }

  _incrementAt(pos) {
    const
      currentChar = this._value[pos],
      charPos = this._map[currentChar],
      nextChar = this._chars[charPos + 1];
    if (nextChar) {
      this._value[pos] = nextChar;
      return true;
    }
    this._value[pos] = this._chars[0];
    return false;
  }
}
