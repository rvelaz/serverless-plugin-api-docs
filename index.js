'use strict'

const packagePath = 'node_modules/@8select/serverless-plugin-api-docs'

class ServerlessPlugin {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options

    this.config = this.serverless.service.custom.documentation

    this.hooks = {
      'before:deploy:initialize': this.createDocs.bind(this)
    }
  }

  createDocs () {
    const name = `${this.serverless.service.serviceObject.name}-${this.options.stage}-docs`
    const handlerPath = `${packagePath}/docs.js`
    const functionName = this.config.name || 'docs'

    const docsFunction = {
      [functionName]: {
        name,
        memorySize: 128,
        timeout: 60,
        handler: `${packagePath}/docs.handler`,
        events: [
          {
            http: {
              method: 'GET',
              path: 'docs',
              cors: true
            }
          }
        ],
        package: {
          include: [ handlerPath, this.config.path ]
        },
        environment: {
          PATH_TO_SWAGGER_SPEC: this.config.path,
          CONTENT_URL: this.config.contentUrl,
          HOST_URL: {
            'Fn::Join': [
              '',
              [
                {
                  Ref: 'ApiGatewayRestApi'
                },
                '.execute-api.eu-central-1.amazonaws.com/'
              ]
            ]
          }
        }
      }
    }

    this.serverless.service.functions = Object.assign(this.serverless.service.functions, {}, docsFunction)

    this.serverless.cli.log(`GET /${functionName} function successfull added`)
  }
}

module.exports = ServerlessPlugin
