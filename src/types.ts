export type Location = {
  latitude: number;
  longitude: number;
};
export type Post = {
  id: string;
  author: string;
  text: string;
  image?: string;
  location: Location;
  likes: number;
  comments: number;
  timestamp: string;
  likedByUser: boolean;
};

export type Spot = {
  id: string;
  name: string;
  location: Location;
  activity: keyof typeof ACTIVITY_COLORS;
};

export const ACTIVITY_COLORS = {
  dead: "#e2e8f0",
  light: "#0ea5e9",
  medium: "#22c55e",
  heavy: "#f59e0b",
  extreme: "#ef4444",
} as const;

export const SPOTS: Spot[] = [
  {
    id: "firstyeardorms",
    name: "First Year Dorms",
    location: {
      latitude: 38.03499,
      longitude: -78.51143,
    },
    activity: "heavy",
  },
  {
    id: "lawn",
    name: "Lawn",
    location: {
      latitude: 38.035629,
      longitude: -78.503403,
    },
    activity: "extreme",
  },
  {
    id: "jpa",
    name: "JPA",
    location: {
      latitude: 38.028629,
      longitude: -78.508403,
    },
    activity: "medium",
  },
  {
    id: "northgrounds",
    name: "North Grounds",
    location: {
      latitude: 38.042629,
      longitude: -78.503503,
    },
    activity: "medium",
  },
  {
    id: "corner",
    name: "The Corner",
    location: {
      latitude: 38.036519,
      longitude: -78.500403,
    },
    activity: "light",
  },
  {
    id: "sts",
    name: "STS",
    location: {
      latitude: 38.03299,
      longitude: -78.51143,
    },
    activity: "dead",
  },
];
