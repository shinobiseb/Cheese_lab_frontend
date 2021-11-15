import {useState} from "react"
import {Link} from "react-router-dom"

const Index = (props) => {

    // state to hold form data
    const [newForm, setNewForm] = useState({
      name: "",
      image: "",
      title: ""
  })

  //handleChange function to sync input with state
  const handleChange = (event) => {
      // make a copy of state
      const newState = {...newForm}
      // update the newState
      newState[event.target.name] = event.target.value
      // update the state
      setNewForm(newState)
  }

    // handleSubmit function for when form is submitted
  const handleSubmit = (event) => {
      // prevent the page from refreshing
      event.preventDefault()
      // pass the form data to createcheese function
      props.createcheese(newForm)
      // reset the form to empty
      setNewForm({
        name: "",
        image: "",
        title: ""
    })
  }

      const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.image}
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.title}
        name="title"
        placeholder="title"
        onChange={handleChange}
      />
      <input type="submit" value="Create string" />
    </form>
  );

     if (props.cheese) {
    return (
      <section>
        {form}
        {props.cheese.map((string) => {
          return (
            <div key={string._id} className="string">
              <Link to={`/cheese/${string._id}`}>
                <h1>{string.name}</h1>
              </Link>
              <img src={string.image} alt={string.name} />
            </div>
          );
        })}
      </section>
    );
  } else {
    return (
      <section>
        {form}
        <h1>Loading...</h1>
      </section>
    );
  }
};

export default Index;