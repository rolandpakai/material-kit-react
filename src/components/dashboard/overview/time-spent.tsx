import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Timer as TimerIcon } from '@phosphor-icons/react/dist/ssr/Timer';
import { LinearProgress } from '@mui/material';

export interface TimeSpentProps {
  sx?: SxProps;
  title: string;
  value: number;
  label: string;
  percentage: number;
}

export function TimeSpent({ sx, title, value, label, percentage }: TimeSpentProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                {title}
              </Typography>
              <Typography variant="h4">{value}h</Typography>
              <Typography color="text.primary" variant="h6">
                {percentage}%
              </Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <TimerIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <div>
            <LinearProgress value={percentage} variant="determinate" />
          </div>
          <Stack sx={{ alignItems: 'left' }} direction="row" spacing={2}>
            <Typography color="text.primary" variant="h6">
              {label}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
