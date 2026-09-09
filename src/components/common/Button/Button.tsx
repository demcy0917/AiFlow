import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'white' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
  fullWidth?: boolean;
  /** Abre el enlace en otra pestaña. Solo aplica cuando hay `href`. */
  external?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  fullWidth = false,
  external = false,
  className = '',
  ...rest
}: ButtonProps) {
  // La lava solo va en las variantes que la lucen: el degradado de
  // marca y el contorno transparente. Sobre el boton blanco o el
  // fantasma las manchas se verian como suciedad, no como efecto.
  const conLava = variant === 'primary' || variant === 'secondary';

  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    conLava ? styles.lava : '',
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        role="button"
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        onClick={rest.onClick as never}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
