export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (title) => {
  if (!title || typeof title !== "string") return "";

  const words = title.trim().split(" ").filter(word => word.length > 0);
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i][0]) {
      initials += words[i][0].toUpperCase();
    }
  }

  return initials;
};

 