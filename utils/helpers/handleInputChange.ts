import React from 'react';

export const handleInputChange = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  setter: (value: string) => void
) => {
  setter(e.target.value);
};
