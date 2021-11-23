# `@arcanis/slice-ansi`

> Slice strings while preserving ansi characters

[![](https://img.shields.io/npm/v/@arcanis/slice-ansi.svg)]() [![](https://img.shields.io/npm/l/@arcanis/slice-ansi.svg)]() [![](https://img.shields.io/badge/developed%20with-Yarn%202-blue)](https://github.com/yarnpkg/berry)

## Installation

```
yarn add @arcanis/slice-ansi
```

## Why

Unlike the [Chalk version](https://github.com/chalk/slice-ansi), this completely different implementation:

- Supports terminal hyperlinks
- Leverages the native grapheme splitting API if available
- Doesn't require ESM, because it's an inane requirement for a library like this

## Caveat

This implementation also doesn't attempt to interpret the escape codes to optimize them away. So for instance, if you start with the following but only want to keep the first 16 characters:

```
${openBold}This is the header with ${openRed}ansi words${closeRed}${closeBold}
```

The end result will be:

```
${openBold}This is the head${openRed}${closeRed}${closeBold}
```

As you can see, the `${openRed}${closeRed}` didn't get removed, even if they are now empty. This is because this package doesn't know that `openRed` (`\u001b[31m`) is "closed" by `closeRed` (`\u001b[39m`). Keeping these information would make the package more complex for a benefit deemed fairly limited, since nothing will be printed anyway.

## License (MIT)

> **Copyright © 2020 Mael Nison**
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
