# JSON-tagged

Parser for tagged JSON data

## Usage

### Parsing a tagged JSON file to find tags

```
json-tag FILENAME -tags "foo,bar,baz"
```

### Parsing a tagged JSON file to exclude tags

```
json-tag FILENAME -exclude "foo,bar,baz"
```

### Parsing a tagged JSON file to return exclusively data with given tags

```
json-tag FILENAME -only "foo,bar,baz"
```

## TODO:
* Create the CLI to match signature above
* Finish unit tests of tags within deeply nested objects / arrays
* Test this out as a dependency
* Publish to NPM