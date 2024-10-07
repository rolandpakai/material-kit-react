import { JiraTicket } from "@/types/JiraTicket";

export const findById = (tickets: JiraTicket[], id: string): JiraTicket | undefined => {
  let filteredTicket: JiraTicket | undefined = undefined;
  
  if (tickets.length > 0) {
    filteredTicket = tickets.find(
      ticket => ticket.id === id);
  }

  return filteredTicket;
}