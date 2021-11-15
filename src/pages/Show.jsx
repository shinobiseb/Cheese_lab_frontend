import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

const Show = (props) => {
// grab the navigate function
  const navigate = useNavigate()
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab cheese from props
  const cheese = props.cheese;
  // create state for form
  const [editForm, setEditForm] = useState({})
  // useEffect to set state to the existing string, when the data is available
  useEffect(() => {
      if(props.cheese){
          const string = cheese.find((p) => p._id === id);
          setEditForm(string)
      }
  }, [props.cheese])

    if (props.cheese) {
    // grab the target string from the cheese array
    const string = cheese.find((p) => p._id === id);
    
    // handleChange function for form
    const handleChange = (event) => {
        // create a copy of the state
        const newState = {...editForm}
        // update the newState
        newState[event.target.name] = event.target.value
        // update the state
        setEditForm(newState)
    }

    // handleSubmit for form
    const handleSubmit = (event) => {
        // prevent the refresh
        event.preventDefault()
        // pass the form data to updatecheese
        props.updatecheese(editForm, string._id)
        // redirect cheese back to index
        navigate("/")
    }

    const removeString = () => {
        props.deleteCheese(string._id)
        navigate("/")
    }

    const form = (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="title"
            onChange={handleChange}
          />
          <input type="submit" value="Update string" />
        </form>
      );

    return (
      <div className="string">
        <h1>{string.name}</h1>
        <h2>{string.title}</h2>
        <img src={string.image} alt={string.name} />
        {form}
        <button onClick={removeString}>DELETE THIS DUDE</button>
      </div>
    );
  }
};

export default Show;