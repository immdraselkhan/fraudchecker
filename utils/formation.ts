export function convertNumBnToEn(value: string) {
  const bnToEnMap: Record<string, string> = {
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
    "০": "0",
  };

  return value
    .replace(/[০-৯]/g, (match) => bnToEnMap[match] || match)
    .replace(/[^0-9]/g, "")
    .slice(0, 11);
}
