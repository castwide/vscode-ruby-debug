# Ruby Debug

**A native Ruby debugger using the Debug Adapter Protocol.**

## Requirements

Ruby Debug requires the `readapt` gem. Install it from the command line:

```
gem install readapt
```

Or add it to your project's Gemfile:

```ruby
gem 'readapt', group :development
```

## Getting started

1. Open a Ruby project folder in VS Code.
2. Go to the Debug view from the Activity bar.
3. Click the Play button at the top of the Debug view (or use the `F5` keyboard shortcut).
   (If you don't have a launch configuration in the current workspace, the extension will debug the active file.)

See the [VS Code documentation](https://code.visualstudio.com/docs/editor/debugging) for more information about using debuggers.

## Features

* Standard breakpoints
* Local and global variable data
* Multiple thread support
* Next, step in, step out

## Work in Progress

* Conditional breakpoints
* Multiple stack frames per thread
* Individual thread control
* Evaluate expressions
* Use rvm/rbenv rubies
