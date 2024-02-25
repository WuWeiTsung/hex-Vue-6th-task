<template>
  <Loading v-model:active="isLoading"></Loading>
  <h1 class="text-center">購物車頁面</h1>


  <div class="container">
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="deleteAllCart">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="carts">
          <tr v-for="cart in carts" :key="cart.id">
            <td>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteCart(cart.id)">
                x
              </button>
            </td>
            <td>
              {{ cart.product.title }}
              <div class="text-success">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input min="1" type="number" class="form-control" v-model.number="cart.qty" @blur="updateCart(cart)">
                  <span class="input-group-text" id="basic-addon2">{{ cart.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success">折扣價：</small>
              {{ cart.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ total }}</td>
        </tr>
      </tfoot>
    </table>

    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
            rules="email|required" placeholder="請輸入 Email" v-model="user.email"></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="user.name"></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            rules="required|min:8" placeholder="請輸入電話" v-model="user.tel"></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="user.address"></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger" @click.prevent="submitOrder">送出訂單</button>
        </div>
      </v-form>
    </div>

  </div>
</template>

<script>
import Loading from "vue-loading-overlay"
import axios from "axios"

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate'
import * as VeeValidateRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

Object.keys(VeeValidateRules).forEach((rule) => {
  defineRule(rule, VeeValidateRules[rule]);
});

configure({
  generateMessage: localize(zhTW),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});


export default {
  components: {
    Loading,
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  data() {
    return {
      isLoading: false,
      carts: [],
      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      message: "",
      total: "",
    }
  },
  methods: {
    getCarts() {
      this.isLoading = true;
      const getCartUrl = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_APIPATH}/cart`;
      axios.get(getCartUrl)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.total = res.data.data.final_total
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    updateCart(cart) {
      this.isLoading = true;
      const cartId = cart.id;
      const updateData = {
        data: {
          product_id: cart.product_id,
          qty: cart.qty,
        },
      };
      const updateCartUrl = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_APIPATH}/cart/${cartId}`;
      axios.put(updateCartUrl, updateData)
        .then(() => {
          this.getCarts()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteCart(id) {
      this.isLoading = true;
      const deleteCartUrl = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_APIPATH}/cart/${id}`;
      axios.delete(deleteCartUrl)
        .then(() => {
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteAllCart() {
      this.isLoading = true;
      const deleteAllCartUrl = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_APIPATH}/carts`;
      axios.delete(deleteAllCartUrl)
        .then(() => {
          this.getCarts()
        })
        .catch((err) => {
          console.log(err);
        });
    },



  },
  mounted() {
    this.getCarts()

  },
}
</script>