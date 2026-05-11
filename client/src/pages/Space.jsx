// client/src/pages/Space.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import Particles from "react-tsparticles";

function Space() {
  const { roomId } = useParams();

  const [capsule, setCapsule] = useState(null);

const [title, setTitle] = useState("");
const [image, setImage] = useState("");

const [anniversaryDate, setAnniversaryDate] =
  useState("");
  const [theme, setTheme] =
  useState("romantic");
  const [missYou, setMissYou] =
  useState(false);

const [missTime, setMissTime] =
  useState("");

  const [meetDate, setMeetDate] =
  useState("");

const [meetTitle, setMeetTitle] =
  useState("Next Meet ❤️");

  const [futureLetter, setFutureLetter] =
  useState("");

const [futureTitle, setFutureTitle] =
  useState("");

const [futureDate, setFutureDate] =
  useState("");

const [savedLetters, setSavedLetters] =
  useState([]);
const fetchCapsule = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/capsule/${roomId}`
  );

  setCapsule(res.data);

  setAnniversaryDate(
    res.data.anniversaryDate || ""
  );
};

  useEffect(() => {
    fetchCapsule();
  }, []);

  const addMemory = async () => {
    if (!title || !image) {
      return alert("Please fill all fields");
    }

    await axios.post(
  `${import.meta.env.VITE_API_URL}/api/capsule/${roomId}/memory`,
      {
        title,
        image,
      }
    );

    setTitle("");
    setImage("");

    fetchCapsule();
  };

  // ❤️ LOVE TIMER
  const calculateLoveDays = () => {
  if (!capsule?.anniversaryDate) return 0;

  const start = new Date(capsule.anniversaryDate);
  const now = new Date();

  const diff =  now - start ;

  return Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
};

  const updateAnniversaryDate = async () => {
  await axios.put(
  `${import.meta.env.VITE_API_URL}/api/capsule/${roomId}/date`,
    {
      anniversaryDate,
    }
  );

  fetchCapsule();

  alert("First Day Updated ❤️");
};
  // LOADING
  if (!capsule) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl">
        Loading ❤️
      </div>
    );
  }

  const loveQuotes = [
  "You are my favorite place to go ❤️",
  "Every love story is beautiful, but ours is my favorite ✨",
  "You feel like home ❤️",
  "I still fall for you every day 🥺",
  "In every universe, I would choose you ❤️",
  "Distance means so little when someone means so much 🌙",
  "Forever isn’t long enough with you ❤️",
  "You are my today and all my tomorrows ✨",
];

const randomQuote =
  loveQuotes[Math.floor(Math.random() * loveQuotes.length)];

const calculateLateNightTalks = () => {
  return capsule.memories.filter((memory) => {
    const hour = new Date(memory.createdAt).getHours();

    return hour >= 22 || hour <= 4;
  }).length;
};

const calculateEmotionalDay = () => {
  if (capsule.memories.length === 0) {
    return "No memories yet";
  }

  const dates = {};

  capsule.memories.forEach((memory) => {
    const date = new Date(memory.createdAt)
      .toLocaleDateString();

    dates[date] = (dates[date] || 0) + 1;
  });

  let maxDate = "";
  let maxCount = 0;

  for (const date in dates) {
    if (dates[date] > maxCount) {
      maxCount = dates[date];
      maxDate = date;
    }
  }

  return maxDate;
};

const calculateLoveLevel = () => {
  const score =
    capsule.memories.length * 10 +
    calculateLateNightTalks() * 5;

  if (score > 500) return "Infinity ♾️";
  if (score > 300) return "Soulmates ❤️";
  if (score > 150) return "Deep Love 💖";

  return "Growing Together ✨";
};

const getBackgroundStyle = () => {

  switch (theme) {

    case "romantic":
      return "bg-gradient-to-br from-pink-900 via-red-900 to-black";

    case "calm":
      return "bg-gradient-to-br from-blue-950 via-zinc-900 to-cyan-900";

    case "sad":
      return "bg-gradient-to-br from-zinc-950 via-slate-900 to-gray-900";

    case "dreamy":
      return "bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900";

    case "passion":
      return "bg-gradient-to-br from-red-950 via-orange-900 to-black";

    default:
      return "bg-black";
  }
};
const renderThemeEffect = () => {

  // ❤️ ROMANTIC
  if (theme === "romantic") {
    return (
      <>
        <div className="hidden md:block absolute left-10 top-40 text-5xl animate-bounce" >
          ❤️
        </div>

        <div className="hidden md:block absolute right-10 top-52 text-4xl animate-pulse">
          💖
        </div>

        <div className="absolute bottom-32 left-1/3 text-6xl animate-bounce z-0">
          💘
        </div>
      </>
    );
  }

  // 🌙 CALM
  if (theme === "calm") {
    return (
      <>
        <div className="absolute top-20 left-20 text-4xl text-white animate-pulse">
          ✨
        </div>

        <div className="absolute top-40 right-20 text-4xl text-white animate-pulse">
          ⭐
        </div>

        <div className="absolute bottom-40 left-1/2 text-4xl text-white animate-pulse">
          ✨
        </div>
      </>
    );
  }

  // 🌧️ SAD
  if (theme === "sad") {
    return (
      <div className="absolute inset-0 z-0 opacity-20">

        <div className="absolute top-0 left-20 text-6xl animate-bounce">
          🌧️
        </div>

        <div className="absolute top-40 right-20 text-6xl animate-pulse">
          ☔
        </div>

      </div>
    );
  }

  // ✨ DREAMY
  if (theme === "dreamy") {
    return (
      <>
        <div className="absolute top-20 left-20 text-5xl animate-pulse">
          ✨
        </div>

        <div className="absolute top-60 right-20 text-5xl animate-bounce">
          🌌
        </div>

        <div className="absolute bottom-20 left-1/2 text-5xl animate-pulse">
          💫
        </div>
      </>
    );
  }

  // 🔥 PASSION
  if (theme === "passion") {
    return (
      <>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-red-500/30 blur-[120px] rounded-full animate-pulse" />

        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-orange-500/30 blur-[120px] rounded-full animate-pulse" />

        <div className="absolute top-20 right-20 text-6xl">
          🔥
        </div>
      </>
    );
  }
};

const sendMissYou = () => {

  setMissYou(true);

  const now = new Date();

  setMissTime(
    now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  setTimeout(() => {
    setMissYou(false);
  }, 5000);
};

const calculateMeetCountdown = () => {

  if (!meetDate) return 0;

  const today = new Date();

  const future = new Date(meetDate);

  const diff = future - today;

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );
};

const saveFutureLetter = () => {

  if (
    !futureLetter ||
    !futureTitle ||
    !futureDate
  ) {
    return alert("Fill all fields ❤️");
  }

  const newLetter = {
    title: futureTitle,
    message: futureLetter,
    unlockDate: futureDate,
  };

  setSavedLetters([
    ...savedLetters,
    newLetter,
  ]);

  setFutureLetter("");
  setFutureTitle("");
  setFutureDate("");
};

const isUnlocked = (date) => {

  const today = new Date();

  const unlockDate = new Date(date);

  return today >= unlockDate;
};

const getMoodSong = () => {

  switch (theme) {

    // ❤️ ROMANTIC
    case "romantic":
      return "https://open.spotify.com/embed/track/4PTG3Z6ehGkBFwjybzWkR8";

    // 🌙 CALM
    case "calm":
      return "https://open.spotify.com/embed/track/0WqiDwKJclirSYG9v5tayI";

    // 🌧️ SAD
    case "sad":
      return "https://open.spotify.com/embed/track/6xGruZOHLs39ZbVccQTuPZ";

    // ✨ DREAMY
    case "dreamy":
      return "https://open.spotify.com/embed/track/3z8h0TU7ReDPLIbEnYhWZb";

    // 🔥 PASSION
    case "passion":
      return "https://open.spotify.com/embed/track/2plbrEY59IikOBgBGLjaoe";

    default:
      return "https://open.spotify.com/embed/track/4PTG3Z6ehGkBFwjybzWkR8";
  }
};


  return (
    
  <div
  className={`min-h-screen overflow-x-hidden text-white transition-all duration-1000 overflow-hidden relative ${getBackgroundStyle()}`}
>
  {renderThemeEffect()}
{/* BACKGROUND GLOWS */}

    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full" />

    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/20 blur-[120px] rounded-full" />
      {/* CONTAINER */}
   <div className="relative max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-10 pb-24"
>

  {/* RELATIONSHIP DATE */}

  <div className="mb-10 bg-zinc-900/70 border border-zinc-800 p-6 rounded-3xl">

    <h2 className="text-xl sm:text-2xl font-bold mb-5">
      Set Your First Day ❤️
    </h2>

    <div className="flex flex-col md:flex-row gap-4">

      <input
        type="date"
        value={anniversaryDate}
        onChange={(e) =>
          setAnniversaryDate(e.target.value)
        }
        className="w-full p-4 rounded-2xl bg-zinc-800 outline-none"
      />

      <button
        onClick={updateAnniversaryDate}
        className="bg-pink-500 px-6 py-4 rounded-2xl font-semibold"
      >
        Save Date ❤️
      </button>

    </div>
  </div>

  
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-center md:text-left">
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-center"
>

  <motion.h1
    animate={{
      scale: [1, 1.03, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
    }}
    className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-pink-400 via-red-400 to-purple-400 bg-clip-text text-transparent"
  >
    {capsule.personOne} ❤️ {capsule.personTwo}
  </motion.h1>

  <p className="mt-4 text-zinc-400 text-xl">
    Forever Starts Here ✨
  </p>

</motion.div>
<div className="absolute left-10 top-40 text-5xl animate-bounce">
  ❤️
</div>

<div className="absolute right-10 top-52 text-4xl animate-pulse">
  💖
</div>
          {/* SHARE BUTTON */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link Copied ❤️");
            }}
            className="w-full sm:w-auto bg-white text-black px-5 py-3 rounded-2xl font-semibold hover:scale-105 duration-300"
          >
            Share Space 🔗
          </button>
        </div>
{/* DAILY LOVE QUOTE */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-10 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md"
>

  <h2 className="text-lg sm:text-2xl text-pink-300 italic leading-relaxed">
    Daily Love Quote ❤️
  </h2>

  <p className="text-lg sm:text-2xl text-pink-300 italic leading-relaxed" >
    “{randomQuote}”
  </p>

</motion.div>

{/* MISS YOU BUTTON */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-10 bg-white/5 border border-pink-500/20 p-6 rounded-3xl backdrop-blur-md"
>

  <div className="flex flex-col md:flex-row items-center justify-between gap-6">

    <div>

     <h2 className="text-2xl sm:text-3xl font-bold">
        Missing Them? 🥺
      </h2>

      <p className="text-zinc-400 mt-2">
        Send a little emotional signal ❤️
      </p>

    </div>

    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={sendMissYou}
      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-red-500 px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl"
    >
      Missing You ❤️
    </motion.button>

  </div>

{/* SHARED COUNTDOWN */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-10 bg-white/5 border border-cyan-500/20 p-6 rounded-3xl backdrop-blur-md"
  >

  <h2 className="text-3xl sm:text-5xl font-bold mt-6">
    Shared Countdown ⏳
  </h2>

  <div className="flex flex-col md:flex-row gap-4 mb-6">

    <input
      type="text"
      placeholder="Event Name ❤️"
      value={meetTitle}
      onChange={(e) =>
        setMeetTitle(e.target.value)
      }
      className="w-full flex-1 p-4 rounded-2xl bg-zinc-800 outline-none"
    />

    <input
      type="date"
      value={meetDate}
      onChange={(e) =>
        setMeetDate(e.target.value)
      }
      className="p-4 rounded-2xl bg-zinc-800 outline-none"
    />

  </div>

  {/* COUNTDOWN DISPLAY */}

  {meetDate && (

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-8 text-center"
    >

      <h3 className="text-3xl font-bold text-cyan-300">
        {meetTitle}
      </h3>

      <p className="text-7xl font-bold mt-6">
        {calculateMeetCountdown()}
      </p>

      <p className="text-zinc-300 mt-4 text-xl">
        Days Remaining ❤️
      </p>

    </motion.div>
  )}

</motion.div>

{/* FUTURE LETTERS */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-10 bg-white/5 border border-purple-500/20 p-6 rounded-3xl backdrop-blur-md"
>

  <h2 className="text-3xl font-bold mb-6">
    Future Letters 💌
  </h2>

  {/* INPUTS */}

  <div className="flex flex-col gap-4">

    <input
      type="text"
      placeholder="Letter Title ❤️"
      value={futureTitle}
      onChange={(e) =>
        setFutureTitle(e.target.value)
      }
      className="w-full p-4 rounded-2xl bg-zinc-800 outline-none"
    />

    <textarea
      placeholder="Write your future letter ✨"
      value={futureLetter}
      onChange={(e) =>
        setFutureLetter(e.target.value)
      }
      className="p-4 rounded-2xl bg-zinc-800 outline-none min-h-[150px]"
    />

    <input
      type="date"
      value={futureDate}
      onChange={(e) =>
        setFutureDate(e.target.value)
      }
      className="p-4 rounded-2xl bg-zinc-800 outline-none"
    />

    <button
      onClick={saveFutureLetter}
      className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl text-lg font-semibold"
    >
      Save Future Letter 💌
    </button>

  </div>

  {/* LETTERS */}

  <div className="mt-10 grid gap-6">

    {savedLetters.map((letter, index) => (

      <motion.div
        key={index}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-black/30 border border-purple-500/20 rounded-3xl p-6"
      >

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h3 className="text-2xl font-bold text-purple-300">
              {letter.title}
            </h3>

            <p className="text-zinc-400 mt-2">
              Unlocks on {letter.unlockDate}
            </p>

          </div>

          {!isUnlocked(letter.unlockDate) ? (

            <div className="bg-zinc-800 px-5 py-3 rounded-2xl">
              🔒 Locked
            </div>

          ) : (

            <div className="bg-pink-500 px-5 py-3 rounded-2xl">
              ❤️ Opened
            </div>

          )}

        </div>

        {/* MESSAGE */}

        {isUnlocked(letter.unlockDate) && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="mt-6 bg-white/5 p-6 rounded-2xl"
          >

            <p className="text-lg leading-relaxed text-zinc-200">
              {letter.message}
            </p>

          </motion.div>
        )}

      </motion.div>
    ))}

  </div>

</motion.div>

  {/* LIVE MESSAGE */}

  {missYou && (

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="mt-8 bg-pink-500/10 border border-pink-500/20 p-6 rounded-3xl text-center relative overflow-hidden"
    >

      {/* FLOATING HEARTS */}

      <div className="absolute top-2 left-6 text-3xl animate-bounce">
        ❤️
      </div>

      <div className="absolute right-8 top-4 text-2xl animate-pulse">
        💖
      </div>

      <div className="absolute bottom-2 left-1/2 text-3xl animate-bounce">
        💘
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-pink-300">
        Someone is thinking about you ❤️
      </h3>

      <p className="text-zinc-300 mt-4 text-lg">
        Sent at {missTime}
      </p>

    </motion.div>
  )}

</motion.div>

{/* MOOD SELECTOR */}

<div className="mb-10">

  <h2 className="text-2xl font-bold mb-5">
    Choose Your Mood ✨
  </h2>

  <div className="flex flex-wrap gap-3">

    <button
      onClick={() => setTheme("romantic")}
      className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
        theme === "romantic"
          ? "bg-pink-500 text-white"
          : "bg-zinc-800"
      }`}
    >
      ❤️ Romantic
    </button>

    <button
      onClick={() => setTheme("calm")}
      className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
        theme === "calm"
          ? "bg-cyan-500 text-white"
          : "bg-zinc-800"
      }`}
    >
      🌙 Calm
    </button>

    <button
      onClick={() => setTheme("sad")}
      className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
        theme === "sad"
          ? "bg-gray-500 text-white"
          : "bg-zinc-800"
      }`}
    >
      🌧️ Sad
    </button>

    <button
      onClick={() => setTheme("dreamy")}
      className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
        theme === "dreamy"
          ? "bg-purple-500 text-white"
          : "bg-zinc-800"
      }`}
    >
      ✨ Dreamy
    </button>

    <button
      onClick={() => setTheme("passion")}
      className={`px-5 py-3 rounded-2xl transition-all duration-300 ${
        theme === "passion"
          ? "bg-red-500 text-white"
          : "bg-zinc-800"
      }`}
    >
      🔥 Passion
    </button>

  </div>
</div>

        {/* LOVE TIMER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 bg-pink-500/20 border border-pink-500/30 p-6 rounded-3xl backdrop-blur-md shadow-xl"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-snug">
            Together for {calculateLoveDays()} Days ❤️
          </h2>

          <p className="mt-2 text-zinc-300">
            Since {capsule.anniversaryDate}
          </p>
        </motion.div>

{/* RELATIONSHIP WRAPPED */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-14 bg-gradient-to-br from-pink-600/20 via-purple-600/20 to-red-600/20 border border-pink-500/20 p-8 rounded-[40px] shadow-2xl backdrop-blur-md"
>

  <div className="flex items-center justify-between flex-wrap gap-4 mb-10">

    <div>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold">
        ❤️ 2026 Wrapped ❤️
      </h2>

      <p className="text-zinc-300 mt-3 text-lg">
        Your relationship in numbers ✨
      </p>
    </div>

    
  </div>

  {/* STATS GRID */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* CARD */}
    <div className="bg-black/30 p-6 rounded-3xl">
      <h3 className="text-zinc-400 text-lg">
        Days Together ❤️
      </h3>

      <p className="text-3xl sm:text-5xl font-bold mt-3 text-pink-400">
        {calculateLoveDays()}
      </p>
    </div>

    {/* CARD */}
    <div className="bg-black/30 p-6 rounded-3xl">
      <h3 className="text-zinc-400 text-lg">
        Memories Added 📸
      </h3>

      <p className="text-3xl sm:text-5xl font-bold mt-3 text-purple-400">
        {capsule.memories.length}
      </p>
    </div>

    {/* CARD */}
    <div className="bg-black/30 p-6 rounded-3xl">
      <h3 className="text-zinc-400 text-lg">
        Favorite Song 🎵
      </h3>

      <p className="text-3xl sm:text-5xl font-bold mt-3 text-red-400">
        Perfect
      </p>
    </div>

    {/* CARD */}
    <div className="bg-black/30 p-6 rounded-3xl">
      <h3 className="text-zinc-400 text-lg">
        Most Emotional Day 🥺
      </h3>

      <p className="text-3xl sm:text-5xl  font-bold mt-3 text-pink-300">
  {calculateEmotionalDay()}
</p>
    </div>

    {/* CARD */}
    <div className="bg-black/30 p-6 rounded-3xl">
      <h3 className="text-zinc-400 text-lg">
        Late Night Talks 🌙
      </h3>

      <p className="text-3xl sm:text-5xl font-bold mt-3 text-orange-400">
  {calculateLateNightTalks()}
</p>
    </div>

    {/* CARD */}
    <div className="bg-black/30 p-6 rounded-3xl">
      <h3 className="text-zinc-400 text-lg">
        Love Level 💖
      </h3>

      <p className="text-3xl sm:text-5xl font-bold mt-3 text-red-500">
  {calculateLoveLevel()}
</p>
    </div>

  </div>
</motion.div>
        {/* INPUT SECTION */}
        <div className="bg-zinc-900/70 p-6 rounded-3xl mb-10 border border-zinc-700">

          <h2 className="text-2xl font-semibold mb-6">
            Add New Memory ✨
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Memory title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full flex-1 p-4 rounded-2xl bg-zinc-800 outline-none"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full flex-1 p-4 rounded-2xl bg-zinc-800 outline-none"
            />

            <button
              onClick={addMemory}
              className="w-full sm:w-auto bg-pink-500 px-8 py-4 rounded-2xl font-semibold hover:bg-pink-600 duration-300"
            >
              Add ❤️
            </button>
          </div>
        </div>
<div className="mb-10">

  <h2 className="text-2xl font-bold mb-4">
    Our Song 🎵
  </h2>

  {/* MOOD MUSIC */}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mb-10 bg-white/5 border border-green-500/20 p-6 rounded-3xl backdrop-blur-md"
>

  <div className="flex items-center justify-between flex-wrap gap-4 mb-6">

    <div>

      <h2 className="text-3xl font-bold">
        Mood Music 🎵
      </h2>

      <p className="text-zinc-400 mt-2">
        Music changes with your relationship vibe ✨
      </p>

    </div>

    <div className="bg-green-500/20 px-5 py-3 rounded-2xl text-green-300">
      Current Mood: {theme}
    </div>

  </div>

  <iframe
    style={{
      borderRadius: "20px",
    }}
    src={getMoodSong()}
    width="100%"
    height="180"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>

</motion.div>
</div>

{/* OPEN WHEN SECTION */}

<div className="mb-14">

  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
    Open When... 🔒❤️
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* CARD 1 */}
    <details className="group bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 cursor-pointer overflow-hidden">

  <summary className="list-none flex items-center justify-between">

    <div>
      <h3 className="text-xl sm:text-2xl font-semibold">
        Open when sad 😭
      </h3>

      <p className="text-zinc-400 mt-2">
        A safe little space for hard days ❤️
      </p>
    </div>

    <span className="text-3xl group-open:rotate-45 duration-300">
      +
    </span>
  </summary>

  <div className="mt-6 border-t border-zinc-700 pt-6">

    {/* IMAGE */}
    <img
      src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"
      alt=""
      className="rounded-3xl w-full mb-6"
    />

    {/* MAIN MESSAGE */}
    <p className="text-zinc-200 text-lg leading-relaxed">
      I know today feels heavy.
      Maybe nothing is going right,
      maybe your thoughts are loud,
      maybe your heart feels tired.
      But please remember this:
      you are deeply loved,
      appreciated,
      and important ❤️
    </p>

    {/* QUOTE */}
    <div className="mt-6 bg-black/30 p-5 rounded-2xl">

      <p className="italic text-pink-300 text-lg">
        “Bad days do not define your life.”
      </p>
    </div>

    {/* REMINDERS */}
    <div className="mt-6">

      <h4 className="text-xl font-semibold mb-4">
        Gentle reminders 🌙
      </h4>

      <ul className="space-y-3 text-zinc-300">

        <li>• Drink some water 💧</li>

        <li>• Take a deep breath 🌸</li>

        <li>• Rest without guilt 💤</li>

        <li>• You don’t have to solve everything today ❤️</li>

      </ul>
    </div>

    {/* FINAL NOTE */}
    <div className="mt-8 bg-pink-500/10 border border-pink-500/20 p-5 rounded-2xl">

      <p className="text-pink-200 leading-relaxed">
        No matter how difficult today feels,
        I’m always here for you.
        One bad day will never change how loved you are ❤️
      </p>
    </div>

  </div>
</details>

    {/* CARD 2 */}
    <details className="group bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 cursor-pointer overflow-hidden">

  <summary className="list-none flex items-center justify-between">

    <div>
      <h3 className="text-xl sm:text-2xl font-semibold">
        Open when angry 😤
      </h3>

      <p className="text-zinc-400 mt-2">
        Before you overthink or react ❤️
      </p>
    </div>

    <span className="text-3xl group-open:rotate-45 duration-300">
      +
    </span>
  </summary>

  <div className="mt-6 border-t border-zinc-700 pt-6">

    <img
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      alt=""
      className="rounded-3xl w-full mb-6"
    />

    <p className="text-zinc-200 text-lg leading-relaxed">
      It’s okay to feel angry.
      Your emotions are valid ❤️
      But please don’t let one moment
      make you forget how loved you are.
      Not every misunderstanding needs a goodbye.
    </p>

    <div className="mt-6 bg-black/30 p-5 rounded-2xl">
      <p className="italic text-orange-300 text-lg">
        “Breathe first. React later.”
      </p>
    </div>

    <div className="mt-6">

      <h4 className="text-xl font-semibold mb-4">
        Calm down reminders 🌙
      </h4>

      <ul className="space-y-3 text-zinc-300">

        <li>• Drink cold water 💧</li>

        <li>• Take 5 deep breaths 🌸</li>

        <li>• Don’t text while emotional 📵</li>

        <li>• We are a team, not enemies ❤️</li>

      </ul>
    </div>

    <div className="mt-8 bg-orange-500/10 border border-orange-500/20 p-5 rounded-2xl">

      <p className="text-orange-200 leading-relaxed">
        Even on difficult days,
        I still choose you.
        Always ❤️
      </p>
    </div>

  </div>
</details>

    {/* CARD 3 */}
    <details className="group bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 cursor-pointer overflow-hidden">

  <summary className="list-none flex items-center justify-between">

    <div>
      <h3 className="text-xl sm:text-2xl font-semibold">
        Open when lonely 🌙
      </h3>

      <p className="text-zinc-400 mt-2">
        For nights that feel too quiet ❤️
      </p>
    </div>

    <span className="text-3xl group-open:rotate-45 duration-300">
      +
    </span>
  </summary>

  <div className="mt-6 border-t border-zinc-700 pt-6">

    <img
      src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e"
      alt=""
      className="rounded-3xl w-full mb-6"
    />

    <p className="text-zinc-200 text-lg leading-relaxed">
      I know loneliness can feel overwhelming sometimes.
      But distance will never reduce
      how important you are to me ❤️
      No matter where we are,
      my heart still finds you.
    </p>

    <div className="mt-6 bg-black/30 p-5 rounded-2xl">

      <p className="italic text-purple-300 text-lg">
        “Some souls stay connected no matter the distance.”
      </p>
    </div>

    <div className="mt-6">

      <h4 className="text-xl font-semibold mb-4">
        Little reminders ✨
      </h4>

      <ul className="space-y-3 text-zinc-300">

        <li>• You are never truly alone ❤️</li>

        <li>• Our memories still exist 🌸</li>

        <li>• Missing someone means they matter 🥺</li>

        <li>• Better days are coming 🌙</li>

      </ul>
    </div>

    <div className="mt-8 bg-purple-500/10 border border-purple-500/20 p-5 rounded-2xl">

      <p className="text-purple-200 leading-relaxed">
        Even if the whole world feels quiet,
        my love for you never will ❤️
      </p>
    </div>

  </div>
</details>

    {/* CARD 4 */}
   <details className="group bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 cursor-pointer overflow-hidden">

  <summary className="list-none flex items-center justify-between">

    <div>
      <h3 className="text-xl sm:text-2xl font-semibold">
        Open when overthinking 🥺
      </h3>

      <p className="text-zinc-400 mt-2">
        Read this slowly ❤️
      </p>
    </div>

    <span className="text-3xl group-open:rotate-45 duration-300">
      +
    </span>
  </summary>

  <div className="mt-6 border-t border-zinc-700 pt-6">

    <img
      src="https://images.unsplash.com/photo-1511988617509-a57c8a288659"
      alt=""
      className="rounded-3xl w-full mb-6"
    />

    <p className="text-zinc-200 text-lg leading-relaxed">
      Your mind is creating problems
      bigger than reality right now ❤️
      Please pause for a moment.
      Not every silence means distance.
      Not every delay means loss.
      You are loved more than your thoughts allow you to believe.
    </p>

    <div className="mt-6 bg-black/30 p-5 rounded-2xl">

      <p className="italic text-pink-300 text-lg">
        “Don’t let your thoughts become storms.”
      </p>
    </div>

    <div className="mt-6">

      <h4 className="text-xl font-semibold mb-4">
        Ground yourself 🌸
      </h4>

      <ul className="space-y-3 text-zinc-300">

        <li>• Take slow deep breaths 🌬️</li>

        <li>• Focus on what is real ❤️</li>

        <li>• You are enough exactly as you are ✨</li>

        <li>• One moment does not define everything 🌙</li>

      </ul>
    </div>

    <div className="mt-8 bg-pink-500/10 border border-pink-500/20 p-5 rounded-2xl">

      <p className="text-pink-200 leading-relaxed">
        I’m not going anywhere.
        You don’t need to fight your thoughts alone ❤️
      </p>
    </div>

  </div>
</details>

  </div>
</div> 
        {/* EMPTY STATE */}
        {capsule.memories.length === 0 && (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold mb-4">
              No Memories Yet ❤️
            </h2>

            <p className="text-zinc-400">
              Start adding your beautiful memories together.
            </p>
          </div>
        )}

        {/* MEMORY GRID */}
        {/* MEMORY GRID */}

<Masonry
  breakpointCols={{
    default: 3,
    1100: 2,
    700: 1,
  }}
  className="flex gap-6"
  columnClassName="space-y-6"
>

  {capsule.memories.map((memory, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800"
    >

      {/* IMAGE */}
      <div className="overflow-hidden">
        <img
          src={memory.image}
          alt=""
          className="w-full h-auto max-h-[500px] object-cover hover:scale-110 duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h2 className="text-2xl font-semibold">
          {memory.title}
        </h2>

        <p className="text-zinc-400 mt-2">
          Beautiful memory together ❤️
        </p>

      </div>
    </motion.div>
  ))}
</Masonry>

      </div>
    </div>
  );
}

export default Space;