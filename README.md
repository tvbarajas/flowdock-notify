# flowdock-notify-step

[![wercker status](https://app.wercker.com/status/d90ede1ea7ada3038cb5b0c4497c8e07/m "wercker status")](https://app.wercker.com/project/bykey/d90ede1ea7ada3038cb5b0c4497c8e07)

Send a build success/failure notification to a FlowDock team inbox

# Box Requirements

 * Node

# Options

* `from-address` (required) Email address notifications should appear to be sent from

# Example

Add a pipeline environment variable: WERCKER_FLOWDOCK_NOTIFY_FLOW_API_TOKEN with your Flowdock token.

```yaml
build:
  after-steps:
    - tbarajas/flowdock-notify:
        from-address: build@message.com
```

# TODO

* Match project structure from https://github.com/wercker/step-validate-wercker-step
* Add tests

# License

The MIT License (MIT)

Copyright (c) 2013 Travis Barajas

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Changelog

## v0.0.1 Initial release
## v0.0.2 Ready for use
## v0.0.3 First publish to Wercker
## v0.0.4 Re-factor. Unit Tests. Added commitId to successful build message. 