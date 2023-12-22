import GisBase from './GisBase';
/**Gis Basic Layer */
export default class GisBaseLayer extends GisBase {
  constructor() {
    super('Gis基础图层');
  }
  /**
   * Add 3DFile tilt photography
   * @param {object} config configuration
   */
  add3DTile(config) {
    let item = {
      id: '3dTileBase',
      name: '3dTileBaseLayer',
      url: 'http://mapserver/beijing/tileset.json',
      type: 'b3dm',
      token: 'ABCDEFG',
      visible: true,
      alpha: 0.5,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('add3DTile', item, (res) => {
      super.info('Add 3DFile tilt photography', res);
    });
    return item;
  }

  /**
   * Update 3DFile Tilt Photography
   * @param {object} config configuration
   */
  update3DTile(config) {
    let item = {
      id: '3dTileBase',
      name: '3dTileBaseLayer',
      url: 'http://mapserver/beijing/tileset.json',
      token: 'ABCDEFG',
      visible: true,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('update3DTile', item, (res) => {
      super.info('Update 3DFile Tilt Photography', res);
    });
    return item;
  }

  /**
   * Update 3DFile Tilt Photography
   * @param {object} config configuration
   */
  update3DTileStyle(config) {
    let item = {
      id: '3dTileBase',
      visible: true,
      alpha: 0.1,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('update3DTileStyle', item, (res) => {
      super.info('Update 3DFile Tilt Photography', res);
    });
    return item;
  }

  /**
   * Add GIS Map
   * @param {object} config configuration
   */
  addGISMap(config) {
    let item = {
      id: 'gisMapBase',
      name: 'gisMapBaseLayer',
      mapUrl: 'http://mapserver/beijing/tileset.json',
      mapType: 'TMS',
      mapToken: 'ABCDEFG',
      terrainUrl: 'http://mapserver/beijing/tileset.json',
      terrainType: 'TMS',
      terrainToken: 'ABCDEFG',
      visible: true,
      alpha: 0.5,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('addGISMap', item, (res) => {
      super.info('Add GIS Map', res);
    });
    return item;
  }

  /**
   * Updating GIS Map Data
   * @param {object} config configuration
   */
  updateGISMap(config) {
    let item = {
      id: 'gisMapBase',
      name: 'gisMapBaseLayer',
      mapUrl: 'http://mapserver/beijing/tileset.json',
      mapType: 'TMS',
      mapToken: 'ABCDEFG',
      terrainUrl: 'http://mapserver/beijing/tileset.json',
      terrainType: 'TMS',
      terrainToken: 'ABCDEFG',
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('updateGISMap', item, (res) => {
      super.info('Updating GIS Map Data', res);
    });
    return item;
  }

  /**
   * Updating GIS Map Styles
   * @param {object} config configuration
   */
  updateGISMapStyle(config) {
    let item = {
      id: 'gisMapBase',
      visible: true,
      alpha: 0.1,
    };
    super.copyObject(config, item);
    window.appInstance.uniCall('updateGISMapStyle', item, (res) => {
      super.info('Updating GIS Map Styles', res);
    });
    return item;
  }

  //#region Add TMS Map  3Dtile
  /**
   * @param {Object} layerConfig LAYERconfiguration
   * Need to set the map center point
   */
  addTMS(layerConfig, callback) {
    let tmsjsonData = {
      id: layerConfig.id || 'tmslayer', // Layer object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
      name: layerConfig.name || 'tmslayer', // Layer name, supports customizing names for layers
      mapUrl:
        layerConfig.mapUrl || 'http://172.16.1.75:8089/zixiazaiTif/tms.xml ', // Surface Tile Entry Description File Address
      mapType: 'TMS', // WMTS The map data format category currently only supports "TMS"
      mapToken: 'ABCDEFG', // Reserved fields
      terrainUrl:
        layerConfig.terrainUrl || 'http://172.16.1.75:9997/layer.json', // Elevation tile entrance description file address
      terrainType: 'TMS', // The elevation data format category of WMTS currently only supports' TMS'
      terrainToken: 'ABCDEFG', // Reserved fields
      visible: true, // Explicit and implicit control, true: display; False: hidden
      alpha: 0.5, // Transparency, 0: completely transparent; 1: Completely opaque
    };
    appInstance.uniCall('addGISMap', tmsjsonData, (result) => {
      if (result) {
        callback && callback(result);
      }
    });
  }

  add3DTile(layerConfig, callback) {
    let tilesJsonData = {
      id: layerConfig.id || '3Dtileslayer',
      name: layerConfig.URL.name || '3Dtileslayer',
      url: layerConfig.URL || 'http://172.16.1.75:9968/tileset.json',
      type: 'b3dm',
      token: 'ABCDEFG',
      visible: true,
      alpha: 1,
    };
    appInstance.uniCall('addGISMap', tilesJsonData, (result) => {
      if (result) {
        callback && callback(result);
      }
    });
  }

  removeTMS(callback) {
    window.appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: 'gisMap',
      },
      (res) => {
        callback && callback(res.result);
      }
    );
  }
  remove3DTile(callback) {
    window.appInstance.uniCall(
      'clearOverlayType',
      {
        overlayType: '3DTile',
      },
      (res) => {
        callback && callback(res.result);
      }
    );
  }
  //#endregion
}
