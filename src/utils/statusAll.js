export const statusAll = (leads) => {
  let res = true;

  leads.forEach((element) => {
    res = res && element.send_completed;
  });
  return res;
};
