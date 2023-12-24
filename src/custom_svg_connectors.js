function customContent(entityInfo) {
  /* children
  Given the pagInfo, returns the img HTML with the screenshot
  */
  setTimeout(()=>{connectParent(entityInfo)},1)
  return `
    <div class='entity-contents-display'>
      <SVG class="connector">
        <line x1="0" y1="0" x2="0" y2="0" stroke="gray" stroke-width="1"></line>
      </SVG> 
      <div class="lower-anchor">
      </div>
      <div class="entity-header">
        <div class='entity-title'>
          <div class='entity-title-text' title='${
            entityInfo.title || "Title"
          }'>
            ${entityInfo.title || "Title"}
          </div>
        </div>
      </div>
      <div class="upper-anchor">
      </div>      
    </div>
  `
}

function connectParent(entityInfo){
  if (!entityInfo.parent || !entityInfo.parent.id || !entityInfo.id) return
  updateSvgLine(entityInfo);
}

function updateSvgLine(entityInfo) {
  const parentEnityId = "entity-"+entityInfo.parent.id
  const childEntityId = "entity-"+entityInfo.id
  // Get the bounding rectangles of the anchors
  const parentElement = document.getElementById(parentEnityId)
  const childElement = document.getElementById(childEntityId)
  const parentLowerAnchor = parentElement.querySelector(".lower-anchor").getBoundingClientRect();
  const childUpperAnchor = childElement.querySelector(".upper-anchor").getBoundingClientRect();
  const svg = childElement.querySelector("svg.connector").getBoundingClientRect(); // Assuming the SVG is inside the child element

  // Calculate the position of the line's start and end points relative to the SVG's position
  const startX =  Math.round(parentLowerAnchor.left + (parentLowerAnchor.width / 2) - svg.left);
  const startY =  Math.round(parentLowerAnchor.top + (childUpperAnchor.height / 2) - svg.top);
  const endX =  Math.round(childUpperAnchor.left + (childUpperAnchor.width / 2) - svg.left);
  const endY =  Math.round(childUpperAnchor.top + (childUpperAnchor.height / 2) - svg.top); 

  // Get the line element inside the SVG
  const line = childElement.querySelector("svg.connector line");
  //console.log("parentLowerAnchor", parentLowerAnchor)
  //console.log("childUpperAnchor", childUpperAnchor)
  //console.log("x1", x1, "y1", y1, "x2", x2, "y2", y2)

  // Update the line's coordinates
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", endX);
  line.setAttribute("y2", endY);
}
