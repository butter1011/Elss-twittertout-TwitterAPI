const listData = [
  {
    title: "Newly entered users",
    id: 0,
    content: "users increased than last month.",
    amount: 180,
    new_data: 100,
  },
  {
    title: "Total number of twitters",
    id: 1,
    content: "twitters newly added in this week.",
    amount: 100,
    new_data: 180,
  },
  {
    title: "Total number of tweets",
    id: 2,
    content: "of tweets newly added today.",
    amount: 1000,
    new_data: 180,
  },
];

const columns = [
  { name: "Id", uid: "id" },
  { name: "Image", uid: "avatar" },
  { name: "Name", uid: "name" },
  { name: "Winrate", uid: "rate" },
];

const usersData = [
  {
    name: "Alex",
    id: 0,
    winrate: 93.9,
  },
  {
    name: "John",
    id: 1,
    winrate: 92,
  },
  {
    name: "Emily",
    id: 2,
    winrate: 91.1,
  },
  {
    name: "Sarah",
    id: 3,
    winrate: 87.5,
  },
  {
    name: "Michael",
    id: 4,
    winrate: 80.5,
  },
  {
    name: "Jessica",
    id: 5,
    winrate: 79.9,
  },
  {
    name: "David",
    id: 6,
    winrate: 78.9,
  },
  {
    name: "Sophia",
    id: 7,
    winrate: 75.4,
  },
  {
    name: "William",
    id: 8,
    winrate: 73.8,
  },
  {
    name: "Olivia",
    id: 9,
    winrate: 68.1,
  },
];

export { listData, usersData, columns };
