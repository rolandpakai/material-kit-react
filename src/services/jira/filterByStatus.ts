import { type JiraStatus } from "@/types/JiraStatuses";
import { type JiraTicket } from "@/types/JiraTicket";

export const filterByStatus = (tickets: JiraTicket[], status: JiraStatus): JiraTicket[] => {
  let filteredTickets: JiraTicket[] = [];
  
  if (tickets.length > 0) {
    filteredTickets = tickets.filter(
      ticket => ticket.fields.status.name.toLowerCase() === status.toString().toLowerCase());
  }

  return filteredTickets;
}