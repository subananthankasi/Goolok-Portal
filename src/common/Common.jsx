import dayjs from "dayjs";

const Common = () => {
  const classification = [
    {
      id: 1,
      value: "Residential Land",
      label: "Residential Land",
    },
    {
      id: 2,
      value: "Agricultural Land",
      label: "Agricultural Land",
    },
    {
      id: 3,
      value: "Forest Land",
      label: "Forest Land",
    },
    {
      id: 4,
      value: "Water Bodies",
      label: "Water Bodies",
    },
    {
      id: 5,
      value: "Commercial Land",
      label: "Commercial Land",
    },
  ];

  const cleanText = (value = "") => {
    return value.replace(/\s+/g, " ").trim();
  };
  const cleanObjectValues = (obj) => {
    const cleaned = {};
    for (const key in obj) {
      cleaned[key] = String(obj[key] || "").replace(/\s+/g, " ").trim();
    }
    return cleaned;
  };

  const allowOnlyLetters = (value = "") => {
    value = value.replace(/[^A-Za-z ]/g, "");
    value = value.replace(/^\s+/g, "");
    return value;
  };


  const disableBeforeDate = (date) => (current) => {
    if (!date) return false;
    const start = dayjs(date, "YYYY-MM-DD");
    return current && current <= start;
  };
  return {
    classification,
    cleanText,
    disableBeforeDate,
    allowOnlyLetters,
    cleanObjectValues
  };
};
export default Common;
