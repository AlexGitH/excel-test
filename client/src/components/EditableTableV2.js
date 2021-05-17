import { Input, Table, Button } from 'antd'
import React, { useState, useEffect } from 'react'


import 'antd/dist/antd.css';
// import SimpleEditableCell from './SimpleEditalbleCell';

const dataSource = [{
  id: 1,
  name: 'Akkek',
  age: 25,
  goals :  'Some Akkek goal'
},{
  id: 2,
  name: 'Ikset',
  age: 53,
  goals :  'Some Ikset goal'
}]

const EditableTable = () => {
  const [tableData, setTableData] = useState(dataSource);

  useEffect(() => {
    // Set totals on initial render
    const newData = [...tableData];
    // for (let index = 0; index < tableData.length; index++) {
    //   setTotal(newData, index);
    // }
    setTableData(newData);
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("name", index)} />
      )
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange("age", index)} />
        // <Input value={text} onChange={({target:{value}})=>{console.log(index, value)}}/>
      )
    },
    {
      title: 'Goals',
      dataIndex: 'goals',
      key: 'goals'
    }]

  const onInputChange = (key, index) => ( e) => {
    const newData = [...tableData];
    // newData[index][key] = Number(e.target.value);
    newData[index][key] = e.target.value;
    setTableData(newData);
  };

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Button type="primary" onClick={()=>console.log('onButtonClick:', 'tableData:', tableData)}>
        table data
      </Button>
      </>
      )
  
}

export default EditableTable
