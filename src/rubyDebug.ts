import * as vscode from 'vscode';
import * as Net from 'net';
import { rubySpawn } from 'ruby-spawn';

export class RubyDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
		return new Promise((resolve, reject) => {
			let socket = new Net.Socket();
			let host = session.configuration.host || '127.0.0.1';
			let port = session.configuration.port || 1234;

			socket.on('connect', () => {
				resolve(new vscode.DebugAdapterServer(port, host));
			});

			if (session.configuration.request === 'attach') {
				socket.on('error', (err) => {
					reject(err);
				});
				socket.connect(port, host);
			} else {
				let opts = {};
				if (session.workspaceFolder) {
					opts['cwd'] = session.workspaceFolder.uri.fsPath;
				}
				console.log('Workspace: ' + opts['cwd']);
				let process = rubySpawn('readapt', ['serve', '--host', host, '--port', port], opts);
				let started = false;

				process.stderr.on('data', (buffer: Buffer) => {
					let text = buffer.toString();
					if (!started && text.match(/^Readapt Debugger/)) {
						started = true;
						socket.connect(port, host);
					}
				});
				process.on('error', (err) => {
					if (started) {
						throw (err);
					} else {
						reject(err);
					}
				});
				process.stdout.on('data', (buffer: Buffer) => {
					vscode.debug.activeDebugConsole.append(buffer.toString());
				});
			}
		});
	}

	dispose() {
		// Nothing to do
	}
}
