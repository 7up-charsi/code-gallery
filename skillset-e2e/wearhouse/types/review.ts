export type User = {
  id: number;
  username: string;
  fullName: string;
};

export type Review = {
  id: number;
  body: string;
  likes: number;
  user: User;
};
