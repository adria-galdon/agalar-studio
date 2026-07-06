# Agalar Studio — Web

Web del estudio de videojuegos Agalar Studio. Portfolio escalable pensado
para crecer a medida que se lanzan nuevos juegos.

Construida con **Next.js 15** (App Router), **React 19** y **TypeScript**.
Sin dependencias de UI pesadas: estilos con CSS Modules y variables CSS.

## Arranque rápido

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila para producción |
| `npm start` | Sirve la build de producción |
| `npm run lint` | Linter de Next.js |

## Cómo añadir un juego nuevo

Todo el contenido de juegos vive en un solo sitio: **`src/data/games.ts`**.

Para añadir un juego, añade un objeto al array `games`:

```ts
{
  slug: "mi-nuevo-juego",     // aparece en la URL: /games/mi-nuevo-juego
  title: "Mi Nuevo Juego",
  tagline: "Una frase que lo define.",
  status: "announced",         // "released" | "in-development" | "announced"
  year: "2027",
  platforms: ["Android", "iOS"],
  genres: ["Puzzle", "Aventura"],
  accent: "#F59E5B",           // color propio del juego
  description: [
    "Primer párrafo de la descripción larga.",
    "Segundo párrafo.",
  ],
  links: [
    { label: "Google Play", href: "https://..." },
  ],
}
```

Con eso, automáticamente aparece:
- una tarjeta en la home (sección Juegos)
- su propia página en `/games/mi-nuevo-juego`
- metadatos SEO propios

No hay que tocar ningún componente.

## Demo jugable de Nexus

La home incluye un **demo real de la mecánica de Nexus** (`#demo`): un puzzle
de conexión de nodos sin cruces jugable con ratón y con el dedo. Los niveles
viven en **`src/data/puzzles.ts`** y están diseñados por construcción para que
siempre tengan solución que rellena la cuadrícula.

Para añadir un nivel, añade un objeto al array `puzzles` con su `size` y los
pares de extremos. El motor (`src/components/NexusDemo.tsx`) es puro y fácil de
razonar; hay un test manual de resolubilidad en el historial de desarrollo.

## Captación de correo ("Notifícame")

El formulario (footer, banda inferior y pantalla de victoria del demo) envía a
**`/api/subscribe`**. Funciona sin configurar nada (registra el alta en el log).
Para conectarlo a un proveedor real, copia `.env.example` a `.env.local`:

- **Resend**: `RESEND_API_KEY` + `NOTIFY_AUDIENCE_ID`.
- **Webhook** (Zapier/Make/propio): `SUBSCRIBE_WEBHOOK_URL`.

Incluye validación, honeypot anti-bots y rate-limit por IP.

## SEO y PWA

- **`sitemap.xml`**, **`robots.txt`** y **manifest** se generan solos
  (`src/app/sitemap.ts`, `robots.ts`, `manifest.ts`).
- **Datos estructurados** (Schema.org `Organization` + `VideoGame`) en el
  `<head>` para buscadores y redes.
- **PWA instalable** con service worker offline (`public/sw.js`), registrado
  solo en producción.

> Antes de publicar, cambia la URL base `https://agalarstudio.com` en
> `layout.tsx`, `sitemap.ts` y `robots.ts` por tu dominio real.

## Estructura

```
src/
├── app/
│   ├── layout.tsx           # layout raíz, fuentes, SEO global, JSON-LD, PWA
│   ├── page.tsx             # home (Hero + Juegos + Demo + Roadmap + Estudio + Notify)
│   ├── globals.css          # tokens de diseño y estilos base
│   ├── not-found.tsx        # 404
│   ├── sitemap.ts           # sitemap.xml automático
│   ├── robots.ts            # robots.txt automático
│   ├── manifest.ts          # manifest PWA
│   ├── api/subscribe/       # endpoint de "Notifícame"
│   └── games/[slug]/        # página dinámica por juego
├── components/              # Hero, GamesGrid, NexusDemo, NotifyForm/Band, Reveal…
└── data/
    ├── games.ts             # ← fuente única de datos de juegos
    └── puzzles.ts           # ← niveles del demo jugable
```

## Imágenes de los juegos

Cuando tengas arte, colócalo en `public/games/` y referencia la ruta
en el campo `cover` / `screenshots` del juego en `games.ts`. La página
de detalle ya está preparada para mostrarlas (ahora usa un fondo de
acento como placeholder).

## Personalización de marca

- Colores y tipografía: `src/app/globals.css` (bloque `:root`)
- Logo (símbolo + wordmark): `src/components/Logo.tsx`
- Favicon: `public/logos/mark.svg`

## Despliegue

La opción más simple es **Vercel** (los creadores de Next.js):
conecta el repositorio de GitHub y se despliega solo.

Alternativa estática (GitHub Pages, Netlify): descomenta `output: "export"`
e `images.unoptimized` en `next.config.ts` y usa `npm run build` —
genera la web en `/out`.
