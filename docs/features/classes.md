# ProgressBar
> A class that allows you to add a dynamic progress bar right in the command line (console).  
> ⚠️ Don't call `console.log()` or `process.stdout.write()` while the progress bar is active as that would create duplicate progress bars ⚠️  
> This could look something like this:  
>   
> ![image](https://sv443.net/cdn/jsl/doc/progress_bar.png)
> 
> <br>
> 
> > ## ProgressBar Constructor:
> > Creates a new ProgressBar object.  
> > `timesToUpdate` is the amount of incrementation steps of your progress bar or how often you will call `ProgressBar.next()`. This also directly determines the length of the progress bar.  
> > `initialMessage` is the message that will be shown when the progress bar is still at 0%. You can also leave this empty to not have a message.  
> > ```js
> > var pb = new jsl.ProgressBar(timesToUpdate: Number, [initialMessage: String])
> > ```
> 
> <br>
> 
> > ## ProgressBar.next()
> > Use this method to increment the progress bar to the next step.  
> > Calling this method when the `timesToUpdate` is already reached will make the progress bar stay at 100%.  
> > ```js
> > ProgressBar.next(message: String) -> void
> > ```
> 
> <br>
> 
> > ## ProgressBar.onFinish()
> > Sets a callback function that will be executed when the progress bar reaches 100%.  
> > ```js
> > ProgressBar.onFinish(callback: Function) -> void
> > ```
> 
> <br>
> 
> > ## ProgressBar.getProgress()
> > Returns the current progress as a floating point number (0 to 1).  
> > ```js
> > ProgressBar.getProgress() -> Number
> > ```
> 
> <br>
> 
> > ## ProgressBar.getRemainingIncrements()
> > Returns the remaining incrementation steps (or remaining times to call `ProgressBar.next()`) until the progress bar reaches 100%.  
> > ```js
> > ProgressBar.getRemainingIncrements() -> Number
> > ```



<br><br><br><br><br><br><br><br>



# MenuPrompt
> Buckle up for a long ride cause this is a very complex but also very powerful class!  
> I strongly recommend you to play around with this class and the provided examples a bit, because I'm not the best at writing documentations.  
>   
> ⚠️ Don't call `console.log()` or `process.stdout.write()` while the menu prompt is active as that would mess up the layout of the menu(s) ⚠️
>   
> This class allows you to create a dynamic prompt (list of options which the user can choose from) in the console.  
> It could look like this:  
>   
> ![image](https://sv443.net/cdn/jsl/doc/menu_prompt.png)
> 
> <br>
> 
> > ## MenuPrompt Constructor:
> > Creates a new MenuPrompt object.  
> > For further definition of what the types `MenuPromptOptions` and `MenuPromptMenu` are, click [here](#custom-types-of-the-menuprompt-class).  
> > ```js
> > var mp = new jsl.MenuPrompt(options: MenuPromptOptions, menus: Array<MenuPromptMenu>)
> > ```
> 
> <br>
> 
> > ## MenuPrompt.open()
> > Use this method to open the menu prompt.  
> > Returns `true`, if the menu(s) could be opened or a string containing an error message, if not.  
> > ```js
> > MenuPrompt.open() -> Boolean|String
> > ```
> 
> <br>
> 
> > ## MenuPrompt.close()
> > Use this method to prematurely close the menu prompt.  
> > Returns an array containing the results the menu prompt has collected thus far.  
> > For further definition of the type `MenuPromptResult`, click [here](#type-menupromptresult).  
> > ```js
> > MenuPrompt.close() -> Array<MenuPromptResult>
> > ```
> 
> <br>
> 
> > ## MenuPrompt.addMenu()
> > Adds another menu to the menu prompt.  
> > This can even be called while the menu prompt is open.  
> > Returns `true`, if the menu could be added or a string containing an error message, if not.  
> > For further definition of the type `MenuPromptMenu`, click [here](#type-menupromptmenu).  
> > ```js
> > MenuPrompt.addMenu(menu: MenuPromptMenu) -> Boolean|String
> > ```
> 
> <br>
> 
> > ## MenuPrompt.currentMenu()
> > Returns the (zero-based) index of the currently opened menu of the menu prompt.  
> > Returns `-1` if the menu prompt hasn't been opened yet.  
> > ```js
> > MenuPrompt.currentMenu() -> Number
> > ```
> 
> <br>
> 
> > ## MenuPrompt.result()
> > Returns an array of results that the menu prompt has collected thus far but doesn't stop the menu prompt like `MenuPrompt.stop()` does.  
> > For further definition of the type `MenuPromptResult`, click [here](#type-menupromptresult).  
> > ```js
> > MenuPrompt.result() -> Array<MenuPromptResult>
> > ```
> 
> <br>
> 
> > ## MenuPrompt.validateMenu()
> > Checks whether or not the format of the passed menu is correct.  
> > I recommend you to use this before calling `MenuPrompt.addMenu()` since that method would otherwise throw an error.  
> > Returns `true`, if the menu is valid or an array of strings containing all error messages if the menu is invalid.  
> > ```js
> > MenuPrompt.validateMenu(menu: MenuPromptMenu) -> Boolean|Array<String>
> > ```
>
> <br><br><br>
>
> # Example:
>
> **<details><summary>Click to show</summary>**
>
> ```js
> var options = {
>     exitKey: "x",          // if this is set, another option will be added to exit the current menu. Set this to null or an empty string ("") to not include this option
>     optionSeparator: ")",  // a string that should suffix the menu options
>     cursorPrefix: "─►",    // a string that should be displayed before the cursor
>     retryOnInvalid: true,  // false = skip to the next menu if an invalid option was entered - true = retry the current menu
>     onFinished: (res) => { // a function that should be executed when the prompt has finished, this callback contains the result(s) of the menu prompt
>         console.log(res);  // look at the "MenuPrompt Types" section below to see how this might look like
>     }
> };
> 
> 
> var menus = [ // these are the menus that will later be shown in the console
>     {
>         "title": "Menu",
>         "options": [
>             {
>                 "key": "1",
>                 "description": "foo"
>             },
>             {
>                 "key": "2",
>                 "description": "bar"
>             },
>             {
>                 "key": "3",
>                 "description": "baz"
>             }
>         ]
>     },
>     {
>         "title": "Some other menu",
>         "options": [
>             {
>                 "key": "x",
>                 "description": "hello,"
>             },
>             {
>                 "key": "y",
>                 "description": "world!"
>             }
>         ]
>     }
> ];
> 
> 
> var mp = new jsl.MenuPrompt(options, menus); // this actually constructs the menu prompt object - you can call this without actually opening the menu prompt
> 
>
> var newMenu = {
>     "title": "Yet another menu",
>     "options": [
>         {
>             "key": "hello",
>             "description": "keys don't have to be 1 char long"
>         },
>         {
>             "key": "!+#_",
>             "description": "and they can contain any unicode character"
>         }
>     ]
> };
> 
> if(mp.validateMenu(newMenu)) // checks whether the new menu we want to add is valid
>     mp.addMenu(newMenu);     // adds the menu to the menu prompt
> else
>     console.log("newMenu is invalid!");
> 
> setTimeout(() => {
>     mp.open(); // just now the menu will be opened, after a 5 second delay
> }, 5000);
> ```
>
> </details>

<br><br><br>

# Custom Types of the MenuPrompt Class:
> There are three custom objects that are being used in MenuPrompt.  
> They are explained in this section.  
>   
> ## Type MenuPromptOptions:
> > These are the options of your menu prompt.  
> > ```js
> > {
> >     "exitKey": "x",          // if this is set, another option will be added to exit the current menu. Set this to null or an empty string ("") to not include this option
> >     "optionSeparator": ")",  // a string that should suffix the menu options
> >     "cursorPrefix": "─►",    // a string that should be displayed before the cursor
> >     "retryOnInvalid": true,  // false = skip to the next menu if an invalid option was entered - true = retry the current menu
> >     "onFinished": (res) => { // a function that should be executed when the prompt has finished, this callback contains the result(s) of the menu prompt
> >         console.log(res);    // look at the "MenuPrompt Types" section below to see how this might look like
> >     }
> > }
> > ```
> 
> <br>
> 
> ## Type MenuPromptMenu:
> > This object describes a single menu prompt menu.  
> > It has to be structured similar to this:  
> > ```json
> > {
> >     "title": "The title of the menu",
> >     "options": [ // an array containing all selectable options of the menu
> >         {
> >             "key": "The key that needs to be pressed to select this option",
> >             "description": "The description or name of this option"
> >         },
> >         {
> >             "key": "...",
> >             "description": "..."
> >         },
> >         { ... }
> >     ]
> > }
> > ```
> 
> <br>
> 
> ## Type MenuPromptResult:
> > This object contains the result of a single menu of the menu prompt.  
> > You will always encounter this object multiple times inside an array.  
> > This object is structured like this:  
> > ```json
> > {
> >     "key": "The key that the user pressed in this menu",
> >     "description": "The description of the option the user selected",
> >     "menuTitle": "The title of this menu",
> >     "optionIndex": "The (zero-based) index number of the user selected option",
> >     "menuIndex": "The (zero-based) index number of this menu"
> > }
> > ```