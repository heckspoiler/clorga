import React from 'react';

type DuedateProps = {
  styles: any;
  backgroundColor: string;
  amountDays: number | undefined;
  formatDate?: (date: string) => string;
  project: any;
  index?: number;
};

export default function Duedate({
  styles,
  backgroundColor,
  amountDays,
  project,
  formatDate,
}: DuedateProps) {
  return (
    <>
      {project.due_date && (
        <div
          style={{ backgroundColor: backgroundColor }}
          className={styles.DueDateIndicator}
        >
          <div className={styles.DueDateTooltip}>
            {amountDays !== undefined && amountDays >= 0 ? (
              <p>
                due in <span>{amountDays}</span> days <br /> (
                {formatDate && formatDate(project.due_date && project.due_date)}{' '}
                )
              </p>
            ) : (
              <p>
                <span>overdue </span> ( {amountDays && amountDays * -1} days)
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
