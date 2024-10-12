import React from 'react';
import OverviewContent from './components/OverviewContent';
import styles from './page.module.css';
import PageContainer from '../components/PageContainer/PageContainer';

export default function page() {
  return (
    <PageContainer>
      <OverviewContent />
    </PageContainer>
  );
}
