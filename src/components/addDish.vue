<template>
  <div class="addDish container">
    <form @submit.prevent="addNewDish">
      <div class="row ">
        <div class="col-md-4 col-lg-5  col-sm-4 mx-auto">
          <div class="card">
            <div class="card-body">
              <h3 class="text-center">Add New Dish Dish</h3>
              <div class="form-group">
                <label for="">Dish Title</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  placeholder="Enter Dish Title"
                  v-model="title"
                />
              </div>
              <div
                class="form-group field"
                v-for="(ing, index) in ingredients"
                :key="index"
              >
                <label for="ingredients">Ingredients</label>
                <input
                  type="text"
                  class="form-control"
                  name="ingredient"
                  placeholder="Enter an Ingredient"
                  v-model="ingredients[index]"
                />

                <i class="material-icons delete" @click="deleteIngs(ing)">
                  delete</i
                >
              </div>
              <div class="form-group">
                <label for="">Add an Ingredient</label>
                <input
                  type="text"
                  class="form-control"
                  name="addIngredient"
                  placeholder="Enter an Ingredient"
                  v-model="addIngredient"
                  @keydown.tab.prevent="addIng"
                />

                <span
                  class="chip"
                  v-for="(ing, index) in ingredients"
                  :key="index"
                  >{{ ingredients[index] }}</span
                >
                  <p class="text-danger">{{ feedBack }}</p>
                <div class="buttonIngs">
                  <button
                    type="button"
                    class="btn btn-sm text-white bg-success text-capitalize "
                    @click.prevent="addIng"
                  >
                    <p class="addButtonIngs">
                      Add/Save new ingredients
                    </p>
                  </button>
                </div>
              </div>
              <span class="alert text-info" role="alert"
                ><p>HINT: Press Your Tab Key to add new Ingredient</p></span
              >
              <button class="btn green darken-2 text-white">Add Dish</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import db from "@/firebase/init";
import slugify from "slugify";
// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: "addDish",
  data() {
    return {
      title: null,
      addIngredient: null,
      ingredients: [],
      feedBack: null,
      slug: null
    };
  },
  methods: {
    addNewDish() {
      if (this.title) {
        this.feedBack = null;
        this.slug = slugify(this.title);
        // console.log(this.slug)
        db.collection("dishes")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug.toLowerCase()
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedBack = "Title field can not be empty";
      }
    },

    addIng() {
      if (this.addIngredient) {
        this.ingredients.push(this.addIngredient);
        // console.log(this.ingredients)
        this.addIngredient = null;
        this.feedBack = null;
      } else {
        this.feedBack = "You must enter an ingredient";
      }
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },
    deleteIngs(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  }
};
</script>

<style>
.addDish {
  margin-top: 1em;
}
.delete {
  position: absolute;
  right: 0;
  font-size: 2rem;
  bottom: 14px;
  color: red;
  cursor: pointer;
}
.field {
  position: relative;
}
/* .addButtonIngs {
  font-size: 1.2rem;
} */
.buttonIngs {
  text-align: center;
}
</style>
