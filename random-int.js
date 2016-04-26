// Created by Jeremy Banks on http://stackoverflow.com/a/36528033
function randInt(min, max) {
  var MAX_UINT32 = 0xFFFFFFFF;
  var range = max - min;

  if (!(range <= MAX_UINT32)) {
    throw new Error(
      "Range of " + range + " covering " + min + " to " + max + " is > " +
      MAX_UINT32 + ".");
  } else if (min === max) {
    return min;
  } else if (!(max > min)) {
    throw new Error("max (" + max + ") must be >= min (" + min + ").");
  }

  // We need to cut off values greater than this to avoid bias in distribution
  // over the range.
  var maxUnbiased = MAX_UINT32 - ((MAX_UINT32 + 1) % (range + 1));

  var rand;
  do {
    rand = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (rand > maxUnbiased);

  var offset = rand % (range + 1);
  return min + offset;
}
