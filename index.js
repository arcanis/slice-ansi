const ANSI_SEQUENCE = /^(.*?)(\x1b\[[^m]+m|\x1b\]8;;.*?(\x1b\\|\u0007))/;
const segmenter = new Intl.Segmenter(`en`, {granularity: `grapheme`});

function sliceAnsi(orig, at = 0, until = orig.length) {
  // Because to do this we'd need to know the printable length of the string,
  // which would require to do two passes (or would complexify the main one)
  if (at < 0 || until < 0)
    throw new RangeError(`Negative indices aren't supported by this implementation`);

  const length = until - at;

  let slice = ``;

  let skipped = 0;
  let visible = 0;

  while (orig.length > 0) {
    const lookup = orig.match(ANSI_SEQUENCE) || [orig, orig, undefined];
    let graphemes = Array.from(segmenter.segment(lookup[1]), entry => entry.segment);

    const skipping = Math.min(at - skipped, graphemes.length);
    graphemes = graphemes.slice(skipping);

    const displaying = Math.min(length - visible, graphemes.length);
    slice += graphemes.slice(0, displaying).join(``);

    skipped += skipping;
    visible += displaying;

    if (typeof lookup[2] !== `undefined`)
    slice += lookup[2];

    orig = orig.slice(lookup[0].length);
  }

  return {slice, visible};
}

module.exports = sliceAnsi;
