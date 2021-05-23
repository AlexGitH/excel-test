import { Input, Table } from 'antd'
import React, { useState, useEffect } from 'react'
import { buildColumn, buildData }  from '../../utils/testing/tableGenerator'


import 'antd/dist/antd.css';
import './style.css';

// NOTE: model example

// const dataSource = [{
//   id: 1,
//   name: 'Akkek',
//   age: 25,
//   goals :  'Some Akkek goal'
// },{
//   id: 2,
//   name: 'Ikset',
//   age: 53,
//   goals :  'Some Ikset goal'
// }]

const dataSource = buildData( 10, 30 );

const CustomInput = () => {
  const [text, setText] = useState(null)

  return <Input value={text} onChange={({target:{value}})=>setText(value)} />
}

const EditableTable = React.memo( (props) => {
  const [tableData, setTableData] = useState(dataSource);

  useEffect(() => {
    const newData = [...tableData];
    setTableData(newData);
  }, [] );

  console.log('EditableTable:', 'props:', props);  // DEBUG: remove after testing
  // console.log('EditableTable:', 'auth:', auth);  // DEBUG: remove after testing

  // NOTE: data example
  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text, record, index) => (
  //       <Input value={text} onChange={onInputChange("name", index)} />
  //     )
  //   }]
  const columns = Array.from( {length: 30}, (_,i)=>
      buildColumn( i,(text, record, index) => (
        <CustomInput/>
        // <Input value={text} onChange={onInputChange( i, index)} />
      )
 ))

 // TODO: create new cell updating mechanism
  // const onInputChange = (key, index) => ( e) => {
  //   const newData = [...tableData];
  //   newData[index][key] = e.target.value;
  //   setTableData(newData);
  // };

  return (
      <Table
        bordered
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      )
  
})

export default EditableTable
