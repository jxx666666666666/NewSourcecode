import HeatLayer from './HeatLayer'
import GisBase from './GisBase'
import LandmarkLayer from './LandmarkLayer'
import Bubble from './Bubble'
import BarLayer from './BarLayer'
import Area from './Area'
import Path from './Path'
import Camera from './Camera'
import CircularArea from './CircularArea'
import ODLineLayer from './ODLineLayer'
import TrailLayer from './TrailLayer'
import GisBaseLayer from './GisBaseLayer'
import RoadSgHeatLayer from './RoadSgHeatLayer'
import TypeAreaLayer from './TypeAreaLayer'
import ColorAreaLayer from './ColorAreaLayer'
import GridLayer from './GridLayer'
import Environment from './Environment'
import Model from './Model'
import store from '@/store/index'
import GisDataManager from '@/api/gisDataManager'

class gisManager {
  /**Current field of view */
  currentView = 'songShanLake'

  /**
   * Constructor
   */
  constructor() {
    this.gisBase = GisBase
    this.landmarkLayer = new LandmarkLayer()
    this.heatLayer = new HeatLayer()
    this.bubble = new Bubble()
    this.barLayer = new BarLayer()
    this.path = new Path()
    this.area = new Area()
    this.circularArea = new CircularArea()
    this.oDLineLayer = new ODLineLayer()
    this.trail = new TrailLayer()
    this.gisBaseLayer = new GisBaseLayer()
    this.roadSgHeatLayer = new RoadSgHeatLayer()
    this.typeAreaLayer = new TypeAreaLayer()
    this.colorAreaLayer = new ColorAreaLayer()
    this.gridLayer = new GridLayer()

    this.model = new Model()
    this.camera = new Camera()
    this.environment = new Environment()
  }

  //#region LAYER

  /**
   * Add Layer
   * @param {object} layer Layer Configuration
   */
  addLayer(layer, callback) {
    let cBack = (success) => {
      if (success) {
        layer.status = 'show'
        callback && callback()
      }
    }
    switch (layer.layerType) {
      case 'LandmarkMap':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index]
              temp.mapData = this.landmarkLayer.addLayer(
                temp,
                item.landmarks,
                cBack
              )
            })
          } else {
            if (layer.scatterType === 'Device Alarm') {
              layer.mapData = this.landmarkLayer.addLayer(layer, data, cBack)
              let arr = []
              data.forEach((t, index) => {
                arr.push({
                  id: 'bubble' + index, // Layer sub object ID, a unique identifier passed in by the caller during creation, used for object recognition for various operations
                  coord: t.coord, // XY axis coordinates, X: longitude; Y: Latitude
                  value: -50, // Z-axis height in meters
                  type: 'legend01', // Data point weight
                  coordZ: 0, // Data point legend categories
                })
              })
              // layer.mapData = this.bubble.getAddBulle(layer, arr, cBack);
            } else {
              layer.mapData = this.landmarkLayer.addLayer(layer, data, cBack)
            }
          }
        })
        break
      case 'BubbleChart':
        GisDataManager.getData(layer, (data) => {
          data.forEach((t) => {
            t.value = 10
            t.type = 'default'
          })
          layer.mapData = this.bubble.addLayer(layer, data, cBack)
        })
        break
      case 'Model':
        GisDataManager.getData(layer, (data) => {
          let jsonData = {}
          let arr = []
          data.forEach((t, index) => {
            jsonData = {
              id: 'modelId' + index,
              coordType: 0,
              coordTypeZ: 0,
              coord: t.coord,
              coordZ: 0,
              rotation: [0, 0, 0],
              alpha: 1,
              scale: 1.5,
              titleText: '',
              titleColor: '#ffff00',
              titleBackgroundColor: '#333333',
              modelType: t.sourceData.TO_INSTALL || t.sourceData.modelId,
              newtype: t.sourceData.type,
            }
            layer.data = data
            layer.mapData = this.model.getModelLayerId(layer, jsonData, cBack)
          })
          // layer.mapData = this.model.getModelLayerId(layer, arr, cBack);
        })
        break
      case 'HeatMap':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.heatLayer.addLayer(layer, data, cBack)
        })
        break
      case 'circular':
        layer.mapData = this.circularArea.addLayer(layer, null, cBack)
        break
      case 'Area':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index]
              temp.mapData = this.area.addLayer(temp, item.path.points, cBack)
            })
          } else {
            temp.mapData = this.area.addLayer(layer, data, cBack)
          }
        })
        break
      case 'route':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index]
              temp.mapData = this.path.addLayer(temp, item.path.points, cBack)
            })
          } else {
            layer.mapData = this.path.addLayer(layer, data, cBack)
          }
        })
        break
      case 'RelationshipDiagram':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.oDLineLayer.addLayer(layer, data, cBack)
        })
        break

      case 'Histogram':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.barLayer.addLayer(layer, data, cBack)
        })
        break
      case 'ThermalDiagramOfPathSection':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.roadSgHeatLayer.addLayer(layer, data, cBack)
        })
        break
      case 'TypeAreaMap':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.typeAreaLayer.addLayer(layer, data, cBack)
        })
        break
      case 'NumericalAreaMap':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.colorAreaLayer.addLayer(layer, data, cBack)
        })
        break
      case 'Trajectories':
        GisDataManager.getData(layer, (data) => {
          this.trail.addHisLayer(layer, data, cBack)
        })
        break
      case 'RasterGraphics':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.gridLayer.addLayer(layer, data, cBack)
        })
        break
    }
  }

  /**更新数据 */
  updateData(layer, callback) {
    let cBack = (success) => {
      if (success) {
        callback && callback()
      }
    }
    switch (layer.layerType) {
      case 'LandmarkMap':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.landmarkLayer.updateData(layer, data, cBack)
        })
        break
      case 'BubbleChart':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.bubble.updateData(layer, data, cBack)
        })
        break
      case 'circular':
        this.circularArea.updateData(layer)
        break
      case 'Area':
        break
      case 'Histogram':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.barLayer.updateData(layer, data, cBack)
        })
        break
      case 'RelationshipDiagram':
        GisDataManager.getData(layer, (data) => {
          layer.mapData = this.oDLineLayer.updateData(layer, data, cBack)
        })
        break
      case 'route':
        GisDataManager.getData(layer, (data) => {
          if (data.children && layer.children) {
            data.children.forEach((item, index) => {
              let temp = layer.children[index]
              temp.mapData = this.path.updateData(temp, item.path.points, cBack)
            })
          } else {
            layer.mapData = this.path.updateData(layer, data, cBack)
          }
        })
        break
      case 'HeatMap':
        GisDataManager.getData(layer, (data) => {
          data.forEach((t) => {
            t.value = t.value || 1
          })
          layer.mapData = this.heatLayer.updateData(layer, data, cBack)
        })
        break
      case 'TypeAreaMap':
        GisDataManager.getData(layer, (data) => {
          this.typeAreaLayer.updateDataCoord(
            layer,
            data.data,
            (success) => {
              if (success) {
                //After adding the corresponding relationship, update the data again
                this.typeAreaLayer.updateDataArea(layer, data.areas, cBack)
              }
            },
            true
          )
        })
        break
    }
  }

  /**
   * Update layer styles
   * @param {object} layer Layer Configuration
   */
  updateLayerStyle(layer) {
    switch (layer.layerType) {
      case 'route':
        if (layer.children) {
          layer.children.forEach((item, index) => {
            this.path.updateStyle(item)
          })
        } else {
          this.path.updateStyle(layer)
        }
        break
      case 'Histogram':
        switch (store.state.cameraLevel) {
          case 0:
            layer.columnMinHeight = 40
            layer.columnMaxHeight = 300
            layer.columnWidth = 30
            break
          case 1:
            layer.columnMinHeight = 30
            layer.columnMaxHeight = 200
            layer.columnWidth = 20
            break
          case 2:
            layer.columnMinHeight = 20
            layer.columnMaxHeight = 100
            layer.columnWidth = 10
            break
          case 3:
            layer.columnMinHeight = 200
            layer.columnMaxHeight = 400
            layer.columnWidth = 32
            break
          case 4:
            layer.columnMinHeight = 100
            layer.columnMaxHeight = 200
            layer.columnWidth = 16
            break
        }
        if (layer.children) {
          layer.children.forEach((item, index) => {
            this.barLayer.updateStyle(item)
          })
        } else {
          this.barLayer.updateStyle(layer)
        }
        break
    }
  }

  //  * @Descripttion:  Large-screen display control component
  //  * @version: 3.3.4
  //  * @Author: guanzhuyu
  //  * @Date: 2022-11-21 14:11:13
  //  * @LastEditors: kangzesheng
  //  * @LastEditTime: 2023-01-22 13:13:25

  /**
   * Show Layer
   * @param {object} layer
   */
  showLayer(layer) {
    if (layer.status == 'hide') {
      if (
        layer.children &&
        Array.isArray(layer.children) &&
        layer.children.length > 0
      ) {
        layer.children.forEach((t) => {
          GisBase.setLayerVisible(t, true, (success) => {
            if (success) {
              layer.status = 'show'
              layer.Timer && layer.Timer.Start()
            }
          })
        })
      } else {
        GisBase.setLayerVisible(layer, true, (success) => {
          if (success) {
            layer.status = 'show'
            layer.Timer && layer.Timer.Start()
          }
        })
      }
    }
  }
  /**
   * Layer display control
   * @param {object} layer
   */
  hideLayer(layer) {
    if (layer.status == 'show') {
      if (
        layer.children &&
        Array.isArray(layer.children) &&
        layer.children.length > 0
      ) {
        layer.children.forEach((t) => {
          GisBase.setLayerVisible(t, false, (success) => {
            if (success) {
              layer.status = 'hide'
              layer.Timer && layer.Timer.Stop()
            }
          })
        })
      } else {
        GisBase.setLayerVisible(layer, false, (success) => {
          if (success) {
            layer.status = 'hide'
            layer.Timer && layer.Timer.Stop()
          }
        })
      }
    }
  }
  /**
   * remove layer
   * @param {object} layer Layer Configuration
   */
  removeLayer(layer) {
    if (
      layer.children &&
      Array.isArray(layer.children) &&
      layer.children.length > 0
    ) {
      layer.children.forEach((t) => {
        if (t.isClick) {
          GisBase.endPickOverlay(t)
        } else {
          GisBase.removeLayer(t)
          layer.Timer && layer.Timer.Stop()
        }
      })
    } else {
      if (layer.isClick) {
        GisBase.endPickOverlay(layer)
      } else {
        GisBase.removeLayer(layer)
        layer.Timer && layer.Timer.Stop()
      }
    }
    layer.status = 'false'
  }

  /** Clear All Layers */
  removeAllLayers() {
    for (let key in GisBase.layerType) {
      GisBase.removeLayerType(GisBase.layerType[key])
    }
  }

  //#endregion

  //#region environment
  startTimer() {
    this.envTimer = setInterval(
      (() => {
        this.environment.changeEnvTime()
      }).bind(this),
      1000 * 60 * 30
    )
  }

  stopTimer() {
    this.envTimer && clearInterval(this.envTimer)
  }

  //#endregion

  /**GisManager Destroy */
  destory() {
    clearInterval(this.envTimer)
    this.removeAllLayers()
  }

  /**
   *Switch Model (Scene)

   * @param {Scene Name} view
   */
  selectMenu(view) {
    if (store.state.isStreaming && view) {
      if (view.sceneName && view.sceneName != this.currentView) {
        let scene = window.layerConfigs.sceneInfos.get(view.sceneName).scene
        this.environment.switchScene(scene)
        this.currentView = view.sceneName
        setTimeout(() => {
          view.cameraName &&
            window.gisManager.camera.setCameraByName(view.cameraName)
        }, 1000)
      } else {
        view.cameraName &&
          window.gisManager.camera.setCameraByName(view.cameraName)
      }
    }
  }

  /**
   * Switch scene default layers
   * @param {string} sceneName Scene Name
   */
  ChangeSceneDefaultLayers(sceneName) {
    let layers = window.layerConfigs.sceneInfos.get(sceneName).layers
    if (layers && Array.isArray(layers)) {
      switch (sceneName) {
        case 'ShenGuan':
          layers.forEach((layer) => {
            this.addLayer(layer)
          })
          break
      }
    }
  }

  //#region Urban signage special effects method

  markerIds = []
  addTopicDefault() {
    if (store.state.isStreaming) {
      //Special effects
      this.markerIds &&
        this.markerIds.forEach((id) => {
          this.model.remove3DMarker(id)
        })
      if (window.currentLayer.defaultMarkers) {
        this.markerIds = []
        let config = window.currentLayer.defaultMarkers
        GisDataManager.getJsonData(config.jsonPath, (data) => {
          data.forEach((item) => {
            const { name, lon, lat, type } = item
            config.id = name
            config.coord = [lon, lat]
            if (type) {
              config.type = type
            }
            this.model.add3DMarker(config)
            this.markerIds.push(config.id)
          })
        })
      }
      //District and County Landmarks

      this.currentQX && this.gisBase.removeLayer(this.currentQX)
      if (window.currentLayer.defaultLayer) {
        this.currentQX = window.currentLayer.defaultLayer
        this.currentQX.legends = []
        GisDataManager.getQXData(this.currentQX, (data) => {
          data.forEach((item) => {
            this.currentQX.legends.push({
              name: item.name,
              color: '#ffff',
              iconName: 'site_02',
            })
          })
          this.landmarkLayer.addLayer(this.currentQX, data)
        })
      }
    }
  }

  //#endregion

  //#region Alarm special effects

  isAddAlarm = false

  /**
   * Add or update alarm points
   * @param {double} lon Longitude
   * @param {double} lat Latitude
   * @param {double} alt height
   */
  addOrUpdateAlarm(lon, lat, callback) {
    let config = {
      id: 'alarm',
      alpha: 1,
      scale: 8,
      type: 'Spread04',
      titleText: '',
      coord: [lon, lat],
      coordZ: 50,
    }
    let backFn = (callback) => {
      appInstance.uniCall(
        'pickOverlay',
        {
          overlayType: '3DMarker',
          idLayer: '',
          type: 'click',
        },
        (res) => {
          appInstance.uniCall('on3DMarkerLClick', {}, (res) => {
            callback && callback()
          })
        }
      )
    }
    if (this.isAddAlarm) {
      this.model.update3DMarkerCoord(config)
      setTimeout(() => {
        backFn(callback)
      }, 200)
    } else {
      this.model.add3DMarker(config, (isAdd) => {
        backFn(callback)
        this.isAddAlarm = isAdd
      })
    }
    this.gisBase.focusById(config.id, 'SpecialEffects', 50)
  }
  /**Remove Effect */
  removeAlarm() {
    if (this.isAddAlarm) {
      let config = {
        id: '3DMarker',
        alpha: 0,
        scale: 1,
        type: 'Spread04',
        titleText: '',
        coord: [0, 0],
        coordZ: 0,
      }
      this.model.update3DMarkerCoord(config)
      // this.isAddAlarm = false; //False deletion without modification
    }
  }
  //#endregion
}
export default gisManager
