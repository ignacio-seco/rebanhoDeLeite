import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      theme_color: "#000000",
      background_color: "#ec7d12",
      display: "standalone",
      scope: "/",
      start_url: "/",
     name: "Virtual Animal Control App",
      short_name: "V.A.C.A",
      description: "Gerenciamento Animal",
      icons: [
          {
              "src": "/android-chrome-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
          },
          {
              "src": "/android-chrome-512x512.png",
              "sizes": "256x256",
              "type": "image/png"
          },
          {
              "src": "/icon-384x384.png",
              "sizes": "384x384",
              "type": "image/png"
          },
          {
              "src": "/icon-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
          }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})