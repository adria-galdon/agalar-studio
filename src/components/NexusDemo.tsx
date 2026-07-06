"use client";

// Demo jugable de la mecánica de Nexus, directamente en la web.
// Conecta cada par de nodos del mismo color con un camino que no se cruce
// con ningún otro, hasta llenar toda la cuadrícula.
//
// Funciona con ratón y con el dedo (Pointer Events + pointer capture).
// El motor es puro: `applyMove` decide el nuevo estado a partir del anterior,
// lo que lo hace fácil de razonar y de testear.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { puzzles, PUZZLE_COLORS, type Cell, type Puzzle } from "@/data/puzzles";
import { NotifyForm } from "./NotifyForm";
import { Reveal } from "./Reveal";
import styles from "./NexusDemo.module.css";

const key = (c: Cell) => `${c[0]},${c[1]}`;
const same = (a: Cell, b: Cell) => a[0] === b[0] && a[1] === b[1];
const adjacent = (a: Cell, b: Cell) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

type Paths = Cell[][];

/** Estado inicial: ningún camino trazado. */
function emptyPaths(puzzle: Puzzle): Paths {
  return puzzle.pairs.map(() => []);
}

/**
 * Aplica un intento de mover el trazo del color `color` hasta la celda `cell`.
 * Devuelve un nuevo estado (o el mismo si el movimiento no es válido).
 */
function applyMove(
  paths: Paths,
  color: number,
  cell: Cell,
  endpointColor: Map<string, number>
): Paths {
  const path = paths[color];
  if (path.length === 0) return paths;

  const head = path[path.length - 1];
  if (same(head, cell)) return paths;
  if (!adjacent(head, cell)) return paths;

  // Retroceder sobre el propio trazo.
  if (path.length >= 2 && same(path[path.length - 2], cell)) {
    const next = paths.slice();
    next[color] = path.slice(0, -1);
    return next;
  }

  // No cruzarse consigo mismo.
  if (path.some((c) => same(c, cell))) return paths;

  const epColor = endpointColor.get(key(cell));
  if (epColor !== undefined) {
    // Los nodos son muros, salvo el nodo gemelo del color activo (cierra el par).
    if (epColor === color && !same(cell, path[0])) {
      const next = paths.slice();
      next[color] = [...path, cell];
      return next;
    }
    return paths;
  }

  // Celda normal: si pertenece a otro color, ese trazo se corta aquí.
  const next = paths.map((p) => p);
  for (let k = 0; k < next.length; k++) {
    if (k === color) continue;
    const idx = next[k].findIndex((c) => same(c, cell));
    if (idx !== -1) next[k] = next[k].slice(0, idx);
  }
  next[color] = [...path, cell];
  return next;
}

export function NexusDemo() {
  const [levelIndex, setLevelIndex] = useState(0);
  const puzzle = puzzles[levelIndex];
  const size = puzzle.size;

  const [paths, setPaths] = useState<Paths>(() => emptyPaths(puzzle));
  const [won, setWon] = useState(false);

  // Refs para leer estado fresco dentro de los handlers de puntero.
  const pathsRef = useRef(paths);
  pathsRef.current = paths;
  const drawing = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Mapas derivados del nivel (extremos → color, muros…).
  const { endpointColor, endpoints } = useMemo(() => {
    const map = new Map<string, number>();
    puzzle.pairs.forEach((pair, i) => {
      map.set(key(pair[0]), i);
      map.set(key(pair[1]), i);
    });
    return { endpointColor: map, endpoints: puzzle.pairs };
  }, [puzzle]);

  // Reset al cambiar de nivel.
  useEffect(() => {
    setPaths(emptyPaths(puzzle));
    setWon(false);
    drawing.current = null;
  }, [puzzle]);

  // Progreso: pares conectados y celdas rellenas.
  const solvedFlags = endpoints.map(([a, b], i) => {
    const p = paths[i];
    return p.some((c) => same(c, a)) && p.some((c) => same(c, b));
  });
  const solvedCount = solvedFlags.filter(Boolean).length;
  const filled = paths.reduce((n, p) => n + p.length, 0);
  const total = size * size;

  useEffect(() => {
    if (solvedCount === endpoints.length && filled === total && !won) {
      setWon(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedCount, filled]);

  const cellFromEvent = useCallback(
    (e: React.PointerEvent): Cell | null => {
      const el = boardRef.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const col = clamp(Math.floor(((e.clientX - r.left) / r.width) * size), 0, size - 1);
      const row = clamp(Math.floor(((e.clientY - r.top) / r.height) * size), 0, size - 1);
      return [row, col];
    },
    [size]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    const cell = cellFromEvent(e);
    if (!cell) return;
    const ep = endpointColor.get(key(cell));
    if (ep !== undefined) {
      drawing.current = ep;
      setPaths((p) => {
        const next = p.slice();
        next[ep] = [cell];
        return next;
      });
    } else {
      const owner = pathsRef.current.findIndex((p) => p.some((c) => same(c, cell)));
      if (owner === -1) return;
      drawing.current = owner;
      setPaths((p) => {
        const next = p.slice();
        const idx = next[owner].findIndex((c) => same(c, cell));
        next[owner] = next[owner].slice(0, idx + 1);
        return next;
      });
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (drawing.current === null) return;
    const cell = cellFromEvent(e);
    if (!cell) return;
    const color = drawing.current;
    setPaths((p) => applyMove(p, color, cell, endpointColor));
  };

  const endStroke = () => {
    drawing.current = null;
  };

  const reset = () => {
    setPaths(emptyPaths(puzzle));
    setWon(false);
    drawing.current = null;
  };

  const isLast = levelIndex === puzzles.length - 1;

  return (
    <section id="demo" className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal>
          <p className="eyebrow">Pruébalo tú</p>
          <h2 className={styles.title}>La mecánica de Nexus, aquí mismo.</h2>
          <p className={styles.lead}>
            Conecta cada par de nodos del mismo color con un camino que no toque
            a los demás, hasta llenar la cuadrícula entera. Esto es, en pequeño,
            lo que es jugar a Nexus: cada trazo mantiene el sistema con vida.
          </p>
        </Reveal>

        <div className={styles.stage}>
          <div className={styles.panel}>
            <div className={styles.levels} role="tablist" aria-label="Niveles">
              {puzzles.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === levelIndex}
                  className={`${styles.levelBtn} ${i === levelIndex ? styles.levelActive : ""}`}
                  onClick={() => setLevelIndex(i)}
                >
                  <span className={styles.levelNum}>{i + 1}</span>
                  {p.name}
                </button>
              ))}
            </div>

            <div className={styles.hud}>
              <div className={styles.metric}>
                <span className={styles.metricValue}>
                  {solvedCount}<span className={styles.metricTotal}>/{endpoints.length}</span>
                </span>
                <span className={styles.metricLabel}>Conexiones</span>
              </div>
              <div className={styles.metric}>
                <span className={styles.metricValue}>
                  {Math.round((filled / total) * 100)}<span className={styles.metricTotal}>%</span>
                </span>
                <span className={styles.metricLabel}>Cuadrícula</span>
              </div>
              <button className={`btn ${styles.resetBtn}`} onClick={reset}>
                Reiniciar
              </button>
            </div>

            <p className={styles.hint}>
              Arrastra desde un nodo hasta su gemelo. Si te equivocas, vuelve
              sobre el trazo o pulsa Reiniciar.
            </p>
          </div>

          <div className={styles.boardOuter}>
            <div
              ref={boardRef}
              className={styles.board}
              style={{ ["--size" as string]: size }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endStroke}
              onPointerCancel={endStroke}
              role="application"
              aria-label={`Puzzle de conexión, cuadrícula de ${size} por ${size}`}
            >
              <svg
                className={styles.svg}
                viewBox={`0 0 ${size} ${size}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Rejilla */}
                {Array.from({ length: size + 1 }).map((_, i) => (
                  <g key={`g${i}`} className={styles.gridLine}>
                    <line x1={i} y1={0} x2={i} y2={size} />
                    <line x1={0} y1={i} x2={size} y2={i} />
                  </g>
                ))}

                {/* Trazos por color: halo suave + línea principal */}
                {paths.map((path, i) =>
                  path.length >= 2 ? (
                    <g key={`p${i}`}>
                      <polyline
                        className={styles.glow}
                        points={path.map((c) => `${c[1] + 0.5},${c[0] + 0.5}`).join(" ")}
                        stroke={PUZZLE_COLORS[i]}
                      />
                      <polyline
                        className={styles.line}
                        points={path.map((c) => `${c[1] + 0.5},${c[0] + 0.5}`).join(" ")}
                        stroke={PUZZLE_COLORS[i]}
                      />
                    </g>
                  ) : null
                )}

                {/* Nodos (extremos) */}
                {endpoints.map((pair, i) =>
                  pair.map((c, j) => (
                    <g key={`e${i}-${j}`}>
                      <circle
                        cx={c[1] + 0.5}
                        cy={c[0] + 0.5}
                        r={0.3}
                        fill={PUZZLE_COLORS[i]}
                        className={solvedFlags[i] ? styles.nodeSolved : styles.node}
                      />
                      <circle cx={c[1] + 0.5} cy={c[0] + 0.5} r={0.12} className={styles.nodeCore} />
                    </g>
                  ))
                )}
              </svg>
            </div>

            {won && (
              <div className={styles.win} role="status">
                <div className={styles.winInner}>
                  <p className="eyebrow">Sistema estable</p>
                  <h3 className={styles.winTitle}>NEXUS sigue viva.</h3>
                  <p className={styles.winText}>
                    Eso es exactamente lo que se siente jugando. En el juego
                    completo cada nivel forma parte de la historia.
                  </p>
                  <div className={styles.winActions}>
                    {!isLast ? (
                      <button
                        className="btn btn--solid"
                        onClick={() => setLevelIndex((i) => i + 1)}
                      >
                        Siguiente nivel
                      </button>
                    ) : (
                      <button className="btn" onClick={reset}>
                        Volver a jugar
                      </button>
                    )}
                    <a href="/games/nexus" className="btn">
                      Conocer Nexus
                    </a>
                  </div>
                  <div className={styles.winNotify}>
                    <p className={styles.winNotifyLead}>
                      ¿Quieres que te avise cuando salga?
                    </p>
                    <NotifyForm compact source="demo-win" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
