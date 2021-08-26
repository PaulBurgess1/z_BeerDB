<template>
<div class="header-container row">
    <div class="row">
        <h1>Header</h1>
    </div>
    <div>
        <router-link class="btn btn-primary" to="/"> Card View </router-link>
        <router-link class="btn btn-primary" to="/table"> Table View </router-link>
    </div>
    
</div>
</template>


<script>
export default {
}
</script>

<style>
.header-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    background-color: var(--clr-bg-hf);
    color: var(--clr-text);
    padding-top:1rem;
}
h1{
    color: var(--clr-text);
}
</style>