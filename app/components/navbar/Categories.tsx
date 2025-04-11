"use client";

import React, { useCallback } from "react";
import Slider from "react-slick";
import {
  FaGolfBall,
  FaBeach,
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
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
const categories = [
  { name: "Beaches", icon: <FaGolfBall className="text-6xl text-blue-500" /> },
  { name: "Golfing", icon: <FaGolfBall className="text-6xl text-green-500" /> },
  {
    name: "Surfing",
    icon: <FaGolfBall className="text-6xl text-orange-500" />,
  },
  {
    name: "Mountains",
    icon: <FaGolfBall className="text-6xl text-purple-500" />,
  },
  { name: "Hiking", icon: <FaGolfBall className="text-6xl text-red-500" /> },
  { name: "Swimming", icon: <FaGolfBall className="text-6xl text-teal-500" /> },
  {
    name: "Photography",
    icon: <FaGolfBall className="text-6xl text-pink-500" />,
  },
  { name: "Spas", icon: <FaGolfBall className="text-6xl text-gray-500" /> },
  {
    name: "Bicycling",
    icon: <FaGolfBall className="text-6xl text-yellow-500" />,
  },
  {
    name: "Shopping",
    icon: <FaGolfBall className="text-6xl text-indigo-500" />,
  },
  { name: "Travel", icon: <FaGolfBall className="text-6xl text-cyan-500" /> },
  { name: "Wine", icon: <FaGolfBall className="text-6xl text-teal-500" /> },
  { name: "Food", icon: <FaGolfBall className="text-6xl text-orange-600" /> },
  { name: "Nature", icon: <FaGolfBall className="text-6xl text-green-700" /> },
  { name: "Music", icon: <FaGolfBall className="text-6xl text-blue-600" /> },
  { name: "Books", icon: <FaGolfBall className="text-6xl text-yellow-500" /> },
  { name: "Arts", icon: <FaGolfBall className="text-6xl text-red-500" /> },
  { name: "Home", icon: <FaGolfBall className="text-6xl text-purple-600" /> },
  {
    name: "Accessible",
    icon: <FaGolfBall className="text-6xl text-blue-400" />,
  },
  { name: "Cycling", icon: <FaGolfBall className="text-6xl text-teal-600" /> },
];

const Categories = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(
    (name: string) => {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const newQuery = {
        ...currentQuery,
        category: name,
      };

      const url = qs.stringifyUrl(
        { url: "/", query: newQuery },
        { skipNulls: true }
      );

      router.push(url);
    },
    [params, router]
  );
  const selectedCategory = params?.get("category");

  return (
    <div className="my-8 px-4">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center rounded-md shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-md p-2 cursor-pointer ${
              selectedCategory === category.name
                ? "bg-blue-100 border border-blue-500"
                : "bg-white"
            }`}
            onClick={() => handleClick(category.name)}
          >
            <div className="flex items-center justify-center mb-2">
              {category.icon}
            </div>
            <h3 className="text-sm font-medium text-gray-700 text-center">
              {category.name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Categories;
