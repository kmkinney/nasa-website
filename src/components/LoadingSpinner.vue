<template>
    <img class="loading" src="@/assets/meteorite.svg"/>
</template>

<style scoped>
.loading {
    position: fixed;
    top: 50%;
    right: 50%;
    width: 100px;
    height: auto;
    animation-name: spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    z-index: 999;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>