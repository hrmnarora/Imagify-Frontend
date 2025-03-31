import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center mt-24 sm:mt-32 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Tagline */}
      <motion.div
        className="flex items-center gap-2 bg-white/20 px-6 py-1 rounded-full border border-neutral-500 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-sm sm:text-base">Best text to image generator</p>
        <img src={assets.star_icon} alt="Star" className="h-5" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl sm:text-6xl font-semibold text-white mt-6 max-w-lg sm:max-w-2xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        Turn <span className="text-blue-500">Text</span> into Stunning <span className="text-blue-500">Images</span> in Seconds
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-gray-300 text-sm sm:text-lg mt-4 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Instantly create AI-generated images from your imagination. Transform your text into stunning visuals with cutting-edge AI.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onClickHandler}
        className="mt-8 px-10 py-3 rounded-full text-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="Star Group" />
      </motion.button>

      {/* Sample Image Gallery */}
      <div className="flex gap-4 mt-16">
        {Array(6).fill("").map((_, index) => (
          <motion.img
            className="rounded-lg shadow-lg cursor-pointer w-14 sm:w-16 hover:scale-110 transition-transform duration-300"
            src={index % 2 ? assets.sample_img_1 : assets.sample_img_2}
            alt="Sample"
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
        ))}
      </div>

      {/* Footer Text */}
      <motion.p
        className="mt-3 text-gray-400 text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Generated images from <span className="text-blue-400 font-semibold">Imagely</span>
      </motion.p>
    </motion.div>
  );
};

export default Header;
