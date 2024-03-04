const spliceAnsi = require(`./index`);

describe(`sliceAnsi`, () => {
  it(`should splice empty strings just fine`, () => {
    expect(spliceAnsi(``)).toEqual({slice: ``, visible: 0});
  });

  it(`should splice regular strings just fine`, () => {
    expect(spliceAnsi(`foo`)).toEqual({slice: `foo`, visible: 3});
  });

  it(`should splice strings with parameters just fine`, () => {
    expect(spliceAnsi(`foobar`, 1, 3)).toEqual({slice: `oo`, visible: 2});
  });

  it(`shouldn't care if the splice goes beyond the string length`, () => {
    expect(spliceAnsi(`foobar`, 0, 100)).toEqual({slice: `foobar`, visible: 6});
  });

  it(`should preserve escape codes preceding the slice`, () => {
    expect(spliceAnsi(`\x1b[3mfoobar`, 1)).toEqual({slice: `\x1b[3moobar`, visible: 5});
  });

  it(`should preserve escape codes following the slice`, () => {
    expect(spliceAnsi(`foobar\x1b[3m`, 0, 5)).toEqual({slice: `fooba\x1b[3m`, visible: 5});
  });

  it(`should preserve escape codes inside a slice`, () => {
    expect(spliceAnsi(`hello wo\x1b[3mrld f\x1b[6moo bar`, 1, 18)).toEqual({slice: `ello wo\x1b[3mrld f\x1b[6moo ba`, visible: 17});
  });

  it(`should slice across hyperlinks`, () => {
    expect(spliceAnsi(`foo\x1b]8;;https://example.org\x1b\\bar\x1b]8;;\x1b\\baz`, 1, 8)).toEqual({slice: `oo\x1b]8;;https://example.org\x1b\\bar\x1b]8;;\x1b\\ba`, visible: 7});
    expect(spliceAnsi(`foo\x1b]8;;https://example.org\x07bar\x1b]8;;\x07baz`, 1, 8)).toEqual({slice: `oo\x1b]8;;https://example.org\x07bar\x1b]8;;\x07ba`, visible: 7});
  });

  it(`should remove mode change escape codes`, () => {
    expect(spliceAnsi(`\x1b[?2004hfoo`, 0, 3)).toEqual({slice: `foo`, visible: 3});
  });

  it(`should work with a variety of complexish cases`, () => {
    expect(spliceAnsi(`\x1b[93m➤\x1b[39m foo`, 0, 5)).toEqual({slice: `\x1b[93m➤\x1b[39m foo`, visible: 5});
  });
});
