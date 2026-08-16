// Constant/Constant.ts

import { Cloud, GitBranch, Mail, MapPin, Phone, } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { FaStripe } from "react-icons/fa6";
import { SiExpress, SiMongoosedotws } from "react-icons/si";
import { LuWebhook } from "react-icons/lu";
import { FaNodeJs, FaReact, FaFigma } from "react-icons/fa";
import { TbBrandMongodb, TbBrandSocketIo, TbBrandTypescript, TbBrandNextjs } from "react-icons/tb";
import { BiLogoTailwindCss } from "react-icons/bi";

export const NavLinks = [
  {name: 'Work', path: '/projects'},
  {name: 'Blog', path: '/blog'},
  {name: 'About', path: '/about'},
];

export const statsData = [
  {num: 2, text: "Years of experience"},
  {num: 50, text: "Projects completed"},
  {num: 20, text: "Happy clients"},
];

export const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@johndoe.dev",
    href: "mailto:hello@johndoe.dev",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "#",
  },
];


export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: TbBrandNextjs },
      { name: "TypeScript", icon: TbBrandTypescript },
      { name: "Tailwind CSS", icon: BiLogoTailwindCss },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: TbBrandMongodb },
      { name: "REST APIs", icon: Cloud },
      { name: "Mongoose", icon: SiMongoosedotws },
      { name: "Socket io", icon: TbBrandSocketIo },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "Github", icon: FiGithub },
      { name: "Figma", icon: FaFigma },
      { name: "Stripe", icon: FaStripe },
      {name: "Webhooks", icon: LuWebhook },
    ],
  },
];

// some constants data invalid after completed backend.
