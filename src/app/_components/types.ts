export type GraduatingClass =
  | "CO2029"
  | "CO2028"
  | "CO2027"
  | "CO2026"
  | "CO2025"
  | "MASTERS";

export const GRADUATING_CLASS_OPTIONS: Array<{
  value: GraduatingClass;
  label: string;
}> = [
  { value: "CO2029", label: "2029" },
  { value: "CO2028", label: "2028" },
  { value: "CO2027", label: "2027" },
  { value: "CO2026", label: "2026" },
  { value: "CO2025", label: "2025" },
  { value: "MASTERS", label: "Masters" },
];

export function formatGraduatingClass(
  gradClass: GraduatingClass | null | undefined,
): string {
  if (!gradClass) return "—";
  if (gradClass === "MASTERS") return "Masters";
  return gradClass.slice(2);
}

