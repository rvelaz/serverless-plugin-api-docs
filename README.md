# serverless-plugin-api-docs

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Work with [SWAGGER](https://swagger.io/docs/specification) documentation for [Serverless v1.0](https://serverless.com/)
projects.

A [serverless](http://www.serverless.com) plugin to **automatically** create a lambda function which returns the
swagger-ui HTML based on the given swagger spec JSON file `GET /docs` => swagger-ui

## Install

using `npm`:

```
npm install --save-dev @8select/serverless-plugin-api-docs
```

or `yarn`:

```
yarn add -D @8select/serverless-plugin-api-docs
```

Add the plugin to your `serverless.yml` file:

```yaml
plugins:
  - serverless-plugin-api-docs
```

## Prerequisites

[Download](https://swagger.io/swagger-ui/) and host swagger-ui library files e.g. with S3

* swagger-ui.css
* swagger-ui-bundle.js
* swagger-ui-standalone-preset.js

## Configuration

```yaml
custom:
  documentation:
    contentUrl: '<URL_TO_YOUR_HOSTED_SWAGGER_UI_FILES>' # REQUIRED
    name: '<your_custom_lambda_function_name>' # OPTIONAL - default = 'docs'
```
### Authorizer

If you are using AWS as a provider, you can define an authorizer for the docs function.

```yaml
custom:
  documentation:
    authorizer:
      name: 'authorizer name' # REQUIRED
      arn: '<ARN_OF_THE_AUTORIZER>' # REQUIRED. e.g. arn:aws:cognito-idp:us-east-1:1233:userpool/us-east-1_1
```


To load your `swagger.json` you need to add a `resolve.alias`.  
E.g. for `webpack`:  
_Assupmtion_:

```
<root>
 |
 |-docs - REST API swagger spec & definitions
    | swagger.json
 | webpack.config.json
```

```js
module.exports = {
  // [...],
  resolve: {
    alias: {
      PATH_TO_SWAGGER_SPEC: path.resolve(__dirname, 'docs/swagger.json'),
    },
  },
  // [...],
}
```
