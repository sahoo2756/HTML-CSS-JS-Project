const input = document.getElementById("input");
const searchBtn = document.getElementById("searchBtn");
const recipe_container = document.querySelector(".racipe-container");
const pop_up_menu = document.querySelector("#pop-up-menu");

/*

*/
let i = 1;
let btnclick = 0;

const fetch_receipe = async (query)=> {
    recipe_container.innerHTML = "<h3>Fetching Recipes.......</h3>";

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const recipe_info = await data.json();
    
        if(recipe_info == null) {
            recipe_container.innerHTML = "<h3>Invalid Recipe Spelling</h3>";
            return;
        } else {
            recipe_container.innerHTML = "";
        
            recipe_info.meals.forEach(meal =>{
                const div = document.createElement('div');
                div.classList.add("recipe");
                div.innerHTML = `
                    <img src = '${meal.strMealThumb}' alt ="image" />
                    <h3>  ${meal.strMeal}</h3>
                    <p>  ${meal.strArea} Dish</p>
                    <p>  Belongs to ${meal.strCategory}</p>
                    <button type="button" class="view_recipe_btn"> View Recipe </button>
                `
                 
                recipe_container.appendChild(div);
                let view_recipe_btn = document.querySelector(".view_recipe_btn");
                view_recipe_btn.addEventListener('click' , e =>{
                    show_pop_up(meal);
                });
            });
        
        }        
    } catch (error) {
        console.log(error);
       recipe_container.innerHTML = "<h3>Check Internet Connection</h3>";
    }

   

    btnclick++;
    
}  // function end

function show_pop_up(meal) {
    console.log(meal.strMeal);
}

searchBtn.addEventListener('click' , (e) => {
    fetch_receipe(input.value.trim());
});

