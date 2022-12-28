//this file just generates an svg
mmToPxConv = 11.8110236220472
mmToPxConv = 1

const queryString = window.location.search;
// console.log(queryString);
const urlParams = new URLSearchParams(queryString);
// debugger
var template = JSON.parse(urlParams.get('template'))
// debugger
console.log(urlParams.get('template'))


window.onload = initializeSVG(template)


function createPageElement(elementType, customAttributeArray, elementClasses, parentElement){
  if (elementType == "svg" || elementType == "g" || elementType == "rect" || elementType == "image"|| elementType == "text"){
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", elementType);
  }
  else{
    var newElement = document.createElement(elementType)
  }

  for (var i = 0; i < customAttributeArray.length; i++) {
    let attribute = Object.keys(customAttributeArray[i])
    newElement.setAttribute(attribute, customAttributeArray[i][attribute] )
  }

  for (var i = 0; i < elementClasses.length; i++) {
    newElement.classList.add(elementClasses[i])
  }

  parentElement.appendChild(newElement)

  return newElement
}


function initializeSVG(template){
  var templateWidth = template.Template.MaxTemplate.Height*mmToPxConv
  var templateHeight = template.Template.MaxTemplate.Width*mmToPxConv

  var svg = createPageElement("svg",
  [{"width":templateWidth},{"height":templateHeight}],
  ["svgTemplate"],
  document.body
)

  // add a border
  if(true){
    svgBorder = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    svgBorder.setAttribute("height", templateHeight)
    svgBorder.setAttribute("width", templateWidth)
    svgBorder.setAttribute("style","stroke:black;stroke-width:5;fill-opacity:0.0")
    svg.appendChild(svgBorder)
  }

  var personalizedObjectArray = template.Template.PersonalizedObjects

  for (var i = 0; i < personalizedObjectArray.length; i++) {
    applyAssets(personalizedObjectArray[i].PersonalizedObject)
  }



    function applyAssets(personalizedObject){
      // debugger
      var objectWidth = personalizedObject.ObjectLocation.ObjectWidth*mmToPxConv
      var objectHeigth = personalizedObject.ObjectLocation.ObjectHeight*mmToPxConv
      // debugger
      var objectXOffset = personalizedObject.ObjectLocation.ObjectXOffset*mmToPxConv
      var objectYOffset = personalizedObject.ObjectLocation.ObjectYOffset*mmToPxConv

      var objectFontSize = personalizedObject.ObjectContent.FontSize*mmToPxConv


      if(personalizedObject.ObjectType == "IMG"){
        var imageField = createPageElement("image",
          [{"href":personalizedObject.ObjectContent.imageURL},{x:objectXOffset},{y:objectYOffset},{"width":objectWidth},{"height":objectHeigth}],
          [],
          svg
        )

      // svgPersonalizedeElement.setAttribute("x", (personalizedObject.ObjectSpecs.ObjectXOffset+parseFloat(decoAreaGroup.getAttribute("x"))))
      // svgPersonalizedeElement.setAttribute("y", (personalizedObject.ObjectSpecs.ObjectYOffset+parseFloat(decoAreaGroup.getAttribute("y"))))

      // personalizedObjectGroup.appendChild(svgPersonalizedeElement)
    }

      else if(personalizedObject.ObjectType == "Text"){
        var textField = createPageElement("text",
          [{x:objectXOffset},{y:objectYOffset+objectFontSize},{"width":objectWidth},{"height":objectHeigth}],
          [],
          svg
        )
        textField.innerHTML = personalizedObject.ObjectContent.Text
        textField.setAttributeNS(null, "font-size", personalizedObject.ObjectContent.FontSize);
        textField.setAttributeNS(null, "font-family", personalizedObject.ObjectContent.Font);

      }



    }

  //   fs.writeFile('index.svg', document.querySelector(".svgTemplate"), (err) => {
  //     // throws an error, you could also catch it here
  //     if (err) throw err;
  //
  //     // success case, the file was saved
  //     console.log('SVG written!');
  // });
  var canvas = document.createElement('canvas');
  var parser = new DOMParser();
  var svg = document.querySelector(".svgTemplate");
  var svgjs = require('svg.js');
var vectorizedSvg = svgjs(canvas);

var images = svg.getElementsByTagName('image');
for (var i = 0; i < images.length; i++) {
  var image = images[i];
  var imageSrc = image.getAttribute('xlink:href');
  var imageVector = svgjs.image(imageSrc);
  vectorizedSvg.add(imageVector);
}

var pngImage = canvas.toDataURL();
document.body.appendChild(pngImage);

// or

var fs = require('fs');
fs.writeFileSync('vectorized.png', pngImage);

}
