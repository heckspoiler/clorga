export function formatDate(dateString: string | null) {
  if (dateString === null) {
    return 'no date specified';
  }
  const date = dateString;
  const day = date?.slice(8, 10);
  const month = date?.slice(5, 7);
  const year = date?.slice(0, 4);
  return `${day}.${month}.${year}`;
}
