import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_API;

export const getContactsList = async () => {
  const data = await axios.get(`${baseURL}/listContact`);
  return data.data;
};

export const addNewContact = async (
  id,
  name,
  lastName,
  phone,
  email,
  address
) => {
  try {
    await axios.post(
      `${baseURL}/createContact`,
      {
        id,
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

export const deleteContact = async (id) => {
  try {
    await axios.delete(
      `${baseURL}/deleteContact`,
      {
        data: { id: id },
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
