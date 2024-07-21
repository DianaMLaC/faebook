// import { defineConfig } from "vite"
// import RubyPlugin from "vite-plugin-ruby"

// export default defineConfig({
//   build: { sourcemap: true },
//   plugins: [RubyPlugin()],
//   server: {
//     proxy: {
//       "/": {
//         target: "http://localhost:3000",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//     port: 3036,
//   },
// })

import { defineConfig } from "vite"
import RubyPlugin from "vite-plugin-ruby"

export default defineConfig({
  build: { sourcemap: true },
  plugins: [RubyPlugin()],
})
