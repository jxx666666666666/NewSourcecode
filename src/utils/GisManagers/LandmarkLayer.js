import GisBase from './GisBase';
import { LandmarkLayerClick } from './UeActionCallback';
/* global _*/

/**Landmark Map */
export default class LandmarkLayer extends GisBase {
    constructor() {
        super('LandmarkMap');
        this.ueAction = new LandmarkLayerClick();
    }
    config = {
        coordType: 0,
        coordTypeZ: 0,
        legends: [],
        visible: true
    };
    /**
     * Add a landmark map layer
     * @param {Object} layerConfig Layer Configuration
     * @param {Array} data Layer data
     */
    addLayer(layerConfig, data, callback) {

        let item = _.cloneDeep(this.config);
        item.coordType = layerConfig.coordType || 0;
        super.copyObject(layerConfig, item, ['id', 'name']);
        if (layerConfig.legends) {
            item.legends = layerConfig.legends;
        } else {
            super.dealLegends(item.legends, layerConfig);
        }
        let cBack = (res) => {
            callback && callback(res.result);
            super.setCallBack('AddALandmarkMapLayer', res, layerConfig);
            if (layerConfig.isClick) {
                super.setLayerClick(layerConfig, this.ueAction.clickCallback);
                if (res.result == 0 || layerConfig.isAddClick) {
                    return;
                }
                layerConfig.isAddClick = true;
            }
        };

        item.data = super.selectArray(data, [
            'id',
            'coordZ',
            'coord',
            'label',
            'type',
        ]);
        window.appInstance.uniCall('addLandmarkLayer', item, cBack);
        return item;
    }

    /**
     * Append and update grouping data
     * @param {Object} layerConfig Layer Configuration
     * @param {Array} group data packet
     * @param {int} index Serial Number
     */
    updateGroup(layerConfig, group, index = 0) {
        if (index < group.length) {
            this.updateData(
                layerConfig,
                group[index],
                () => {
                    this.updateGroup(layerConfig, group, ++index);
                },
                true
            );
        }
    }

    /**
     * Updating Landmark Data
     * @param {Object} layerConfig Layer Configuration
     * @param {Array} data Layer data
     * @param {Boolean} isAppend Default false
     */
    updateData(layerConfig, data, callback, isAppend = false) {
        let item = _.cloneDeep(this.config);
        super.copyObject(layerConfig, item, ['id', 'name']);
        if (layerConfig.legends) {
            item.legends = layerConfig.legends;
        } else {
            super.dealLegends(item.legends, layerConfig);
        }
        item.isAppend = isAppend;
        item.data = super.selectArray(data, [
            'id',
            'coordZ',
            'coord',
            'label',
            'type',
        ]);

        window.appInstance.uniCall('updateLandmarkLayerCoord', item, (res) => {
            super.setCallBack('Updating Landmark Data', res, layerConfig);
            callback && callback(res.result);
        });
    }

    /**
     * Update Landmark Style
     * @param {Object} layerConfig Layer Configuration
     */
    updateStyle(layerConfig) {
        let item = _.cloneDeep(this.config);
        super.copyObject(layerConfig, item, ['id', 'name']);
        if (layerConfig.legends) {
            item.legends = layerConfig.legends;
        } else {
            super.dealLegends(item.legends, layerConfig);
        }
        item.isAppend = true;
        window.appInstance.uniCall('updateLandmarkLayerStyle', item, (res) => {
            super.setCallBack('Update Landmark Style', res, layerConfig);
        });
    }
}