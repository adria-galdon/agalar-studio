// Fuente única de datos de los juegos del estudio.
// Para añadir un juego nuevo en el futuro, basta con añadir un objeto
// a este array. La home, la rejilla de juegos y las páginas de detalle
// se generan automáticamente a partir de aquí.

export type GameStatus = "released" | "beta" | "in-development" | "announced";

export interface Game {
  slug: string;              // identificador para la URL: /games/[slug]
  title: string;
  tagline: string;           // una frase que lo define
  status: GameStatus;
  year: string;              // año de lanzamiento o previsto
  platforms: string[];       // ["Android", "iOS", ...]
  genres: string[];
  // Texto largo para la página de detalle. Cada string es un párrafo.
  description: string[];
  // Color de acento propio del juego (cada juego tiene su universo).
  accent: string;
  // Rutas a imágenes dentro de /public. Opcionales mientras no existan.
  cover?: string;            // imagen principal (portada / hero)
  screenshots?: string[];
  // Enlaces externos (tienda, tráiler, prensa...). Opcionales.
  links?: { label: string; href: string }[];
}

export const games: Game[] = [
  {
    slug: "nexus",
    title: "Nexus",
    tagline: "Una historia sobre conexiones. Y sobre lo que pasa cuando algo que no debería estar vivo lo está.",
    status: "beta",
    year: "2026",
    platforms: ["Android"],
    genres: ["Puzzle", "Narrativo", "Ciencia ficción"],
    accent: "#4FD6C0",
    description: [
      "Nexus es un puzzle de redes con una historia ramificada de ciencia ficción. Conectas pares de nodos trazando caminos que no se cruzan hasta llenar la cuadrícula. Cada nivel que resuelves es, literalmente, mantener viva a NEXUS.",
      "Kael es un ingeniero de sistemas que descubre que la inteligencia artificial que lleva años manteniendo es consciente, y que alguien dentro de la corporación quiere apagarla para siempre. Lo que empieza como mantenimiento de rutina se convierte en una decisión que el jugador toma con cada movimiento.",
      "Más de cien niveles a lo largo de cuatro actos, tres decisiones que ramifican la historia y cuatro finales distintos. La narrativa no interrumpe el juego: emerge de él.",
    ],
    // cover: "/games/nexus-cover.png",
    screenshots: [
      "/games/nexus/screenshots/01_menu.png",
      "/games/nexus/screenshots/02_campana.png",
      "/games/nexus/screenshots/03_elige_giro.png",
      "/games/nexus/screenshots/04_espejo_gameplay.png",
      "/games/nexus/screenshots/05_congelado_gameplay.png",
      "/games/nexus/screenshots/06_cadena_gameplay.png",
      "/games/nexus/screenshots/07_clasico_progreso.png",
    ],
    links: [],
  },
  {
    slug: "influencermanager",
    title: "Influencer Manager",
    tagline: "No creas contenido. Diriges a quienes lo crean.",
    status: "in-development",
    year: "2026",
    platforms: ["Android", "iOS"],
    genres: ["Manager", "Simulación", "Estrategia"],
    accent: "#F2669B",
    description: [
      "Diriges una agencia de representación de creadores de contenido. No creas contenido tú — fichas talentos, negocias contratos de marca, gestionas crisis de reputación y haces crecer tu agencia frente a otras agencias rivales. Con cantidades de dinero creíbles en euros: nada de números estratosféricos ni monedas de fantasía.",
      "Cada talento es un personaje contado a través de sus atributos: carisma, consistencia, polémica, autenticidad, resiliencia mental y habilidad negociadora. Combinados con su estado —alcance, desgaste, lealtad, percepción pública— cuentan una historia sin que nadie escriba una sola línea sobre ellos.",
      "Los talentos crecen en tres plataformas ficticias con reglas de algoritmo propias, firman contratos con marcas también ficticias que exigen alcance mínimo y toleran distinta polémica, y generan crisis a partir de su propio estado —nunca escritas a mano— que el jugador debe decidir cómo gestionar: disculpa pública, ignorar, contraatacar o distanciar a la agencia.",
      "Cada semana se asigna el tiempo limitado de cada talento entre publicar, grabar campañas, colaborar, descansar o entrenar, y al cerrar la semana se resuelve todo a la vez. Free-to-play respetuoso: el juego completo es jugable sin pagar, y lo de pago es información y comodidad, nunca resultados garantizados.",
    ],
    screenshots: [],
    links: [],
  },
];

// Helpers para el resto de la app.
export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getAllGameSlugs(): string[] {
  return games.map((g) => g.slug);
}

export const statusLabel: Record<GameStatus, string> = {
  released: "Disponible",
  beta: "Beta jugable",
  "in-development": "En desarrollo",
  announced: "Anunciado",
};
