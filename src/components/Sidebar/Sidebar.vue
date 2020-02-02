<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-content-logo">
        <img src="../../assets/site-logo.png" alt="site logo">
      </div>
      <div class="sidebar-content-links">
        <router-link v-for="link in links" :to="link.to" :key="link.to" class="sidebar-content-link" exact-active-class="-active"><font-awesome-icon v-if="link.icon" :icon="link.icon" class="sidebar-content-link-icon"/> {{link.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    links: [
      {
        to: '/',
        name: 'Home',
        icon: 'home'
      },
      {
        to: '/music/search',
        name: 'Search',
        icon: 'search'
      },
            {
        to: '/music/discover',
        name: 'Discover',
        icon: 'music'
      },
      {
        to: '/music/hot',
        name: 'Hot',
        icon: ['fab', 'hotjar']
      }
    ]
  }
}
}
</script>

<style scoped lang="scss">
  .sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    top: 0;
    height: calc(100% - 100px);
    margin-right: 100px;
    width: 250px;
    background: #000;
    padding: 10px;
    z-index: 99;
  }

  .sidebar-content {

    &-logo {
      display: flex;
      justify-content: center;
    }

    &-links {
      display: flex;
      flex-direction: column;
    }

    &-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: #fff;
      transition: color 0.3s ease-in-out;
      font-family: $main-font;
      font-weight: $normal;
      font-size: 15px;
      padding: 10px 10px 10px 25px;
      border-radius: 4px;

      &:hover {
        color: $pink;

        .sidebar-content-link-icon {
          // color: lighten($purple, 8%);
          color: $pink;
        }
      }

      &.-active {
        // color: $purple
        background-color: darken($dark-gray, 10%);
        // color: lighten($purple, 8%);
        color: $pink;
        transition: color 0s;

        .sidebar-content-link-icon {
          // color: lighten($purple, 8%);
          color: $pink;
        }
      }

      &-icon {
        width: 25px;
        height: 25px;
        position: relative;
        margin-right: 25px;
        font-size: 25px;
        // color: rgba($dark-gray, 0.8);
        color: rgba(#333, 0.3);
        transition: color 0.3s ease-in-out;
      }
    }
  }
</style>