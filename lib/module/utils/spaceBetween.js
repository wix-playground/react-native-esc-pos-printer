// @ts-ignore
import wordwrap from 'wordwrapjs';
function fillGap(symbol, length) {
  return symbol.repeat(length);
}
function getTextsWidths(fullLength, textToWrap, textToWrapWidth, right, left) {
  let leftTextWidth;
  let rightTextWidth;
  if (!textToWrapWidth) {
    const halfLength = Math.floor(fullLength / 2);
    if (textToWrap === 'left') {
      leftTextWidth = right.length < fullLength ? fullLength - right.length : halfLength;
    } else {
      leftTextWidth = left.length < fullLength ? left.length : halfLength;
    }
  } else {
    if (textToWrap === 'left') {
      leftTextWidth = textToWrapWidth * fullLength;
    } else {
      leftTextWidth = (1 - textToWrapWidth) * fullLength;
    }
  }
  rightTextWidth = fullLength - leftTextWidth;
  return {
    leftTextWidth,
    rightTextWidth
  };
}
export const spaceBetween = (length, {
  left,
  right,
  textToWrap = 'left',
  textToWrapWidth,
  gapSymbol = ' ',
  noTrim
}) => {
  const {
    leftTextWidth,
    rightTextWidth
  } = getTextsWidths(length, textToWrap, textToWrapWidth || 0, right, left);
  const leftWrappedTextArray = wordwrap.wrap(left, {
    width: leftTextWidth,
    break: true,
    noTrim
  }).split('\n');
  const rightWrappedTextArray = wordwrap.wrap(right, {
    width: rightTextWidth,
    break: true,
    noTrim
  }).split('\n');
  return Array.from({
    length: Math.max(leftWrappedTextArray.length, rightWrappedTextArray.length)
  }, (_, index) => {
    const leftText = leftWrappedTextArray[index] || '';
    const rightText = rightWrappedTextArray[index] || '';
    const spacesAmount = length - leftText.length - rightText.length;
    const gaps = index === 0 ? fillGap(gapSymbol, spacesAmount) : fillGap(' ', spacesAmount);
    return `${leftText}${gaps}${rightText}`;
  }).join('\n');
};
//# sourceMappingURL=spaceBetween.js.map