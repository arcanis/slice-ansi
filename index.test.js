const spliceAnsi = require(`./index`);

describe(`sliceAnsi`, () => {
  it(`should splice empty strings just fine`, () => {
    expect(spliceAnsi(``)).toEqual(``);
  });
  
  it(`should splice regular strings just fine`, () => {
    expect(spliceAnsi(`foo`)).toEqual(`foo`);
  });
  
  it(`should splice strings with parameters just fine`, () => {
    expect(spliceAnsi(`foobar`, 1, 3)).toEqual(`oo`);
  });
  
  it(`shouldn't care if the splice goes beyond the string length`, () => {
    expect(spliceAnsi(`foobar`, 0, 100)).toEqual(`foobar`);
  });
  
  it(`should preserve escape codes preceding the slice`, () => {
    expect(spliceAnsi(`\x1b[3mfoobar`, 1)).toEqual(`\x1b[3moobar`);
  });
  
  it(`should preserve escape codes following the slice`, () => {
    expect(spliceAnsi(`foobar\x1b[3m`, 0, 5)).toEqual(`fooba\x1b[3m`);
  });
  
  it(`should preserve escape codes inside a slice`, () => {
    expect(spliceAnsi(`hello wo\x1b[3mrld f\x1b[6moo bar`, 1, 18)).toEqual(`ello wo\x1b[3mrld f\x1b[6moo ba`);
  });

  it.only(`should work on color-intensive lines`, () => {
    expect(spliceAnsi(
      `\x1b[93m➤\x1b[39m \x1b]8;;https://yarnpkg.com/advanced/error-codes#yn0002---missing_peer_dependency\x1b\YN0002\x1b]8;;\x1b: │ \x1b[38;2;215;95;0m@webpack-cli/\x1b[39m\x1b[38;2;215;135;95mpackage-utils\x1b[39m\x1b[38;2;135;175;255m@\x1b[39m\x1b[38;2;135;175;255mnpm:1.0.1-alpha.4\x1b[39m doesn't provide \x1b[38;2;215;135;95mwebpack\x1b[39m\x1b[38;2;0;175;175m@\x1b[39m\x1b[38;2;0;175;175m^4.41.6\x1b[39m requested by \x1b[38;2;215;95;0m@webpack-cli/\x1b[39m\x1b[38;2;215;135;95mlogger\x1b[39m\x1b[38;2;135;175;255m@\x1b[39m\x1b[38;2;135;175;255mnpm:1.0.1-alpha.4\x1b[39m`,
      0,
      80,
    )).toEqual(
      `\x1b[93m➤\x1b[39m \x1b]8;;https://yarnpkg.com/advanced/error-codes#yn0002---missing_peer_dependency\x1bYN0002\x1b]8;;\x1b: │ \x1b[38;2;215;95;0m@webpack-cli/\x1b[39m\x1b[38;2;215;135;95mpackage-utils\x1b[39m\x1b[38;2;135;175;255m@\x1b[39m\x1b[38;2;135;175;255mnpm:1.0.1-alpha.4\x1b[39m doesn't provide \x1b[38;2;215;135;95mwebpack\x1b[39m\x1b[38;2;0;175;175m\x1b[39m\x1b[38;2;0;175;175m\x1b[39m\x1b[38;2;215;95;0m\x1b[39m\x1b[38;2;215;135;95m\x1b[39m\x1b[38;2;135;175;255m\x1b[39m\x1b[38;2;135;175;255m\x1b[39m`,
    );
  })
});
