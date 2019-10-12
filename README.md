# Ruby Debug

**A native Ruby debugger using the Debug Adapter Protocol.**

*This extension is still in early development. Please report bugs at [https://github.com/castwide/vscode-ruby-debug](https://github.com/castwide/vscode-ruby-debug).*

## Features

* Standard breakpoints
* Conditional breakpoints (with readapt >= 0.7.0)
* Local and global variable data
* Next, step in, step out
* Pause while running
* Evaluate expressions in debug console
* Individual thread control
* Remote workspace support

## Requirements

Ruby Debug requires the `readapt` gem. Install it from the command line:

```
gem install readapt
```

Or add it to your project's Gemfile:

```ruby
gem 'readapt', group :development
```

Readapt requires Ruby >= 2.2.

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

### Debugging External Programs

The debugger can also launch external Ruby executables. The debug configuration snippets include an example for debugging RSpec.

### Using Bundler

Launch configurations include a `useBundler` option. If it's `true`, the debugger will start with `bundle exec readapt serve` before launching the program.

Note that `readapt` must be included in your Gemfile for `useBundler` to work.

### Example Configurations

The following snippets demonstrate some common launch configurations you can add to `launch.json`.

#### Debug Active File

```
{
    "type": "ruby-debug",
    "request": "launch",
    "name": "Active File",
    "program": "${file}",
    "programArgs": [],
    "useBundler": false
}
```

#### Debug Active RSpec File

```
{
    "type": "ruby-debug",
    "request": "launch",
    "name": "RSpec (Active File)",
    "program": "rspec",
    "programArgs": [
        "-I",
        "${workspaceFolder}",
        "${file}"
    ],
    "useBundler": false
}
```

#### Debug Rails

```
{
    "type": "ruby-debug",
    "request": "launch",
    "name": "Rails",
    "program": "${workspaceFolder}/bin/rails",
    "programArgs": ["s"],
    "useBundler": true
}
```

**Note:** Make sure the readapt gem is included in your Gemfile, e.g.:

```ruby
gem 'readapt', group: :development
```

## Work in Progress

* Multiple stack frames per thread
* Hit counts
