import React, { useState, useEffect } from "react";

export const List = () => {

    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [hidden, setHidden] = useState({});

    const url = 'https://playground.4geeks.com/todo/users/vbarbosa';
    const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
    }

	const createUser = async (user = "vbarbosa") => {
		
		try {
			const resp = await fetch('https://playground.4geeks.com/todo/users/'+ user, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await resp.json()
			console.log(data);
			
			return data
		} catch (error) {
			console.log(error);
		}
	}

	const getUser = async (slug = "vbarbosa") => {

		try {
			const resp = await fetch('https://playground.4geeks.com/todo/users/' + slug, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await resp.json()
            console.log(data.todos);
            setList(data.todos)
			return data

		} catch (error) {
			console.log(error);
		}
	}

    

    // Render the main page
    useEffect(() =>{
       getUser();
    }, []);

    const handleChange = (e) => {

        if (e.key === 'Enter' && newItem.trim() !== "") {
            const newTodo = {label: newItem, is_done: false};
            console.log("Sending data:", newTodo);

            fetch("https://playground.4geeks.com/todo/todos/vbarbosa", {
                method: 'POST',
                headers: 'accept: application/json',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify (newTodo)
            })

            .then(resp => {
                if (!resp.ok) throw new Error(`Error status code: ${resp.status}`);
                return resp.json();
            })

            .then(result => {
                // Adds tasks to list
                setList((prevList) => [...prevList, result]);

                // clear the input field
                setNewItem("");
                console.log(result);

            })

            .catch(error => console.log("Error: ", error));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getUser();
    };

    const handleDelete = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"}
        })
        
        .then(() => {
            const updatedList = list.filter((el) => el.id !== id);
            setList(updatedList);
            getUser();
        })
        .catch(error => console.log("Error: ", error));
    };

    const deleteAll = () => {
        const deleteLoop = list.map (item => {
            fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"}
            });
        })
        
        Promise.all(deleteLoop)
            .then(() => {
                setList([]); // Clear the local state
                console.log("All tasks deleted successfully");

                getUser();
            })

        .catch(error => console.log("Error: ", error));
    };

    return (

        <div className="shadow">
            <ul className="card list-group list-group-flush">
                <li className="list-group-item">
                    <form onSubmit={handleSubmit} className="p-2">
                        <input 
                        type="text" 
                        value={newItem} 
                        placeholder="What needs to be done?" 
                        onKeyDown={handleChange} 
                        onChange={(e) => setNewItem(e.target.value)}
                        className="form-control border-0 fs-5"/>
                    </form>
                    <div className="d-grid w-25 gap-2 d-md-flex ms-auto m-2">
                        <button className="btn btn-danger" type="button" onClick={deleteAll}>Delete List</button>
                    </div>
                </li>

                {list.map((el) => <div className="justify-content-center">
                    <li 
                        key={el.id} 
                        className="list-group-item justify-content-between d-flex w-100" 
                        onMouseEnter={() => setHidden(prev => ({ ...prev, [el.id]: false }))}
                        onMouseLeave={() => setHidden(prev => ({ ...prev, [el.id]: true }))}
                    >
                        {el.label}
                        {hidden[el.id] ?  null : <button type="button" className="btn btn-group text-danger" onClick={() => handleDelete(el.id)}>X</button>}
                    
                    </li>
                </div>)}
                
            </ul>
            <div className=" card-footer p-3 footer1 text-secondary fst-italic">
                {list.length <= 0 ? "No hay tareas, añadir tareas" : list.length + " item left"}
            </div>
        </div>
    );
}