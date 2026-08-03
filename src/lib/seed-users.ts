// ============================================================
// SEED USERS — sample users for development
// ============================================================
// These match the seed data in src/db/seed.ts.
// Used by the fake auth system and the Header component.
// ============================================================

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export const SEED_USERS: User[] = [
  {
    id: "user-1",
    name: "Alex Rivera",
    email: "alex@example.com",
    image: "/members/alex-rivera.jpg",
  },
  {
    id: "user-2",
    name: "Jordan Chen",
    email: "jordan@example.com",
    image: "/members/jordan-chen.jpg",
  },
  {
    id: "user-3",
    name: "Sam Okafor",
    email: "sam@example.com",
    image: "/members/sam-okafor.jpg",
  },
  {
    id: "user-4",
    name: "Maya Patel",
    email: "maya@example.com",
    image: "/members/maya-patel.jpg",
  },
];
