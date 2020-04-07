const capitalize = (s) => {
if (typeof s !== "string") throw new Error("This is not a string");
return s.charAt(0).toUpperCase() + s.slice(1)
};

export default capitalize;
