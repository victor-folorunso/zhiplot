const tSeq = []//maths (mr a),eng (mr b)...
function genListSeq(){
	for (let teacher in teacherAndSubjectsDict) {
		for (var i =0;i < teacherAndSubjectsDict[teacher].length;i++){
		var tNameFinder = teacherIdAndRealName[teacher]//find teacher real name from id
		tSeq.push(`${teacherAndSubjectsDict[teacher][i]}  (${tNameFinder})`)

		}
	}
	
}

function createPopupContent(cellUniqueId){
	const popDiv = document.getElementById("cellPopupContainerItems")
	const spanAlpha = document.createElement("span")
	spanAlpha.setAttribute("id","popup"+ cellUniqueId)
	spanAlpha.style.cssText = "display:none; margin-bottom: 100px;"
	
	
	for (var i =0;i < tSeq.length;i++){
		//const popup = document.getElementById("popup")
		const spanPopup = document.createElement("span")
		spanPopup.style.cssText = "margin:5vh;display:block"
		var input = document.createElement("input")
		input.setAttribute("type","checkbox")
		var value = document.createTextNode(tSeq[i])
		var brk = document.createElement("br")

		spanPopup.appendChild(input)
		spanPopup.appendChild(document.createTextNode("\u00A0"));
		spanPopup.appendChild(document.createTextNode("\u00A0"));
		spanPopup.appendChild(value)
		spanPopup.appendChild(brk)
		
		spanAlpha.appendChild(spanPopup)
	}
	popDiv.appendChild(spanAlpha)
	
	/*var popupBackground = document.getElementById("popupBackground")
	popupBackground.style.display = "flex"
	popupBackground.addEventListener("change",function(){
		alert(8745678)
	})*/
}

function buttonCreateTable(){
	genListSeq()
	document.getElementById("plotTable").style.display = "block"
	document.getElementById("collectData").style.display = "none"
	
    const numCols = 23;
    const classes = ["class\\time","JSS 1","JSS 2","JSS 3","SSS 1","SSS 2","SSS 3"];
    const days = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"]
    const plotTable = document.getElementById("plotTable");
   
   	for (var h = 0;h<days.length;h++){
    const table = document.createElement("table");
    const caption = document.createElement("caption")
    caption.innerHTML = days[h]
    table.setAttribute("id","table" + h)
    table.appendChild(caption)
    for (let i = 0; i < classes.length; i++) {
        const row = document.createElement("tr");
        
        for (let j = 1; j <= numCols; j++) {
            
            if (j === 1) {
            	const header = document.createElement("th")
                header.appendChild(document.createTextNode(classes[i]));
                row.appendChild(header);
            }
            else {
            	if (i == 0){
            	const cell = document.createElement("td");
            	
            	const time1 = document.createElement("input")        
            	time1.style.backgroundColor ="blue"
            	time1.style.width = "85px"; // Adjust the width for display
            	time1.setAttribute("type","time")
            	cell.appendChild(time1)
            	cell.appendChild(document.createElement("br"))
            	cell.appendChild(document.createTextNode("TO"))
          			cell.appendChild(document.createElement("br"))
            	const time2 = document.createElement("input")        
            	time2.style.backgroundColor ="blue"
            	time2.style.width = "85px"; // Adjust the width for display
            	time2.setAttribute("type","time")
            	cell.appendChild(time2)
            
            	row.appendChild(cell);
            	}
            	
            	if (i > 0){
            	const cell = document.createElement("td");
            	const cellUniqueId = (`${days[h]} (${i+1},${j})`)
            	cell.setAttribute("id",cellUniqueId)
                cell.appendChild(document.createTextNode(cellUniqueId));
                createPopupContent(cellUniqueId)
                cell.addEventListener("click", function() {
                	alert(cellUniqueId)
                	document.getElementById("popupBackground").style.display = "flex"
                	document.getElementById("popup"+ cellUniqueId).style.display = "block"
               		document.getElementById("plotTable").style.display = "none"
                })
                row.appendChild(cell);
               
                }
            }        
        }

        table.appendChild(row);
    }
    plotTable.appendChild(table)

	}
    
}

var doneBtn = document.getElementById("doneBtn")
doneBtn.addEventListener("click",function(){
document.getElementById("popupBackground").style.display = "none"
document.getElementById("plotTable").style.display = "block"
})

const teacherAndSubjectsDict = {}
const teacherIdAndRealName = {}
function addTeacherName() {
    const tName = document.getElementById("teacherName").value;
    if (tName.length > 0) {
    
        const uniqueID = "T" + Date.now();
        teacherAndSubjectsDict[uniqueID] = [];
        //let numberOfTeachers = Object.keys(teacherAndSubjectsDict).length;
        
        //alert(`Number of teachers: ${numberOfTeachers}`);
        teacherIdAndRealName[uniqueID] = tName
        const teacherSubjects = document.getElementById("teacherSubjects");

        
        
        const autoInput = document.createElement("input");
        autoInput.id = uniqueID;
      	autoInput.setAttribute("type", "checkbox");
       
        const autoH3 = document.createElement("h3");
        autoH3.id = uniqueID;
    	autoH3.appendChild(document.createTextNode(`${tName}`));
		autoH3.appendChild(autoInput);
		
		const autoUl = document.createElement("ul");
		autoUl.id = uniqueID;
		
		//this is classname not id due to dual inputs name clash//
		const autoInput2 = document.createElement("input");
		//autoInput2.className = uniqueID;
		autoInput2.setAttribute("class", uniqueID);

		autoInput2.setAttribute("type", "text");
		autoInput2.setAttribute("placeholder", "add teachers subject");
		
	 	const autoButton = document.createElement("button");
	 	autoButton.id = uniqueID
		autoButton.innerHTML = " + ";
		
		const autoSpan = document.createElement("span");
		autoSpan.id = uniqueID;
		autoSpan.appendChild(autoInput2)
		autoSpan.appendChild(document.createTextNode("\u00A0")); // This adds a non-breaking space
		autoSpan.appendChild(autoButton);
		
		const autoDiv = document.createElement("div");
		autoDiv.id = uniqueID;
		autoDiv.appendChild(autoH3);
		autoDiv.appendChild(autoUl);
		autoDiv.appendChild(autoSpan);

        teacherSubjects.appendChild(autoDiv);
        teacherSubjects.appendChild(document.createElement("br"))
        // Select elements by tag name and class name
       // part 2
       	// add event listners for each teacher
        var id = uniqueID.toString()
        //clicked = "clicked" + id ////this is a useless statement lol//
        var teacher = document.querySelector("h3#" + id);
        var subjects = document.querySelector("ul#" + id);
        var teacherCheck = document.querySelector("input#" + id);
        var subjectsAdder = document.querySelector("span#" + id)
        var input2 = document.querySelector("input." + id)
        var addInput2 = document.querySelector("button#" + id)
        /*set initial teacher to closed subs and closed subs adder (optional)
        subjects.style.display = "none"
        subjectsAdder.style.display = "none"*/
        
        var clicked = true
        teacherCheck.checked = true
        teacher.addEventListener("click", function() {
        // Your click event handler code goes here
        if (clicked === false) {
        subjects.style.display = "block";
        subjectsAdder.style.display = "block";
        teacherCheck.checked = true; // Check the checkbox
        clicked = true;
        }
        else if (clicked === true) {
        subjects.style.display = "none";
        subjectsAdder.style.display = "none";
        teacherCheck.checked = false; // Check the checkbox
        clicked = false;
        }
        });
       
    
        addInput2.addEventListener("click",function(){
       
        	if (input2.value.length > 0){
        		newSubject = document.createElement("li")
        		newSubject.innerHTML = input2.value
        		teacherAndSubjectsDict[uniqueID].push(input2.value)
        
        		subjects.appendChild(newSubject)
        		
        	}else{
        		alert("ERROR: subjects field cannot be empty");
        	}
        	input2.value = "";
     
        })
        
        //part 3 adding styles//
       
        
        teacherCheck.style.cssText = "float: right;"
        subjects.style.cssText ="list-style-type:disc;margin:0;padding:0;padding-left:20px;";
        teacher.style.cssText = "margin:0;padding:0;text-transform:uppercase;";
        input2.style.cssText = "border-radius:1vh;border:2px solid black;width:45vw;text-transform:uppercase;border-collapse:collapse;"
        addInput2.style.cssText = "color:green;border-radius:1.5vh;border:3px solid green;width:15vw;border-collapse:collapse;"
    } else {
        alert("ERROR:teachers name cannot be empty");
    }

    document.getElementById("teacherName").value = "";
}