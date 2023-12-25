import { useEffect, useState } from "react";
import { getContactsList, deleteContact } from "../api";
import { Link, useNavigate } from "react-router-dom";
import ContactList from "../components/ContactList";
import Swal from "sweetalert2";

const Home = () => {

    const [contacts, setContactsList] = useState([]);
    const navigate = useNavigate();

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

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    return (
        <div className="p-20">
            <h1 className="text-2xl font-bold text-center py-5">Contact List</h1>
            <Link to={"/addcontact"}>
                <button className="px-5 bg-green-400 rounded-md py-2 text-white mb-3 w-full">
                    Add New Contact
                </button>
            </Link>
            <ContactList contacts={contacts} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
    );
}

export default Home;