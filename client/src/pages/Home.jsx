import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

function Home() {

  const [personOne, setPersonOne] = useState("");
  const [personTwo, setPersonTwo] = useState("");

  const createSpace = async () => {
    try {

      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/capsule/create`,
  {
    personOne,
    personTwo,
  }
);

      window.location.href =
        `/space/${res.data.roomId}`;

    } catch (error) {
      console.log(error);
      alert("Something went wrong ❤️");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white relative flex items-center justify-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* FLOATING HEARTS */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute top-20 left-20 text-pink-500 text-4xl"
      >
        ❤️
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute bottom-20 right-20 text-red-500 text-5xl"
      >
        ❤️
      </motion.div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="z-10 text-center px-4 w-full max-w-2xl"
      >

        {/* LOGO */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex items-center justify-center gap-3 mb-6"
        >

          <FaHeart className="text-pink-500 text-5xl drop-shadow-[0_0_20px_rgba(255,0,100,0.8)]" />

          <h1 className="text-5xl md:text-7xl font-bold">
            Couple Capsule
          </h1>

        </motion.div>

        {/* SUBTITLE */}
        <p className="text-zinc-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-10">
          Your private universe for memories,
          love letters, moments and forever memories ❤️
        </p>

        {/* INPUTS */}
        <div className="flex flex-col gap-4 mb-8">

          <input
            type="text"
            placeholder="Your Name ❤️"
            value={personOne}
            onChange={(e) =>
              setPersonOne(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none"
          />

          <input
            type="text"
            placeholder="Partner Name ✨"
            value={personTwo}
            onChange={(e) =>
              setPersonTwo(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none"
          />

        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow:
              "0px 0px 40px rgba(255,0,100,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={createSpace}
          className="bg-gradient-to-r from-pink-500 to-red-500 px-10 py-5 rounded-3xl text-xl font-semibold shadow-2xl"
        >
          Create Couple Space ❤️
        </motion.button>

      </motion.div>
    </div>
  );
}

export default Home;