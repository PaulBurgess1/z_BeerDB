<template>
    <div>
        <div class="row deck-head bg-dark">
                <div class="col">
                    <h5>Name</h5>
                    <div class="btn-box">
                        <button class="sort-btn" @click="sortByName(1)">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="sort-btn" @click="sortByName(0)">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
                <div class="col">
                    <h5>Rank</h5>
                    <div class="btn-box">
                        <button class="sort-btn" @click="sortByAvgRank(1)">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="sort-btn" @click="sortByAvgRank(0)">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
                <div class="col">
                    <h5>ABV</h5>
                    <div class="btn-box">
                        <button class="sort-btn" @click="sortByABV(1)">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="sort-btn" @click="sortByABV(0)">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
                <div class="col">
                    <h5>IBU</h5>
                    <div class="btn-box">
                        <button class="sort-btn" @click="sortByIBU(1)">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="sort-btn" @click="sortByIBU(0)">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                    </div>
                </div>
        </div>
        <div class="card-deck beer-deck" v-for="beer in db_array" :key="beer.Name">
            <div class="card beer-card">
                <img v-if="beer.img_url" class="card-img-top" v-bind:src="beer.img_url" v-bind:alt="beer.Name">
                <img v-else class="card-img-top" src="favicon.ico" v-bind:alt="beer.Name">
                <div class="card-body w-100 p-0">
                    <div class="beer-title">
                        <h5 class="card-title"><b>{{beer.Name}}</b></h5>
                        <p class="card-subtitle">{{beer.Brewery}}</p>
                    </div>
                    <p class="card-text">{{beer.Type}}</p>
                    <p class="card-text">
                        <i :class="'flag flag-'+(beer.Country).toLowerCase()"></i>
                        </p>
                    <p class="card-text">ABV: {{beer.ABV}}</p>
                    <p class="card-text">IBU: {{beer.IBU}}</p>
                    <div class="beer-rating" :style="{ backgroundColor: `hsl(${beer.Avg_Rank*10}, 80%, 50%)` }">
                        <h1> {{beer.Avg_Rank}}</h1>
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
            SHEET_URL: "https://sheets.googleapis.com/v4/spreadsheets/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/values/BeerDB!A1:L100",
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
          //Convert from double array into array of objects
          //this.db_array = data.values;
          this.db_array= (data.values).slice(1).map(row => row.reduce(function(acc, cur, i) {
            acc[(data.values)[0][i]] = cur;
            return acc;
          }, {}));
          //console.log(this.db_array)
        }
        else{
          alert("Error data is empty");
        }
        
      },
      /*  Sorting Methods */
      sortByName(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.Name < b.Name) ? 1 : ((b.Name < a.Name) ? -1 : 0);} ); 
        }
      },
      sortByAvgRank(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.Avg_Rank > b.Avg_Rank) ? 1 : ((b.Avg_Rank > a.Avg_Rank) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.Avg_Rank < b.Avg_Rank) ? 1 : ((b.Avg_Rank < a.Avg_Rank) ? -1 : 0);} ); 
        }
      },
      sortByABV(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.ABV > b.ABV) ? 1 : ((b.ABV > a.ABV) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.ABV < b.ABV) ? 1 : ((b.ABV < a.ABV) ? -1 : 0);} ); 
        }
      },
      sortByIBU(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.IBU > b.IBU) ? 1 : ((b.IBU > a.IBU) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.IBU < b.IBU) ? 1 : ((b.IBU < a.IBU) ? -1 : 0);} ); 
        }
      },
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
.deck-head{
    text-align: center;
}
.beer-deck{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding:1rem 1rem;
}
.beer-title{
    background-color: lightgrey;
}
.beer-card{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  
  max-width: 17rem;
  appearance: none;
  border-radius: 0rem 0rem 1rem 1rem;
  outline: none;
  background-color: var(--bs-light);
  box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
}
.beer-card a{
  text-decoration: none;
}
.beer-card img{
  height: 17rem;
  width: 17rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
}
.beer-rating{
    border-radius: 0rem 0rem 1rem 1rem;
    margin:0;
    padding: 0.5rem;
}
.card-body > p {
    margin: 0.3rem;
}
.col > h5{
    color: var(--clr-text)
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