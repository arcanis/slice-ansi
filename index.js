const ANSI_SEQUENCE = /^(.*?)(\x1b\[[^m]+m|\x1b\]8;;.*?\x07)/;

module.exports = (orig, at = 0, until = orig.length) => {
  // Because to do this we'd need to know the printable length of the string,
  // which would require to do two passes (or would complexify the main one)
  if (at < 0 || until < 0)
    throw new RangeError(`Negative indices aren't supported by this implementation`);
  
  at = Math.max(0, Math.min(at, orig.length));
  until = Math.max(0, Math.min(until, orig.length));
  
  const length = until - at;
  
  let output = ``;
  
  let skipped = 0;
  let visible = 0;
  
  while (orig.length > 0) {
    const lookup = orig.match(ANSI_SEQUENCE) || [orig, orig, undefined];
    
    const skipping = Math.min(at - skipped, lookup[1].length);
    lookup[1] = lookup[1].slice(skipping);
    
    const displaying = Math.min(length - visible, lookup[1].length);
    output += lookup[1].slice(0, displaying);
    
    skipped += skipping;
    visible += displaying;
    
    if (typeof lookup[2] !== `undefined`)
    output += lookup[2];
    
    orig = orig.slice(lookup[0].length);
  }
  
  return output;
};
