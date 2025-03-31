import React, { useContext, useCallback } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = useCallback(() => {
    if (user) {
      navigate('/result');
    } else {
      setShowLogin(true);
    }
  }, [user, navigate, setShowLogin]);

  return (
    <div className="pb-16 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-zinc-500 py-6 md:py-16">
        See the Magic. Try Now
      </h1>

      <button
        onClick={onClickHandler}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-zinc-100 text-zinc-900 m-auto hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="Star icon" />
      </button>
    </div>
  );
};

export default GenerateBtn;
