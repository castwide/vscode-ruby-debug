# Ruby Debug

**A native Ruby debugger using the Debug Adapter Protocol.**

## Requirements

Ruby Debug requires the `rdap` gem. Install it from the command line:

```
gem install rdap
```

Or add it to your project's Gemfile:

```ruby
gem 'rdap', group :development
```

## Getting started

1. Open a Ruby project folder in VS Code.
2. Go to the Debug view from the Activity bar.
3. Select "Add Configuration" from the dropdown at the top of the Debug view.
4. The Ruby Debug configurations are labeled "Ruby Debug." In this example, we'll use "Ruby Debug: Launch File."
5. Change the `program` setting to an executable Ruby file.
6. Click the "Start Debugging" button in the Debug view.

See the [VS Code documentation](https://code.visualstudio.com/docs/editor/debugging) for more information about using debuggers.

## Configuration



## Features

* Standard breakpoints
* Multiple thread support
* Next, step in, step out

## Work in Progress

* Conditional breakpoints
* Multiple stack frames per thread
* Individual thread control
