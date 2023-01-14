export const kod_bezpieczenstwa = () => {
  let kod = "";
  for (let i = 0; i < 6; i++) {
    kod += Math.floor(Math.random() * 10);
  }
  return kod;
};
