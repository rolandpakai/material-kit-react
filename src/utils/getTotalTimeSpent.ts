import { type JiraTicket } from "@/types/JiraTicket"
import { filterByStatus } from '@/services/jira/filterByStatus';
import { filterByLabel } from '@/services/jira/filterByLabel';
import { sumByField } from '@/services/jira/sumByField';
import { secondsToHours } from '@/utils/secondsToHours';
import { JiraStatus } from "@/types/JiraStatuses";

export const getTotalTimeSpent = (tickets: JiraTicket[], label: string, field: keyof JiraTicket["fields"]): number => {  
  let totalTimeSpentLastMonth = 0;
  const doneTickets = filterByStatus(tickets, JiraStatus.Done);
  const tickets2409 = filterByLabel(doneTickets, label);
  totalTimeSpentLastMonth = secondsToHours(sumByField(tickets2409, field));

  return totalTimeSpentLastMonth;
}