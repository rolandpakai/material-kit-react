 
import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { Page as OverviewPage } from '@/components/dashboard/overview/page';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <OverviewPage />
  );
}
