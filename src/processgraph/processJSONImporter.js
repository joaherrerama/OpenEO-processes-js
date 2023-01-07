const absolute = require('../processes/absolute.json')
const apply = require('../processes/apply.json')
const linear_scale_range = require('../processes/linear_scale_range.json')
const load_collection = require('../processes/load_collection.json')
const max  = require('../processes/max.json')
const mean = require('../processes/mean.json')
const median = require('../processes/median.json')
const min = require('../processes/min.json')
const mode = require('../processes/mode.json')
const ndvi = require('../processes/ndvi.json')
const reduce_dimension = require('../processes/reduce_dimension.json')


const processes = {
    'absolute':absolute,
    'apply':apply,
    'linear_scale_range':linear_scale_range,
    'load_collection':load_collection,
    'max':max,
    'mean':mean,
    'median':median,
    'min':min,
    'mode':mode,
    'ndvi':ndvi,
    'reduce_dimension':reduce_dimension
}

module.exports = processes;