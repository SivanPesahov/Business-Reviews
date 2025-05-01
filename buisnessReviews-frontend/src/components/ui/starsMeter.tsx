import { Star } from "lucide-react";

interface StarsMeterProps {
  hoveredStars: number;
  selectedStars: number;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: (index: number) => void;
}

function StarsMeter({
  hoveredStars,
  selectedStars,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
}: StarsMeterProps) {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={20}
          color="grey"
          fill={
            index < (hoveredStars > 0 ? hoveredStars : selectedStars)
              ? "yellow"
              : "white"
          }
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
}

interface StarsPresentetaionMeter {
  averageStars: number;
}
function StarsPresentetaionMeter({ averageStars }: StarsPresentetaionMeter) {
  return (
    <div className="flex items-center space-x-1 justify-center mt-3">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={20}
          color="grey"
          fill={index < averageStars ? "yellow" : "white"}
        />
      ))}
    </div>
  );
}

export { StarsMeter, StarsPresentetaionMeter };
