import type { Locale } from "../config";
import { id, type Dictionary } from "./id";
import { en } from "./en";

export type { Dictionary };

export function getDictionary(lang: Locale): Dictionary {
  return lang === "en" ? en : id;
}
