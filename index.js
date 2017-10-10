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

export default DatePicker