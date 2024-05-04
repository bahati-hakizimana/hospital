import React from "react";
import Button from "../layouts/Button";
import BlogCard from "../layouts/BlogCard";
import post1 from "../assets/img/post1.jpeg";
import post2 from "../assets/img/post2.jpeg";
import post3 from "../assets/img/post3.jpeg";
import post4 from "../assets/img/post3.jpeg";

import img5 from "../assets/img/blog5.jpg";
import img6 from "../assets/img/blog6.jpg";

const Blogs = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Latest Post
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus,
            quidem.
          </p>
        </div>
        <div className=" mt-4 lg:mt-0">
          <a href="#">
          <Button title="Request" />
          </a>
          
        </div>
      </div>
      <div className=" my-8">
        <div className=" flex flex-wrap justify-center gap-5">
          <BlogCard img={post1} headlines="Unraveling the Mysteries of Sleep" />
          <BlogCard img={post2} headlines="The Heart-Healthy Diet" />
          <BlogCard
            img={post3}
            headlines="Understanding Pediatric Vaccinations"
          />
          <BlogCard img={post4} headlines="Navigating Mental Health" />
          <BlogCard img={img5} headlines="The Importance of Regular Exercise" />
          <BlogCard img={img6} headlines="Skin Health 101" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
