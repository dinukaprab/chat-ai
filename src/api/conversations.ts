import { ChatItem } from "@/utils";

export async function getConversations(): Promise<ChatItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    // 👉 Today (2025-09-04)
    {
      chatId: "a7f3c91b-6d22-4e58-b2c8-12d45f67e1c3",
      title: "Morning standup notes",
      lastUpdated: "2025-09-04T08:30:00Z",
    },
    {
      chatId: "f2a8b6c4-9d31-4e72-8a15-7b3c0d5e6f29",
      title: "Client meeting summary",
      lastUpdated: "2025-09-04T10:15:00Z",
    },
    {
      chatId: "c5d7e9f1-a2b4-4c6d-8e0f-3g7h9i1j2k3l",
      title: "Product roadmap discussion",
      lastUpdated: "2025-09-04T12:05:00Z",
    },
    {
      chatId: "b3d5f7a9-1c2e-4f6g-8h0i-2j4k6l8m0n2o",
      title: "Bug investigation #4521",
      lastUpdated: "2025-09-04T13:25:00Z",
    },
    {
      chatId: "68b882dc-7944-8329-a0f1-88aaacea5e90",
      title: "Project brainstorming session",
      lastUpdated: "2025-09-04T14:45:00Z",
    },
    {
      chatId: "e8g2i4k6-m1n3-p5q7-r9s1-t3u5w7y9z0b2",
      title: "Team weekly sync",
      lastUpdated: "2025-09-04T11:15:00Z",
    },
    {
      chatId: "4e9b2f8a-1c73-4d15-9a82-3f5b6c7d0e41",
      title: "Code review discussion",
      lastUpdated: "2025-09-04T16:20:00Z",
    },

    // 👉 Yesterday (2025-09-03)
    {
      chatId: "a1c3e5g7-i9k1m3o5-q7s9u1w3-y5a7c9e1",
      title: "Technical documentation draft",
      lastUpdated: "2025-09-03T09:10:00Z",
    },
    {
      chatId: "t7v9x1z3-b5d7f9h1-j3l5n7p9-r1t3v5x7",
      title: "Client presentation prep",
      lastUpdated: "2025-09-03T10:45:00Z",
    },
    {
      chatId: "g3i5k7m9-o1q3s5u7-w9y1b3d5-f7h9j1l3",
      title: "Budget planning Q4",
      lastUpdated: "2025-09-03T14:50:00Z",
    },
    {
      chatId: "d4f6h8j0-l2m4n6p8-r0t2v4x6-z8b0d2f4",
      title: "Marketing campaign ideas",
      lastUpdated: "2025-09-03T17:15:00Z",
    },

    // 👉 Previous 7 Days (2025-08-28 to 2025-09-02)
    {
      chatId: "f1h3j5l7-n9p1r3t5-v7x9z1b3-d5f7h9j1",
      title: "Bug investigation #307",
      lastUpdated: "2025-09-02T09:00:00Z",
    },
    {
      chatId: "x7z9b1d3-f5h7j9l1-n3p5r7t9-v1x3z5b7",
      title: "Content strategy session",
      lastUpdated: "2025-09-01T13:40:00Z",
    },
    {
      chatId: "z9b1d3f5-h7j9l1n3-p5r7t9v1-x3z5b7d9",
      title: "Research findings analysis",
      lastUpdated: "2025-08-30T16:20:00Z",
    },
    {
      chatId: "r5t7v9x1-z3b5d7f9-h1j3l5n7-p9r1t3v5",
      title: "API integration questions",
      lastUpdated: "2025-08-29T19:50:00Z",
    },

    // 👉 Older
    {
      chatId: "n1p3r5t7-v9x1z3b5-d7f9h1j3-l5n7p9r1",
      title: "Interview questions for dev role",
      lastUpdated: "2025-08-20T10:00:00Z",
    },
    {
      chatId: "p3r5t7v9-x1z3b5d7-f9h1j3l5-n7p9r1t3",
      title: "Quarterly goals planning",
      lastUpdated: "2025-08-15T12:45:00Z",
    },
    {
      chatId: "b7d9f1h3-j5l7n9p1-r3t5v7x9-z1b3d5f7",
      title: "Team building activities",
      lastUpdated: "2025-08-10T09:20:00Z",
    },
    {
      chatId: "v5x7z9b1-d3f5h7j9-l1n3p5r7-t9v1x3z5",
      title: "Competitive analysis",
      lastUpdated: "2025-08-05T08:00:00Z",
    },
    {
      chatId: "h9j1l3n5-p7r9t1v3-x5z7b9d1-f3h5j7l9",
      title: "Product roadmap discussion",
      lastUpdated: "2025-07-25T14:35:00Z",
    },
  ];
}
