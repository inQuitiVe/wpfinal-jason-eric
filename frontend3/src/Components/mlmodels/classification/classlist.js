import React, { useState,useEffect } from 'react';
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
            props.setSelectedrowkeys(selectedRowKeys)
        },
        selectedRowKeys: props.selectedRowKeys
        //   getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        //   }),
    }

    const handlesave=()=>{
        if(props.result.length === 0 || props.selectedRowKeys.length === 0)return true
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