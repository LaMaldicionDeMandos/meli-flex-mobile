import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import _ from "lodash";
import { App } from '@capacitor/app';

const BUCKET_NAME = process.env.REACT_APP_IMAGES_BUCKET_NAME;
const REGION = process.env.REACT_APP_IMAGES_REGION;
const IDENTITY_ID = process.env.REACT_APP_IMAGES_IDENTITY_POOL_ID;

AWS.config.update({
    region: REGION,
    credentials: new AWS.CognitoIdentityCredentials({ IdentityPoolId: IDENTITY_ID})
});

const EXPIRATION = 60*10;

const s3 = new S3({
    apiVersion: "2006-03-01",
    params: { Bucket: BUCKET_NAME }
});

class ImagesService {
    getImages() {
        const promise = new Promise((resolve, reject) => {
            s3.listObjects({Delimiter: '/'}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const images = _.map(data.Contents, (content) => {
                        const url = s3.getSignedUrl('getObject', {Bucket: BUCKET_NAME, Key: content.Key, Expires: EXPIRATION});
                        return {src: url, caption: content.Key, key: content.Key};
                    });
                    resolve(images);
                }
            })
        })
        return promise;
    }

    getImage(key) {
        const promise = new Promise((resolve, reject) => {
            s3.getObject({Bucket: BUCKET_NAME, Key: key}, (err, data) => {
                const url = s3.getSignedUrl('getObject', {Bucket: BUCKET_NAME, Key: key, Expires: EXPIRATION});
                resolve(url);
            });
        });
        return promise;
    }

    uploadImage(name, file) {
        return new AWS.S3.ManagedUpload({params: {Bucket: BUCKET_NAME, Key: name, Body: file}})
            .promise()
            .then(data => {
                const url = s3.getSignedUrl('getObject', {Bucket: BUCKET_NAME, Key: data.Key, Expires: EXPIRATION});
                return {src: url, caption: data.Key, key: data.Key};
                });
    }
}

const service = new ImagesService();
export default service;
