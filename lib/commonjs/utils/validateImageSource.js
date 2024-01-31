"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertImageSource = assertImageSource;
const URI_SHEMES = ['file:', 'data:', 'http:', 'https:'];
function assertImageSource(imageSource) {
  const objectTypeSource = imageSource;
  if (typeof imageSource === 'number' || objectTypeSource.uri && URI_SHEMES.some(scheme => objectTypeSource.uri.startsWith(scheme))) {
    return;
  }
  throw new Error('Invalid image source');
}
//# sourceMappingURL=validateImageSource.js.map