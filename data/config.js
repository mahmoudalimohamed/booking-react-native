// LOCAL IMAGE IMPORTS (Update these with your actual icons)
import avatarBiology from "../assets/images/avatar-biology.png";
import avatarChemistry from "../assets/images/avatar-chemistry.png";
import avatarPhysics from "../assets/images/avatar-physics.png";

import biologyCourseImg from "../assets/images/biology-course.png";
import chemistryCourseImg from "../assets/images/chemistry-course.png";
import physicsCourseImg from "../assets/images/physics-course.png";

import iconBiology from "../assets/images/icon-biology.png";
import iconChemistry from "../assets/images/icon-chemistry.png";
import iconPhysics from "../assets/images/icon-physics.png";

import instructorImg from "../assets/images/instructor.png";

// Step 1: Initial static parts
export const appConfig = {
  appName: "Royal Lines",
  welcomeMessage: "Ready to explore our Royal Lines ?",
  primaryColor: "#0EA5E9",
  accentColor: "#22C55E",

  instructor: {
    name: "Ajeet Singh",
    avatar: instructorImg,
    title: "Student",
  },

  featuredCourse: {
    title: "Royal Lines",
    subtitle: "Understanding motion, force, and energy",
    description: "Explor motion, force, and energy.",
    instructor: "Dr. Ananya Patel",
    rating: 4.9,
    lessons: 10,
    duration: "5 hours",
    image: physicsCourseImg,
    tag: "FEATURED",
  },

  categories: ["All", "Physics", "Chemistry", "Biology"],

  ongoingCourses: [
    {
      id: "phy101",
      title: "Fun with Physics",
      instructor: "Dr. Mark",
      instructorAvatar: avatarPhysics,
      progress: 70,
      icon: iconPhysics,
    },
    {
      id: "chem101",
      title: "Chemistry for Kids",
      instructor: "Ms. Sarah",
      instructorAvatar: avatarChemistry,
      progress: 45,
      icon: iconChemistry,
    },
    {
      id: "bio101",
      title: "Our Amazing Body",
      instructor: "Mr. Kavita Sharma",
      instructorAvatar: avatarBiology,
      progress: 30,
      icon: iconBiology,
    },
  ],

  courses: [
    {
      id: "phy101",
      title: "Fun with Physics",
      instructor: "Dr. Mark",
      instructorAvatar: avatarPhysics,
      rating: 4.8,
      lessons: 8,
      duration: "4 hours",
      price: 99,
      image: physicsCourseImg,
      category: "Physics",
    },
    {
      id: "chem101",
      title: "Chemistry for Kids",
      instructor: "Ms. Sarah",
      instructorAvatar: avatarChemistry,
      rating: 4.7,
      lessons: 10,
      duration: "5.5 hours",
      price: 0,
      image: chemistryCourseImg,
      category: "Chemistry",
    },
    {
      id: "bio101",
      title: "Our Amazing Body",
      instructor: "Mr. Kavita Sharma",
      instructorAvatar: avatarBiology,
      rating: 4.6,
      lessons: 7,
      duration: "3.5 hours",
      price: 0,
      image: biologyCourseImg,
      category: "Biology",
    },
  ],

  upcomingClasses: [
    {
      id: "1",
      title: "Gravity & Motion",
      instructor: "Dr. Mark",
      time: "10:00 AM - 11:00 AM",
      date: "Today",
      type: "Live Experiment",
      color: "from-yellow-400 to-yellow-600",
      icon: "video",
    },
    {
      id: "2",
      title: "Fun Chemistry Lab",
      instructor: "Ms. Sarah",
      time: "1:30 PM - 2:30 PM",
      date: "Today",
      type: "Hands-on Lab",
      color: "from-pink-400 to-pink-600",
      icon: "box",
    },
    {
      id: "3",
      title: "Inside the Human Body",
      instructor: "Mr. kavita Sharma",
      time: "9:00 AM - 10:15 AM",
      date: "Tomorrow",
      type: "Science Talk",
      color: "from-green-400 to-green-600",
      icon: "heart",
    },
  ],
};

// Step 2: Add dependent `videos` separately
appConfig.videos = [
  {
    id: "1",
    title: "Forces in Action",
    duration: "10:15",
    thumbnail: appConfig.featuredCourse.image,
    instructor: "Dr. Mark",
    instructorAvatar: appConfig.ongoingCourses.find(
      (c) => c.title === "Fun with Physics"
    )?.instructorAvatar,
    course: "Fun with Physics",
  },
  {
    id: "2",
    title: "Mixing Magic: Simple Reactions",
    duration: "12:30",
    thumbnail: appConfig.courses.find((c) => c.title === "Chemistry for Kids")
      ?.image,
    instructor: "Ms. Sarah",
    instructorAvatar: appConfig.courses.find(
      (c) => c.instructor === "Ms. Sarah"
    )?.instructorAvatar,
    course: "Chemistry for Kids",
  },
  {
    id: "3",
    title: "How the Heart Works",
    duration: "14:20",
    thumbnail: appConfig.courses.find((c) => c.title === "Our Amazing Body")
      ?.image,
    instructor: "Mr. Kavita Sharma",
    instructorAvatar: appConfig.courses.find(
      (c) => c.instructor === "Mr. Kavita Sharma"
    )?.instructorAvatar,
    course: "Our Amazing Body",
  },
];

export const stations = [
  {
    city: "Cairo",
    stations: [
      "Ramsis",
      "Abdel Moneim Riad",
      "Turgoman",
      "Almaza",
      "Nasr City",
    ],
  },
  {
    city: "Alexandria",
    stations: [
      "Miami",
      "Sidi Gaber",
      "Moharam Bek",
      "Raml Station",
      "Manshiya",
    ],
  },
  {
    city: "Giza",
    stations: ["Haram", "6th October", "Sheikh Zayed", "Dokki", "Mohandessin"],
  },
  {
    city: "Sharm El Sheikh",
    stations: ["Naama Bay", "Old Market", "Airport", "Hadaba", "Sharks Bay"],
  },
  {
    city: "Hurghada",
    stations: ["Marina", "Downtown", "Airport", "El Gouna", "Sakkala"],
  },
];
