<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-content-logo">
        <img src="../../assets/site-logo.png" alt="site logo">
      </div>
      <div class="sidebar-content-links">
        <router-link v-for="link in links" :to="link.to" :key="link.to" class="sidebar-content-link" active-class="-active" exact-active-class="-active">{{link.name}}</router-link>
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
        name: 'Home'
      },
      {
        to: '/music/search',
        name: 'Search'
      },
            {
        to: '/music/discover',
        name: 'Discover'
      },
      {
        to: '/music/hot',
        name: 'HOT'
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
    background: #111;
    padding: 20px;
  }

  .sidebar-content {

    &-links {
      display: flex;
      flex-direction: column;
    }

    &-link {
      text-decoration: none;
      color: $pink;
    }
  }
</style>