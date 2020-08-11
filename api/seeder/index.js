const fs = require('fs');
const util = require('util');
const path = require('path');

const db = require('../config/database');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

// eslint-disable-next-line no-undef
const dataDir = path.join(__dirname, '.', 'data');

const modelDir = {
    // eslint-disable-next-line no-undef
    user: path.join(__dirname, '..', 'models'),
    
    // eslint-disable-next-line no-undef
    question: path.join(__dirname, '..', 'models'),

    // eslint-disable-next-line no-undef
    answer: path.join(__dirname, '..', 'models')
};


const seed = async () => {
    const files = await readdir(dataDir);

    if (!files) return new Error(`Reading files dir error ${files}`);

    const extractedFileData = await extractFileData(files);

    if (!extractedFileData) return new Error(`extractedFileData error ${extractedFileData}`);
};

const extractFileData = async (files) => {

    if (!files) return new Error('Invalid Input');

    console.log(`Starting Seed for ${files.length} files`);

    for (let i = 0; i < files.length; ++i) {
        const modalData = await getJSONFileDataAsync(files[i]);
        const filename = files[i].replace('.json', '');
        const modelFile = filename + '.js';
        const modal = await require(path.join(modelDir[filename], modelFile));
        console.log(modelDir[filename]);
        
        await restoreInDB(modal, modalData, modelFile);
    }
};

const getJSONFileDataAsync = async (file) => {
    try {
        const content = await readFile(path.join(dataDir, file), 'utf8');
        if (content) {
            return JSON.parse(content)
        }
    } catch (ex) {
        throw new Error(ex)
    }
};


/*
   Description: Add or update records to database
*/
const restoreInDB = async (modal, data, modelFile) => {
    const fileName = modelFile.replace('.js', '');
    console.log(`Running seed for ${fileName}`);
    
    for (let i = 0; i < data.length; ++i) {

        const { _id, ...value } = typeof (data[i]) === 'string' ? await JSON.parse(data[i]): data[i];

        if (_id) {
            try {
                const updated = await modal.findOneAndUpdate({
                    _id
                }, value, {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                });

                if (!updated) {
                    console.log('Failed during update ', _id);
                }

            } catch (ex) {
                console.log('Failed during update ', _id, ex.message);
            }

        } else {
            try {
                const inserted = await modal.create(data[i]);

                if (!inserted) {
                    console.log("Error while insertion", data[i]);
                }

            } catch (ex) {
                console.log("Error while insertion", ex.message)
            }
        }
    }
}

(async () => {
    try {
        await db();
        await seed();
    } catch (err) {
        console.log(err);
        // eslint-disable-next-line no-undef
        process.exit(1);
    } finally {
        console.log('Success seed');
        // eslint-disable-next-line no-undef
        process.exit(0);
    }
})();