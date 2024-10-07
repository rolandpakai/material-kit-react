import { type JiraTicket } from "@/types/JiraTicket";

export const sumByField = (tickets: JiraTicket[], field: keyof JiraTicket["fields"]): number => {
  let sum = 0;

  if (tickets.length > 0) {
    sum = tickets.reduce((_sum, ticket) => {
      const value = ticket.fields[field];
      
      if (value !== undefined) {
        if (value !== null && typeof value === "number") {
          return _sum + value;
        } 
          return _sum;
        
      } 
        throw new Error("Invalid field");
      
    }, 0);
  }

  return sum;
}