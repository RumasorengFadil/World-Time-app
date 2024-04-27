export const setTime = ({continent, interName}, i) => {
    const xhr = new XMLHttpRequest();
    const clocks = document.querySelectorAll(".clock-box")[i];
    const [secondLine,minuteLine,hoursLine] = clocks.children;
    
    xhr.onload = () => {

        // const time = JSON.parse(this.responseText);
        const datetime = [time.datetime.split("T")];
        

        datetime.forEach(([date,times]) =>{
            const [time,] = times.split(".");
            const [hours, minute, second] = time.split(":");
            const degHours = (Number(hours) * 30) + (Number(minute) / 2);
            const degMinute = Number(minute) * 6;
            const degSecond = Number(second) * 6;
            hoursLine.style.rotate = `${degHours}deg`;
            minuteLine.style.rotate = `${degMinute}deg`;
            secondLine.style.rotate = `${degSecond}deg`;
        })
        // for(let [date,times] of datetime){
           
        // }
    }
    xhr.onerror = () => console.log("error");
    xhr.open("GET",`http://worldtimeapi.org/api/timezone/${continent}/${interName}`);
    xhr.send();
}
