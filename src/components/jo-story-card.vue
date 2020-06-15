<template>
    <section :class="$style.root">
        <div :class="$style.picture">
            <img class="image" :src="src" />
        </div>
        <div :class="$style.content">
            <h1 :class="$style.h1">{{ title }}</h1>
            <p></p>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        title: String,
        src: String,
    }
}
</script>

<style lang="scss" module>
.root{
    padding: 15px;
    background-color: var(--main-bf-color6);
    box-shadow: var(--main-shadow-color);
    border: 1px solid transparent;
}
.picture{

}
.content{
    .h1{
        font-size: var(--main-card-h1);
    }
}

</style>