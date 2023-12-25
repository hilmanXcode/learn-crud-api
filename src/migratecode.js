const [contacts, setContactsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [targetId, setTargetId] = useState('');

  useEffect(() => {
    getContactsList().then((result) => {
      if(result !== ""){
        setContactsList(result);
      }
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }


// Func Update Contact

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