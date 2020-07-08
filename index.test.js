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
});
