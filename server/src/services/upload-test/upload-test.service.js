// Initializes the `upload-test` service on path `/upload-test`
import { UploadTest } from './upload-test.class';

import hooks from './upload-test.hooks';

import { google } from 'googleapis';
import multer from 'multer';
import fs from 'fs';

export default function (app) {
    const options = {
        paginate: app.get('paginate'),
    };

    /**
     * Get your credentials.json file path
     * @type {string}
     */
    const CREDENTIALS_PATH = app.get('CREDENTIALS_PATH');

    let storage = multer.memoryStorage();
    let upload = multer({ storage: storage });

    // Initialize our service with any options it requires
    app.use(
        '/upload-test',
        upload.any(),
        async function (req, res, next) {
            const files = req.files;
            const folderName = req.body.folderName;

            if (!folderName) {
                req.body = {
                    result: false,
                    message: 'folderName field is required.',
                };
                next();
            }

            // console.log(files);
            try {
                /**
                 * @type {GoogleAuth}
                 * @description Authenticate using service account credential
                 */
                const auth = new google.auth.GoogleAuth({
                    keyFile: CREDENTIALS_PATH,
                    scopes: ['https://www.googleapis.com/auth/drive.file'],
                });

                /**
                 * @type {drive_v3.Drive}
                 * @description Initialize google drive instance
                 */
                const drive = google.drive({
                    version: 'v3',
                    auth,
                });

                /**
                 * @type {string}
                 * @description Get your google drive's storage
                 */
                const storage = await drive.about
                    .get({
                        fields: '*',
                    })
                    .then((res) => res.data.storageQuota);

                const { limit: storageLimit, usage: storageUsage } = storage;

                for (const file of files) {
                    const { size } = file;
                    if (parseInt(storageUsage) + size > parseInt(storageLimit)) {
                        req.body = {
                            result: false,
                            message: 'Drive storage full.',
                        };
                        next();
                        break;
                    }
                }

                /**
                 * @type {GaxiosResponse<drive_v3.Schema$FileList>}
                 * @description list all files and folders in drive.
                 */
                // const driveFiles = await drive.files.list({
                //     // fields: 'files(name, webViewLink)',
                // });

                /**
                 * mimeType = application/vnd.google-apps.folder used to search restricted for folders
                 * @type {GaxiosResponse<drive_v3.Schema$FileList>}
                 * @description search folder with given folder name if not create one.
                 */
                const folders = await drive.files
                    .list({
                        q: `name = '${folderName}' and (mimeType='application/vnd.google-apps.folder')`,
                        fields: 'nextPageToken, files(id, name)',
                        spaces: 'drive',
                        pageToken: null,
                    })
                    .then((res) => res.data.files);

                let folderId = '';
                if (!folders.length) {
                    folderId = await drive.files
                        .create({
                            requestBody: {
                                name: folderName,
                                mimeType: 'application/vnd.google-apps.folder',
                            },
                        })
                        .then((res) => res.data.id);
                } else {
                    folderId = folders[0].id;
                }

                // console.log(folderId);

                /**
                 * @description upload files.
                 */
                let uploadedFiles = [];
                for (const file of files) {
                    const { mimetype, originalname: filename, buffer } = file;

                    const pathToFile = `public/drive/${Date.now()}-${filename}`;

                    fs.writeFileSync(pathToFile, buffer);

                    // console.log(mimetype, filename, buffer);

                    /**
                     * @type {GaxiosResponse<drive_v3.Schema$File>}
                     * @description Upload file to google drive.
                     */
                    const response = await drive.files.create({
                        requestBody: {
                            name: `${Date.now()}-${filename}`,
                            mimeType: mimetype,
                            parents: [folderId],
                        },
                        media: {
                            mimeType: mimetype,
                            body: fs.createReadStream(pathToFile),
                        },
                    });

                    // console.log(response);

                    /**
                     * @type {GaxiosResponse<drive_v3.Schema$Permission>}
                     * @description Set permission of file (Here public access read only)
                     */
                    await drive.permissions.create({
                        fileId: response.data.id,
                        requestBody: {
                            type: 'anyone',
                            role: 'reader',
                            allowFileDiscovery: true,
                        },
                    });

                    /**
                     * @description Make sharable link for file
                     */
                    let link = `https://drive.google.com/uc?export=view&id=${response.data.id}`;

                    uploadedFiles.push(link);

                    console.log(uploadedFiles);

                    fs.rmSync(pathToFile);
                }
                req.body = {
                    result: true,
                    files: uploadedFiles,
                };
                next();
            } catch (e) {
                console.log(e);
                req.body = {
                    result: false,
                    message: e.message,
                };
                next();
            }
        },
        new UploadTest(options, app),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('upload-test');

    service.hooks(hooks);
}
