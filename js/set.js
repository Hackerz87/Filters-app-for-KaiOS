var outputsize;

if (localStorage.getItem("outputsize")) {
	outputsize = localStorage.getItem("outputsize");
	document.getElementById(outputsize).checked=true;
} else {
	document.getElementById("small").checked=true;
}

function handleKeydown(e) {
  switch(e.key) {
	case 'ArrowUp':
      nav(-1);
      break;
    case 'ArrowDown':
      nav(1);
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
		softkeyCallback.back();		
	break;

  }
};

function nav (move) {
  var currentIndex = document.activeElement.tabIndex;
  var items = document.querySelectorAll('.items');
  var next = currentIndex + move;
  if (next>items.length-1) {next=items.length-1;} else if (next<0) {next=0;}
  var targetElement = items[next];
  targetElement.focus();
};

const softkeyCallback = {
	
	back: function() { 
      window.open("index.html","_self");
     },
	
    left: function() { 
      
	if (document.getElementById("big").checked) { localStorage.setItem("outputsize","big"); } else {
		localStorage.setItem("outputsize","small");  }
		pls_wait();
		setTimeout(() => { 	
		if (document.getElementById("wait")) {document.getElementById("wait").remove();	}
		}, 1200);
     },
  
    center: function() { 

	var chk = document.activeElement;
	
	if (chk.getAttribute("type")=="checkbox") {
		document.getElementById("big").checked=false;
		document.getElementById("small").checked=false;
		chk.checked=true; }
	
      },
  
    right: function() { 
       window.open("index.html","_self");
     }
};

document.addEventListener('keydown', handleKeydown);

function pls_wait() {
	var divw = document.createElement("div");
	divw.id="wait";
	divw.innerHTML="<br><br>Saved!";
	document.body.appendChild(divw);
}