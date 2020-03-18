# info
> Contains a bit of information about JSLib.  
> ```js
> jsl.info -> Object
> ```
> 
> This object looks like this:
> ```json
> {
>     "version": "1.2.3",
>     "intVersion": [1, 2, 3],
>     "name": "JSLib",
>     "desc": "A multi-purpose, lightweight and dependency-free JavaScript library that makes coding a bit faster by providing many easy to use functions and classes",
>     "author": "Sv443",
>     "authorLong": "Sv443 <sven.fehler@web.de> (https://sv443.net/)",
>     "contributors": ["none yet :("],
>     "license": "MIT (https://sv443.net/LICENSE)",
>     "documentation": "https://github.com/Sv443/JSLib-npm/wiki"
> }
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> console.log(`Powered by ${jsl.info.name} by ${jsl.info.author}`);
> ```
> 
> </details>

<br><br><br><br>



# colors
> Used to color the text in the console.  
> Don't forget to use `jsl.colors.rst` at the end of the console log message, else all following console messages will also be colored.  
> I recommend you assign the `jsl.colors.fg` to a shorter named variable so you don't have to type so much stuff (see example below).  
> ```js
> jsl.colors -> Object
> ```
>
> | Object | Color |
> | --- | --- |
> | jsl.colors.rst | Resets the color back to default |
> | jsl.colors.reset | Resets the color back to default |
> | jsl.colors.fat | Fat font |
> | jsl.colors.fg.black | Black text color |
> | jsl.colors.fg.red | Red text color |
> | jsl.colors.fg.green | Green text color |
> | jsl.colors.fg.yellow | Yellow text color |
> | jsl.colors.fg.blue | Blue text color |
> | jsl.colors.fg.magenta | Magenta text color |
> | jsl.colors.fg.cyan | Cyan text color |
> | jsl.colors.fg.white | White text color |
> | jsl.colors.bg.black | Black background color |
> | jsl.colors.bg.red | Red background color |
> | jsl.colors.bg.green | Green background color |
> | jsl.colors.bg.yellow | Yellow background color |
> | jsl.colors.bg.blue | Blue background color |
> | jsl.colors.bg.magenta | Magenta background color |
> | jsl.colors.bg.cyan | Cyan background color |
> | jsl.colors.bg.white | White background color |
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var col = jsl.colors.fg;
> var bgcol = jsl.colors.bg;
> var rst = jsl.colors.rst;
>
> console.log(`${col.red}Hello, ${col.magenta}World!${rst}`);
> console.log(`${col.yellow}Foo ${bgcol.white + col.black}Bar${rst} ${col.cyan}Baz${rst}`);
> ```
> This may look like this:  
> ![image](https://sv443.net/cdn/jsl/doc/consolecols.png)
> 
> </details>

<br><br><br><br>
