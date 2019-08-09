import * as vscode from 'vscode';
import * as Net from 'net';
import { rubySpawn } from 'ruby-spawn';

export class RubyDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
	createDebugAdapterDescriptor(session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
		return new Promise((resolve, reject) => {
			let socket = new Net.Socket();

			socket.on('connect', () => {
				if (socket.remotePort && socket.remoteAddress) {
					resolve(new vscode.DebugAdapterServer(socket.remotePort, socket.remoteAddress));
				} else {
					reject(new Error("Connection to debugger could not be resolved"));
				}
			});

			if (session.configuration.request === 'attach') {
				let host = session.configuration.host || '127.0.0.1';
				let port = session.configuration.port || 1234;
				socket.on('error', (err) => {
					reject(err);
				});
				socket.connect(port, host);
			} else {
				let opts = {};
				if (session.workspaceFolder) {
					opts['cwd'] = session.workspaceFolder.uri.fsPath;
				}
				let dbg = (session.configuration.debugger || 'readapt');
				let dbgArgs = ['serve'].concat(session.configuration.debuggerArgs || []);
				if (session.configuration.useBundler) {
					dbgArgs.unshift(dbg);
					dbgArgs.unshift('exec');
					dbg = 'bundle';
				}
				let process = rubySpawn(dbg, dbgArgs, opts);
				let started = false;
				process.stderr.on('data', (buffer: Buffer) => {
					let text = buffer.toString();
					if (!started) {
						if (text.match(/^Readapt Debugger/)) {
							let match = text.match(/HOST=([^\s]*)[\s]+PORT=([0-9]*)/);
							if (match) {
								started = true;
								socket.connect(parseInt(match[2]), match[1]);
							} else {
								reject(new Error("Unable to determine debugger host and port"));
							}
						}
					} else {
						// HACK: Sometimes Readapt's STDERR does not get
						// redirected, e.g., while running RSpec. Appending
						// data from here ensures that error messages still
						// appear in the debug console.
						vscode.debug.activeDebugConsole.append(text);
					}
				});
				process.on('exit', (code) => {
					if (!started) {
						let message = `Debugger exited without connecting (exit code ${code})`;
						if (session.configuration.useBundler) {
							message += "\nIs readapt included in your Gemfile?"
						}
						reject(new Error(message));
					}
				});
			}
		});
	}

	dispose() {
		// Nothing to do
	}
}
