const fingers = [
    [0,1,2,3,4],
    [0,5,6,7,8],
    [0,9,10,11,12],
    [0,13,14,15,16],
    [0,17,18,19,20]
]

const drawHand=(predictions, ctx, width)=>{
    if (predictions.length>0){
        predictions.forEach((prediction)=>{
            const landmarks = prediction.landmarks

            for (let j = 0;j<fingers.length;j++){
                for(let k = 0;k<fingers[j].length-1;k++){
                    const a = fingers[j][k]
                    const b = fingers[j][k+1]
                    ctx.beginPath()
                    ctx.moveTo(
                        landmarks[a][0]*width/640,
                        landmarks[a][1]*width/640
                    )
                    ctx.lineTo(
                        landmarks[b][0]*width/640,
                        landmarks[b][1]*width/640
                    )
                    ctx.strokeStyle = 'blue'
                    ctx.lineWidth = 4
                    ctx.stroke()
                }
            }



            for(let i=0;i<landmarks.length;i++){
                const x = landmarks[i][0]*width/640
                const y = landmarks[i][1]*width/640
                // console.log(x,y)
                // console.log(ctx)
                // ctx.fillRect(25,25,100,100);
                ctx.beginPath()
                // ctx.fillRect(25,25,100,100);
                ctx.arc(x, y, 5,0,3*Math.PI)
                if(i<5){
                    ctx.fillStyle = 'yellow'
                }
                else {ctx.fillStyle = "lightgreen"}
                ctx.fill()
                // ctx.strokeStyle = "#FF0000";

                ctx.lineWidth = 3;
                // ctx.stroke();
            }
        })
    }
}

export {drawHand}