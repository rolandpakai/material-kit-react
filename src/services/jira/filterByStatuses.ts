import { JiraStatus } from "@/types/JiraStatuses";
import { JiraTicket } from "@/types/JiraTicket";

export const filterByStatuses = (tickets: JiraTicket[], statuses: JiraStatus[]): JiraTicket[] => {
  let filteredTickets: JiraTicket[] = [];
  
  if (tickets.length > 0) {
    filteredTickets = tickets.filter(
      ticket => statuses.map(status => status.toLowerCase()).includes(ticket.fields.status.name.toLowerCase()));
  }

  return filteredTickets;
}