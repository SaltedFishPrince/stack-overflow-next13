import type React from 'react';

export const preventDefault = <T extends React.MouseEvent>(cb:(e:T, ...args:any) => any) => (e:T, ...args:any) => {
  e.preventDefault();
  cb(e, ...args);
};
