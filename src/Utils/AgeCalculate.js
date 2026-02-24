export const AgeCalculate = (date) => {
  const oldDate = new Date(date);
  const currentDate = new Date();

  let Difference_In_Time = currentDate.getTime() - oldDate.getTime();

  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  return `${Difference_In_Days} day${Difference_In_Days !== 1 ? 's' : ''}`;
};



