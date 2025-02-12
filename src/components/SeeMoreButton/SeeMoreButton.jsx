import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categoryContext } from "../../CategoryContext/CategoryContext";

const SeeMoreButton = ({ id, newPath = "" }) => {
  const { handleChosenCategoryId } = useContext(categoryContext);
  //   console.log(id);
  console.log("route", newPath);
  return (
    <Link to={`${newPath}`}>
      <motion.button
        style={{
          padding: "10px 10px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#523092",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          position: "absolute",
          overflow: "hidden",
          left: "50%", // توسيط أفقي
          bottom: "50px",
          zIndex: "40",
          width: "150px",
        }}
        animate={{
          x: "-50%", // توسيط أفقي باستخدام translateX
          y: [0, -5, 0], // حركة لأعلى ولأسفل
        }}
        transition={{
          y: {
            duration: 1.5, // مدة الحركة الرأسية
            repeat: Infinity, // تكرار الحركة باستمرار
            ease: "easeInOut", // سلاسة الحركة
          },
          x: {
            duration: 0, // لا نريد حركة أفقية
          },
        }}
        onClick={() => {
          console.log("id", id);
          handleChosenCategoryId(id);
        }}
      >
        See More
        <motion.span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }}
          whileHover={{ opacity: 1 }}
        ></motion.span>
      </motion.button>
    </Link>
  );
};

export default SeeMoreButton;
