export default function formatCount(num: number) {
  return num > 99 ? `99+` : `${num}`;
}
