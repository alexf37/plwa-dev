import z from "zod";

export type Location = {
  latitude: number;
  longitude: number;
};

export const postSchema = z.object({
  id: z.string(),
  author: z.string(),
  author_id: z.string(),
  text: z.string(),
  time: z.coerce.date(),
  like_count: z.coerce.number(),
  comment_count: z.coerce.number(),
  user_liked: z.coerce.number().pipe(z.coerce.boolean()),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
});

export type Post = z.infer<typeof postSchema>;

export type DeprecatedPost = {
  id: string;
  author: string;
  author_id: string;
  text: string;
  time: string;
  like_count: string;
  comment_count: string;
  user_liked: string;
  latitude: string;
  longitude: string;
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
      latitude: 38.03399,
      longitude: -78.51543,
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
      latitude: 38.033429344826004,
      longitude: -78.51069595462664,
    },
    activity: "dead",
  },
];
