import { JiraTicket } from "@/types/JiraTicket";

export const filterByLabels = (tickets: JiraTicket[], labels: string[]): JiraTicket[] => {
  let filteredTickets: JiraTicket[] = [];
  
  if (tickets.length > 0) {
    filteredTickets = tickets.filter(
      ticket => labels.some(label => ticket.fields.labels.includes(label)));
  }

  return filteredTickets;
}