var canvas_small = document.getElementById("canvas_small");
var context_small = canvas_small.getContext("2d");
var canvas_big = document.getElementById("canvas_big");
var context_big = canvas_big.getContext("2d");
var main_img = new Image();
var ratio;
var fil_name;
var data_small;
var data_big;
var savetype;
var focusnumb = 0;
var adsmeter = 0;

var outputsize;

if (localStorage.getItem("outputsize")) {
	outputsize = localStorage.getItem("outputsize");
} else {
	outputsize = "small";
}

var filterIDS = ["blur","brightness","bump","circlesmear","contrast","diffusion","dither","edge","emboss","exposure","gain","gamma","grayscale","hue","invert","kaleidoscope","lensdistortion","linesmear","maximum","median","minimum","noise","oil","opacity","pinch","pixelate","posterize","rgbadjust","saturation","sawtoothripple","sepia","sharpen","sineripple","solarize","sparkle","squaresmear","threshold","triangleripple","twirl","vignette","waterripple"];

var filterNames = ["Blur","Brightness","Bump","Circle Smear","Contrast","Diffusion","Dither","Edge","Emboss","Exposure","Gain","Gamma","Grayscale","Hue","Invert","Kaleidoscope","Lens Distortion","Line Smear","Maximum","Median","Minimum","Noise","Oil","Opacity","Pinch","Pixelation","Posterize","RGB Adjust","Saturation","Sawtooth Ripple","Sepia","Sharpen","Sine Ripple","Solarize","Sparkle","Square Smear","Threshold","Triangle Ripple","Twirl","Vignette","Water Ripple"];


var blur = [
["Amount (0-10)","0","10","0.1","3","blur","text"]
];

var brightness = [
["Brightness (-1 to 1)","-1","1","0.1","0","brightness","text"]
];

var bump=[];

var circlesmear = [
["Size (1-10)","1","10","0.1","4","size","text"],
["Density (0-1)","0","1","0.1","0.5","density","text"],
["Mix (0-1)","0","1","0.1","0.5","mix","text"]
];

var contrast = [
["Amount (0-2)","0","2","0.1","1","contrast","text"]
];

var diffusion = [
["Scale (1-100)","1","100","1","4","scale","text"]
];

var dither = [
["Levels (2-30)","2","30","1","3","levels","text"],
["Color","true","false","","true","color","checkbox"]
];

var edge = [];

var emboss = [
["Height (1-10)","1","10","0.1","1","height","text"],
["Angle (0-360)","0","360","5","135","angle","text"],
["Elevation (0-180)","0","180","2","30","elevation","text"]
];

var exposure =[
["Exposure (0-5)","0","5","0.1","1","exposure","text"]
];

var gain = [
["Gain (0-1)","0","1","0.1","0.5","gain","text"],
["Bias (0-1)","0","1","0.1","0.5","bias","text"]
];

var gamma = [
["Gamma (0-2)","0","2","0.1","1","gamma","text"]
];

var grayscale = [];

var hue = [
["Amount (-1 to 1)","-1","1","0.1","0","hue","text"]
];

var invert = [];

var kaleidoscope = [
["Angle (0-360)","0","360","5","0","angle","text"],
["Rotation (0-360)","0","360","5","0","rotation","text"],
["Sides (1-30)","1","30","1","3","sides","text"],
["CenterX (0-1)","0","1","0.1","0.5","centerX","text"],
["CenterY (0-1)","0","1","0.1","0.5","centerY","text"]
];

var lensdistortion = [
["Refraction (1-10)","1","10","0.5","1.5","refraction","text"],
["Radius (1-200)","1","200","2","50","radius","text"],
["CenterX (0-1)","0","1","0.1","0.5","centerX","text"],
["CenterY (0-1)","0","1","0.1","0.5","centerY","text"]
];

var linesmear = [
["Distance (1-30)","1","30","1","8","distance","text"],
["Density (0-1)","0","1","0.1","0.5","density","text"],
["Angle (0-360)","0","360","5","0","angle","text"],
["Mix (0-1)","0","1","0.1","0.5","mix","text"]
];

var maximum = [];

var median = [];

var minimum = [];

var noise = [
["Amount (0-100)","0","100","1","25","noise","text"],
["Density (0-1)","0","1","0.1","1","density","text"],
["Monochrome","true","false","","true","monochrome","checkbox"]
];

var oil = [
["Range (0-5)","0","5","0.1","3","range","text"]
];

var opacity = [
["Amount (0-1)","0","1","0.1","1","opacity","text"]
];

var pinch = [
["Amount (-1 to 1)","-1","1","0.1","0.5","pinch","text"],
["Radius (1-200)","1","200","2","100","radius","text"],
["Angle (0-360)","0","360","5","0","angle","text"],
["CenterX (0-1)","0","1","0.1","0.5","centerX","text"],
["CenterY (0-1)","0","1","0.1","0.5","centerY","text"]
];

var pixelate = [
["Size (1-50)","1","50","1","5","size","text"]
];

var posterize = [
["Levels (2-30)","2","30","1","6","levels","text"]
];

var rgbadjust = [
["Red (0-2)","0","2","0.1","1","red","text"],
["Green (0-2)","0","2","0.1","1","green","text"],
["Blue (0-2)","0","2","0.1","1","blue","text"]
];

var saturation = [
["Amount (0-2)","0","2","0.1","1","saturation","text"]
];

var sawtoothripple = [
["XAmplitude (0-30)","0","30","1","5","xAmplitude","text"],
["YAmplitude (0-30)","0","30","1","5","yAmplitude","text"],
["XWavelength (1-50)","1","50","1","16","xWavelength","text"],
["YWavelength (1-50)","1","50","1","16","yWavelength","text"]
];

var sepia = [
["Amount (0-30)","0","30","1","10","sepia","text"]
]

var sharpen = [];

var sineripple = [
["XAmplitude (0-30)","0","30","1","5","xAmplitude","text"],
["YAmplitude (0-30)","0","30","1","5","yAmplitude","text"],
["XWavelength (1-50)","1","50","1","16","xWavelength","text"],
["YWavelength (1-50)","1","50","1","16","yWavelength","text"]
];

var solarize = [];

var sparkle = [
["Rays (1-100)","1","100","1","50","rays","text"],
["Size (1-200)","1","200","2","25","size","text"],
["Amount (0-100)","0","100","1","50","sparkle","text"],
["Randomness (0-50)","0","50","1","25","randomness","text"],
["CenterX (0-1)","0","1","0.1","0.5","centerX","text"],
["CenterY (0-1)","0","1","0.1","0.5","centerY","text"]
];

var squaresmear = [
["Size (1-10)","1","10","0.1","4","size","text"],
["Density (0-1)","0","1","0.1","0.5","density","text"],
["Mix (0-1)","0","1","0.1","0.5","mix","text"]
];

var threshold = [
["Threshold (0-255)","0","255","2","127","threshold","text"]
];

var triangleripple = [
["XAmplitude (0-30)","0","30","1","5","xAmplitude","text"],
["YAmplitude (0-30)","0","30","1","5","yAmplitude","text"],
["XWavelength (1-50)","1","50","1","16","xWavelength","text"],
["YWavelength (1-50)","1","50","1","16","yWavelength","text"]
];

var twirl = [
["Radius (1-200)","1","200","2","100","radius","text"],
["Angle (0-360)","0","360","5","180","angle","text"],
["CenterX (0-1)","0","1","0.1","0.5","centerX","text"],
["CenterY (0-1)","0","1","0.1","0.5","centerY","text"]
];

var vignette = [
["Amount (0-1)","0","1","0.1","0.3","vignette","text"]
];

var waterripple = [
["Phase (0-100)","0","100","1","0","phase","text"],
["Radius (1-200)","1","200","2","50","radius","text"],
["Wavelength (1-100)","1","100","1","16","wavelength","text"],
["Amplitude (1-100)","1","100","1","10","amplitude","text"],
["CenterX (0-1)","0","1","0.1","0.5","centerX","text"],
["CenterY (0-1)","0","1","0.1","0.5","centerY","text"]
];



function createStartMenu() {
	
	var div = document.createElement("div");
	div.id="start";
	
	var table = document.createElement("table");
	table.classList.add("mtable");
	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	
	table.appendChild(tr1);
	table.appendChild(tr2);
	table.appendChild(tr3);

	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	var td3 = document.createElement("td");
	
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	tr3.appendChild(td3);
	
	var button1 = document.createElement("button");
	button1.id = "open";
	button1.setAttribute("tabIndex",0);
	button1.classList.add("items");
	button1.classList.add("inbut");
	button1.textContent = "Choose Image";
	td1.appendChild(button1);
	
	var button11 = document.createElement("button");
	button11.id = "settings";
	button11.setAttribute("tabIndex",1);
	button11.classList.add("items");
	button11.classList.add("inbut");
	button11.textContent = "Settings";
	td2.appendChild(button11);
	
	var button2 = document.createElement("button");
	button2.id = "help";
	button2.setAttribute("tabIndex",2);
	button2.classList.add("items");
	button2.classList.add("inbut");
	button2.textContent = "Help";
	td3.appendChild(button2);
	
	div.appendChild(table);
	document.body.appendChild(div);
	
	document.querySelectorAll('.items')[0].focus();
}

function rightMenu() {
	var div = document.createElement("div");
	div.id="rightMenu";
	var span = document.createElement("span");
	span.id="my_span";
	span.innerHTML="Effects and Filters";
	div.appendChild(span);
	
	var div1 = document.createElement("div");
	div1.id="filterList";
	div.appendChild(div1);
	
	for (var i=0;i<filterIDS.length;i++) {
		
	var button = document.createElement("button");
	button.id = filterIDS[i];
	button.setAttribute("tabIndex",i);
	button.classList.add("items");
	button.classList.add("smallbutton");
	button.textContent = filterNames[i];
	div1.appendChild(button);
		
	}
	
	document.body.appendChild(div);
	div.classList.add("moveleft");
	div1.classList.add("moveleft");
	
	document.getElementById("right").style.transform = "scaleX(1)";
	
	
}


document.getElementById("uploadImage").addEventListener("change", (event) => {
	
        var oFReader = new FileReader();
		
		pls_wait("<br><br>Please<br>wait...");
		setTimeout(() => { 	oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]); }, 1100);
		
		savetype = document.getElementById("uploadImage").files[0].name.slice(document.getElementById("uploadImage").files[0].name.lastIndexOf(".")+1).toLowerCase();
		
		if (document.getElementById("start"))  {
			document.getElementById("start").remove();
			document.getElementById("download").hidden=false;
			document.getElementById("right").hidden=false;
			}
		
        oFReader.onload = function (oFREvent) {
			
			canvas_small.hidden=false;
			main_img.src = oFREvent.target.result;
			main_img.onerror = function(){	
			alert("The file is corrupt or has an incorrect extension!");	
			
			if (!document.getElementById("start"))  {
				createStartMenu();
				document.getElementById("download").hidden=true;
				document.getElementById("right").hidden=true;
				}
			};
			
			 main_img.onload = function(){
				 
				if (document.getElementById("wait")) {
					document.getElementById("wait").remove();
				}
				//-------------small-------------
				var img_small_width;
				var img_small_height;
				
				if (main_img.width/main_img.height>0.75) {
					
				var img_small_width = 240;
				var img_small_height = Math.round((240*main_img.height)/main_img.width);
				ratio = main_img.width/240;
				
				canvas_small.style.top = Math.round((320-img_small_height)/2)+"px";
					
				} else {
					
				var img_small_height = 320;
				var img_small_width = Math.round((320*main_img.width)/main_img.height);
				ratio = main_img.height/320;
				
				canvas_small.style.left = Math.round((240-img_small_width)/2)+"px";
					
				}
				 
				canvas_small.width = img_small_width;
				canvas_small.height = img_small_height;
				context_small.drawImage(main_img, 0, 0, img_small_width, img_small_height);
				//-------------small-------------
				
				//-------------big-------------
				if (outputsize=="big") {
				canvas_big.width = main_img.width;
				canvas_big.height = main_img.height;
				context_big.drawImage(main_img, 0, 0, main_img.width, main_img.height);
				} else {
				ratio = 1;
				canvas_big.width = img_small_width;
				canvas_big.height = img_small_height;
				context_big.drawImage(main_img, 0, 0, img_small_width, img_small_height);
				}
				//-------------big-------------
				
			if (adsmeter%3==0) { start_KaiAds(); }
			adsmeter++;
			}
			
        };
});

	
function save() {
  document.removeEventListener('keydown', handleKeydown);
  pls_wait("<br><br>Download<br>started");	
	
  var img2;
	
  var date = new Date();
  var year = date.getFullYear()+"";
  year = year.slice(2);
  var month = date.getMonth()+1;
  month = month < 10 ? "0" + month : month;
  var day = date.getDate();
  day = day < 10 ? "0" + day : day;
  var hour = date.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  
  
  var res = "filter-"+year+month+day+"-"+hour+minute+second;
  
  if (savetype=="png") {
  img2 = canvas_big.toDataURL("image/png"); 
  document.getElementById("link").download=res+".png"; 
  } else {
  img2 = canvas_big.toDataURL("image/jpeg");
  document.getElementById("link").download=res+".jpg";
  }
  
  setTimeout(() => {  
	  document.getElementById("link").href=img2;
      document.getElementById("link").click();
	  document.addEventListener('keydown', handleKeydown);
	  if (document.getElementById("wait")) { document.getElementById("wait").remove();}
	  }, 1200);
	}
	
function handleKeydown(e) {
  switch(e.key) {
    case 'ArrowUp':
      nav(-1);
      break;
    case 'ArrowDown':
      nav(1);
      break;
    case 'ArrowRight':
      ch_am(1);
      break;
    case 'ArrowLeft': 
      ch_am(-1);
      break;
    case 'SoftLeft':
      softkeyCallback.left();
      break;
    case 'SoftRight':
      softkeyCallback.right();
      break;
    case 'Enter':
      softkeyCallback.center();
      break;	
	case 'Backspace':
	  e.preventDefault(); 
	  e.stopPropagation();
	  if (!document.getElementById("start")) {
	  if (window.confirm("Are you sure you want to exit to the main menu? All unsaved progress will be lost")) {
	  if (document.getElementById("wait")) { document.getElementById("wait").remove(); }
      if (document.getElementById("rightMenu")) {document.getElementById("rightMenu").remove();}
	  context_small.clearRect(0, 0, canvas_small.width, canvas_small.height);
	  createStartMenu();
	  }
	  } else {
		  if (window.confirm("Are you sure you want to exit?")) { window.close(); } 
	  }
	break;
  }
};

function nav (move) {
  if (document.getElementById("start") || document.getElementById("rightMenu").className.indexOf("moveleft")!=-1) {
  var currentIndex = document.activeElement.tabIndex;
  var items = document.querySelectorAll('.items');
  var next = currentIndex + move;
  if (next>items.length-1) {next=items.length-1;} else if (next<0) {next=0;}
  var targetElement = items[next];
  targetElement.focus();
  }
};

function ch_am (move) {
  if (document.getElementById("rightMenu").className.indexOf("moveleft")!=-1) {
  var id = document.activeElement.id;
  if (id.indexOf("amount")!=-1) {
	  var val = +document.activeElement.value;
	  var step = +document.activeElement.getAttribute("step");
	  var min = +document.activeElement.getAttribute("min");
	  var max = +document.activeElement.getAttribute("max");
	  if ((val + (move*step))>=min && (val + (move*step))<=max) {
	  val = val + (move*step); }
	  if (step<1) {
	  val=val.toFixed(1);
	  } else {
		val=val.toFixed();
	  }
	  document.activeElement.value=val;
  }
	}
};



const softkeyCallback = {
    left: function() { 
		if (document.getElementById("download").hidden==false) {
			save();
		}
     },
  
    center: function() { 
	if (document.getElementById("start") || document.getElementById("rightMenu").className.indexOf("moveleft")!=-1) {
	var chk = document.activeElement;
	
	if (chk.getAttribute("type")=="checkbox") { 
	 if (chk.checked) {chk.checked=false; } else { chk.checked=true; }
	}
	
	if (chk.id=="open") { document.getElementById("uploadImage").click(); }
	
	if (chk.id=="settings") { window.open("set.html","_self"); }
	if (chk.id=="help") { window.open("help.html","_self"); }
	
	if (chk.id=="blur") { formation(blur,chk.id); }
	if (chk.id=="waterripple") { formation(waterripple,chk.id); }
	if (chk.id=="brightness") { formation(brightness,chk.id); }
	if (chk.id=="bump") { formation(bump,chk.id); }
	if (chk.id=="circlesmear") { formation(circlesmear,chk.id); }
	if (chk.id=="contrast") { formation(contrast,chk.id); }
	if (chk.id=="diffusion") { formation(diffusion,chk.id); }
	if (chk.id=="dither") { formation(dither,chk.id); }
	if (chk.id=="edge") { formation(edge,chk.id); }
	if (chk.id=="emboss") { formation(emboss,chk.id); }
	if (chk.id=="exposure") { formation(exposure,chk.id); }
	if (chk.id=="gain") { formation(gain,chk.id); }
	if (chk.id=="gamma") { formation(gamma,chk.id); }
	if (chk.id=="grayscale") { formation(grayscale,chk.id); }
	if (chk.id=="hue") { formation(hue,chk.id); }
	if (chk.id=="invert") { formation(invert,chk.id); }
	if (chk.id=="kaleidoscope") { formation(kaleidoscope,chk.id); }
	if (chk.id=="lensdistortion") { formation(lensdistortion,chk.id); }
	if (chk.id=="linesmear") { formation(linesmear,chk.id); }
	if (chk.id=="maximum") { formation(maximum,chk.id); }
	if (chk.id=="median") { formation(median,chk.id); }
	if (chk.id=="minimum") { formation(minimum,chk.id); }
	if (chk.id=="noise") { formation(noise,chk.id); }
	if (chk.id=="oil") { formation(oil,chk.id); }
	if (chk.id=="opacity") { formation(opacity,chk.id); }
	if (chk.id=="pinch") { formation(pinch,chk.id); }
	if (chk.id=="pixelate") { formation(pixelate,chk.id); }
	if (chk.id=="posterize") { formation(posterize,chk.id); }
	if (chk.id=="rgbadjust") { formation(rgbadjust,chk.id); }
	if (chk.id=="saturation") { formation(saturation,chk.id); }
	if (chk.id=="sawtoothripple") { formation(sawtoothripple,chk.id); }
	if (chk.id=="sepia") { formation(sepia,chk.id); }
	if (chk.id=="sharpen") { formation(sharpen,chk.id); }
	if (chk.id=="sineripple") { formation(sineripple,chk.id); }
	if (chk.id=="solarize") { formation(solarize,chk.id); }
	if (chk.id=="sparkle") { formation(sparkle,chk.id); }
	if (chk.id=="squaresmear") { formation(squaresmear,chk.id); }
	if (chk.id=="threshold") { formation(threshold,chk.id); }
	if (chk.id=="triangleripple") { formation(triangleripple,chk.id); }
	if (chk.id=="twirl") { formation(twirl,chk.id); }
	if (chk.id=="vignette") { formation(vignette,chk.id); }

	if (chk.id=="discard") {
		context_small.clearRect(0, 0, canvas_small.width, canvas_small.height);
		context_small.drawImage(main_img, 0, 0, canvas_small.width, canvas_small.height);
		document.getElementById("discard").textContent="Preview";
		document.getElementById("discard").id="preview_"+fil_name;
	} else if (chk.id.indexOf("preview")!=-1) {
		preview();
	}
	
	if (chk.id.indexOf("apply")!=-1) {
	    softkeyCallback.right();
		pls_wait("<br><br>Please<br>wait...");
		setTimeout(() => { 	apply(); rewrite_f_list();}, 1100);
	}
	
	if (chk.id=="back") {
		back();
	}
	
	}

      },
  
    right: function() { 
	
	   if (!document.getElementById("start") && !document.getElementById("rightMenu")) { 
	   rightMenu(); 
	   document.removeEventListener('keydown', handleKeydown);
	   setTimeout(() => { document.addEventListener('keydown', handleKeydown); }, 1000)
	   } else {
		   
	   if (document.getElementById("rightMenu") && document.getElementById("rightMenu").className.indexOf("moveleft")!=-1) {
		document.getElementById("rightMenu").classList.remove("moveleft");
		document.getElementById("filterList").classList.remove("moveleft");
		document.getElementById("rightMenu").style.left = "40px";
		document.getElementById("filterList").style.left = "40px";
		document.getElementById("rightMenu").classList.add("moveright");
		document.getElementById("filterList").classList.add("moveright");
		document.getElementById("right").style.transform = "scaleX(-1)";
		document.removeEventListener('keydown', handleKeydown);
		setTimeout(() => { 
		document.addEventListener('keydown', handleKeydown); 
		}, 1000)
		
	   } else if (document.getElementById("rightMenu") && document.getElementById("rightMenu").className.indexOf("moveright")!=-1) {
		document.getElementById("rightMenu").classList.remove("moveright");
		document.getElementById("filterList").classList.remove("moveright");
		document.getElementById("rightMenu").style.left = "240px";
		document.getElementById("filterList").style.left = "240px";
		document.getElementById("rightMenu").classList.add("moveleft");
		document.getElementById("filterList").classList.add("moveleft");
		document.getElementById("right").style.transform = "scaleX(1)";
		document.removeEventListener('keydown', handleKeydown);
		setTimeout(() => { 
		document.addEventListener('keydown', handleKeydown); 
		}, 1000)
		
	   }
	}
		   
	   
	   
     }
};

document.addEventListener('keydown', handleKeydown);

function formation(arrname,name) {
	focusnumb = filterIDS.indexOf(name);
	document.getElementById("filterList").innerHTML="";
	document.getElementById("my_span").innerHTML="<u>"+filterNames[focusnumb]+"</u>";
	
	var table1 = document.createElement("table");
	table1.classList.add("table_u");
	
	var tbx=0;
	
	for (var i=0;i<arrname.length;i++) {
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	td1.classList.add("td60");
	td2.classList.add("td40");	
	var div = document.createElement("div");
	div.innerHTML=arrname[i][0];
	div.classList.add("smalldiv");
	td1.appendChild(div);	
	
	if (arrname[i][6]=="text") {
	var input = document.createElement("input");
    input.setAttribute("type", "text");
	input.setAttribute("min", arrname[i][1]);
	input.setAttribute("max", arrname[i][2]);
	input.setAttribute("step", arrname[i][3]);
	input.readOnly = true;
	input.setAttribute("tabIndex",tbx);
	input.classList.add("items");
	input.value = arrname[i][4];
	input.id = "amount_"+arrname[i][5];
	td2.appendChild(input);
	} else {
	var checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("tabIndex",tbx);
    checkbox.classList.add("items");	
	checkbox.id = "amount_"+arrname[i][5];
	checkbox.checked = arrname[i][4];
	td2.appendChild(checkbox);
	}
	
	tbx++;
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	table1.appendChild(tr);
	}
	
	var table2 = document.createElement("table");
	table2.classList.add("table_d");
	var tr21 = document.createElement("tr");
	var tr22 = document.createElement("tr");
	var tr23 = document.createElement("tr");
	var td21 = document.createElement("td");
	var td22 = document.createElement("td");
	var td23 = document.createElement("td");
	
	table2.appendChild(tr21);
	table2.appendChild(tr22);
	table2.appendChild(tr23);
	tr21.appendChild(td21);
	tr22.appendChild(td22);
	tr23.appendChild(td23);

	
	var button1 = document.createElement("button");
	button1.id = "preview_"+name;
	button1.setAttribute("tabIndex",tbx);
	button1.classList.add("items");
	button1.classList.add("smallbutton2");
	button1.textContent = "Preview";
	
	var button2 = document.createElement("button");
	button2.id = "apply_"+name;
	button2.setAttribute("tabIndex",tbx+1);
	button2.classList.add("items");
	button2.classList.add("smallbutton2");
	button2.textContent = "Apply";
	
	var button3 = document.createElement("button");
	button3.id = "back";
	button3.setAttribute("tabIndex",tbx+2);
	button3.classList.add("items");
	button3.classList.add("smallbutton2");
	button3.textContent = "Back";
	
	td21.appendChild(button1);
	td22.appendChild(button2);
	td23.appendChild(button3);
	
	document.getElementById("filterList").appendChild(table1);
	document.getElementById("filterList").appendChild(table2);
	
    document.querySelectorAll('.items')[0].focus();
}

function preview() {
	fil_name = document.activeElement.id.slice(document.activeElement.id.indexOf("_")+1);
	data_small = context_small.getImageData(0,0,canvas_small.width, canvas_small.height);
	
	if (fil_name=="blur") {
	var amount_blur = +document.getElementById("amount_blur").value;
	JSManipulate.blur.filter(data_small, {amount: amount_blur}); 
	}
	
	if (fil_name=="brightness") {
	var amount_brightness = +document.getElementById("amount_brightness").value;
	JSManipulate.brightness.filter(data_small, {amount: amount_brightness}); 
	}
	
	if (fil_name=="bump") {
	JSManipulate.bump.filter(data_small); 
	}
	
	if (fil_name=="circlesmear") {
	var amount_size = +document.getElementById("amount_size").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_mix = +document.getElementById("amount_mix").value;
	JSManipulate.circlesmear.filter(data_small, {size: amount_size, density: amount_density, mix: amount_mix}); 
	}
	
	if (fil_name=="contrast") {
	var amount_contrast = +document.getElementById("amount_contrast").value;
	JSManipulate.contrast.filter(data_small, {amount: amount_contrast}); 
	}
	
	if (fil_name=="diffusion") {
	var amount_scale = +document.getElementById("amount_scale").value;
	JSManipulate.diffusion.filter(data_small, {scale: amount_scale}); 
	}
	
	if (fil_name=="dither") {
	var amount_levels = +document.getElementById("amount_levels").value;
	var amount_color = document.getElementById("amount_color").checked;
	JSManipulate.dither.filter(data_small, {levels: amount_levels, color: amount_color}); 
	}
	
	if (fil_name=="edge") {
	JSManipulate.edge.filter(data_small); 
	}
	
	if (fil_name=="emboss") {
	var amount_height = +document.getElementById("amount_height").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_elevation = +document.getElementById("amount_elevation").value;
	JSManipulate.emboss.filter(data_small, {height: amount_height, angle: amount_angle, elevation: amount_elevation}); 
	}
	
	if (fil_name=="exposure") {
	var amount_exposure = +document.getElementById("amount_exposure").value;
	JSManipulate.exposure.filter(data_small, {exposure: amount_exposure}); 
	}
	
	if (fil_name=="gain") {
	var amount_gain = +document.getElementById("amount_gain").value;
	var amount_bias = +document.getElementById("amount_bias").value;
	JSManipulate.gain.filter(data_small, {gain: amount_gain, bias: amount_bias}); 
	}
	
	if (fil_name=="gamma") {
	var amount_gamma = +document.getElementById("amount_gamma").value;
	JSManipulate.gamma.filter(data_small, {amount: amount_gamma}); 
	}
	
	if (fil_name=="grayscale") {
	JSManipulate.grayscale.filter(data_small); 
	}
	
	if (fil_name=="hue") {
	var amount_hue = +document.getElementById("amount_hue").value;
	JSManipulate.hue.filter(data_small, {amount: amount_hue}); 
	}
	
	if (fil_name=="invert") {
	JSManipulate.invert.filter(data_small); 
	}
	
	if (fil_name=="kaleidoscope") {
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_rotation = +document.getElementById("amount_rotation").value;
	var amount_sides = +document.getElementById("amount_sides").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.kaleidoscope.filter(data_small, {angle: amount_angle, rotation: amount_rotation, sides: amount_sides, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="lensdistortion") {
	var amount_refraction = +document.getElementById("amount_refraction").value;
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.lensdistortion.filter(data_small, {refraction: amount_refraction, radius: amount_radius, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="linesmear") {
	var amount_distance = +document.getElementById("amount_distance").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_mix = +document.getElementById("amount_mix").value;
	JSManipulate.linesmear.filter(data_small, {distance: amount_distance, density: amount_density, angle: amount_angle, mix: amount_mix}); 
	}
	
	if (fil_name=="maximum") {
	JSManipulate.maximum.filter(data_small); 
	}
	
	if (fil_name=="median") {
	JSManipulate.median.filter(data_small); 
	}
	
	if (fil_name=="minimum") {
	JSManipulate.minimum.filter(data_small); 
	}
	
	if (fil_name=="noise") {
	var amount_noise = +document.getElementById("amount_noise").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_monochrome = document.getElementById("amount_monochrome").checked;
	JSManipulate.noise.filter(data_small, {amount: amount_noise, density: amount_density, monochrome: amount_monochrome}); 
	}
	
	if (fil_name=="oil") {
	var amount_range = +document.getElementById("amount_range").value;
	JSManipulate.oil.filter(data_small, {range: amount_range}); 
	}
	
	if (fil_name=="opacity") {
	var amount_opacity = +document.getElementById("amount_opacity").value;
	JSManipulate.opacity.filter(data_small, {amount: amount_opacity}); 
	}
	
	if (fil_name=="pinch") {
	var amount_pinch = +document.getElementById("amount_pinch").value;
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.pinch.filter(data_small, {amount: amount_pinch, radius: amount_radius, angle: amount_angle, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="pixelate") {
	var amount_size = +document.getElementById("amount_size").value;
	JSManipulate.pixelate.filter(data_small, {size: amount_size}); 
	}
	
	if (fil_name=="posterize") {
	var amount_levels = +document.getElementById("amount_levels").value;
	JSManipulate.posterize.filter(data_small, {levels: amount_levels}); 
	}
	
	if (fil_name=="rgbadjust") {
	var amount_red = +document.getElementById("amount_red").value;
	var amount_green = +document.getElementById("amount_green").value;
	var amount_blue = +document.getElementById("amount_blue").value;
	JSManipulate.rgbadjust.filter(data_small, {red: amount_red, green: amount_green, blue: amount_blue}); 
	}
	
	if (fil_name=="saturation") {
	var amount_saturation = +document.getElementById("amount_saturation").value;
	JSManipulate.saturation.filter(data_small, {amount: amount_saturation}); 
	}
	
	if (fil_name=="sawtoothripple") {
	var amount_xAmplitude = +document.getElementById("amount_xAmplitude").value;
	var amount_yAmplitude = +document.getElementById("amount_yAmplitude").value;
	var amount_xWavelength = +document.getElementById("amount_xWavelength").value;
	var amount_yWavelength = +document.getElementById("amount_yWavelength").value;
	JSManipulate.sawtoothripple.filter(data_small, {xAmplitude: amount_xAmplitude, yAmplitude: amount_yAmplitude, xWavelength: amount_xWavelength, yWavelength: amount_yWavelength}); 
	}
	
	if (fil_name=="sepia") {
	var amount_sepia = +document.getElementById("amount_sepia").value;
	JSManipulate.sepia.filter(data_small, {amount: amount_sepia}); 
	}
	
	if (fil_name=="sharpen") {
	JSManipulate.sharpen.filter(data_small); 
	}
	
	if (fil_name=="sineripple") {
	var amount_xAmplitude = +document.getElementById("amount_xAmplitude").value;
	var amount_yAmplitude = +document.getElementById("amount_yAmplitude").value;
	var amount_xWavelength = +document.getElementById("amount_xWavelength").value;
	var amount_yWavelength = +document.getElementById("amount_yWavelength").value;
	JSManipulate.sineripple.filter(data_small, {xAmplitude: amount_xAmplitude, yAmplitude: amount_yAmplitude, xWavelength: amount_xWavelength, yWavelength: amount_yWavelength}); 
	}
	
	if (fil_name=="solarize") {
	JSManipulate.solarize.filter(data_small); 
	}
	
	if (fil_name=="sparkle") {
	var amount_rays = +document.getElementById("amount_rays").value;
	var amount_size = +document.getElementById("amount_size").value;
	var amount_sparkle = +document.getElementById("amount_sparkle").value;
	var amount_randomness = +document.getElementById("amount_randomness").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.sparkle.filter(data_small, {rays: amount_rays, size: amount_size, amount: amount_sparkle, randomness: amount_randomness, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="squaresmear") {
	var amount_size = +document.getElementById("amount_size").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_mix = +document.getElementById("amount_mix").value;
	JSManipulate.squaresmear.filter(data_small, {size: amount_size, density: amount_density, mix: amount_mix}); 
	}
	
	if (fil_name=="threshold") {
	var amount_threshold = +document.getElementById("amount_threshold").value;
	JSManipulate.threshold.filter(data_small, {threshold: amount_threshold}); 
	}
	
	if (fil_name=="triangleripple") {
	var amount_xAmplitude = +document.getElementById("amount_xAmplitude").value;
	var amount_yAmplitude = +document.getElementById("amount_yAmplitude").value;
	var amount_xWavelength = +document.getElementById("amount_xWavelength").value;
	var amount_yWavelength = +document.getElementById("amount_yWavelength").value;
	JSManipulate.triangleripple.filter(data_small, {xAmplitude: amount_xAmplitude, yAmplitude: amount_yAmplitude, xWavelength: amount_xWavelength, yWavelength: amount_yWavelength}); 
	}
	
	if (fil_name=="twirl") {
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.twirl.filter(data_small, {radius: amount_radius, angle: amount_angle, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="vignette") {
	var amount_vignette = +document.getElementById("amount_vignette").value;
	JSManipulate.vignette.filter(data_small, {amount: amount_vignette}); 
	}
	
	if (fil_name=="waterripple") {
	var amount_phase = +document.getElementById("amount_phase").value;
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_wavelength = +document.getElementById("amount_wavelength").value;
	var amount_amplitude = +document.getElementById("amount_amplitude").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.waterripple.filter(data_small, {phase: amount_phase, radius: amount_radius, wavelength: amount_wavelength, amplitude: amount_amplitude, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	document.activeElement.id = "discard";
	document.getElementById("discard").textContent="Discard";
	
	context_small.putImageData(data_small,0,0);
}

function apply() {
	fil_name = document.activeElement.id.slice(document.activeElement.id.indexOf("_")+1);
	context_big.clearRect(0, 0, canvas_big.width, canvas_big.height);
	context_big.drawImage(main_img, 0, 0, canvas_big.width, canvas_big.height);
	data_big = context_big.getImageData(0,0,canvas_big.width, canvas_big.height);
	
	
	if (fil_name=="blur") {
	var amount_blur = +document.getElementById("amount_blur").value;
	JSManipulate.blur.filter(data_big, {amount: amount_blur}); 
	}
	
	if (fil_name=="brightness") {
	var amount_brightness = +document.getElementById("amount_brightness").value;
	JSManipulate.brightness.filter(data_big, {amount: amount_brightness}); 
	}
	
	if (fil_name=="bump") {
	JSManipulate.bump.filter(data_big); 
	}
	
	if (fil_name=="circlesmear") {
	var amount_size = +document.getElementById("amount_size").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_mix = +document.getElementById("amount_mix").value;
	JSManipulate.circlesmear.filter(data_big, {size: amount_size*ratio, density: amount_density, mix: amount_mix}); 
	}
	
	if (fil_name=="contrast") {
	var amount_contrast = +document.getElementById("amount_contrast").value;
	JSManipulate.contrast.filter(data_big, {amount: amount_contrast}); 
	}
	
	if (fil_name=="diffusion") {
	var amount_scale = +document.getElementById("amount_scale").value;
	JSManipulate.diffusion.filter(data_big, {scale: amount_scale*ratio}); 
	}
	
	if (fil_name=="dither") {
	var amount_levels = +document.getElementById("amount_levels").value;
	var amount_color = document.getElementById("amount_color").checked;
	JSManipulate.dither.filter(data_big, {levels: amount_levels, color: amount_color}); 
	}
	
	if (fil_name=="edge") {
	JSManipulate.edge.filter(data_big); 
	}
	
	if (fil_name=="emboss") {
	var amount_height = +document.getElementById("amount_height").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_elevation = +document.getElementById("amount_elevation").value;
	JSManipulate.emboss.filter(data_big, {height: amount_height*ratio, angle: amount_angle, elevation: amount_elevation}); 
	}
	
	if (fil_name=="exposure") {
	var amount_exposure = +document.getElementById("amount_exposure").value;
	JSManipulate.exposure.filter(data_big, {exposure: amount_exposure}); 
	}
	
	if (fil_name=="gain") {
	var amount_gain = +document.getElementById("amount_gain").value;
	var amount_bias = +document.getElementById("amount_bias").value;
	JSManipulate.gain.filter(data_big, {gain: amount_gain, bias: amount_bias}); 
	}
	
	if (fil_name=="gamma") {
	var amount_gamma = +document.getElementById("amount_gamma").value;
	JSManipulate.gamma.filter(data_big, {amount: amount_gamma}); 
	}
	
	if (fil_name=="grayscale") {
	JSManipulate.grayscale.filter(data_big); 
	}
	
	if (fil_name=="hue") {
	var amount_hue = +document.getElementById("amount_hue").value; 
	JSManipulate.hue.filter(data_big, {amount: amount_hue});  
	}
	
	if (fil_name=="invert") {
	JSManipulate.invert.filter(data_big);  
	}
	
	if (fil_name=="kaleidoscope") {
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_rotation = +document.getElementById("amount_rotation").value;
	var amount_sides = +document.getElementById("amount_sides").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.kaleidoscope.filter(data_big, {angle: amount_angle, rotation: amount_rotation, sides: amount_sides, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="lensdistortion") {
	var amount_refraction = +document.getElementById("amount_refraction").value;
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.lensdistortion.filter(data_big, {refraction: amount_refraction, radius: amount_radius*ratio, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="linesmear") {
	var amount_distance = +document.getElementById("amount_distance").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_mix = +document.getElementById("amount_mix").value;
	JSManipulate.linesmear.filter(data_big, {distance: amount_distance*ratio, density: amount_density, angle: amount_angle, mix: amount_mix}); 
	}
	
	if (fil_name=="maximum") {
	JSManipulate.maximum.filter(data_big); 
	}
	
	if (fil_name=="median") {
	JSManipulate.median.filter(data_big); 
	}
	
	if (fil_name=="minimum") {
	JSManipulate.minimum.filter(data_big); 
	}
	
	if (fil_name=="noise") {
	var amount_noise = +document.getElementById("amount_noise").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_monochrome = document.getElementById("amount_monochrome").checked;
	JSManipulate.noise.filter(data_big, {amount: amount_noise*ratio, density: amount_density, monochrome: amount_monochrome}); 
	}
	
	if (fil_name=="oil") {
	var amount_range = +document.getElementById("amount_range").value;
	JSManipulate.oil.filter(data_big, {range: amount_range}); 
	}
	
	if (fil_name=="opacity") {
	var amount_opacity = +document.getElementById("amount_opacity").value;
	JSManipulate.opacity.filter(data_big, {amount: amount_opacity}); 
	}
	
	if (fil_name=="pinch") {
	var amount_pinch = +document.getElementById("amount_pinch").value;
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.pinch.filter(data_big, {amount: amount_pinch, radius: amount_radius*ratio, angle: amount_angle, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="pixelate") {
	var amount_size = +document.getElementById("amount_size").value;
	JSManipulate.pixelate.filter(data_big, {size: amount_size*ratio}); 
	}
	
	if (fil_name=="posterize") {
	var amount_levels = +document.getElementById("amount_levels").value;
	JSManipulate.posterize.filter(data_big, {levels: amount_levels}); 
	}
	
	if (fil_name=="rgbadjust") {
	var amount_red = +document.getElementById("amount_red").value;
	var amount_green = +document.getElementById("amount_green").value;
	var amount_blue = +document.getElementById("amount_blue").value;
	JSManipulate.rgbadjust.filter(data_big, {red: amount_red, green: amount_green, blue: amount_blue}); 
	}
	
	if (fil_name=="saturation") {
	var amount_saturation = +document.getElementById("amount_saturation").value;
	JSManipulate.saturation.filter(data_big, {amount: amount_saturation}); 
	}
	
	if (fil_name=="sawtoothripple") {
	var amount_xAmplitude = +document.getElementById("amount_xAmplitude").value;
	var amount_yAmplitude = +document.getElementById("amount_yAmplitude").value;
	var amount_xWavelength = +document.getElementById("amount_xWavelength").value;
	var amount_yWavelength = +document.getElementById("amount_yWavelength").value;
	JSManipulate.sawtoothripple.filter(data_big, {xAmplitude: amount_xAmplitude*ratio, yAmplitude: amount_yAmplitude*ratio, xWavelength: amount_xWavelength*ratio, yWavelength: amount_yWavelength*ratio}); 
	}
	
	if (fil_name=="sepia") {
	var amount_sepia = +document.getElementById("amount_sepia").value;
	JSManipulate.sepia.filter(data_big, {amount: amount_sepia}); 
	}
	
	if (fil_name=="sharpen") {
	JSManipulate.sharpen.filter(data_big); 
	}
	
	if (fil_name=="sineripple") {
	var amount_xAmplitude = +document.getElementById("amount_xAmplitude").value;
	var amount_yAmplitude = +document.getElementById("amount_yAmplitude").value;
	var amount_xWavelength = +document.getElementById("amount_xWavelength").value;
	var amount_yWavelength = +document.getElementById("amount_yWavelength").value;
	JSManipulate.sineripple.filter(data_big, {xAmplitude: amount_xAmplitude*ratio, yAmplitude: amount_yAmplitude*ratio, xWavelength: amount_xWavelength*ratio, yWavelength: amount_yWavelength*ratio}); 
	}
	
	if (fil_name=="solarize") {
	JSManipulate.solarize.filter(data_big); 
	}
	
	if (fil_name=="sparkle") {
	var amount_rays = +document.getElementById("amount_rays").value;
	var amount_size = +document.getElementById("amount_size").value;
	var amount_sparkle = +document.getElementById("amount_sparkle").value;
	var amount_randomness = +document.getElementById("amount_randomness").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.sparkle.filter(data_big, {rays: amount_rays, size: amount_size*ratio, amount: amount_sparkle, randomness: amount_randomness, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="squaresmear") {
	var amount_size = +document.getElementById("amount_size").value;
	var amount_density = +document.getElementById("amount_density").value;
	var amount_mix = +document.getElementById("amount_mix").value;
	JSManipulate.squaresmear.filter(data_big, {size: amount_size*ratio, density: amount_density, mix: amount_mix}); 
	}
	
	if (fil_name=="threshold") {
	var amount_threshold = +document.getElementById("amount_threshold").value;
	JSManipulate.threshold.filter(data_big, {threshold: amount_threshold}); 
	}
	
	if (fil_name=="triangleripple") {
	var amount_xAmplitude = +document.getElementById("amount_xAmplitude").value;
	var amount_yAmplitude = +document.getElementById("amount_yAmplitude").value;
	var amount_xWavelength = +document.getElementById("amount_xWavelength").value;
	var amount_yWavelength = +document.getElementById("amount_yWavelength").value;
	JSManipulate.triangleripple.filter(data_big, {xAmplitude: amount_xAmplitude*ratio, yAmplitude: amount_yAmplitude*ratio, xWavelength: amount_xWavelength*ratio, yWavelength: amount_yWavelength*ratio}); 
	}
	
	if (fil_name=="twirl") {
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_angle = +document.getElementById("amount_angle").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.twirl.filter(data_big, {radius: amount_radius*ratio, angle: amount_angle, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (fil_name=="vignette") {
	var amount_vignette = +document.getElementById("amount_vignette").value;
	JSManipulate.vignette.filter(data_big, {amount: amount_vignette}); 
	}
	
	if (fil_name=="waterripple") {
	var amount_phase = +document.getElementById("amount_phase").value;
	var amount_radius = +document.getElementById("amount_radius").value;
	var amount_wavelength = +document.getElementById("amount_wavelength").value;
	var amount_amplitude = +document.getElementById("amount_amplitude").value;
	var amount_centerX = +document.getElementById("amount_centerX").value;
	var amount_centerY = +document.getElementById("amount_centerY").value;
	JSManipulate.waterripple.filter(data_big, {phase: amount_phase, radius: amount_radius*ratio, wavelength: amount_wavelength*ratio, amplitude: amount_amplitude, centerX: amount_centerX, centerY: amount_centerY}); 
	}
	
	if (document.getElementById("discard")) {
	document.getElementById("discard").textContent="Preview";
	document.getElementById("discard").id="preview_"+fil_name;
	}
	
	context_big.putImageData(data_big,0,0);
	main_img.src = canvas_big.toDataURL();

}

function back() {
	rewrite_f_list();
	context_small.clearRect(0, 0, canvas_small.width, canvas_small.height);
	context_small.drawImage(main_img, 0, 0, canvas_small.width, canvas_small.height);
}

function rewrite_f_list() {
	document.getElementById("filterList").innerHTML="";
	document.getElementById("my_span").innerHTML="Effects and Filters";
	
	for (var i=0;i<filterIDS.length;i++) {
	var button = document.createElement("button");
	button.id = filterIDS[i];
	button.setAttribute("tabIndex",i);
	button.classList.add("items");
	button.classList.add("smallbutton");
	button.textContent = filterNames[i];
	document.getElementById("filterList").appendChild(button);
	}
	
	document.querySelectorAll('.items')[focusnumb].focus();
}

function pls_wait(text) {
	var divw = document.createElement("div");
	divw.id="wait";
	divw.innerHTML=text;
	document.body.appendChild(divw);
}

function start_KaiAds() {
	getKaiAd({
	publisher: 'ef30ef98-e411-4952-89b7-4cf1e1bb4437',
	app: 'filter',
	slot: 'fullscreen',
	test: 0,
	onerror: err => console.error('Custom catch:', err),
	onready: ad => {
		ad.call('display')
		
		// user clicked the ad
		ad.on('click', () => console.log('click event') )

		// user closed the ad (currently only with fullscreen)
		ad.on('close', () => document.addEventListener('keydown', handleKeydown) )

		// the ad succesfully displayed
		ad.on('display', () => document.removeEventListener('keydown', handleKeydown) )
	}
})
}

createStartMenu();