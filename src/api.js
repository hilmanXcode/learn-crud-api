import axios from "axios";
import qs from "qs";

const baseURL = process.env.REACT_APP_BASE_API;

export const getContactsList = async () => {
  const data = await axios.get(`${baseURL}/siswa`);
  return data.data;
};

export const addNewContact = async (id, name, last_name, phone, email, address) => {
  try {
    await axios.post(
      `${baseURL}/siswa`,
      {
        id,
        name,
        last_name,
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
    const url = `${baseURL}/siswa`;
    const data = { id: id };
    const options = {
      method: "DELETE",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };
    await axios(options);
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = async (id, name, last_name, phone, email, address) => {
  try {
    const url = `${baseURL}/siswa`;
    const data = { 
      id: id,
      name: name,
      last_name: last_name,
      phone: phone,
      email: email,
      address: address
    };
    const options = {
      method: "PUT",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url,
    };
    await axios(options);
  } catch (error) {
    console.log(error);
  }
}
