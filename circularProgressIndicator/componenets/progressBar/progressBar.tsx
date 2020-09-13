import * as React from 'react'
import {IprogressBar} from './progressBarInterfaces'
// import './progressBar.css'



const ProgressBar:React.FC<IprogressBar>=(props:IprogressBar):JSX.Element=>{    
    const [offset,setOffset]=React.useState(0)
    const circleRef=React.useRef(null)
    const center=props.size/2
    const radius=props.size/2-props.strockWidth/2;
    const circumfrance=2*Math.PI*radius    
    let percentage=Math.round((props.progress/props.maxValue)*100)
    React.useEffect(()=>{
        percentage=Math.round((props.progress/props.maxValue)*100) 
        const progressOffset=((props.maxValue-props.progress)/props.maxValue)*circumfrance
        setOffset(progressOffset)
        let circle:SVGCircleElement|null=circleRef.current as SVGCircleElement|null
        if(circle!=null)
        circle.style.transition='stroke-dashoffset 850ms ease-in-out'
    },[circumfrance,setOffset,offset,props.progress,props.maxValue])
return(
<svg
    width={props.size}
    height={props.size}
    className='circular-chart'
>
    <circle
        className='circular-bg'
        stroke={props.circleOneStrock}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={props.strockWidth}
    ></circle>
    <circle
        className='circle'
        ref={circleRef}
        stroke={props.circleTwoStrock}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={props.strockWidth}
        strokeDasharray={circumfrance}
        strokeDashoffset={offset}
    ></circle>
    <text
    style={{fill:props.textColor}}
        x={center-10}
        y={center-10}
        className='progress'
    >      
    {props.progress}  
    </text>
    <text
    style={{fill:props.textColor}}
        x={center}
        y={center+10}
        className='percentage'
    >        
        {percentage}%
    </text>
</svg>
)
}
export default ProgressBar