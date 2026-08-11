export function KineticType({ word, direction = "left", outline = false }: { word: string; direction?: "left" | "right"; outline?: boolean }) {
  return <div className={`kinetic-word kinetic-word-${direction} ${outline ? "is-outline" : ""}`} aria-label={word}>
    <span aria-hidden="true">{word}</span><span aria-hidden="true">{word}</span>
  </div>;
}
