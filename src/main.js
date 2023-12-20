import { Entity } from './HTML_Hierarchy.js'
import { customContent } from "./custom_content.js";
import items_constraints from "./items_constraints.json" assert { type: "json" };
(function() {

// Assuming the file name or path might change dynamically
  const filePath = "./custom_content.js";

  import(filePath)
  .then((module) => {
    const { customContent } = module;
    // Now you can use customContent as needed
  })
  .catch(error => {
    // Handle any errors in loading the module
    console.error("Error loading the module:", error);
  });

  let items = items_constraints;
  
  document.addEventListener('mousedown', function(e) {
    const elementRect = e.target.getBoundingClientRect();
    const elementLeftEdge = elementRect.left;
    
    if (e.clientX < elementLeftEdge) {
        console.log('Mouse click on a sibling connector line');
    }
  });
  
  
  function displayItems() {
    let nodesHTML = "";
    const item = items[0]
    // For all the top level entities
  //  items.forEach((item) => {
      // Set the content rendering function for the entity and its childern
    item.customContent = customContent;
    item.rootItem = true
    nodesHTML += Entity(item);
  //  });
    return nodesHTML;
  }
  
  function render(hierarchyInformation){
    const { rootElement, style } = hierarchyInformation
    const element = document.getElementById(rootElement)
    const orientation = style || 0;
    const orientations = ["horizontal", "vertical", "centered"]
    orientations.forEach(o => element.classList.remove(o));
    element.classList.add(orientations[orientation] );
    element.innerHTML = displayItems(customContent);
  }
  
  if (window) window.HTML_Hierarchy = { render }
  
  
  

  
})();

