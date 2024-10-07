'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

export interface TrafficProps {
  title: string;
  chartSeries: number[];
  labels: string[];
  format: string;
  sx?: SxProps;
}

export interface FormatterOpts {
  seriesIndex: number;
  w: {
    config: {
      series: number[],
    },
    globals: {
      series: number[],
    },
  }
}

export function Status({ title, chartSeries, labels, format, sx }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels, format);

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[], format: string): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [
      theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main, theme.palette.error.main,
      theme.palette.secondary.main, theme.palette.info.main, theme.palette.text.primary, theme.palette.text.secondary
    ],
    dataLabels: { 
      enabled: false, 
      formatter: (_val: string, opts: FormatterOpts) => {
        const value = opts.w.config.series[opts.seriesIndex];
        return `${ String(value ? value : 0) }${format}`;
      },
    },
    labels,
    legend: { 
      show: true, 
      horizontalAlign: 'center', 
      position: 'left',
      fontSize: '16px',
      formatter: (seriesName: string, opts: FormatterOpts) => {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName  }: ${ String(value ? value : 0) }${format}`;
      }
    },
    plotOptions: { pie: { expandOnClick: true } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { 
      fillSeriesColor: false,
      y: {
        formatter: (val: number) => {
          return `${String(val)}${format}`;
        }
      }
    },
  };
}
