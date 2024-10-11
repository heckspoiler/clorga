const date = '2024.12.20';

export function formatDate(dateString: string | null) {
  if (dateString === null) {
    return 'no date specified';
  }
  const date = dateString;
  const day = date?.slice(8, 10);
  console.log('day ', day);
  const month = date?.slice(5, 7);
  console.log('month ', month);
  const year = date?.slice(0, 4);
  console.log(year);
  return `${day}.${month}.${year}`;
}

console.log(formatDate(date));
