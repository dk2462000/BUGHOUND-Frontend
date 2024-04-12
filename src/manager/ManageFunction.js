import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import AddFunction from './AddFunction';
import DisplayFunction from './DisplayFunction';

function ManageFunction() {
  const [functionList, setFunctionList] = useState([]);

  const fetchFunctions = () => {
    fetch("http://localhost:8080/functions")
      .then(res => res.json())
      .then(result => {
        const transformedData = result.map((item, index) => ({
          id: index,
          funcName: item.funcName,
        }));
        setFunctionList(transformedData);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  return (
    <div className="app">
      <AppBar title={"Manage Functions"}/>
      <AddFunction onAddFunction={fetchFunctions}/>
      <DisplayFunction functionList={functionList} fetchFunctions={fetchFunctions} />
    </div>
  );
}

export default ManageFunction;
