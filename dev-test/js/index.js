const $ = window.jQuery = require('jquery')

import Vue from 'vue'

import Component from '../vue/test.vue'


const app = new Vue({
    el: '#app',
    render: (h) => h(Component)
});