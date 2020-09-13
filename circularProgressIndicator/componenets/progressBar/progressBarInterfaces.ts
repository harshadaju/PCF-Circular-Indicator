

export interface IprogressBar{
    size:number,
    progress:number,
    percentage:number,
    strockWidth:number,
    circleOneStrock:string,
    circleTwoStrock:string,
    textColor:string,
    maxValue:number,
    progressChanged?:(newProgress:number,maxValue:number)=>void
}



