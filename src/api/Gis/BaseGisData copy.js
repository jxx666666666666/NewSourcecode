import { axios, isLocal } from '../base'
import api from '../Api'
import guid from '../../utils/common/guid'

/** Base Method */
export default class BaseGisData {
  //#region Base Method

  /**
   * Process data and reduce data transmission
   * @param {Object} source Source Object
   * @param {Object} target Target object
   * @param {Array} props properties
   */
  static copyObject(source, target, props) {
    props.forEach((d) => {
      if (source[d]) {
        target[d] = source[d]
      }
    })
    return target
  }

  /** Cache Dictionary */
  static layerDataDic = new Map()

  /**
   * cache data
   * @param {Object} layer Layer Configuration
   * @param {Object} data data
   */
  static CacheData(layer, data) {
    this.layerDataDic.set(layer.id, {
      scatterType: layer.scatterType,
      data: data,
    })
  }

  /**
   * Obtain cached data for the selected item
   * @param {String} layerId Layer Name
   * @param {String} objId object name
   */
  static getItem(layerId, objId) {
    if (this.layerDataDic.has(layerId)) {
      let data = this.layerDataDic.get(layerId)
      let temp = _.find(data.data, (t) => t.id == objId)
      if (temp && temp.sourceData) {
        let res = _.cloneDeep(temp.sourceData)
        res.scatterType = data.scatterType
        res.coord = temp.coord
        res.id = objId
        return res
      }
    }
  }

  /**
   * Obtain cached data for the selected item - path
   * @param {String} layerId Layer Name
   * @param {String} objId object name
   */
  static getPathItem(id) {
    if (this.layerDataDic.has(id)) {
      let data = this.layerDataDic.get(id).data
      if (data && data.sourceData) {
        let res = _.cloneDeep(data.sourceData)
        res.scatterType = data.scatterType
        res.id = id
        return res
      }
    }
  }

  //#endregion

  //#region Local Map Data

  /**Obtaining Scatter Data */
  static getLocal(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { lon, lat } = item
        if (lon && lat) {
          return item
        }
      })

      let data = t.map((item, index) => {
        const { id, lon, lat, alt, name, type, value } = item
        let dataItem = {
          id: layer.id + index,
          type: (layer.legend && layer.legend.name) || type || '',
          coord: [Number(lon), Number(lat)],
          coordZ: layer.coordZ || alt || 0,
          label: layer.isShowLabel ? name : '',
          value: value || Math.random() * 100,
          sourceData: item,
        }
        return dataItem
      })

      if (layer.isClick) {
        this.layerDataDic.set(layer.id, {
          scatterType: layer.scatterType,
          data: data,
        })
      }
      callback && callback(data)
    })
  }
  // Obtain model landmark data
  static getModel(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { lon, lat } = item
        if (lon && lat) {
          return item
        }
      })

      let data = t.map((item, index) => {
        const { id, lon, lat, alt, name, type, value } = item
        let dataItem = {
          id: layer.id + index,
          type: (layer.legend && layer.legend.name) || type || '',
          coord: [Number(lon), Number(lat)],
          coordZ: layer.coordZ || alt || 0,
          label: layer.isShowLabel ? name : '',
          value: value || Math.random() * 100,
          sourceData: item,
        }
        return dataItem
      })

      if (layer.isClick) {
        this.layerDataDic.set(layer.id, {
          scatterType: layer.scatterType,
          data: data,
        })
      }
      callback && callback(data)
    })
  }
  // Lamp head model data processing
  static getModelData(layer, callback) {
    axios.get('./data/ZhiHuiDengGan/amart.json').then((amart) => {
      axios.get('./data/ZhiHuiDengGan/smart_pole.json').then((colorlist) => {
        let colordata = colorlist.data.Smart_Pole
        let datanew = amart.data.features
        let data = []
        axios.get(layer.jsonPath).then((res) => {
          res.data.Smart_Pole_Sites.forEach((itemone, index) => {
            if (itemone.SITE_MODEL.indexOf('Type1') != -1) {
              //Single arm data
              if (itemone.SITE_MODEL.indexOf('D') != -1) {
                //Single light arm with display screen
                itemone.TO_INSTALL = 'Light_Type01_A'
              } else {
                //Single arm without display screen
                itemone.TO_INSTALL = 'Light_Type01_B'
              }
            } else if (itemone.SITE_MODEL.indexOf('Type2') != -1) {
              //Dual arm data
              if (itemone.SITE_MODEL.indexOf('D') != -1) {
                //Dual light arm with display screen
                itemone.TO_INSTALL = 'Light_Type02_A'
              } else {
                //Dual light arm without display screen
                itemone.TO_INSTALL = 'Light_Type02_B'
              }
            }
            let temp = datanew.find((t) => t.Name == itemone.SITE_ID)
            let tempnew = colordata.find((t) => t.__EMPTY_1 == itemone.SITE_ID)
            let type = ''
            let typenew = ''
            switch (tempnew.__EMPTY_11) {
              case 'PAPYRUS WHITE _ RAL 9018':
                type = '#CED3CC'
                typenew = 'SmartLampPolelamp_grey'
                break
              case 'ROOD RED _ RAL 3020':
                type = '#BD1807'
                typenew = 'SmartLampPolelamp_red'
                break
              case 'PURE ORANGE _ RAL 2004':
                type = '#E85A0A'
                typenew = 'SmartLampPolelamp_orange'
                break
              case 'OLIVE BROWN _ RAL 8008':
                type = '#8C4600'
                typenew = 'SmartLampPolelamp_brown'
                break
              default:
                type = '#0A417B'
                typenew = 'SmartLampPolelamp_blue'
                break
            }
            itemone.type = type
            itemone.coord = temp.coordinates
            let dataItem = {
              id: layer.id + index,
              type: typenew || (layer.legend && layer.legend.name) || '',
              coord: itemone.coord,
              coordZ: 0,
              label: '',
              value: Math.random() * 100,
              sourceData: itemone,
            }
            data.push(dataItem)
            return dataItem
          })
          if (layer.isClick) {
            this.layerDataDic.set(layer.id, {
              scatterType: layer.scatterType,
              data: data,
            })
          }
          callback && callback(data)
        })
      })
    })
  }
  // Data Processing of Lamp Cap Landmark Map
  static getLandmarkLayerData(layer, callback) {
    axios.get('./data/ZhiHuiDengGan/amart.json').then((amart) => {
      let datanew = amart.data.features
      axios.get('./data/ZhiHuiDengGan/smart_pole.json').then((colorlist) => {
        let colordata = colorlist.data.Smart_Pole
        let data = []
        axios.get(layer.jsonPath).then((res) => {
          res.data.Smart_Pole_Sites.forEach((itemone, index) => {
            let temp = datanew.find((t) => t.Name == itemone.SITE_ID)
            itemone.coord = temp.coordinates
            let tempnew = colordata.find((t) => t.__EMPTY_1 == itemone.SITE_ID)
            let type = ''
            switch (tempnew.__EMPTY_11) {
              case 'PAPYRUS WHITE _ RAL 9018':
                type = 'SmartLampPolelamp_grey'
                break
              case 'ROOD RED _ RAL 3020':
                type = 'SmartLampPolelamp_red'
                break
              case 'PURE ORANGE _ RAL 2004':
                type = 'SmartLampPolelamp_orange'
                break
              case 'OLIVE BROWN _ RAL 8008':
                type = 'SmartLampPolelamp_brown'
                break
              default:
                type = 'SmartLampPolelamp_blue'
                break
            }

            let dataItem = {
              id: layer.id + index,
              type: type,
              coord: itemone.coord,
              coordZ: 0,
              label: '',
              value: Math.random() * 100,
              sourceData: itemone,
            }
            data.push(dataItem)
            return dataItem
          })
          if (layer.isClick) {
            this.layerDataDic.set(layer.id, {
              scatterType: layer.scatterType,
              data: data,
            })
          }
          callback && callback(data)
        })
      })
    })
  }
  /**Obtain trajectory data */
  static getTrailData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { lon, lat } = item
        if (lon && lat) {
          return item
        }
      })
      let data = t.map((item, index) => {
        const { id, lon, lat, points } = item
        let dataItem = {
          id: id || guid.newGuid(),
          label: '',
          coord: [lon, lat],
          coordZ: layer.coordZ || 0,
          type: (layer.legend && layer.legend.name) || type || '',
          points,
          yaw: 0,
          sourceData: item,
        }
        return dataItem
      })
      if (layer.isClick) {
        this.layerDataDic.set(layer.id, {
          scatterType: layer.scatterType,
          data: data,
        })
      }
      callback && callback(data)
    })
  }

  /** Obtain path data */
  static getPathData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { points } = item
        if (points) {
          return item
        }
      })

      let data = {}
      data.children = []
      layer.children = []

      t.forEach((item) => {
        const { id, points, alt } = item
        let pathData = {
          id: id,
          points: points.map((p) => {
            return { coord: p, coordZ: layer.coordZ || 0 }
          }),
          sourceData: item,
        }
        //data
        data.children.push({ path: pathData })
        // layer

        let temp = this.copyObject(layer, {}, [
          'id',
          'name',
          'layerType',
          'type',
          'color',
          'colorPass',
          'width',
          'isClick',
        ])
        temp.id = layer.id + id
        temp.name = layer.id + id
        layer.children.push(temp)

        if (layer.isClick) {
          this.layerDataDic.set(temp.id, {
            scatterType: layer.scatterType,
            data: pathData,
          })
        }
      })
      callback && callback(data)
    })
  }

  /** Obtain regional data */
  static getAreaData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { points } = item
        if (points) {
          return item
        }
      })

      let data = {}
      data.children = []
      layer.children = []

      t.forEach((item) => {
        const { id, points, alt } = item
        let pathData = {
          id: id,
          points: points.map((p) => {
            return { coord: p }
          }),
          sourceData: item,
        }
        //data
        data.children.push({ path: pathData })
        //layer

        let temp = this.copyObject(layer, {}, [
          'id',
          'name',
          'layerType',
          'coordZ',
          'type',
          'color',
          'areaHeight',
          'fillArea',
          'isClick',
        ])
        temp.coordZ = layer.coordZ || alt || 0
        temp.id = layer.id + id
        temp.name = layer.id + id
        layer.children.push(temp)

        if (layer.isClick) {
          this.layerDataDic.set(temp.id, {
            scatterType: layer.scatterType,
            data: pathData,
          })
        }
      })
      callback && callback(data)
    })
  }

  /** Obtain type area map data */
  static getTypeAreaData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      let data = { areas: [], data: [] }
      t.forEach((item) => {
        const { name, points, type } = item
        layer.coordZ = layer.coordZ || alt || 0

        let area = { name: name, points: [] }
        points.forEach((item) => {
          area.points.push({ coord: item })
        })
        data.areas.push(area)
        data.data.push({
          areaName: name,
          legendName: type,
        })
      })
      callback && callback(data)
    })
  }

  /** Obtain numerical area map data */
  static getNumAreaData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      let data = { areas: [], data: [] }
      t.forEach((item) => {
        const { name, points, value } = item

        let area = { name: name, points: [] }
        points.forEach((item) => {
          area.points.push({ coord: item, coordZ: layer.coordZ || alt || 0 })
        })
        data.areas.push(area)
        data.data.push({
          areaName: name,
          value: value,
        })
      })
      callback && callback(data)
    })
  }

  /** Obtaining Relationship Data */
  static getODLineData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      t = t.filter((item) => {
        const { startCoord, targetCoord } = item
        if (startCoord && targetCoord) {
          return item
        }
      })

      let data = t.map((item) => {
        const { id, startCoord, targetCoord, name, type, value } = item
        let dataItem = {
          id: id,
          startCoord: startCoord,
          startCoordZ: 0,
          targetCoord: targetCoord,
          targetCoordZ: 0,
          value: value || 10,
          type: 'legendName1',
        }
        return dataItem
      })

      callback && callback(data)
    })
  }

  /**Obtain road map data */
  static getRoadData(layer, callback) {
    let res = api.apiList.getJsonData(layer.jsonPath)
    res.then((t) => {
      let data = { segments: [], data: [] }
      t.forEach((item) => {
        const { lineName, points, value } = item
        let segment = { name: lineName, points: [] }
        let segmentValue = { name: lineName, value: value || 10 }
        points.forEach((item) => {
          ;(item[0] = item[0] - 118.2512106 + 113.8802286204),
            (item[1] = item[1] - 35.26840557 + 22.8820916923),
            segment.points.push({
              coord: item,
              coordZ: layer.coordZ || 0,
            })
        })
        data.segments.push(segment)
        data.data.push(segmentValue)
      })
      callback && callback(data)
    })
  }

  //#endregion

  /**
   * Execute method based on method name and parameters
   * @param {String} method methods
   * @param {Object} paras params
   */
  static Actionfun(method, paras) {
    let argument = ''
    paras.forEach((t) => {
      argument += "'" + t + "',"
    })
    argument = argument.substring(0, argument.lastIndexOf(','))
    //Eval can automatically recognize the concatenated strings as methods and call them.
    return eval('this.' + method + '(' + argument + ')')
  }
}
