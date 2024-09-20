import logo from './logo.svg';
import stlye from './app.module.css';
import { useState } from 'react';
function App() {

  const [formdata, setFormData]= useState({
    privateKey: {value: '', error: '', name: 'PrivateKey'},
    inputMint: {value: '', error: '', name: 'InputMint'},
    outputMint: {value: '', error: '', name: 'Output'},
    amount: {value: '', error: '', name: 'Amount'},
    blockChain: {value: '', error: '', name: 'BlockChain'},
  })

  const Submit=(e)=>{
    e.preventDefault()
      console.log(formdata.privateKey.value)
      console.log(formdata.inputMint.value)
      console.log(formdata.outputMint.value)
      console.log(formdata.amount.value)
      console.log(formdata.blockChain.value)
  }
  const form = Object.keys(formdata).map((key)=>{
    return (
      <div>
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
    <div className="container">
      <h1>Form</h1>
      <form className={stlye.form}>
        {form}
      </form>
      <button onClick={Submit}>Submit</button>
    </div>
  );
}

export default App;
