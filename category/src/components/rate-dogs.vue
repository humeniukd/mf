<template>
  <div>
    <page-header title="Category"></page-header>
    <div class="content">
      <div class="card">
        Category Page
      </div>
    </div>
  </div>
</template>
<script>
import { PageHeader } from "@avon/styleguide";
export default {
  components: { PageHeader },
  data: () => ({
    currentDogUrl: null,
    rating: "10"
  }),
  created() {
    this.newDog();
  },
  methods: {
    newDog() {
      fetch("https://dog.ceo/api/breeds/image/random")
        .then(r => r.json())
        .then(json => {
          this.currentDogUrl = json.message;
          this.rating = "10";
        });
    },
    newRating(evt) {
      this.rating = evt.target.value;
      const dogs = JSON.parse(localStorage.getItem("dogs")) || [];
      dogs.push({ url: this.currentDogUrl, rating: Number(this.rating) });
      localStorage.setItem("dogs", JSON.stringify(dogs));
      this.newDog();
    }
  }
};
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card {
  margin-top: 1.6rem;
  padding: 3.2rem;
  background-color: white;
  border-radius: 0.5rem;
  max-width: 75%;
}

.card img {
  max-width: 100%;
}

.actions {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
}
</style>
