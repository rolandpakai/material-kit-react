import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const boardId = process.env.JIRA_BOARD_ID;
  const jiraDomain = process.env.JIRA_DOMAIN;
  const apiToken = process.env.JIRA_TOKEN;
  const jql = "issuetype in (Task, Bug, Story, Epic)";

  const url = `${jiraDomain}/rest/agile/1.0/board/${boardId}/issue?jql=${encodeURIComponent(jql)}&maxResults=999`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Accept": "application/json",
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    res.status(response.status).json({ error: 'Failed to fetch Jira tickets' });
    return;
  }

  const data = await response.json();

  res.status(200).json(data.issues);
}