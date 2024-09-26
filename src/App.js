import stlye from './app.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [curr, setCurr] = useState([])
  const [formdata, setFormData]= useState({
    privateKey: {value: '', error: '', name: 'PrivateKey: '},
    inputMint: {value: '', error: '', name: 'InputMint:'},
    outputMint: {value: '', error: '', name: 'Output:'},
    amount: {value: '', error: '', name: 'Amount:'},
    blockChain: {value: '', error: '', name: 'BlockChain:'},
  })
  const load = async()=>{
    //load databaase state
    const {data} = await axios.get('http://localhost:3001/get')
    console.log(data)
    setCurr(data)
  }

  const del = async(id)=>{
    const {data} = await axios.delete(`http://localhost:3001/delete/${id}`) 
    console.log("After deleting", data)
    //after deleting reload data
    load()
  }
  useEffect(()=>{
    load()
  }, [])

  const Submit=(e)=>{
    e.preventDefault()
    const response = axios.post('http://localhost:3001/add', {
      privateKey: formdata.privateKey.value,
      inputMint: formdata.inputMint.value,
      outputMint: formdata.outputMint.value,
      amount: formdata.amount.value,
      blockChain: formdata.blockChain.value
    })
    load()
  }
  const form = Object.keys(formdata).map((key)=>{
    return (
      <div key={key}>
      <label htmlFor={formdata[key].name}>{formdata[key].name}</label>
      <input onChange={(e)=>{
        setFormData({
          ...formdata,
          [key]:{
            ...formdata[key],
            value: e.target.value
          }
        })
      }}
      
      value={formdata[key].value} type="text" placeholder={formdata[key].name} />
    </div>
    )
  }) 
  return (
    <div className={stlye.container}>
      <h1>Form</h1>
      <form className={stlye.form}>
        {form}
      </form>
      <button onClick={Submit}>Submit</button>
      <h2>Current State</h2>
      {curr.length&&curr.map((item, key)=>{
        console.log(item)
        return (
        <table key={key}>
          <tr>
            <td>{item.privateKey}</td>
            <td>{item.inputMint}</td>
            <td>{item.outputMint}</td>
            <td>{item.amount}</td>
            <td>{item.blockChain}</td>
            <span className={stlye.action} style={{margin: "40px"}}>Edit</span>
            <span onClick={()=>del(item.id)} className={stlye.action}>Delete</span>
            </tr>
        </table>)
      })}
    </div>
  );
}

export default App;
