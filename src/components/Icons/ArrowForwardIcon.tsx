interface ArrowForwardIconProps {
  className: string;
}

export function ArrowForwardIcon(props: ArrowForwardIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={props.className}>
      <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
      <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
    </svg>
  );
}
