import React from 'react';
import { assets, testimonialsData } from '../assets/assets';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-20 py-12 px-6"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-white">
        Customer Testimonials
      </h1>
      <p className="text-zinc-300 mb-12 text-center">
        What our Users Are Saying
      </p>

      <div className="flex flex-wrap gap-8 justify-center">
        {testimonialsData?.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 border border-neutral-600 p-8 rounded-lg w-80 sm:w-96 m-auto cursor-pointer hover:scale-[1.05] transition-transform duration-300 hover:shadow-indigo-500/50 shadow-lg text-center"
          >
            <div className="flex text-white flex-col items-center">
              <img src={item.image} className="rounded-full w-16 mb-3" alt={item.name} />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-zinc-400 mb-3 text-sm">{item.role}</p>

              <div className="flex mb-3">
                {Array.from({ length: item.stars }, (_, i) => (
                  <img key={i} src={assets.rating_star} alt="star" className="w-5 h-5" />
                ))}
              </div>

              <p className="text-zinc-400 text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
