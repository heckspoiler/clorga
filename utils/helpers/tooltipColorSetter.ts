export const tooltipColorSetter = ({
  project,
  formattedDate,
  setAmountDays,
  setBackgroundColor,
  safeGreen,
  warningShades,
}: {
  project: any;
  formattedDate: () => string;
  setAmountDays: (daysLeft: number) => void;
  setBackgroundColor: (color: string) => void;
  safeGreen: string;
  warningShades: string[];
}) => {
  const projectDueDate = new Date(project.due_date);
  const today = new Date(formattedDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.floor(
    (projectDueDate.getTime() - today.getTime()) / msPerDay
  );

  setAmountDays(daysLeft);

  if (daysLeft >= 14) {
    setBackgroundColor(safeGreen);
  } else {
    // Dynamically set warning color based on the number of days remaining
    const index = Math.max(
      0,
      Math.min(warningShades.length - 1, Math.floor((14 - daysLeft) / 2))
    );
    setBackgroundColor(warningShades[index]);
  }
};
