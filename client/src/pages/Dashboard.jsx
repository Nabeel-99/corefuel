import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col px-6 lg:px-30 pb-30 gap-6 pt-10 lg:pt-20">
      <div className="grid lg:grid-cols-2  gap-10">
        <div className="flex items-center gap-4">
          {" "}
          <div className="flex rounded-full border h-16 w-16 bg-blue-500 text-center items-center text-white justify-center uppercase">
            OM
          </div>
          <h2>Osama</h2>
        </div>

        <p className="italic lg:w-96">
          "Your body won’t go where your mind won’t push it. Stay focused, stay
          strong, and keep grinding!"
        </p>
      </div>
      <div className="flex items-center justify-end">
        <h2>1st Day streak</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="border border-[#dadada]  bg-white shadow-md rounded p-4">
          <h2>Calories</h2>
          <div className="flex gap-10 lg:justify-between mt-6">
            <div className="flex items-center justify-center border p-10 rounded-full h-24 w-24 lg:h-32 lg:w-32">
              <span>
                {" "}
                1275 <span className="block">remaining</span>
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="w-12 lg:w-24">Base Goal</h2>
                <span className="border px-4 py-2 lg:w-24">500</span>
              </div>
              <div className="flex items-center gap-4">
                <h2 className="w-12 lg:w-24">Food</h2>
                <span className="border px-4 py-2 lg:w-24">500</span>
              </div>
              <div className="flex items-center gap-4">
                <h2 className="w-12 lg:w-24">Exercise</h2>
                <span className="border px-4 py-2 lg:w-24">500</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-[#dadada]  bg-white shadow-md rounded p-4">
          <h2>Macros</h2>
          <div className="grid grid-cols-3 mt-6">
            <div className="h-20 w-20 lg:h-32 lg:w-32 border rounded-full"></div>
            <div className="h-20 w-20 lg:h-32 lg:w-32 border rounded-full"></div>
            <div className="h-20 w-20 lg:h-32 lg:w-32 border rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border min-h-60 max-h-60 rounded bg-white shadow-md border-[#dadada] p-4">
        <h2>Workout Plan</h2>
        <div className="border border-[#dadada] bg-[#dfdfdf]"></div>
      </div>
    </div>
  );
};

export default Dashboard;
