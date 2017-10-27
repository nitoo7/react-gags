'use strict';

const _ = require('lodash');
const Xerror = require('x-error');
const bluebird = require('bluebird');
const S3 = require('aws-sdk/clients/s3');

class S3Service {
  constructor(config) {
    this.s3Config = {
      apiVersion: '2006-03-01'
    };
    _.assign(this.s3Config, config);
    this.s3Client = new S3(this.s3Config);
  }

  getObject(bucket, key, opts) {
    if (_.isUndefined(bucket) || _.isUndefined(key)) {
      return bluebird.reject(new Xerror('invalid bucket or key'));
    } else {
      return new bluebird((resolve, reject) => {
        const s3Queryparams = {
          Bucket: bucket,
          Key: key,
        };
        _.assign(s3Queryparams, opts);
        this.s3Client.getObject(s3Queryparams, function(err, data) {
          if (err) {
            return reject(err);
          } else {
            return resolve(data && data.Body);
          }
        });
      });
    }
  }

  headObject(bucket, key, opts) {
    if (_.isUndefined(bucket) || _.isUndefined(key)) {
      return bluebird.reject(new Xerror('invalid bucket or key'));
    } else {
      return new bluebird((resolve, reject) => {
        const s3Queryparams = {
          Bucket: bucket,
          Key: key,
        };
        _.assign(s3Queryparams, opts);
        this.s3Client.headObject(s3Queryparams, function(err, data) {
          if (err) {
            return reject(err);
          } else {
            return resolve(data);
          }
        });
      });
    }
  }

  putObject(location, body, opts) {
    console.log("BBBB", location)
    const s3Queryparams = {
      Bucket: location.bucket,
      Key: location.key,
    };
    _.assign(s3Queryparams, opts);
    if (_.isUndefined(body) || _.isNull(body)) {
      return bluebird.reject(new Xerror({
        safe: true,
        message: 'invalid body'
      }));
    } else if (_.isString(body)) {
      s3Queryparams.Body = new Buffer(body);
    } else {
      s3Queryparams.Body = body;
    }

    return new bluebird((resolve, reject) => {
      this.s3Client.putObject(s3Queryparams, (err, response) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(response);
        }
      });
    });
  }
}

// Expose the class and not the instance
// So that clients with different configuratons
// can be created on demand
module.exports = S3Service;