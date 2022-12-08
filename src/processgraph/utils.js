const Datastore = require('@seald-io/nedb');
const crypto = require('crypto');
const fse = require('fs-extra');
const path = require('path');
const { Utils: CommonUtils } = require('@openeo/js-commons');
const proj4 = require('proj4');
const OEProcessRegistry = require('./registry');

const Utils = {
  crsBboxes: {},
  serverUrl: null,
  apiPath: null,

  sequence(min, max) {
    const list = [];
    for (let i = min; i <= max; i++) {
      list.push(i);
    }
    return list;
  },

  toISODate(timestamp) {
    return new Date(timestamp).toISOString();
  },

  encodeQueryParams(data) {
    const ret = [];
    for (const d in data) {
      ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
    }
    return ret.join('&');
  },

  isNumeric(num) {
    return CommonUtils.isNumeric(num);
  },

  isObject(obj) {
    return CommonUtils.isObject(obj);
  },

  size(obj) {
    return CommonUtils.size(obj);
  },

  omitFromObject(obj, omit) {
    return CommonUtils.omitFromObject(obj, omit);
  },

  pickFromObject(obj, pick) {
    return CommonUtils.pickFromObject(obj, pick);
  },

  loadDB(name, folder = './storage/database/') {
    const db = new Datastore({ filename: `${folder + name}.db`, autoload: true });
    db.persistence.setAutocompactionInterval(60 * 60 * 1000); // Once every hour
    return db;
  },

  generateHash(length = 16) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  },

  getTimestamp() {
    return Math.floor(Date.now() / 1000);
  },

  getISODateTime(datetime = null) {
    if (datetime === null) {
      datetime = new Date();
    } else if (typeof datetime === 'string' || typeof datetime === 'number') {
      datetime = new Date(datetime);
    }
    if (datetime instanceof Date) {
      datetime = datetime.toISOString();
    }
    return datetime.replace(/\.\d{3}/, ''); // Remove milliseconds
  },

  crsToString(crs, defaultCrs = null) {
    if (!crs) {
      crs = defaultCrs;
    }
    if (typeof crs === 'number') {
      return `EPSG:${crs}`;
    }
    return crs;
  },

  crsToNumber(crs) {
    if (typeof crs === 'number') {
      return crs;
    }
    if (typeof crs === 'string' && crs.startsWith('EPSG:')) {
      return parseInt(crs.substring(5), 10);
    }
    return null;
  },

  bboxToGeoJson(bbox) {
    const geom = {
      geodesic: false,
      type: 'Polygon',
      coordinates: [
        [
          [bbox.west, bbox.south],
          [bbox.east, bbox.south],
          [bbox.east, bbox.north],
          [bbox.west, bbox.north],
          [bbox.west, bbox.south],
        ],
      ],
    };
    if (bbox.crs) {
      geom.crs = {
        type: 'name',
        properties: {
          name: this.crsToString(bbox.crs),
        },
      };
    }
    return geom;
  },

  geoJsonBbox(geojson) {
    var getCoordinatesDump = function (gj) {
      switch (gj.type) {
        case 'Point':
          return [gj.coordinates];
        case 'MultiPoint':
        case 'LineString':
          return gj.coordinates;
        case 'MultiLineString':
        case 'Polygon':
          return gj.coordinates.reduce((dump, part) => dump.concat(part), []);
        case 'MultiPolygon':
          return gj.coordinates.reduce((dump, poly) => dump.concat(
            poly.reduce((points, part) => points.concat(part), []),
          ), []);
        case 'GeometryCollection':
          return gj.geometries.reduce((dump, g) => dump.concat(getCoordinatesDump(g)), []);
        case 'Feature':
          return getCoordinatesDump(gj.geometry);
        case 'FeatureCollection':
          return gj.features.reduce((dump, f) => dump.concat(getCoordinatesDump(f)), []);
        default:
          throw new Error('Invalid GeoJSON type.');
      }
    };
    const coords = getCoordinatesDump(geojson);
    const bbox = coords.reduce(
      (prev, coord) => [
        Math.min(coord[0], prev[0]),
        Math.min(coord[1], prev[1]),
        Math.max(coord[0], prev[2]),
        Math.max(coord[1], prev[3]),
      ],
      [
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
      ],
    );
    return {
      west: bbox[0],
      south: bbox[1],
      east: bbox[2],
      north: bbox[3],
      crs: 4326,
    };
  },

  getFileExtension(file) {
    return file.split('.').pop();
  },

  extensionToMediaType(ext) {
    ext = this.getFileExtension(ext);
    switch (ext.toLowerCase()) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'json':
        return 'application/json';
      default:
        return 'application/octet-stream';
    }
  },

  walk(dir) {
    return fse.readdir(dir).then((files) => Promise.all(
      files.map((file) => {
        const filepath = path.join(dir, file);
        return fse.stat(filepath).then((stats) => {
          if (stats.isDirectory()) {
            return this.walk(filepath);
          } if (stats.isFile()) {
            return Promise.resolve({
              path: filepath,
              stat: stats,
            });
          }
        });
      }),
    ).then((foldersContents) => Promise.resolve(
      foldersContents.reduce(
        (all, folderContents) => all.concat(folderContents),
        [],
      ),
    )));
  },

  timeId() {
    const t = process.hrtime();
    return String(t[0] * 1e9 + t[1]).padStart(27, '0');
  },

  proj(from, to, coords) {
    const fromCrs = this.crsToString(from);
    const toCrs = this.crsToString(to);
    if (fromCrs === toCrs) {
      return coords;
    }

    this.loadCrsDef(fromCrs);
    this.loadCrsDef(toCrs);

    const newCoords = proj4(fromCrs, toCrs, coords);
    if (newCoords.filter((n) => !this.isNumeric(n)).length > 0) {
      throw new Error(
        `CRS conversion from ${fromCrs} to ${toCrs} failed.`,
      );
    }
    return newCoords;
  },

  projExtent(extent, targetCrs) {
    extent.crs = extent.crs > 0 ? extent.crs : 4326;
    const p1 = this.proj(extent.crs, targetCrs, [extent.west, extent.south]);
    const p2 = this.proj(extent.crs, targetCrs, [extent.east, extent.north]);
    return {
      west: p1[0],
      south: p1[1],
      east: p2[0],
      north: p2[1],
      crs: this.crsToNumber(targetCrs),
    };
  },

  getCrsBBox(crs) {
    crs = this.crsToString(crs);
    if (!this.crsBboxes[crs]) {
      this.loadCrsDef(crs);
    }
    return this.crsBboxes[crs];
  },
  getRegistry(path) {
    const route = path ? path: './src/processes'
    const registry = new OEProcessRegistry();
    registry.addFromFolder(route);
    return registry
  }
};

module.exports = Utils;
