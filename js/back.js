function handleKeydown(e) {
  switch(e.key) {
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


const softkeyCallback = {
	
	back: function() { 
      window.history.back();
     },
	
    left: function() { 
      
     },
  
    center: function() { 

      },
  
    right: function() { 
       window.history.back();
     }
};

document.addEventListener('keydown', handleKeydown);