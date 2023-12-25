import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContactById, updateContact } from "../api";
import { Button, TextInput } from 'flowbite-react';

const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [found, setFound] = useState(false);

    const saveContact = async(e) => {
    e.preventDefault();

        updateContact(id, name, lastName, phone, email, address).then(() => {
            navigate("/");
        });

    }

    useEffect(() => {
        getContactById(id).then((result) => {
            if(result !== ""){
                setName(result[0].name);
                setLastName(result[0].last_name);
                setPhone(result[0].phone);
                setEmail(result[0].email);
                setAddress(result[0].address)
                setFound(true);
            }
        })
    }, [id]);

    return (
        <>
            {found ? '' : 'Lagi Fetching Coy'}

            <h1 className="text-2xl font-bold text-center py-5 pt-20">Edit Contact</h1>
            <div className="px-10">

                <form onSubmit={saveContact}>
                    <div className='grid grid-cols-2 gap-2'>
                        <TextInput type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} name='name'/>
                        <TextInput type='text' placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} name='lastName'/>
                        <TextInput type='text' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} name='phone'/>
                        <TextInput type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name='email'/>
                    </div>
                        <TextInput className='mt-2' type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} name='address'/>
                        <Button onSubmit={saveContact} type='submit' className='mt-2 w-full'>Submit</Button>
                        <Link to={"/"}>
                            <button className="px-5 bg-green-400 rounded-md py-2 text-white mt-2 w-full">
                                Back to home
                            </button>
                        </Link>
                </form>
            </div>
        </>
    );
}

export default EditContact;