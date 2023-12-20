function dragControl(root, onlyRoot) {
  let draggableElement = document.getElementById(root);
  draggableElement.style.transformOrigin = 'top left'; // This sets the origin point of the scale transformation
  let isDragging = false;
  let originalMouseX, originalMouseY;
  
  draggableElement.addEventListener('mousedown', function(e) {
    if (onlyRoot && e.target.id != root) return
    isDragging = true;
    let orginalTranslation = getTranslateValues(draggableElement.style.transform);
    originalMouseX = Number(e.clientX - (orginalTranslation.x || 0));
    originalMouseY = Number(e.clientY - (orginalTranslation.y || 0));
 });
  
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      let scaleValue = getScaleValue(draggableElement.style.transform);
      let deltaX = (e.clientX - originalMouseX) / (scaleValue || 1);
      let deltaY = (e.clientY  - originalMouseY) / (scaleValue || 1);
      updateTranslation(draggableElement, deltaX, deltaY)
      e.preventDefault();
    }
  });
  
  document.addEventListener('mouseup', function(e) {
    if (isDragging) {
        isDragging = false;
    }
  });
  
  function updateTranslation(element, newX, newY) {
    let scaleValue = getScaleValue(element.style.transform);
    let transform = element.style.transform;
    let adjustedX = newX * scaleValue;
    let adjustedY = newY * scaleValue;
    let translateRegex = /translate\(-?\d*\.?\d+px,\s*-?\d*\.?\d+px\)/g;
    let newTranslateTransform = `translate(${adjustedX}px, ${adjustedY}px)`;

    if (transform.match(translateRegex)) {
      element.style.transform = transform.replace(translateRegex, newTranslateTransform);
    } else {
      element.style.transform = String(`${newTranslateTransform} `) + (element.style.transform || "");
    }
  }


  function getScaleValue(transformStyle) {
    // Regular expression to match the scale value
    let scaleRegex = /scale\((-?\d*\.?\d+)\)/;
    let defaultScale = 1; // Default scale (100%)

    // Search for the scale value
    let matches = scaleRegex.exec(transformStyle);

    // If a scale value is found, parse it to a float, otherwise default to 1
    let scaleValue = matches ? parseFloat(matches[1]) : defaultScale;
    return scaleValue;
  }

  // Extract the translate values from the transform string
  function getTranslateValues(transformString) {
    let translateRegex = /translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/;
    let result = translateRegex.exec(transformString);
    return result ? { x: parseFloat(result[1]), y: parseFloat(result[2]) } : { x: 0, y: 0 };
  }
}


