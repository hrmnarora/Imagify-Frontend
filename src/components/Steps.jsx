import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center my-32 px-6"
    >
      <h1 className="text-4xl text-white font-semibold mb-3 text-center">
        How it Works!
      </h1>
      <p className="text-lg text-gray-300 mb-10 text-center">
        Transform words into stunning images effortlessly.
      </p>

      <div className="space-y-6 w-full max-w-3xl">
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-center gap-6 p-6 bg-white/10 backdrop-blur-md border border-neutral-600 shadow-lg text-white cursor-pointer rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-indigo-500/50"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-indigo-500/30 p-3 rounded-full">
              <img width={40} src={item.icon} alt="Step Icon" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-gray-300 text-sm mt-1">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;