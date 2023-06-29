import React, { useRef, useState } from 'react';
import { Select, Button, Box, Heading, Textarea } from '@chakra-ui/react';
import axios from 'axios';

const Main = () => {
  const [select, setSelect] = useState('');
  const[type,setType] = useState('')
  const [response,setResponse] = useState('')
  let ref1 = useRef(null)
  let ref2 = useRef(null)

  const handleOptionChange = (event) => {
    setSelect(ref1.current.value)
  };
  
  const handleOptionChange2 = (event) => {
    setType(ref2.current.value)
  };

  const handleSubmit = () => {
    // Make the Axios POST request
    let obj = {}
    if(type){
        obj.option= `tell me a ${select} about ${type} in hinglish`
    } else{
        obj.option= `tell me a ${select} in hinglish`
    }
    

    console.log(obj)
    axios
      .post('http://localhost:8080/shayri', obj)
      .then((response) => {
        // Handle the response here
        setResponse(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };

  return (
    <Box>
        <Heading textAlign={'center'}>Shayri</Heading>
      <Select ref={ref1} onChange={handleOptionChange} m={'2% 0%'}>
      <option value="">--select--</option>
        <option value="Shayri">Shayri</option>
        <option value="Jokes">Jokes</option>
        {/* Add more options here */}
      </Select>

      {select && select=="Shayri"? <Select ref={ref2} onChange={handleOptionChange2} m={'2% 0%'}>
      <option value="">--select your topic--</option>
        <option value="love">Love</option>
        <option value="Career">Career</option>
        <option value="life">Life</option>
        {/* Add more options here */}
      </Select>:''}


      {response? <Textarea h={'25vh'} value={response? response:''}></Textarea> : '' }
      
      <Button bgColor={'green.400'} color={'white'} display={'block'} m={'auto'} mt={'1%'} onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default Main;