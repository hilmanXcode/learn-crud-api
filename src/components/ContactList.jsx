import { Table, TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import { updateContact } from '../api';

const ContactList = ({contacts, handleDelete, isEditing, setIsEditing, targetId, setTargetId, setContactsList}) => {

  const editData = contacts.filter((contact) => contact.id === targetId);
  const [name, setName] = useState(editData.map((data) => data.name).toString());
  const [lastName, setLastName] = useState(editData.map((data) => data.last_name).toString());
  const [phone, setPhone] = useState(editData.map((data) => data.phone).toString());
  const [email, setEmail] = useState(editData.map((data) => data.email).toString());
  const [address, setAddress] = useState(editData.map((data) => data.address).toString());


  const handleEditing = (id) => {
    setIsEditing(true);
    setTargetId(id);
  }


  const updateThisContact = async(e) => {
    e.preventDefault();

    updateContact(targetId, name, lastName, phone, email, address).then(() => {
      const targetIndex = contacts.findIndex(
        (contact) => contact.id === targetId
      )
  
      if(targetIndex !== -1){
        contacts[targetIndex] = {
          id: targetId,
          name: name,
          last_name: lastName,
          phone: phone,
          email: email,
          address: address
        }
        setContactsList(contacts);
        setIsEditing(false);
      }
      else {
        console.log(`Gagal Mengupdate Data ID : ${targetId}`);
      }
    })

  }


  return isEditing ? (
  <>
      <h1 className='text-xl font-bold text-center my-5'>Edit Contact</h1>
      <form onSubmit={updateThisContact}>
      <div className='grid grid-cols-2 gap-2'>
        <TextInput type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} name='name'/>
        <TextInput type='text' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} name='lastName'/>
        <TextInput type='text' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} name='phone'/>
        <TextInput type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
      </div>
        <TextInput className='mt-2' type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} name='address'/>
        <Button onSubmit={updateThisContact} type='submit' className='mt-2 w-full'>Submit</Button>
      </form>
      <Button onClick={() => setIsEditing(false)} className='mt-2 w-full '>Back</Button>
  </>

  ) : (
    <>
      <h1 className='text-xl font-bold text-center my-5'>Data</h1>
     <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {contacts.map((data, i) => {
            return (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {data.name} {data.last_name}
                </Table.Cell>
                <Table.Cell>{data.phone}</Table.Cell>
                <Table.Cell>{data.email}</Table.Cell>
                <Table.Cell>{data.address}</Table.Cell>
                <Table.Cell className='grid grid-cols-2 gap-2'>
                  <button onClick={() => handleEditing(data.id)} className="font-medium text-white hover:underline dark:text-cyan-500 bg-teal-400 text-center rounded-md px-3 py-2">
                    Edit 
                  </button> 
                  <button id={data.id} onClick={() => handleDelete(data.id)} className="font-medium text-white hover:underline dark:text-cyan-500 bg-red-600 text-center rounded-md px-3 py-2">
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
              )
          })}

        </Table.Body>
      </Table>
    </>
  )
}

export default ContactList;