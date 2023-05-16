import presetIcons from "@unocss/preset-icons";

import pluginVue from "@vitejs/plugin-vue";

import path from "path";

import unocss from "unocss/vite";
import { presetAttributify, presetUno, presetWind } from "unocss";

import { InlineConfig } from "vite";

export const safeDirname = (url?: string, relativePath = ""): string => {
  if (!url) return "";
  return path.join(new URL(".", url).pathname, relativePath);
};

export default (_opts: { buildName: string }): InlineConfig => {
  const vars = {
    NODE_ENV: "production",
  };

  const root = safeDirname(import.meta.url);

  const processDefines = Object.fromEntries(
    Object.entries(vars).map(([k, v]) => {
      return [`process.env.${k}`, JSON.stringify(v)];
    })
  );

  const { buildName } = _opts;

  let ssr;
  let ssrManifest;
  let outDir;
  if (buildName === "testAppServer") {
    ssr = path.join(root, "src/server-entry.ts");
    outDir = path.join(root, "dist", "server");
  } else if (buildName == "testAppClient") {
    ssrManifest = true;
    outDir = path.join(root, "dist", "client");
  }

  return {
    define: processDefines,
    configFile: false,
    root,
    build: { outDir, ssr, ssrManifest },
    server: { middlewareMode: true },
    plugins: [
      pluginVue(),
      unocss({
        presets: [
          presetIcons(),
          presetUno(),
          presetWind(),
          presetAttributify(),
        ],
      }),
    ],
  };
};
