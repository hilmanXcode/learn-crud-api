const EditTodo = ({data, id}) => {
    let editData = data.find((todolist) => todolist.id === id);
    return(
        <div>
            <input type="text" value={editData.data}/>
        </div>
    )
}

export default EditTodo;