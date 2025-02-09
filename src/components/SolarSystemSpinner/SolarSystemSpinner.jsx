import { useEffect, useState } from "react";
import "./SolarSystemSpinner.css";

const SolarSystemSpinner = () => {
  const [startPositions, setStartPositions] = useState([]);

  useEffect(() => {
    // تعيين مواقع عشوائية للكواكب عند أول render
    const positions = Array.from({ length: 7 }, () => Math.random() * 360);
    setStartPositions(positions);
  }, []);

  return (
    <div className=" flex justify-center w-screen p-0 -mt-16">
      <div className="solar-system-spinner ">
        {/* الشمس */}
        <div className="sun"></div>

        {/* المدارات والكواكب */}
        <div
          className="orbit orbit-1"
          style={{
            transform: `rotate(${startPositions[0]}deg)`,
          }}
        >
          <div className="planet planet-mercury"></div>
        </div>
        <div
          className="orbit orbit-2"
          style={{
            transform: `rotate(${startPositions[1]}deg)`,
          }}
        >
          <div className="planet planet-venus"></div>
        </div>
        <div
          className="orbit orbit-3"
          style={{
            transform: `rotate(${startPositions[2]}deg)`,
          }}
        >
          <div className="planet planet-earth">
            <div className="earth-continents"></div>
          </div>
        </div>
        <div
          className="orbit orbit-4"
          style={{
            transform: `rotate(${startPositions[3]}deg)`,
          }}
        >
          <div className="planet planet-mars"></div>
        </div>
        <div
          className="orbit orbit-5"
          style={{
            transform: `rotate(${startPositions[4]}deg)`,
          }}
        >
          <div className="planet planet-jupiter"></div>
        </div>
        <div
          className="orbit orbit-6"
          style={{
            transform: `rotate(${startPositions[5]}deg)`,
          }}
        >
          <div className="planet planet-saturn">
            <div className="saturn-rings"></div>
          </div>
        </div>
        <div
          className="orbit orbit-7"
          style={{
            transform: `rotate(${startPositions[6]}deg)`,
          }}
        >
          <div className="planet planet-uranus"></div>
        </div>
      </div>
    </div>
  );
};

export default SolarSystemSpinner;
