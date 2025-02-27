import React from "react";
import GridCard from "../components/GridCard";
import { Link } from "react-router-dom";
import PictureOne from "../assets/images/pic1.jpg";
import PictureTwo from "../assets/images/pic2.jpg";
import PictureThree from "../assets/images/pic3.jpg";

const Home = () => {
  const gridDetails = [
    {
      title: "Fitness Quote",
      picture: PictureThree,
    },
    {
      title: "Food Quote",
      picture: PictureTwo,
    },
    {
      title: "Working out Quote",
      picture: PictureOne,
    },
  ];
  return (
    <>
      <nav className="fixed top-0 pt-4 right-18 ">
        <div className="flex items-end gap-2">
          <Link to={"/login"} className="text-blue-700 hover:text-blue-600">
            Login
          </Link>
          <Link to={"/starter"} className="text-blue-700 hover:text-blue-600">
            Signup
          </Link>
        </div>
      </nav>
      <div className="flex flex-col gap-10 items-center justify-center h-full  w-full">
        <div className="text-center">
          <h2 className="text-xl">Welcome to</h2>
          <p className="text-xl">CoreFuel</p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {gridDetails.map((detail, index) => (
            <GridCard
              key={index}
              title={detail.title}
              picture={detail.picture}
            />
          ))}
        </div>
        <div className="">
          <Link
            to={"/starter"}
            className="bg-[#dadada] rounded px-4 py-2 w-96 mt-6"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
