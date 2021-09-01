<template>
    <div class="container-fluid row g-0 w-100">
          <div class="col table-responsive-sm g-0 beer-table">
           
          <!--Table-->
            <table class="table table-bordered table-striped" 
                id="table" 
                data-filter-control="true"
                >
                
                        <thead class="table-dark">
                          <tr class="bg-dark">
                            <th colspan="4">
                              <form v-on:submit.prevent class="bg-dark">
                                          <div class="input-group rounded">
                                              <input type="search" id="search" v-model="search_q" class="form-control rounded" placeholder="Search" v-on:keyup.enter="searchDB"/>
                                            <button type="button" class="btn btn-info" @click="searchDB">
                                              <i class="fas fa-search"></i>
                                            </button>
                                          </div>
                                        </form>
                            </th>
                            <!--Search-->
                            <th colspan="8"></th>
                          </tr>
                        <tr>
                            <th scope="col">
                                Refresh
                                <div class="btn-box">
                                  <button class="btn btn-info btn-refresh" @click="resetDB">
                                    <i class="fas fa-redo"></i>
                                  </button>
                                </div>
                              
                            </th>

                            <th data-field="Name" scope="col">
                              Name
                              <div class="btn-box">
                                <button type="button" class="sort-btn" @click="sortByName(1)">
                                  <i class="fas fa-arrow-up"></i>
                                </button>
                                <button type="button" class="sort-btn" @click="sortByName(0)">
                                  <i class="fas fa-arrow-down"></i>
                                </button>
                              </div>
                            </th>
                            <th data-field="Brewery" scope="col">
                              Brewery
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByBrewery(1)">
                                  <i class="fas fa-arrow-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByBrewery(0)">
                                  <i class="fas fa-arrow-down"></i>
                                </button>
                              </div>
                            </th>
                            <th scope="col">
                              Avg Rank
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByAvgRank(1)">
                                  <i class="fas fa-arrow-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByAvgRank(0)">
                                  <i class="fas fa-arrow-down"></i>
                                </button>
                              </div>
                              </th>
                            <th data-field="Type" data-filter-control="select" scope="col">
                              Type
                              <div class="btn-box">
                                <select class="form-select form-select-sm" name="types" id="types" v-model="selected_type" @change="this.filterByType();">
                                  <option selected></option>
                                  <option v-for="type in TYPES" :key="type" :value="type">
                                      {{type}}
                                  </option>
                                </select>
                              </div>
                              
                              </th>
                            <th scope="col">
                              ABV
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByABV(1)">
                                  <i class="fas fa-arrow-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByABV(0)">
                                  <i class="fas fa-arrow-down"></i>
                                </button>
                              </div></th>
                            <th scope="col">
                              IBU
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByIBU(1)">
                                  <i class="fas fa-arrow-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByIBU(0)">
                                  <i class="fas fa-arrow-down"></i>
                                </button>
                              </div></th>
                            <th scope="col">$ Per Can</th>
                            <th scope="col">
                              Country
                              <div class="btn-box">
                                <select class="form-select form-select-sm" name="country" id="country" v-model="selected_country" @change="this.filterByCountry();">
                                  <option selected value=""></option>
                                  <option v-for="country in countries" :key="country" :value="country">
                                      {{country}}
                                  </option>
                                </select>
                                </div>
                              </th>
                            <th scope="col">Origin</th>
                            <th scope="col">Felix's Rank</th>
                            <th scope="col">Paul's Rank</th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr v-for="beer in db_array" :key="beer.Name">
                            <td class="p-0">
                                <img v-if="beer.img_url" class="beer-img" v-bind:src="beer.img_url" v-bind:alt="beer.name">
                                <img v-else class="beer-img" src="favicon.ico" v-bind:alt="beer.name">
                            </td>
                            <td>{{beer.Name}}</td><!--Name-->
                            <td>{{beer.Brewery}}</td><!--Brewery-->
                            <td class="table-active" :style="{ backgroundColor: `hsl(${beer.Avg_Rank * 10}, 80%, 50%)` }">
                              <h3>{{beer.Avg_Rank}}</h3>
                              </td>
                            <td>{{beer.Type}}</td><!--Type-->
                            <td>{{beer.ABV}}</td><!--ABV-->
                            <td>{{beer.IBU}}</td><!--IBU-->
                            <td>{{beer.PricePerCan}}</td><!--APPX price per can-->
                            <td>
                              {{beer.Country}} <i :class="'flag flag-'+(beer.Country).toLowerCase()"></i>
                              </td>
                            <td>{{beer.Origin}}</td>
                            <td>{{beer.Rank_F}}</td>
                            <td>{{beer.Rank_P}}</td>  
                        </tr>
                    </tbody>
                    </table>
                    </div>
    </div>
</template>

<script>
export default {
    name: "table",
    data(){
        return{
            SHEET_ID: "1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA",
            SHEET_URL: "https://sheets.googleapis.com/v4/spreadsheets/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/values/BeerDB!A1:L100",
            API_KEY: "AIzaSyBZHUcJA31kXOHWWS3jFNVoQ-Y_zs-0AYw",
            db_array:[],
            full_array:[],
            TYPES: ["IPA", "Pilsner", "Lager", "Ale", "Cider", "Wheat", "Beverage"],
            countries: [],
            selected_country: '',
            selected_type: '',
            search_q: ''
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
          //Set Full array
          this.full_array = [...this.db_array];
          //Set Countries
          this.setCountries();
        }
        else{
          alert("Error data is empty");
        }
        
      },
      setCountries(){
        for (let x of this.full_array){
          //console.log(x)
          //console.log(x.Country)
          if(!this.countries.includes(x.Country)){
            this.countries.push(x.Country)
          }
        }
        //console.log(this.countries)
      },
      resetDB(){
        this.db_array = [...this.full_array];
        //Reset variables
        this.search_q, this.selected_country, this.selected_type ="";
      },
      //****************Sorting by different Tags ******************************************************/
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
      sortByBrewery(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.Brewery > b.Brewery) ? 1 : ((b.Brewery > a.Brewery) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.Brewery < b.Brewery) ? 1 : ((b.Brewery < a.Brewery) ? -1 : 0);} ); 
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
      /* Filtering */
      filterByType(){
        if(this.selected_type){
          let temp =[];
          for (let x of this.full_array){
            if(x.Type.includes(this.selected_type)){
              temp.push(x)
            }
          }
          if(temp.length < 1){
            alert("no search results")
          }
          else{
            this.db_array = [...temp];
          }
          
        }
        else{
          this.resetDB();
        }
        
        
      },
      filterByCountry(){
        if(this.selected_country){
          let temp =[];
          for (let x of this.full_array){
            if(!this.selected_country.localeCompare(x.Country)){
              temp.push(x)
            }

          }
          //console.log(temp)
          if(temp.length < 1){
            alert("no search results")
          }
          else{
            this.db_array = [...temp];
          }
          
        }
        else{
          this.resetDB();
        }
        
      },
      //**Search */
      searchDB(){
        if(this.search_q){
          let temp =[];
          for (let x of this.full_array){
            if(x.Name.includes(this.search_q)){
              temp.push(x)
            }
            else if (x.Brewery.includes(this.search_q)) {
              temp.push(x)
            } 
            else if(x.Type.includes(this.search_q)){
              temp.push(x)
            }
            else if(x.Origin.includes(this.search_q)){
              temp.push(x)
            }
            

          }//for
          //console.log(temp)
          if(temp.length < 1){
            alert("no search results")
          }
          else{
            this.db_array = [...temp];
          }
          
        }
        else{
          this.resetDB();
        }
        }
      
    },
  mounted (){
    if(this.db_array.length === 0){
      this.initDB();
    }
  }
}
</script>
<style>
.beer-table{
    line-height: 1;
    display: default;
    justify-content: center;
    align-items: center;
    text-align:center;
    border-spacing: 0;
    padding:0;
    margin:0;
    width: 100%;
}
.beer-img{
    height: 6rem;
    width: 6rem;
    margin: 0;
    padding: 0;

}
.table{
  padding:0;
}
table > *, tr >*{
    padding:0;
}
td,th{
    margin:0;
    padding:0;
    vertical-align: baseline;
}
.table>:not(caption)>*>*{
  padding:0;
  vertical-align: center;
}
.btn-box{
  width:100%;
  white-space: nowrap;
}
.sort-btn{
  min-height: 1.875rem;
  min-width: 2rem;
  width: 50%;
}
.btn-refresh{
  width:100%;
  margin: 0;
  min-height:1.875rem;
  padding:0;
  margin-bottom: 0.3rem;
}

/*Media Queries*/
@media(max-width: 40rem){
    .beer-img{
        height: 4rem;
        width: 4rem;
    }
}
</style>
