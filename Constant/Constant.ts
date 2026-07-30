// Constant/Constant.ts

// import { Mail, MapPin, Phone } from "lucide-react";
import { Cloud, Code2, Database, GitBranch, Globe, Layers, Mail, MapPin, Palette, Phone, Server, Smartphone, Terminal } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { FaStripe } from "react-icons/fa6";
import { SiExpress, SiMongoosedotws } from "react-icons/si";
import { LuWebhook } from "react-icons/lu";
import { FaNodeJs, FaReact, FaDocker, FaFigma } from "react-icons/fa";
import { RiNextjsLine, RiTailwindCssFill } from "react-icons/ri";
import { TbBrandMongodb, TbBrandSocketIo, TbBrandTypescript } from "react-icons/tb";

export const NavLinks = [
  // {name: 'Home', path: '/'},
  {name: 'About', path: '/about'},
  // {name: 'Skills', path: '/skills'},
  {name: 'Work', path: '/projects'},
  {name: 'Blog', path: '/blog'},
  // {name: 'Contact', path: '/contact'},
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

// export const projects = [
//   {
//     title: "E-Commerce Platform",
//     description:
//       "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
//     image: "/images/p1.jpg",
//     techStack: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
//     demoUrl: "https://example.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     title: "Task Management App",
//     description:
//       "Collaborative project management tool with real-time updates, Kanban boards, and team analytics.",
//     image: "/images/p2.jpg",
//     techStack: ["React", "Node.js", "Socket.io", "PostgreSQL"],
//     demoUrl: "https://example.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     title: "AI Content Generator",
//     description:
//       "GPT-powered content creation platform for marketers with templates and workflow automation.",
//     image: "/images/p3.jpg",
//     techStack: ["React", "Python", "OpenAI", "FastAPI"],
//     demoUrl: "https://example.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     title: "Real Estate Platform",
//     description:
//       "Property listing platform with virtual tours, mortgage calculator, and agent booking system.",
//     image: "/images/p4.jpg",
//     techStack: ["Vue.js", "Node.js", "MongoDB", "Maps API"],
//     demoUrl: "https://example.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     title: "Fitness Tracker",
//     description:
//       "Cross-platform mobile app for workout tracking, nutrition logging, and progress analytics.",
//     image: "/images/p5.jpg",
//     techStack: ["React Native", "Firebase", "Node.js", "Charts"],
//     demoUrl: "https://example.com",
//     githubUrl: "https://github.com",
//   },
//   {
//     title: "Learning Management System",
//     description:
//       "Educational platform with video streaming, quizzes, progress tracking, and certificates.",
//     image: "/images/p6.jpg",
//     techStack: ["Next.js", "Prisma", "AWS S3", "Stripe"],
//     demoUrl: "https://example.com",
//     githubUrl: "https://github.com",
//   },
// ];


export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: RiNextjsLine },
      { name: "TypeScript", icon: TbBrandTypescript },
      { name: "Tailwind CSS", icon: RiTailwindCssFill },
      // { name: "React Native", icon: Smartphone },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: TbBrandMongodb },
      // { name: "PostgreSQL", icon: Database },
      // { name: "GraphQL", icon: Cpu },
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
      // { name: "Docker", icon: FaDocker },
      // { name: "AWS", icon: Cloud },
      // { name: "Linux", icon: Terminal },
      { name: "Figma", icon: FaFigma },
      { name: "Stripe", icon: FaStripe },
      {name: "Webhooks", icon: LuWebhook },
      // { name: "CI/CD", icon: Cpu },
    ],
  },
];

// some constants data invalid after completed backend.
