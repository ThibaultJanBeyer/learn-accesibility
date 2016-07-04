#Contributions are more than welcome!
Yes. This project is non-profit and open source. It is a very important to sensitize people for this open web topic. To do so, the project needs your contribution. Please help to make the web a better place for everyone.  
Sure, there are some information sites as W3C and WebAIM, but that is not enough. This websites aim is to explain it in a more accessible way with more and easier to understand examples and a better user experience. To get and help more people implementing accessibility in their workflow.  

#How to contribute?
- It is not rocket science. Before spending time contributing, please be so kind and write a quick issue, asking if your contribution is welcome.   
- HOWEVER, if it is a small fix, i.e. of grammatical nature, please just make that fix straight away (without asking) and it will be accepted.  
- If you are adding a section not covered yet, please make sure to provide links to relevant sources supporting your attribution.  
- If you want to make changes to the code itself, you are welcome to do so. Due to the short amount of time to realize this project the code suffered. Add a brief explanation why you would change it, if that makes sense it gets accepted.  
- Please don’t add any frameworks or libraries. Try to keep this project as clean as possible. However, if there is a solid argument in favor of a framework, library or the like. That addition might be welcome. You may use plugins.

#Structure?
The "backend" (where textual content is pulled from) is found in these json files:

- src/templates/data/[cognitive.json](/src/templates/data/cognitive.json)  
- src/templates/data/[physical.json](/src/templates/data/physical.json)  
- src/templates/data/[selling.json](/src/templates/data/selling.json)  
- src/templates/data/[shared.json](/src/templates/data/shared.json)  
- src/templates/data/[vision.json](/src/templates/data/vision.json)  
- src/templates/data/[visual.json](/src/templates/data/visual.json)  
- src/templates/data/[welcome.json](/src/templates/data/welcome.json)  // the intro  

#Known things missing / to do:
// Languages  
@ Have the website translated in different languages would be amazing!  
. The "backend" is a bunch of JSON files that get loaded into the page via nunjucks & gulp. There is one file for each page (as linked above).  
. For example: rename visual.json in visual_de.json (for german translation) and send that file.  
. You don’t have to have any technical know how to do so. But if you do know how to handle the language routing (different text based on user regions) please help making it happen.  

// Overall  
@ Better grammar (sorry I’m not a native speaker)  
@ Possibility to fold/unfold the table of contents  
@ Smoother animations  
@ Double check if the given examples are correct and make sense  
@ Add a possibility to search the site  
  
// Visual  
@ Test with different Screen Readers  
@ Add leftover Aria attributes with examples  
@ Add all roles with examples  
@ Add support tables  
@ More examples  
  
// Low vision & Color  
@ More examples  
@ More research  
  
// Physical & Audio  
@ More examples  
@ More research  
  
// Cognitive  
@ More examples  
@ More research  
  
// Selling Accessibility  
@ More selling points  

// Code  
@ Bundling the relevant css/jquery to the relevant sections (modular approach) might make sense.  
@ Clean code. Due to the short amount of time there are redundant pieces of code that could be cleaned.  
@ Implement a better solution than the external "responsiveVoice" plugin for the examples.  
@ Less spaghetti. I’m sure that you can teach me some cleaner, leaner coding styles.  
