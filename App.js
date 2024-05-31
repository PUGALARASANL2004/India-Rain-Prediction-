import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

const MyComponent = () => {
  const [inputs, setInputs] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });
  const [price, setPrice] = useState(null); // State variable to store the prediction
  const [responseCode, setResponseCode] = useState(null); // State variable to store the response code
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  
  const handleClick = async () => {
    try {
      // Gather the values from input fields
      const { input1, input2, input3, input4} = inputs;     
      // Prepare the data to be sent to the backend
      const inputData = {
        feature1: input1,
        feature2: input2,
        feature3: input3,
        feature4: input4,
      };
  
      // Send the data to the backend
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });
  
      // Set the response code
      setResponseCode(response.status);
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Extract the prediction from the response
      const { price } = data;
  
      // Update the state to display the prediction
      setPrice(price);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="container">
      <h2>enter data, we will predict rain rate!</h2>
      
      <label>
      JUN :
        <br />
        <input type="text" name="input1" value={inputs.input1} onChange={handleChange} />
      </label>
      <br />

      <label>
      JUL :
        <br />
        <input type="text" name="input2" value={inputs.input2} onChange={handleChange} />
      </label>
      <br />

      <label>
      AUG :
        <br />
        <input type="text" name="input3" value={inputs.input3} onChange={handleChange} />
      </label>
      <br />

      <label>
      SEP :
        <br />
        <input type="text" name="input4" value={inputs.input4} onChange={handleChange} />
      </label>
      <br />

      <button onClick={handleClick}> rain pred </button>
      {price !== null && <p>rain: {price}</p>}
      {responseCode !== null && <p>Response Code: {responseCode}</p>}
    </div>
  );
};

export default MyComponent;
