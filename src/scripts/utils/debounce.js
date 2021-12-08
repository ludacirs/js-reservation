const debounce = (cb, ms) => {
  let id;
  return () => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(cb, ms);
  };
};

export default debounce;
