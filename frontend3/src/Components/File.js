import {
  GET_USER_FILE_QUERY
  } from "../graphql";
import { useQuery, useMutation } from "@apollo/client";
import { useState,useEffect } from 'react';
import "antd/dist/antd.css";
import {Typography, Divider} from 'antd'
const {Title} = Typography
const File = (props) => {
  const user = props.user
  const [bodyimg, setbodyimg] = useState([]);
  const [handimg, sethandimg] = useState([]);
  const [faceimg, setfaceimg] = useState([]);
  const {data: faceimage} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"mpface"}
    }
  );
  const {data: handimage} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"mphand"}
    }
  );
  const {data: bodyimage} = useQuery(
    GET_USER_FILE_QUERY,
    {
      variables:{username: user,class:"mpbody"}
    }
  );

  const initial = () => {
    if(faceimage&&handimage&&bodyimage){
          const result1 =  faceimage.getUserFile.map((src) => 
              <img src = {src.image} alt="aaa"></img>)
          const result2 =  handimage.getUserFile.map((src) => 
              <img src = {src.image} alt="aaa"></img>)
          const result3 =  bodyimage.getUserFile.map((src) => 
              <img src = {src.image} alt="aaa"></img>)
          return(
            <div className="site-layout-background" style={{ padding: 40}}>
              <Title>History</Title>
              <Divider/>
              <div style={{display: 'flex', flexDirection: 'row', paddingRight: '20%', alignItems: 'center'}}>
                <Title level = {4} style = {{fontFamily:"monospace",paddingLeft: 40,textIndent: "2em",lineHeight:2}}>In this page you can view your previous training result, including Hand pose detection, Body pose estimation and Face mesh. Hope you can find out your expected picture.</Title>
              </div>
              <Title level = {2} >Face Mesh</Title>
              <Divider/>
              <div>{result1}</div>
              <Title level = {2} >Hand Pose Detection</Title>
              <Divider/>
              <div>{result2}</div>
              <Title level = {2} >Body Pose Estimation</Title>
              <Divider/>
              <div>{result3}</div>
            </div>
          )
            
          
    }
    else return "loading"
  }

  return(
    <div>
      {initial()}
    </div>
  );
}

export default File