import { useState } from 'react';
import { addNewContact } from '../api';
import { uid } from 'uid';
import { Button, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const FormContact = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const saveContact = async(e) => {
    e.preventDefault();
    const newData = {
      id: uid(),
      name: name,
      last_name: lastName,
      phone: phone,
      email: email,
      address: address
    }
    addNewContact(newData.id, name, lastName, phone, email, address).then(() => {
      setName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setAddress("");
    }).then(() => {
      navigate("/");
    })
  
  }


  return (
    <>
      <h1 className='text-xl font-bold text-center my-5'>Add New Contact</h1>
        <form onSubmit={saveContact}>
        <div className='grid grid-cols-2 gap-2'>
          <TextInput type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} name='name'/>
          <TextInput type='text' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} name='lastName'/>
          <TextInput type='text' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} name='phone'/>
          <TextInput type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
        </div>
          <TextInput className='mt-2' type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} name='address'/>
          <Button onSubmit={saveContact} type='submit' className='mt-2 w-full'>Submit</Button>
        </form>
        
    </>
  )
}

export default FormContact;