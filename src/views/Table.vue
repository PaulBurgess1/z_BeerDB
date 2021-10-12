<template>
    <div class="container-fluid row g-0 w-100 bg-light">
          <div class="col table-responsive-sm g-0 beer-table">
           
          <!--Table-->
            <table class="table table-bordered table-striped bg-light" 
                id="table"
                >
                
                        <thead class="table-dark">
                          <tr class="bg-dark">
                            <th colspan="4">
                              <div class="alert alert-warning text-left fade in show" id="search_alert" style="display: none;">
                                <span class="float-left"><strong><i class="fas fa-exclamation-triangle"></i></strong> No Search Results Found.</span>
                                <a href="#" class="close float-right" @click="removeAlert">&times;</a>
                              </div>
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
                            <th colspan="9">
                              <button class="btn btn-secondary px-2"  @click="getUnrated">
                                  <i class="fas fa-question-circle"></i>
                                  Unrated
                                  <i class="fas fa-question-circle"></i>
                              </button>
                              
                              <button class="btn btn-secondary px-2"  @click="getRated">
                                  <i class="fas fa-glass-cheers"></i> 
                                  Rated
                                  <i class="fas fa-glass-cheers"></i> 
                              </button>

                              <button class="btn btn-success px-2"  @click="filterByRating(8,1)">
                                <i class="fas fa-star"></i> 
                                Best 
                                <i class="fas fa-star"></i> 
                              </button>

                              <button class="btn btn-danger px-2"  @click="filterByRating(3,0)">
                                <i class="fas fa-skull-crossbones"></i> 
                                Worst
                                <i class="fas fa-skull-crossbones"></i> 
                              </button>

                            </th>
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
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                <button type="button" class="sort-btn" @click="sortByName(0)">
                                  <i class="fas fa-sort-down"></i>
                                </button>
                              </div>
                            </th>
                            <th data-field="Brewery" scope="col">
                              <div class="btn-box-small">
                                <button class="sort-btn-small" @click="sortByBrewery(1)">
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                Brewery
                                <button class="sort-btn-small" @click="sortByBrewery(0)">
                                  <i class="fas fa-sort-down"></i>
                                </button>
                              </div>
                              <select class="form-select form-select-sm" name="brewery" id="brewery" v-model="selected_brewery" @change="this.filterByBrewery();">
                                <option selected></option>
                                <option v-for="brewery in breweries" :key="brewery" :value="brewery">
                                    {{brewery}}
                                </option>
                              </select>
                            </th>
                            <th scope="col">
                              Avg Rank
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByAvgRank(1)">
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByAvgRank(0)">
                                  <i class="fas fa-sort-down"></i>
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
                             <small>Brewery Type</small>
                              <div class="btn-box">
                                <select class="form-select form-select-sm" name="b_type" id="b_type" v-model="selected_brewery_type" @change="this.filterByBreweryType();">
                                  <option selected value=""></option>
                                  <option v-for="b_type in BREWERY_TYPES" :key="b_type" :value="b_type">
                                      {{b_type}}
                                  </option>
                                </select>
                                </div>
                              </th>
                            <th scope="col">
                              ABV
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByABV(1)">
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByABV(0)">
                                  <i class="fas fa-sort-down"></i>
                                </button>
                              </div></th>
                            <th scope="col">
                              IBU
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByIBU(1)">
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByIBU(0)">
                                  <i class="fas fa-sort-down"></i>
                                </button>
                              </div></th>
                            <th scope="col">$ Per Can</th>
                            <th scope="col">
                              Country
                              <div class="btn-box">
                                <select class="form-select form-select-sm" name="country" id="country" v-model="selected_country" @change="this.filterByCountry();">
                                  <option selected></option>
                                  <option v-for="country in countries" :key="country" :value="country">
                                      {{country}}
                                  </option>
                                </select>
                                </div>
                              </th>
                            <th scope="col">Origin</th>
                            <th scope="col">
                              Felix's Rank
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByFRank(1)">
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByFRank(0)">
                                  <i class="fas fa-sort-down"></i>
                                </button>
                              </div>
                              </th>
                            <th scope="col">
                              Paul's Rank
                              <div class="btn-box">
                                <button class="sort-btn" @click="sortByPRank(1)">
                                  <i class="fas fa-sort-up"></i>
                                </button>
                                <button class="sort-btn" @click="sortByPRank(0)">
                                  <i class="fas fa-sort-down"></i>
                                </button>
                              </div>
                              </th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr v-for="beer in db_array" :key="beer.Name">
                            <td class="p-0">
                                <img v-if="beer.img_url" class="beer-img" v-bind:src="beer.img_url" v-bind:alt="beer.name">
                                <img v-else class="beer-img" src="favicon.ico" v-bind:alt="beer.name">
                            </td>
                             <td>
                              <router-link v-bind:to="'/beer/'+(full_array.indexOf(beer) +2)">
                                {{beer.Name}}
                              </router-link>
                             </td><!--Name-->
                            <td>{{beer.Brewery}}</td><!--Brewery-->
                            <td class="table-active" :style="{ backgroundColor: `hsl(${beer.Avg_Rank * 11.7}, 80%, 50%)` }">
                              <h3 v-if="beer.Avg_Rank!=='#DIV/0!'" > {{beer.Avg_Rank}}</h3>
                              <h3 v-else> N/A </h3>
                              </td>
                            <td>{{beer.Type}}</td><!--Type-->
                            <td>{{beer.Brewery_Type}}</td>
                            <td>{{beer.ABV}}</td><!--ABV-->
                            <td>
                              <span v-if="beer.IBU">
                                {{beer.IBU}}
                              </span>
                              <span v-else>
                                N/A
                              </span>
                              </td><!--IBU-->
                            <td>
                              <span v-if="beer.PricePerCan">
                                {{beer.PricePerCan}}
                              </span>
                              <span v-else>
                                N/A
                              </span>
                              </td><!--APPX price per can-->
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
import {dbMixin} from '../mixins/dbMixin'
export default {
  mixins: [dbMixin],
  name: "table",
    
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
.btn-box-small{
  display:flex;
  justify-content: space-between;
  width:100%;
  white-space: nowrap;
}
.sort-btn-small{
  min-width: 2rem;
  max-width: 25%;
  margin:auto;
}
.btn-refresh{
  width:100%;
  margin: 0;
  min-height:1.875rem;
  padding:0;
  margin-bottom: 0.3rem;
}
th > button{
  max-height: 2.25rem;
  min-width: none;
}
th > button:not(:first-child){
  margin-left:1rem;
}
/*Media Queries*/
/* Table breaks at around 61 em (976 px) */
@media(max-width: 61em){
    .beer-img{
        height: 4rem;
        width: 4rem;
    }
    .table{
      font-size: 85%;
    }
}
</style>
