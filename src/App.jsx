import { Table, Button, TextInput } from 'flowbite-react';
import { getContactsList, addNewContact } from './api';
import { useEffect, useState } from 'react';

function App() {
  const [contacts, setContactsList] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getContactsList().then((result) => {
      setContactsList(result);
    });
  }, [])

  const ContactList = () => {
    return contacts.map((data, i) => {
      return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {data.name} {data.last_name}
            </Table.Cell>
            <Table.Cell>{data.phone}</Table.Cell>
            <Table.Cell>{data.email}</Table.Cell>
            <Table.Cell>{data.address}</Table.Cell>
            <Table.Cell className='grid grid-cols-2 gap-2'>
              <button href="#" className="font-medium text-white hover:underline dark:text-cyan-500 bg-teal-400 text-center rounded-md px-3 py-2">
                Edit 
              </button> 
              <button href="#" className="font-medium text-white hover:underline dark:text-cyan-500 bg-red-600 text-center rounded-md px-3 py-2">
                Delete
              </button>
            </Table.Cell>
          </Table.Row>
      )
    })
  }

  const saveContact = async(e) => {
    e.preventDefault();
    const newData = {
      name: name,
      last_name: lastName,
      phone: phone,
      email: email,
      address: address
    }
    const data = [...contacts, newData];
    addNewContact(name, lastName, phone, email, address).then(() => {
      setContactsList(data);
      setName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setAddress("");
    })
  
  }


  return (
    <div className='flex justify-center'>
      <div className='p-10'>
        <h1 className='text-xl font-bold text-center my-5'>Learn CRUD With Api</h1>
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
          <ContactList/>

        </Table.Body>
      </Table>
      </div>
    </div>
  );
}

export default App;
