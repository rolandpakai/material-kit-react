import { JiraTicket } from "@/types/JiraTicket";

export const filterByLabel = (tickets: JiraTicket[], label: string): JiraTicket[] => {
  let filteredTickets: JiraTicket[] = [];
  
  if (tickets.length > 0) {
    filteredTickets = tickets.filter(
      ticket => ticket.fields.labels.map((_label) => _label.toLowerCase()).includes(label.toLowerCase()));
  }

  return filteredTickets;
}