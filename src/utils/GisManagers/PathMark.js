import UEapi from './UEapi'
import panelControl from '@/utils/contral/panelControl'
import PathMarkInfoPanel from '../../components/UE4Panel/PathMarkInfoPanel'
export default class PathMark {
    static state = ''
    static markList = []
    static callback = null
    static index = 0 //Bottom punctuation of model trajectory update data
    static modelTimer = null //Model trajectory map timing updater
    static markPath(res, callback) {
        let coord = res.data[0].coord
        this.markList.push({
            id: 'InspectionWork_PathDrawing' + this.markList.length,
            name: 'Point' + (this.markList.length + 1),
            coord: coord,
            coordZ: -4.99999908447,
        })
        //Draw landmarks
        let jsonData = {
            id: this.markList[this.markList.length - 1].id,
            coordType: 0,
            coordTypeZ: 0,
            iconName: streamingConfig.isScene ? 'add' : 'custom-add',
            autoScale: false,
            label: this.markList[this.markList.length - 1].name,
            iconScale: 1,
            labelScale: 1,
            tag: '',
            coord: this.markList[this.markList.length - 1].coord,
            coordZ: -4.99999908447,
            visible: true
        }
        window.appInstance.uniCall('addLandmark', jsonData, (result) => {
            console.log(result)
            this.addLandmarkTip(
                this.markList[this.markList.length - 1],
                this.markList.length > 1 ?
                    this.markList[this.markList.length - 2] : { id: '' }
            )
        })
        this.changePlanPath(this.markList)
        if (!this.callback) {
            this.callback = callback
        }
    }
    //Add Planning Path
    static changePlanPath(list) {
        //Draw Path
        let json = {
            id: 'InspectionWork_PathDrawingpath',
            name: 'InspectionWork_PathDrawingpath',
            type: 'Arrow06',
            color: '#FFFF00',
            textureSpeed: 5,
            colorPass: '#FFFF00',
            width: 3,
            autoScale: true,
            points: list,
        }
        if (this.markList.length > 1) {
            UEapi.Path.updatePathCoord(json)
        } else {
            UEapi.Path.addPath(json)
            // UEapi.ModelTrailLayer.addModelTrailLayer({
            //   id: 'PathInspectionModelTrajectoryMap',
            //   name: 'PathInspectionModelTrajectoryMap',
            //   duration: 5, 
            //   trackDuration: 0, 
            //   trackWidth: 0, 
            //   objLife: 1,
            //   legends: [
            //     {
            //       name: 'InspectionPersonnel',
            //       modelType: 'car01',
            //       scale: 1, 
            //       iconName: 'none',
            //       labelColor: '#ff000000', 
            //       labelBackgroundColor: '#33333300',
            //     },
            //   ],
            //   data: [],
            // })
            // this.markList = list
        }
    }
    //Add signage
    static addLandmarkTip(data, oldData) {
        window.appInstance.uniCall(
            'removeOverlayTip', {
            id: oldData.id,
            overlayType: 'landmark',
        },
            (res) => {
                let ele = panelControl.create(
                    data.id,
                    PathMarkInfoPanel,
                    this.markList.length
                )
                window.appInstance.uniCall(
                    'addOverlayTip', {
                    id: data.id,
                    url: '',
                    size: [51, 24],
                    offset: [10, 0],
                    overlayType: 'landmark',
                    isShowClose: false,
                    divId: ele.id,
                },
                    (tip) => {
                        console.log(tip)
                    }
                )
            }
        )
    }
    //Complete path planning
    static finishPath() {
        this.callback(this.markList)
        this.clearData()
    }
    //Reset the last path planning point
    static resetPath() {
        UEapi.Common.removeOverlay({
            id: this.markList[this.markList.length - 1].id,
            overlayType: 'landmark',
        })
        if (this.markList.length == 1) {
            window.appInstance.uniCall('removeOverlayTip', {
                id: this.markList[this.markList.length - 1].id,
                overlayType: 'landmark',
            })
            this.markList = []
        } else {
            let oldData = this.markList[this.markList.length - 1]
            this.markList.splice(this.markList.length - 1, 1)
            this.addLandmarkTip(this.markList[this.markList.length - 1], oldData)
        }
        UEapi.Path.updatePathCoord({
            id: 'InspectionWork_PathDrawingpath',
            points: this.markList,
        })
    }
    //Set up path planning for fast travel
    static setPathingCamera(item) {
        if (this.state == 'continue') {
            this.setCameraPathingState('continue')
        } else {
            this.state = 'continue'
            //this.updateModelTrailLayerCoord()
            UEapi.Camera.pathingCamera(item.id, 5)
        }
    }
    //Update model trajectory map
    static updateModelTrailLayerCoord() {
        if (this.modelTimer) {
            clearInterval(this.modelTimer)
        }
        let that = this
        this.modelTimer = setInterval(() => {
            UEapi.ModelTrailLayer.updateModelTrailLayerCoord({
                id: 'PathInspectionModelTrajectoryMap',
                name: 'PathInspectionModelTrajectoryMap',
                isAppend: true,
                duration: 5,
                data: [{
                    id: 'ModelInspector',
                    coord: that.markList[that.index].coord,
                    coordZ: that.markList[that.index].coordZ,
                    rotation: [0, 0, 0],
                    label: '',
                    type: 'InspectionPersonnel',
                },],
            },
                (res) => {
                    UEapi.Camera.focusByLayer({
                        id: 'ModelInspector',
                        idLayer: 'PathInspectionModelTrajectoryMap',
                        layerType: 'modelTrailLayer',
                        distance: 10,
                    })
                }
            )
            if (that.index >= that.markList.length) {
                that.index = that.markList.length - 1
            } else {
                that.index++
            }
        }, 5000)
    }
    //Determine the roaming status of the path
    static getCameraPathingState() {
        if (this.state != '') {
            this.setCameraPathingState('continue')
            return true
        } else if (this.markList.length > 0) {
            return true
        }
        return false
    }
    //Set path roaming status
    static setCameraPathingState(state) {
        this.state = state
        // this.updateModelTrailLayerCoord()
        //UEapi.Camera.setCameraPathingState(state)
    }
    static clearData() {
        if (this.modelTimer) {
            clearInterval(this.modelTimer)
        }
        this.modelTimer = null
        this.callback = null
        UEapi.Common.removeOverlay({
            id: 'InspectionWork_PathDrawingpath',
            overlayType: 'path',
        })
        UEapi.Common.removeOverlay({
            id: 'PathInspectionModelTrajectoryMap',
            overlayType: 'modelTrailLayer',
        })
        if (this.markList.length > 0) {
            window.appInstance.uniCall('removeOverlayTip', {
                id: this.markList[this.markList.length - 1].id,
                overlayType: 'landmark',
            })
            UEapi.Common.clearOverlayType('landmark')
        }
        // if (this.state) UEapi.Camera.setCameraPathingState('stop')
        //UEapi.Camera.setCameraPathingState('stop')
        this.markList = []
        this.state = ''
    }
}