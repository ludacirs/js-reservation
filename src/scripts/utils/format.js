export const formatTime = (date) => {
  const [_, HHmmSS] = date.split(" ");
  const [HH, mm, SS] = HHmmSS.split(":");
  return `${HH}시간 ${mm}분`;
};
