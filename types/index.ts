// types/index.ts — Shared TypeScript interfaces across the app

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role: "admin";
}

export interface SocialItem {
  _id: string
  name: string
  href: string
  iconName: string
  order: number
}


