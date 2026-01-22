import {
  require_react
} from "./chunk-XDPZ627F.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/.deno/vike-react@0.6.13/node_modules/vike-react/dist/hooks/usePageContext.js
var import_react = __toESM(require_react());

// node_modules/.deno/vike-react@0.6.13/node_modules/vike-react/dist/utils/getGlobalObject.js
function getGlobalObject(key, defaultValue) {
  const globalObjectsAll = globalThis[projectKey] = globalThis[projectKey] || {};
  const globalObject2 = globalObjectsAll[key] = globalObjectsAll[key] || defaultValue;
  return globalObject2;
}
var projectKey = "_vike_react";

// node_modules/.deno/vike-react@0.6.13/node_modules/vike-react/dist/hooks/usePageContext.js
var globalObject = getGlobalObject("usePageContext.tsx", {
  reactContext: import_react.default.createContext(void 0)
});
function VikeReactProviderPageContext({ pageContext, children }) {
  const { reactContext } = globalObject;
  return import_react.default.createElement(reactContext.Provider, { value: pageContext }, children);
}
function usePageContext() {
  const { reactContext } = globalObject;
  const pageContext = (0, import_react.useContext)(reactContext);
  return pageContext;
}

export {
  getGlobalObject,
  VikeReactProviderPageContext,
  usePageContext
};
//# sourceMappingURL=chunk-4ZUYMVGB.js.map
