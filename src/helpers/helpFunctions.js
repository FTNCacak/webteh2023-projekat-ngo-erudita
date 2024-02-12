export const nameToPathFormat = (name) => {
  return name
    .replaceAll(" ", "-")
    .toLowerCase()
    .replaceAll("š", "s")
    .replaceAll("č", "c")
    .replaceAll("ć", "c")
    .replaceAll("ž", "z")
    .replaceAll("đ", "dj")
    .replaceAll("ð", "dj")
    .replaceAll("„", "")
    .replaceAll(`"`, "")
    .replaceAll("“", "");
};
