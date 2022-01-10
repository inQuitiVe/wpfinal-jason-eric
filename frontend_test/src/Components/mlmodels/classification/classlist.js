import React, { useState } from 'react';
import { Table, Radio, Divider, Button } from 'antd';
const columns = [
  {
    title: 'Class Name',
    dataIndex: 'classname',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Probability',
    dataIndex: 'probability',
  },
];



const Classlist = (props) => {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setIsselected(true)
        },
        //   getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        //   }),
    };
    const [isselected,setIsselected] = useState(false)
    const handlesave=()=>{
        if(props.result.length === 0 || isselected === false)return true
        else return false
    }
    return (
        <div style={{marginTop: 10, maxWidth: "80%",paddingLeft: 80}}>
        <Table
            rowSelection={{
            type: "radio",
            ...rowSelection,
            }}
            columns={columns}
            dataSource={props.result}
            pagination={false}
        />
        <Button type="primary" disabled={handlesave()} >Save Results</Button>
        </div>
    );
};

export default Classlist