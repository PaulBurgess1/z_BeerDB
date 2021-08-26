<template>
    <div>
        <div class="card-deck beer-deck" v-for="beer in db_array" :key="beer[0]">
            <div class="card beer-card">
                <img v-if="beer[10]" class="card-img-top" v-bind:src="beer[10]" v-bind:alt="beer[0]">
                <img v-else class="card-img-top" src="favicon.ico" v-bind:alt="beer[0]">
                <div class="card-body w-100 p-0">
                    <h5 class="card-title"><b>{{beer[0]}}</b></h5>
                    <p class="card-subtitle">{{beer[1]}}</p>
                    <p class="card-text">{{beer[2]}}</p>
                    <p class="card-text">{{beer[9]}}</p>
                    <p class="card-text">ABV: {{beer[7]}}</p>
                    <p class="card-text">IBU: {{beer[8]}}</p>
                    <div v-if="beer[3] && beer[4]" class="beer-rating" :style="{ backgroundColor: `hsl(${((parseFloat(beer[3]) + parseFloat(beer[4])) / 2 ).toFixed(1)*10}, 80%, 50%)` }">
                        <h1> {{  ((parseFloat(beer[3]) + parseFloat(beer[4]))/2).toFixed(1)   }}</h1>
                    </div>
                    <div v-else class="beer-rating" :style="{ backgroundColor: `hsl(${Math.max(beer[3], beer[4])*10}, 80%, 50%)` }">
                        <h1> {{  Math.max(beer[3], beer[4])    }}</h1>
                    </div>
                </div>
            </div><!--Item-->
        </div><!---->
    </div>
</template>

<script>
export default {
    name: "Card",
    data(){
        return{
            SHEET_ID: "1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA",
            SHEET_URL: "https://sheets.googleapis.com/v4/spreadsheets/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/values/BeerDB!A2:k100",
            API_KEY: "AIzaSyBZHUcJA31kXOHWWS3jFNVoQ-Y_zs-0AYw",
            db_array:[],
        }
        
    },
    methods:{
    initDB(){
      try {
        fetch(this.SHEET_URL+"?key="+this.API_KEY)
        .then(res => {
          if (res.status == 200){
              let data =res.json();
              //console.log(data)
              return data;
            }
            else{
              console.log("error")
              alert("Error "+res.status+": "+res.statusText);
              return;
            }
        })
        .then(this.setDB);
      } catch (error) {
        alert(error.message);
      }
    },
    setDB(data){
      if(data){
        
        this.db_array = data.values;
        //console.log(this.db_array)
      }
      else{
        alert("Error data is empty");
      }
      
    },
    getDB(){
      return this.db_array;
    },
    getRatingColor(rating){
        return "backgroundColor: hsl("+(rating*10)+",100%,50%)"
    }
  },
  mounted (){
    if(this.db_array.length === 0){
      this.initDB();
      //console.log(this.db_array)
    }
  }

}
</script>

<style>
.beer-deck{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding:1rem 1rem;
}
.beer-card{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  appearance: none;
  border-radius: 0rem 0rem 1rem 1rem;
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25);
}
.beer-card a{
  text-decoration: none;
}
.beer-card img{
  height: 17rem;
  width: 17rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
.beer-rating{
    border-radius: 0rem 0rem 1rem 1rem;
    margin:0;
    padding: 0.5rem;
}
.card-body > p {
    margin: 0.3rem;
}
/*Media Queries*/
@media(max-width: 40em){
    .beer-deck{
        padding: 0;
    }
    .beer-card{
        max-width: 8rem;
        margin:0.4rem;

    }
    .beer-card img{
        height: 8rem;
        width: 8rem;
    }
    .card-body > p {
        margin: 0rem;
    }
}
</style>