<template>
    <div class="main-div">
        <div class="deck-head bg-dark">
            
            <ul class="nav nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                    <a 
                    class="nav-link btn btn-outline-light" 
                    data-mdb-ripple-color="light"
                    id="search-tab" 
                    data-toggle="tab"
                    data-mdb-toggle="tab" 
                    href="#search" 
                    role="tab" 
                    aria-controls="search"
                    aria-selected="true">
                    <i class="fas fa-search-plus"></i> <small>Search</small> </a>
                </li>
                <li class="nav-item">
                    <a 
                    class="nav-link btn btn-outline-light" 
                    data-mdb-ripple-color="light"
                    id="sort-tab" 
                    data-toggle="tab" 
                    data-mdb-toggle="tab" 
                    href="#sort" 
                    role="tab" 
                    aria-controls="sort"
                    aria-selected="false">
                    <i class="fas fa-sort"></i> Sort
                    </a>
                </li>
                <li class="nav-item">
                    <a 
                    class="nav-link btn btn-outline-light" 
                    id="filter-tab" 
                    data-toggle="tab" 
                    data-mdb-toggle="tab" 
                    href="#filter" 
                    role="tab" 
                    aria-controls="filter"
                    aria-selected="false">
                    <i class="fas fa-filter"></i> Filter</a>
                </li>
            </ul>
            <!--Alert-->
            <div class="alert alert-warning alert-dismissible fade in show" id="search_alert" style="display: none;">
                <strong><i class="fas fa-exclamation-triangle"></i></strong> No Search Results Found.
                <a href="#" class="close" @click="removeAlert">&times;</a>
            </div>
            <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="search" role="tabpanel" aria-labelledby="search-tab">
                        <!--Search-->
                        <div class="row pt-1 gx-0">
                            <form v-on:submit.prevent class="bg-dark">
                                <div class="input-group rounded">
                                    <input type="search" id="search" v-model="search_q" class="form-control rounded" placeholder="Search" v-on:keyup.enter="searchDB"/>
                                <button type="button" class="btn btn-info" @click="searchDB">
                                    <i class="fas fa-search"></i>
                                </button>
                                </div>
                            </form>
                        </div>
            </div>
            <div class="tab-pane fade show" id="filter" role="tabpanel" aria-labelledby="filter-tab">
                        <!--Filter-->
                        <div class="row pt-1 gx-0">
                            <div class="col gx-0">
                                <h5>Type</h5>
                                <div class="btn-box">
                                <select class="form-select form-select-sm" name="types" id="types" v-model="selected_type" @change="this.filterByType();">
                                    <option selected></option>
                                    <option v-for="type in TYPES" :key="type" :value="type">
                                        {{type}}
                                    </option>
                                </select>
                                </div>
                            </div>
                            <div class="col gx-0">
                                <h5>Brewery</h5>
                                <div class="btn-box">
                                <select class="form-select form-select-sm" name="brewery" id="brewery" v-model="selected_brewery" @change="this.filterByBrewery();">
                                    <option selected></option>
                                    <option v-for="brewery in breweries" :key="brewery" :value="brewery">
                                        {{brewery}}
                                    </option>
                                </select>
                                </div>
                            </div>
                            <div class="col gx-0">
                                <h5>Country</h5>
                                <div class="btn-box">
                                <select class="form-select form-select-sm" name="country" id="country" v-model="selected_country" @change="this.filterByCountry();">
                                    <option selected value=""></option>
                                    <option v-for="country in countries" :key="country" :value="country">
                                        {{country}}
                                    </option>
                                </select>
                                </div>
                            </div>
                            <div class="col gx-0">
                                <h5><small>Brewery Type</small></h5>
                                <div class="btn-box">
                                <select class="form-select form-select-sm" name="b_types" id="b_types" v-model="selected_brewery_type" @change="this.filterByBreweryType();">
                                    <option selected></option>
                                    <option v-for="b_type in BREWERY_TYPES" :key="b_type" :value="b_type">
                                        {{b_type}}
                                    </option>
                                </select>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row gx-0 mt-1">
                                <div class="rank-filter-box">
                                    <button class="btn btn-secondary px-2"  @click="getUnrated">
                                        <i class="fas fa-question-circle"></i>
                                        <strong> Unrated  </strong>
                                        <i class="fas fa-question-circle"></i>
                                        </button>
                                    <button class="btn btn-secondary px-2"  @click="getRated">
                                        <i class="fas fa-glass-cheers"></i>
                                       <strong> Rated  </strong>
                                        <i class="fas fa-glass-cheers"></i> 
                                        </button>
                                    <button class="btn btn-success px-2"  @click="filterByRating(7,1)">
                                        <i class="fas fa-star"></i> 
                                        <strong> Best  </strong>
                                        <i class="fas fa-star"></i> 
                                        </button>
                                    <button class="btn btn-danger px-2"  @click="filterByRating(3,0)">
                                        <i class="fas fa-skull-crossbones"></i> 
                                        <strong> Worst </strong>
                                        <i class="fas fa-skull-crossbones"></i> 
                                        </button>
                                </div>
                                    
                            
                                
                            </div>
                        
            </div>
            <div class="tab-pane fade show" id="sort" role="tabpanel" aria-labelledby="sort-tab">
                    <!--Sort-->
                        <div class="row pt-1 gx-0">
                            <div class="col gx-0">
                                <h5>Name</h5>
                                <div class="btn-box">
                                    <button class="sort-btn" @click="sortByName(1)">
                                       <i class="fas fa-sort-up"></i>
                                    </button>
                                    <button class="sort-btn" @click="sortByName(0)">
                                        <i class="fas fa-sort-down"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col">
                                <h5>Brewery</h5>
                                <div class="btn-box">
                                    <button class="sort-btn" @click="sortByBrewery(1)">
                                        <i class="fas fa-sort-up"></i>
                                    </button>
                                    <button class="sort-btn" @click="sortByBrewery(0)">
                                        <i class="fas fa-sort-down"></i>
                                    </button>
                                </div>
                            </div>
                        
                            <div class="col">
                                <h5>Rank</h5>
                                <div class="btn-box">
                                    <button class="sort-btn" @click="sortByAvgRank(1)">
                                        <i class="fas fa-sort-up"></i>
                                    </button>
                                    <button class="sort-btn" @click="sortByAvgRank(0)">
                                        <i class="fas fa-sort-down"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col">
                                <h5>ABV</h5>
                                <div class="btn-box">
                                    <button class="sort-btn" @click="sortByABV(1)">
                                        <i class="fas fa-sort-up"></i>
                                    </button>
                                    <button class="sort-btn" @click="sortByABV(0)">
                                        <i class="fas fa-sort-down"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col">
                                <h5>IBU</h5>
                                <div class="btn-box">
                                    <button class="sort-btn" @click="sortByIBU(1)">
                                        <i class="fas fa-sort-up"></i>
                                    </button>
                                    <button class="sort-btn" @click="sortByIBU(0)">
                                        <i class="fas fa-sort-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                </div>
                </div>    
            </div>
        <!--Tabs End-->

        <!--Refresh Button-->
        <div class="refresh-btn-box">
            <button class="btn btn-info" role="tab" @click="resetDB">
                <i class="fas fa-redo"></i>
                Refresh
            </button>
        </div>
        <!--The Goods-->
        <div class="card-deck beer-deck" v-for="beer in db_array" :key="beer.Name">
            
            <div class="card beer-card">
                <img v-if="beer.img_url" class="card-img-top" v-bind:src="beer.img_url" v-bind:alt="beer.Name">
                <img v-else class="card-img-top" src="favicon.ico" v-bind:alt="beer.Name">
                <div class="card-body w-100 p-0">
                    <div class="beer-title">
                        <h5 class="card-title"><b>{{beer.Name}}</b></h5>
                        <p class="card-subtitle">{{beer.Brewery}} 
                            <i v-if="beer.Country" :class="'flag flag-'+(beer.Country).toLowerCase()"></i>
                        </p>
                    </div>
                    <p class="card-text">
                      <span v-if="beer.Brewery_Type!=='Megabrewery'">({{beer.Brewery_Type}}) </span>
                      {{beer.Type}}
                      </p>
                    <p class="card-text">ABV: {{beer.ABV}}</p>
                    <p v-if="beer.IBU" class="card-text">IBU: {{beer.IBU}}</p>
                    <p v-else>No IBU</p>
                    <div class="beer-rating" :style="{ backgroundColor: `hsl(${beer.Avg_Rank*10}, 80%, 50%)` }">
                        <h1 v-if="beer.Avg_Rank!=='#DIV/0!'" > {{beer.Avg_Rank}}</h1>
                        <h1 v-else> N/A </h1>
                    </div>
                </div>
            </div><!--Item-->
        </div><!---->
    </div>
</template>

<script>
import { dbMixin } from "../mixins/dbMixin";
export default {
  mixins: [dbMixin],
    name: "Card",
    

}
</script>

<style>
/*
.main-div{
    background-image: url(https://envato-shoebox-0.imgix.net/f309/08f0-c751-4da9-ba9f-62c7a94fd21f/_K4A7247.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=15745df6fd33f570f570abb0259ca7d0);

}
*/
.deck-head{
    text-align: center;
    padding-bottom: 0.5rem;
}
.refresh-btn-box{
    padding: 0.5rem 0 0 0.5rem;
    text-align: left;

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
    background-color: lightskyblue;
}
.card-body > p {
    margin: 0.3rem;
}
.col{
    padding:0;
    margin:0;
}
.col > h5{
    color: var(--clr-text)
}
.sort-btn{
  min-height: 1.875rem;
  min-width: 2rem;
  width: 50%;
}
.rank-filter-box{
    display: flex;
    justify-content: center;
    
    
}
.rank-filter-box>*:not(:first-child){
    margin-left: 1rem;
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
    .col > h5{
    font-size: 90%;
    }
}
</style>