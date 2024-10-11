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
  setAmountDays: (arg0: number) => void;
  setBackgroundColor: (arg0: string) => void;
  safeGreen: string;
  warningShades: string[];
}) => {
  const projectDueDateString = project.due_date?.replace(/-/g, '');
  const projectDueDateNumber = parseInt(projectDueDateString || '0');

  const todayString = formattedDate();
  const todayNumber = parseInt(todayString.replace(/-/g, ''));
  const daysLeft = projectDueDateNumber - todayNumber;

  setAmountDays(daysLeft);

  if (daysLeft >= 14) {
    setBackgroundColor(safeGreen);
  } else {
    const index = Math.max(
      0,
      Math.min(warningShades.length - 1, Math.floor((14 - daysLeft) / 2))
    );
    setBackgroundColor(warningShades[index]);
  }
};
