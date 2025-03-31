import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);  // Default loading to false
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!input.trim()) return; // Prevent empty submissions

    setLoading(true);
    setIsImageLoaded(false);

    const resultImage = await generateImage(input);
    
    if (resultImage) {
      setImage(resultImage);
      setIsImageLoaded(true);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img
            className="max-w-sm rounded"
            src={image}
            alt="Generated content"
            onLoad={() => setIsImageLoaded(true)}
          />
          {loading && (
            <span className="absolute bottom-0 left-0 h-1 bg-blue-500 w-full transition-all duration-[10s]"></span>
          )}
        </div>
        {loading && <p>Loading...</p>}
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-white/20 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
          />
          <button
            className="bg-white text-black px-10 sm:px-16 py-3 rounded-full"
            type="submit"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <button
            onClick={() => {
              setIsImageLoaded(false);
              setInput(""); // Reset input field
            }}
            className="bg-white/20 text-white border border-zinc-900 px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </button>
          <a
            className="bg-[#5C74FF] text-black px-10 py-3 rounded-full cursor-pointer"
            href={image}
            download
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
