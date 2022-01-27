<template>
  <div class="home__milestones__grid-content">
    <div class="dot-line">
      <div class="line"></div>
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div class="home__milestones__grid side-1">
      <h4>1993</h4>
      <h4>Joined Timbuk2 as first employee</h4>
    </div>
    <div class="home__milestones__grid side-2">
      <h4>1995</h4>
      <h4>Acquired controlling stake in Timbuk2</h4>
    </div>
     <!-- <img src="../static/img/dots.svg" alt="" class="dot-line"> -->
    <div class="home__milestones__grid side-3">
      <h4>1996</h4>
      <h4>Launched web’s first graphic-based design tool </h4>
    </div>
    <div class="home__milestones__grid side-4">
      <h4>2002</h4>
      <h4>Sold Timbuk2 to private equity group</h4>
    </div>    
    <div class="home__milestones__grid side-5">
      <h4>2003</h4>
      <h4>Built mass customization factory for NikeiD</h4>
    </div>    
    <div class="home__milestones__grid side-6">
      <h4>2005</h4>
      <h4>Led Cafepresses product development</h4>
    </div> 
    <div class="home__milestones__grid side-7">
      <h4>2006</h4>
      <h4>Launched Reebok’s RBK Custom service, under Confego</h4>
    </div>  
    <div class="home__milestones__grid side-8">
      <h4>2008</h4>
      <h4>Sold Confego to Zazzle; an on-demand marketplace</h4>
    </div> 
    <div class="home__milestones__grid side-9">
      <h4>2011</h4>
      <h4>Started SKYOU to bring big-brand quality to any brand</h4>
    </div>   
    <div class="home__milestones__grid side-10">
      <h4>2014</h4>
      <h4>Launched web-based 3d design tool</h4>
    </div> 
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
.home__milestones {
  &__grid-content {
      display: grid;
      grid-template-columns: 400px 10px 400px;
      justify-content: center;
      padding: var(--f-gutter) 0;
      column-gap: var(--f-gutter);
      @include respond-to("<=m") {
        grid-template-columns: 1fr 10px 1fr;
      }
    .side-1 {
      grid-column: 1 / 2;
    }
    .side-2 {
      grid-column: 3 / 4;
      grid-row: 2 / 3;  
      h4 {
        width: 82%;
        @include respond-to("<=m") {
          width: 100%;
        }
      }
    }
    .side-3 {
      grid-column: 1 / 2;
      grid-row: 3 / 4;    
    }
    .side-4 {
      grid-column: 3 / 4;
      grid-row: 4 / 5;    
    }  
    .side-5{
      grid-column: 1 / 2;
      grid-row: 5 / 6;
    }  
    .side-6{
      grid-column: 3 / 4;
      grid-row: 6 / 7;
    }
    .side-7{
      grid-column: 1 / 2;
      grid-row: 7 / 8;
    }
    .side-8{
      grid-column: 3 / 4;
      grid-row: 8 / 9;
    }
    .side-9{
      grid-column: 1 / 2;
      grid-row: 9 / 10;
    }
    .side-10{
      grid-column: 3 / 4;
      grid-row: 10 / 11;
    }
    .dot-line {
      grid-column: 2 / 3;
      grid-row: 1 / 11;
      position: relative;
      .line {
        position: absolute;
        width: 1px;
        left: calc(50% - 0px/2);
        top: 0px;
        height: 100%;
        background-color: var(--color-neutral-06);
        z-index: 20;
      }
      .dots {
        height: 100%;
        display: grid;
        padding-top: 31px;
        padding-bottom: 44px;
        align-content: space-between;
        .dot {
        
          width: 10px;
          height: 10px;
          left: 0px;
          background: var(--color-neutral-10);
          border: 1px solid var(--color-primary-fashion-fuchsia);
          box-sizing: border-box;
          border-radius: 50%;
          z-index: 40;
        }
      }
      height: 100%;
    }
  }
  &__grid {
    background-color: var(--color-neutral-09);
    padding: var(--f-gutter);
    border-radius: 4px;
    height: max-content;
    h4 {
      margin-bottom: 0;
      color: var(--color-neutral-01);
    }
    h4:nth-of-type(1) {
      color: var(--color-primary-fashion-fuchsia);
    }
  }
}
</style>