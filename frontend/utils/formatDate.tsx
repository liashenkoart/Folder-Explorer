export function formatDate(date: string) {
  if (!date) return '-'
  return `${new Date(date).getDay()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()} ${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`
}