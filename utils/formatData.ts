const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-GB");
};

export default formatDate;
