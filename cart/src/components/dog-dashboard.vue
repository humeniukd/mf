<template>
  <div>
    <page-header title="Cart page"></page-header>
    <div class="card">
      <div v-if="dogs.length === 0">
        There are no products!
        <router-link to="/category">Category</router-link>.
      </div>
      <Cart />
    </div>
  </div>
</template>
<script>
import { PageHeader } from "@avon/styleguide";
import Cart from "./Cart.vue";

export default {
  components: {
    PageHeader,
    Cart,
  },
  data: () => ({
    dogs: JSON.parse(localStorage.getItem("dogs")) || []
  })
};
</script>
<style scoped>
.card {
  background-color: white;
  margin: 3.2rem auto 0 auto;
  width: 75%;
  padding: 2.4rem;
}

.dogs {
  display: flex;
  flex-wrap: wrap;
}

.dog {
  margin: 1.6rem;
  max-width: 100rem;
}

.rating {
  display: flex;
  justify-content: center;
}
</style>
