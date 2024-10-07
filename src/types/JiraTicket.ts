export type JiraTicket = {
  id: string;
  key: string;
  self: string;
  expand: string;
  fields: {
    summary: string;
    description: string;
    labels: string[];
    issuetype: {
      id: string;
      self: string;
      name: string;
      description: string;
      iconUrl: string;
      subtask: boolean;
      avatarId: number;
    };
    priority: {
      id: string;
      self: string;
      name: string;
      iconUrl: string;
    };
    status: {
      id: string;
      self: string;
      name: string;
      description: string;
      iconUrl: string;
      statusCategory: {
        self: string,
        id: number,
        key: string,
        colorName: string,
        name: string,
      }
    };
    created: string;
    updated: string;
    dueDate: string;
    creator: User;
    reporter: User;
    assignee: User;
    aggregateprogress: {
      progress: number;
      total: number;
      percent: number;
    };
    progress: {
      progress: number;
      total: number;
      percent: number;
    };
    timespent: number;
    aggregatetimespent: number;
    flagged: boolean;
    worklog: {
      startAt: number;
      maxResults: number;
      total: number;
      worklogs: Worklog[];
    };
    comment: {
      startAt: number;
      maxResults: number;
      total: number;
      comments: Comment[];
    }
  };
};

type Worklog = {
    id: number;
    issueId: number;
    self: string;
    author: User;
    updateAuthor: User;
    comment: string;
    created: Date,
    updated: string,
    started: string,
    timeSpent: string;
    timeSpentSeconds: number;
};

type Comment = {
  id: string;
  self: string;
  body: string;
  author: User;
  updateAuthor: User;
  created: string;
  updated: string;
};

type User = {
  id: string;
  self: string;
  key: string;
  name: string;
  emailAddress: string;
  displayName: string;
  active: boolean;
  timezone: string;
  avatarUrls: {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
  };
};