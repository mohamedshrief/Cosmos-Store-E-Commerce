import React from "react";
import { motion } from "framer-motion";
import "./NotFound404.css";

export default function NotFound404() {
  return (
    <div
      id="not-found"
      className="h-[90vh] flex justify-center items-center py-10"
    >
      {" "}
      <div className="text-center flex justify-center items-center text-white font-bold text-4xl py-8 col-span-2 md:col-span-3 lg:col-span-5">
        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
            filter: "blur(10px)",
            rotate: -30, // دوران مبدئي
          }}
          animate={{
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            rotate: 0, // دوران طبيعي بعد الدخول
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          style={{
            // boxShadow: "0px 0px 41px 9px rgba(0, 150, 255, 0.8)", // تأثير توهج
            padding: "20px",
            width: "fit-content",
            borderRadius: "30px",
          }}
        >
          <div className="text-6xl md:text-9xl">
            <p className="text-6xl text-emerald-400">
              <i className="fa-solid fa-face-frown text-red-500"></i> Oops...{" "}
              <i className="fa-solid fa-face-frown text-red-500"></i>
            </p>
            <p className="text-slate-300 my-6">404</p>
            <p className="text-6xl text-emerald-400">Page not found</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
