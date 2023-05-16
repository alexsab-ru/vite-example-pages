import { fileURLToPath } from "url";
import { createServer } from "vite";
import presetIcons from "@unocss/preset-icons";

import pluginVue from "@vitejs/plugin-vue";

import path from "path";

import unocss from "unocss/vite";
import { presetAttributify, presetUno, presetWind } from "unocss";

import { InlineConfig } from "vite";
const __dirname = fileURLToPath(new URL(".", import.meta.url));

(async () => {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: __dirname,
    server: {
      port: 1337,
    },
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
  });
  await server.listen();

  server.printUrls();
})();
