// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('helloworld.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from hello-world!');
		var panel = vscode.window.createWebviewPanel(
			'helloWorld', // Identifies the type of the webview. Used internally
			'Hello World Extension', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{enableScripts: true} // Webview options.
		)
		panel.webview.html = getWebviewContent();

		panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
				case 'alert':
					vscode.window.showInformationMessage(message.text);
					return;
			}
		});
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Hello World</title>
	</head>
	<body>
		<h1>Hello World</h1>
		<input type="button" value="Call extension.js" onclick="sendMessageToExtension()"/>

		<script>
			const vscode = acquireVsCodeApi();
			
			function sendMessageToExtension() {
				vscode.postMessage({
					command: 'alert',
					text: 'Hello World from Webview'
				});
			}
		</script>
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
