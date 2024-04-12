import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import AddProgram from './AddProgram';
import DisplayProgram from './DisplayProgram';

function ManageProgram() {
  const [programList, setProgramList] = useState([]);

  const fetchPrograms = () => {
    fetch("http://localhost:8080/programs")
      .then(res => res.json())
      .then(result => {
        const transformedData = result.map((item, index) => ({
          id: index,
          name: item.program,
          version: item.version,
        }));
        setProgramList(transformedData);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div className="app">
      <AppBar title={"Manage Programs"}/>
      <AddProgram onAddProgram={fetchPrograms}/>
      <DisplayProgram programList={programList} fetchPrograms={fetchPrograms} />
    </div>
  );
}

export default ManageProgram;

