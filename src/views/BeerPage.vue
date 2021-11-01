<template>
    <div class="container-fluid" :style="{ backgroundColor: `hsl(${beer_data[4]*10}, 40%, 80%)` }">
        <div class="beer-box" :style="{ 'border': `2px solid hsl(${beer_data[4]*10}, 90%, 50%)` }">
            <div class="bp-header row gx-0" >
                <div class="col">
                    <img v-if="beer_data[11]" class="bp-img" v-bind:src="beer_data[11]" v-bind:alt="beer_data[0]" :style="{ 'box-shadow': `0 0 0.7rem hsl(${beer_data[4]*10}, 80%, 50%)`, 'border': `1px solid hsl(${beer_data[4]*10}, 90%, 50%)` }" >
                    <img v-else class="bp-img" src="favicon.ico" v-bind:alt="beer_data[0]">
                </div>
                <div class="bp-title col mr-1">
                    <div class="bp-subtitle">
                        <h2 class="bp-name"><b>{{beer_data[0]}}</b></h2>
                        <h5 class="bp-brewery">{{beer_data[1]}} 
                            <i v-if="beer_data[7]" :class="'flag flag-'+(beer_data[7]).toLowerCase()"></i>
                        </h5>
                    </div>
                    
                    <div class="bp-rating" :style="{ backgroundColor: `hsl(${beer_data[4]*10}, 80%, 50%)` }">
                        <h1 class="m-auto" v-if="beer_data[4]!=='#DIV/0!'" > 
                            {{beer_data[4]}}
                            <br>
                            <span v-if="beer_data[4] >= 8">
                                <i class="fas fa-grin-stars"></i>
                            </span>
                            <span v-else-if="beer_data[4] >= 6">
                                <i class="fas fa-grin-beam"></i>
                            </span>
                            <span v-else-if="beer_data[4] >= 4">
                                <i class="fas fa-meh"></i>
                            </span>
                            <span v-else-if="beer_data[4] >= 2">
                                <i class="fas fa-frown"></i>
                            </span>
                            <span v-else>
                                <i class="fas fa-flushed"></i>
                            </span>
                        </h1>
                        <h1 class="m-auto" v-else> 
                            N/A 
                            <i class="fas fa-question-circle"></i>
                        </h1>
                    </div>
                </div>
            </div>
            <div class="bp-info row gx-0">
                <div class="col px-1">
                    <table class="table table-bordered table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th colspan="2">
                                    <h4><u>Information</u></h4>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Type</th>
                                <td>{{beer_data[2]}}</td>
                            </tr>
                            <tr>
                                <th><abbr title="Alcohol By Volume">ABV</abbr></th>
                                <td>{{beer_data[9]}}</td>
                            </tr>
                            <tr>
                                <th><abbr title="International Bitterness Units">IBU</abbr></th>
                                <td v-if="beer_data[10]">{{beer_data[10]}}</td>
                                <td v-else>N/A</td>
                            </tr>
                            <tr>
                                <th>Origin</th>
                                <td>
                                    {{beer_data[8]}}, {{beer_data[7]}} <i v-if="beer_data[7]" :class="'flag flag-'+(beer_data[7]).toLowerCase()"></i>
                                </td>
                            </tr>
                            <tr>
                                <th>Brewery Type</th>
                                <td>{{beer_data[3]}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="bp-footer">
                        <h6>Felix's Rank: 
                            <span v-if="beer_data[5]">
                                {{beer_data[5]}}
                            </span>
                            <span v-else>
                                N/A
                            </span>
                        </h6>
                        <h6>Paul's Rank: 
                            <span v-if="beer_data[6]">
                                {{beer_data[6]}}
                            </span>
                            <span v-else>
                                N/A
                            </span>
                            
                        </h6>
                        <span v-if="beer_data[13]">
                            <h5>"{{beer_data[13]}}"</h5>
                        </span>
                        
                        <div v-if="!(bottles.length==0 && cans.length==0)" class="beerstore-info">
                            <table class="table table-bordered">
                                <caption>This information is from the Victoria Park/Finch BeerStore in Toronto. 
                                    <br>
                                    To check your local store
                                    <a v-bind:href=bsUrl target="_blank" rel="noopener noreferrer">
                                        CLICK HERE
                                    </a>
                                </caption>
                                <thead class="table-warning">
                                    <tr>
                                        <th class="pt-1" colspan="2">
                                            <h3>BeerStore Prices</h3>
                                        </th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <!--Bottles-->
                                        <th>
                                            <table class="table table-bordered table-striped">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th colspan= "4">
                                                            <i class="fas fa-wine-bottle"></i>
                                                            Bottles
                                                        </th>
                                                    </tr>
                                                     <tr>
                                                        <th>
                                                            Format
                                                        </th>
                                                        <th>
                                                            Stock
                                                        </th>
                                                        <th>
                                                            Price
                                                        </th>
                                                        <th>
                                                            <small>
                                                                Per Bottle
                                                            </small>
                                                            
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="bottle in bottles" :key="bottle[0]">
                                                        <td>
                                                            {{bottle[0]}}
                                                        </td>
                                                        <td>
                                                            <small v-if="bottle[1][0]=='O'">
                                                                0
                                                            </small>
                                                            <small v-else>
                                                                {{bottle[1]}}
                                                            </small>
                                                        </td>
                                                        <td>
                                                            {{bottle[2]}}
                                                        </td>
                                                        <td>
                                                            {{bottle[3]}}
                                                        </td>



                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                        <!--Cans-->
                                        <th>
                                            <table class="table table-bordered table-striped">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th colspan= "4">
                                                            <i class="fas fa-cube"></i>
                                                            Cans
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            Format
                                                        </th>
                                                        <th>
                                                            Stock
                                                        </th>
                                                        <th>
                                                            Price
                                                        </th>
                                                        <th>
                                                            <small>
                                                                 Per Can
                                                            </small>
                                                           
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                     <tr v-for="can in cans" :key="can[0]">
                                                        <td>
                                                            {{can[0]}}
                                                        </td>
                                                        <td>
                                                            <small v-if="can[1][0]=='O'">
                                                                0
                                                            </small>
                                                            <small v-else>
                                                                {{can[1]}}
                                                            </small>
                                                        </td>
                                                        <td>
                                                            {{can[2]}}
                                                        </td>
                                                        <td>
                                                            {{can[3]}}
                                                        </td>



                                                    </tr>
                                                </tbody>
                                            </table>
                                        </th>
                                        <!--End-->
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                        <span class="logo-box pt-1">
                            <a v-bind:href="'https://www.thebeerstore.ca/beers/?search_type=beer_page&searchval='+beer_data[0]" target="_blank" rel="noopener noreferrer">
                                <img class="btn-logo" src="..\assets\BeerStore.jpg" alt="Beer Store">
                            </a>
                            <a v-bind:href="'https://www.lcbo.com/lcbo/search?searchTerm='+beer_data[0]" target="_blank" rel="noopener noreferrer">
                                <img class="btn-logo" src="..\assets\LCBO.jpg" alt="LCBO">
                            </a>
                        </span>
                    </div>
                </div>
                
            </div>
            
            
        </div>
        
    </div>
    
</template>

<script>
import {useRouter} from "vue-router"
export default {
    props: ['id'],
    name: "BeerPage",
    data(){
            return {
                //I set the Sheets API to Read-Only so secrets are not 100% necessary
                API_KEY: "AIzaSyBZHUcJA31kXOHWWS3jFNVoQ-Y_zs-0AYw",
                beer_id: this.id,
                beer_data:[],
                bottles:[],
                cans:[],
                bsUrl:""
            }
        },
    methods:{
        getBeer(id){
        try {
          fetch("https://sheets.googleapis.com/v4/spreadsheets/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/values/BeerDB!A"+id+":N"+id+"?key="+this.API_KEY)
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
          .then(this.setBeer);
        } catch (error) {
          alert(error.message);
        }
    
        },//getbeer
        setBeer(data){
            try {
                if(data){
                    this.beer_data = [...(data.values[0])]
                    this.beerstoreInfo(this.beer_data[0])
                }
            } catch (error) {
                alert("The ID "+this.beer_id+" does not match anything in the database.");
                
            }
            
        },
        async beerstoreInfo(name){
            try {
                await fetch("https://brewski--api.herokuapp.com/beerstore/"+name, 
               )
                .then(res => {
                    if (res.status == 200){
                        let data =res.json();
                        return data;
                    }
                    else{
                        console.log("error")
                        alert("Error "+res.status+": "+res.statusText);
                        return;
                    }
                })
                .then(this.setBSinfo);
                } catch (error) {
                alert(error.message);
                }
        },
        setBSinfo(data){
            if(data){
                this.bottles= [...data.bottles]
                this.cans = [...data.cans]
                this.bsUrl= data.url
            }
        }
    },
    beforeMount() {
       
        if(!(this.beer_id > 1) ){ 
            const router= useRouter();
            router.push({ path: "/404" })
        }
        this.getBeer(this.beer_id);

        
    },

}
</script>
<style >
.beer-box{
  display: inline-block;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 1rem 0 1rem 0;
  padding:0.75rem;
  
  min-width: 50%;
  appearance: none;
  border-radius: 1rem;
  outline: none;
  background-color: var(--bs-light);
  box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.25);
}
.bp-header{
    align-items:stretch;
}
.bp-title{
    text-align: center;
    padding-left: 1rem;
    margin:auto;
    
}
.bp-rating{
    border-radius: 1rem 1rem 1rem 1rem;
    background-color: lightskyblue;
    padding: 0.4rem 0 0.4rem 0;
    
}
.bp-img{
    max-height: 50vh;
    max-width: 100%;
    border-radius: 1rem 1rem 1rem 1rem;
    border: 1px solid rgba(0, 0, 0, 0.25);

}
.bp-info{
    margin-top:1rem;
    color: black;
}
.logo-box{
    display: flex;
    justify-content:space-evenly; 
}
.btn-logo{
    width: 7rem;
    height: 4.5rem;
    border-radius: 1rem 1rem 1rem 1rem;
    border: 1px solid black;
    
}
.beerstore-info{
    width: stretch;
    display: inline-block;
    justify-content: center;
    align-items: center;
    align-content: center;
}
</style>