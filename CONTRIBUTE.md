#Contributions are more than welcome!
Yes. Please contribute. It is such an important topic. Please help to make the world a better place for everyone.  
Sure, there are some information sites as W3C and WebAIM, our websites aim however is to explain it better with more and easier to understand examples and a better user experience to help more people implementing accessibility in their workflow.  

#How to?
- It is not rocket science. However, before spending hours contributing, please be so kind and write a quick issue, asking if your contribution is welcome.   
- HOWEVER, if it is a small fix, i.e. of grammatical nature, please just make that fix straight away and it will be accepted.  
- If you are adding a section not covered yet, please make sure to provide links to relevant sources supporting your attribution.  
- If you want to make changes to the code itself, you are more than welcome to do so. Due to the short amount of time to realize this project the code suffered so nobody will be offended. Add a brief explanation why you would change it, if that makes sense we will change it.  
- Please don’t add any frameworks or libraries, we try to keep this project library free. However, if there is a solid argument in favor of a framework, library or the likes. That addition might be welcomed. Plugins however, are welcome.

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
@ Having the website translated in different languages would be amazing!  
. The "backend" is a bunch of JSON files that get loaded into the page via nunjucks & gulp. There is one file for each page (as linked above).  
. For example: rename visual.json in visual_de.json and send us that file.  
. You don’t have to have any technical know how for that. But if you do know how to handle that language routing (different text based on user regions) please help making it happen.  

// Overall  
@ Better grammar (sorry I’m not a native speaker)  
@ Possibility to Fold-Unfold the Table of Contents  
@ Even smoother animations  
@ Double check if the given examples are correct and make sense  
@ Add a possibility to search the site  
  
// Visual  
@ Test with different Screen Readers  
@ Add all Aria attributes with better examples  
@ Add all roles with good examples  
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
@ Bundling the relevant css/jquery to the relevant sections. A modular approach would be better.  
@ Cleaning code. Yes, due to the short amount of time there are redundant pieces of code that could be cleaned out.  
@ Implement a better solution than the external "responsiveVoice" plugin for the examples.  
@ Less spaghetti. I’m by far not the best dev in the world and are sure that you can teach me some cleaner, leaner coding styles.  
