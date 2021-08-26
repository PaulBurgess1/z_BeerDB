<template>
<div class="header-container row">
    <div class="row">
        <h1>
            <i class="fas fa-beer"></i>
            Brewski Database
            <i class="fas fa-beer"></i>
        </h1>
    </div>
    <div class="">
        <a class="btn btn-success mb-1" href="https://docs.google.com/spreadsheets/d/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/edit?usp=sharing">To The Database</a>
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
    padding-bottom: 1rem;
}
h1{
    color: var(--clr-text);
}
</style>