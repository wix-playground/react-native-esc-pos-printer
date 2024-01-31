const URI_SHEMES = ['file:', 'data:', 'http:', 'https:'];
export function assertImageSource(imageSource) {
  const objectTypeSource = imageSource;
  if (typeof imageSource === 'number' || objectTypeSource.uri && URI_SHEMES.some(scheme => objectTypeSource.uri.startsWith(scheme))) {
    return;
  }
  throw new Error('Invalid image source');
}
//# sourceMappingURL=validateImageSource.js.map