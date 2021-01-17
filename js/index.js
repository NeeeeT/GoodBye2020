let months = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
}
for(let i = 1; i <= 12; i++){
    for(let j = 0; j < data.length; j++){
        if(data[j].month1 === i){
            if(data[j].badThing1.length > 0){
                tempData = [];
                tempData[0] = data[j].name;
                tempData[1] = data[j].badThing1;
                // months[i].push(data[j]);
                months[i].push(tempData);   
            }
        }
        if(data[j].month2 === i){
            if(data[j].badThing2.length > 0)
                tempData = [];
                tempData[0] = data[j].name;
                tempData[1] = data[j].badThing2;

                months[i].push(tempData);
        }
    }
}