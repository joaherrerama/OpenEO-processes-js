const absolute = require('../processes/absolute')
const apply = require('../processes/apply')
const linear_scale_range = require('../processes/linear_scale_range')
const load_collection = require('../processes/load_collection')
const max  = require('../processes/max')
const mean = require('../processes/mean')
const median = require('../processes/median')
const min = require('../processes/min')
const mode = require('../processes/mode')
const ndvi = require('../processes/ndvi')
const reduce_dimension = require('../processes/reduce_dimension')


const processes = {
    absolute,
    apply,
    linear_scale_range,
    load_collection,
    max,
    mean,
    median,
    min,
    mode,
    ndvi,
    reduce_dimension
}

function process_importer (name) {
    return processes[name];
}

module.exports = process_importer;