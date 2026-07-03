// types/index.ts 

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


export type ContactItem = {
  _id: string;
  label: string;
  value: string;
  href: string;
  iconName: string;
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  imagePublicId?: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  order: number;
};

