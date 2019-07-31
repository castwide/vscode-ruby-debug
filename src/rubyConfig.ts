import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';

export class RubyConfigurationProvider implements vscode.DebugConfigurationProvider {

	/**
	 * Massage a debug configuration just before a debug session is being launched,
	 * e.g. add all missing attributes to the debug configuration.
	 */
	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {

		// if launch.json is missing or empty
		if (!config.type && !config.request && !config.name) {
			const editor = vscode.window.activeTextEditor;
			if (editor && editor.document.languageId === 'ruby') {
				config.type = 'ruby-debug';
				config.name = 'Launch';
				config.request = 'launch';
				config.program = '${file}';
			}
		}

		if (!config.program) {
			return vscode.window.showInformationMessage("Cannot find a Ruby file to debug").then(_ => {
				return undefined;	// abort launch
			});
		}

		return config;
	}
}
