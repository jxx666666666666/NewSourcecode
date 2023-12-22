import createPanel from './createPanel'
import SmartLamp from '../../components/popup/SmartLamp.vue'
import LightDetail from '../../components/popup/LightDetail.vue'
import DeviceAlarm from '../../components/popup/DeviceAlarm.vue'
import PublicSecuritySituation from '../../components/popup/PublicSecuritySituation.vue'
import AlarmEvent from '../../components/popup/AlarmEvent.vue'
import Economy from '../../components/popup/Economy.vue'
import HistoricalEvent from '../../components/popup/HistoricalEvent.vue'
import Camera from '../../components/popup/Camera.vue'
import AdvertisementDispla from '../../components/popup/AdvertisementDispla.vue'
import SmartLight from '../../components/popup/SmartLight.vue'
import Shelter from '../../components/popup/Shelter.vue'
import KeyProject from '../../components/popup/KeyProject.vue'
import Enterprise from '../../components/popup/Enterprise.vue'
import Traffic from '../../components/popup/Traffic.vue'
import PoliceSituation from '../../components/popup/PoliceSituation.vue'
import LeasedPlace from '../../components/popup/LeasedPlace.vue'
import SecurityIncident from '../../components/popup/SecurityIncident.vue'
import Pilotcommunity from '../../components/popup/Pilotcommunity.vue'
import ParkingLot from '../../components/popup/ParkingLot.vue'
import FireTruck from '../../components/popup/LianDongZhiHui/FireTruck.vue'
import Ambulance from '../../components/popup/LianDongZhiHui/Ambulance.vue'
import TransportVehicle from '../../components/popup/LianDongZhiHui/TransportVehicle.vue'
import ProtectionTarget from '../../components/popup/LianDongZhiHui/ProtectionTarget.vue'
import EmergencyMaterialWarehouse from '../../components/popup/LianDongZhiHui/EmergencyMaterialWarehouse.vue'
import ExpertTeam from '../../components/popup/LianDongZhiHui/ExpertTeam.vue'
import MedicalStaff from '../../components/popup/LianDongZhiHui/MedicalStaff.vue'
import Firefighter from '../../components/popup/LianDongZhiHui/Firefighter.vue'
import RisksPoints from '../../components/popup/LianDongZhiHui/RisksPoints.vue'
import PolicePoint from '../../components/popup/LianDongZhiHui/PolicePoint.vue'
import deletePoint from '../../components/panel.vue'
export default {
  // The width of the label is configured according to the scatterType
  sizeList: {
    'Smart Lamp Pole/lamp': [785, 390],
    DengganIcon: [480, 520],
    onLineLamp: [785, 390],
    offLineLamp: [785, 390],
    'Device Alarm': [400, 180],
    Camera: [470, 385],
    'Advertisement Displa': [470, 158],
    onLineAdvertisement: [470, 158],
    offLineAdvertisement: [470, 158],
    'Smart Light Pole Weather Sensor': [440, 188],
    Shelter: [470, 205],
    'Key Project': [470, 190],
    Enterprise: [470, 215],
    'Traffic Incident': [470, 170],
    'Police Situation': [470, 180],
    'Leased Place Locations': [470, 180],
    'Security Incident': [470, 140],
    Alarm: [400, 180],
    'weather sensor': [440, 188],
    Checkpoint: [470, 385],
    'Camera Location': [470, 385],
    'Pilot community': [470, 90],
    'Parking Lot': [470, 90],
    deletePoint: [50, 50],
    dataCenter: [0, 0],
    'Public Security Police Situation Point': [515, 400],
    'Alarm Event Point': [560, 310],
    'Alarm Event': [560, 310],
    'Historical Event Point': [515, 400],
    'Expert Team': [680, 490],
    'Protection Target': [680, 675],
    'Emergency Material': [570, 355],
    'Fire Truck': [590, 310],
    Ambulance: [590, 310],
    'Medical Personnel': [590, 310],
    'Risks Points': [590, 310],
    Firefighter: [590, 310],
    'Transport Vehicle': [590, 310],
    Police: [590, 130],
    GDPColumnLayer: [680, 310],
  },
  offset: {
    'Smart Lamp Pole/lamp': [0, 0],
    DengganIcon: [50, 120],
    onLineLamp: [0, 0],
    offLineLamp: [0, 0],
    'Device Alarm': [0, 0],
    Camera: [0, 0],
    'Advertisement Displa': [0, 0],
    onLineAdvertisement: [0, 0],
    offLineAdvertisement: [0, 0],
    'Smart Light Pole Weather Sensor': [0, 0],
    Shelter: [0, 0],
    'Key Project': [0, 0],
    Enterprise: [0, 0],
    'Traffic Incident': [0, 0],
    'Police Situation': [0, 0],
    'Leased Place Locations': [0, 0],
    'Security Incident': [0, 0],
    Alarm: [0, 0],
    'weather sensor': [0, 0],
    Checkpoint: [0, 0],
    'Camera Location': [0, 0],
    'Pilot community': [0, 0],
    'Parking Lot': [0, 0],
    deletePoint: [70, 10],
    dataCenter: [0, 0],
    'Public Security Police Situation Point': [0, 0],
    'Alarm Event Point': [0, 0],
    'Alarm Event': [0, 0],
    'Historical Event Point': [0, 0],
    'Expert Team': [0, 0],
    'Protection Target': [0, 0],
    'Emergency Material': [0, 0],
    'Fire Truck': [0, 0],
    Ambulance: [0, 0],
    'Medical Personnel': [0, 0],
    'Risks Points': [0, 0],
    Firefighter: [0, 0],
    'Transport Vehicle': [0, 0],
    Police: [0, 0],
    GDPColumnLayer: [0, 0],
  },
  getPanelIfon(id, overlayType, item) {
    let scatterType = item.scatterType
    let divId = ''
    switch (item.scatterType) {
      case 'Smart Lamp Pole/lamp':
        divId = createPanel.getDivId(SmartLamp, { id: id, data: item })
        break
      case 'DengganIcon':
      case 'onLineLamp':
      case 'offLineLamp':
        divId = createPanel.getDivId(LightDetail, { id: id, data: item })
        break
      case 'Device Alarm':
      case 'Alarm':
        divId = createPanel.getDivId(DeviceAlarm, { id: id, data: item })
        break
      case 'Camera':
      case 'Checkpoint':
      case 'Camera Location':
        divId = createPanel.getDivId(Camera, { id: id, data: item })
        break
      case 'Advertisement Displa':
      case 'onLineAdvertisement':
      case 'offLineAdvertisement':
        divId = createPanel.getDivId(AdvertisementDispla, {
          id: id,
          data: item,
        })
        break
      case 'Smart Light Pole Weather Sensor':
      case 'weather sensor':
        divId = createPanel.getDivId(SmartLight, { id: id, data: item })
        break
      case 'Shelter':
        divId = createPanel.getDivId(Shelter, { id: id, data: item })
        break
      case 'Key Project':
        divId = createPanel.getDivId(KeyProject, { id: id, data: item })
        break
      case 'Enterprise':
        divId = createPanel.getDivId(Enterprise, { id: id, data: item })
        break
      case 'Traffic Incident':
        divId = createPanel.getDivId(Traffic, { id: id, data: item })
        break
      case 'Police Situation':
        divId = createPanel.getDivId(PoliceSituation, { id: id, data: item })
        break
      case 'Leased Place Locations':
        divId = createPanel.getDivId(LeasedPlace, { id: id, data: item })
        break
      case 'Security Incident':
        divId = createPanel.getDivId(SecurityIncident, { id: id, data: item })
        break
      case 'Pilot community':
        divId = createPanel.getDivId(Pilotcommunity, { id: id, data: item })
        break
      case 'Parking Lot':
        divId = createPanel.getDivId(ParkingLot, { id: id, data: item })
        break
      case 'deletePoint':
        divId = createPanel.getDivId(deletePoint, { id: id, data: item })
        break
      case 'Public Security Police Situation Point':
        divId = createPanel.getDivId(PublicSecuritySituation, {
          id: id,
          data: item,
        })
        break
      case 'Alarm Event':
      case 'Alarm Event Point':
        divId = createPanel.getDivId(AlarmEvent, { id: id, data: item })
        break
      case 'Historical Event Point':
        divId = createPanel.getDivId(HistoricalEvent, { id: id, data: item })
        break
      case 'Fire Truck':
        divId = createPanel.getDivId(FireTruck, { id: id, data: item })
        break
      case 'Ambulance':
        divId = createPanel.getDivId(Ambulance, { id: id, data: item })
        break
      case 'Protection Target':
        divId = createPanel.getDivId(ProtectionTarget, { id: id, data: item })
        break
      case 'Emergency Material':
        divId = createPanel.getDivId(EmergencyMaterialWarehouse, {
          id: id,
          data: item,
        })
        break
      case 'Expert Team':
        divId = createPanel.getDivId(ExpertTeam, { id: id, data: item })
        break
      case 'Medical Personnel':
        divId = createPanel.getDivId(MedicalStaff, { id: id, data: item })
        break
      case 'Risks Points':
        divId = createPanel.getDivId(RisksPoints, { id: id, data: item })
        break
      case 'Firefighter':
        divId = createPanel.getDivId(Firefighter, { id: id, data: item })
        break
      case 'Transport Vehicle':
        divId = createPanel.getDivId(TransportVehicle, { id: id, data: item })
        break
      case 'Police':
        divId = createPanel.getDivId(PolicePoint, { id: id, data: item })
        break
      case 'GDPColumnLayer':
        divId = createPanel.getDivId(Economy, { id: id, data: item })
        break
      default:
    }
    return {
      divId,
      size: this.sizeList[scatterType] || [400, 400],
      offset: this.offset[scatterType] || [0, 0],
    }
  },
}
