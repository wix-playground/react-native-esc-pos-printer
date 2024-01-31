export function remapConstants(constants) {
  return Object.keys(constants).reduce((acc, key) => {
    const value = constants[key];
    acc[String(value)] = key;
    return acc;
  }, {});
}
//# sourceMappingURL=constants.js.map