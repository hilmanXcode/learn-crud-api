import { Table, TextInput, Button } from 'flowbite-react';

const ContactList = ({contacts, handleDelete, isEditing, setIsEditing, targetId, setTargetId}) => {


  const handleEditing = (id) => {
    setIsEditing(true);
    setTargetId(id);
  }
  

  return isEditing ? (
  <>
    
    <h1>Masuk Mode Edit COy</h1>
    <h1>ID TARGET: {targetId}</h1>
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
                  {/* <form onSubmit={(e) => e.preventDefault()} id={data.id}> */}

                  <button id={data.id} onClick={() => handleDelete(data.id)} className="font-medium text-white hover:underline dark:text-cyan-500 bg-red-600 text-center rounded-md px-3 py-2">
                    Delete
                  </button>
                  {/* </form> */}
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