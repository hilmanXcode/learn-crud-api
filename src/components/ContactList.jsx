import { Table } from 'flowbite-react';

const ContactList = ({contacts, handleEdit, handleDelete}) => {

  return (
    <div>
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
                  <button onClick={() => handleEdit(data.id)} className="font-medium text-white hover:underline dark:text-cyan-500 bg-teal-400 text-center rounded-md px-3 py-2">
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
    </div>
  )
}

export default ContactList;