<template>
  <div id="edit-dish" class="container EditDish" v-if="dish">
    <h2 class="text-center mt-3">Edit {{ dish.title }} Dish</h2>
    <form @submit.prevent="editDish">
      <div class="row ">
        <div class="col-md-4 col-lg-5  col-sm-4 mx-auto">
          <div class="card">
            <div class="card-body">
              <div class="form-group">
                <label for="">Dish Title</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  placeholder="Enter Dish Title"
                  v-model="dish.title"
                />
              </div>
              <div
                class="form-group field"
                v-for="(ing, index) in dish.ingredients"
                :key="index"
              >
                <label for="ingredients">Ingredients</label>
                <input
                  type="text"
                  class="form-control"
                  name="ingredient"
                  placeholder="Enter an Ingredient"
                  v-model="dish.ingredients[index]"
                />

                <i class="material-icons delete" @click="deleteIngs(ing)">
                  delete</i
                >
              </div>
              <div class="form-group">
                <label for="">Edit an Ingredient</label>
                <input
                  type="text"
                  class="form-control"
                  name="EditIngredient"
                  placeholder="Enter an Ingredient"
                  v-model="EditIngredient"
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
              <button class="btn green darken-2 text-white">Update Dish</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditDish",
  data() {
    return {
      dish: null,
      feedBack: null,
      EditIngredient: null
    };
  },
  methods: {
    editDish() {
      if (this.dish.title || this.dish.ingredients.length) {
        this.feedBack = null;
        this.dish.slug = slugify(this.dish.title);
        // console.log(this.slug)
        db.collection("dishes")
          .doc(this.dish.id)
          .update({
            title: this.dish.title,
            ingredients: this.dish.ingredients,
            slug: this.dish.slug.toLowerCase()
          })
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedBack = "Neither an Ingredient and a title field can be empty";
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
    addIng() {
      if (this.EditIngredient) {
        this.dish.ingredients.push(this.EditIngredient);
        // console.log(this.ingredients)
        this.EditIngredient = null;
        this.feedBack = null;
      } else {
        this.feedBack = "You must enter an ingredient";
      }
    },
    deleteIngs(ing) {
      this.dish.ingredients = this.dish.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let dish = db
      .collection("dishes")
      .where("slug", "==", this.$route.params.dish_slug);
    dish.get().then(snapshot => {
      snapshot.forEach(dishFetched => {
        this.dish = dishFetched.data();
        this.dish.id = dishFetched.id;
      });
    });
  }
};
</script>

<style>
.edit {
  position: absolute;
  right: 0;
  font-size: 2rem;
  bottom: 14px;
  cursor: pointer;
}
.EditDish {
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
</style>
