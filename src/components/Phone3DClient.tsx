"use client";

// Carga el visor 3D solo en cliente (Three.js necesita WebGL/window),
// así page.tsx y Hero.tsx pueden seguir siendo Server Components.
import dynamic from "next/dynamic";
import phoneStyles from "./Phone3D.module.css";

const Phone3D = dynamic(() => import("./Phone3D").then((m) => m.Phone3D), {
  ssr: false,
  loading: () => <div className={phoneStyles.fallback} />,
});

export function Phone3DClient({ accent }: { accent?: string }) {
  return <Phone3D accent={accent} />;
}
