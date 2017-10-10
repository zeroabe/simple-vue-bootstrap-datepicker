<template>
  <div class='input-group date'>
    <input
        :style="'width: ' + width + 'px;'"
        class="calendar form-control"
        type='text'
        v-model="value"
        @keydown="handleKey"
        :placeholder="pickerPlaceholder"/>
  </div>
</template>
<script>
  const $ = window.jQuery = require('jquery')

  import moment from 'moment'
  import 'bootstrap'
  import 'bootstrap-datepicker'
  import '../styles/datepicker.css'
  $.fn.datepicker.dates['ru'] = {
    days: ["Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
    daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    today: "Сегодня",
    clear: "Очистить",
    format: "dd.mm.yyyy",
    titleFormat: "MM yyyy",
    weekStart: 1
  };

  export default {
    name: 'simple-datepicker',

    props: {
      format: {
        type: String,
        default: 'dd.mm.yyyy'
      },
      date: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: 'Введите дату'
      },
      defaultDate: {
        type: String,
        default: '01.01.1990'
      },
      width: {
        type: Number,
        default: 100
      },
      startView: {
        type: String,
        default: 'days'
      },
      orientation: {
        type: String,
        default: 'left bottom'
      },
      endDate: {
        type: String,
      },
      startDate: {
        type: String
      }
    },

    data () {
      return {
        value: this.date || this.defaultDate,
        pickerPlaceholder: this.placeholder || 'Введите дату',
      }
    },

    computed: {
      config() {
        return {
          format: this.format || 'DD.MM.YYYY',
          clearBtn: true,
          language: 'ru',
          weekStart: 1,
          orientation: this.orientation,
          todayHighlight: true,
          startView: this.startView,
          endDate: this.endDate,
          startDate: this.startDate
        }
      },
    },

    methods: {
      handleKey(e) {
        if(e.key === 'Enter') {
          this.$emit('date-change', this.value)
          $(e.target).datepicker('hide')
        }
      },
      createDatePicker(el) {
        let mycomp = $(el.querySelector('.calendar')).datepicker(this.config)
        mycomp.on('changeDate', e => {
          this.value = moment(e.date).format('DD.MM.YYYY')
          this.$emit('date-change', this.value)
          $(e.target).datepicker('hide')
        })
      },

      destroyDatePicker() {
        $(this.$el.querySelector('.calendar')).datepicker('destroy')
      }
    },

    mounted() {
      this.createDatePicker(this.$el)
      this.$datePickerBus.$on('document-type-changed', () => {
        this.$nextTick( () => {
          $(this.$el.querySelector('.calendar')).datepicker('setEndDate', this.endDate || false)
          $(this.$el.querySelector('.calendar')).datepicker('setStartDate', this.startDate || false)
        })
      })
    },

    destroyed() {
      this.destroyDatePicker()
    },
  }
</script>
<style>
  .calendar {
    min-height: 26px;
  }
</style>