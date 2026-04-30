export const ACADEMY_NAME = "Green Thumb Academy";
export const PHONE_NUMBER = "+91 90805 83518";
export const WHATSAPP_NUMBER = "919080583518";
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I'm interested in enrolling at Green Thumb Academy. Please share more details about courses and fees.",
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const ADDRESS = {
  line1: "No. 42, Anna Nagar East",
  line2: "Chennai - 600 102",
  state: "Tamil Nadu, India",
};

export const WORKING_HOURS = [
  { days: "Monday – Saturday", hours: "7:00 AM – 8:00 PM" },
  { days: "Sunday", hours: "9:00 AM – 1:00 PM" },
];

export const EMAIL = "info@greenthumbacademy.in";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const FEATURES = [
  {
    icon: "📐",
    title: "Maths Coaching (X–XII)",
    description:
      "Expert coaching for Class X, XI, and XII board exams with problem-solving focus.",
  },
  {
    icon: "📚",
    title: "Tuition I–X (All Boards)",
    description:
      "Comprehensive tuition for Classes I–X covering CBSE, ICSE, and State boards.",
  },
  {
    icon: "🕉️",
    title: "Hindi & Prachar Sabha",
    description:
      "Hindi language and Prachar Sabha exam preparation by experienced faculty.",
  },
  {
    icon: "🧮",
    title: "Abacus & Vedic Maths",
    description:
      "Build mental arithmetic speed and accuracy with Abacus and Vedic techniques.",
  },
  {
    icon: "🔤",
    title: "Phonics Programme",
    description:
      "Early literacy foundation through structured phonics for young learners.",
  },
  {
    icon: "📊",
    title: "Accounts Coaching",
    description:
      "Commerce-stream Accountancy with concept clarity and practice tests.",
  },
  {
    icon: "🎵",
    title: "Music Classes",
    description:
      "Carnatic and Western music lessons fostering creativity and discipline.",
  },
  {
    icon: "♟️",
    title: "Chess & Strategy",
    description:
      "Chess training developing critical thinking and strategic reasoning skills.",
  },
  {
    icon: "🥋",
    title: "Karate",
    description:
      "Self-defense and discipline through structured karate grading programs.",
  },
  {
    icon: "🧘",
    title: "Yoga",
    description:
      "Mind-body wellness through age-appropriate yoga and mindfulness sessions.",
  },
  {
    icon: "💃",
    title: "Bharatanatyam",
    description:
      "Classical Indian dance with certified instructors — from basics to arangetram.",
  },
  {
    icon: "🎯",
    title: "Career Counseling",
    description:
      "One-on-one guidance helping students choose the right academic and career paths.",
  },
  {
    icon: "📝",
    title: "Test Series & Exam Prep",
    description:
      "Regular mock tests and revision series for competitive and board examinations.",
  },
  {
    icon: "🏫",
    title: "Safe, Smart Classrooms",
    description:
      "AC halls with CCTV surveillance and sanitized spaces for safe learning.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Priya Menon",
    role: "Parent",
    rating: 5,
    text: "My daughter's grades improved dramatically. The Maths coaching is exceptional!",
    avatar: "PM",
  },
  {
    name: "Arun Kumar",
    role: "Student",
    rating: 5,
    text: "Best place to learn. The teachers are patient, knowledgeable, and truly caring.",
    avatar: "AK",
  },
  {
    name: "Kavitha Rajan",
    role: "Parent",
    rating: 5,
    text: "The abacus and phonics classes gave my son such a strong foundation. Highly recommended!",
    avatar: "KR",
  },
  {
    name: "Meena Sharma",
    role: "Parent",
    rating: 5,
    text: "Excellent faculty, safe environment, and great attention to each child. So happy we enrolled.",
    avatar: "MS",
  },
  {
    name: "Divya Nair",
    role: "Student (Class XII)",
    rating: 5,
    text: "Chess and career counseling sessions were life-changing. I feel so prepared now.",
    avatar: "DN",
  },
];

export const GALLERY_CATEGORIES = [
  {
    id: "learning",
    label: "Learning Space",
    images: [
      {
        alt: "Students in classroom",
        src: "/assets/generated/gallery-learning-1.jpg",
      },
      {
        alt: "Interactive whiteboard session",
        src: "/assets/generated/gallery-learning-2.jpg",
      },
      {
        alt: "Group study session",
        src: "/assets/generated/gallery-learning-3.jpg",
      },
      {
        alt: "Abacus training class",
        src: "/assets/generated/gallery-learning-4.jpg",
      },
    ],
  },
  {
    id: "academy",
    label: "Academy",
    images: [
      {
        alt: "Academy entrance",
        src: "/assets/generated/gallery-academy-1.jpg",
      },
      {
        alt: "Modern AC classroom",
        src: "/assets/generated/gallery-academy-2.jpg",
      },
      { alt: "Chess room", src: "/assets/generated/gallery-academy-3.jpg" },
      { alt: "Dance studio", src: "/assets/generated/gallery-academy-4.jpg" },
    ],
  },
  {
    id: "celebrations",
    label: "Celebrations",
    images: [
      {
        alt: "Annual day celebration",
        src: "/assets/generated/gallery-celebration-1.jpg",
      },
      {
        alt: "Award ceremony",
        src: "/assets/generated/gallery-celebration-2.jpg",
      },
      {
        alt: "Cultural program",
        src: "/assets/generated/gallery-celebration-3.jpg",
      },
      { alt: "Sports day", src: "/assets/generated/gallery-celebration-4.jpg" },
    ],
  },
];

export const TEAM = [
  {
    name: "Dr. Kavitha Natarajan",
    role: "Founder & Principal",
    bio: "With 25+ years in education, Dr. Kavitha founded Green Thumb Academy to make holistic learning accessible to every child in Chennai.",
    avatar: "KN",
  },
  {
    name: "Mr. Suresh Natarajan",
    role: "Director",
    bio: "Overseeing operations and curriculum design, Mr. Suresh ensures that every program meets the highest academic standards.",
    avatar: "SN",
  },
];
