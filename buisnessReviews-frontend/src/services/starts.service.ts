export const handleMouseEnter = (
  index: number,
  setHoveredStars: React.Dispatch<React.SetStateAction<number>>
) => {
  setHoveredStars(index + 1);
};

export const handleMouseLeave = (
  setHoveredStars: React.Dispatch<React.SetStateAction<number>>
) => {
  setHoveredStars(0);
};

export const handleClick = (
  index: number,
  setSelectedStars: React.Dispatch<React.SetStateAction<number>>
) => {
  setSelectedStars(index + 1);
};

export const handleClickEditStars = (
  index: number,
  setEditSelectedStars: React.Dispatch<React.SetStateAction<number>>
) => {
  setEditSelectedStars(index + 1);
};
