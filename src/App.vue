<template>
  <main id="app" class="app">
    <router-view/>
  </main>
</template>

<style lang="sass">
  $light-font-color: #868686
  $dark-font-color: #242323

  *,
  *:before,
  *:after
    box-sizing: border-box

  body
    min-width: 375px
    background-image: url('./assets/images/bg.png')
    font-family: 'Montserrat', sans-serif
    font-size: 18px
    color: $dark-font-color

  h1, h2, h3, h4, h5, h6, p, ul, label
    margin: 0

  ul
    padding: 0
    list-style: none

  a
    text-decoration: none

  .line-through
    text-decoration: line-through

  input
    display: block
    height: 60px
    padding: 6px 15px
    border: 1px solid rgba($light-font-color, 0.4)
    border-radius: 5px
    font-weight: 500
    color: $dark-font-color
    outline: none
    transition: all 0.2s ease

    &:focus
      border-color: $dark-font-color
      box-shadow: 0 0 3px 0 $light-font-color

    &::placeholder
      color: rgba($light-font-color, 0.4)

  .app
    display: flex
    flex-direction: column
    justify-content: center
    min-height: 100vh
    padding: 40px 20px
    overflow: hidden

  .content
    display: flex
    flex-direction: column

  .header
    display: flex
    flex-direction: column
    justify-content: flex-end
    height: 15%

  .container
    width: 100%
    height: 80%
    margin: 0 auto
    overflow: auto

  .title
    position: relative
    display: block
    padding: 15px
    text-align: center
    font-weight: 400
    line-height: 1.4
    color: $light-font-color
    overflow: hidden

    b
      font-weight: 600
      color: $dark-font-color

    span
      position: relative
      padding: 0 20px

      &:before,
      &:after
        content: ''
        position: absolute
        top: 50%
        display: block
        width: 1920px
        height: 1px
        background-color: $light-font-color

      &:before
        right: 100%

      &:after
        left: 100%

  .button
    display: inline-block
    min-width: 45px
    padding: 10px
    background-color: #fff
    text-decoration: none
    border: 1px solid rgba($light-font-color, 0.4)
    border-radius: 5px
    outline: none
    font-size: 16px
    line-height: 1.15
    font-weight: 500
    color: $dark-font-color
    transition: all 0.2s ease

    &:focus,
    &:hover,
    &:active
      border-color: $dark-font-color
      box-shadow: 0 0 3px 0 $light-font-color
      cursor: pointer

    &--success
      background-color: #39bf50
      color: #fff

      &:focus,
      &:hover,
      &:active
        border-color: #39bf50
        box-shadow: 0 0 3px 0 #39bf50
</style>
