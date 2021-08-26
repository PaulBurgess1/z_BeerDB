<template>
    <div class="row gx-0 w-100">
        <div class="col table-responsive-sm gx-0 beer-table">
            <table class="table table-bordered table-striped" 
                id="table" 
                data-toggle="table"
                data-search="true"
                data-filter-control="true" 
                data-show-export="true"
                data-click-to-select="true"
                data-toolbar="#toolbar"
                >
                
                        <thead class="table-dark">
                        <tr>
                            <th scope="col"></th>
                            <th  scope="col">Name</th>
                            <th scope="col">Brewery</th>
                            <th data-field="type" data-filter-control="select" scope="col">Type</th>
                            <th scope="col">ABV</th>
                            <th scope="col">IBU</th>
                            <th scope="col">$ Per Can</th>
                            <th scope="col">Country</th>
                            <th scope="col">Origin</th>
                            <th scope="col">Felix's Rank</th>
                            <th scope="col">Paul's Rank</th>
                        </tr>
                        </thead>
                        <tbody >
                        <tr v-for="beer in db_array" :key="beer[0]">
                            <td class="p-0">
                                <img v-if="beer[10]" class="beer-img" v-bind:src="beer[10]" v-bind:alt="beer[0]">
                                <img v-else class="beer-img" src="favicon.ico" v-bind:alt="beer[0]">
                            </td>
                            <td>{{beer[0]}}</td><!--Name-->
                            <td>{{beer[1]}}</td><!--Brewery-->
                            <td>{{beer[2]}}</td><!--Type-->
                            <td>{{beer[7]}}</td><!--ABV-->
                            <td>{{beer[8]}}</td><!--IBU-->
                            <td>{{beer[9]}}</td><!--APPX price per can-->
                            <td>{{beer[5]}}</td>
                            <td>{{beer[6]}}</td>
                            <td>{{beer[3]}}</td>
                            <td>{{beer[4]}}</td>
                            
                            
                        </tr>
                    </tbody>
                    </table>
                    </div>
    </div>
</template>

<script>
(function() {
    console.log("Yeet");
    ('table').bootstrapTable()
  })
export default {
    name: "table",
    data(){
        return{
            SHEET_ID: "1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA",
            SHEET_URL: "https://sheets.googleapis.com/v4/spreadsheets/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/values/BeerDB!A2:k100",
            API_KEY: "AIzaSyBZHUcJA31kXOHWWS3jFNVoQ-Y_zs-0AYw",
            db_array:[]
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
.beer-table{
    line-height: 1;
    display: default;
    justify-content: center;
    align-items: center;
    text-align:center;
    border-spacing: 0;
    padding:0;
    margin:0;
}
.beer-img{
    height: 6rem;
    width: 6rem;
    margin: 0;
    padding: 0;

}
table > *, tr >*{
    padding:0;
}
td,th{
    margin:0;
    padding:0;
}
/*Media Queries*/
@media(max-width: 40rem){
    .beer-img{
        height: 4rem;
        width: 4rem;
    }
}
</style>
