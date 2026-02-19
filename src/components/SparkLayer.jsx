import React from "react";

const SparkLayer = ({ sparks }) => {
  return (
    <div className="spark-layer">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="spark-dot"
          style={{ left: spark.x, top: spark.y }}
        />
      ))}
    </div>
  );
};

export default SparkLayer;
