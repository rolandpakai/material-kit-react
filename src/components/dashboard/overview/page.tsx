/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
 
"use client"
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import { Status } from '@/components/dashboard/overview/status';
import { TimeSpent } from '@/components/dashboard/overview/time-spent';

import { type JiraTicket } from "@/types/JiraTicket";
import { getTotalTimeSpent } from '@/utils/getTotalTimeSpent';
import { getLabelYearMonth } from '@/utils/getLabelYearMonth';
import { getPercentage } from '@/utils/getPercentage';
import { JiraStatus } from '@/types/JiraStatuses';
import { filterByStatus } from '@/services/jira/filterByStatus';
import { filterByLabel } from '@/services/jira/filterByLabel';
import { sumByField } from '@/services/jira/sumByField';
import { secondsToHours } from '@/utils/secondsToHours';

const TIME_SPENT_FIELD = "aggregatetimespent";
const LABEL_FORMAT = 'YYMM';
const TOTAL_TIME = 240;

export function Page(): React.JSX.Element {
  const [tickets, setTickets] = React.useState([] as JiraTicket[]);

  const [timeSpentLastMonth, setTimeSpentLastMonth] = React.useState(0);
  const [percentageLastMonth, setPercentageLastMonth] = React.useState(0);
  const [labelLastMonth, setLabelLastMonth] = React.useState("");

  const [timeSpentCurrentMonth, setTimeSpentCurrentMonth] = React.useState(0);
  const [percentageCurrentMonth, setPercentageCurrentMonth] = React.useState(0);
  const [labelCurrentMonth, setLabelCurrentMonth] = React.useState("");

  const [jiraTicketCountByStatus, setJiraTicketCountByStatus] = React.useState<number[]>([]);
  const [jiraTicketTimeByStatus, setJiraTicketTimeByStatus] = React.useState<number[]>([]);
  const jiraStatusArray: string[] = Object.values(JiraStatus);

  React.useEffect(() => {
    const fetchTickets = async (): Promise<void> => {
      const res = await fetch('/api/jira/getJiraTickets');
      const data = await res.json() as JiraTicket[];
      setTickets(data);
    }

    fetchTickets();
  }, []);

  const setLastMonth = (ticketList: JiraTicket[]): void => {
    const labelLastYearMonth = getLabelYearMonth(-1, LABEL_FORMAT);
    const totalTimeSpentLastMonth = getTotalTimeSpent(ticketList, labelLastYearMonth, TIME_SPENT_FIELD);
    const percentageLast = getPercentage(totalTimeSpentLastMonth, TOTAL_TIME);

    setLabelLastMonth(labelLastYearMonth);
    setPercentageLastMonth(percentageLast);
    setTimeSpentLastMonth(totalTimeSpentLastMonth);
  }

  const setCurrentMonth = (ticketList: JiraTicket[]): void => {
    const labelCurrentYearMonth = getLabelYearMonth(0, LABEL_FORMAT);
    const totalTimeSpentCurrentMonth = getTotalTimeSpent(ticketList, labelCurrentYearMonth, TIME_SPENT_FIELD);
    const percentageCurrent = getPercentage(totalTimeSpentCurrentMonth, TOTAL_TIME);

    setLabelCurrentMonth(labelCurrentYearMonth);
    setPercentageCurrentMonth(percentageCurrent);
    setTimeSpentCurrentMonth(totalTimeSpentCurrentMonth);
  }

  const setTicketsByStatus = (ticketList: JiraTicket[]): void => {
    const labelCurrentYearMonth = getLabelYearMonth(0, LABEL_FORMAT);
    const ticketsCountByStatus = [] as number[];
    const ticketTimeByStatus = [] as number[];

    Object.keys(JiraStatus).forEach(key => {
      const filteredTickets = filterByStatus(ticketList, JiraStatus[key as keyof typeof JiraStatus]);
      let timeOfTickets = sumByField(filteredTickets, TIME_SPENT_FIELD);
      let countOfTickets = filteredTickets.length;

      if (key as keyof typeof JiraStatus === JiraStatus.Done) {
        const filteredByLabel = filterByLabel(filteredTickets, labelCurrentYearMonth);
        timeOfTickets = sumByField(filteredByLabel, TIME_SPENT_FIELD);
        countOfTickets = filteredByLabel.length;
      }

      timeOfTickets = secondsToHours(timeOfTickets);

      ticketsCountByStatus.push(countOfTickets);
      ticketTimeByStatus.push(timeOfTickets);
    });

    setJiraTicketCountByStatus(ticketsCountByStatus);
    setJiraTicketTimeByStatus(ticketTimeByStatus);
  }

  React.useEffect(() => {
    if (tickets.length > 0) {
      setLastMonth(tickets);
      setCurrentMonth(tickets);
      setTicketsByStatus(tickets);
    }
  }, [tickets]);
  
  return (
    <Grid container spacing={3}>
      <Grid lg={6} sm={6} xs={12}>
        <TimeSpent 
          sx={{ height: '100%' }} 
          title="Done tickets - Current Month" 
          value={timeSpentCurrentMonth} 
          label={labelCurrentMonth} 
          percentage={percentageCurrentMonth} />
      </Grid>
      <Grid lg={6} sm={6} xs={12}>
        <TimeSpent 
          sx={{ height: '100%' }} 
          title="Done tickets - Last Month" 
          value={timeSpentLastMonth} 
          label={labelLastMonth} 
          percentage={percentageLastMonth} />
      </Grid>
      <Grid lg={6} md={6} xs={6}>
        <Status 
          title="Logged Time on Tickets by Status - Current Month" 
          chartSeries={jiraTicketTimeByStatus} 
          labels={jiraStatusArray}
          format="h"
          sx={{ height: '100%' }} />
      </Grid>
      <Grid lg={6} md={6} xs={6}>
        <Status 
          title="Count of Tickets by Status - Current Month" 
          chartSeries={jiraTicketCountByStatus} 
          labels={jiraStatusArray}
          format=""
          sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}


