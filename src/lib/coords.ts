// Координаты фермы: «11.05° S · 75.32° W» вместо «-11.05° N · -75.32° E»
export function formatCoords(lat: number | null, lon: number | null): string | null {
  if (lat === null || lon === null) return null;
  const ns = `${Math.abs(lat).toFixed(2)}° ${lat < 0 ? 'S' : 'N'}`;
  const ew = `${Math.abs(lon).toFixed(2)}° ${lon < 0 ? 'W' : 'E'}`;
  return `${ns} · ${ew}`;
}
