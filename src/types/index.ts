export enum Roles {
  user = "user",
  admin = "admin",
}

export type User = {
  id: number;
  email: string;
  role: Roles;
  confirmation: boolean;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  publication: boolean;
  date: Date;
  categories: Categories[];
};

export type Categories = {
  id: number;
  name: string;
};

export type Booking = {
  userId: number;
  eventId: number;
};
