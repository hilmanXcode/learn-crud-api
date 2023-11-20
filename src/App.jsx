import { Table, Button, TextInput } from 'flowbite-react';
import { getContactsList, addNewContact, deleteContact } from './api';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { uid } from 'uid';

function App() {
  const [contacts, setContactsList] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const [deleteId, setDeleteId] = useState();

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
              {/* <form onSubmit={(e) => e.preventDefault()} id={data.id}> */}

              <button id={data.id} onClick={() => handleDelete(data.id)} className="font-medium text-white hover:underline dark:text-cyan-500 bg-red-600 text-center rounded-md px-3 py-2">
                Delete
              </button>
              {/* </form> */}
            </Table.Cell>
          </Table.Row>
      )
    })
  }

  const saveContact = async(e) => {
    e.preventDefault();
    // const datax = [...contacts];
    const newData = {
      id: uid(),
      name: name,
      last_name: lastName,
      phone: phone,
      email: email,
      address: address
    }
    const data = [...contacts, newData];
    // console.log(newData.id);
    addNewContact(newData.id, name, lastName, phone, email, address).then(() => {
      setContactsList(data);
      setName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setAddress("");
    })

    // console.log(contacts);
  
  }

  // const contactDelete = (e) => {
  //   e.preventDefault();

  // }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const data = [...contacts];
        const updatedData = data.filter((contact) => contact.id !== id);
        deleteContact(id);
        setContactsList(updatedData);
        // console.log(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
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
