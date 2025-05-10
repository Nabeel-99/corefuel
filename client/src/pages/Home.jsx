import React, { useEffect } from "react";
import GridCard from "../components/GridCard";
import { Link, useNavigate } from "react-router-dom";
import PictureOne from "../assets/images/pic1.jpg";
import PictureTwo from "../assets/images/pic2.jpg";
import PictureThree from "../assets/images/pic3.jpg";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const gridDetails = [
    {
      title: "Workout Programs",
      picture: PictureThree,
    },
    {
      title: "Nutritional Plan",
      picture: PictureTwo,
    },
    {
      title: "Fitness Evaluation",
      picture: PictureOne,
    },
  ];

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <nav className="fixed top-0 pt-4 flex items-center justify-end backdrop-blur-lg pb-2 w-full  lg:right-18 ">
        <div className="flex items-end gap-2 pr-4 ">
          <Link
            to={"/login"}
            className=" bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to={"/starter/step-1"}
            className=" bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </nav>
      <div className="flex flex-col gap-10 items-center justify-center h-full pt-24  w-full">
        <div className="text-center">
          <h2 className="text-2xl lg:text-4xl bg-gradient-to-br font-bold from-[#1431a4] to-[#FF8C00] bg-clip-text text-transparent">
            Welcome to
          </h2>
          <p className="text-3xl lg:text-6xl font-bold bg-gradient-to-r from-[#1431a4] to-[#0e71af] bg-clip-text text-transparent">
            CoreFuel
          </p>
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
        <div className="pb-20">
          <Link
            to={"/starter/step-1"}
            className=" bg-blue-500 px-4 py-2 lg:px-8 font-bold lg:text-2xl lg:py-4 rounded-lg text-white hover:bg-blue-700"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
