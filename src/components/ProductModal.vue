<template>
  <div class="modal fade" id="productModal" ref="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div class="h5">{{ product.price }} 元</div>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" v-model.number="productData.num">
                  <button type="button" class="btn btn-primary" @click="addToCart(product.id)">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import * as bootstrap from 'bootstrap'

export default {
  props: ['product',],
  data() {
    return {
      modal: null,
      productData: {}
    };
  },
  methods: {
    openModal(data) {
      //接收上層傳入的資料並打開modal
      this.modal.show();
      this.productData = { ...data };
    },
    //加入購物車，將ID和qty用emit傳到上層
    addToCart(id) {
      const cartData = {
        data: {
          product_id: id,
          qty: this.productData.num
        },
      };
      this.$emit('add', cartData);
    },
    closeModal() {
      // this.productData = {};
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.productModal);
  }
}
</script>