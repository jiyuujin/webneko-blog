<template>
  <a
    class="bmc-button"
    target="_blank"
    href="https://www.buymeacoffee.com/VqwL7dpxl"
  >
    <img
      src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
      alt="Buy me a coffee"
      decoding="async"
    >
    <span style="margin-left: 5px;">
      Buy me a coffee
    </span>
  </a>
</template>

<style lang="scss" scoped>
  @media screen and (prefers-reduced-motion: reduce) {
    .bmc-button {
      background-color: #bb5794;
      border: 1px solid transparent;
      border-radius: 3px;
      box-shadow: 0 1px 2px rgba(190, 190, 190, 0.5);
      box-sizing: border-box;
      color: #fff;
      display: inline-flex;
      font-family: "Lato", sans-serif;
      font-size: 17px;
      height: 37px;
      letter-spacing: -0.08px;
      line-height: 36px;
      margin: 0 auto;
      padding: 0 9px;
      text-decoration: none;
      transition: none;

      img {
        border: none;
        box-shadow: none;
        margin-bottom: 1px;
        vertical-align: middle;
        width: 27px;
      }
    }
  }

  .bmc-button {
    background-color: #bb5794;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(190, 190, 190, 0.5);
    box-sizing: border-box;
    color: #fff;
    display: inline-flex;
    font-family: "Lato", sans-serif;
    font-size: 17px;
    height: 37px;
    letter-spacing: -0.08px;
    line-height: 36px;
    margin: 0 auto;
    padding: 0 9px;
    text-decoration: none;
    transition: 0.3s all linear;

    img {
      border: none;
      box-shadow: none;
      margin-bottom: 1px;
      vertical-align: middle;
      width: 27px;
    }
  }

  .bmc-button:hover,
  .bmc-button:active,
  .bmc-button:focus {
    box-shadow: 0 1px 2px 2px rgba(190, 190, 190, 0.5);
    color: #fff;
    opacity: 0.85;
    text-decoration: none;
  }
</style>
