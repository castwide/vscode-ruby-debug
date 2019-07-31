'use strict';

import * as vscode from 'vscode';
import { RubyDebugAdapterDescriptorFactory } from './rubyDebug';
import { RubyConfigurationProvider } from './rubyConfig';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('ruby-debug.getProgramName', config => {
		return vscode.window.showInputBox({
			placeHolder: "Enter the name of a Ruby file in the workspace folder",
			value: "main.rb"
		});
	}));

	// register a configuration provider for 'mock' debug type
	const provider = new RubyConfigurationProvider();
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('ruby-debug', provider));

	const factory = new RubyDebugAdapterDescriptorFactory();
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory('ruby-debug', factory));
	context.subscriptions.push(factory);
}

export function deactivate() {
	// nothing to do
}
