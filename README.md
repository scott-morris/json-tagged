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

## Tagged JSON Format

### Objects
```
{
	$tags: ["active"],
	name: "Take out the trash",
	assignee: "Dad"
}
```

### Non keyed values
```
{
	$tags: ["active"],
	$value: [
		"Take out the trash",
		"Do dishes"
	]
}
```

## TODO:
* Create the CLI to match signature above
* Finish unit tests of tags within deeply nested objects / arrays
* Test this out as a dependency
* Publish to NPM
* Add some options
** Custom replacement of `$tag` and `$value` key names
** Choose whether to keep the `$tag` property on objects