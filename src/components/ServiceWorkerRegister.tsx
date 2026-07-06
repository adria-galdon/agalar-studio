"use client";

// Registra el service worker solo en producción (en desarrollo estorba al
// hot-reload). Silencioso: si algo falla, no rompe nada de la página.

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* sin service worker; la web sigue funcionando igual */
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return null;
}
