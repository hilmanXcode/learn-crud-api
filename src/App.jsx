import { getContactsList, deleteContact } from './api';
import { useEffect, useState } from 'react';
import ContactList from './components/ContactList';
import InputContact from './components/InputContact';
import Swal from "sweetalert2";

function App() {
  const [contacts, setContactsList] = useState([]);

  useEffect(() => {
    getContactsList().then((result) => {
      setContactsList(result);
    });
  }, [])

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
        <InputContact contacts={contacts} setContactsList={setContactsList}/>
        <ContactList contacts={contacts} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default App;
