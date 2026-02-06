import { TFunction } from "i18next";

export function getLocalizedPlayerName(name: string, t: TFunction): string {
  if (name === "You") {
    const translated = t("player.you");
    return translated === "player.you" ? name : translated;
  }
  const match = name.match(/^Player\s+(\d+)$/i);
  if (match) {
    const translated = t("player.label", { number: match[1] });
    return translated === "player.label" ? name : translated;
  }
  return name;
}
