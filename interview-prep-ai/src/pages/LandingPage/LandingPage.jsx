import React, { use, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { APP_FEATURES } from "../../utils/data.js";
import { LuSparkles } from "react-icons/lu";
import Hero_Image from "../../assets/hero_image.png";
import Login from "../Auth/Login.jsx";
import Signup from "../Auth/Signup.jsx";
import { Modal } from "../../componants/Loader/Modal.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { ProfileInfoCard } from "../../componants/Cards/ProfileInfoCard.jsx";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setopenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setopenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF] relative pb-36">
        {/* Decorative background */}
        <div className="w-full h-[500px] bg-amber-200/20  absolute top-0 left-0 z-0"></div>

        {/* Hero Section content */}
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <h1 className="text-3xl font-sm text-black">Interview Prep AI</h1>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                onClick={() => setopenAuthModal(true)}
                className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
              >
                Login/ Signup Up
              </button>
            )}
          </header>

          {/* Hero section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery – your ultimate interview toolkit is
                here.
              </p>
              <button className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* 👇 Image Section appears below the hero section */}
        <div className="w-full relative z-10 mt-10">
          <div>
            <section className="flex items-center justify-center mt-[-100px]">
              <img
                src={Hero_Image}
                className="w-[80vw] rounded-lg shadow-lg"
                alt="Hero"
              />
            </section>
          </div>

          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Feature that make you shine
              </h2>
              {/* first 3 cards  */}
              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full ">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                      key={feature.id}
                    >
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* last 2 cards */}
                <div>
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div key={feature.id}>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
            made with ❤️ happy coding!
          </div>
        </div>

        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setopenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage}></Login>
            )}
            {currentPage === "signup" && (
              <Signup setCurrentPage={setCurrentPage}></Signup>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default LandingPage;
