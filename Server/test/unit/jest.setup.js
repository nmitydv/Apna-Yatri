// Jest global setup to shim SlowBuffer and define fallback env variables to prevent crashes during config loading in Jest VM contexts.
const buffer = require('buffer');
if (!buffer.SlowBuffer) {
    buffer.SlowBuffer = function() {};
}
if (!buffer.SlowBuffer.prototype) {
    buffer.SlowBuffer.prototype = {};
}
if (!buffer.SlowBuffer.prototype.equal) {
    buffer.SlowBuffer.prototype.equal = function() {};
}

// Define mock Firebase environment variables required during config registry loading in test runs
process.env.FIREBASE_private_key = 'mock_firebase_private_key';
process.env.FIREBASE_type = 'service_account';
process.env.FIREBASE_project_id = 'mock_project';
process.env.FIREBASE_private_key_id = 'mock_key_id';
process.env.FIREBASE_client_email = 'mock@example.com';
process.env.FIREBASE_client_id = 'mock_client_id';
process.env.FIREBASE_auth_uri = 'mock_auth_uri';
process.env.FIREBASE_token_uri = 'mock_token_uri';
process.env.FIREBASE_auth_provider_x509_cert_url = 'mock_cert_url';
process.env.FIREBASE_client_x509_cert_url = 'mock_client_cert_url';
