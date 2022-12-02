window.onload = createInputFields()


function createInputFields(){
  var creatorDiv = createPageElement("div",
    [],
    ['creatorDiv'],
    document.body
  )
  
  //create logo Div 
  var logoDiv = createPageElement("Div", [],['logoDiv'],creatorDiv)

  var logoInput = createPageElement("input", [{'placeholder':'Enter Image URL'}],['logoInput'],logoDiv)
  logoInput.value = template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectContent.imageURL
  
  var logoXLocation = createPageElement("input", [{'placeholder':'Enter Logo X Location'}],['logoXLocation'],logoDiv)
  logoXLocation.value = template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectXOffset
  
  var logoYLocation = createPageElement("input", [{'placeholder':'Enter Logo Y Location'}],['logoYLocation'],logoDiv)
  logoYLocation.value = template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectYOffset
  
  var logoHeight = createPageElement("input", [{'placeholder':'Enter Logo Height'}],['logoHeight'],logoDiv)
  logoHeight.value = template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectHeight
  
  var logoWidth = createPageElement("input", [{'placeholder':'Enter Logo Width'}],['logoWidth'],logoDiv)
  logoWidth.value = template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectWidth
  
  
  //create text element
  var textDiv = createPageElement("Div", [],['textDiv'],creatorDiv)

  var textInput = createPageElement("input", [{'placeholder':'Enter Text'}],['textInput'],textDiv)
  textInput.value = template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.Text
  
  var textFont = createPageElement("input", [{'placeholder':'Enter Font'}],['textFont'],textDiv)
  textFont.value = template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.Font
  
  var textFontSize = createPageElement("input", [{'placeholder':'Enter Font Size'}],['textFontSize'],textDiv)
  textFontSize.value = template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.FontSize
  
  var textFontColor = createPageElement("input", [{'placeholder':'Enter Font Color'}],['textFontColor'],textDiv)
  textFontColor.value = template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.FontColor

  var textXLocation = createPageElement("input", [{'placeholder':'Enter Text X Location'}],['textXLocation'],textDiv)
  textXLocation.value = template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectLocation.ObjectXOffset
  
  var textYLocation = createPageElement("input", [{'placeholder':'Enter Text Y Location'}],['textYLocation'],textDiv)
  textYLocation.value = template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectLocation.ObjectYOffset

  
  var urlCreateButton = createPageElement("button", [{"onclick":"createURL()"}],['urlCreateButton'],creatorDiv)
  urlCreateButton.innerHTML = "Create URL"
  var finalURLInput = createPageElement("input", [{'placeholder':'New Template'}],['finalURLInput'],creatorDiv)
  var urlLoadButton = createPageElement("button", [{"onclick":"loadTemplate()"}],['urlLoadButton'],creatorDiv)
  urlLoadButton.innerHTML = "Load URL"

  addEventListener('keyup', (event) => {loadTemplate()});
}
function createURL(){
  //set image URL
  var imageURL = document.querySelector(".logoInput").value
  template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectContent.imageURL = imageURL
  
  var logoXValue = document.querySelector(".logoXLocation").value
  template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectXOffset = logoXValue
  
  var logoYValue = document.querySelector(".logoYLocation").value
  template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectYOffset = logoYValue
  
  var logoHeight = document.querySelector(".logoHeight").value
  template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectHeight = logoHeight
  
  var logoWidth = document.querySelector(".logoWidth").value
  template.Template.PersonalizedObjects[0].PersonalizedObject.ObjectLocation.ObjectWidth = logoWidth
  
  
  //set font items
  var textInput = document.querySelector(".textInput").value
  template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.Text = textInput
  
  var textFont = document.querySelector(".textFont").value
  template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.Font = textFont
  
  var textFontSize = document.querySelector(".textFontSize").value
  template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.FontSize = textFontSize
  
  var textFontColor = document.querySelector(".textFontColor").value
  template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectContent.FontColor = textFontColor
  
  var textXValue = document.querySelector(".textXLocation").value
  template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectLocation.ObjectXOffset = textXValue
  
  var textYValue = document.querySelector(".textYLocation").value
  template.Template.PersonalizedObjects[1].PersonalizedObject.ObjectLocation.ObjectYOffset = textYValue

  

  var finalURLInput = document.querySelector(".finalURLInput") 
  finalURLInput.value = JSON.stringify(template)
  console.log("click")
  return JSON.stringify(template)
}


function loadTemplate(){
  
  var baseURL = window.location.href.split('?')[0]
  var newTemplate = createURL()

  initializeSVG(JSON.parse(newTemplate))
  document.querySelector(".svgTemplate").replaceWith(document.querySelectorAll(".svgTemplate")[1])

  // 
  // var newURL = new URL("?template="+newTemplate, baseURL);
  // window.location = newURL
  // console.log(newURL)
}