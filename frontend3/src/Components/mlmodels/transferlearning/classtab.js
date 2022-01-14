import { Tabs, Radio,Input, Button,message } from 'antd';
import * as tf from "@tensorflow/tfjs";
import "antd/dist/antd.css"
const { Search } = Input
const { TabPane } = Tabs;

function ClassTab(props){

    const webcamElement1 = document.getElementById('webcam1');
    const webcam1 = tf.data.webcam(webcamElement1);

    const Tabchange=(value)=>{
        props.setCurrentclass(value)
    }

    const Clearimg = ()=>{
        if(props.currentclass==='1'){
            props.setClassimg1([])
            message.success(`Class ${props.tabname1} Data Cleared`,1)
        }
        else if(props.currentclass==='2'){
            props.setClassimg2([])
            message.success(`Class ${props.tabname2} Data Cleared`,1)
        }
        else if(props.currentclass==='3'){
            props.setClassimg3([])
            message.success(`Class ${props.tabname3} Data Cleared`,1)
        }
    }

    const Handleclip = async ()=>{
        const img = await (await webcam1).capture();
        if(props.currentclass==='1'){
            props.setClassimg1([...props.classimg1,img])
            message.success(`Add Data to Class ${props.tabname1} ( ${props.classimg1.length+1} images in total )`,1)
            // console.log(img)
            // console.log(props.classimg1)
        }
        else if(props.currentclass==='2'){
            props.setClassimg2([...props.classimg2,img])
            message.success(`Add Data to Class ${props.tabname2} ( ${props.classimg2.length+1} images in total )`,1)
        }
        else if(props.currentclass==='3'){
            props.setClassimg3([...props.classimg3,img])
            message.success(`Add Data to Class ${props.tabname3} ( ${props.classimg3.length+1} images in total )`,1)
        }
    }

    const key = 'prdt'
    const Handlestart = async()=>{
        message.loading({ content: 'Loading...', key })
        props.Predict(await webcam1,key)
    }

    return (
      <div>
        <Tabs defaultActiveKey={props.currentclass} type="card" size="large" onChange={Tabchange}>
          <TabPane tab={props.tabname1} key="1">
          </TabPane>
          <TabPane tab={props.tabname2} key="2">
            {/* <video autoplay playsinline muted id="webcam2" width="224" height="224"></video> */}
          </TabPane>
          <TabPane tab={props.tabname3} key="3">
            {/* <video autoplay playsinline muted id="webcam3" width="224" height="224"></video> */}
          </TabPane>
          <TabPane tab='Start' key="4">
            {/* <video autoplay playsinline muted id="webcam3" width="224" height="224"></video> */}
          </TabPane>
        </Tabs>
        <div style={{display: "flex", flexDirection: "row"}}>
            <video autoPlay playsInline muted id="webcam1" width="400" height="300"></video>
            {props.currentclass==='4'?
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 20}}>
                <Button type="primary" onClick={Handlestart}>{props.intervalId?'Stop':"Start"}</Button>
                <h4 style={{marginTop: 10}}>Class: {props.result}</h4>
                <h4>Probability: {props.probability}</h4>
            </div>
            :<div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 20}}>
                <Search
                    placeholder="name the class..."
                    allowClear
                    enterButton="Set"
                    size="large"
                    onSearch={props.Changename}
                    style={{marginBottom: 5}}
                />
                <Button type="primary" style={{marginTop: 5, marginBottom: 5}} onClick={Handleclip}>Clip!</Button>
                <Button type="primary" style={{marginTop: 5}} onClick={Clearimg}>Clear</Button>
            </div>}
        </div>
      </div>
    );
}

export default ClassTab