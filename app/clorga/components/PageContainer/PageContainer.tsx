import React from 'react';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: '4rem 2rem 2rem 2rem', minHeight: '100vh' }}>
      {children}
    </div>
  );
}
