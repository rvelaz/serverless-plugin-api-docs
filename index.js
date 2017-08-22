'use strict'

class ServerlessPlugin {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options

    this.config = this.serverless.service.custom.documentation

    this.hooks = {
      'before:package:createDeploymentArtifacts': this.createDocs.bind(this)
    }
  }

  createDocs () {
    const name = `${this.serverless.service.serviceObject.name}-${this.options.stage}-docs`

    const includePath = 'node_modules/serverless-plugin-api-docs/docs.js'

    const docsFunction = {
      docs: {
        memorySize: 128,
        timeout: 60,
        handler: 'node_modules/serverless-plugin-api-docs/docs.handler',
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
          include: [
            includePath,
            this.config.path
          ]
        },
        name,
        environment: {
          PATH_TO_SWAGGER_SPEC: this.config.path,
          CONTENT_URL: this.config.contentUrl,
          HOST_URL: {
            'Fn::Join': [
              '',
              [
                {
                  'Ref': 'ApiGatewayRestApi'
                },
                '.execute-api.eu-central-1.amazonaws.com/'
              ]
            ]
          }
        }
      }
    }

    this.serverless.service.functions = Object.assign(
      this.serverless.service.functions,
      {},
      docsFunction
    )

    this.serverless.cli.log('GET /docs function successfull added')
  }
}

module.exports = ServerlessPlugin
