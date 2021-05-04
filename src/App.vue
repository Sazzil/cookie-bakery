<template>
  <div class="container mt-3 p-5">
    <div class="row">
      <div class="col-12 col-md-2"></div>
      <div class="col-12 col-md-8">
        <div class="d-flex ml-auto sunbg" id="sun" :class="nighTime" @click="activateDark"></div>
        <div class="mx-auto" id="roof"></div>

        <div class="px-3 py-2 px-md-4 py-md-2" id="shopName">
          <span>Cookie Bakery</span>
        </div>
        <div class="row mx-0" id="interior">
          <div class="col-4 align-self-center pb-6 px-2 px-md-4">
            <div class="mx-auto windows" id="windowLeft"></div>
          </div>
          <div class="col-4 align-self-end px-2 px-md-4">
            <input type="hidden" v-model="newOrder">
            <div class="mx-auto" id="door" @click="createOrder()">
              <span id="doorNob"></span>
            </div>
          </div>
          <div class="col-4 align-self-center pt-5 px-2 px-md-4">
            <div class="mx-auto windows" id="windowRight"></div>
            <div class="mt-3 mx-auto text-center p-3" @click="show = !show" :class="{mailboxClass:show}" id="mailbox">
              <span id="mails"></span>
              <p>Mailbox</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-2"></div>
    </div>

    <div class="row mt-5">
      <div class="col-12 text-center">
        <ul class="list-group">
          <li class="list-group-item" v-for="item in orderTime" :key="item.order_time">
            Ordered at {{ item.order_time }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        isDark: false,
        show: false,
        orderTime: [],
        newOrder: ''
      }
    },

    methods: {
      night() {
        document.querySelector('#app').classList.add('nightMode');
        document.querySelector('#windowLeft').classList.remove('windows');
        document.querySelector('#windowRight').classList.remove('windows');
        this.isDark = true;
        this.$emit('night');
      },
      day() {
        document.querySelector('#app').classList.remove('nightMode');
        document.querySelector('#windowLeft').classList.add('windows');
        document.querySelector('#windowRight').classList.add('windows');
        this.isDark = false;
        this.$emit('day');
      },
      activateDark() {
        if (this.isDark || document.querySelector('#app').classList.contains('nightMode')) {
          this.day();
        } else {
          this.night();
        }
      },

      ajaxSearchAxoios() {
        return axios({
          method: "GET",
          url: "http://localhost:3000/",
          responseType: "json",
        }).then((response) => {
          return response.data;
        }).catch((err) => {
          console.log(err);
        });
      },

      createOrder() {
        axios.post(
          "http://localhost:3000/create/?newOrder"
        )
      }

    },

    created() {
      this.ajaxSearchAxoios().then((result) => {
        this.orderTime.push(...result.model);
      });
    },

    computed: {
      nighTime() {
        return this.isDark && 'nightTime-toggled';
      }
    }

  }
</script>

<style>
  @import url('./assets/style.css');
</style>