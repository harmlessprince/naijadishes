<template>
  <div class="home container">
    <div class="row mt-5">
       <div class=" mb-4 col-sm-6 col-md-6 col-lg-4" v-for="dish in dishes" :key="dish.id">
        <div class="card card-temp">
           
          <div class="card-content">
          <span class="card-title green-text title"> <h2>{{dish.title}} </h2></span>
          <div class="divider mb-3"></div>
              <p >
                <ul class="ingredients">
                  <li v-for="(ingredient, index) in dish.ingredients" :key="index">
                    <span class="chip"> {{ingredient}} </span>
                  </li>
                </ul>
              </p>
          </div>
          <div class="card-action action">
            <span class="btn-floating btn-large spanDelete halfway-fab white">
               <i class="material-icons delete" @click="deleteDish(dish.id)">delete</i> 
            </span>
            <span class="btn-floating btn-large spanEdit halfway-fab white">
              <router-link :to="{name: 'EditDish', params: {dish_slug:dish.slug}}">
                 <i class="material-icons edit">edit</i> 
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: "Home",
  data() {
    return {
      dishes:[],
      connection_error: null
    
    }
  },
  methods:{
    deleteDish(id){
      db.collection('dishes').doc(id).delete().then(()=>{
        this.dishes = this.dishes.filter(dish =>{
        return dish.id != id;
      })
      })
    }
  },
  created(){
    db.collection('dishes').get().then(snapshot =>{
      snapshot.forEach(doc => {
        let dish = doc.data()
        dish.id = doc.id
        this.dishes.push(dish)
      })
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 
  .home{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-gap: 4px;
  } */

  .home .temp{
    margin: 1em 1em;
  }
  
  .home h2{
    font-size:1.3em;
    text-align: center;
    margin-top:0;
  }
  .home .ingredients li{
    display: inline-block;
  }

  /* .home .card-action{
    position: absolute;
    bottom: 0;
  } */

  .home .delete{
    font-size:3rem;
    color:red;
    cursor: pointer;
    
  }

  .home .action{
    position:relative;
  }

  .home .action .spanDelete{
    position:absolute;
    left:1em;

  }
 
    .home .action .spanEdit{
    position:absolute;
    right:1em;
   
  }

  .home .edit{
    
    font-size:3rem;
    color:#388E3C !important;
    cursor: pointer;
     /* padding:3px em; */
     margin-left: 0.1em;
   
  }

  .card .card-content {
    padding: 10px;
    border-radius: 0 0 2px 2px;
}
.btn-floating.btn-large i {
    line-height: none;
}
</style>
