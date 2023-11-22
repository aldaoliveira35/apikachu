interface BackToTopProps {
  className: string;
}

export function BackToTopIcon(props: BackToTopProps) {
  return (
    <svg viewBox="0 0 24 24" className={props.className}>
      <path d="M6 17.59 7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path>
      <path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path>
    </svg>
  );
}
