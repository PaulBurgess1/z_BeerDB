<template>
    <div class="nf-container">
        <div class="nf-box">
            <h1><span>404</span> - Page Not Found</h1>
            <p>This page does not exist, click below to return to the previous page or go to the homepage.</p>
            <br>
            <div class="nf-nav">
                <button class="btn btn-outline-light w-50" @click="back">Previous Page</button>
                <router-link class="btn btn-outline-light w-50" to="/"> Back to the Homepage</router-link>
            </div>
        </div>
        
  </div>
</template>

<script>
export default {
    methods:{
        back(){
        this.$router.go(-1)
        },
    }//Methods
}
</script>

<style>
.nf-container{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding:1rem 1rem;
    
}
.nf-box{
    display:block;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: var(--clr-text);
    
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25);
}
.nf-box h1{
    font-size: 4rem;
    padding:1rem;
    text-shadow: 4px 7px rgba(0, 0, 0, 0.25);
}
.nf-nav{
    text-shadow: none;
    display:flex;
}
</style>