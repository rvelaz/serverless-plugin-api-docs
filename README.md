# serverless-plugin-api-docs
A serverless plugin to **automatically** create a lambda function which returns the swagger-ui HTML based on the given swagger spec JSON file `GET /docs` => swagger-ui

## Install
using NPM
`npm install --save-dev 8select/serverless-plugin-api-docs`

Add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - serverless-plugin-api-docs
```

## Configuration

```yaml
custom:
  documentation:
    path: 'path/to/swagger.json'
    contentUrl: '<URL_TO_YOUR_HOSTED_SWAGGER_UI_JS_FILES>'
```
