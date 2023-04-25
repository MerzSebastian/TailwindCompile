# TailwindCompile
Small application for compiling tailwind in minimal projects.
I am currently using this for my circuitpython development process. Because the whole project is managed on the microcontroller itselfe (or mirror of it), I have a limited space-budget. So adding a full node environment with tailwind on there was out of the question. I now have a compaion application which builds the css for me and can be placed outside of the project. 

# Building the compiler
run 
```shell
npm install
```
run 
```shell
npm run build
```
after that there should be a tailwindcompile.exe in your dist folder

# Usage
The compiler has a few options was can be used
--output <=> the output css file path
--input <=> the input css file path
--config <=> file path for tailwind config

an example would be the following: (executed on for example: E:/, in this case there is a folder named ui which has the final ui)
```shell
C:\TailwindCompile\dist\tailwindcompile.exe --output ui/test.css --config tailwind.config.js --input tailwind.styles.css
```