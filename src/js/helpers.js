// Give Me a random int between floor and ceiling
export const randomNum = (ceiling = 1, floor = 0) => {
  return Math.floor(Math.random() * (ceiling - floor)) + floor;
};


