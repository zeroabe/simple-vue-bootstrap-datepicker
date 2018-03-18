<template>
    <div>
        <date-picker v-model="date"></date-picker>
        <p>{{date}}</p>
    </div>
</template>

<script>
  import DatePicker from '../../index'

  export default {
    name: "test",
    data() {
      return {
        date: '01.12.1985'
      }
    },
    components: {
      DatePicker
    }
  }
</script>

<style scoped>

</style>