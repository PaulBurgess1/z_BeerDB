export const dbMixin ={
    data(){
        return{
            SHEET_ID: "1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA",
            SHEET_URL: "https://sheets.googleapis.com/v4/spreadsheets/1Z2imEpWmwWmLuy85fDLK9Y5PWWCCAhXm33oI1sh6CtA/values/BeerDB!A1:M200",
            //I set the Sheets API to Read-Only so secrets are not 100% necessary
            API_KEY: "AIzaSyBZHUcJA31kXOHWWS3jFNVoQ-Y_zs-0AYw",
            db_array:[],
            full_array:[],
            TYPES: ["IPA", "Pilsener", "Lager", "Ale", "Stout", "Cider", "Beverage"],
            selected_type: '',
            countries: [],
            selected_country: '',
            breweries: [],
            selected_brewery: '',
            BREWERY_TYPES: ["Megabrewery", "Craft", "Regional", "Microbrewery"],
            selected_brewery_type: '',
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
          //Set Breweries
          this.setBreweries();
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
          this.countries.sort();
        }
        //console.log(this.countries)
      },
      setBreweries(){
        for (let x of this.full_array){
          //console.log(x)
          //console.log(x.Country)
          if(!this.breweries.includes(x.Brewery)){
            this.breweries.push(x.Brewery)
          }
          this.breweries.sort();
        }
        //console.log(this.countries)
      },
      resetDB(){
        this.db_array = [...this.full_array];
        //Reset variables
        this.search_q = this.selected_country = this.selected_brewery = this.selected_type = this.selected_brewery_type ="";
      },
      removeAlert(){
          document.getElementById("search_alert").setAttribute("style","display: none;");
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
          (this.db_array).sort(function(a,b) {return (parseFloat(a.ABV) > parseFloat(b.ABV)) ? 1 : ((parseFloat(b.ABV) > parseFloat(a.ABV)) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (parseFloat(a.ABV) < parseFloat(b.ABV)) ? 1 : ((parseFloat(b.ABV) < parseFloat(a.ABV)) ? -1 : 0);} ); 
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
      sortByFRank(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.Rank_F > b.Rank_F) ? 1 : ((b.Rank_F > a.Rank_F) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.Rank_F < b.Rank_F) ? 1 : ((b.Rank_F < a.Rank_F) ? -1 : 0);} ); 
        }
      },
      sortByPRank(mode){
        if(mode){
          //asc
          (this.db_array).sort(function(a,b) {return (a.Rank_P > b.Rank_P) ? 1 : ((b.Rank_P > a.Rank_P) ? -1 : 0);} ); 
        }
        else{
          //desc
          (this.db_array).sort(function(a,b) {return (a.Rank_P < b.Rank_P) ? 1 : ((b.Rank_P < a.Rank_P) ? -1 : 0);} ); 
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
            document.getElementById("search_alert").setAttribute("style","display: default;");
          }
          else{
            this.db_array = [...temp];
          }
          
        }
        else{
          this.resetDB();
        }
        
        
      },
      filterByBrewery(){
        if(this.selected_brewery){
          let temp =[];
          for (let x of this.full_array){
            if(!this.selected_brewery.localeCompare(x.Brewery)){
              temp.push(x)
            }

          }
          //console.log(temp)
          if(temp.length < 1){
            document.getElementById("search_alert").setAttribute("style","display: default;");
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
            document.getElementById("search_alert").setAttribute("style","display: default;");
          }
          else{
            this.db_array = [...temp];
          }
          
        }
        else{
          this.resetDB();
        }
        
      },
      filterByBreweryType(){
        if(this.selected_brewery_type){
            let temp =[];
            for (let x of this.full_array){
              if(!this.selected_brewery_type.localeCompare(x.Brewery_Type)){
                temp.push(x)
              }
  
            }
            //console.log(temp)
            if(temp.length < 1){
              document.getElementById("search_alert").setAttribute("style","display: default;");
            }
            else{
              this.db_array = [...temp];
            }
            
          }
          else{
            this.resetDB();
          }
      },
      //edge: INT
      //mode: boolean (1 all greater than, 0 all less than)
      filterByRating(edge,mode){
        let temp =[];
        if(mode){//>
          for (let x of this.full_array){
            if(x.Avg_Rank >= edge){
              temp.push(x)
            }

          }
          temp.sort(function(a,b) {return (a.Avg_Rank < b.Avg_Rank) ? 1 : ((b.Avg_Rank < a.Avg_Rank) ? -1 : 0);} ); 
        }
        else{//<
          for (let x of this.full_array){
            if(x.Avg_Rank <= edge){
              temp.push(x)
            }

          }
          temp.sort(function(a,b) {return (a.Avg_Rank > b.Avg_Rank) ? 1 : ((b.Avg_Rank > a.Avg_Rank) ? -1 : 0);} ); 
        }
        
        //console.log(temp)
        if(temp.length < 1){
          document.getElementById("search_alert").setAttribute("style","display: default;");
        }
        else{
          this.db_array = [...temp];
        }
            
          
      },
      //Gets all unrated Beers
      getUnrated(){
        let temp =[];
        let mt_rank='#DIV/0!';
        for (let x of this.full_array){
          if(!mt_rank.localeCompare(x.Avg_Rank)){
            temp.push(x)
          }

        }
        //console.log(temp)
        if(temp.length < 1){
          document.getElementById("search_alert").setAttribute("style","display: default;");
        }
        else{
          this.db_array = [...temp];
        }
            
          
      },
      getRated(){
        let temp =[];
        let mt_rank='#DIV/0!';
        for (let x of this.full_array){
          if(mt_rank.localeCompare(x.Avg_Rank)){
            temp.push(x)
          }

        }
        //console.log(temp)
        if(temp.length < 1){
          document.getElementById("search_alert").setAttribute("style","display: default;");
        }
        else{
          this.db_array = [...temp];
        }
            
          
      },
      
      //**Search */
      searchDB(){
        if(this.search_q){
          this.search_q = this.search_q.toLowerCase();
          let temp =[];
          for (let x of this.full_array){
            if(x.Name.toLowerCase().includes(this.search_q)){
              temp.push(x);
            }//Name check
            else if (x.Brewery){
              if(x.Brewery.toLowerCase().includes(this.search_q)) {
                temp.push(x);
              }//Brewery check
              else if(x.Type){
                if((x.Type.toLowerCase()).includes(this.search_q)){
                  temp.push(x);
                }//Type check
                else if(x.Origin){
                  if(x.Origin.toLowerCase().includes(this.search_q)){
                    temp.push(x);
                  }
                }//Origin check
              }
            } 
            
            
          }//for

          //console.log(temp)
          if(temp.length < 1){
            document.getElementById("search_alert").setAttribute("style","display: default;");
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