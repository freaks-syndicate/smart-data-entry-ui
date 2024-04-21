'use client';
import { Heading } from '@chakra-ui/react';
import cx from 'classnames';

import CustomSessionAuth from '@/components/auth/custom-session-auth';
import DownloadReceiptsForm from '@/components/export/download-receipts-form';

import styles from './export-template.module.scss';

export interface IExportTemplateProps {}

export default function ExportTemplate(_props: IExportTemplateProps) {
  return (
    <CustomSessionAuth>
      <div className={cx(styles['d-container'])}>
        {/* Heading */}
        <Heading textAlign={'center'} mb={'1rem'}>
          Export Receipts
        </Heading>

        {/* Download Form */}
        <DownloadReceiptsForm />
      </div>
    </CustomSessionAuth>
  );
}
