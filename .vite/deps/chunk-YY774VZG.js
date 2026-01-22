// node_modules/.deno/@brillout+picocolors@1.0.29/node_modules/@brillout/picocolors/dist/esm/picocolors.browser.js
var picocolors_browser_default = new Proxy({}, {
  get: (_, p) => (s) => {
    if (p === "code")
      return `\`${s}\``;
    if (p === "string")
      return `'${s}'`;
    return s;
  }
});

export {
  picocolors_browser_default
};
//# sourceMappingURL=chunk-YY774VZG.js.map
