const fs= require('fs');


var year=3-2013;
var i;
var j;
var key,value;
var counter=0;

var oilseedArray=[];

var data=fs.readFileSync('CsvFile/Production.csv','utf8');
//console.log(data);
var lineByLine = [];
	var lineByLine=data.split('\n');
	var heading=lineByLine[0].split(',');
	var Index2013=heading.indexOf(" 3-2013")+1;
	var Index1993=heading.indexOf(" 3-1993")+1;

	//For the year 2013, plot the all oilseed crop type vs .production, in descending order.
	lineByLine.map(function(item)
	{   
		
		if(item.split(" ")[2]=="Oilseeds")
		{
			data=item.split(',');
			
			heading.map(function(item)
			{
				if(item==" 3-2013")
				{
					particular=data[0].split("Oilseeds")[1];
					value=data[Index2013];
					//total.push(data[0]+":"+data[j+1]);
					oilseedArray.push({particular:particular,value:value});
				}
				
			});
		}


	});
	oilseedArray.sort(function(a,b){
  return b.value - a.value;
});
	fs.writeFileSync("JsonFiles/Oilseeds.json",JSON.stringify(oilseedArray),encoding="utf8");
oilseedArray.map(function(item){
	console.log(item);

});
//For the year 2013, plot the all the Foodgrains type vs. production, in descending order.
var foodgrainsArray=[];
lineByLine.map(function(item)
	{   
		counter++;
		if(item.split(" ")[2]=="Foodgrains")
		{
			data=item.split(',');
			
			heading.map(function(item)
			{
				if(item==" 3-2013")
				{
					//if((data[0].split("Foodgrains")[1].search(" Area")<0))
					if((data[0].split("Foodgrains")[1].search(/Area|Production|Yield|Volume/)<0))
					{
					particular=data[0].split("Foodgrains")[1];
					value=data[Index2013];
					//total.push(data[0]+":"+data[j+1]);
					foodgrainsArray.push({particular:particular,value:value});
					}
				}
				
			});
		}
		
	});
	foodgrainsArray.sort(function(a,b){
  return b.value - a.value;
});

fs.writeFileSync("JsonFiles/foodgrains.json",JSON.stringify(foodgrainsArray),encoding="utf8");
/*foodgrainsArray.map( function(item) {
    
     console.log(item)
	});*/

//Aggregate all commercial crops and plot the aggregated value vs. year. Note: assume a value of 0 for “NA”.
var commercial=[];
lineByLine.map(function(item)
	{   
		counter++;
		if(item.split(" ")[2]=="Commercial")
		{
			data=item.split(',');
			
			heading.map(function(item)
			{
				
				
					particular=data[0].split("Commercial Crops")[1];
					var value=[];
					var begYear=1992;
					if(particular)
					{
						for(var j=Index1993;j<=Index2013;j++)
						{
						var v={};
						begYear++;
						v.begYear=begYear;
						v.value=data[j].split(',');
						
						if(v.value=='NA')
						{
							v.value=0;
						}
						
						value.push(v);
						}
					}
					if(particular!=' Crops Sugarcane'){
          					commercial.push({
           								 particular:particular,
            							value:value
       									   });
					
					}
				
			});
		} 
		
	});
/*commercial.map( function(item) {
    
     console.log(item);
	});*/
	var total={};

	     total.name="Total in a year";
	     total.value=[];
	     var year=1993;
	     for(i=0;i<commercial[0].value.length;i++)
	     {
	     	var sum=0;
	     	for(j=0;j<commercial.length;j++)
	     	{
	     		if(commercial[j])
	     			//console.log(commercial[j].value[i].value);
	     			sum+=parseFloat(commercial[j].value[i].value);
	     	}
	     	total.value.push({year:year+i,total:sum}); 
	     }
	

	fs.writeFile('JsonFiles/commercial.json',JSON.stringify(total),encoding="utf8");
//lineByLine.map(function(item))
/*total.value.map( function(item) {
    
     console.log(item);
	});*/
//Plot a stacked chart of rice production in the 4 southern states. Note. In this time period the data is for undivided Andhra Pradesh.
var stateData=[];
for (var i = Index1993; i<= Index2013; i++) {
  var year = 1993;

lineByLine.map(function(item)
	{   
		
		
			data=item.split(',');
					//console.log(data);
			
					state=data[0].split(" Rice Volume")[1];
					
					//console.log(state);
					if(state==' Andhra Pradesh')
					{
						Year=year+i-Index1993;
						totalAp=data[i].split(',');
						
						if(totalAp=='NA')
						{
							totalAp=0;
						}
					}
					if(state==' Kerala')
					{
						Year=year+i-Index1993;
						totalAp=data[i].split(',');
						//totalAp=0;
						if(totalAp=='NA')
						{
							totalAp=0;
						}
						
					}
					if(state==' Karnataka')
					{
						Year=year+i-Index1993;
						totalAp=data[i].split(',');
						//totalAp=0;
						if(totalAp=='NA')
						{
							totalAp=0;
						}
						
					}
					if(state==' Tamil Nadu')
					{
						Year=year+i-Index1993;
						totalAp=data[i].split(',');
						//totalAp=0;
						if(totalAp=='NA')
						{
							totalAp=0;
						}
						
					}
					//total.push(data[0]+":"+data[j+1]);
					
				
				
			


	});
stateData.push({Year:Year,AndhraPradesh:totalAp,Kerala:totalAp,Karnataka:totalAp,TamilNadu:totalAp});
	}
	fs.writeFileSync("JsonFiles/stateData.json",JSON.stringify(stateData),encoding="utf8");

/*stateData.map( function(item) {
    
     console.log(item);
	});*/