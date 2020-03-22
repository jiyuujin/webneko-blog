<template>
  <div class="header">
    <img src="/icon/bakeneko2.png" alt="icon" />
    <div class="author">
      <h1>Web猫</h1>
      Web developer, HR adviser, etc..
      <a href="https://yuukit.me/">
        profile
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  img {
    width: 20%;
    min-width: 60px;
    max-width: 120px;
    height: 120px;
    margin: 12px;
    border-radius: 500rem;
  }

  .author {
    margin-left: 12px;

    h1 {
      display: block;
      margin: 0 0 10px 0;
      font-size: 2em;
      font-weight: bold;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0;
      margin-inline-end: 0;
    }
  }
}

@media (max-width: 600px) {
  .header {
    img {
      width: 12%;
      min-width: 60px;
      max-width: 60px;
      height: 60px;
    }

    .author {
      h1 {
        font-size: 1rem;
      }
    }
  }
}
</style>
