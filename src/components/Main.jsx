import {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {


    const [cheese, setcheese] = useState(null)

    const URL = "https://ss-cheese-dffjdasklfdjasjkfdkj.herokuapp.com/cheese"

    const getcheese = async () => {
        const response = await fetch(URL)
        console.log(response)
        const data = await response.json()
                console.log(data)
        setcheese(data)

    }
      // function that will later be passed data from our new/create form and make the post request to create a new string
    const createcheese = async (string) => {
        //make the post request to the API
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(string)
        })

        //get updated list of cheese
        getcheese()
    }
        // function to update a string
  const updatecheese = async (string, id) => {
      // make the put request
      await fetch(URL + id, {
          method: "put",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(string)
      })
      // update the list of cheese
      getcheese()
  }

  // create function to delete a string
  const deletecheese = async (id) => {
      // make the delete request
      await fetch(URL + id, {
          method: "delete"
      })
      // update the list of cheese
      getcheese()
  }



    //a useEffect to make a call to getcheese when page loads
    useEffect(()=> {
        getcheese()
    }, [])

  return (
    <main>
      <Routes>
        <Route path="/" element={
        <Index cheese={cheese} createcheese={createcheese}/>
        } />
        <Route path="/cheese/:id" element={
        <Show cheese={cheese} updatecheese={updatecheese} deletecheese={deletecheese}/>} 
        />
      </Routes>
    </main>
  );
}

export default Main;