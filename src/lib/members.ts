export type Member = {
  id: string;
  name: string;
  image: string;
  program: string;
  year: number;
  career: string;
  location: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
};

export const MEMBERS: Member[] = [
  {
    id: "alex-rivera",
    name: "Alex Rivera",
    image: "/members/alex-rivera.jpg",
    program: "Web Development Camp",
    year: 2022,
    career: "Software Engineer @ Brightside",
    location: "Austin, Texas",
    bio: "Alex builds accessible web products and mentors students taking their first steps into front-end development.",
    email: "alex.rivera@example.com",
    linkedin: "https://www.linkedin.com/in/alex-rivera-kwk",
    github: "https://github.com/alexrivera-dev",
  },
  {
    id: "jordan-chen",
    name: "Jordan Chen",
    image: "/members/jordan-chen.jpg",
    program: "Mobile App Development Camp",
    year: 2023,
    career: "Product Designer @ Daylight",
    location: "New York, New York",
    bio: "Jordan turns complex ideas into warm, intuitive products and loves collaborating at the intersection of design and code.",
    email: "jordan.chen@example.com",
    linkedin: "https://www.linkedin.com/in/jordan-chen-kwk",
    github: "https://github.com/jordanchen-design",
  },
  {
    id: "sam-okafor",
    name: "Sam Okafor",
    image: "/members/sam-okafor.jpg",
    program: "Data Science Camp",
    year: 2021,
    career: "Data Scientist @ CivicLab",
    location: "Chicago, Illinois",
    bio: "Sam uses data to make public services easier to understand and more equitable for the communities they serve.",
    email: "sam.okafor@example.com",
    linkedin: "https://www.linkedin.com/in/sam-okafor-kwk",
    github: "https://github.com/samokafor-data",
  },
  {
    id: "maya-patel",
    name: "Maya Patel",
    image: "/members/maya-patel.jpg",
    program: "AI & Machine Learning Camp",
    year: 2024,
    career: "Founder @ Common Thread",
    location: "San Francisco, California",
    bio: "Maya is building collaborative tools for student organizers and sharing what she learns with the next generation of builders.",
    email: "maya.patel@example.com",
    linkedin: "https://www.linkedin.com/in/maya-patel-kwk",
    github: "https://github.com/mayapatel-builds",
  },
  {
    id: "taylor-brooks",
    name: "Taylor Brooks",
    image: "/members/taylor-brooks.jpg",
    program: "Web Development Camp",
    year: 2023,
    career: "Community Technologist @ Open Block",
    location: "Detroit, Michigan",
    bio: "Taylor builds lightweight digital tools for neighborhood groups and helps community organizers feel at home with technology.",
    email: "taylor.brooks@example.com",
    linkedin: "https://www.linkedin.com/in/taylor-brooks-kwk",
    github: "https://github.com/taylorbrooks-tech",
  },
  {
    id: "priya-shah",
    name: "Priya Shah",
    image: "/members/priya-shah.jpg",
    program: "Cybersecurity Camp",
    year: 2024,
    career: "Cybersecurity Student @ Georgia Tech",
    location: "Atlanta, Georgia",
    bio: "Priya is exploring human-centered security, competing in collegiate hackathons, and making online safety easier to understand.",
    email: "priya.shah@example.com",
    linkedin: "https://www.linkedin.com/in/priya-shah-kwk",
    github: "https://github.com/priyashah-sec",
  },
  {
    id: "elena-morales",
    name: "Elena Morales",
    image: "/members/elena-morales.jpg",
    program: "Mobile App Development Camp",
    year: 2022,
    career: "Game Developer @ Lantern Studio",
    location: "Boston, Massachusetts",
    bio: "Elena creates cozy narrative games, experiments with playful interaction design, and organizes welcoming local game jams.",
    email: "elena.morales@example.com",
    linkedin: "https://www.linkedin.com/in/elena-morales-kwk",
    github: "https://github.com/elenamorales-games",
  },
].reverse();

export function getMember(id: string) {
  return MEMBERS.find((member) => member.id === id);
}
