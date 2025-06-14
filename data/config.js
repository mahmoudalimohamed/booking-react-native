
// LOCAL IMAGE IMPORTS (Update these with your actual icons)
import avatarBiology from '../assets/images/avatar-biology.png';
import avatarChemistry from '../assets/images/avatar-chemistry.png';
import avatarPhysics from '../assets/images/avatar-physics.png';

import biologyCourseImg from '../assets/images/biology-course.png';
import chemistryCourseImg from '../assets/images/chemistry-course.png';
import physicsCourseImg from '../assets/images/physics-course.png';

import iconBiology from '../assets/images/icon-biology.png';
import iconChemistry from '../assets/images/icon-chemistry.png';
import iconPhysics from '../assets/images/icon-physics.png';

import instructorImg from '../assets/images/instructor.png';

export const appConfig = {
  appName: "ScienceBuddy",
  welcomeMessage: "Ready to explore science ?",
  primaryColor: "#0EA5E9", // blue
  accentColor: "#22C55E", // green

  instructor: {
    name: "Ajeet Singh",
    avatar: instructorImg,
    title: "Student",
  },

  featuredCourse: {
    title: "Wonders of Physics",
    subtitle: "Understanding motion, force, and energy",
    description: "Learn physics through fun experiments and animations.",
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
}; 