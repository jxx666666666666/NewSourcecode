import Vue from "vue";
export default class createPanel {
    static createPanel(Component, props) {
        console.log(Component, props);
        const vm = new Vue({
            render(h) {
                return h(Component, { props })
            }
        }).$mount()
        return vm.$el
    }
    static getDivId(component, info) {
        let divId = info.id;
        let divpanel = document.createElement('div');
        divpanel.style.display='none';
        divpanel.setAttribute('id', divId);
        document.getElementById('app').appendChild(divpanel);
        let vm = this.createPanel(component, info)
        divpanel.appendChild(vm)
        return divId
    }
}