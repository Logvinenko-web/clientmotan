 import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function App() {
  const [data, setData] = useState([]);
  const[dataForms, setDataForms]= useState({
    title:``,
    content:``,
    price:0
  })
useEffect( ()=>{
  const getData = async()=>{
    const result = await axios.get (
      "http://localhost:5000/api/"
    );
    setData(result.data)
  }
  getData()
},[data])
if (data.length===0){
  return <h1>...Loading</h1>

}
const handlerChange =(e)=>{
  setDataForms({...dataForms, [e.target.name]:e.target.value})
}
const handlerSubmit = (e)=>{
  e.preventDefault()
  try {
    const options = {
      url:"http://localhost:5000/api/add",
      method:`post`,
      data:dataForms
    }
    axios(options)
  } catch (error) {
    console.log(error)
  }
}
// console.log(dataForms)
  return (  
<>
<form onSubmit={handlerSubmit}>
      <div>
        <label>title</label>
        <input type="text" name="title" onChange={handlerChange}/>
      </div>
      <div>
        <label>content</label>
        <input type="text" name="content"  onChange={handlerChange}/>
      </div>
      <div>
        <label>price</label>
        <input type="number" name="price" onChange={handlerChange} />
      </div>
       
      <button type="text" >Add</button>
    </form>
  

        {data.map(item => (
        <ul  key={item._id}>
        <li>
          {item.title}
         </li>
         <li>
          {item.content}
         </li>
         <li>
          {item.price}
         </li>
         </ul>
      ))}
      </>
        );

}

export default App;
