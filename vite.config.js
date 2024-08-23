import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const getCache = ({ name, pattern }) => {
  return {
    urlPattern: pattern,
    handler: 'CacheFirst',
    options: {
      cacheName: name,
      expiration: {
        maxEntries: 500,
        maxAgeSeconds: 60 * 60 * 24 * 365 * 2, // 2 years
      },
      cacheableResponse: {
        statuses: [200],
      },
    },
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',

    pwaAssets: {
      disabled: false,
      config: true,
    },
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],

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
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png"
          },
          {
              src: "/android-chrome-512x512.png",
              sizes: "256x256",
              type: "image/png"
          },
          {
              src: "/icon-384x384.png",
              sizes: "384x384",
              type: "image/png"
          },
          {
              src: "/icon-512x512.png",
              sizes: "512x512",
              type: "image/png"
          }
      ]
    },

    workbox: {
      runtimeCaching: [
        /**
         * function definition shown above
         * */
        getCache({
          pattern: /^https:\/\/res.cloudinary.com\/dhvpteclj/,
          name: 'img-cache',
        }),
      ],
      globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg,jfif,webp,avif,apng}'],
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