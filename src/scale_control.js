function updateScale(element, newScale) {
  let transform = element.style.transform;
  let scaleRegex = /scale\(\d*\.?\d+\)/;
  let newScaleTransform = `scale(${newScale})`;

  if (transform.match(scaleRegex)) {
    element.style.transform = transform.replace(scaleRegex, newScaleTransform);
  } else {
    element.style.transform += ` ${newScaleTransform}`;
  }
}