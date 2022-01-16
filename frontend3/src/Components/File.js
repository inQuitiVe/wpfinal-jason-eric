import {
  GET_USER_FILE_QUERY,
  TASK_RENEW_SUBSCRIPTION
  } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import { useState,useEffect } from 'react';
import "antd/dist/antd.css";
import {Typography, Divider, Empty,message,Card} from 'antd'
const {Title} = Typography
const File = (props) => {
  const user = props.user
  const {data: faceimage,subscribeToMore:a} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"mpface"}
    }
  );
  const {data: handimage,subscribeToMore:b} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"mphand"}
    }
  );
  const {data: bodyimage,subscribeToMore:c} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"mpbody"}
    }
  );
  const {data: classimage,subscribeToMore:d} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"classification"}
    }
  );

  useEffect(() => {
    a({
      document: TASK_RENEW_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if(subscriptionData.data && subscriptionData.data.taskrenew.class === "mpface") {
          console.log("===========subscript data===========")
          console.log(prev)
          console.log(prev.getUserFile);
          console.log(subscriptionData.data.taskrenew);
          console.log([...prev.getUserFile,subscriptionData.data.taskrenew])
          return {getUserFile: [...prev.getUserFile,subscriptionData.data.taskrenew]}
        }
        else return prev
      },
    });
  }, [a]);

  useEffect(() => {
    b({
      document: TASK_RENEW_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if(subscriptionData.data && subscriptionData.data.taskrenew.class === "mphand") {
          console.log("===========subscript data===========")
          console.log(prev)
          console.log(prev.getUserFile);
          console.log(subscriptionData.data.taskrenew);
          console.log([...prev.getUserFile,subscriptionData.data.taskrenew])
          return {getUserFile: [...prev.getUserFile,subscriptionData.data.taskrenew]}
        }
        else return prev
      },
    });
  }, [b]);

  useEffect(() => {
    c({
      document: TASK_RENEW_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if(subscriptionData.data && subscriptionData.data.taskrenew.class === "mpbody") {
          console.log("===========subscript data===========")
          console.log(prev)
          console.log(prev.getUserFile);
          console.log(subscriptionData.data.taskrenew);
          console.log([...prev.getUserFile,subscriptionData.data.taskrenew])
          return {getUserFile: [...prev.getUserFile,subscriptionData.data.taskrenew]}
        }
        else return prev
      },
    });
  }, [c]);

  useEffect(() => {
    d({
      document: TASK_RENEW_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if(subscriptionData.data && subscriptionData.data.taskrenew.class === "classification") {
          console.log("===========subscript data===========")
          console.log(prev)
          console.log(prev.getUserFile);
          console.log(subscriptionData.data.taskrenew);
          console.log([...prev.getUserFile,subscriptionData.data.taskrenew])
          return {getUserFile: [...prev.getUserFile,subscriptionData.data.taskrenew]}
        }
        else return prev
      },
    });
  }, [d]);

  const initial = () => {
    const key = 'updatable';
    if(faceimage&&handimage&&bodyimage&&classimage){
          message.success({ content: 'Loaded!', key, duration: 2 });;
          const result1 =  faceimage.getUserFile.map((src) => 
              <img src = {src.image} alt="aaa" style={{margin:20}}></img>)
          const result2 =  handimage.getUserFile.map((src) => 
              <img src = {src.image} alt="aaa" style={{margin:20}}></img>)
          const result3 =  bodyimage.getUserFile.map((src) => 
              <img src = {src.image} alt="aaa" style={{margin:20}}></img>)
          const result4 = classimage.getUserFile.map((src) =>
              <>
                <Card style={{ width: 270 }}>
                  <img src = {src.image} alt="aaa" style={{margin:20}}></img>
                  <p>{src.text}</p>
                  <p>{src.prob}</p>
                </Card>,
              </>)
          return(
            <div className="site-layout-background" style={{ padding: 40}}>
              <Title >History</Title>
              <Divider/>
              <div style={{display: 'flex', flexDirection: 'row', paddingRight: '20%', alignItems: 'center'}}>
                <Title level = {4} style = {{fontFamily:"monospace",paddingLeft: 40,textIndent: "2em",lineHeight:2}}>In this page you can view your previous training result, including Hand pose detection, Body pose estimation, Face mesh and classification. Hope you can find out your expected picture.</Title>
              </div>
              <Title level = {2} style={{marginTop:20}}>Face Mesh</Title>
              <Divider/>
              <div>{faceimage.getUserFile[0]?result1:<Empty/>}</div>
              <Title level = {2} style={{marginTop:20}}>Hand Pose Detection</Title>
              <Divider/>
              <div>{handimage.getUserFile[0]?result2:<Empty/>}</div>
              <Title level = {2} style={{marginTop:20}}>Body Pose Estimation</Title>
              <Divider/>
              <div>{bodyimage.getUserFile[0]?result3:<Empty/>}</div>
              <Title level = {2} style={{marginTop:20}}>Classification</Title>
              <Divider/>
              <div>{classimage.getUserFile[0]?result4:<Empty/>}</div>
              {console.log("===========load file=============")}
              {console.log(result1)}
              {console.log(result2)}
              {console.log(result3)}
              {console.log(result4)}
            </div>
          )
            
          
    }
    else  {
      message.loading({ content: 'Loading...', key },0);
    }
  }

  return(
    <div>
      {initial()}
    </div>
  );
}

export default File