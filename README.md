# A cloud-based Markdown notebook program written in TypeScript using Electron-React-Boilerplate
## What is Electron? 
It is an interesting web technology embedding Chromium and Node.js to enable web developers to create desktop applications.

Electron apps run on three platforms across all supported architectures (Compatible with macOS, Windows, and Linux).

It surprised me to see that many software applications I use were developed using Electron, including 1Password, Skype, Microsoft Teams, Postman, and of course, VS Code!

## What I learnt in this repo
As a beginner, I didn't have high expectations for this project. However, I found it really interesting to learn about the concepts of how my program interacts with the operating system, even though I was just writing TypeScript within the React framework. 

It also served as an exercise to train and test how quickly I could absorb new knowledge and solve problems independently in software development.



## What can this program do? 
It's a markdown notebook where you can create, edit, delete, import, and export MD files. Additionally, it has the capability to sync with any cloud storage service such as AWS S3.

Most importantly, it functions like a web product, but you can also download and install this Electron program.

### Main Page
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/mainPage.png)

### Import
By clicking the import button, you can import any MD type files into the program
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/upload.png)

### Create an markdown file
From the sidebar, you can select or create new file
By clicking the import button, you can import any MD type files into the program
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/sideBar.png)

### Window Menu
Like most software, you can add ant function into the menu
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/menu.png)

### Markdown editor
"I introduced SimpleMDE to provide the editor's functionality and wrote the logic for the tabs, where users will be informed if the file is not saved.
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/menu.png)

### Keyboard Control
Have you noticed how clean this interface is? There are no redundant buttons cluttering the user interactions. This is because all actions, such as delete, save, confirm, and quit, are controlled by keyboard commands. Just like in a Word document, you can quickly save your file by using 'Ctrl+S'.
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/actions.png)

### Search
Of course, you can search for specific files using keywords.
![Main Page](https://github.com/RoyLuoNanjing/electron-react-cloud-notebook/blob/main/assets/images/search.png)

