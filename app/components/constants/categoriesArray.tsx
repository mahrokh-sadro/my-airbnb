// categories.ts

import {
  // FaBeach,
  FaGolfBall,
  FaMountain,
  FaBicycle,
  FaSwimmingPool,
  FaCamera,
  FaSpa,
  FaShoppingCart,
  FaPlane,
  FaWineGlass,
  FaUtensils,
  FaTree,
  FaMusic,
  FaBook,
  FaPaintBrush,
  FaHome,
  FaWheelchair,
} from "react-icons/fa";

// Array of categories
export const categories = [
  { name: "Beaches", icon: <FaGolfBall className="text-6xl text-blue-500" /> },
  { name: "Golfing", icon: <FaGolfBall className="text-6xl text-green-500" /> },
  {
    name: "Surfing",
    icon: <FaGolfBall className="text-6xl text-orange-500" />,
  },
  {
    name: "Mountains",
    icon: <FaMountain className="text-6xl text-purple-500" />,
  },
  { name: "Hiking", icon: <FaBicycle className="text-6xl text-red-500" /> },
  {
    name: "Swimming",
    icon: <FaSwimmingPool className="text-6xl text-teal-500" />,
  },
  {
    name: "Photography",
    icon: <FaCamera className="text-6xl text-pink-500" />,
  },
  { name: "Spas", icon: <FaSpa className="text-6xl text-gray-500" /> },
  {
    name: "Bicycling",
    icon: <FaBicycle className="text-6xl text-yellow-500" />,
  },
  {
    name: "Shopping",
    icon: <FaShoppingCart className="text-6xl text-indigo-500" />,
  },
  { name: "Travel", icon: <FaPlane className="text-6xl text-cyan-500" /> },
  { name: "Wine", icon: <FaWineGlass className="text-6xl text-teal-500" /> },
  { name: "Food", icon: <FaUtensils className="text-6xl text-orange-600" /> },
  { name: "Nature", icon: <FaTree className="text-6xl text-green-700" /> },
  { name: "Music", icon: <FaMusic className="text-6xl text-blue-600" /> },
  { name: "Books", icon: <FaBook className="text-6xl text-yellow-500" /> },
  { name: "Arts", icon: <FaPaintBrush className="text-6xl text-red-500" /> },
  { name: "Home", icon: <FaHome className="text-6xl text-purple-600" /> },
  {
    name: "Accessible",
    icon: <FaWheelchair className="text-6xl text-blue-400" />,
  },
  { name: "Cycling", icon: <FaBicycle className="text-6xl text-teal-600" /> },
];
