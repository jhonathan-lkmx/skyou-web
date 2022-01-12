<template>
    <div class="container">
        <div class="container__block">
            <label class="label">
                <a class="label__text">
                    his page doesn't exist or some error ocurred. Maybe if you go to our home page you can find what you need.
                </a>
            </label>
            <div class="errorNotFound">
                <label class="errorNotFound__label">
                    <a class="errorNotFound__label__text">
                        Oops! We can't find the page you're looking for.
                    </a>
                </label>
                <label>
                    <img src="@/assets/img/404.png" alt="404">
                </label>
            </div>
            <nuxt-link to="/" class="button">
                <a class="button__text">Go to Home page</a>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
  export default {
    props: ['error'],
  }
</script>
<style lang="scss" scoped>
.container{
    width: 100%;
    display: flex;
    justify-content: center;

    &__block{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;

        position: static;
        width: 742px;
        height: 612px;
        left: 349px;
        top: 68px;


        /* Inside auto layout */

        flex: none;
        order: 1;
        align-self: stretch;
        flex-grow: 0;
        margin: 0px 0px;

        .button{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 8px 16px;

            position: static;
            width: 200px;
            height: 40px;
            left: 292.5px;
            top: 462.5px;

            /* primary/fashion-fuchsia */

            background: #EE008F;
            /* primary/fashion-fuchsia */

            border: 1px solid #EE008F;
            box-sizing: border-box;
            border-radius: 4px;

            /* Inside auto layout */

            flex: none;
            order: 2;
            flex-grow: 0;
            margin: 26px 0px;

            &__text{
                position: static;
                width: 125px;
                height: 18px;
                left: 16px;
                top: 11px;

                /* links/normal */

                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 18px;
                /* identical to box height, or 112% */

                display: flex;
                align-items: center;
                text-align: center;

                /* neutral/10 */

                color: #FFFFFF;


                /* Inside auto layout */

                flex: none;
                order: 0;
                flex-grow: 0;
                margin: 0px 4px;
            }
        }

        .label{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 0px;

            position: static;
            width: 496px;
            height: 58px;
            left: 123px;
            top: 378.5px;


            /* Inside auto layout */

            flex: none;
            order: 1;
            flex-grow: 0;
            margin: 26px 0px;

            &__text{
                position: static;
                width: 496px;
                height: 58px;
                left: calc(50% - 496px/2);
                top: calc(50% - 58px/2);

                /* paragraphs/normal */

                font-family: Roboto;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 29px;
                /* or 180% */

                display: flex;
                align-items: center;
                text-align: center;

                /* neutral/03 */

                color: #5C6B70;


                /* Inside auto layout */

                flex: none;
                order: 0;
                align-self: stretch;
                flex-grow: 0;
                margin: 4px 0px;
            }
        }

        .errorNotFound{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0px;

            position: static;
            width: 710px;
            height: 243px;
            left: 16px;
            top: 109.5px;


            /* Inside auto layout */

            flex: none;
            order: 0;
            flex-grow: 0;
            margin: 26px 0px;

            &__label{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                padding: 0px;

                position: static;
                width: 710px;
                height: 82px;
                left: 0px;
                top: 0px;


                /* Inside auto layout */

                flex: none;
                order: 1;
                flex-grow: 0;
                margin: 42px 0px;

                &__text{
                    position: static;
                    width: 710px;
                    height: 82px;
                    left: calc(50% - 710px/2);
                    top: calc(50% - 82px/2);

                    /* headings/h2 */

                    font-family: Comfortaa;
                    font-style: normal;
                    font-weight: bold;
                    font-size: 34px;
                    line-height: 120%;
                    /* or 41px */

                    display: flex;
                    align-items: center;
                    text-align: center;

                    /* neutral/01 */

                    color: #121516;


                    /* Inside auto layout */

                    flex: none;
                    order: 1;
                    align-self: stretch;
                    flex-grow: 0;
                    margin: 4px 0px;
                }
            }
        }

    }
}
</style>