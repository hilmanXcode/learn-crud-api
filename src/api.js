import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API;

export const getContactsList = async () => {
  const data = await axios.get(`${baseURL}/listContact`);
  return data.data;
};

export const addNewContact = async (name, lastName, phone, email, address) => {
  try {
    await axios.post(
      `${baseURL}/createContact`,
      {
        name,
        lastName,
        phone,
        email,
        address,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
