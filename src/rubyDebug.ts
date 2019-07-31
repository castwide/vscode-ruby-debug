import * as vscode from 'vscode';
import * as Net from 'net';
import { ChildProcess } from 'child_process';
const crossSpawn = require('cross-spawn');

export class RubyDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
	private process?: ChildProcess;

	createDebugAdapterDescriptor(session: vscode.DebugSession, executable: vscode.DebugAdapterExecutable | undefined): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
		return new Promise((resolve, reject) => {
			let process: ChildProcess = crossSpawn('ruby', ['D:/Users/fsnyd/Documents/code/rdap/run.rb']);
			let started = false;
			process.stderr.on('data', (buffer: Buffer) => {
				let text = buffer.toString();
				if (!started && text.match(/^Rdap Debugger/)) {
					started = true;
					let socket = new Net.Socket();
					socket.on('connect', () => {
						resolve(new vscode.DebugAdapterServer(1234, '127.0.0.1'));
					});
					socket.connect(1234, '127.0.0.1');
				}
				console.log(text);
			});
			process.stdout.on('data', (buffer: Buffer) => {
				console.log(buffer.toString());
			});
			this.process = process
		});
	}

	dispose() {
		if (this.process) {
			this.process.kill();
		}
	}
}
