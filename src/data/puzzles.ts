// Niveles del demo jugable de Nexus.
//
// La mecánica de Nexus: conectar pares de nodos del mismo color trazando
// caminos que no se cruzan hasta llenar TODA la cuadrícula. Es lo que en el
// género se conoce como "flow / numberlink".
//
// Cada nivel de aquí está diseñado por construcción (se dibuja primero la
// solución que cubre todas las celdas y de ahí se toman los extremos), así que
// se garantiza que existe una solución que rellena la rejilla al completo.

export type Cell = [row: number, col: number];

export interface Puzzle {
  id: string;
  name: string;
  size: number; // cuadrícula size x size
  // Un par de extremos por color. El índice en el array = índice de color.
  pairs: [Cell, Cell][];
}

// Paleta de colores del demo. El primero es el acento propio de Nexus.
export const PUZZLE_COLORS = [
  "#4fd6c0", // teal — Nexus
  "#a78bfa", // violeta
  "#f5a05b", // ámbar
  "#5b8def", // azul
  "#f472b6", // rosa
  "#64d68a", // verde
];

export const puzzles: Puzzle[] = [
  {
    id: "intro",
    name: "Sinapsis",
    size: 4,
    pairs: [
      [[2, 2], [3, 0]],
      [[0, 3], [3, 3]],
      [[1, 1], [3, 2]],
    ],
  },
  {
    id: "core",
    name: "Núcleo",
    size: 5,
    pairs: [
      [[2, 0], [3, 2]],
      [[0, 4], [3, 3]],
      [[1, 1], [4, 0]],
      [[1, 4], [4, 4]],
      [[4, 1], [4, 3]],
    ],
  },
  {
    id: "overload",
    name: "Sobrecarga",
    size: 6,
    pairs: [
      [[0, 0], [1, 4]],
      [[1, 3], [2, 2]],
      [[2, 3], [3, 3]],
      [[3, 2], [4, 3]],
      [[4, 4], [5, 0]],
    ],
  },
];
