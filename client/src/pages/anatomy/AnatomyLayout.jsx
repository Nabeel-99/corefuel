import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useSelector } from "react-redux";
const AnatomyLayout = () => {
  const { category } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [exercises, setExercises] = useState([]);
  const subCategories = {
    chest: ["upper pec", "middle pec", "lower pec"],
    legs: ["hamstrings", "quadriceps", "calves"],
    shoulder: ["anterior delt", "medial delt", "rear delt"],
    back: ["upper back", "middle back", "lower back"],
  };
  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/get-exercises/${category}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        setExercises(response.data.exercisevideos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [category]);

  return (
    <div className="flex flex-col items-center px-6 lg:px-30 pb-20 lg:pb-30  gap-4 pt-10 lg:pt-24">
      <h2 className="text-2xl pb-10">Chest Anatomy</h2>
      <div className="grid grid-cols-3 gap-10">
        {subCategories[category].map((name, index) => (
          <h2 key={index} className="text-lg w-96 text-center font-semibold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-20">
        {exercises.length > 0 &&
          exercises.map((exercise, index) => {
            const previewUrl = `https://drive.google.com/uc?export=view&id=${exercise.videoUrlID}`;

            return (
              <div
                to={`/exercise/${exercise._id}`}
                key={index}
                className="transition duration-300 ease-linear hover:scale-105 border border-[#dadada] text-black text-center p-4 lg:w-96 rounded-lg"
              >
                {/* Video Thumbnail */}
                <div className="mb-2">
                  <iframe
                    src={`https://drive.google.com/file/d/1DfFyj0YucdkRftFFWtwbVV2A7JwnYOs0/preview`}
                    className="object-cover h-64 w-full"
                    style={{}}
                    allow="fullscreen"
                  ></iframe>
                </div>
                {/* Video Title */}

                <h2 className="font-semibold pb-4">{exercise.title}</h2>
                <Link
                  to={"/anatomy/"}
                  className="border px-4 py-2 rounded-lg border-[#dadada] bg-blue-500 hover:bg-blue-700  text-white"
                >
                  View Exercise details
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AnatomyLayout;
