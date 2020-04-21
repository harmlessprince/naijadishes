<template>
  <div class="navbar">
    <nav class="menubar green darken-4">
      <div class="nav-wrapper">
        <router-link :to="{ name: 'Home' }">
          <span class="title left">9JADishes</span>
        </router-link>
        <ul id="nav-mobile" class="right" >
          <li>
            <a
              href=""
              class="btn-floating btn-large halfway-fab green darken-2"
            >
              <router-link :to="{ name: 'addDish' }">
                <i class="material-icons">add</i></router-link
              >
            </a>
          </li>
          <!-- <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li> -->
        </ul>
      </div>
    </nav>
    
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.menubar {
  padding: 0 20px;
}
.title {
  font-size: 2rem;
}

.navlink:hover {
  color: none;
  text-decoration: none;
}
</style>
