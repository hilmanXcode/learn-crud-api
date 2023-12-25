import FormContact from "../components/FormContact";
import { Link } from "react-router-dom";


const AddContact = () => {

    return (
        <div className="p-20">
            <FormContact/>
            <Link to={"/"}>
                <button className="px-5 bg-green-400 rounded-md py-2 text-white mt-2 w-full">
                    Back to home
                </button>
            </Link>
        </div>
    )
}

export default AddContact;