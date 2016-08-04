'use strict';
const BaseModel = require('./base');

class JobModel extends BaseModel {
    /**
     * Construct a JobModel object
     * @method constructor
     * @param  {Object}    datastore         Object that will perform operations on the datastore
     */
    constructor(datastore) {
        super('job', datastore);
    }

    /**
     * Create a job
     * @method create
     * @param  {Object}    config               Config object
     * @param  {String}    config.pipelineId    The pipeline that the job belongs to
     * @param  {String}    config.name          The job name
     * @param  {Function}  callback             fn(err, data) where data is the newly created object
     */
    create(config, callback) {
        const pipelineId = config.pipelineId;
        const name = config.name;
        const id = this.generateId(config);
        const jobConfig = {
            table: this.table,
            params: {
                id,
                data: {
                    name,
                    pipelineId,
                    state: 'ENABLED'
                }
            }
        };

        return this.datastore.save(jobConfig, callback);
    }
}

module.exports = JobModel;