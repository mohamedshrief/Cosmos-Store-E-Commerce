import React from "react";

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating); // عدد النجوم الكاملة
  const partialStar = rating - fullStars; // النسبة المئوية للنجمة الجزئية

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} style={{ color: "gold", fontSize: "24px" }}>
          ★
        </span>
      ))}
      {partialStar > 0 && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <span style={{ color: "gray", fontSize: "24px" }}>★</span>
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${partialStar * 100}%`,
              overflow: "hidden",
              color: "gold",
              fontSize: "24px",
            }}
          >
            ★
          </span>
        </div>
      )}
      {[...Array(maxStars - fullStars - (partialStar > 0 ? 1 : 0))].map(
        (_, i) => (
          <span key={i + fullStars} style={{ color: "gray", fontSize: "24px" }}>
            ★
          </span>
        )
      )}
    </div>
  );
};

export default StarRating;
