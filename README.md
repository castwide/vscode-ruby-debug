# Ruby Debug

**A native Ruby debugger using the Debug Adapter Protocol.**

*This extension is still in early development. Please report bugs at [https://github.com/castwide/vscode-ruby-debug](https://github.com/castwide/vscode-ruby-debug).*

## Features

* Standard breakpoints
* Local and global variable data
* Multiple thread support
* Next, step in, step out

## Requirements

Ruby Debug requires the `readapt` gem. Install it from the command line:

```
gem install readapt
```

Or add it to your project's Gemfile:

```ruby
gem 'readapt', group :development
```

## Usage

If you're not familiar with VS Code's debugger, see [the debugger documentation](https://code.visualstudio.com/docs/editor/debugging) for more information.

### Quick Start

1. Open a Ruby project folder in VS Code.
2. Go to the Debug view from the Activity bar.
3. Click the Play button at the top of the Debug view (or use the `F5` keyboard shortcut).
   (If you don't have a launch configuration in the current workspace, the extension will debug the active file.)

### Workspace Configurations

Click the dropdown at the top of the Debug view and click "Add Configuration."

The simplest configuration is "Launch." It will start the debugger with a Ruby file in your workspace. The default behavior is to prompt the user for a file. You can set the `program` option to a specific file instead; e.g., `"program": "${workspaceFolder}/path/to/your/file.rb"`.

The debugger can also launch external Ruby executables. The configuration snippets include examples for debugging Rails and RSpec.

## Work in Progress

* Conditional breakpoints
* Multiple stack frames per thread
* Individual thread control
* Evaluate expressions
* Use rvm/rbenv rubies
