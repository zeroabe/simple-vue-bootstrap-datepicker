import DatePicker from './src/components/Datepicker.vue'
import Vue from 'vue'

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
    $datePickerBus: {
        get: function () {
            return EventBus
        }
    }
})

Vue.component('simple-date-picker', DatePicker);

export default DatePicker