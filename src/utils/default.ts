/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Default {
    public static readonly APP_ID: string = 'ehr.app'
    public static readonly APP_TITLE: string = 'HANIoT EHR Service'
    public static readonly APP_DESCRIPTION: string = 'Microservice responsible for manage EHR data.'
    public static readonly NODE_ENV: string = 'development' // development, test, production
    public static readonly PORT_HTTP: number = 5000
    public static readonly PORT_HTTPS: number = 5001
    public static readonly SWAGGER_PATH: string = './src/ui/swagger/api.yaml'
    public static readonly SWAGGER_URI: string = 'https://api.swaggerhub.com/apis/haniot/ehr-service/v1/swagger.json'
    public static readonly LOGO_URI: string = 'https://i.imgur.com/O7PxGWQ.png'

    // RabbitMQ
    public static readonly RABBITMQ_URI: string = 'amqp://guest:guest@127.0.0.1:5672'

    // MongoDB
    public static readonly MONGODB_URI: string = 'mongodb://127.0.0.1:27017/ehr-service'
    public static readonly MONGODB_URI_TEST: string = 'mongodb://127.0.0.1:27017/ehr-service-test'

    // Log
    public static readonly LOG_DIR: string = 'logs'

    // Certificate
    // To generate self-signed certificates, see: https://devcenter.heroku.com/articles/ssl-certificate-self
    public static readonly SSL_KEY_PATH: string = '.certs/server.key'
    public static readonly SSL_CERT_PATH: string = '.certs/server.crt'
    public static readonly RABBITMQ_CA_PATH: string = '.certs/ca.crt'
}
