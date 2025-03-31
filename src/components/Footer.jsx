import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion';



const Footer = () => {
  
  return (
    <motion.div initial={{opacity:0, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}} className='flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} width={150} alt="" />
        <p className='flex-1 borer-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>  |     Copyright @harmanArora | All rigths Reserved</p>

        <div className='gap-2.5 flex'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
        </div>

    </motion.div>
  )
}

export default Footer