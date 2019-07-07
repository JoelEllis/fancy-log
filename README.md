# fancy-log-levels

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Log things, prefixed with a timestamp and level. Choose what to log, based on verbosity level.

## Usage

```js
var log = require('fancy-log-levels');
log(3)

log.debug('a message');
// [16:27:02] [D] a message

log.error('oh no!');
// [16:27:02] [E] oh no!
```

## API

### `log(lvl)`

Sets the debug level.

- -1 is mute
- 0 is error and user-info
- 1 is warning
- 2 is info
- 3 is debug

### `log.debug(msg...)`

Logs the message as if you called `console.log` but prefixes the output with the
current time in HH:MM:ss format and `[D]`.

### `log.error(msg...)`

Logs the message as if you called `console.error` but prefixes the output with the
current time in HH:MM:ss format and `[E]`.

### `log.warn(msg...)`

Logs the message as if you called `console.warn` but prefixes the output with the
current time in HH:MM:ss format and `[W]`.

### `log.info(msg...)`

Logs the message as if you called `console.info` but prefixes the output with the
current time in HH:MM:ss format and `[I]`.

### `log.user(msg...)`

Logs the message as if you called `console.info` but prefixes the output with the
current time in HH:MM:ss format and `[I]`.

### `log.dir(msg...)`

Logs the message as if you called `console.dir` but prefixes the output with the
current time in HH:MM:ss format and `[D]`.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/fancy-log-levels.svg
[npm-url]: https://www.npmjs.com/package/fancy-log-levels
[npm-image]: http://img.shields.io/npm/v/fancy-log-levels.svg
