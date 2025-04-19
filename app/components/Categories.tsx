"use client";

import React, { useCallback } from "react";
import Slider from "react-slick";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import qs from "query-string";
import { categories } from "./constants/categoriesArray";

const Categories = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
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
    <div className="my-8 ">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`
              flex flex-col justify-center items-center
              rounded-md transform transition duration-300
              hover:scale-105 hover:shadow-md p-2 cursor-pointer
               
              ${
                selectedCategory === category.name
                  ? "border bg-blue-100 border-blue-500"
                  : ""
              }
            `}
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
