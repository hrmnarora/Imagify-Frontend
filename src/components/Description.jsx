import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 px-6 md:px-28"
    >
      <h1 className="text-3xl text-zinc-100 sm:text-4xl font-semibold mb-2">
        Create AI images
      </h1>
      <p className="text-zinc-300 mb-8 text-center">
        Turn your imagination into visuals
      </p>

      <div className="flex mt-12 flex-col gap-6 md:gap-14 lg:flex-row items-center">
        <img
          className="w-80 xl:w-96 rounded-lg shadow-lg"
          src={assets.sample_img_1}
          alt="AI Generated Sample"
        />
        <div>
          <h2 className="text-3xl text-zinc-300 font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-400 mb-4">
            Experience the power of AI in generating stunning visuals from text prompts. Our model
            understands creative input and transforms it into breathtaking images.
          </p>
          <p className="text-gray-400 mb-4">
            Simply describe your idea, and let AI bring it to life. Whether it's abstract art,
            landscapes, or fantasy scenes, the possibilities are endless!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
