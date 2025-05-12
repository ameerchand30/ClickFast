body {
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f4;
    margin: 0;
  }
  
  #main {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  #container {
    text-align: center;
  }
  
  .flex {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .catchphrase {
    color: #777;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  #score {
    font-weight: bold;
    color: #28a745;
  }
  
  #timer {
    margin-top: 10px;
    color: #555;
  }
  
  #scoreboard {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    text-align: left;
  }
  
  #scoreboard h2 {
    text-align: center;
    margin-top: 0;
  }
  
  #scoreboard ol {
    padding-left: 20px;
  }
  
  #scoreboard li {
    margin-bottom: 5px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"] {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }