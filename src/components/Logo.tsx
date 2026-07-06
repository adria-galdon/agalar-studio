import Image from "next/image";
import styles from "./Logo.module.css";

const ASPECT_LOCKUP = 191 / 900;
const ASPECT_MARK = 373 / 400;

interface MarkProps {
  size?: number;
  className?: string;
}

// Símbolo aislado. Cambia de color según el tema activo (data-theme en <html>).
export function AgalarMark({ size = 40, className }: MarkProps) {
  return (
    <span
      className={`${styles.markSwap} ${className ?? ""}`}
      style={{ width: size, height: size * ASPECT_MARK }}
    >
      <Image
        src="/logos/mark-dark-on-light.png"
        alt=""
        fill
        sizes={`${size}px`}
        className={styles.forLight}
        priority={false}
      />
      <Image
        src="/logos/mark-light-on-dark.png"
        alt=""
        fill
        sizes={`${size}px`}
        className={styles.forDark}
        priority={false}
      />
    </span>
  );
}

interface LogoProps {
  className?: string;
  width?: number;
}

// Lockup horizontal completo. Cambia de versión (oscura/clara) según el tema.
export function AgalarLogo({ className, width = 168 }: LogoProps) {
  const height = width * ASPECT_LOCKUP;
  return (
    <span
      className={`${styles.logoSwap} ${className ?? ""}`}
      style={{ width, height }}
      role="img"
      aria-label="Agalar Studio"
    >
      <Image
        src="/logos/lockup-dark-on-light.png"
        alt="Agalar Studio"
        fill
        sizes={`${width}px`}
        className={styles.forLight}
        priority
      />
      <Image
        src="/logos/lockup-light-on-dark.png"
        alt="Agalar Studio"
        fill
        sizes={`${width}px`}
        className={styles.forDark}
        priority
      />
    </span>
  );
}
