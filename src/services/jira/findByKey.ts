import { JiraTicket } from "@/types/JiraTicket";

export const findByKey = (tickets: JiraTicket[], key: string): JiraTicket | undefined => {
  let filteredTicket: JiraTicket | undefined = undefined;
  
  if (tickets.length > 0) {
    filteredTicket = tickets.find(
      ticket => ticket.key === key);
  }

  return filteredTicket;
}