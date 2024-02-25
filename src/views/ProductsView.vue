<template>
  <h1 class="text-center">前台商品頁</h1>
  <Loading v-model:active="isLoading"></Loading>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <productModal :product="product" ref="modal" @add="addCart"></productModal>
      <!-- 產品Modal -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                :style="{ backgroundImage: `url( ${product.imageUrl} )` }">
              </div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary" @click="seeDetail(product.id)">
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger" @click="addCart(product.id)">
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios';
import productModal from '../components/ProductModal.vue'
export default {
  components: {
    productModal,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      product: {},
    }
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const getUrl = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_APIPATH}/products`;
      // console.log(getUrl);
      axios.get(getUrl)
        .then((res) => {
          this.products = res.data.products;
          // console.log(res)
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
    },

    addCart(id) {
      this.isLoading = true;
      const addCartUrl = `${import.meta.env.VITE_API}/v2/api/${import.meta.env.VITE_APIPATH}/cart`
      let addCart = {};
      //如果傳入參數是String，表示是從根元件加入購物車
      //這時設定qty=1
      if (typeof id === 'string') {
        //接收id資料並設定qty=1,
        addCart = {
          data: {
            product_id: id,
            qty: 1,
          }
        };
      } else {
        //若傳入參數是obj(非string)，表示是從modal中加入購物車
        //從modal加入購物車，接收id和qty資料
        addCart = { ...id }
      }
      axios.post(addCartUrl, addCart)
        .then(() => {
          //新增成功後關掉modal
          this.isLoading = false;
          this.$refs.modal.closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    seeDetail(id) {
      this.products.forEach((item) => {
        if (item.id == id) {
          this.product = item
        }
      });
      //雖然有API可以使用，但因為已有所有產品資料，所以用forEach找會比較快
      //打開modal並將資料傳入model中
      this.$refs.modal.openModal(this.product);
    },
  },
  mounted() {
    this.getProducts();

  },
}
</script>